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

  test('does not render on /pitch', async ({ page }) => {
    await page.goto('/pitch');
    const banner = page.getByTestId('nra-banner');
    // Banner is server-rendered then collapsed client-side; wait for settled state.
    await expect
      .poll(
        async () => (await banner.boundingBox().catch(() => null))?.height ?? 0,
        { timeout: 5000 },
      )
      .toBe(0);
  });

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

  test('CTA link target is set (booking URL or fallback)', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByTestId('nra-banner-cta');
    const href = await cta.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);
  });
});
