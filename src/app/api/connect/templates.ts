/**
 * Email templates for the /connect two-way exchange.
 *
 * Two emails, both fired the moment a prospect leaves their address:
 *  - prospectEmail   → the warm note Lior "sends them right away"
 *  - notificationEmail → the actionable ping that lands in Lior's inbox
 *
 * Brand voice: calm, operator, no deck. Cream + serif + one gold rule —
 * the current balabite.ai system, not the old loud waitlist template.
 */

import { CONTACT } from '../../connect/contact';

const CREAM = '#FAF5EE';
const INK = '#1e293b';
const MUTED = '#6B5D4A';
const GOLD = '#d97706';
const SERIF = "Georgia, 'Times New Roman', serif";

function shell(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${CREAM};padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="max-width:480px;background:#FFFDF9;border:1px solid #E0D5C4;border-radius:16px;">
        <tr><td style="padding:36px 36px 32px;">
          ${inner}
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-family:${SERIF};font-style:italic;font-size:13px;color:${MUTED};">
        BalaBite — the AI Cofounder for independent restaurants.
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

/** The note the prospect gets ~10s after meeting Lior. */
export function prospectEmail(): { subject: string; html: string; text: string } {
  const subject = 'The 2-minute version';
  const html = shell(`
    <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};">
      BalaBite
    </p>
    <h1 style="margin:0 0 20px;font-family:${SERIF};font-weight:500;font-size:28px;line-height:1.2;color:${INK};">
      Good to meet you.
    </h1>
    <div style="height:1px;width:48px;background:${GOLD};opacity:0.5;margin:0 0 20px;"></div>
    <p style="margin:0 0 16px;font-family:${SERIF};font-size:17px;line-height:1.55;color:${INK};">
      Here's the quick version of what I'm building —
    </p>
    <p style="margin:0 0 16px;font-family:${SERIF};font-size:17px;line-height:1.55;color:${INK};">
      BalaBite is an AI Cofounder for independent restaurants — you run the
      place, it does the rest: the ordering, the inbox, the supplier mess,
      the hundred things that pull you off the floor.
    </p>
    <p style="margin:0 0 24px;font-family:${SERIF};font-size:17px;line-height:1.55;color:${INK};">
      No deck, no pitch — that's it. If you want the longer look, it's all at
      <a href="${CONTACT.site}" style="color:${GOLD};">balabite.ai</a>.
    </p>
    <p style="margin:0;font-family:${SERIF};font-size:17px;line-height:1.55;color:${INK};">
      — Lior
    </p>
    <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #E0D5C4;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.5;color:${MUTED};">
      P.S. — if you want 20 minutes off the floor, yours, your numbers, grab a
      time: <a href="${CONTACT.booth}" style="color:${GOLD};">balabite.ai/booth-8332</a>
    </p>
  `);
  const text = `Good to meet you.

Here's the quick version of what I'm building —

BalaBite is an AI Cofounder for independent restaurants — you run the place, it does the rest: the ordering, the inbox, the supplier mess, the hundred things that pull you off the floor.

No deck, no pitch — that's it. If you want the longer look, it's all at ${CONTACT.site}.

— Lior

P.S. — if you want 20 minutes off the floor, yours, your numbers, grab a time: ${CONTACT.booth}`;
  return { subject, html, text };
}

/** The actionable ping Lior gets — built to act on from his pocket. */
export function notificationEmail(opts: {
  email: string;
  when: string;
  location?: string;
}): { subject: string; html: string; text: string } {
  const { email, when, location } = opts;
  const subject = `Someone just connected — ${email}`;
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    'Good to meet you',
  )}`;
  const locLine = location
    ? `<tr><td style="padding:2px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${MUTED};">Around</td>
       <td style="padding:2px 0 2px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${INK};">${location}</td></tr>`
    : '';
  const html = shell(`
    <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};">
      Someone connected
    </p>
    <h1 style="margin:0 0 20px;font-family:${SERIF};font-weight:500;font-size:26px;line-height:1.2;color:${INK};">
      ${email}
    </h1>
    <div style="height:1px;width:48px;background:${GOLD};opacity:0.5;margin:0 0 20px;"></div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      <tr><td style="padding:2px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${MUTED};">Email</td>
          <td style="padding:2px 0 2px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${INK};">
            <a href="mailto:${email}" style="color:${INK};">${email}</a></td></tr>
      <tr><td style="padding:2px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${MUTED};">When</td>
          <td style="padding:2px 0 2px 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${INK};">${when}</td></tr>
      ${locLine}
    </table>
    <a href="${replyHref}"
       style="display:inline-block;background:${GOLD};color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:600;text-decoration:none;padding:13px 28px;border-radius:999px;">
      Reply now &rarr;
    </a>
  `);
  const text = `Someone connected — ${email}

Email: ${email}
When:  ${when}${location ? `\nAround: ${location}` : ''}

Reply: ${replyHref}`;
  return { subject, html, text };
}
