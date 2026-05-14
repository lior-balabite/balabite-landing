import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { getNraSupabase, nraSupabaseConfigured, NRA_LEADS_TABLE } from '@/lib/nra-supabase';
import { enrichRestaurant } from '@/lib/nra-enrich';
import { scoreLead } from '@/lib/nra-fit-score';
import { LOCATION_BUCKETS, type NraEnrichment } from '@/lib/nra-types';
import { getProspectThankYouEmail, getOwnerNotificationEmail } from './templates';

/**
 * POST /api/nra/lead — the one write path for the NRA signup flow.
 *
 * Resilience model, in priority order:
 *  1. Store the lead in Supabase (`nra_leads`) — system of record.
 *  2. Email the prospect a thank-you (Resend).
 *  3. Email Lior a notification — also the safety-net if (1) failed.
 * A failure in (2) or (3), or in enrichment, never fails the request: at a
 * noisy trade show the prospect must get a clean confirmation regardless.
 */

export const dynamic = 'force-dynamic';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
// `balabite.ai` is the verified sender domain on the Resend account
// (the older `waitlist.balabite.ai` subdomain is not verified).
const FROM_EMAIL = process.env.NRA_FROM_EMAIL || 'BalaBite <hello@balabite.ai>';
const OWNER_EMAIL = process.env.ADMIN_EMAIL || 'lior@balabite.ai';

const enrichmentSchema = z
  .object({
    cuisine: z.string().optional(),
    category: z.string().optional(),
    locality: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
    displayName: z.string().optional(),
    matchedName: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    matchCount: z.number().optional(),
    source: z.enum(['openstreetmap', 'google']),
  })
  .nullable()
  .optional();

const leadSchema = z.object({
  fullName: z.string().trim().min(2, 'Name is required').max(120),
  restaurantName: z.string().trim().min(2, 'Restaurant name is required').max(160),
  role: z.string().trim().min(1, 'Role is required').max(120),
  email: z.string().trim().email('A valid email is required').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  city: z.string().trim().max(120).optional().or(z.literal('')),
  locationCount: z.enum(LOCATION_BUCKETS).optional(),
  source: z.enum(['booth', 'booklet']).default('booth'),
  enrichment: enrichmentSchema,
});

async function sendEmailSafe(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!resend) {
    console.error('[nra/lead] Resend not configured — skipping email');
    return false;
  }
  try {
    const { error } = await resend.emails.send(options);
    if (error) {
      console.error('[nra/lead] Resend error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[nra/lead] Resend threw:', err);
    return false;
  }
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // --- Enrichment: trust the client's result, else best-effort here. ---
  let enrichment: NraEnrichment | null = data.enrichment ?? null;
  if (!enrichment) {
    try {
      enrichment = await enrichRestaurant(data.restaurantName, data.city || undefined);
    } catch {
      enrichment = null; // graceful — submit proceeds regardless
    }
  }

  // --- Fit score (transparent heuristic, never throws). ---
  const fit = scoreLead(
    {
      role: data.role,
      email: data.email,
      restaurantName: data.restaurantName,
      locationCount: data.locationCount,
    },
    enrichment
  );

  // --- 1. Store the lead. ---
  let stored = false;
  if (nraSupabaseConfigured()) {
    try {
      const supabase = getNraSupabase();
      const { error } = await supabase.from(NRA_LEADS_TABLE).insert({
        full_name: data.fullName,
        restaurant_name: data.restaurantName,
        role: data.role,
        email: data.email,
        phone: data.phone || null,
        city: data.city || null,
        location_count: data.locationCount || null,
        enrichment: enrichment,
        enriched_at: enrichment ? new Date().toISOString() : null,
        fit_score: fit.score,
        fit_signal: fit.signal,
        fit_reason: fit.reason,
        source: data.source,
        user_agent: request.headers.get('user-agent') || null,
        raw: rawBody,
      });
      if (error) {
        console.error('[nra/lead] Supabase insert error:', error);
      } else {
        stored = true;
      }
    } catch (err) {
      console.error('[nra/lead] Supabase insert threw:', err);
    }
  } else {
    console.error('[nra/lead] NRA Supabase not configured — lead not stored');
  }

  // --- 2. Prospect thank-you email. ---
  const prospectEmail = getProspectThankYouEmail({
    fullName: data.fullName,
    restaurantName: data.restaurantName,
    source: data.source,
  });
  const prospectEmailSent = await sendEmailSafe({
    from: FROM_EMAIL,
    to: data.email,
    subject: prospectEmail.subject,
    html: prospectEmail.html,
    text: prospectEmail.text,
    replyTo: OWNER_EMAIL,
  });

  // --- 3. Owner notification (also the safety-net when storage failed). ---
  const ownerEmail = getOwnerNotificationEmail({
    fullName: data.fullName,
    restaurantName: data.restaurantName,
    role: data.role,
    email: data.email,
    phone: data.phone || undefined,
    city: data.city || undefined,
    locationCount: data.locationCount,
    source: data.source,
    fit,
    enrichment,
    stored,
  });
  await sendEmailSafe({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: ownerEmail.subject,
    html: ownerEmail.html,
    text: ownerEmail.text,
    replyTo: data.email,
  });

  // The prospect's experience never breaks: a clean confirmation either way.
  return NextResponse.json({
    success: true,
    stored,
    emailed: prospectEmailSent,
    enrichment,
    restaurantName: data.restaurantName,
  });
}
