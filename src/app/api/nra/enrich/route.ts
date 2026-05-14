import { NextResponse } from 'next/server';
import { z } from 'zod';
import { enrichRestaurant } from '@/lib/nra-enrich';

/**
 * POST /api/nra/enrich
 * Background restaurant lookup for the signup page's "feel seen" moment.
 * Always returns 200 with `{ enrichment: NraEnrichment | null }` — a miss is
 * a normal, expected outcome, never an error the form has to handle.
 */

export const dynamic = 'force-dynamic';

const schema = z.object({
  restaurantName: z.string().min(2).max(160),
  city: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ enrichment: null });
    }

    const enrichment = await enrichRestaurant(
      parsed.data.restaurantName,
      parsed.data.city
    );
    return NextResponse.json({ enrichment });
  } catch {
    return NextResponse.json({ enrichment: null });
  }
}
