// Booth screen capture — Playwright, deviceScaleFactor 3.
//
// Captures: one fullPage PNG + N viewport frames at evenly spaced scroll
// positions. The viewport frames are what we hand-pick "best shots" from.
// Output: public/booth/screens/<name>-full.png and <name>-NN.png
//
// Run:
//   node scripts/capture-booth-screens.mjs            # all targets
//   node scripts/capture-booth-screens.mjs recipes    # one target by name
//
// Add new targets to TARGETS below.

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'public/booth/screens');
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE = 3;
const FRAME_COUNT = 6; // viewport frames per target — picked from after capture

// Each target captures one fullPage shot + FRAME_COUNT viewport scrolls.
// `waitFor` is a CSS selector to wait on before capturing (page-specific).
const TARGETS = [
  {
    name: 'recipes',
    url: 'http://localhost:3017/recipes',
    // No login on the local product app — straight in.
    waitFor: undefined,
  },
  {
    name: 'menu-miami-squeeze',
    url: 'https://app.balabite.ai/r/miami-squeeze-123/t/0',
    waitFor: undefined,
    // Mobile viewport — this surface is for guests on their phones.
    viewport: { width: 390, height: 844 },
  },
  // open-tabs added once Lior surfaces the route
  // mockup captures from this repo
  {
    name: 'mockup-whatsapp',
    url:
      'http://localhost:3000/booth-mockups/whatsapp?key=balabite-nra-2026',
    waitFor: '[data-testid="booth-mockup-whatsapp"]',
    frameCount: 1, // single phone — no scroll variation needed
  },
  {
    name: 'mockup-cofounder-chat',
    url:
      'http://localhost:3000/booth-mockups/cofounder-chat?key=balabite-nra-2026',
    waitFor: '[data-testid="booth-mockup-cofounder-chat"]',
  },
  {
    name: 'mockup-whatsapp-shift-swap',
    url:
      'http://localhost:3000/booth-mockups/whatsapp-shift-swap?key=balabite-nra-2026',
    waitFor: '[data-testid="booth-mockup-whatsapp-shift-swap"]',
    frameCount: 1,
  },
  {
    name: 'mockup-whatsapp-complaint',
    url:
      'http://localhost:3000/booth-mockups/whatsapp-complaint?key=balabite-nra-2026',
    waitFor: '[data-testid="booth-mockup-whatsapp-complaint"]',
    frameCount: 1,
  },
];

async function captureOne(browser, target) {
  const viewport = target.viewport ?? VIEWPORT;
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await ctx.newPage();

  console.log(`→ ${target.name}: GET ${target.url}`);
  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30_000 });
  if (target.waitFor) {
    await page.waitForSelector(target.waitFor, { timeout: 10_000 });
  }
  // Let async UI settle (animations, font swap)
  await page.waitForTimeout(800);

  // 1) Full page
  const fullPath = path.join(OUT_DIR, `${target.name}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`   saved ${path.relative(process.cwd(), fullPath)}`);

  // 2) Viewport scroll frames
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const maxScroll = Math.max(0, pageHeight - viewport.height);
  const frames = target.frameCount ?? FRAME_COUNT;
  for (let i = 0; i < frames; i++) {
    const y = frames === 1 ? 0 : Math.round((i / (frames - 1)) * maxScroll);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(350);
    const framePath = path.join(
      OUT_DIR,
      `${target.name}-${String(i + 1).padStart(2, '0')}.png`,
    );
    await page.screenshot({ path: framePath, fullPage: false });
    console.log(`   saved ${path.relative(process.cwd(), framePath)} (y=${y})`);
  }

  await ctx.close();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const filter = process.argv[2];
  const targets = filter
    ? TARGETS.filter((t) => t.name === filter)
    : TARGETS;
  if (filter && targets.length === 0) {
    console.error(`No target named "${filter}". Available:`);
    for (const t of TARGETS) console.error(`  - ${t.name}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  try {
    for (const t of targets) {
      try {
        await captureOne(browser, t);
      } catch (err) {
        console.error(`✗ ${t.name}: ${err.message}`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
