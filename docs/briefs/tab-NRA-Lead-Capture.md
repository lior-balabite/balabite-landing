# Tab: NRA Lead Capture System + Booklet QR landing

**Repo**: balabite-landing
**Branch**: `tab/nra-lead-capture`
**Worktree**: `/Users/admin/balabite-landing-tab-lead-capture`
**Spawned**: 2026-05-14 — **last working day before Lior flies May 15**
**Priority**: P0 — show goal #1 is "capture qualified leads." If this isn't live, the show partially fails.

---

## Why this tab exists

At the NRA Show (May 16–19, Booth 8332), Lior needs to capture restaurant prospects — and do it in a way that's **modern, creative, and unmistakably "AI Cofounder"**, not a clipboard or a boring web form. Two surfaces:
1. **A prospect-facing signup page** — a restaurant owner scans a QR (from the booth or the printed booklet), lands here, and signs up for a pilot conversation. The act of signing up should itself feel like a glimpse of having an AI Cofounder.
2. **An owner-facing capture/list view** for Lior — where the captured leads land and where he can review/triage them, with light AI enrichment so he knows who's worth following up.

There is an existing spec to build from: **`/Users/admin/balabite-tab-NRA/docs/nra/2026-show/lead-capture-spec.md`** — read it FIRST. This brief sets scope and constraints; that spec has the detail.

---

## Locked context (decided — don't re-derive)

- **Category: "AI Cofounder for restaurants"** (locked 2026-05-11). Copy on this page uses Cofounder framing. Never "AI assistant / tool / platform."
- **No model disclosure** — never mention Claude / Anthropic / GPT / LLM anywhere user-visible or in code comments shipped to prod.
- **Thesis only** — no implementation leakage in any user-facing copy (Toast-PM test).
- **Don't lead with features** — the signup experience sells the *partner*, not the AI waiter / BOH tools.
- **Pricing is fair to surface**: 1% of sales + $299/mo floor — alignment pricing.
- **Design bar**: luxury-hospitality grade. Resy / Linear / Arc quality. Lior will reject sloppy visual work. Validate with Playwright before calling it done.
- **Stack**: this repo is Next.js 16 / React 19 / Tailwind v4, already has `@supabase/supabase-js` and `resend` installed. Use Supabase for storage, Resend for the instant thank-you email.

---

## Scope

### A. Prospect-facing signup (`/nra` or `/cofounder` route — see Open Questions)
- Mobile-first — every prospect lands here on their phone at a noisy trade show. Fast, thumb-friendly, works on bad conference wifi.
- Minimal fields, maximum signal: name, restaurant name, role, email, phone (optional), # locations. Keep it to one screen.
- **The "AI way" — restaurant auto-enrichment**: when the prospect types their restaurant name (+ city), the page enriches in the background — cuisine type, approximate size, location, anything publicly available — and reflects something back so the prospect *feels seen* ("Got it — looks like a 2-location Italian spot in Cleveland?"). This is the wow moment: signing up already feels like the Cofounder noticing them. Enrichment must **degrade gracefully** — if it finds nothing, the form still submits clean.
- On submit: instant on-screen confirmation + a Resend thank-you email. Confirmation copy should plant intent ("Your Cofounder is already reading up on [restaurant]…").
- Brand-teal palette consistent with `balabite.ai`.

### B. Owner-facing capture list (for Lior)
- A protected route (simple — see Open Questions on auth) listing captured leads, newest first.
- Each lead shows: submitted fields + enrichment results + a light **fit score / signal** (does this look like ICP — independent owner/operator vs vendor/student/enterprise).
- Lior can add a note to any lead (works on his phone at the booth).
- Exportable (CSV at minimum) so the follow-up sequence can run after the show.
- This is the surface that the show-assistant (separate Claude Code session) and the follow-up sequence both depend on — store data cleanly.

