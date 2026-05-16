'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Marketing Room — Cofounder is running campaigns autonomously.
// Left rail: live campaign orbs.
// Center stage: the in-flight action (email assembling word-by-word).
// Right rail: receipts of work already done.
// Loop: ~42s — typing → dispatch lines → publication → receipt drops.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Orb = {
  id: string;
  label: string;
  tone: 'gold' | 'green' | 'plum' | 'muted';
  status: 'active' | 'just-done' | 'queued' | 'scheduled';
};

const ORBS: Orb[] = [
  { id: 'fri', label: 'Friday email', tone: 'gold', status: 'active' },
  { id: 'lamb', label: 'Lamb reel', tone: 'green', status: 'just-done' },
  { id: 'lapsed', label: 'Lapsed regulars', tone: 'plum', status: 'queued' },
  { id: 'mday', label: 'Mother’s Day brunch', tone: 'muted', status: 'scheduled' },
];

// The email assembles word-by-word. Same pattern as a typewriter reveal.
const EMAIL_BODY =
  'Three weeks ago we ran out. You asked when. Friday at 5:30 we’re putting it back on — same braise, served with the spring peas Maria’s been holding for it. Walk-ins welcome, but the regulars get first dibs — reply to this and I’ll save you a seat.';

const DISPATCH = [
  'pulling: last 30 days of dinner reviews',
  'pulling: weather forecast Fri-Sun',
  'pulling: lamb supplier ETA',
];

type Receipt = {
  time: string;
  title: string;
  body: React.ReactNode;
  liveCounter?: boolean;
};

const RECEIPTS: Receipt[] = [
  {
    time: '7:41a',
    title: 'Replied to Lina’s DM',
    body: (
      <>
        <i>&ldquo;Yes &mdash; table for 4, Sat 7p. You&rsquo;re on the
        list, see you then.&rdquo;</i>
      </>
    ),
  },
  {
    time: '7:38a',
    title: 'Posted reel to Instagram',
    body: (
      <>
        <i>&ldquo;The lamb dish, table 12 reaction.&rdquo;</i>
      </>
    ),
    liveCounter: true,
  },
  {
    time: '7:33a',
    title: 'Paused the Reels ad',
    body: (
      <>
        $11 CPM, no bookings the last 3 days.{' '}
        <strong>$42 saved this week.</strong>
      </>
    ),
  },
  {
    time: '7:21a',
    title: 'Replied to a 3-star review',
    body: (
      <>
        Thanked them, offered the chef&rsquo;s tasting on their next visit.
        They accepted.
      </>
    ),
  },
];

