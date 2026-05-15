import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import BoothTvLoop from './BoothTvLoop';

// /booth-tv — the silent, looping booth TV surface.
// Translates ShortDeck slides 1–6 into a ~82s captioned kiosk loop.
// Soft-gated: ?key=<BOOTH_ACCESS_KEY> (kiosk) or the passphrase form.
export const dynamic = 'force-dynamic';

export default async function BoothTvPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return <BoothGate next="/booth-tv" hasError={sp.error === '1'} />;
  }
  return <BoothTvLoop />;
}
