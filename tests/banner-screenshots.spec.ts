import { test } from '@playwright/test';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'docs', 'banner-screenshots');

test.describe('NRA banner — visual capture', () => {
  test('desktop hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(DIR, 'desktop-hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 220 },
    });
  });

  test('desktop full', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(DIR, 'desktop-full.png') });
  });

  test('mobile hero', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: path.join(DIR, 'mobile-hero.png'),
      clip: { x: 0, y: 0, width: 375, height: 200 },
    });
  });

  test('mobile full', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(DIR, 'mobile-full.png') });
  });
});
