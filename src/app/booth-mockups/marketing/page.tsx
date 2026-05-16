import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { MarketingDeskMockup } from './MarketingDeskMockup';
import './marketing.css';

// /booth-mockups/marketing — the Cofounder's marketing room.
// Per brainstorm roundtable: campaign orbs left, in-flight action center,
// receipts right. The AI is running 4 campaigns; the operator glances.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Marketing room',
  robots: { index: false, follow: false },
};

export default async function MarketingPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate next="/booth-mockups/marketing" hasError={sp.error === '1'} />
    );
  }
  return <MarketingDeskMockup />;
}
