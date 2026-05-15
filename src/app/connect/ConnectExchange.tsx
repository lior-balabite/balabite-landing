'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* Contact icon — matches the stroke-based set on the card. */
function ContactIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

const REVEAL_KEY = 'connect-exchange-revealed';
type Status = 'idle' | 'submitting' | 'done' | 'error';

/**
 * Beat 1: the one-tap vCard link.
 * Beat 2: after the tap, a calm optional one-field email exchange — leave an
 * address, Lior's note lands in ~10s and he gets pinged. Skip it and the card
 * still did its job. The reveal is progressive, never a gate.
 */
export default function ConnectExchange() {
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const tappedRef = useRef(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    try {
      sessionStorage.setItem(REVEAL_KEY, '1');
    } catch {
      /* private mode — non-fatal */
    }
  }, []);

  // Restore the reveal across a reload so beat 2 doesn't vanish on refresh.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(REVEAL_KEY) === '1') setRevealed(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Backstop: if they left for the contact sheet / download and came back,
  // make sure beat 2 is showing when the page regains focus.
  useEffect(() => {
    const onVisible = () => {
      if (tappedRef.current && document.visibilityState === 'visible') reveal();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [reveal]);

  // The tap still navigates to /connect/vcard natively — iOS opens the
  // contact sheet, Android downloads the .vcf. We just schedule the reveal.
  const handleTap = useCallback(() => {
    tappedRef.current = true;
    window.setTimeout(reveal, 450);
  }, [reveal]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const website = String(data.get('website') || ''); // honeypot

    if (!email) {
      setStatus('error');
      setError('Enter your email.');
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus('error');
        setError(json.error || "That didn't go through — try once more?");
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
      setError("That didn't go through — try once more?");
    }
  }, []);

  return (
    <div>
      {/* Beat 1 — one-tap vCard */}
      <a
        href="/connect/vcard"
        onClick={handleTap}
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent-500 px-6 py-4 text-base font-semibold tracking-tight text-primary-950 shadow-[0_0_0_1px_rgba(251,191,36,0.3),0_10px_28px_-12px_rgba(251,191,36,0.65)] transition-all duration-200 hover:gap-3 hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.5),0_14px_36px_-12px_rgba(251,191,36,0.85)] focus-visible:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950 active:scale-[0.99]"
      >
        <ContactIcon className="h-5 w-5" />
        Add to Contacts
      </a>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-cream-200/45">
        One tap &middot; straight to your phone
      </p>

      {/* Beat 2 — revealed after the tap */}
      {revealed && (
        <div className="connect-reveal mt-7 border-t border-primary-700/40 pt-6">
          {status === 'done' ? (
            <p
              className="text-center text-[1.05rem] italic leading-snug text-cream-100/90"
              style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
            >
              On its way — check your inbox.
              <span className="mt-1 block font-sans text-[11px] not-italic tracking-wide text-cream-200/45">
                Talk soon. — Lior
              </span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p
                className="text-center text-[1.05rem] italic leading-snug text-cream-100/90"
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                }}
              >
                That&rsquo;s me in your phone. Want the 2-minute version of what
                BalaBite actually does &mdash; no deck?
              </p>

              {/* Honeypot — visually hidden, bots fill it, humans don't */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                }}
              >
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                <input
                  type="email"
                  name="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@restaurant.com"
                  disabled={status === 'submitting'}
                  onChange={() => status === 'error' && setStatus('idle')}
                  className="w-full rounded-xl border border-primary-700/50 bg-primary-900/60 px-4 py-3 text-center text-[15px] text-cream-100 placeholder:text-cream-200/35 transition-colors focus:border-accent-500/60 focus:outline-none focus:ring-1 focus:ring-accent-500/40"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold tracking-tight text-primary-950 shadow-[0_0_0_1px_rgba(251,191,36,0.25),0_8px_22px_-12px_rgba(251,191,36,0.6)] transition-all duration-200 hover:gap-3 hover:bg-accent-400 focus-visible:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send it over
                      <span aria-hidden="true">&rarr;</span>
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p
                  role="alert"
                  className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-red-400/90"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
