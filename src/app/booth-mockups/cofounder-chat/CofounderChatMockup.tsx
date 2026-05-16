'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ————————————————————————————————————————————————————————————
// /booth-mockups/cofounder-chat
//
// Two surfaces of the same conversation:
//   - MAIN (left/center): the active beat in spotlight — large type,
//     cofounder envelope, amber underline on key values, typing dots
//     between sub-paragraphs. Reads as a chat from 6ft.
//   - SIDE (right rail): the whole transcript accumulating in small,
//     auto-scrolling to the bottom. The "what's been said" log.
// Both clear and restart together at loop reset.
// ————————————————————————————————————————————————————————————

type AiBeat =
  | { kind: 'p'; key: string; hold: number; content: React.ReactNode; pop?: boolean }
  | { kind: 'table-head'; key: string; hold: number }
  | {
      kind: 'table-row';
      key: string;
      hold: number;
      driver: string;
      revenue: string;
      share: string;
      pop?: boolean;
    }
  | {
      kind: 'bullet';
      key: string;
      hold: number;
      content: React.ReactNode;
      pop?: boolean;
    };

type FlatBeat = AiBeat | { kind: 'user'; key: string; hold: number; text: string };

const TURN_A: AiBeat[] = [
  {
    kind: 'p',
    key: 'a-p1',
    hold: 4200,
    pop: true,
    content: (
      <>
        That confirms it &mdash;{' '}
        <span className="cc-mark">today was a genuine $5,840 day</span>,
        no asterisk needed.
      </>
    ),
  },
  {
    kind: 'p',
    key: 'a-p2',
    hold: 2400,
    content: <>So here&rsquo;s the real breakdown of what drove it:</>,
  },
  { kind: 'table-head', key: 'a-th', hold: 1200 },
  {
    kind: 'table-row',
    key: 'a-tr1',
    hold: 1800,
    driver: 'Catering order (table 20)',
    revenue: '$1,140',
    share: '19.5%',
    pop: true,
  },
  {
    kind: 'table-row',
    key: 'a-tr2',
    hold: 1600,
    driver: 'Strong dinner service (7 PM hour)',
    revenue: '$1,340',
    share: '22.9%',
  },
  {
    kind: 'table-row',
    key: 'a-tr3',
    hold: 1600,
    driver: 'Solid morning push (10 AM)',
    revenue: '$680',
    share: '11.6%',
  },
  {
    kind: 'table-row',
    key: 'a-tr4',
    hold: 2200,
    driver: 'Rest of day',
    revenue: '$2,680',
    share: '46.0%',
  },
  {
    kind: 'p',
    key: 'a-p3',
    hold: 5400,
    pop: true,
    content: (
      <>
        The catering was a meaningful boost, but the underlying day was
        already running hot without it.{' '}
        <span className="cc-mark">
          $4,700 in organic revenue on a Wednesday
        </span>{' '}
        is your best baseline this month.
      </>
    ),
  },
  {
    kind: 'p',
    key: 'a-p4',
    hold: 2000,
    content: <>A couple of things worth noting:</>,
  },
  {
    kind: 'bullet',
    key: 'a-b1',
    hold: 7000,
    content: (
      <>
        <strong>Catering isn&rsquo;t showing up cleanly in your POS</strong>{' '}
        &mdash; that &ldquo;Unknown Item / $1,140 manual entry&rdquo; is
        going to make your food cost meaningless for today. Worth setting
        up a proper line item if catering recurs.
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'a-b2',
    hold: 7400,
    pop: true,
    content: (
      <>
        <strong>Is catering something you&rsquo;re actively pursuing?</strong>{' '}
        You&rsquo;re at <span className="cc-mark">$134K/month</span>. Three
        more orders this size moves you to <span className="cc-mark">$137K</span>{' '}
        &mdash; without adding a walk-in cover. Twelve gets you to{' '}
        <span className="cc-mark">$148K</span>. The question is kitchen
        capacity, not demand.
      </>
    ),
  },
  {
    kind: 'p',
    key: 'a-p5',
    hold: 3800,
    content: <>Are you doing catering regularly, or was this a one-off?</>,
  },
];

const USER_REPLY: FlatBeat = {
  kind: 'user',
  key: 'u1',
  hold: 2600,
  text: 'i want to do',
};

const TURN_B: AiBeat[] = [
  {
    kind: 'p',
    key: 'b-p1',
    hold: 3000,
    pop: true,
    content: <strong>Love it. Let&rsquo;s build this out properly.</strong>,
  },
  {
    kind: 'p',
    key: 'b-p2',
    hold: 3200,
    content: (
      <>
        Before I put together a strategy, a few quick questions so
        I&rsquo;m not giving you generic advice:
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'b-b1',
    hold: 3400,
    content: (
      <>
        <strong>What kind of catering?</strong> Office lunches, events,
        corporate drop-off, full-service?
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'b-b2',
    hold: 5000,
    content: (
      <>
        <strong>Kitchen capacity?</strong> You&rsquo;re already at 70-80
        hour weeks on the two BOH leads. On top of service, or slower days
        only?
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'b-b3',
    hold: 3400,
    content: (
      <>
        <strong>Minimum order size?</strong> Today&rsquo;s $1,140
        comfortable, or set a higher floor (say $500)?
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'b-b4',
    hold: 3400,
    content: (
      <>
        <strong>Delivery or pickup only?</strong> You have a courier tip
        line in your POS &mdash; would catering go the same way?
      </>
    ),
  },
  {
    kind: 'bullet',
    key: 'b-b5',
    hold: 3000,
    content: (
      <>
        <strong>Do you have a menu for it yet</strong>, or pull from the
        existing?
      </>
    ),
  },
  {
    kind: 'p',
    key: 'b-p3',
    hold: 5400,
    pop: true,
    content: (
      <>
        The reason I ask: your{' '}
        <span className="cc-mark">
          Wednesday and Thursday are your weakest days
        </span>{' '}
        &mdash; catering could fill exactly those gaps. Execution depends
        on your constraints, especially with BOH already stretched thin.
      </>
    ),
  },
  {
    kind: 'p',
    key: 'b-p4',
    hold: 8000,
    content: <>What do you have in mind?</>,
  },
];

const TIMELINE: FlatBeat[] = [...TURN_A, USER_REPLY, ...TURN_B];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TypingDots() {
  return (
    <span className="cc-typing" aria-hidden="true">
      <span className="cc-typing-dot" />
      <span className="cc-typing-dot" />
      <span className="cc-typing-dot" />
    </span>
  );
}

function EnvelopeHeader({ label }: { label: string }) {
  return (
    <div className="cc-env-header">
      <span className="cc-env-avatar" aria-hidden="true">
        <span className="cc-env-palm" />
      </span>
      <span className="cc-env-name">Cofounder</span>
      <span className="cc-env-sep" aria-hidden="true">·</span>
      <span className="cc-env-time">{label}</span>
    </div>
  );
}

/** Spotlight render of a beat — large type, full content. */
function SpotlightBeat({ beat }: { beat: FlatBeat | undefined }) {
  if (!beat) return null;
  if (beat.kind === 'user') {
    return (
      <motion.div
        key={beat.key}
        className="cc-spot-row cc-spot-user-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="cc-spot-user">{beat.text}</div>
      </motion.div>
    );
  }
  if (beat.kind === 'table-head') {
    return (
      <motion.div
        key={beat.key}
        className="cc-spot-table-head"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="cc-cell cc-cell-driver">DRIVER</div>
        <div className="cc-cell cc-cell-num">REVENUE</div>
        <div className="cc-cell cc-cell-num">SHARE</div>
      </motion.div>
    );
  }
  if (beat.kind === 'table-row') {
    return (
      <motion.div
        key={beat.key}
        className="cc-spot-table-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="cc-cell cc-cell-driver">{beat.driver}</div>
        <div className="cc-cell cc-cell-num">
          <strong>{beat.revenue}</strong>
        </div>
        <div className="cc-cell cc-cell-num">{beat.share}</div>
      </motion.div>
    );
  }
  if (beat.kind === 'bullet') {
    return (
      <motion.div
        key={beat.key}
        className="cc-spot-bullet"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {beat.content}
      </motion.div>
    );
  }
  // p
  return (
    <motion.p
      key={beat.key}
      className="cc-spot-p"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {beat.content}
      <span className="cc-cursor" aria-hidden="true" />
    </motion.p>
  );
}

/** Small transcript entry — used in the side rail. */
function TranscriptEntry({ beat }: { beat: FlatBeat }) {
  if (beat.kind === 'user') {
    return (
      <div className="cc-trans-row cc-trans-user-row">
        <span className="cc-trans-user">{beat.text}</span>
      </div>
    );
  }
  if (beat.kind === 'table-head') {
    return (
      <div className="cc-trans-row">
        <div className="cc-trans-table-head">
          <span>DRIVER</span>
          <span>REVENUE</span>
          <span>SHARE</span>
        </div>
      </div>
    );
  }
  if (beat.kind === 'table-row') {
    return (
      <div className="cc-trans-row">
        <div className="cc-trans-table-row">
          <span>{beat.driver}</span>
          <span className="cc-trans-num">{beat.revenue}</span>
          <span className="cc-trans-num">{beat.share}</span>
        </div>
      </div>
    );
  }
  if (beat.kind === 'bullet') {
    return (
      <div className="cc-trans-row cc-trans-bullet">{beat.content}</div>
    );
  }
  return <div className="cc-trans-row cc-trans-p">{beat.content}</div>;
}

export function CofounderChatMockup() {
  const [index, setIndex] = useState(0);
  const [runId, setRunId] = useState(0);
  const transRef = useRef<HTMLDivElement | null>(null);

  // Advance through the flat timeline; fade-out + restart at end.
  useEffect(() => {
    if (index >= TIMELINE.length) {
      const t = setTimeout(() => {
        setIndex(0);
        setRunId((n) => n + 1);
      }, 1600);
      return () => clearTimeout(t);
    }
    const beat = TIMELINE[index];
    const t = setTimeout(() => setIndex((i) => i + 1), beat.hold);
    return () => clearTimeout(t);
  }, [index]);

  // Auto-scroll the transcript to keep the latest entry visible.
  useEffect(() => {
    const t = transRef.current;
    if (!t) return;
    t.scrollTo({ top: t.scrollHeight, behavior: 'smooth' });
  }, [index, runId]);

  const playhead = Math.min(index, TIMELINE.length - 1);
  const activeBeat = TIMELINE[playhead];
  const turnALen = TURN_A.length;
  const userIndex = turnALen;
  const turnLabel =
    playhead < userIndex ? 'just now' : playhead > userIndex ? 'just now' : '';

  // Transcript shows everything up to (and including) the current beat,
  // grouped by sender (Cofounder turns vs. operator pill).
  const visible = TIMELINE.slice(0, Math.min(playhead + 1, TIMELINE.length));
  const transA = visible.filter(
    (b, i) => i < userIndex && b.kind !== 'user',
  );
  const transUser = visible.find((b) => b.kind === 'user');
  const transB = visible
    .slice(userIndex + 1)
    .filter((b) => b.kind !== 'user');

  // Typing indicators: visible if the active beat is mid-stream in a turn
  const turnAOpen = playhead < userIndex;
  const turnBOpen = playhead > userIndex && playhead < TIMELINE.length - 1;

  return (
    <main className="cc-root" data-testid="booth-mockup-cofounder-chat">
      <div className="cc-top-scrim" aria-hidden="true" />
      <div className="cc-attrib" aria-label="Source attribution">
        Real conversation with a Miami restaurant owner.
        <span className="cc-attrib-sep"> · </span>
        <span className="cc-attrib-muted">Names changed, numbers nudged.</span>
      </div>

      <div className="cc-layout" key={`run-${runId}`}>
        {/* ——— Spotlight (main) ——— */}
        <section className="cc-spotlight">
          {playhead < userIndex && (
            <EnvelopeHeader label={turnLabel || 'just now'} />
          )}
          {playhead > userIndex && (
            <EnvelopeHeader label={turnLabel || 'just now'} />
          )}
          <div className="cc-spotlight-body">
            <AnimatePresence mode="wait">
              <SpotlightBeat beat={activeBeat} />
            </AnimatePresence>
          </div>
          {(turnAOpen || turnBOpen) && activeBeat?.kind !== 'user' && (
            <div className="cc-typing-row">
              <TypingDots />
              <span className="cc-typing-label">Cofounder is typing</span>
            </div>
          )}
        </section>

        {/* ——— Transcript (side rail) ——— */}
        <aside className="cc-transcript" ref={transRef}>
          <div className="cc-trans-head">Transcript</div>
          {transA.length > 0 && (
            <div className="cc-trans-block">
              <div className="cc-trans-author">Cofounder</div>
              {transA.map((b) => (
                <TranscriptEntry key={b.key} beat={b} />
              ))}
            </div>
          )}
          {transUser && (
            <div className="cc-trans-block cc-trans-user-block">
              <div className="cc-trans-author cc-trans-author-user">You</div>
              <TranscriptEntry beat={transUser} />
            </div>
          )}
          {transB.length > 0 && (
            <div className="cc-trans-block">
              <div className="cc-trans-author">Cofounder</div>
              {transB.map((b) => (
                <TranscriptEntry key={b.key} beat={b} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
