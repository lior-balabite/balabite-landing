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

type RailIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

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

type IframeStep = {
  kind: 'iframe';
  id:
    | 'staff-chat'
    | 'cofounder-chat'
    | 'menu'
    | 'recipes'
    | 'marketing'
    | 'loyalty';
  railIndex: RailIndex;
  /** Captured still — the booth-mockup itself is live at /booth-mockups/<id> */
  src: string;
  /** Optional click-through to the live mockup */
  liveHref?: string;
  verb: string;
  heading: React.ReactNode;
  body: React.ReactNode;
  points: string[];
  /** Aspect ratio of the captured still (default 16/9 from booth-tv viewport) */
  aspect?: number;
};

type Step = StatementStep | ScreenStep | IframeStep;

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
    // Updated to match the captured product preview (top-of-page Pulse).
    aspect: 685 / 471,
    alt: 'BalaBite Pulse — the morning briefing: health score, six domain scores, a written narrative addressed to the operator by name.',
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
      'Written like a cofounder talking, not a report to decode.',
      'One observation it already acted on — every morning.',
    ],
    // Highlight overlays disabled until the product preview's true element
    // positions are confirmed — the old coordinates pointed at empty space
    // on the new layout.
    highlights: [],
  },
  {
    kind: 'screen',
    id: 'acts',
    railIndex: 1,
    src: '/investors/pulse-background.png',
    aspect: 670 / 795,
    alt: 'BalaBite acting: a reprice decision waiting for approval, plus the running-in-background and this-week record sections.',
    verb: 'It acts.',
    heading: (
      <>
        While you ran service, <i>it ran the rest.</i>
      </>
    ),
    body: (
      <>
        A reprice ready to approve. Six workflows running in the background,
        five queued. Customer retention up. Food cost on flagged items down.{' '}
        <b>Nobody asked. It just handled it.</b>
      </>
    ),
    points: [
      'One decision waiting for you — with the math shown.',
      'Six workflows active, five queued — always something moving.',
      'Sometimes it asks. Mostly it acts.',
    ],
    highlights: [],
  },
  {
    kind: 'screen',
    id: 'owns',
    railIndex: 2,
    src: '/investors/pulse-record.png',
    aspect: 753 / 366,
    alt: "BalaBite's weekly record — what didn't land (the happy-hour pricing experiment, reverted) and what's on the horizon.",
    verb: 'It owns it.',
    heading: (
      <>
        What didn&rsquo;t land. <i>And what&rsquo;s next.</i>
      </>
    ),
    body: (
      <>
        The happy-hour experiment dropped revenue per order &mdash; so it
        was reverted. The week&rsquo;s next moves are already lined up.{' '}
        <b>A vendor never tells you their thing failed. A cofounder does.</b>
      </>
    ),
    points: [
      '“Didn’t land” is a section. On purpose.',
      'Profitability tracking, digital audit, competitor scan — queued.',
      'Honest by default — that’s the partnership.',
    ],
    highlights: [],
  },
  {
    kind: 'iframe',
    id: 'staff-chat',
    railIndex: 3,
    src: '/booth/stills/staff-chat.png',
    liveHref: '/booth-mockups/whatsapp?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'In the staff chat.',
    heading: (
      <>
        86 salmon &mdash; <i>handled in 60 seconds.</i>
      </>
    ),
    body: (
      <>
        BalaBite sits in the staff WhatsApp. When the line calls 86, it
        pulls the item from the POS, the online menus, and tomorrow&rsquo;s
        prep sheet &mdash; before the next table orders.
      </>
    ),
    points: [
      'The POS, the online menus, the prep sheet — one update.',
      'The team self-organizes. The Cofounder unblocks them.',
      'Sometimes it asks. Mostly it acts.',
    ],
  },
  {
    kind: 'iframe',
    id: 'cofounder-chat',
    railIndex: 3,
    src: '/booth/stills/cofounder-chat.png',
    liveHref: '/booth-mockups/cofounder-chat?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'Reads the day.',
    heading: (
      <>
        A real conversation. <i>Not a chatbot.</i>
      </>
    ),
    body: (
      <>
        Pulled from a real customer chat. The Cofounder breaks down the
        day in plain language &mdash; spots the POS hygiene issue, surfaces
        the catering opportunity, asks the right next question.
      </>
    ),
    points: [
      'Talks like a partner who knows the place.',
      'Math that ties out — every number earns its line.',
      'Asks before it acts.',
    ],
  },
  {
    kind: 'iframe',
    id: 'recipes',
    railIndex: 4,
    src: '/booth/stills/recipes.png',
    liveHref: '/booth-mockups/recipes?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'The book stays honest.',
    heading: (
      <>
        Last night&rsquo;s invoices. <i>Four moved.</i>
      </>
    ),
    body: (
      <>
        Every invoice that lands, every dish it touches &mdash; re-costed
        by morning. Drift surfaced. Price bump drafted. Yours to approve.
      </>
    ),
    points: [
      'Catches the slow bleeds nobody felt.',
      'Marks what it isn’t sure about — asks first.',
      'You sign, not it.',
    ],
  },
  {
    kind: 'iframe',
    id: 'menu',
    railIndex: 5,
    src: '/booth/stills/menu.png',
    liveHref: '/booth-mockups/menu?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'The AI waiter.',
    heading: (
      <>
        Allergies, in any language. <i>Filtered, not warned.</i>
      </>
    ),
    body: (
      <>
        The guest speaks. The menu listens. Items that don&rsquo;t fit
        disappear; substitutions surface. Voice-first, no language barrier.
      </>
    ),
    points: [
      'Pulled from your recipe book — last verified Tuesday.',
      'Dish cards inline, not text-only suggestions.',
      'Speaks any language your guest speaks.',
    ],
  },
  {
    kind: 'iframe',
    id: 'marketing',
    railIndex: 6,
    src: '/booth/stills/marketing.png',
    liveHref: '/booth-mockups/marketing?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'It runs the marketing.',
    heading: (
      <>
        Four campaigns in flight. <i>Yours to sign off.</i>
      </>
    ),
    body: (
      <>
        Writing the Friday newsletter while you sleep. Replied to Lina&rsquo;s
        DM. Paused the Reels ad &mdash; $42 saved. The receipts pile up;
        the work doesn&rsquo;t pile up on you.
      </>
    ),
    points: [
      'Four campaigns running — zero need you right now.',
      'Every action shows its work — the dispatch lines.',
      'You read the receipts. The Cofounder is the marketer.',
    ],
  },
  {
    kind: 'iframe',
    id: 'loyalty',
    railIndex: 7,
    src: '/booth/stills/loyalty.png',
    liveHref: '/booth-mockups/loyalty?key=balabite-nra-2026',
    aspect: 16 / 9,
    verb: 'It remembers the room.',
    heading: (
      <>
        Marcus is slipping. <i>The Cofounder reaches out first.</i>
      </>
    ),
    body: (
      <>
        Not a points program. The Cofounder knows the regulars &mdash;
        their orders, their kids&rsquo; allergies, their anniversaries.
        When someone drifts, it&rsquo;s on it before you notice.
      </>
    ),
    points: [
      'Warm / Drifting / New faces — the room in three bands.',
      'The names you forget. The dates you forget.',
      'Outreach before slippage, not after.',
    ],
  },
  {
    kind: 'statement',
    id: 'close',
    eyebrow: 'Booth 8332 · NRA Show 2026',
    heading: (
      <>
        Live since February.
        <br />
        <i>This is a taste.</i>
      </>
    ),
    sub: (
      <>
        Let me show you the rest &mdash; on <span className="demo-amber">your</span>{' '}
        real numbers. Forty-five minutes.
      </>
    ),
    cta: 'book',
  },
];

const RAIL = [
  { num: '01', label: 'It sees' },
  { num: '02', label: 'It acts' },
  { num: '03', label: 'It owns it' },
  { num: '04', label: 'The chat' },
  { num: '05', label: 'The book' },
  { num: '06', label: 'The menu' },
  { num: '07', label: 'Marketing' },
  { num: '08', label: 'The room' },
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

function IframeView({ step }: { step: IframeStep }) {
  const aspect = step.aspect ?? 16 / 9;
  return (
    <div
      className="demo-split demo-split-iframe"
      style={{ '--demo-aspect': String(aspect) } as CSSProperties}
    >
      <div className="demo-frame-wrap">
        <motion.div
          className="demo-frame"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={step.src} alt={step.id} />
          {step.liveHref && (
            <a
              href={step.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-live-link"
            >
              Play live →
            </a>
          )}
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
        Book a time →
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
      Book a time →
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
    step.kind === 'screen' || step.kind === 'iframe'
      ? step.railIndex
      : isLast
        ? RAIL.length - 1
        : null;

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
            ) : step.kind === 'iframe' ? (
              <IframeView step={step} />
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
