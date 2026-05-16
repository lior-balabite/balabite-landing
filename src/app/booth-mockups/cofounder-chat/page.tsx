import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { CofounderChatMockup } from './CofounderChatMockup';
import './cofounder-chat.css';

// /booth-mockups/cofounder-chat — the catering-analysis exchange.
// Content sourced from a real customer chat (per Lior); names genericized,
// numbers nudged for confidentiality. Renders the BalaBite product chat
// surface verbatim — capture as PNG for /booth-tv + /demo.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Cofounder chat mockup',
  robots: { index: false, follow: false },
};

export default async function CofounderChatPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate
        next="/booth-mockups/cofounder-chat"
        hasError={sp.error === '1'}
      />
    );
  }
  return <CofounderChatMockup />;
}
