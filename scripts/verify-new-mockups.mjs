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

// Recipes — capture 3 different slides
await page.goto(`${BASE}/booth-mockups/recipes?key=${KEY}`, {
  waitUntil: 'networkidle',
});
for (let i = 0; i < 3; i++) {
  await page.waitForTimeout(i === 0 ? 1500 : 5500);
  const out = path.join(OUT, `recipes-slide-${i + 1}.png`);
  await page.screenshot({ path: out });
  console.log(`saved ${path.relative(process.cwd(), out)}`);
}

// Cofounder — re-capture with Miami credit
await page.goto(`${BASE}/booth-mockups/cofounder-chat?key=${KEY}`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(800);
const cf = path.join(OUT, 'cofounder-miami-credit.png');
await page.screenshot({ path: cf });
console.log(`saved ${path.relative(process.cwd(), cf)}`);

// Complaint — re-capture with panna cotta fix
await page.goto(`${BASE}/booth-mockups/whatsapp-complaint?key=${KEY}`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(800);
const co = path.join(OUT, 'whatsapp-complaint-panna-cotta.png');
await page.screenshot({ path: co });
console.log(`saved ${path.relative(process.cwd(), co)}`);

// Menu/waiter — capture at moments of interest
await page.goto(`${BASE}/booth-mockups/menu?key=${KEY}`, {
  waitUntil: 'networkidle',
});
const menuStops = [
  { ms: 500, name: 'menu-01-pre-sheet' },
  { ms: 2200, name: 'menu-02-user-question' },
  { ms: 5500, name: 'menu-03-allergy-filter' },
  { ms: 10500, name: 'menu-04-recommendations' },
  { ms: 16000, name: 'menu-05-order' },
];
let last = 0;
for (const s of menuStops) {
  const wait = s.ms - last;
  if (wait > 0) await page.waitForTimeout(wait);
  last = s.ms;
  const out = path.join(OUT, `${s.name}.png`);
  await page.screenshot({ path: out });
  console.log(`saved ${path.relative(process.cwd(), out)} (@${s.ms}ms)`);
}

await browser.close();
