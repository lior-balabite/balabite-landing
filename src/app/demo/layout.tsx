import type { Metadata } from 'next';
import './demo.css';

export const metadata: Metadata = {
  title: 'BalaBite — Guided demo',
  description:
    'A two-minute guided walk through your AI Cofounder: it sees, it acts, it owns it.',
  // Booth-floor surface — public URL, but not a search destination.
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
