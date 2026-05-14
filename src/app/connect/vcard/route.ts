import { CONTACT } from '../contact';

/**
 * GET /connect/vcard
 *
 * Serves a vCard 3.0 (.vcf) for Lior. vCard 3.0 is the most broadly
 * compatible version — it imports cleanly on both iOS Contacts and
 * Android (Google Contacts). Lines are CRLF-terminated per RFC 2426.
 *
 * Tapping the "Add to Contacts" link navigates here; iOS opens the
 * native contact sheet, Android downloads the .vcf and hands it to the
 * Contacts app (Content-Disposition: attachment).
 *
 * No phone number by design — see docs/briefs/tab-Connect-Card.md.
 */

const vcard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
  `FN:${CONTACT.fullName}`,
  `ORG:${CONTACT.org}`,
  `TITLE:${CONTACT.title}`,
  `EMAIL;type=WORK;type=INTERNET;type=pref:${CONTACT.email}`,
  `URL;type=WORK;type=pref:${CONTACT.site}`,
  // Apple-style labelled URL — shows as "LinkedIn" on iOS, a website on Android.
  `item1.URL:${CONTACT.linkedin}`,
  'item1.X-ABLabel:LinkedIn',
  `NOTE:${CONTACT.tagline}.`,
  'REV:2026-05-14T00:00:00Z',
  'END:VCARD',
  '',
].join('\r\n');

export function GET(request: Request) {
  // Anonymous tap heartbeat. The vCard save itself is invisible to the
  // server (no callback exists on iOS or Android) — but the tap that asks
  // for the card is a real request, so we log it. Named connections come
  // through /api/connect; this is just the "someone, somewhere" signal.
  // TODO(fast-follow): roll these into an hourly digest — needs a small
  // Supabase table + a Vercel cron (shared config, so out of this tab's scope).
  const h = request.headers;
  const city = h.get('x-vercel-ip-city');
  const region = h.get('x-vercel-ip-country-region');
  const where = [city && decodeURIComponent(city), region]
    .filter(Boolean)
    .join(', ');
  console.log(
    `[connect] vCard tapped ${new Date().toISOString()}${where ? ` · ${where}` : ''}`,
  );

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Lior-Brik-BalaBite.vcf"',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
