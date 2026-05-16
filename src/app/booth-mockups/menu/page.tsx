import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { MenuWaiterMockup } from './MenuWaiterMockup';
import './menu.css';

// /booth-mockups/menu
//
// Miami Squeeze ordering surface (captured from app.balabite.ai) with the
// AI waiter chat sheet sliding up. The scenario: guest asks for
// peanut-free + gluten-free options; the waiter filters the menu in real
// time and surfaces what works. Locks-the-allergy moment is what makes
// the booth crowd stop.

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — AI waiter mockup',
  robots: { index: false, follow: false },
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate next="/booth-mockups/menu" hasError={sp.error === '1'} />
    );
  }
  return <MenuWaiterMockup />;
}
