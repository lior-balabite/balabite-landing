// Reusable WhatsApp group-chat phone frame.
//
// Renders the iOS status bar + chat header + thread + input bar; receives
// the message list as a prop so multiple scenarios share the same visual
// scaffolding (86-salmon, shift swap, complaint-while-away, …).
//
// Sender names follow real WA group palette: each Member gets a stable
// tone. BalaBite has the palm avatar; the Owner's outbound bubble is
// right-aligned green with read ticks.

import type React from 'react';

export type AvatarTone =
  | 'amber'
  | 'plum'
  | 'sky'
  | 'forest'
  | 'rose'
  | 'teal';

export type Member = {
  name: string;
  role?: string;
  tone: AvatarTone;
  isBalaBite?: boolean;
};

export type Message = {
  sender: Member;
  time: string;
  body: React.ReactNode;
  bodySoft?: React.ReactNode;
  isOwner?: boolean; // right-aligned green bubble
  showRead?: boolean; // double blue ticks (owner messages)
};

export type WhatsAppFrameProps = {
  groupName: string;
  subline: string;
  thread: Message[];
  iosTime?: string;
  dataTestId: string;
  /** First-line above thread; default "TODAY". */
  datePill?: string;
};

const TONE_COLOR: Record<AvatarTone, string> = {
  amber: '#d97706',
  plum: '#7c3aed',
  sky: '#0369a1',
  forest: '#0c3832',
  rose: '#be185d',
  teal: '#0d9488',
};

const SENDER_CLASS: Record<AvatarTone, string> = {
  amber: 'wa-sender-amber',
  plum: 'wa-sender-plum',
  sky: 'wa-sender-sky',
  forest: 'wa-sender-forest',
  rose: 'wa-sender-rose',
  teal: 'wa-sender-teal',
};

const Icon = {
  Back: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      />
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"
      />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.01 15.38a11.94 11.94 0 0 1-4.07-.71 1 1 0 0 0-1.05.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.2a1 1 0 0 0 .24-1.05A11.36 11.36 0 0 1 7.83 3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-2.63a1 1 0 0 0-.99-.99z"
      />
    </svg>
  ),
  More: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="5" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="19" r="2" fill="currentColor" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18 8h-1V6a5 5 0 1 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 1 1 6.2 0v2z"
      />
    </svg>
  ),
  Smiley: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.5-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 6.5a4.5 4.5 0 0 0 4.18-2.84.75.75 0 0 0-.7-1.02H8.52a.75.75 0 0 0-.7 1.02A4.5 4.5 0 0 0 12 17.5z"
      />
    </svg>
  ),
  Attach: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.5 6v11.5a4 4 0 1 1-8 0V5a2.5 2.5 0 1 1 5 0v10.5a1 1 0 1 1-2 0V6H10v9.5a2.5 2.5 0 1 0 5 0V5a4 4 0 1 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5z"
      />
    </svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="13" r="3" fill="currentColor" />
      <path
        fill="currentColor"
        d="M9.4 4 7.5 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L14.6 4H9.4zM12 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
      />
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5.91-3a.91.91 0 0 0-.91.91A5 5 0 0 1 7 11.91a.91.91 0 1 0-1.82 0 6.83 6.83 0 0 0 5.91 6.75V21h1.82v-2.34a6.83 6.83 0 0 0 5.91-6.75.91.91 0 0 0-.91-.91z"
      />
    </svg>
  ),
  Tick2: () => (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="wa-tick">
      <path
        fill="currentColor"
        d="M5.5 11.6 2.4 8.5l-1 1L5.5 13.6 14.5 4.6l-1-1L5.5 11.6zm5 0L7.4 8.5l-1 1 1 1 3.1 3.1L17.5 6.6l-1-1L10.5 11.6z"
      />
    </svg>
  ),
};

function Avatar({ member }: { member: Member }) {
  if (member.isBalaBite) {
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
                WebkitMask:
                  'url(/palm-1592.svg) no-repeat center / contain',
                mask: 'url(/palm-1592.svg) no-repeat center / contain',
              }}
            />
          </g>
        </svg>
      </span>
    );
  }
  return (
    <span className="wa-avatar-sm" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill={TONE_COLOR[member.tone]} />
        <circle cx="20" cy="16" r="6" fill="rgba(255,255,255,0.92)" />
        <path
          fill="rgba(255,255,255,0.92)"
          d="M8 34a12 12 0 0 1 24 0v6H8z"
        />
      </svg>
    </span>
  );
}

