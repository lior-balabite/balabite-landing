# `/connect` — Digital Business Card · Build Summary

**Status:** ✅ Live in production — `https://www.balabite.ai/connect`
**Branch:** `tab/connect-card` · **PR:** [#8](https://github.com/lior-balabite/balabite-landing/pull/8)
**Shipped:** 2026-05-14 (before Lior's NRA Show trip, Booth 8332)

---

## What it is

A mobile-first digital business card for Lior — his contact hand-off at the
NRA Show in place of printed cards — with an optional **two-way exchange**.

### The two beats
1. **One-tap vCard.** Tap *Add to Contacts* → valid vCard 3.0 (`text/vcard`,
   attachment, CRLF) imports cleanly on iOS + Android. **No phone number** —
   email, site, LinkedIn only.
2. **Optional email exchange.** After the tap, a calm one-field panel reveals.
   Submit → `/api/connect` fires two emails via Resend: a warm note to the
   prospect, and a "someone just connected" notification to Lior. The card
   still works for anyone who only wants the contact.

### How it gets used
- **QR** (`connect-qr-card.png`) printed on a booth sign / table tent / sticker
- **NFC sticker** written with the URL (optional, ~$5)
- Said out loud — `balabite.ai/connect` (redirects to the `www` canonical)
- Pasted into email signature / iMessage / LinkedIn

---

## Files

| File | Purpose |
|---|---|
| `src/app/connect/page.tsx` | The card — server component, brand lockup, identity, links |
| `src/app/connect/ConnectExchange.tsx` | Client — beat-1 vCard tap + beat-2 reveal/form |
| `src/app/connect/vcard/route.ts` | vCard 3.0 handler + anonymous tap heartbeat (server log) |
| `src/app/connect/contact.ts` | Single source of truth for contact details |
| `src/app/connect/connect.css` | Scoped entrance + reveal animations |
| `src/app/api/connect/route.ts` | POST — validate, honeypot, 5-min dedupe, 2 Resend sends |
| `src/app/api/connect/templates.ts` | Calm cream/serif email templates |
| `src/app/layout.tsx` | **Cross-tab:** stripped `$299` pricing from JSON-LD |

Design: rebuilt on the current balabite.ai system — palm woodcut logo,
Instrument Serif, cream on `primary-950`, gold accents — matching the navbar
and `/booth-8332`.

---

## Decisions locked with Lior

| Question | Decision |
|---|---|
| Phone on the vCard | No — email + LinkedIn only |
| LinkedIn URL | `linkedin.com/in/lior-brik` |
| Tagline | "Building the AI Cofounder for restaurants" |
| Notifications | Email to `lior@balabite.ai` via Resend |
| Pricing | Removed from prospect/search-facing surfaces; investor deck left intact |
| Deploy | Production via Vercel CLI, after preview review |

Two roundtables informed the build: a **technical** one (iOS/Android contact
exchange, what's detectable, notification channels) and a **content** one
(card + email copy, the no-pricing directive).

---

## Environment variables

| Var | Required | Default | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | — | Already set (Production scope). Preview env lacks it → exchange degrades gracefully (`delivered:false`). |
| `CONNECT_FROM_EMAIL` | No | `hello@balabite.ai` | Verified Resend sender. |
| `CONNECT_NOTIFY_EMAIL` | No | `lior@balabite.ai` | Where Lior's notifications land. |

---

## Proof artifacts in this folder

| File | What it shows |
|---|---|
| `connect-qr-card.png` | **Branded, printable booth QR card** (3240×4500) |
| `connect-qr.png` | Bare QR → `www.balabite.ai/connect` |
| `connect-mobile.png` | The card, mobile |
| `connect-mobile-exchange.png` | The card with the beat-2 exchange revealed |
| `connect-desktop.png` | The card, desktop |
| `email-prospect.png` | The "Good to meet you" note the prospect receives |
| `email-notification.png` | The "Someone just connected" notification Lior receives |

---

## Verified in production

- `/connect` → 200, brand-correct, zero Claude/Anthropic/GPT/LLM mentions
- `/connect/vcard` → valid vCard 3.0, correct headers
- `/api/connect` POST → `delivered:true, notified:true` (emails send for real)
- `balabite.ai` apex → 307 redirect to `www`
- Sibling routes (`/`, `/booth-8332`, `/pitch`, `/robots.txt`, `/sitemap.xml`) intact
- `npm run build` passes

---

## Open flags for the team (none block the booth)

1. **NRA banner on `/connect`** — the global banner from `layout.tsx` renders
   on `/connect`. One-line fix: add `/connect` to `HIDDEN_ROUTES` in
   `NRABannerClient.tsx` (owned by `tab/seo-cofounder`).
2. **Investor deck pricing** — `ShortDeck.tsx` still carries `$299 floor /
   1% of sales`. Left intact per Lior — investors need the model.
3. **Waitlist Resend domain** — the existing waitlist flow sends from the
   **unverified** `waitlist.balabite.ai`; its emails may be silently failing
   in production. `/connect` uses the verified `hello@balabite.ai`.
4. **Anonymous tap digest** — vCard taps are logged to server logs as a
   heartbeat. A proper hourly digest needs a small datastore + a Vercel cron
   (shared config) — deferred as a fast-follow.
5. **`layout.tsx` JSON-LD change** lives in commit `a84c742` but the file is
   owned by `tab/seo-cofounder` — coordinate on merge.
