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

// Menu (after strip)
await page.goto(`${BASE}/booth-mockups/menu?key=${KEY}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(OUT, 'menu-stripped.png') });
console.log('saved menu-stripped.png');

// WhatsApp 86-salmon — live typed, capture at 3 points
await page.goto(`${BASE}/booth-mockups/whatsapp?key=${KEY}`, { waitUntil: 'networkidle' });
const waStops = [
  { ms: 1200, name: 'wa-86-01-typing' },
  { ms: 4500, name: 'wa-86-02-balabite-arrives' },
  { ms: 11000, name: 'wa-86-03-mid' },
  { ms: 16500, name: 'wa-86-04-final' },
];
let last = 0;
for (const s of waStops) {
  const wait = s.ms - last;
  if (wait > 0) await page.waitForTimeout(wait);
  last = s.ms;
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`) });
  console.log(`saved ${s.name}.png`);
}

// Marketing — capture at 3 points
await page.goto(`${BASE}/booth-mockups/marketing?key=${KEY}`, { waitUntil: 'networkidle' });
const mkStops = [
  { ms: 1200, name: 'mk-01-start' },
  { ms: 8000, name: 'mk-02-dispatch' },
  { ms: 19000, name: 'mk-03-flagged' },
];
let last2 = 0;
for (const s of mkStops) {
  const wait = s.ms - last2;
  if (wait > 0) await page.waitForTimeout(wait);
  last2 = s.ms;
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`) });
  console.log(`saved ${s.name}.png`);
}

// Loyalty — capture across the event
await page.goto(`${BASE}/booth-mockups/loyalty?key=${KEY}`, { waitUntil: 'networkidle' });
const lyStops = [
  { ms: 1500, name: 'ly-01-idle' },
  { ms: 7500, name: 'ly-02-outreach' },
  { ms: 15500, name: 'ly-03-reply' },
];
let last3 = 0;
for (const s of lyStops) {
  const wait = s.ms - last3;
  if (wait > 0) await page.waitForTimeout(wait);
  last3 = s.ms;
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`) });
  console.log(`saved ${s.name}.png`);
}

await browser.close();
