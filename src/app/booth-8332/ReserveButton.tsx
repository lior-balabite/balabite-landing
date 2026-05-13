'use client';

function urlToCalLink(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // cal.com URL pattern: https://cal.com/{username}/{event-slug}
    if (!u.hostname.endsWith('cal.com')) return null;
    return u.pathname.replace(/^\//, '');
  } catch {
    return null;
  }
}

interface Props {
  url: string | null | undefined;
  testId?: string;
  pendingTestId?: string;
}

export default function ReserveButton({ url, testId, pendingTestId }: Props) {
  const calLink = urlToCalLink(url);

  if (!calLink) {
    return (
      <span
        className="text-sm italic text-cream-200/50"
        data-testid={pendingTestId}
      >
        Booking link coming soon
      </span>
    );
  }

  return (
    <button
      type="button"
      data-cal-link={calLink}
      data-cal-config='{"theme":"dark","layout":"month_view"}'
      className="group/cta inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold tracking-tight text-primary-950 shadow-[0_0_0_1px_rgba(251,191,36,0.3),0_8px_24px_-12px_rgba(251,191,36,0.6)] transition-all duration-200 hover:gap-3 hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.5),0_12px_32px_-12px_rgba(251,191,36,0.8)] focus-visible:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
      data-testid={testId}
    >
      Reserve
      <span aria-hidden="true">→</span>
    </button>
  );
}
