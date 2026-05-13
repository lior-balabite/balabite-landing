import { test, expect } from '@playwright/test';

const VISIBLE_ROUTES = ['/', '/about', '/landingpage'];

test.describe('NRA Show banner', () => {
  for (const route of VISIBLE_ROUTES) {
    test(`renders on ${route}`, async ({ page }) => {
      await page.goto(route);
      const banner = page.getByTestId('nra-banner');
      await expect(banner).toBeVisible();
      await expect(banner).toContainText('Booth 8332');
      await expect(page.getByTestId('nra-banner-cta')).toBeVisible();
    });
  }

  for (const route of ['/pitch', '/booth-8332']) {
    test(`does not render on ${route}`, async ({ page }) => {
      await page.goto(route);
      const banner = page.getByTestId('nra-banner');
      // Banner is server-rendered then collapsed client-side; wait for settled state.
      await expect
        .poll(
          async () => (await banner.boundingBox().catch(() => null))?.height ?? 0,
          { timeout: 5000 },
        )
        .toBe(0);
    });
  }

  test('dismiss × hides banner and persists in session', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByTestId('nra-banner');
    await expect(banner).toBeVisible();

    await page.getByTestId('nra-banner-dismiss').click();
    await expect.poll(async () => (await banner.boundingBox())?.height ?? 0).toBe(0);

    // Reload in the same session — banner stays dismissed (allow hydration to settle)
    await page.reload();
    await expect
      .poll(
        async () => (await banner.boundingBox().catch(() => null))?.height ?? 0,
        { timeout: 5000 },
      )
      .toBe(0);
  });

  test('mobile viewport (375px) shows banner copy without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const banner = page.getByTestId('nra-banner');
    await expect(banner).toBeVisible();
    const box = await banner.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
    // Mobile copy uses the short variant
    await expect(banner).toContainText('Booth 8332');
  });

  test('CTA links to the dedicated /booth-8332 page', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByTestId('nra-banner-cta');
    const href = await cta.getAttribute('href');
    expect(href).toBe('/booth-8332');
  });

  test('anchored masthead shows booth 8332 statically (does not depend on marquee)', async ({
    page,
  }) => {
    await page.goto('/');
    const banner = page.getByTestId('nra-banner');
    // The static masthead text is present in the DOM (not waiting for scroll)
    await expect(banner).toContainText('Booth 8332');
  });
});
