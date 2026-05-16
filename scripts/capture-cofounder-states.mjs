// Capture cofounder-chat at several timeline positions so we can review
// how the redesign actually plays across the loop.

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'docs/booth-screens/proof/cofounder');
fs.mkdirSync(OUT, { recursive: true });

const URL =
  'http://localhost:3000/booth-mockups/cofounder-chat?key=balabite-nra-2026';

// Times (ms after page load) sampled at moments of interest:
// 0.8s = first beat alive, 5s = mid-table, 12s = bullet stack, 18s = user reply,
// 28s = mid second turn, 42s = final pause, 50s = post-fade reset
const STOPS = [
  { ms: 800, name: '01-first-beat' },
  { ms: 5000, name: '02-table-mid' },
  { ms: 12000, name: '03-bullets' },
  { ms: 18500, name: '04-user-reply' },
  { ms: 28000, name: '05-second-turn-mid' },
  { ms: 42000, name: '06-final-pause' },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="booth-mockup-cofounder-chat"]');

  let lastMs = 0;
  for (const s of STOPS) {
    const wait = s.ms - lastMs;
    if (wait > 0) await page.waitForTimeout(wait);
    lastMs = s.ms;
    const out = path.join(OUT, `${s.name}.png`);
    await page.screenshot({ path: out });
    console.log(`saved ${path.relative(process.cwd(), out)} (@${s.ms}ms)`);
  }

  await browser.close();
})();
