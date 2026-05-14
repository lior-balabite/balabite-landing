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
| `07-admin-authed-mobile.png` | `/admin/nra` authenticated | Graceful "storage not connected" state (captured before the Supabase service key was wired — see below) |
| `08-nra-3g-throttled.png` | `/nra` on Fast-3G | Renders + interactive under throttling |
| `09-nra-desktop.png` | `/nra` signup, desktop | Filled state with enrichment + selected chips |
| `10-admin-gate-desktop.png` | `/admin/nra` gate, desktop | |

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

## Pending final verification (needs the live Supabase service key)

`07-admin-authed-mobile.png` shows the graceful no-storage state. Once the
`nra_leads` migration is run and `NRA_SUPABASE_SERVICE_ROLE_KEY` is wired, the
following are verified on the production deploy and this folder updated:

- Real end-to-end submit → row in `nra_leads` + Resend thank-you + owner email.
- `/admin/nra` populated lead list with fit score, enrichment, notes, CSV export.
