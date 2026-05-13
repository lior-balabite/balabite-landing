import { test } from '@playwright/test';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'docs', 'banner-screenshots');

test('OG square-crop preview — booth', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 630 });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;padding:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;">
      <img src="http://localhost:3000/booth-8332/opengraph-image"
           style="width:1200px;height:630px;transform:translate(-300px,0);" />
    </body></html>`,
  );
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(OUT, 'og-booth-square-crop.png'),
    clip: { x: 0, y: 15, width: 600, height: 600 },
  });
});

test('OG square-crop preview — root', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 630 });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;padding:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;">
      <img src="http://localhost:3000/opengraph-image"
           style="width:1200px;height:630px;transform:translate(-300px,0);" />
    </body></html>`,
  );
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(OUT, 'og-root-square-crop.png'),
    clip: { x: 0, y: 15, width: 600, height: 600 },
  });
});
