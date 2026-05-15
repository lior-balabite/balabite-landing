import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from './contact';
import ConnectExchange from './ConnectExchange';
import './connect.css';

export const metadata: Metadata = {
  title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
  description: `${CONTACT.tagline}. Add ${CONTACT.fullName} to your contacts in one tap.`,
  openGraph: {
    title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
    description: `${CONTACT.tagline}.`,
    type: 'profile',
    siteName: 'BalaBite',
  },
  twitter: {
    card: 'summary',
    title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
    description: `${CONTACT.tagline}.`,
  },
};

const SERIF = 'var(--font-instrument-serif), Georgia, serif';

/* Prospero Alpini 1592 date-palm woodcut — CSS-masked so it colours with
   the rest of the brand. Same lockup as the navbar and /booth-8332. */
function PalmMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`nra-palm-sway inline-block bg-cream-100 ${className}`}
      style={{
        WebkitMaskImage: 'url(/palm-1592.svg)',
        maskImage: 'url(/palm-1592.svg)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}

/* Inline, stroke-based icons — quiet, editorial, gold on hover. */
function GlobeIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  );
}

function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.57h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.49 4.78 5.73V21h-4v-5.07c0-1.21-.02-2.76-1.8-2.76-1.8 0-2.08 1.32-2.08 2.68V21h-4V9.5Z" />
    </svg>
  );
}

function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export default function ConnectPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-950 px-5 py-12 text-cream-100">
      {/* Gold light from the top — same wash as /booth-8332 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.10),transparent_55%)]"
      />

      <article className="connect-rise relative w-full max-w-sm">
        {/* Brand lockup */}
        <Link
          href="/"
          aria-label="BalaBite home"
          className="mx-auto mb-7 flex w-fit items-end gap-2.5 leading-none"
        >
          <PalmMark className="h-9 w-[24px]" />
          <span
            className="text-[1.85rem] italic leading-none tracking-tight text-cream-100"
            style={{ fontFamily: SERIF }}
          >
            balabite
          </span>
        </Link>

        {/* The card */}
        <div className="rounded-[1.5rem] border border-primary-700/40 bg-gradient-to-br from-primary-900/50 to-primary-950/70 p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm">
          {/* Identity */}
          <header className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-300/80">
              {CONTACT.title} &middot; {CONTACT.org}
            </p>
            <h1
              className="mt-3 text-[2.75rem] font-medium leading-[1.05] tracking-tight text-cream-50"
              style={{ fontFamily: SERIF }}
            >
              {CONTACT.fullName}
            </h1>
            {/* Gold hairline — magazine rule */}
            <span
              aria-hidden="true"
              className="mx-auto mt-5 block h-px w-12 bg-gradient-to-r from-transparent via-accent-400/70 to-transparent"
            />
            <p
              className="mx-auto mt-5 max-w-[19rem] text-[1.2rem] italic leading-snug text-cream-100/90"
              style={{ fontFamily: SERIF }}
            >
              {CONTACT.tagline}
            </p>
          </header>

          {/* Primary action — one-tap vCard, then the optional exchange */}
          <ConnectExchange />

          {/* Secondary links */}
          <nav
            className="mt-7 grid grid-cols-3 gap-2.5"
            aria-label="Find Lior elsewhere"
          >
            <a
              href={CONTACT.site}
              className="group flex flex-col items-center gap-2 rounded-xl border border-primary-700/40 bg-primary-900/40 px-2 py-3.5 text-cream-200/80 transition-colors hover:border-accent-500/45 hover:bg-primary-900/70 hover:text-accent-300"
            >
              <GlobeIcon className="h-[18px] w-[18px]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                Website
              </span>
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-xl border border-primary-700/40 bg-primary-900/40 px-2 py-3.5 text-cream-200/80 transition-colors hover:border-accent-500/45 hover:bg-primary-900/70 hover:text-accent-300"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                LinkedIn
              </span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-primary-700/40 bg-primary-900/40 px-2 py-3.5 text-cream-200/80 transition-colors hover:border-accent-500/45 hover:bg-primary-900/70 hover:text-accent-300"
            >
              <MailIcon className="h-[18px] w-[18px]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                Email
              </span>
            </a>
          </nav>
        </div>

        {/* Footer — the brand promise carries the sign-off */}
        <p
          className="mt-6 text-center text-sm italic text-cream-200/55"
          style={{ fontFamily: SERIF }}
        >
          You run the place. We do the rest.
        </p>
      </article>
    </main>
  );
}