### C. Booklet QR landing — ROUTE LOCKED
- **The printed booklet's QR resolves to `balabite.ai/NRA-booklet`** — confirmed against the final print PDF (`book-final.pdf` page 12), PM-verified 2026-05-14. **Build the route at exactly `/NRA-booklet`.** Also add a case-insensitive alias/redirect from `/nra-booklet` → `/NRA-booklet` so a case mismatch in the QR can't 404.
- `/NRA-booklet` routes to the same signup flow as (A), with `?src=booklet` so Lior can tell booklet-driven leads from booth-driven.
- **Positioning note**: the printed booklet uses the OLD "AI Business Partner" language. **Decision (Lior, 2026-05-14): go full "AI Cofounder" — do NOT acknowledge or explain the gap on the page.** The `/NRA-booklet` page just leads with Cofounder as if the booklet always did. Never replicate "AI Business Partner" anywhere.

### D. Data model
- Supabase table for leads (fields + enrichment + score + notes + source + timestamp).
- Don't reuse / collide with any existing landing-repo tables — namespace clearly (e.g. `nra_leads`).

---

## Acceptance criteria

### Functional
- [ ] Signup page renders mobile-first, submits successfully, stores to Supabase.
- [ ] Restaurant auto-enrichment works AND degrades gracefully (empty result still submits).
- [ ] Resend thank-you email fires on submit.
- [ ] Owner list view shows leads newest-first with enrichment + fit score + notes + CSV export.
- [ ] Booklet QR URL confirmed and the route matches it exactly.
- [ ] `?src=` param distinguishes booth vs booklet leads.

### Quality / constraints
- [ ] Zero mentions of Claude/Anthropic/GPT/LLM in shipped code or copy.
- [ ] No feature-anchoring or implementation leakage in copy (Toast-PM test).
- [ ] Luxury-hospitality visual grade — validated with Playwright (screenshots committed to `docs/lead-capture-proof/`).
- [ ] Works on a throttled / 3G network profile (test in devtools).
- [ ] `npm run build` passes; Vercel preview deploys clean.

### Deploy
- [ ] Open a PR titled `feat(nra): lead capture system + booklet QR landing`.
- [ ] **This must reach a real, stable URL before May 15 EOD** — coordinate the deploy target with Lior (production balabite.ai vs a preview alias). Flag immediately if blocked.

---

## Open questions — flag to Lior, don't guess silently
1. ~~Booklet QR URL~~ — RESOLVED: `/NRA-booklet`, PM-verified against print PDF.
2. **Route for the booth QR** — the booklet QR is `/NRA-booklet`. The *booth* QR (poster/TV/table) can be the same or a cleaner `/nra`. Default: serve both, both into the same signup flow with different `?src=`.
3. **Owner-list auth** — full auth is overkill for a 4-day show. Acceptable: a shared secret link / passcode? (default: unguessable secret URL + simple passcode, unless Lior says otherwise)
4. **Enrichment source** — is there a budget/API preference for restaurant lookup, or use free/public sources? (default: free/public, no paid API without approval)
5. ~~Deploy target~~ — RESOLVED (Lior, 2026-05-14): **deploy `/NRA-booklet` + the signup flow + owner list to production `balabite.ai`, scoped.** Do NOT touch unrelated prod surfaces (no changes to the homepage, layout metadata, etc. — the SEO tab owns those). The booklet QR is printed and points at prod, so this route must be live on production before May 15 EOD. This is an approved, scoped prod deploy — not the usual "preview only" default.

## Coordination
- The pitch tab (`tab/nra-pitch`) is writing the pitch whose **close hands off into this signup flow** — the confirmation-screen copy and this brief should feel like one product. If you finish first, leave the confirmation copy clearly marked so the pitch tab can align.
- The SEO tab (`tab/seo-cofounder`) is also in this repo on another branch — avoid editing the same files (`src/app/layout.tsx`, metadata). Stay in your routes.
