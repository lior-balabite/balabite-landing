import type { Metadata } from 'next';
import NraPageShell from '../nra/NraPageShell';

/**
 * /NRA-booklet — the printed booklet QR landing.
 *
 * ROUTE LOCKED: the printed booklet's QR resolves to balabite.ai/NRA-booklet,
 * PM-verified against book-final.pdf p.12 (2026-05-14). This folder name must
 * stay exactly `NRA-booklet`. A case-insensitive `/nra-booklet` redirect is
 * configured in next.config.ts so a QR case mismatch can't 404.
 *
 * Same signup flow as /nra, attributed `?src=booklet`.
 */

export const metadata: Metadata = {
  title: 'Meet your AI Cofounder — BalaBite at NRA 2026',
  description:
    'You run the place. Your AI Cofounder does the rest. Sign up for a pilot conversation.',
  robots: { index: false, follow: false },
};

export default function NraBookletPage() {
  return <NraPageShell source="booklet" />;
}
