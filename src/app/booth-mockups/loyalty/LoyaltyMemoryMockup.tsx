'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Loyalty — "The room"
// Three bands of regulars (Warm / Drifting / New faces). Loop event:
// a Warm regular cools, AI sends a note, they reply, warm back up.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Person = {
  id: string;
  name: string;
  meta: string;
  note: string;
  badge: string;
  tone: 'amber' | 'rose' | 'forest' | 'slate' | 'plum';
};

const WARM: Person[] = [
  {
    id: 'marcus',
    name: 'Marcus C.',
    meta: 'Tues 7p · table 4 · the lamb, no peas',
    note: 'thinks the music is too loud after 8',
    badge: '+3 this month',
    tone: 'amber',
  },
  {
    id: 'lila',
    name: 'Lila & Sam',
    meta: 'Sun 11a · brunch · greens omelet, GF',
    note: 'wedding anniversary May 22 — booked already',
    badge: 'every week',
    tone: 'rose',
  },
  {
    id: 'patels',
    name: 'The Patels',
    meta: 'Fri 6:30p · table 12 · 4 tops, kid menu',
    note: 'Aisha is allergic to sesame, Naya is vegan',
    badge: '+2 this month',
    tone: 'forest',
  },
];

const DRIFTING: Person[] = [
  {
    id: 'diego',
    name: 'Diego R.',
    meta: 'last in April 3 · 41 days · used to be Friday-night',
    note: 'always orders the steak, tips 22%',
    badge: 'cooling',
    tone: 'slate',
  },
  {
    id: 'karen',
    name: 'Karen M.',
    meta: 'last in March 28 · 47 days · used to be Sat brunch',
    note: 'twins — birthday Tuesday, they turn 6',
    badge: 'cooling',
    tone: 'plum',
  },
];

const NEW_FACES = [
  { id: 'redhead', label: '"the redhead, Wednesdays"', visits: '3 visits in 2 weeks' },
  { id: 'brewery', label: '"the couple from the brewery next door"', visits: '2 visits this week' },
];

function PersonCard({
  p,
  drifting = false,
  active = false,
}: {
  p: Person;
  drifting?: boolean;
  active?: boolean;
}) {
  return (
    <motion.div
      className={`ly-card ${drifting ? 'is-drifting' : 'is-warm'}${active ? ' is-active' : ''}`}
      layout
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className={`ly-avatar ly-avatar-${p.tone}`} aria-hidden="true">
        <span className="ly-avatar-glow" />
        <span className="ly-avatar-letter">{p.name[0]}</span>
      </span>
      <div className="ly-card-body">
        <div className="ly-card-row">
          <span className="ly-card-name">{p.name}</span>
          <span className="ly-card-badge">{p.badge}</span>
        </div>
        <div className="ly-card-meta">{p.meta}</div>
        <div className="ly-card-note">
          <em>&ldquo;{p.note}&rdquo;</em>
        </div>
      </div>
    </motion.div>
  );
}

export function LoyaltyMemoryMockup() {
  // The loop event: Marcus cools, AI sends note, Marcus replies.
  // Phases: idle → cooling → outreach → reply → reset
  const [phase, setPhase] = useState<
    'idle' | 'cooling' | 'outreach' | 'reply' | 'reset'
  >('idle');
  const [reachOpen, setReachOpen] = useState(false);
  const [counter, setCounter] = useState({ warm: 142, drifting: 8 });

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('cooling'), 4000));
    timers.push(
      setTimeout(() => {
        setPhase('outreach');
        setReachOpen(true);
        setCounter((c) => ({ warm: c.warm - 1, drifting: c.drifting + 1 }));
      }, 6500),
    );
    timers.push(setTimeout(() => setPhase('reply'), 14000));
    timers.push(
      setTimeout(() => {
        setPhase('reset');
        setReachOpen(false);
        setCounter({ warm: 142, drifting: 8 });
      }, 22000),
    );
    timers.push(setTimeout(() => setPhase('idle'), 24000));
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const warmList =
    phase === 'cooling' || phase === 'outreach' || phase === 'reply'
      ? WARM.slice(1) // Marcus moves out
      : WARM;
  const driftingList =
    phase === 'cooling' || phase === 'outreach' || phase === 'reply'
      ? [WARM[0], ...DRIFTING]
      : DRIFTING;

  return (
    <main className="ly-root" data-testid="booth-mockup-loyalty">
      {/* Header */}
      <header className="ly-header">
        <div className="ly-brand">
          <span className="ly-brand-palm" aria-hidden="true" />
          <span className="ly-brand-name">
            Cofounder <span className="ly-brand-sep">·</span> The room
          </span>
        </div>
        <div className="ly-counters">
          <span>
            <strong>{counter.warm}</strong> returning
          </span>
          <span className="ly-counter-sep">·</span>
          <span>
            <strong className={counter.drifting > 8 ? 'ly-pulse' : ''}>
              {counter.drifting}
            </strong>{' '}
            drifting
          </span>
          <span className="ly-counter-sep">·</span>
          <span>
            <strong>3</strong> new faces this week
          </span>
        </div>
      </header>

      {/* Warm */}
      <section className="ly-band">
        <div className="ly-band-head">
          <span className="ly-band-title">Warm this week</span>
          <span className="ly-band-count">{counter.warm}</span>
        </div>
        <AnimatePresence>
          {warmList.map((p) => (
            <PersonCard key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </section>

      {/* Drifting */}
      <section className="ly-band">
        <div className="ly-band-head">
          <span className="ly-band-title">Drifting</span>
          <span className="ly-band-count">{counter.drifting}</span>
        </div>
        <AnimatePresence>
          {driftingList.map((p, i) => (
            <div key={p.id}>
              <PersonCard p={p} drifting active={p.id === 'marcus'} />
              {p.id === 'marcus' && reachOpen && (
                <motion.div
                  className="ly-thread"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div className="ly-thread-line">
                    <span className="ly-thread-bullet" aria-hidden="true">└──→</span>
                    <span className="ly-thread-pill">
                      <span className="ly-thread-palm" aria-hidden="true" />
                      Cofounder sent Marcus a note · 7:46a
                    </span>
                  </div>
                  <div className="ly-thread-body">
                    <em>
                      &ldquo;The lamb&rsquo;s back Friday. Your table?&rdquo;
                    </em>
                  </div>
                  {phase === 'reply' || phase === 'reset' ? (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="ly-thread-reply"
                    >
                      <span className="ly-reply-dot" aria-hidden="true" />
                      Marcus replied · 7:51a — <em>&ldquo;Yes. 7p, table 4.&rdquo;</em>
                    </motion.div>
                  ) : null}
                </motion.div>
              )}
              {i === driftingList.length - 1 && null}
            </div>
          ))}
        </AnimatePresence>
      </section>

      {/* New faces */}
      <section className="ly-band ly-band-new">
        <div className="ly-band-head">
          <span className="ly-band-title">New faces</span>
          <span className="ly-band-count">3</span>
        </div>
        {NEW_FACES.map((f) => (
          <div key={f.id} className="ly-newface">
            <span className="ly-newface-dot" aria-hidden="true" />
            <span className="ly-newface-label">{f.label}</span>
            <span className="ly-newface-visits">{f.visits}</span>
            <span className="ly-newface-action">+ name them</span>
          </div>
        ))}
      </section>

      <footer className="ly-footer">
        <span className="ly-footer-palm" aria-hidden="true" />
        <em>
          I remember <strong>{counter.warm}</strong> of your regulars.{' '}
          <strong>{counter.drifting}</strong> are slipping. I&rsquo;m on it.
        </em>
      </footer>
    </main>
  );
}
