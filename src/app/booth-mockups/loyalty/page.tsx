import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { LoyaltyMemoryMockup } from './LoyaltyMemoryMockup';
import './loyalty.css';

// /booth-mockups/loyalty — The room.
// Per brainstorm: the Cofounder's memory of regulars — Warm / Drifting /
// New faces, with one regular cooling + reaching out + warming back up
// as the loop's moment.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — The room',
  robots: { index: false, follow: false },
};

export default async function LoyaltyPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate next="/booth-mockups/loyalty" hasError={sp.error === '1'} />
    );
  }
  return <LoyaltyMemoryMockup />;
}
