import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booth 8332 — NRA Show 2026 · BalaBite',
  description:
    'Meet your AI Cofounder at NRA Show 2026, Booth 8332, May 16–19, Chicago. Coffee with the founder before doors open. Drinks after service. Post-show demo on your real numbers.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'BalaBite at NRA Show 2026 — Booth 8332',
    description:
      'Coffee with the founder before doors open. Drinks after service. Post-show demo on your real numbers. NRA Show 2026 · May 16–19, Chicago.',
    type: 'website',
    siteName: 'BalaBite',
    url: 'https://www.balabite.ai/booth-8332',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BalaBite at NRA Show 2026 — Booth 8332',
    description:
      'Coffee with the founder before doors open. Limited. NRA Show 2026, May 16–19, Chicago.',
  },
};

export default function BoothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
