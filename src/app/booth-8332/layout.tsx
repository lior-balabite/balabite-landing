import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booth 8332 — NRA Show 2026 · BalaBite',
  description:
    'Your AI Cofounder at NRA Show 2026, Booth 8332, May 16–19, Chicago. Pick a time — coffee before the floor, drinks after service, or a post-show walkthrough with your numbers.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function BoothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
