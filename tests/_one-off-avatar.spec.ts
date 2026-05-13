import { test } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const OUT = path.join(process.cwd(), 'docs', 'banner-screenshots');

const PALM_SVG = fs.readFileSync(
  path.join(process.cwd(), 'public', 'palm-1592.svg'),
  'utf8',
);

const palmDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(PALM_SVG)}`;

function htmlPage({
  bg,
  fg,
  layout,
}: {
  bg: string;
  fg: string;
  layout: 'stacked' | 'horizontal';
}) {
  const stackedBody = `
    <div class="frame">
      <div class="lockup-v">
        <div class="palm-v"></div>
        <div class="word">balabite</div>
      </div>
    </div>`;

  const horizontalBody = `
    <div class="frame">
      <div class="lockup-h">
        <div class="palm-h"></div>
        <div class="word-h">balabite</div>
      </div>
    </div>`;

  return `<!doctype html>
<html><head>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; padding: 0; background: ${bg}; }
  .frame {
    width: 400px;
    height: 400px;
    display: grid;
    place-items: center;
    background: ${bg};
  }
  .lockup-v {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .palm-v {
    width: 150px;
    height: 200px;
    background-color: ${fg};
    -webkit-mask: url('${palmDataUri}') no-repeat center / contain;
            mask: url('${palmDataUri}') no-repeat center / contain;
  }
  .word {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-size: 64px;
    line-height: 0.9;
    color: ${fg};
    letter-spacing: -0.01em;
  }
  .lockup-h {
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }
  .palm-h {
    width: 92px;
    height: 132px;
    background-color: ${fg};
    -webkit-mask: url('${palmDataUri}') no-repeat center / contain;
            mask: url('${palmDataUri}') no-repeat center / contain;
  }
  .word-h {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-size: 72px;
    line-height: 0.85;
    color: ${fg};
    letter-spacing: -0.01em;
  }
</style></head>
<body>${layout === 'stacked' ? stackedBody : horizontalBody}</body></html>`;
}

async function snap(page: any, html: string, name: string) {
  await page.setViewportSize({ width: 400, height: 400 });
  await page.setContent(html);
  // wait for fonts
  await page.evaluate(() =>
    (document as any).fonts ? (document as any).fonts.ready : Promise.resolve(),
  );
  await page.screenshot({
    path: path.join(OUT, name),
    clip: { x: 0, y: 0, width: 400, height: 400 },
  });
}

test('cal avatar — palm + wordmark stacked (cream)', async ({ page }) => {
  await snap(
    page,
    htmlPage({ bg: '#FAF5EE', fg: '#0F172A', layout: 'stacked' }),
    'cal-avatar-stacked-cream.png',
  );
});

test('cal avatar — palm + wordmark horizontal (cream)', async ({ page }) => {
  await snap(
    page,
    htmlPage({ bg: '#FAF5EE', fg: '#0F172A', layout: 'horizontal' }),
    'cal-avatar-horizontal-cream.png',
  );
});

test('cal avatar — palm + wordmark stacked (teal)', async ({ page }) => {
  await snap(
    page,
    htmlPage({ bg: 'rgb(12, 56, 50)', fg: '#FAF5EE', layout: 'stacked' }),
    'cal-avatar-stacked-teal.png',
  );
});
