'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ————————————————————————————————————————————————————————————
// /booth-tv — the silent booth TV loop.
//
// The narrative is NOT authored here. It is translated, beat-for-beat,
// from src/components/investors/ShortDeck.tsx slides 1–6:
//   1 Hook     → slide 1   2 Problem  → slide 2   3 Proof  → slide 3
//   4 How      → slide 4   5 Product  → slide 5   6 Real   → slide 6
//
// Customer-facing translation rule (per the brief): the deck says
// "AI business partner" — booth surfaces say "AI Cofounder".
//
// Silent, captioned, motion-driven, auto-advancing, seamless loop.
// ~82s total. Kiosk-clean: no visible chrome beyond a progress hairline.
// Hidden operator controls: Space = pause/resume, ←/→ = step, F = fullscreen.
// ————————————————————————————————————————————————————————————

type BeatId = 'hook' | 'problem' | 'proof' | 'how' | 'product' | 'real';

const BEATS: { id: BeatId; ms: number }[] = [
  { id: 'hook', ms: 8000 },
  { id: 'problem', ms: 9000 },
  { id: 'proof', ms: 18000 },
  { id: 'how', ms: 14000 },
  { id: 'product', ms: 22000 },
  { id: 'real', ms: 11000 },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The 6 pain → action pairs — verbatim from ShortDeck slide 3.
const PAIRS: { pain: string; action: React.ReactNode }[] = [
  {
    pain: 'The bok choy you ordered that never showed.',
    action: <>Reordered it before Friday&rsquo;s delivery.</>,
  },
  {
    pain: 'The hurricane Wednesday.',
    action: <>Pushed a delivery promo before the storm killed dine-in.</>,
  },
  {
    pain: 'The new coffee spot two doors down.',
    action: <>Benchmarked their pricing. Flagged your slipping morning regulars.</>,
  },
  {
    pain: 'The catering inquiry sitting in your inbox since Monday.',
    action: <>Drafted the quote. Held the date.</>,
  },
  {
    pain: 'The whiteboard you haven&rsquo;t touched in months.',
    action: <>Shipped three items off it.</>,
  },
  {
    pain: 'Prime cost drifting 58% → 63%.',
    action: <>Found the leak &mdash; the fish supplier.</>,
  },
];

const SCREENS = [
  {
    src: '/investors/pulse-hero.png',
    tag: 'The Pulse',
    label: 'The day, at a glance.',
  },
  {
    src: '/investors/pulse-background.png',
    tag: 'Running in background',
    label: 'The Cofounder doesn’t sleep.',
  },
  {
    src: '/investors/pulse-record.png',
    tag: 'This week’s record',
    label: 'What worked. What didn’t.',
  },
];

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function HookScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        BalaBite
      </Rise>
      <Rise className="tv-display" delay={0.35}>
        Too many fires.
        <br />
        Too many fixes.
        <br />
        Can&rsquo;t get to them.
      </Rise>
      <Rise className="tv-line" delay={2.6}>
        <i>The role outgrew the human.</i>
      </Rise>
    </div>
  );
}

function ProblemScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        The problem
      </Rise>
      <Rise className="tv-display" delay={0.35}>
        The owner is the only
        <br />
        integration layer.
      </Rise>
      <Rise className="tv-punch" delay={2.8}>
        Alone.
      </Rise>
      <Rise className="tv-sub" delay={5}>
        And the math won&rsquo;t pay for the team that would carry the rest.
      </Rise>
    </div>
  );
}

function ProofScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        Your AI Cofounder
      </Rise>
      <Rise className="tv-display tv-display-md" delay={0.3}>
        It runs <i>the rest.</i>
      </Rise>
      <div className="tv-pairs">
        {PAIRS.map((p, i) => (
          <motion.div
            key={i}
            className="tv-pair"
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.1 + i * 1.15 }}
          >
            <div
              className="tv-pair-pain"
              dangerouslySetInnerHTML={{ __html: p.pain }}
            />
            <div className="tv-pair-action">{p.action}</div>
          </motion.div>
        ))}
      </div>
      <Rise className="tv-punch" delay={9.4}>
        While you slept.
      </Rise>
    </div>
  );
}

function HowScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        How it sees
      </Rise>
      <div className="tv-vignette">
        <Rise className="tv-timestamp" delay={0.4}>
          8:47pm &middot; Staff chat
        </Rise>
        <Rise className="tv-chat-bubble" delay={1}>
          86 salmon
        </Rise>
        <Rise className="tv-line" delay={2.6}>
          By 8:48 it&rsquo;s off the POS, off the online menus,
          <br />
          and on tomorrow&rsquo;s prep sheet.
        </Rise>
        <Rise className="tv-line" delay={5.2}>
          <span className="tv-amber">
            The server at table 6 never has to apologize.
          </span>
        </Rise>
      </div>
      <Rise className="tv-display tv-display-md" delay={8.4}>
        Sometimes it asks. <i>Mostly it acts.</i>
      </Rise>
    </div>
  );
}

function ProductScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        The product
      </Rise>
      <Rise className="tv-display tv-display-md" delay={0.3}>
        This is what lives in <i>your restaurant.</i>
      </Rise>
      <div className="tv-triptych">
        {SCREENS.map((s, i) => (
          <motion.div
            key={s.src}
            className="tv-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.4 + i * 1.3 }}
          >
            <div className="tv-panel-tag">{s.tag}</div>
            <motion.div
              className="tv-panel-frame"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: 'linear', delay: 1.4 + i * 1.3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.label} />
            </motion.div>
            <div className="tv-panel-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RealScene() {
  return (
    <div className="tv-stage">
      <Rise className="tv-eyebrow" delay={0.1}>
        Already live
      </Rise>
      <Rise className="tv-display" delay={0.35}>
        Not a vendor they installed.
        <br />
        <i>A partner they built in.</i>
      </Rise>
      <Rise className="tv-sub" delay={2.8}>
        One Miami independent. Live since February 2026.
      </Rise>
      <Rise delay={4.6}>
        <div className="tv-lockup">
          <span className="tv-lockup-palm" aria-hidden="true" />
          <span className="tv-lockup-word">balabite</span>
        </div>
        <div className="tv-booth-tag">Booth 8332 &middot; NRA Show 2026</div>
      </Rise>
    </div>
  );
}

const SCENES: Record<BeatId, () => React.ReactElement> = {
  hook: HookScene,
  problem: ProblemScene,
  proof: ProofScene,
  how: HowScene,
  product: ProductScene,
  real: RealScene,
};

export default function BoothTvLoop() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const beat = BEATS[index];
  const Scene = SCENES[beat.id];

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + BEATS.length) % BEATS.length);
  }, []);

  // Auto-advance + seamless loop. Re-arms whenever the beat changes or
  // playback resumes; pausing simply clears the timer.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % BEATS.length);
    }, beat.ms);
    return () => clearTimeout(t);
  }, [index, paused, beat.ms]);

  // Hidden operator controls — no visible chrome, but Lior can drive it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <main className="tv-root" data-testid="booth-tv" aria-label="BalaBite booth loop">
      <AnimatePresence mode="sync">
        <motion.section
          key={beat.id}
          className="tv-scene"
          data-beat={beat.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <Scene />
        </motion.section>
      </AnimatePresence>

      {/* The only chrome: a whisper-subtle progress hairline. Hidden while paused. */}
      {!paused && (
        <motion.div
          key={`progress-${index}`}
          className="tv-progress"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: beat.ms / 1000, ease: 'linear' }}
        />
      )}
    </main>
  );
}
