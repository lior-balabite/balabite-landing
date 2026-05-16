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

type BeatId =
  | 'hook'
  | 'problem'
  | 'proof'
  | 'how'
  | 'product'
  | 'real'
  | 'logo'
  | 'logo-a'
  | 'logo-b'
  | 'logo-c'
  | 'logo-d'
  | 'logo-e'
  | 'logo-f'
  | 'mockup-whatsapp'
  | 'mockup-menu'
  | 'mockup-loyalty'
  | 'mockup-marketing'
  | 'mockup-recipes'
  | 'mockup-cofounder';

// Each mockup runs as a "video" beat playing its live loop, with a
// "balabite.ai" station bumper (logo) between every clip. Snappy mockups
// first; deep ones last.
const BEATS: { id: BeatId; ms: number }[] = [
  // — Narrative spine (original 6 beats)
  { id: 'hook', ms: 8000 },
  { id: 'problem', ms: 9000 },
  { id: 'proof', ms: 18000 },
  { id: 'how', ms: 14000 },
  { id: 'product', ms: 22000 },
  { id: 'real', ms: 11000 },

  // — Mockup video reel, each separated by the BalaBite sign —
  { id: 'logo', ms: 4000 },
  { id: 'mockup-whatsapp', ms: 22000 },
  { id: 'logo-a', ms: 4000 },
  { id: 'mockup-menu', ms: 22000 },
  { id: 'logo-b', ms: 4000 },
  { id: 'mockup-loyalty', ms: 26000 },
  { id: 'logo-c', ms: 4000 },
  { id: 'mockup-marketing', ms: 44000 },
  { id: 'logo-d', ms: 4000 },
  { id: 'mockup-recipes', ms: 62000 },
  { id: 'logo-e', ms: 4000 },
  { id: 'mockup-cofounder', ms: 82000 },
  { id: 'logo-f', ms: 4000 }, // final bumper before loop restart
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
  // Devlin's "moment of theatre" — one full-bleed serif sentence,
  // no eyebrow, no sub. The scene stops the walker.
  return (
    <div className="tv-stage tv-stage-theatre">
      <motion.div
        className="tv-theatre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <span className="tv-theatre-line">
          The owner is the only integration layer.
        </span>{' '}
        <motion.span
          className="tv-theatre-punch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 2.4 }}
        >
          Alone.
        </motion.span>
      </motion.div>
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
        Software gets installed.
        <br />
        <i>A cofounder gets built in.</i>
      </Rise>
      <Rise className="tv-sub" delay={2.8}>
        The engineer who built it runs the restaurant. Live since February 2026.
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

// — Mockup video beats: each loads the LIVE mockup in an iframe and
// plays its own internal loop. The iframe remounts on each beat entry
// so each mockup video starts from the top.
function MockupScene({ src, label }: { src: string; label: string }) {
  return (
    <div className="tv-stage tv-stage-mockup">
      <iframe className="tv-mockup-iframe" src={src} title={label} />
    </div>
  );
}

const KEY_PARAM = '?key=balabite-nra-2026';

const WhatsAppScene = () => (
  <MockupScene src={`/booth-mockups/whatsapp${KEY_PARAM}`} label="Staff chat" />
);
const MenuScene = () => (
  <MockupScene src={`/booth-mockups/menu${KEY_PARAM}`} label="AI waiter" />
);
const LoyaltyScene = () => (
  <MockupScene src={`/booth-mockups/loyalty${KEY_PARAM}`} label="The room" />
);
const MarketingScene = () => (
  <MockupScene src={`/booth-mockups/marketing${KEY_PARAM}`} label="Marketing" />
);
const RecipesScene = () => (
  <MockupScene src={`/booth-mockups/recipes${KEY_PARAM}`} label="Recipes" />
);
const CofounderScene = () => (
  <MockupScene src={`/booth-mockups/cofounder-chat${KEY_PARAM}`} label="Cofounder" />
);

function LogoScene() {
  return (
    <div className="tv-stage tv-stage-logo">
      <motion.div
        className="tv-lockup tv-lockup-xl"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <span className="tv-lockup-palm" aria-hidden="true" />
        <span className="tv-lockup-word">balabite</span>
      </motion.div>
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
  logo: LogoScene,
  'logo-a': LogoScene,
  'logo-b': LogoScene,
  'logo-c': LogoScene,
  'logo-d': LogoScene,
  'logo-e': LogoScene,
  'logo-f': LogoScene,
  'mockup-whatsapp': WhatsAppScene,
  'mockup-menu': MenuScene,
  'mockup-loyalty': LoyaltyScene,
  'mockup-marketing': MarketingScene,
  'mockup-recipes': RecipesScene,
  'mockup-cofounder': CofounderScene,
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
