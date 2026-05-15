# Tab: NRA Booth Content — screens, hype videos, TV variety

**Repo**: balabite-landing
**Branch**: `tab/nra-booth-content` (off latest `origin/main`)
**Spawned**: drafted 2026-05-14 by `tab/nra-demo-tv`, per Lior
**Priority**: P1 — fast-follow. The booth is *covered for day one* by `tab/nra-demo-tv`
(`/booth-tv` loop + `/demo`). This tab makes the booth **richer over the 4 days** —
it is NOT a day-one dependency. Ship incrementally; pull live during the show.

---

## The anti-loop rule — read this first

`tab/nra-demo-tv` learned this the hard way: **the moment you're making a design or
narrative decision, stop.** This tab *captures and assembles* — it does not author
the product or the pitch.

- Product screens come from **real existing pages** or **faithful mock-data versions
  of real structures.** Do not redesign the product. Do not invent UI.
- The narrative is still `src/components/investors/ShortDeck.tsx` slides 1–6 and the
  4 takeaways. Hype videos assemble *that*, restyled — they don't say anything new.
- "Create a mockup" means: take the real component/page, swap in mock data, capture
  it. It does **not** mean design a new screen from scratch.

If a deliverable can't be done without authoring something new — it's out of scope;
flag it to Lior.

## Why this tab exists

The `/booth-tv` loop is one ~82s sequence. Over a 4-day show in a loud aisle it gets
stale, and the `/demo` Pulse images are lower-res than Lior wants. Lior wants:

- **More booth-floor content** — screens beyond the 3 Pulse PNGs.
- **Hype videos** assembled from those screens (walkthrough-style, silent, loopable).
- **TV variety** — the booth TV rotating through *several* short videos, not one loop.
- **A logo page** — a large, clean render of the homepage BalaBite logo (the palm).
- **Sharper `/demo`** — higher-res Pulse screens, plus a recipe-page screen as an
  example.

## Source material — Lior's inventory (2026-05-14)

| Asset | Status | Notes |
|---|---|---|
| Recipe page | **Exists** in the app | Confirm route; capture at high DPI |
| "Open tabs" page | **Exists** in the app | Confirm route; capture at high DPI |
| Pulse screens | PNGs in `public/investors/pulse-*.png` | **Too low-res for `/demo`.** High-res source identified by Lior: the product-app preview — **`https://balabiteaidev-git-feature-boh-suite-bala-bite-dev.vercel.app/`** (the `feature-boh-suite` branch of the `balabiteaidev` project on the `bala-bite-dev` Vercel team; the "pulse preview" page). Capture there at `deviceScaleFactor: 2–3`, then re-point `/demo`. Lior to confirm the exact pulse-preview path. |
| WhatsApp mockup | **Needs creating** | A mock of the staff-chat / "show it anything" surface (ShortDeck slide 4). Mock data only — build on a real chat-bubble structure, don't design a messenger. |
| Notifications | **Mock data** | Use a real notification component if one exists; otherwise a faithful mock-data version. |
| Pulse data screens | **Mock data** | Variations on the Pulse with mock data — same structure as the locked PNGs. |
| Marketing page | "Not hard" to create | Confirm scope with Lior before building — this risks the anti-loop rule. |
| Loyalty page | "Not hard" to create | Same caveat. |
| Homepage logo | **Exists** — `src/app/page.tsx` header | The "new logo" Lior means is the one currently on the homepage. |

## Deliverables

### A — High-DPI screen captures
A Playwright capture script (`deviceScaleFactor: 2–3`) that grabs crisp PNGs of the
real pages: recipe, open-tabs, and any other shipped surfaces. Commit to a known
folder (e.g. `public/booth/screens/` or `docs/nra/screens/`).

### B — Sharper `/demo` Pulse images
Replace the soft `public/investors/pulse-*.png` with higher-res source. Either:
(a) locate the Pulse mockup page and capture at high DPI, or (b) rebuild the 3 Pulse
screens as components — **content locked to the current PNGs** (`tab/nra-demo-tv`'s
brief already permits this). Then re-point `/demo` and re-capture proof.
Also: add a recipe-page screen into `/demo` as an example screen.

### C — WhatsApp mockup + mock-data screens
A WhatsApp/staff-chat mockup (slide 4's "86 salmon" moment), a notifications screen,
and Pulse-data variations — all mock data on real structures.

### D — Hype video(s)
Short, silent, loopable walkthrough videos assembled from A–C (and the existing
`/booth-tv` beats). Same capture→ffmpeg pipeline `tab/nra-demo-tv` used
(`docs/nra/README.md` documents it). Commit `.mp4`s; note offline-fallback copies.

### E — Booth-TV variety
Extend `/booth-tv` to rotate through multiple loop variants, or add sibling kiosk
routes. The loop is already a beat array (`src/app/booth-tv/BoothTvLoop.tsx`) — adding
variants is structural, not a rewrite. Keep it gated (`@/lib/booth-gate`).

### F — Logo page
A large, clean, full-screen render of the homepage BalaBite logo (the palm wordmark).
Likely a small gated route, e.g. `/booth-logo` — confirm with Lior.

## Coordination — what `tab/nra-demo-tv` already shipped

- `/booth-tv` and `/demo` exist, are **soft-gated** via `@/lib/booth-gate` +
  `@/components/BoothGate` (`?key=<BOOTH_ACCESS_KEY>` or passphrase). New booth
  surfaces should reuse this gate.
- `/booth-tv` is a 6-beat array — extend, don't rewrite.
- `NRABannerClient` `HIDDEN_ROUTES` must include any new booth/kiosk route.
- Capture→mp4 pipeline is documented in `docs/nra/README.md`.

## Open questions — flag to Lior, don't guess

1. **Pulse source — confirm the path.** Lior identified the source as the product
   app preview: `https://balabiteaidev-git-feature-boh-suite-bala-bite-dev.vercel.app/`
   ("pulse preview"). Need the exact route to capture, and access (the preview may
   be gated). If `pulse preview` shows the same content as the locked PNGs, capture
   at high DPI and we're done; if the structure has drifted, re-point `/demo` to a
   captured-at-high-DPI version of whatever-now-ships, NOT a redesign.
2. **Marketing + loyalty pages** — these don't exist. "Not hard" still means
   *authoring* new pages, which trips the anti-loop rule. What exactly should they
   show, and is content locked anywhere?
3. **Recipe / open-tabs routes** — confirm the exact paths so they can be captured.
4. **Logo page** — route name + is it for the TV, a handout, or both?
5. **TV variety** — one route that rotates variants, or several sibling routes?

## Scope discipline

Day one is already covered. This tab is *additive polish*, shippable in pieces during
the show. Ship one crisp asset over a half-built pile. If "create a page" turns into
"design a product surface" — stop and flag it.
