import type { Metadata } from 'next';
import './booth-tv.css';

export const metadata: Metadata = {
  title: 'BalaBite — Booth 8332 loop',
  description:
    'The BalaBite booth loop — your AI Cofounder for independent restaurants. NRA Show 2026, Booth 8332.',
  // Kiosk surface — not a search destination.
  robots: { index: false, follow: false },
};

export default function BoothTvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
