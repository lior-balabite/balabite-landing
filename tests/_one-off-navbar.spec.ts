import { test } from '@playwright/test';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'docs', 'banner-screenshots');

test('full banner (desktop)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(OUT, '_banner-full.png'),
    clip: { x: 0, y: 0, width: 1440, height: 60 },
  });
});

test('navbar lockup close-up (desktop)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(OUT, '_navbar-tight.png'),
    clip: { x: 0, y: 40, width: 420, height: 120 },
  });
});

test('banner + navbar (mobile)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(OUT, '_banner-mobile.png'),
    clip: { x: 0, y: 0, width: 375, height: 140 },
  });
});
