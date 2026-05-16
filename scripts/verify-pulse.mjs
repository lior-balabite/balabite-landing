// Self-verify pulse images by capturing /demo at each Pulse step.
// Output: docs/booth-screens/proof/demo-{sees,acts,owns}.png + booth-tv-product.png

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'docs/booth-screens/proof');
fs.mkdirSync(OUT, { recursive: true });

const KEY = 'balabite-nra-2026';
const BASE = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // /demo — step through to see each pulse image rendered with its frame
  await page.goto(`${BASE}/demo?key=${KEY}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="demo"]');

  const stepIds = ['open', 'sees', 'acts', 'owns', 'close'];
  for (const id of stepIds) {
    const current = await page.getAttribute('[data-testid="demo"]', 'data-step');
    if (current !== id) {
      // Advance until we hit it
      let safety = 6;
      while (safety-- > 0) {
        const next = await page.getAttribute(
          '[data-testid="demo"]',
          'data-step',
        );
        if (next === id) break;
        await page.click('[data-testid="demo-next"]').catch(() => {});
        await page.waitForTimeout(600);
      }
    }
    await page.waitForTimeout(900); // settle anims
    const outPath = path.join(OUT, `demo-${id}.png`);
    await page.screenshot({ path: outPath });
    console.log(`saved ${path.relative(process.cwd(), outPath)}`);
  }

  // /booth-tv — advance to product beat (index 4)
  await page.goto(`${BASE}/booth-tv?key=${KEY}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="booth-tv"]');
  // Pause + step → 4 times to land on 'product'
  await page.keyboard.press('Space'); // pause
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(1500); // let scene animate
  const tvPath = path.join(OUT, 'booth-tv-product.png');
  await page.screenshot({ path: tvPath });
  console.log(`saved ${path.relative(process.cwd(), tvPath)}`);

  await browser.close();
})();