function MessageRow({ msg }: { msg: Message }) {
  if (msg.isOwner) {
    return (
      <div className="wa-msg wa-msg-out">
        <div className="wa-bubble wa-bubble-out">
          <div className="wa-body">{msg.body}</div>
          {msg.bodySoft && (
            <div className="wa-body wa-body-soft">{msg.bodySoft}</div>
          )}
          <div className="wa-meta">
            <span className="wa-time">{msg.time}</span>
            {msg.showRead && <Icon.Tick2 />}
          </div>
          <span className="wa-tail wa-tail-out" aria-hidden="true" />
        </div>
      </div>
    );
  }
  // Real WhatsApp shows only the name; role is kept on the Member for
  // color coding via senderClass, never rendered in the bubble.
  const senderLabel = msg.sender.name;
  const senderClass = msg.sender.isBalaBite
    ? 'wa-sender-bb'
    : SENDER_CLASS[msg.sender.tone];
  return (
    <div className="wa-msg wa-msg-in">
      <Avatar member={msg.sender} />
      <div className="wa-bubble wa-bubble-in">
        <div className={`wa-sender ${senderClass}`}>{senderLabel}</div>
        <div className="wa-body">{msg.body}</div>
        {msg.bodySoft && (
          <div className="wa-body wa-body-soft">{msg.bodySoft}</div>
        )}
        <div className="wa-meta">
          <span className="wa-time">{msg.time}</span>
        </div>
        <span className="wa-tail" aria-hidden="true" />
      </div>
    </div>
  );
}

export function WhatsAppFrame({
  groupName,
  subline,
  thread,
  iosTime = '8:48',
  dataTestId,
  datePill = 'TODAY',
}: WhatsAppFrameProps) {
  return (
    <main className="wa-root" data-testid={dataTestId}>
      <div className="wa-phone">
        <div className="wa-notch" aria-hidden="true" />

        {/* iOS status bar */}
        <header className="wa-status">
          <span className="wa-status-time">{iosTime}</span>
          <span className="wa-status-right">
            <svg
              viewBox="0 0 18 12"
              className="wa-signal"
              aria-hidden="true"
            >
              <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
              <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
              <rect x="10" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
              <rect
                x="15"
                y="0"
                width="3"
                height="12"
                rx="0.5"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
            <span className="wa-status-batt">
              <span className="wa-status-batt-fill" />
            </span>
          </span>
        </header>

        {/* Chat header */}
        <header className="wa-header">
          <button className="wa-back" aria-label="Back">
            <Icon.Back />
          </button>
          <div className="wa-avatar-lg" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#0c3832" />
              <path
                fill="#fcd34d"
                d="M11 15h18v3H11zM12 19h16l-1.5 11h-13zM18 8h4l1 5h-6z"
              />
            </svg>
          </div>
          <div className="wa-header-text">
            <div className="wa-title">{groupName}</div>
            <div className="wa-sub">{subline}</div>
          </div>
          <div className="wa-header-actions">
            <button className="wa-header-btn" aria-label="Video call">
              <Icon.Video />
            </button>
            <button className="wa-header-btn" aria-label="Voice call">
              <Icon.Phone />
            </button>
            <button className="wa-header-btn" aria-label="More">
              <Icon.More />
            </button>
          </div>
        </header>

        {/* Thread */}
        <div className="wa-thread">
          <div className="wa-encrypt">
            <Icon.Lock />
            <span>
              Messages and calls are end-to-end encrypted. Only people in
              this chat can read them. Tap to learn more.
            </span>
          </div>

          <div className="wa-date-pill">{datePill}</div>

          {thread.map((msg, i) => (
            <MessageRow key={i} msg={msg} />
          ))}
        </div>

        {/* Input bar */}
        <footer className="wa-input">
          <div className="wa-input-pill">
            <button className="wa-input-ico-btn" aria-label="Emoji">
              <Icon.Smiley />
            </button>
            <span className="wa-input-placeholder">Message</span>
            <button className="wa-input-ico-btn" aria-label="Attach">
              <Icon.Attach />
            </button>
            <button className="wa-input-ico-btn" aria-label="Camera">
              <Icon.Camera />
            </button>
          </div>
          <button className="wa-mic" aria-label="Voice message">
            <Icon.Mic />
          </button>
        </footer>
      </div>
    </main>
  );
}
