import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-booth-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Booth 8332 — NRA Show 2026 · BalaBite',
  description:
    'Meet your AI Cofounder at NRA Show 2026, Booth 8332, May 16–19, Chicago. Pick a time — coffee before the floor, drinks after service, or a post-show walkthrough with your numbers.',
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
  return <div className={`${playfair.variable} booth-root`}>{children}</div>;
}
