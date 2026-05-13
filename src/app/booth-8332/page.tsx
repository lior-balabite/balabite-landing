import Link from 'next/link';
import CalProvider from './CalProvider';
import ReserveButton from './ReserveButton';
import StickyMobileRSVP from './StickyMobileRSVP';

type MenuItem = {
  id: string;
  number: string;
  title: string;
  meta: string;
  duration: string;
  description: string;
  href: string | null;
  variant: 'reserve' | 'walk-up';
};

const MENU: MenuItem[] = [
  {
    id: 'coffee',
    number: '01',
    title: 'Coffee before the floor',
    meta: 'May 16–19 · 7:30–9:00am',
    duration: '30 min · café near McCormick',
    description:
      'Pre-show energy, off-floor. Show opens at 9:30 — we sit before the doors do.',
    href: process.env.NEXT_PUBLIC_NRA_COFFEE_URL ?? null,
    variant: 'reserve',
  },
  {
    id: 'after-service',
    number: '02',
    title: 'After service',
    meta: 'Sat–Mon · 5:15pm  ·  Tue · 3:15pm',
    duration: '45 min · off-floor, low-key',
    description:
      'Right after the floor closes (5pm Sat–Mon, 3pm Tue). Casual. Bring a colleague if you want.',
    href: process.env.NEXT_PUBLIC_NRA_DRINKS_URL ?? null,
    variant: 'reserve',
  },
  {
    id: 'numbers',
    number: '03',
    title: 'Numbers on the table',
    meta: 'After May 20 · video',
    duration: '45 min · with your data',
    description:
      'Your data. Your AI Cofounder. Forty-five minutes. Real outcomes from your real numbers.',
    href: process.env.NEXT_PUBLIC_NRA_NUMBERS_URL ?? null,
    variant: 'reserve',
  },
  {
    id: 'drive-by',
    number: '04',
    title: 'Booth drive-by',
    meta: 'May 16–19 · show hours',
    duration: 'Walk-up — no reservation',
    description:
      'Walk up. Bring whatever you’re chewing on. Booth 8332, all four days.',
    href: null,
    variant: 'walk-up',
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <article
      data-testid={`menu-item-${item.id}`}
      className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 rounded-2xl border border-primary-700/30 bg-gradient-to-br from-primary-900/30 to-primary-950/50 px-6 py-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/50 hover:from-primary-900/50 hover:to-primary-950/70 hover:shadow-[0_18px_42px_-22px_rgba(251,191,36,0.35)] sm:grid-cols-[auto_1fr_auto] sm:gap-x-10 sm:px-10 sm:py-10"
    >
      {/* Subtle gold spotlight that intensifies on hover — invitation cue */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-10 h-px w-16 bg-gradient-to-r from-transparent via-accent-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-24 sm:w-24"
      />

      <div className="row-span-2 flex flex-col items-start gap-1.5 self-start">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.32em] text-accent-300/60 transition-colors group-hover:text-accent-300 sm:text-[10px]"
        >
          You&rsquo;re invited
        </span>
        <span
          className="font-serif text-5xl font-medium leading-none text-accent-400/85 transition-colors group-hover:text-accent-300 sm:text-6xl"
          style={{ textShadow: '0 0 24px rgba(251,191,36,0.15)' }}
        >
          {item.number}
        </span>
      </div>

      <header>
        <h3 className="font-serif text-3xl font-medium tracking-tight text-cream-50 sm:text-[2.25rem]">
          {item.title}
        </h3>
        <p className="mt-2 font-serif text-[15px] italic leading-snug text-accent-200/85 sm:text-base">
          {item.meta} · {item.duration}
        </p>
      </header>

      <p className="col-start-2 max-w-2xl font-serif text-lg italic leading-snug text-cream-100/90 sm:text-[1.35rem]">
        {item.description}
      </p>

      <div className="col-start-2 mt-4 flex items-center sm:col-start-3 sm:row-span-2 sm:mt-0 sm:self-center sm:justify-self-end">
        {item.variant === 'walk-up' ? (
          <span className="font-serif text-base italic text-cream-200/70">
            Just come find us.
          </span>
        ) : (
          <ReserveButton
            url={item.href}
            testId={`menu-reserve-${item.id}`}
            pendingTestId={`menu-pending-${item.id}`}
          />
        )}
      </div>
    </article>
  );
}

// Schema.org Event JSON-LD — tells Google + AI-search this is a real event
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'BalaBite at NRA Show 2026 — Booth 8332',
  description:
    'Meet your AI Cofounder at NRA Show 2026. Coffee with the founder before doors open, drinks after service, and a post-show demo on your real numbers.',
  startDate: '2026-05-16T09:30:00-05:00',
  endDate: '2026-05-19T15:00:00-05:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'McCormick Place — Booth 8332',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2301 S Martin Luther King Dr',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      postalCode: '60616',
      addressCountry: 'US',
    },
  },
  image: ['https://balabite.ai/booth-8332/opengraph-image'],
  organizer: {
    '@type': 'Organization',
    name: 'BalaBite',
    url: 'https://balabite.ai',
  },
  url: 'https://balabite.ai/booth-8332',
};

