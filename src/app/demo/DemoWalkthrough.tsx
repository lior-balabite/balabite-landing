'use client';

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

// ————————————————————————————————————————————————————————————
// /demo — the guided 2–3 minute laptop demo.
//
// Built FROM the 3 Pulse PNGs (public/investors/pulse-*.png). The product
// is NOT rebuilt — the designed screens ARE the demo. A WalkMe-style,
// click-through walk: Open → Sees → Acts → Owns it → Close.
//
// Content is translated from ShortDeck slides 4–6 + the brief's spine.
// Narrative authorship lives in the deck; this only stages it.
// ————————————————————————————————————————————————————————————

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Resolve a direct Cal.com booking link for the closing CTA. Prefers a
// demo-specific slot, falls back to the booth page's "Numbers on the
// table" / after-service bookings. If none is configured, the CTA
// degrades gracefully to the booth page rather than dead-ending.
function urlToCalLink(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith('cal.com')) return null;
    return u.pathname.replace(/^\//, '');
  } catch {
    return null;
  }
}

const CAL_LINK =
  urlToCalLink(process.env.NEXT_PUBLIC_DEMO_CAL_URL) ??
  urlToCalLink(process.env.NEXT_PUBLIC_NRA_NUMBERS_URL) ??
  urlToCalLink(process.env.NEXT_PUBLIC_NRA_DRINKS_URL);

type Highlight = {
  top: string;
  left: string;
  width: string;
  height: string;
  tag: string;
  /* render the label inside the box (for boxes flush with the frame's top edge) */
  tagInside?: boolean;
};

type StatementStep = {
  kind: 'statement';
  id: string;
  eyebrow: string;
  heading: React.ReactNode;
  sub: React.ReactNode;
  cta?: 'book';
};

type ScreenStep = {
  kind: 'screen';
  id: 'sees' | 'acts' | 'owns';
  railIndex: 0 | 1 | 2;
  src: string;
  /* width / height of the PNG — drives the frame aspect-ratio */
  aspect: number;
  alt: string;
  verb: string;
  heading: React.ReactNode;
  body: React.ReactNode;
  points: string[];
  highlights: Highlight[];
};

type Step = StatementStep | ScreenStep;

const STEPS: Step[] = [
  {
    kind: 'statement',
    id: 'open',
    eyebrow: 'The two-minute walk',
    heading: (
      <>
        You&rsquo;re the only integration layer. <i>Alone.</i>
      </>
    ),
    sub: (
      <>
        A dozen tools that don&rsquo;t talk to each other &mdash; and
        you&rsquo;re the one holding them together, every night. The math
        won&rsquo;t pay for the team that would carry the rest. So your AI
        Cofounder does. Here&rsquo;s what that looks like.
      </>
    ),
  },
  {
    kind: 'screen',
    id: 'sees',
    railIndex: 0,
    src: '/investors/pulse-hero.png',
    aspect: 1348 / 1642,
    alt: 'BalaBite Pulse — the morning briefing: health score, six domain scores, a written narrative, and one reprice decision waiting for approval.',
    verb: 'It sees.',
    heading: (
      <>
        Menu, revenue, customers, ops &mdash; <i>one briefing.</i>
      </>
    ),
    body: (
      <>
        Not a dashboard to dig through. Your Cofounder reads the whole
        restaurant overnight and hands you the morning in plain language
        &mdash; <b>addressed to you by name.</b>
      </>
    ),
    points: [
      'Six domains, scored — what’s healthy, what’s drifting.',
      'Written like a partner talking, not a report to decode.',
      'One decision waiting for you. Just one.',
    ],
    highlights: [
      {
        top: '1%',
        left: '2%',
        width: '96%',
        height: '30%',
        tag: 'Synthesized overnight',
        tagInside: true,
      },
      {
        top: '60%',
        left: '2%',
        width: '96%',
        height: '38%',
        tag: 'One decision waiting',
      },
    ],
  },
  {
    kind: 'screen',
    id: 'acts',
    railIndex: 1,
    src: '/investors/pulse-background.png',
    aspect: 1466 / 1258,
    alt: 'BalaBite running in the background — six workflows active, five queued, with tasks handled automatically: menu descriptions, prep quantities, re-engagement emails.',
    verb: 'It acts.',
    heading: (
      <>
        While you ran service, <i>it ran the rest.</i>
      </>
    ),
    body: (
      <>
        Menu descriptions rewritten. Prep quantities adjusted for the
        forecast. A re-engagement email out to eight lapsed regulars.{' '}
        <b>Nobody asked. It just handled it.</b>
      </>
    ),
    points: [
      'Six workflows active, five queued — always something moving.',
      '“Handled automatically” — done, not suggested.',
      'Sometimes it asks. Mostly it acts.',
    ],
    highlights: [
      {
        top: '35%',
        left: '1.5%',
        width: '97%',
        height: '28%',
        tag: 'Done — not suggested',
      },
    ],
  },
  {
    kind: 'screen',
    id: 'owns',
    railIndex: 2,
    src: '/investors/pulse-record.png',
    aspect: 1376 / 1672,
    alt: "BalaBite's weekly record — what worked, what's still working, what didn't land (the happy-hour pricing experiment, reverted), and what's on the horizon.",
    verb: 'It owns it.',
    heading: (
      <>
        What worked. What&rsquo;s still going. <i>What didn&rsquo;t land.</i>
      </>
    ),
    body: (
      <>
        Retention up. Food cost down. And the happy-hour experiment? It
        dropped revenue per order &mdash; so it was reverted.{' '}
        <b>A vendor never tells you their thing failed. A cofounder does.</b>
      </>
    ),
    points: [
      'Outcomes, measured — not a list of activity.',
      '“Didn’t land” is a section. On purpose.',
      'Honest by default — that’s the partnership.',
    ],
    highlights: [
      {
        top: '51%',
        left: '1.5%',
        width: '97%',
        height: '13%',
        tag: 'It tells you what failed',
      },
    ],
  },
  {
    kind: 'statement',
    id: 'close',
    eyebrow: 'Booth 8332 · NRA Show 2026',
    heading: (
      <>
        One restaurant. Live since February.
        <br />
        <i>This is a taste.</i>
      </>
    ),
    sub: (
      <>
        Let me show you the rest &mdash; on <span className="demo-amber">your</span>{' '}
        real numbers. Twenty minutes.
      </>
    ),
    cta: 'book',
  },
];

