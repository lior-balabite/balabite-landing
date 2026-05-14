# NRA Lead Capture — validation proof

Playwright-captured proof for the NRA Show 2026 lead-capture system
(`tab/nra-lead-capture`). Screenshots taken against the local dev build at
mobile (iPhone 13, 390×844) and desktop (1366×900) viewports.

## Screenshots

| File | Surface | Notes |
|------|---------|-------|
| `01-nra-mobile-empty.png` | `/nra` signup, mobile | Empty form, one screen, thumb-friendly |
| `02-nra-mobile-enriched.png` | `/nra` enrichment moment | "Got it — looks like a handful of coffee shops around Seattle" — live OpenStreetMap enrichment |
| `03-nra-mobile-validation.png` | `/nra` validation | Inline per-field errors on empty submit |
| `04-nra-mobile-confirmation.png` | `/nra` confirmation | "Your Cofounder is already reading up on …" — plants intent, pitch-tab handoff point |
| `05-nra-booklet-mobile.png` | `/NRA-booklet`, mobile | Same flow as `/nra`, attributed `?src=booklet` |
| `06-admin-gate-mobile.png` | `/admin/nra` gate, mobile | Passcode gate |
| `07-admin-authed-mobile.png` | `/admin/nra` authenticated, mobile | Populated lead list — fit badges, enrichment, fit reason, note editors, filters, CSV export |
| `08-nra-3g-throttled.png` | `/nra` on Fast-3G | Renders + interactive under throttling |
| `09-nra-desktop.png` | `/nra` signup, desktop | Filled state with enrichment + selected chips |
| `10-admin-gate-desktop.png` | `/admin/nra` gate, desktop | |
| `11-admin-authed-desktop.png` | `/admin/nra` authenticated, desktop | Populated lead list, desktop layout |
| `12-prod-nra-mobile.png` | **LIVE** `www.balabite.ai/nra` | Production deploy — banner correctly hidden, no page errors |
| `13-prod-nra-booklet-mobile.png` | **LIVE** `www.balabite.ai/NRA-booklet` | Production deploy |
| `14-prod-admin-authed.png` | **LIVE** `www.balabite.ai/admin/nra` | Production deploy — passcode gate authenticates |
| `15-email-thankyou.png` | Resend thank-you email | Rendered template — Cofounder voice, no pricing, no feature-anchoring |

## Checks performed

- **Build** — `npm run build` passes clean (Next.js 16 / React 19 / Tailwind v4).
- **Routes** — `/nra` 200, `/NRA-booklet` 200, `/admin/nra` 200.
- **Booklet case-insensitive alias** — `/nra-booklet` and `/NRA-BOOKLET` both
  307-redirect to the canonical `/NRA-booklet` (middleware).
- **Enrichment degrades gracefully** — a real restaurant resolves a reflection;
  a nonsense name returns `{ enrichment: null }` and the form still submits.
- **Console clean** — no errors / warnings / hydration mismatches on `/nra`,
  `/NRA-booklet`, `/admin/nra`, or the submit→confirm flow.
- **3G profile** — `/nra` loads and becomes interactive under emulated Fast-3G
  (`display: swap` fonts, no render-blocking JS beyond the framework).
- **Model-disclosure / feature-anchoring scan** — zero mentions of
  Claude/Anthropic/GPT/LLM or "AI Business Partner" in any shipped file.
- **Auth** — `/admin/nra` passcode gate authenticates and sets an httpOnly
  cookie; fails closed if no passcode is configured.

## End-to-end verification (against the live prod Supabase)

After the `nra_leads` migration was run and the scoped env vars were wired,
two real test submissions were run through the full pipeline and confirmed:

- **Storage** — both rows landed in `public.nra_leads` with the correct
  fields, `?src=` attribution (booth vs booklet), enrichment JSON, and
  computed fit score + reason.
- **Enrichment** — resolved live ("Small plates · Chicago · Illinois",
  "American · Chicago · Illinois") from OpenStreetMap.
- **Resend thank-you** — fired on submit (`emailed: true`); sender corrected
  to the verified `balabite.ai` domain.
- **Owner notification** — sent to `ADMIN_EMAIL`.
- **Notes** — edited from `/admin/nra` and confirmed persisted to the row.
- **Cleanup** — all test rows deleted; the production table starts empty.

## Production verification (www.balabite.ai)

Deployed scoped to production. Confirmed live:

- `/`, `/pitch`, `/booth-8332` — still 200 (nothing else regressed).
- `/nra`, `/NRA-booklet`, `/admin/nra` — 200; `/nra-booklet` and
  `/NRA-BOOKLET` 307-redirect to the canonical `/NRA-booklet`.
- A full submission through the **production** `/api/nra/lead` stored to
  `nra_leads` (`stored: true`), sent the thank-you (`emailed: true`), and
  computed the fit score — then the test row was deleted.
- `/admin/nra` passcode gate authenticates on production; the site-wide
  marquee banner is correctly hidden on all three capture surfaces.
