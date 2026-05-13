import Link from 'next/link';

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
      {/* Big number */}
      <div className="row-span-2 self-start font-serif text-5xl font-medium leading-none text-accent-400/80 transition-colors group-hover:text-accent-300 sm:text-6xl">
        {item.number}
      </div>

      {/* Title + meta */}
      <header>
        <h3 className="font-serif text-3xl font-medium tracking-tight text-cream-50 sm:text-[2.25rem]">
          {item.title}
        </h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.18em] text-cream-200/60">
          <span>{item.meta}</span>
          <span className="text-cream-200/30" aria-hidden="true">
            ·
          </span>
          <span>{item.duration}</span>
        </p>
      </header>

      {/* Description */}
      <p className="col-start-2 max-w-2xl text-base leading-relaxed text-cream-200/85 sm:text-lg">
        {item.description}
      </p>

      {/* CTA */}
      <div className="col-start-2 mt-4 flex items-center sm:col-start-3 sm:row-span-2 sm:mt-0 sm:self-center sm:justify-self-end">
        {item.variant === 'walk-up' ? (
          <span className="text-sm italic text-cream-200/60">
            Just come find us.
          </span>
        ) : item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold tracking-tight text-primary-950 shadow-[0_0_0_1px_rgba(251,191,36,0.3),0_8px_24px_-12px_rgba(251,191,36,0.6)] transition-all duration-200 hover:bg-accent-400 hover:gap-3 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.5),0_12px_32px_-12px_rgba(251,191,36,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
            data-testid={`menu-reserve-${item.id}`}
          >
            Reserve
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <span
            className="text-sm italic text-cream-200/50"
            data-testid={`menu-pending-${item.id}`}
          >
            Booking link coming soon
          </span>
        )}
      </div>
    </article>
  );
}

export default function BoothPage() {
  return (
    <main className="nra-banner-bg relative min-h-screen overflow-hidden bg-primary-950 text-cream-100">
      {/* Top — soft radial spotlight reinforces the aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_55%)]"
      />

      {/* Brand lockup — palm + italic wordmark, mirrors the home navbar */}
      <header className="relative z-30 mx-auto max-w-6xl px-6 pt-8 sm:px-10 sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-end gap-2.5 leading-none sm:gap-3"
          aria-label="BalaBite home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-8 w-[22px] bg-cream-100 sm:h-11 sm:w-[30px]"
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
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10 sm:pt-20 lg:pt-24">
        {/* Eyebrow — two-line poster credit, BOOTH 8332 is the focal point */}
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
          Your{' '}
          <span className="italic text-cream-50">AI Cofounder.</span>
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

      {/* Menu */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32">
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

      {/* Footer */}
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
    </main>
  );
}