export function MarketingDeskMockup() {
  const [tick, setTick] = useState(0);
  const [emailLen, setEmailLen] = useState(0);
  const [dispatchVisible, setDispatchVisible] = useState(0);
  const [reelViews, setReelViews] = useState(12);
  const [redOrb, setRedOrb] = useState(false);
  const [runId, setRunId] = useState(0);

  // Word-by-word email assembly
  useEffect(() => {
    const words = EMAIL_BODY.split(' ');
    if (emailLen >= words.length) return;
    const t = setTimeout(() => setEmailLen((n) => n + 1), 70);
    return () => clearTimeout(t);
  }, [emailLen, runId]);

  // Dispatch line stagger
  useEffect(() => {
    if (dispatchVisible >= DISPATCH.length) return;
    const t = setTimeout(() => setDispatchVisible((n) => n + 1), 1400);
    return () => clearTimeout(t);
  }, [dispatchVisible, runId]);

  // Live IG view counter ticks up
  useEffect(() => {
    const t = setInterval(() => setReelViews((n) => n + 1), 1200);
    return () => clearInterval(t);
  }, [runId]);

  // Red-orb alert mid-loop (Lapsed regulars flagged for you)
  useEffect(() => {
    const t1 = setTimeout(() => setRedOrb(true), 18000);
    const t2 = setTimeout(() => setRedOrb(false), 22000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [runId]);

  // Loop reset
  useEffect(() => {
    const t = setTimeout(() => {
      setEmailLen(0);
      setDispatchVisible(0);
      setRedOrb(false);
      setReelViews(12);
      setRunId((n) => n + 1);
      setTick((n) => n + 1);
    }, 42000);
    return () => clearTimeout(t);
  }, [tick]);

  const emailText = EMAIL_BODY.split(' ').slice(0, emailLen).join(' ');

  return (
    <main className="mk-root" data-testid="booth-mockup-marketing">
      {/* Header */}
      <header className="mk-header">
        <div className="mk-brand">
          <span className="mk-brand-palm" aria-hidden="true" />
          <span className="mk-brand-name">
            Cofounder <span className="mk-brand-sep">·</span> Marketing room
          </span>
        </div>
        <div className="mk-header-right">
          <span className="mk-live-dot" aria-hidden="true" />
          <span className="mk-live-label">Tue 7:42a · live</span>
          <span className="mk-autopilot">
            Auto-pilot <span className="mk-autopilot-on">on</span>
          </span>
        </div>
      </header>

      <div className="mk-layout">
        {/* ——— Left rail — campaign orbs ——— */}
        <aside className="mk-rail mk-rail-left">
          <div className="mk-rail-head">In flight</div>
          <div className="mk-orbs">
            {ORBS.map((o, i) => (
              <div
                key={o.id}
                className={`mk-orb mk-orb-${o.tone}${o.status === 'active' ? ' is-active' : ''}${redOrb && o.id === 'lapsed' ? ' is-flagged' : ''}`}
              >
                <span className="mk-orb-ring" aria-hidden="true" style={{ animationDuration: `${12 + i * 6}s` }} />
                <span className="mk-orb-core" />
                <span className="mk-orb-label">{o.label}</span>
              </div>
            ))}
          </div>
          <div className="mk-rail-foot">
            <strong>4 in flight</strong>
            <span> · {redOrb ? '1 needs you' : '0 needs you'}</span>
          </div>
        </aside>

        {/* ——— Center stage — in-flight action ——— */}
        <section className="mk-stage">
          <div className="mk-stage-eyebrow">
            <span className="mk-cursor-bar" aria-hidden="true" />
            Writing the Friday newsletter
          </div>

          <article className="mk-draft">
            <div className="mk-draft-subject">
              Subject:{' '}
              <strong>&ldquo;We finally got the lamb back.&rdquo;</strong>
            </div>
            <div className="mk-draft-body">
              {emailText}
              <span className="mk-draft-cursor" aria-hidden="true" />
            </div>
            <div className="mk-draft-meta">
              <span>Audience: <strong>1,284 regulars</strong></span>
              <span className="mk-meta-sep">·</span>
              <span>Send 5:30p Fri</span>
              <span className="mk-meta-sep">·</span>
              <span>Expected opens: <strong>~38%</strong></span>
              <span className="mk-meta-soft"> (+18% vs. May avg)</span>
            </div>
            <div className="mk-draft-actions">
              <button className="mk-btn mk-btn-primary">approve</button>
              <button className="mk-btn mk-btn-ghost">tweak the subject</button>
              <button className="mk-btn mk-btn-icon" aria-label="kill">
                ✕
              </button>
            </div>
          </article>

          {/* Dispatch lines */}
          <div className="mk-dispatch">
            <AnimatePresence>
              {DISPATCH.slice(0, dispatchVisible).map((d, i) => (
                <motion.div
                  key={i}
                  className="mk-dispatch-line"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="mk-arrow">↑</span> {d}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ——— Right rail — receipts ——— */}
        <aside className="mk-rail mk-rail-right">
          <div className="mk-rail-head">Receipts</div>
          <div className="mk-receipts">
            {RECEIPTS.map((r, i) => (
              <motion.div
                key={i}
                className="mk-receipt"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.4 }}
              >
                <div className="mk-receipt-head">
                  <span className="mk-receipt-time">{r.time}</span>
                  <span className="mk-receipt-pill" aria-hidden="true">
                    <span className="mk-receipt-palm" />
                    Cofounder
                  </span>
                </div>
                <div className="mk-receipt-title">{r.title}</div>
                <div className="mk-receipt-body">
                  {r.body}
                  {r.liveCounter && (
                    <span className="mk-live-counter">
                      <strong>{reelViews}</strong> views/min
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="mk-footer">
        <em>Cofounder is running 4 campaigns. You&rsquo;re free.</em>
      </footer>
    </main>
  );
}
