// Recipes auto-crawl: visit /recipes, enumerate every clickable element,
// click each one in isolation, capture the resulting state, then refresh
// and move to the next. Produces a stack of PNGs covering every UI state
// the page exposes — no human picking is required.
//
// Output: public/booth/screens/recipes-crawl/<slug>-<NN>.png
//
// Run (with the product app running on :3017):
//   node scripts/crawl-recipes.mjs

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const TARGET = 'http://localhost:3017/recipes';
const OUT = path.resolve(process.cwd(), 'public/booth/screens/recipes-crawl');
const VIEWPORT = { width: 1440, height: 900 };

// Discover clickable elements via a broad CSS selector. We avoid pure
// links to non-recipes paths (they'd nav off the page); we keep
// in-page buttons, tabs, role=button, and sidebar nav items.
const CLICKABLE_SELECTOR = [
  'button:visible',
  '[role="button"]:visible',
  '[role="tab"]:visible',
  'a[href^="#"]:visible',
  'a[href="/recipes"]:visible',
  '[data-testid]:visible',
  // Sidebar list items (best-effort — these often aren't buttons but are clickable)
  '[role="listitem"]:visible',
  'li[class*="view"]:visible',
  'li[class*="filter"]:visible',
].join(', ');

function slug(s) {
  return (
    (s || 'unnamed')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) || 'unnamed'
  );
}

async function getLabel(handle) {
  try {
    const text = (await handle.innerText()).trim();
    if (text) return text;
    const aria = await handle.getAttribute('aria-label');
    if (aria) return aria;
    const testId = await handle.getAttribute('data-testid');
    if (testId) return testId;
  } catch {
    // detached / not measurable
  }
  return 'unlabeled';
}

async function loadAndScroll(page) {
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 30_000 });
  // Some elements are only visible after a settle.
  await page.waitForTimeout(500);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log(`crawl: ${TARGET}`);
  await loadAndScroll(page);

  // 0 — baseline
  await page.screenshot({
    path: path.join(OUT, '00-baseline.png'),
    fullPage: true,
  });
  console.log('saved 00-baseline.png');

  // Enumerate clickables and record stable identifiers
  const handles = await page.locator(CLICKABLE_SELECTOR).all();
  const targets = [];
  const seen = new Set();
  for (const h of handles) {
    const label = await getLabel(h);
    const tag = await h.evaluate((el) => el.tagName).catch(() => '');
    const id = `${tag}::${label}`;
    if (seen.has(id)) continue;
    seen.add(id);
    targets.push({ label, tag });
  }
  console.log(`found ${targets.length} unique clickable targets`);

  // Click each in isolation: refresh, locate by label, click, capture
  let i = 1;
  for (const t of targets) {
    const name = `${String(i).padStart(2, '0')}-${slug(t.label)}`;
    try {
      await loadAndScroll(page);
      // Re-locate by visible text. Playwright's `getByText`/`getByRole` is
      // resilient across refreshes; we fall back to a CSS search by label.
      let target;
      const exact = page.getByText(t.label, { exact: true }).first();
      if (await exact.count()) {
        target = exact;
      } else {
        target = page.getByLabel(t.label, { exact: false }).first();
      }
      if (!(await target.count())) {
        // Last-ditch: any role=button with matching name
        target = page.getByRole('button', { name: t.label }).first();
      }
      // Use force-click to bypass overlays that might intercept.
      await target.scrollIntoViewIfNeeded({ timeout: 2_000 });
      await target.click({ trial: false, timeout: 3_000 });
      // Let any modal / panel settle
      await page.waitForTimeout(450);
      await page.screenshot({
        path: path.join(OUT, `${name}.png`),
        fullPage: true,
      });
      console.log(`  ${name}.png  (clicked "${t.label}")`);
    } catch (err) {
      console.log(`  skipped "${t.label}": ${err.message.split('\n')[0]}`);
    }
    i++;
  }

  await browser.close();
})();
