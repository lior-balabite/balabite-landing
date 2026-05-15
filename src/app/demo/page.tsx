import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import DemoWalkthrough from './DemoWalkthrough';

// /demo — the guided 2–3 minute laptop demo of the 3 Pulse screens.
// Soft-gated: ?key=<BOOTH_ACCESS_KEY> or the passphrase form.
export const dynamic = 'force-dynamic';

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return <BoothGate next="/demo" hasError={sp.error === '1'} />;
  }
  return <DemoWalkthrough />;
}
