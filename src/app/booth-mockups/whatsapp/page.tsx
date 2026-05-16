import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { WhatsAppMockup } from './WhatsAppMockup';
import './whatsapp.css';

// /booth-mockups/whatsapp — the staff-chat "86 salmon" mockup.
// Locked to ShortDeck slide 4. Full-screen kiosk surface; capture as PNG
// for /booth-tv beats and /demo. Soft-gated like the rest of the booth.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Staff chat mockup',
  robots: { index: false, follow: false },
};

export default async function WhatsAppMockupPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate
        next="/booth-mockups/whatsapp"
        hasError={sp.error === '1'}
      />
    );
  }
  return <WhatsAppMockup />;
}
