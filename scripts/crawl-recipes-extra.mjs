// Focused capture of the recipes states the main crawl missed:
// - Book tab (top-of-page, scrollIntoView failed in the bulk crawl)
// - A specific dish detail (drill into one card)

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const TARGET = 'http://localhost:3017/recipes';
const OUT = path.resolve(process.cwd(), 'public/booth/screens/recipes-crawl');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

async function load() {
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

// 1) Book tab
try {
  await load();
  const book = page.getByRole('button', { name: /^▦?\s*Book/i }).first();
  let target = book;
  if (!(await target.count())) {
    target = page.getByText(/Book/i, { exact: false }).first();
  }
  await target.click({ force: true, timeout: 4_000 });
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT, '31-book-view.png'),
    fullPage: true,
  });
  console.log('saved 31-book-view.png');
} catch (e) {
  console.log(`book: ${e.message.split('\n')[0]}`);
}

// 2) Dish detail — click on the first dish title in the Bench feed.
//    The cards have product names like "Tuna Toast", "Restaurant Depot",
//    "Mango Tango Bowl". Pick one that reads like a real dish.
try {
  await load();
  const candidates = ['Tuna Toast', 'Mango Tango Bowl', 'Tuna salad'];
  let clicked = false;
  for (const name of candidates) {
    const link = page.getByText(name, { exact: true }).first();
    if (await link.count()) {
      await link.click({ force: true, timeout: 4_000 });
      await page.waitForTimeout(900);
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const out = path.join(OUT, `32-dish-${slug}.png`);
      await page.screenshot({ path: out, fullPage: true });
      console.log(`saved 32-dish-${slug}.png`);
      clicked = true;
      break;
    }
  }
  if (!clicked) console.log('dish: no candidate found');
} catch (e) {
  console.log(`dish: ${e.message.split('\n')[0]}`);
}

// 3) "See the four" — drill into the small-set view
try {
  await load();
  const link = page.getByText(/See the four/i).first();
  if (await link.count()) {
    await link.click({ force: true, timeout: 4_000 });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(OUT, '33-see-the-four-detail.png'),
      fullPage: true,
    });
    console.log('saved 33-see-the-four-detail.png');
  }
} catch (e) {
  console.log(`see-the-four: ${e.message.split('\n')[0]}`);
}

await browser.close();
