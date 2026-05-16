'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// 86-salmon — live-typed loop per Béhar's spec.
// Each bubble: 1.2s typing indicator above the sender's avatar, then the
// bubble lands (scale 0.96 → 1.0). Final state holds, then fades and
// restarts. The booth observer watches the chat unfold from 6ft.

type Sender = {
  name: string;
  /** stable color tone */
  tone: 'amber' | 'plum' | 'sky' | 'forest';
  isBalaBite?: boolean;
  isOwner?: boolean;
};

const Marco: Sender = { name: 'Marco', tone: 'amber' };
const BB: Sender = { name: 'BalaBite', tone: 'forest', isBalaBite: true };
const Priya: Sender = { name: 'Priya', tone: 'plum' };
const Devon: Sender = { name: 'Devon', tone: 'sky' };
const Owner: Sender = { name: 'You', tone: 'forest', isOwner: true };

type Msg = {
  key: string;
  sender: Sender;
  time: string;
  body: React.ReactNode;
  bodySoft?: React.ReactNode;
  typingMs: number;
  holdMs: number;
};

const THREAD: Msg[] = [
  {
    key: 'm1',
    sender: Marco,
    time: '8:47 PM',
    body: <>86 salmon</>,
    typingMs: 900,
    holdMs: 1800,
  },
  {
    key: 'm2',
    sender: BB,
    time: '8:48 PM',
    body: (
      <>
        Got it. Pulled it from the POS and the online menus.
        <br />
        On tomorrow&rsquo;s prep sheet.
      </>
    ),
    bodySoft: <>The next table won&rsquo;t have to be told mid-order.</>,
    typingMs: 1400,
    holdMs: 3200,
  },
  {
    key: 'm3',
    sender: Priya,
    time: '8:48 PM',
    body: <>telling tables now 🙏</>,
    typingMs: 1100,
    holdMs: 1600,
  },
  {
    key: 'm4',
    sender: Devon,
    time: '8:49 PM',
    body: (
      <>
        pushing the yellowtail crudo as the call instead. flagging to FOH.
      </>
    ),
    typingMs: 1300,
    holdMs: 2200,
  },
  {
    key: 'm5',
    sender: Owner,
    time: '8:49 PM',
    body: <>yes, push the crudo. thx all 🙏</>,
    typingMs: 900,
    holdMs: 4500,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TypingDots() {
  return (
    <span className="wa-typing-dots" aria-hidden="true">
      <span /> <span /> <span />
    </span>
  );
}

function Avatar({ sender }: { sender: Sender }) {
  if (sender.isBalaBite) {
    return (
      <span className="wa-avatar-sm wa-avatar-bb" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="20" fill="#0c3832" />
          <g transform="translate(11,8)">
            <rect
              x="0"
              y="0"
              width="18"
              height="24"
              fill="#fcd34d"
              style={{
                WebkitMask: 'url(/palm-1592.svg) no-repeat center / contain',
                mask: 'url(/palm-1592.svg) no-repeat center / contain',
              }}
            />
          </g>
        </svg>
      </span>
    );
  }
  const fill = { amber: '#d97706', plum: '#7c3aed', sky: '#0369a1', forest: '#0c3832' }[sender.tone];
  return (
    <span className="wa-avatar-sm" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill={fill} />
        <circle cx="20" cy="16" r="6" fill="rgba(255,255,255,0.92)" />
        <path
          fill="rgba(255,255,255,0.92)"
          d="M8 34a12 12 0 0 1 24 0v6H8z"
        />
      </svg>
    </span>
  );
}

const SENDER_CLASS = {
  amber: 'wa-sender-amber',
  plum: 'wa-sender-plum',
  sky: 'wa-sender-sky',
  forest: 'wa-sender-forest',
} as const;

function MessageRow({ msg }: { msg: Msg }) {
  if (msg.sender.isOwner) {
    return (
      <motion.div
        className="wa-msg wa-msg-out"
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="wa-bubble wa-bubble-out">
          <div className="wa-body">{msg.body}</div>
          <div className="wa-meta">
            <span className="wa-time">{msg.time}</span>
            <svg viewBox="0 0 18 18" className="wa-tick" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5.5 11.6 2.4 8.5l-1 1L5.5 13.6 14.5 4.6l-1-1L5.5 11.6zm5 0L7.4 8.5l-1 1 1 1 3.1 3.1L17.5 6.6l-1-1L10.5 11.6z"
              />
            </svg>
          </div>
          <span className="wa-tail wa-tail-out" aria-hidden="true" />
        </div>
      </motion.div>
    );
  }
  const cls = msg.sender.isBalaBite ? 'wa-sender-bb' : SENDER_CLASS[msg.sender.tone];
  return (
    <motion.div
      className="wa-msg wa-msg-in"
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <Avatar sender={msg.sender} />
      <div className="wa-bubble wa-bubble-in">
        <div className={`wa-sender ${cls}`}>{msg.sender.name}</div>
        <div className="wa-body">{msg.body}</div>
        {msg.bodySoft && <div className="wa-body wa-body-soft">{msg.bodySoft}</div>}
        <div className="wa-meta">
          <span className="wa-time">{msg.time}</span>
        </div>
        <span className="wa-tail" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

function TypingRow({ sender }: { sender: Sender }) {
  return (
    <motion.div
      className="wa-msg wa-msg-in wa-msg-typing"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <Avatar sender={sender} />
      <div className="wa-bubble wa-bubble-in wa-bubble-typing">
        <TypingDots />
      </div>
    </motion.div>
  );
}

type Phase = { kind: 'typing'; idx: number } | { kind: 'shown'; idx: number };

export function WhatsAppMockup() {
  const [phase, setPhase] = useState<Phase>({ kind: 'typing', idx: 0 });
  const [runId, setRunId] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Guard against the brief reset state (idx === -1) and out-of-bounds.
    if (phase.idx < 0 || phase.idx >= THREAD.length) return;
    if (phase.kind === 'typing') {
      const t = setTimeout(
        () => setPhase({ kind: 'shown', idx: phase.idx }),
        THREAD[phase.idx].typingMs,
      );
      return () => clearTimeout(t);
    }
    // shown: hold, then advance OR loop
    const t = setTimeout(() => {
      const next = phase.idx + 1;
      if (next >= THREAD.length) {
        // fade + restart
        setPhase({ kind: 'typing', idx: -1 });
        setTimeout(() => {
          setRunId((n) => n + 1);
          setPhase({ kind: 'typing', idx: 0 });
        }, 700);
      } else {
        setPhase({ kind: 'typing', idx: next });
      }
    }, THREAD[phase.idx].holdMs);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.scrollTo({ top: s.scrollHeight, behavior: 'smooth' });
  }, [phase, runId]);

  const shownMessages: Msg[] = [];
  for (let i = 0; i < THREAD.length; i++) {
    if (phase.idx >= 0 && i < phase.idx) shownMessages.push(THREAD[i]);
    else if (phase.kind === 'shown' && i === phase.idx) shownMessages.push(THREAD[i]);
  }
  const showTyping =
    phase.kind === 'typing' && phase.idx >= 0 && phase.idx < THREAD.length;
  const typingSender =
    showTyping ? THREAD[phase.idx].sender : null;

  return (
    <main className="wa-root" data-testid="booth-mockup-whatsapp">
      <div className="wa-phone">
        <div className="wa-notch" aria-hidden="true" />

        {/* iOS status bar */}
        <header className="wa-status">
          <span className="wa-status-time">8:49</span>
          <span className="wa-status-right">
            <svg viewBox="0 0 18 12" className="wa-signal" aria-hidden="true">
              <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
              <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
              <rect x="10" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
              <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.4" />
            </svg>
            <span className="wa-status-batt">
              <span className="wa-status-batt-fill" />
            </span>
          </span>
        </header>

        {/* Chat header */}
        <header className="wa-header">
          <button className="wa-back" aria-label="Back">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="wa-avatar-lg" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#0c3832" />
              <path fill="#fcd34d" d="M11 15h18v3H11zM12 19h16l-1.5 11h-13zM18 8h4l1 5h-6z" />
            </svg>
          </div>
          <div className="wa-header-text">
            <div className="wa-title">Staff</div>
            <div className="wa-sub">
              You, Marco, Priya, Devon, BalaBite, Maria, James, Sam, Carla, …
            </div>
          </div>
        </header>

        {/* Thread */}
        <div className="wa-thread" key={`run-${runId}`} ref={scrollRef}>
          <div className="wa-encrypt">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18 8h-1V6a5 5 0 1 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 1 1 6.2 0v2z"
              />
            </svg>
            <span>
              Messages and calls are end-to-end encrypted. Only people in
              this chat can read them. Tap to learn more.
            </span>
          </div>

          <div className="wa-date-pill">TODAY</div>

          <AnimatePresence initial={false}>
            {shownMessages.map((m) => (
              <MessageRow key={m.key} msg={m} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping && typingSender && (
              <TypingRow key={`typing-${phase.idx}`} sender={typingSender} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
