import Link from 'next/link';

type MenuItem = {
  id: string;
  title: string;
  meta: string;
  duration: string;
  description: string;
  intake: string | null;
  href: string | null;
};

const MENU: MenuItem[] = [
  {
    id: 'drive-by',
    title: 'Booth drive-by',
    meta: 'May 16–19 · show hours',
    duration: 'Walk-up',
    description:
      'Walk up. Bring whatever you’re chewing on. Booth 8332, all four days.',
    intake: null,
    href: null,
  },
  {
    id: 'coffee',
    title: 'Coffee before the floor',
    meta: 'May 16–19 · 7:30–8:00am',
    duration: '30 min',
    description:
      'Pre-show energy. Off-floor, café near McCormick Place. Two cups, your hardest problem, a plan.',
    intake: 'Name · restaurant · one sentence on what’s hardest right now.',
    href: process.env.NEXT_PUBLIC_NRA_COFFEE_URL ?? null,
  },
  {
    id: 'after-service',
    title: 'After service',
    meta: 'May 16–19 · 5:00–5:45pm',
    duration: '45 min',
    description:
      'Right after the floor closes. Off-floor, low-key. Casual. Bring a colleague.',
    intake: 'Name + role · restaurant · who you’re bringing (optional).',
    href: process.env.NEXT_PUBLIC_NRA_DRINKS_URL ?? null,
  },
  {
    id: 'numbers',
    title: 'Numbers on the table',
    meta: 'After May 20 · video',
    duration: '45 min',
    description:
      'Your P&L. Your AI Cofounder. Forty-five minutes. Real outcomes from your real numbers.',
    intake:
      'Name + role · restaurant + cuisine · monthly revenue band · biggest cost concern · what you’d want walked through.',
    href: process.env.NEXT_PUBLIC_NRA_NUMBERS_URL ?? null,
  },
];

function MenuCard({ item }: { item: MenuItem }) {
  const isWalkUp = item.href === null;

  return (
    <article
      className="group relative overflow-hidden rounded-lg border border-cream-300/70 bg-cream-50 px-6 py-7 transition-shadow hover:shadow-lg hover:shadow-primary-900/5 sm:px-8 sm:py-8"
      data-testid={`menu-item-${item.id}`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-primary-900 sm:text-[1.75rem]">
          {item.title}
        </h3>
        <div className="font-serif text-sm italic text-primary-700 sm:text-base">
          {item.meta}
          <span className="px-2 text-primary-400">·</span>
          {item.duration}
        </div>
      </header>

      <div className="my-4 h-px w-12 bg-accent-500/60" aria-hidden="true" />

      <p className="font-serif text-base leading-relaxed text-primary-800 sm:text-lg">
        {item.description}
      </p>

      {item.intake && (
        <p className="mt-5 text-[12px] uppercase tracking-[0.18em] text-primary-600">
          You’ll share —{' '}
          <span className="text-primary-700 normal-case tracking-normal text-[13px]">
            {item.intake}
          </span>
        </p>
      )}

      <div className="mt-6 flex items-center justify-end">
        {isWalkUp ? (
          <span className="font-serif text-sm italic text-primary-600">
            No reservation — just come find us.
          </span>
        ) : item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-medium text-cream-100 transition-all hover:bg-primary-800 hover:gap-3 focus-visible:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
            data-testid={`menu-reserve-${item.id}`}
          >
            Reserve
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <span
            className="font-serif text-sm italic text-primary-500"
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
    <main className="min-h-screen bg-cream-100">
      {/* Hero — AI-aurora backdrop, brand statement */}
      <section className="nra-banner-bg relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-28 text-cream-100 sm:px-10 sm:pt-32 lg:pt-40">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-300/90 sm:text-xs"
            data-testid="booth-eyebrow"
          >
            Booth 8332 · NRA Show · May 16–19 · Chicago
          </p>

          <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Meet your <span className="italic">AI Cofounder.</span>
          </h1>

          <p className="mt-6 font-serif text-2xl leading-snug text-cream-200/95 sm:text-3xl lg:text-4xl">
            You run the place. <br className="sm:hidden" />
            We do the rest.
          </p>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-cream-200/80 sm:text-lg">
            Lior is at <span className="text-cream-100">Booth 8332</span> all four days — walk up
            anytime. Or pick a slot below for a real sit-down, on his side of the floor.
          </p>

          <div className="mt-10 flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-cream-200/70">
            <span className="h-px w-10 bg-accent-300/60" aria-hidden="true" />
            <span>The menu ↓</span>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10 sm:py-24">
        <header className="mb-10 flex items-baseline justify-between sm:mb-14">
          <h2 className="font-serif text-[11px] uppercase tracking-[0.4em] text-primary-600 sm:text-xs">
            Menu · NRA Show 2026
          </h2>
          <span className="font-serif text-[11px] italic text-primary-500 sm:text-xs">
            Four dishes
          </span>
        </header>

        <div className="space-y-5 sm:space-y-6">
          {MENU.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-300/70 bg-cream-100">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-primary-600 sm:flex-row sm:items-center sm:px-10">
          <p className="font-serif italic">
            BalaBite — the first AI Cofounder for restaurants.
          </p>
          <Link
            href="/"
            className="font-medium text-primary-900 underline decoration-accent-500/40 underline-offset-4 transition-colors hover:text-accent-700 hover:decoration-accent-500"
          >
            balabite.ai →
          </Link>
        </div>
      </footer>
    </main>
  );
}
