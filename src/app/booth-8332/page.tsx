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
      className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 rounded-2xl border border-primary-700/40 bg-primary-900/40 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/40 hover:bg-primary-900/60 sm:grid-cols-[auto_1fr_auto] sm:gap-x-10 sm:px-10 sm:py-10"
    >
      <div className="row-span-2 self-start font-serif text-5xl font-medium leading-none text-accent-400/80 transition-colors group-hover:text-accent-300 sm:text-6xl">
        {item.number}
      </div>

      <header>
        <h3 className="font-serif text-3xl font-medium tracking-tight text-cream-50 sm:text-[2.25rem]">
          {item.title}
        </h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.18em] text-cream-200/60">
          <span>{item.meta}</span>
          <span className="text-cream-200/30" aria-hidden="true">·</span>
          <span>{item.duration}</span>
        </p>
      </header>

      <p className="col-start-2 max-w-2xl text-base leading-relaxed text-cream-200/85 sm:text-lg">
        {item.description}
      </p>

      <div className="col-start-2 mt-4 flex items-center sm:col-start-3 sm:row-span-2 sm:mt-0 sm:self-center sm:justify-self-end">
        {item.variant === 'walk-up' ? (
          <span className="text-sm italic text-cream-200/60">
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

        {/* Proof — concrete catches from the Miami kitchen */}
        <section className="relative mx-auto max-w-6xl px-6 pb-16 sm:px-10 sm:pb-20">
          <div className="rounded-2xl border border-primary-700/40 bg-primary-900/30 px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-300/80 sm:text-[11px]">
              Live in a working kitchen
            </p>
            <p className="mt-4 font-serif text-xl leading-snug text-cream-100/95 sm:text-2xl">
              A fish-supplier price slip — caught in four minutes. Bok choy
              that never showed — reordered before Friday. A catering DM
              sitting since Monday — quoted, date held.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cream-200/60 sm:text-[12px]">
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
