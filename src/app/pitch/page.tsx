import { isAuthenticated } from './actions';
import { LoginGate } from '@/components/investors/LoginGate';
import { ShortDeck } from '@/components/investors/ShortDeck';

export const dynamic = 'force-dynamic';

export default async function InvestorsShortPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    const params = await searchParams;
    return <LoginGate hasError={params.error === '1'} />;
  }
  return <ShortDeck />;
}