export default function BoothPage() {
  return (
    <CalProvider>
      {/* JSON-LD structured data for search engines + AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <main className="nra-banner-bg relative min-h-screen overflow-hidden bg-primary-950 text-cream-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_55%)]"
        />

        {/* Brand lockup */}
        <header className="relative z-30 mx-auto max-w-6xl px-6 pt-8 sm:px-10 sm:pt-10">
          <Link
            href="/"
            className="inline-flex items-end gap-2.5 leading-none sm:gap-3"
            aria-label="BalaBite home"
          >
            <span
              aria-hidden="true"
              className="nra-palm-sway inline-block h-8 w-[22px] bg-cream-100 sm:h-11 sm:w-[30px]"
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
            <span
              className="italic text-cream-100 text-2xl sm:text-[2rem] leading-none tracking-tight"
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              }}
            >
              balabite
            </span>
          </Link>
        </header>

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-10 sm:pt-20 lg:pt-24">
          <div data-testid="booth-eyebrow" className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-200/70 sm:text-[11px]">
              NRA Show 2026 · May 16–19 · Chicago
            </p>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-accent-300/60"
                aria-hidden="true"
              />
              <span
                className="font-mono text-[13px] uppercase tracking-[0.32em] text-accent-300 sm:text-[15px]"
                style={{ textShadow: '0 0 18px rgba(251,191,36,0.25)' }}
              >
                Booth 8332
              </span>
            </div>
          </div>

          <h1 className="mt-10 font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.75rem]">
            Your <span className="italic text-cream-50">AI Cofounder.</span>
          </h1>

          <p className="mt-6 font-serif text-2xl leading-snug text-cream-200/90 sm:text-3xl lg:text-4xl">
            You run the place. <br className="sm:hidden" />
            We do{' '}
            <span
              className="italic text-accent-300"
              title="rest. rest-aurant."
              style={{ textShadow: '0 0 24px rgba(251,191,36,0.25)' }}
            >
              the rest
            </span>
            .
          </p>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-cream-200/70 sm:text-lg">
            Find us at Booth 8332 all four days — walk up anytime. Or pick a slot
            below for a real sit-down, off the floor.
          </p>
        </section>

        {/* Proof — editorial pull-quote, no card, three catches as a stack */}
        <section className="relative mx-auto max-w-5xl px-6 pb-20 sm:px-10 sm:pb-28">
          <div className="relative pl-6 sm:pl-10">
            {/* Vertical gold rule — magazine pull-quote indicator */}
            <span
              aria-hidden="true"
              className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-accent-400/60 to-transparent"
            />

            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-300/85 sm:text-[11px]">
              Live, in a working kitchen
            </p>

            <ol className="mt-6 space-y-3 sm:space-y-4">
              <li className="font-serif text-2xl italic leading-snug text-cream-50/95 sm:text-3xl">
                A fish-supplier price slip — caught in four minutes.
              </li>
              <li className="font-serif text-2xl italic leading-snug text-cream-50/95 sm:text-3xl">
                Bok choy that never showed — reordered before Friday.
              </li>
              <li className="font-serif text-2xl italic leading-snug text-cream-50/95 sm:text-3xl">
                A catering DM sitting since Monday — quoted, date held.
              </li>
            </ol>

            <p className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-cream-200/60 sm:text-[12px]">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent-300/40"
              />
              A Miami restaurant · embedded since February 2026
            </p>
          </div>
        </section>

        {/* Menu */}
        <section
          id="menu"
          className="relative mx-auto max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32"
        >
          <header className="mb-10 flex items-end justify-between border-b border-primary-700/40 pb-6 sm:mb-14">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-300/80 sm:text-[11px]">
                Plan your visit
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium text-cream-50 sm:text-3xl">
                Four ways in
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-200/50 sm:text-[11px]">
              01 — 04
            </span>
          </header>

          <div className="space-y-5 sm:space-y-6">
            {MENU.map((item) => (
              <MenuRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <footer className="relative border-t border-primary-700/40">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-cream-200/60 sm:flex-row sm:items-center sm:px-10">
            <p className="font-serif italic">
              BalaBite — the AI Cofounder for independent restaurants.
            </p>
            <Link
              href="/"
              className="font-medium text-cream-100 underline decoration-accent-500/40 underline-offset-4 transition-colors hover:text-accent-300 hover:decoration-accent-300"
            >
              balabite.ai →
            </Link>
          </div>
        </footer>

        {/* Sticky mobile RSVP — appears when scrolled past hero */}
        <StickyMobileRSVP />
      </main>
    </CalProvider>
  );
}
