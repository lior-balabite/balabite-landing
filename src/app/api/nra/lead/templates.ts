import type { NraEnrichment, NraFitScore } from '@/lib/nra-types';

/**
 * Email templates for the NRA lead-capture flow.
 *
 * Two emails:
 *  - Prospect thank-you  — warm, Cofounder-voiced, plants intent.
 *  - Owner notification  — fast, scannable, doubles as a capture safety-net.
 *
 * Copy rules (locked): Cofounder framing only; never "assistant / tool /
 * platform". No model disclosure. No feature-anchoring (Toast-PM test).
 */

interface ProspectEmailInput {
  fullName: string;
  restaurantName: string;
  source: 'booth' | 'booklet';
}

interface OwnerEmailInput {
  fullName: string;
  restaurantName: string;
  role: string;
  email: string;
  phone?: string;
  city?: string;
  locationCount?: string;
  source: string;
  fit: NraFitScore;
  enrichment?: NraEnrichment | null;
  stored: boolean;
}

const INK = '#0a0a0a';
const INK_60 = 'rgba(10,10,10,0.62)';
const INK_40 = 'rgba(10,10,10,0.42)';
const CREAM = '#faf7f0';
const CREAM_CARD = '#fffdf7';
const AMBER = '#b45309';
const HAIRLINE = 'rgba(10,10,10,0.12)';

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || 'there';
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* --------------------------------------------------------------------- */
/* Prospect thank-you                                                    */
/* --------------------------------------------------------------------- */

export function getProspectThankYouEmail(input: ProspectEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const name = esc(firstName(input.fullName));
  const restaurant = esc(input.restaurantName.trim());
  const metAt =
    input.source === 'booklet'
      ? 'Thanks for scanning in.'
      : 'Good to meet you at Booth 8332.';

  const subject = `Your Cofounder is already reading up on ${input.restaurantName.trim()}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your Cofounder is already reading up on ${restaurant}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:${CREAM_CARD};border:1px solid ${HAIRLINE};border-radius:16px;overflow:hidden;">
        <tr><td style="padding:36px 36px 0 36px;">
          <div style="font:600 13px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:${AMBER};">BalaBite</div>
        </td></tr>
        <tr><td style="padding:22px 36px 0 36px;">
          <div style="font:400 27px/1.22 Georgia,'Times New Roman',serif;color:${INK};letter-spacing:-0.01em;">
            Your Cofounder is already<br>reading up on ${restaurant}.
          </div>
        </td></tr>
        <tr><td style="padding:20px 36px 0 36px;">
          <p style="margin:0 0 14px 0;font:400 16px/1.62 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK_60};">
            ${name} — ${metAt} The short version of what we do: you run the restaurant, and BalaBite is the Cofounder that handles everything around it.
          </p>
          <p style="margin:0 0 14px 0;font:400 16px/1.62 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK_60};">
            It's already reading up on ${restaurant}. By the time we actually talk, it'll know your neighborhood, your competition, the rhythm of your week — so we can skip the small talk and get straight to what's costing you.
          </p>
        </td></tr>
        <tr><td style="padding:8px 36px 0 36px;">
          <div style="border-top:1px solid ${HAIRLINE};padding-top:20px;">
            <div style="font:600 12px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:${INK_40};margin-bottom:12px;">What happens next</div>
            <p style="margin:0 0 10px 0;font:400 15px/1.55 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK_60};">
              Lior will reach out within the week. No pitch theater — just a straight conversation about where a Cofounder would pull its weight at ${restaurant}.
            </p>
          </div>
        </td></tr>
        <tr><td style="padding:28px 36px 36px 36px;">
          <p style="margin:0;font:400 15px/1.55 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">
            — Lior<br>
            <span style="color:${INK_40};font-size:13px;">Founder, BalaBite</span>
          </p>
        </td></tr>
      </table>
      <div style="font:400 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK_40};padding:18px 0 0 0;">
        BalaBite · NRA Show 2026 · Booth 8332
      </div>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `${name} — ${metAt}`,
    ``,
    `Your Cofounder is already reading up on ${input.restaurantName.trim()}.`,
    ``,
    `The short version of what we do: you run the restaurant, and BalaBite is the Cofounder that handles everything around it. It's already reading up on ${input.restaurantName.trim()} — by the time we actually talk, it'll know your neighborhood, your competition, the rhythm of your week, so we can skip the small talk and get straight to what's costing you.`,
    ``,
    `What happens next: Lior will reach out within the week. No pitch theater — just a straight conversation about where a Cofounder would pull its weight at ${input.restaurantName.trim()}.`,
    ``,
    `— Lior`,
    `Founder, BalaBite`,
    ``,
    `BalaBite · NRA Show 2026 · Booth 8332`,
  ].join('\n');

  return { subject, html, text };
}

/* --------------------------------------------------------------------- */
/* Owner notification (Lior) — also the capture safety-net                */
/* --------------------------------------------------------------------- */

export function getOwnerNotificationEmail(input: OwnerEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const dot =
    input.fit.signal === 'strong'
      ? '🟢'
      : input.fit.signal === 'medium'
        ? '🟡'
        : '⚪';

  const subject = `${dot} New NRA lead — ${input.restaurantName.trim()} (${input.fit.signal} fit)`;

  const rows: [string, string][] = [
    ['Name', input.fullName],
    ['Restaurant', input.restaurantName],
    ['Role', input.role || '—'],
    ['Email', input.email],
    ['Phone', input.phone || '—'],
    ['City', input.city || '—'],
    ['Locations', input.locationCount || '—'],
    ['Source', input.source],
    ['Fit', `${input.fit.signal} · ${input.fit.score}/100 — ${input.fit.reason}`],
  ];

  if (input.enrichment) {
    const e = input.enrichment;
    const parts = [e.cuisine, e.locality, e.region].filter(Boolean).join(' · ');
    rows.push(['Enrichment', parts || e.displayName || '—']);
  }

  const failBanner = input.stored
    ? ''
    : `<tr><td style="padding:0 28px 16px 28px;">
         <div style="background:#fdecea;border:1px solid #f3b6b0;border-radius:10px;padding:12px 14px;font:600 13px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#8a1c12;">
           ⚠️ NOT saved to the database — add this lead manually.
         </div>
       </td></tr>`;

  const rowHtml = rows
    .map(
      ([k, v]) => `<tr>
        <td style="padding:7px 0;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK_40};text-transform:uppercase;letter-spacing:0.06em;width:96px;vertical-align:top;">${esc(k)}</td>
        <td style="padding:7px 0;font:400 14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">${esc(v)}</td>
      </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
    <tr><td align="center" style="padding:32px 20px;">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:${CREAM_CARD};border:1px solid ${HAIRLINE};border-radius:14px;">
        <tr><td style="padding:26px 28px 8px 28px;">
          <div style="font:600 13px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">${dot} New NRA lead</div>
        </td></tr>
        ${failBanner}
        <tr><td style="padding:8px 28px 26px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text =
    `${dot} New NRA lead${input.stored ? '' : '  [NOT SAVED TO DB — ADD MANUALLY]'}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  return { subject, html, text };
}
