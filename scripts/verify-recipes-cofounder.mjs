import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.cwd(), 'docs/booth-screens/proof');
fs.mkdirSync(OUT, { recursive: true });
const KEY = 'balabite-nra-2026';
const BASE = 'http://localhost:3000';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

// Recipes — sample 5 moments across the loop
await page.goto(`${BASE}/booth-mockups/recipes?key=${KEY}`, {
  waitUntil: 'networkidle',
});
const stops = [
  { ms: 600, name: 'rx-01-overnight' },
  { ms: 8500, name: 'rx-02-four-moved' },
  { ms: 16500, name: 'rx-03-slow-one' },
  { ms: 26500, name: 'rx-04-hero' },
  { ms: 34500, name: 'rx-05-not-sure' },
  { ms: 43500, name: 'rx-06-new-price' },
  { ms: 52500, name: 'rx-07-book' },
  { ms: 70500, name: 'rx-08-bumper' },
];
let last = 0;
for (const s of stops) {
  const wait = s.ms - last;
  if (wait > 0) await page.waitForTimeout(wait);
  last = s.ms;
  const out = path.join(OUT, `${s.name}.png`);
  await page.screenshot({ path: out });
  console.log(`saved ${path.relative(process.cwd(), out)} (@${s.ms}ms)`);
}

// Cofounder — capture the new split layout at a few timestamps
await page.goto(`${BASE}/booth-mockups/cofounder-chat?key=${KEY}`, {
  waitUntil: 'networkidle',
});
await page.waitForSelector('[data-testid="booth-mockup-cofounder-chat"]');
const cfStops = [
  { ms: 1500, name: 'cf-01-first' },
  { ms: 8000, name: 'cf-02-table' },
  { ms: 22000, name: 'cf-03-bullets' },
  { ms: 38000, name: 'cf-04-user-pivot' },
  { ms: 52000, name: 'cf-05-turn-b' },
];
let last2 = 0;
for (const s of cfStops) {
  const wait = s.ms - last2;
  if (wait > 0) await page.waitForTimeout(wait);
  last2 = s.ms;
  const out = path.join(OUT, `${s.name}.png`);
  await page.screenshot({ path: out });
  console.log(`saved ${path.relative(process.cwd(), out)} (@${s.ms}ms)`);
}

await browser.close();
