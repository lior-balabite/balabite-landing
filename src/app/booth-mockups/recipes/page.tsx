import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import { RecipesSlideshow } from './RecipesSlideshow';
import './recipes.css';

// /booth-mockups/recipes — kiosk slideshow of the BalaBite recipes surface.
// Sources the captured PNGs from public/booth/screens/recipes-crawl/ —
// the auto-crawl script clicks through every state and produces these.
// This route picks the most arresting frames and cycles them with text
// callouts. Captured at high DPI for both the booth TV and the demo.

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Recipes kiosk',
  robots: { index: false, follow: false },
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate next="/booth-mockups/recipes" hasError={sp.error === '1'} />
    );
  }
  return <RecipesSlideshow />;
}
