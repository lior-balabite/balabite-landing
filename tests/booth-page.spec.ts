import { test, expect } from '@playwright/test';

test.describe('/booth-8332 menu page', () => {
  test('hero shows brand tagline + booth/show context', async ({ page }) => {
    await page.goto('/booth-8332');
    const main = page.getByRole('main');
    await expect(page.getByTestId('booth-eyebrow')).toContainText(
      'Booth 8332 · NRA Show · May 16–19 · Chicago',
    );
    await expect(main.getByRole('heading', { level: 1 })).toContainText(
      'Meet your',
    );
    await expect(main.getByRole('heading', { level: 1 })).toContainText(
      'AI Cofounder',
    );
    await expect(main.getByText('You run the place.')).toBeVisible();
    await expect(main.getByText('We do the rest.')).toBeVisible();
  });

  test('renders all four menu items', async ({ page }) => {
    await page.goto('/booth-8332');
    for (const id of ['drive-by', 'coffee', 'after-service', 'numbers']) {
      await expect(page.getByTestId(`menu-item-${id}`)).toBeVisible();
    }
  });

  test('booth drive-by has no reservation button', async ({ page }) => {
    await page.goto('/booth-8332');
    const driveBy = page.getByTestId('menu-item-drive-by');
    await expect(driveBy).toContainText('No reservation');
    await expect(page.getByTestId('menu-reserve-drive-by')).toHaveCount(0);
  });

  test('coffee + after-service + numbers slots show duration', async ({ page }) => {
    await page.goto('/booth-8332');
    await expect(page.getByTestId('menu-item-coffee')).toContainText('30 min');
    await expect(page.getByTestId('menu-item-after-service')).toContainText(
      '45 min',
    );
    await expect(page.getByTestId('menu-item-numbers')).toContainText('45 min');
  });

  test('NRA banner is not rendered visibly on this page', async ({ page }) => {
    await page.goto('/booth-8332');
    const banner = page.getByTestId('nra-banner');
    await expect
      .poll(
        async () => (await banner.boundingBox().catch(() => null))?.height ?? 0,
        { timeout: 5000 },
      )
      .toBe(0);
  });
});
