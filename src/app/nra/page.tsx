import type { Metadata } from 'next';
import NraPageShell from './NraPageShell';

/**
 * /nra — the booth QR landing (poster / TV / table).
 * `?src=booklet` is honored so a shared QR can still attribute correctly,
 * but the route default is booth.
 */

export const metadata: Metadata = {
  title: 'Meet your AI Cofounder — BalaBite at NRA 2026',
  description:
    'You run the place. Your AI Cofounder does the rest. Sign up at Booth 8332 for a pilot conversation.',
  robots: { index: false, follow: false },
};

export default async function NraPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const params = await searchParams;
  const source = params.src === 'booklet' ? 'booklet' : 'booth';
  return <NraPageShell source={source} />;
}
