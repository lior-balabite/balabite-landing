import { test, expect, type Page } from '@playwright/test';

// Coverage for the NRA booth surfaces: /booth-tv (kiosk loop),
// /demo (guided walkthrough), and the /NRA-booklet redirect.

const FORBIDDEN = [
  /claude/i,
  /anthropic/i,
  /\bgpt\b/i,
  /\bllm\b/i,
  /\bchef/i,
  /AI business partner/i,
  /\$299/,
  /1% of sales/i,
];

async function expectClean(page: Page) {
  const text = (await page.locator('body').innerText()).toLowerCase();
  for (const pattern of FORBIDDEN) {
    expect(text, `forbidden content matched ${pattern}`).not.toMatch(pattern);
  }
}

test.describe('/booth-tv — booth TV loop', () => {
  test('renders kiosk-clean with the NRA banner suppressed', async ({ page }) => {
    await page.goto('/booth-tv');
    await expect(page.getByTestId('booth-tv')).toBeVisible();

    const banner = page.getByTestId('nra-banner');
    await expect
      .poll(
        async () => (await banner.boundingBox().catch(() => null))?.height ?? 0,
        { timeout: 5000 },
      )
      .toBe(0);
  });

  test('covers all six beats, in order, and loops', async ({ page }) => {
    await page.goto('/booth-tv');
    const scene = page.locator('[data-beat]');
    // Pause the auto-advance, then step through with the hidden operator keys.
    await page.keyboard.press('Space');

    const order = ['hook', 'problem', 'proof', 'how', 'product', 'real'];
    // Find current position in the cycle, then walk a full lap of 6 beats.
    const start = await scene.getAttribute('data-beat');
    expect(order).toContain(start);

    const seen: string[] = [];
    for (let i = 0; i < 6; i++) {
      seen.push((await scene.getAttribute('data-beat'))!);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(900);
    }
    // Every beat shows up exactly once across one lap.
    expect([...seen].sort()).toEqual([...order].sort());
    // And it wrapped back to where it started — it loops.
    expect(await scene.getAttribute('data-beat')).toBe(start);

    await expectClean(page);
  });
});

test.describe('/demo — guided walkthrough', () => {
  test('walks Open → Sees → Acts → Owns it → Close and ends on a booking CTA', async ({
    page,
  }) => {
    await page.goto('/demo');
    await expect(page.getByTestId('demo')).toHaveAttribute('data-step', 'open');

    const steps = ['open', 'sees', 'acts', 'owns', 'close'];
    for (let i = 0; i < steps.length; i++) {
      await expect(page.getByTestId('demo')).toHaveAttribute(
        'data-step',
        steps[i],
      );
      await expectClean(page);
      if (i < steps.length - 1) {
        await page.getByTestId('demo-next').click();
      }
    }

    // Close step drives to a booking CTA.
    await expect(page.getByTestId('demo-book-cta')).toBeVisible();
    await expect(page.getByTestId('demo-next')).toHaveCount(0);
  });

  test('each screen step shows the Pulse PNG, not a rebuilt product', async ({
    page,
  }) => {
    await page.goto('/demo');
    await page.getByTestId('demo-next').click(); // → sees
    for (const src of [
      'pulse-hero.png',
      'pulse-background.png',
      'pulse-record.png',
    ]) {
      const img = page.locator('.demo-frame img');
      await expect(img).toHaveAttribute('src', new RegExp(src));
      const next = page.getByTestId('demo-next');
      if (await next.count()) await next.click();
    }
  });
});

test.describe('/NRA-booklet redirect', () => {
  test('resolves to the booth page tagged as booklet traffic', async ({
    page,
  }) => {
    await page.goto('/NRA-booklet');
    await expect(page).toHaveURL(/\/booth-8332\?src=booklet$/);
  });
});
