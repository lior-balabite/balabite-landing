import type { Metadata } from 'next';
import BalaBiteLogo from '../components/BalaBiteLogo';
import { CONTACT } from './contact';
import './connect.css';

export const metadata: Metadata = {
  title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
  description: `${CONTACT.tagline}. Add ${CONTACT.fullName} to your contacts in one tap.`,
  openGraph: {
    title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
    description: `${CONTACT.tagline}.`,
    type: 'profile',
    siteName: 'BalaBite.ai',
  },
  twitter: {
    card: 'summary',
    title: `${CONTACT.fullName} — ${CONTACT.title}, ${CONTACT.org}`,
    description: `${CONTACT.tagline}.`,
  },
};

/* Inline, stroke-based icons — consistent with the hand-drawn brand mark. */
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 px-5 py-12">
      {/* Ambient amber halo */}
      <div
        aria-hidden="true"
        className="connect-glow pointer-events-none absolute left-1/2 top-[-14%] h-[34rem] w-[34rem] rounded-full bg-accent-500/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-400/10 blur-[110px]"
      />

      <article className="connect-rise relative w-full max-w-sm">
        <div className="rounded-[1.75rem] border border-accent-500/15 bg-gradient-to-b from-primary-800/80 to-primary-900/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Brand mark */}
          <div className="flex justify-center">
            <div className="rounded-full bg-primary-900/60 p-1 ring-1 ring-accent-500/20">
              <BalaBiteLogo size="lg" showText={false} />
            </div>
          </div>

          {/* Identity */}
          <header className="mt-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {CONTACT.fullName}
            </h1>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
              {CONTACT.title} &mdash; {CONTACT.org}
            </p>
            <p className="mx-auto mt-4 max-w-[18rem] text-[0.95rem] leading-relaxed text-cream-200/85">
              {CONTACT.tagline}
            </p>
          </header>

          {/* Primary action — one-tap vCard */}
          <a
            href="/connect/vcard"
            className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-accent-500 px-6 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400 hover:shadow-accent-400/40 active:scale-[0.99]"
          >
            <ContactIcon className="h-5 w-5" />
            Add to Contacts
          </a>
          <p className="mt-2.5 text-center text-xs text-primary-300">
            One tap &mdash; saves straight to your phone.
          </p>

          {/* Secondary links */}
          <nav className="mt-6 grid grid-cols-3 gap-2.5" aria-label="Find Lior elsewhere">
            <a
              href={CONTACT.site}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-primary-700/60 bg-primary-800/40 px-2 py-3 text-primary-200 transition-colors hover:border-accent-500/40 hover:text-accent-300"
            >
              <GlobeIcon className="h-5 w-5" />
              <span className="text-[0.7rem] font-medium">Website</span>
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-primary-700/60 bg-primary-800/40 px-2 py-3 text-primary-200 transition-colors hover:border-accent-500/40 hover:text-accent-300"
            >
              <LinkedInIcon className="h-5 w-5" />
              <span className="text-[0.7rem] font-medium">LinkedIn</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-primary-700/60 bg-primary-800/40 px-2 py-3 text-primary-200 transition-colors hover:border-accent-500/40 hover:text-accent-300"
            >
              <MailIcon className="h-5 w-5" />
              <span className="text-[0.7rem] font-medium">Email</span>
            </a>
          </nav>
        </div>

        {/* Footer wordmark */}
        <p className="mt-6 text-center text-xs tracking-wide text-primary-500">
          {CONTACT.siteLabel}
        </p>
      </article>
    </main>
  );
}
