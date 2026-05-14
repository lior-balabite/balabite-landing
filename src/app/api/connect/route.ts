import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { CONTACT } from '../../connect/contact';
import { prospectEmail, notificationEmail } from './templates';

/**
 * POST /api/connect — the "beat 2" exchange behind the /connect card.
 *
 * A prospect leaves their email → two things fire at once:
 *   1. a warm note goes to them (prospectEmail)
 *   2. an actionable ping goes to Lior (notificationEmail)
 *
 * Self-contained on purpose: no datastore, just two Resend sends. When the
 * nra-lead-capture tab ships its ingestion endpoint, repoint POSTs there —
 * the client contract ({ email, website }) is the only thing to preserve.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Where Lior's notifications land (locked: email to lior@balabite.ai).
const NOTIFY_EMAIL = process.env.CONNECT_NOTIFY_EMAIL || 'lior@balabite.ai';

// Verified Resend sender. Display names personalise it; replyTo routes the
// actual conversation. Override with CONNECT_FROM_EMAIL if the address moves.
const FROM_EMAIL = process.env.CONNECT_FROM_EMAIL || 'hello@balabite.ai';
const FROM_LIOR = `Lior Brik <${FROM_EMAIL}>`;
const FROM_CONNECT = `BalaBite Connect <${FROM_EMAIL}>`;

const schema = z.object({
  email: z.string().trim().email(),
  // Honeypot — must be empty. Bots fill it; humans never see it.
  website: z.string().optional(),
});

// In-memory 5-minute dedupe. Fluid Compute reuses instances, so this catches
// the common double-tap / refresh case without standing up a datastore.
const DEDUPE_WINDOW_MS = 5 * 60 * 1000;
const recentlySent = new Map<string, number>();

function isDuplicate(email: string): boolean {
  const now = Date.now();
  for (const [key, ts] of recentlySent) {
    if (now - ts > DEDUPE_WINDOW_MS) recentlySent.delete(key);
  }
  const key = email.toLowerCase();
  if (recentlySent.has(key)) return true;
  recentlySent.set(key, now);
  return false;
}

function coarseLocation(req: Request): string | undefined {
  const h = req.headers;
  const city = h.get('x-vercel-ip-city');
  const region = h.get('x-vercel-ip-country-region');
  const country = h.get('x-vercel-ip-country');
  const parts = [city && decodeURIComponent(city), region, country].filter(
    Boolean,
  );
  return parts.length ? parts.join(', ') : undefined;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Enter a valid email.' },
      { status: 400 },
    );
  }

  const { email, website } = parsed.data;

  // Honeypot tripped — act successful, send nothing.
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Already handled this address moments ago — don't double-send.
  if (isDuplicate(email)) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  if (!resend) {
    // No key locally without `vercel env pull` — don't 500 the user.
    console.warn('[connect] RESEND_API_KEY missing — skipping sends', { email });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const when = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());
  const location = coarseLocation(request);

  const toProspect = prospectEmail();
  const toLior = notificationEmail({ email, when: `${when} CT`, location });

  const [prospectRes, liorRes] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_LIOR,
      to: email,
      replyTo: CONTACT.email,
      subject: toProspect.subject,
      html: toProspect.html,
      text: toProspect.text,
    }),
    resend.emails.send({
      from: FROM_CONNECT,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: toLior.subject,
      html: toLior.html,
      text: toLior.text,
    }),
  ]);

  const prospectOk =
    prospectRes.status === 'fulfilled' && !prospectRes.value.error;
  const liorOk = liorRes.status === 'fulfilled' && !liorRes.value.error;

  if (!prospectOk) {
    console.error('[connect] prospect send failed', prospectRes);
  }
  if (!liorOk) {
    console.error('[connect] notification send failed', liorRes);
  }

  // The prospect-facing send is the one that must land for a clean UX.
  if (!prospectOk) {
    return NextResponse.json(
      { ok: false, error: "That didn't go through — try once more?" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true, notified: liorOk });
}
