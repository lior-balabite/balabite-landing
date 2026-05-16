import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'docs/booth-screens/proof');
fs.mkdirSync(OUT, { recursive: true });
const KEY = 'balabite-nra-2026';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto(`http://localhost:3000/demo?key=${KEY}`, {
  waitUntil: 'networkidle',
});
await page.waitForSelector('[data-testid="demo"]');

// Click Next until we land on each iframe step, capture
const targets = [
  'staff-chat',
  'cofounder-chat',
  'recipes',
  'menu',
  'marketing',
  'loyalty',
];

for (const id of targets) {
  let safety = 12;
  while (safety-- > 0) {
    const cur = await page.getAttribute('[data-testid="demo"]', 'data-step');
    if (cur === id) break;
    await page.click('[data-testid="demo-next"]').catch(() => {});
    await page.waitForTimeout(400);
  }
  // Let the iframe load
  await page.waitForTimeout(2500);
  const out = path.join(OUT, `demo-${id}.png`);
  await page.screenshot({ path: out });
  console.log(`saved ${path.relative(process.cwd(), out)}`);
}

await browser.close();