const RAIL = [
  { num: '01', label: 'It sees' },
  { num: '02', label: 'It acts' },
  { num: '03', label: 'It owns it' },
];

function Rail({ activeRailIndex }: { activeRailIndex: number | null }) {
  return (
    <nav className="demo-rail" aria-label="Demo progress">
      {RAIL.map((r, i) => {
        const state =
          activeRailIndex === null
            ? ''
            : i === activeRailIndex
              ? 'is-active'
              : i < activeRailIndex
                ? 'is-done'
                : '';
        return (
          <div key={r.num} style={{ display: 'contents' }}>
            {i > 0 && <span className="demo-rail-sep" aria-hidden="true" />}
            <div className={`demo-rail-step ${state}`}>
              <span className="demo-rail-num">{r.num}</span>
              <span>{r.label}</span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function StatementView({ step }: { step: StatementStep }) {
  return (
    <div className="demo-statement">
      <motion.div
        className="demo-eyebrow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {step.eyebrow}
      </motion.div>
      <motion.h1
        className="demo-statement-h"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
      >
        {step.heading}
      </motion.h1>
      <motion.p
        className="demo-statement-sub"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.26 }}
      >
        {step.sub}
      </motion.p>
    </div>
  );
}

function ScreenView({ step }: { step: ScreenStep }) {
  return (
    <div
      className="demo-split"
      style={{ '--demo-aspect': String(step.aspect) } as CSSProperties}
    >
      <div className="demo-frame-wrap">
        <motion.div
          className="demo-frame"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={step.src} alt={step.alt} />
          {step.highlights.map((h, i) => (
            <motion.div
              key={h.tag}
              className="demo-highlight"
              style={{
                top: h.top,
                left: h.left,
                width: h.width,
                height: h.height,
              }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: 0.55 + i * 0.5,
              }}
            >
              <span
                className={`demo-highlight-tag${h.tagInside ? ' is-inside' : ''}`}
              >
                {h.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="demo-narration">
        <motion.div
          className="demo-verb"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {step.verb}
        </motion.div>
        <motion.h2
          className="demo-narration-h"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          {step.heading}
        </motion.h2>
        <motion.p
          className="demo-narration-body"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          {step.body}
        </motion.p>
        <div className="demo-points">
          {step.points.map((p, i) => (
            <motion.div
              key={p}
              className="demo-point"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.45 + i * 0.14 }}
            >
              <span>{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookCta() {
  if (CAL_LINK) {
    return (
      <button
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-config='{"theme":"dark","layout":"month_view"}'
        className="demo-btn demo-btn-primary demo-btn-cta"
        data-testid="demo-book-cta"
      >
        Book 20 minutes →
      </button>
    );
  }
  // Graceful fallback if no Cal.com link is configured via env.
  return (
    <a
      href="/booth-8332#menu"
      className="demo-btn demo-btn-primary demo-btn-cta"
      data-testid="demo-book-cta"
    >
      Book 20 minutes →
    </a>
  );
}

export default function DemoWalkthrough() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const isFirst = index === 0;
  const isLast = index === STEPS.length - 1;

  const next = useCallback(() => {
    setIndex((i) => Math.min(STEPS.length - 1, i + 1));
  }, []);
  const back = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Initialize the Cal.com embed once — matches /booth-8332's CalProvider.
  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'dark',
          cssVarsPerTheme: {
            light: { 'cal-brand': '#0F172A' },
            dark: { 'cal-brand': '#FCD34D' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch {
        // Cal API can fail in dev with no events configured — degrade gracefully.
      }
    })();
  }, []);

  // Keyboard nav — arrows / space advance, so Lior can drive it hands-light.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, back]);

  const activeRailIndex =
    step.kind === 'screen' ? step.railIndex : isLast ? 2 : null;

  return (
    <main className="demo-root" data-testid="demo" data-step={step.id}>
      <Rail activeRailIndex={activeRailIndex} />

      <div className="demo-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {step.kind === 'statement' ? (
              <StatementView step={step} />
            ) : (
              <ScreenView step={step} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="demo-controls">
        <button
          type="button"
          className="demo-btn demo-btn-ghost"
          onClick={back}
          disabled={isFirst}
          data-testid="demo-back"
        >
          ← Back
        </button>

        <div className="demo-progress-dots" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s.id} className={i === index ? 'is-active' : ''} />
          ))}
        </div>

        {isLast ? (
          <BookCta />
        ) : (
          <button
            type="button"
            className="demo-btn demo-btn-primary"
            onClick={next}
            data-testid="demo-next"
          >
            {isFirst ? 'Show me →' : 'Next →'}
          </button>
        )}
      </div>
    </main>
  );
}
