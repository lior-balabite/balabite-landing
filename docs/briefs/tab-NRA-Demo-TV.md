# Tab: NRA Demo + TV — THE tab

**Repo**: balabite-landing
**Branch**: `tab/nra-demo-tv` (off origin/main @ 3dcde25)
**Worktree**: `/Users/admin/balabite-landing-tab-demo-tv`
**Spawned**: 2026-05-14 — last working day before Lior flies May 15
**Priority**: P0 — this is the single consolidated execution tab for the NRA booth. The TV and the demo are what make the show.

---

## The anti-loop rule — read this first

After many rounds of re-designing the pitch / demo / backdrop, the realization that ended the loop: **the narrative is already written.** It is `src/components/investors/ShortDeck.tsx`, **slides 1–6**. This tab does **not design or decide anything**. It *translates* the deck into two booth surfaces.

**If you find yourself making a narrative, positioning, or messaging decision — STOP. The deck already decided. Pull from it.** Your job is execution, not authorship.

## Source of truth (read FIRST, do not re-derive)
- `src/components/investors/ShortDeck.tsx` — **slides 1–6 are the script.** Slide components, copy, the 6 pain→action Pairs, the vignettes — all already written.
- `public/investors/pulse-hero.png`, `pulse-background.png`, `pulse-record.png` — the 3 Pulse screens (slide 5). These ARE the demo. Do not rebuild the product.
- This brief — structural rules only.

## Locked context (decided — do not revisit)
- **Category**: "AI Cofounder for restaurants." The deck still says "AI business partner" — **customer-facing surfaces (TV, demo) say "AI Cofounder." Translate as you pull.**
- **DO NOT MENTION BalaBite's pricing** (1% / $299 / any number) anywhere. NOTE: the `pulse-hero` screen shows a *menu* reprice ($18→$21) — that is fine, that's the product doing its job for the owner, not BalaBite's pricing.
- **No Claude / Anthropic / GPT / LLM** anywhere, ever.
- **Audience**: independent restaurant owners / operators / founders — NOT "chefs." The product addresses the owner by name ("Good evening, Fima").
- **Design bar**: luxury-hospitality grade. Lior rejects sloppy visual work. Validate every screen with Playwright.

## The 4 takeaways — everything ladders to these
1. **The role outgrew the human.** You're the only integration layer — alone. *(slide 1–2)*
2. **BalaBite runs the rest.** The team the math never let you hire. *(slide 3)*
3. **It acts — mostly it acts — and it owns the outcome.** *(slide 4 + the screens)*
4. **Yours alone.** Their POS's AI is every competitor's AI; BalaBite lives in *your* restaurant. *(slides 3, 4, 7)*

---

## Deliverable A — The booth TV loop

A silent, looping video surface that stops foot traffic in a loud aisle.

- **Build it as a route** in the landing app — e.g. `/booth-tv` — that auto-advances and loops, chrome-free, kiosk-style. **Reuse the actual `Slide` components / copy from `ShortDeck.tsx`** wherever possible — same content, timed and animated for a silent loop, restyled for legibility from 6+ feet on a 1080p landscape TV.
- **The beats (slides 1–6):**
  | Beat | Source | On screen |
  |---|---|---|
  | Hook | Slide 1–2 | "The role outgrew the human. The owner is the only integration layer. Alone." |
  | Proof | Slide 3 | The 6 pain→action pairs → "While you slept." |
  | How | Slide 4 | The 86-salmon vignette → "Sometimes it asks. Mostly it acts." |
  | Product | Slide 5 | The 3 Pulse screens |
  | Real | Slide 6 | "A partner they built in. Live since February." |
- **Must work fully silent** (booth is loud) — captioned, motion-driven, 5-second comprehension at every beat.
- **Length**: ~60–90s loop. Justify if you deviate.
- **Also deliver a screen-recorded `.mp4` fallback** of the loop (`docs/nra/tv-loop.mp4`) — for when conference wifi dies. Note for Lior to copy it to his laptop + phone.

## Deliverable B — The 2–3 minute laptop demo

A guided, clickable, scripted walk through the 3 Pulse screens — for the serious prospect who stopped.

- **Build it as a route** — e.g. `/demo` — guided, click-through, polished, WalkMe-style.
- **Built FROM the 3 Pulse images** (`public/investors/pulse-*.png`) — high-res, with a guided overlay (captions / highlights / progressive reveal) walking the viewer through each screen's wow moment. **Do NOT rebuild the live product.** The 3 designed screens ARE the demo — that's deliberate, and it's why earlier demo attempts failed (they wrangled the messy live app). If rebuilding a screen as a component is genuinely cleaner than overlaying the image, that's allowed — but the *content* is locked to what's in the PNG.
- **The spine — Sees → Acts → Owns it:**
  1. **Open (~10 sec)** — the problem: "You're the only integration layer. Alone. The math won't pay for the team to fix it."
  2. **Screen 1 — `pulse-hero` → It SEES.** Menu, revenue, customers, ops — synthesized into one briefing, with *one decision* waiting. Not a dashboard to dig through.
  3. **Screen 2 — `pulse-background` → It ACTS.** "Handled automatically" — descriptions, prep, re-engagement emails. While you ran service.
  4. **Screen 3 — `pulse-record` → It OWNS it.** What worked, what's still going — and *what didn't land* (happy hour, reverted). A vendor never tells you their thing failed; a cofounder does.
  5. **Close (~10 sec)** — "One restaurant, live since February. This is a taste — let me show you the rest. 20 minutes?" CTA ties to booking (reuse `/booth-8332`'s Cal.com booking).
- **Each screen leads into the next** — deliberate transitions, not a menu.
- **2–3 min MAX.** Lior delivers it solo.

## Deliverable C — The demo script

- `docs/nra/demo-script.md` — the exact words Lior says: the open, each screen, each transition, the close. Speakable, natural, no marketing mush. Built from the deck + the 4 takeaways.
- Also in it: the **10-second elevator pitch + handshake line** — must carry Lior's credibility: *"I'm not a software guy who studied restaurants — I live in one. I'm the engineer and the operator."* (slide 6 — "the engineer reading the Pulse is the engineer shipping it").

## Deliverable D — `/NRA-booklet` redirect (rides along)

The printed booklet's QR points to `balabite.ai/NRA-booklet`. Make it resolve — a redirect to `/booth-8332` (with `?src=booklet`). One file. Don't overthink it.

---

## Acceptance criteria
- [ ] `/booth-tv` route: silent, captioned, auto-looping, kiosk-clean, legible on a 1080p landscape TV from 6+ feet. Covers all 6 beats.
- [ ] `tv-loop.mp4` fallback recorded and committed; note for Lior to put it on laptop + phone.
- [ ] `/demo` route: guided 2–3 min walk through the 3 Pulse screens, Sees→Acts→Owns-it, each leading to the next, ending on a booking CTA.
- [ ] Demo content is locked to the 3 Pulse PNGs — product NOT rebuilt from the live app.
- [ ] `docs/nra/demo-script.md` complete — open, 3 screens, transitions, close, 10-sec elevator + handshake line.
- [ ] `/NRA-booklet` redirects to `/booth-8332?src=booklet`.
- [ ] Zero pricing (BalaBite's), zero Claude/Anthropic/GPT/LLM, "AI Cofounder" not "AI business partner", no "chef" framing.
- [ ] `npm run build` passes; Playwright screenshots of `/booth-tv` and `/demo` committed to `docs/nra/proof/`.
- [ ] **Deploys to production `balabite.ai`** — the booklet QR forces prod, and Lior needs the URLs live before he flies. Scoped deploy: only the new routes + redirect; do NOT touch unrelated prod surfaces (other tabs own `/`, layout, etc.).
- [ ] PR opened: `feat(nra): booth TV loop + 2-3 min demo + NRA-booklet redirect`.

## Open questions — flag to Lior, don't guess
1. **TV route name** — `/booth-tv` ok, or something else?
2. **Demo route name** — `/demo` ok? (note `/demo` is public — fine, or gate it lightly?)
3. **Booking CTA** — confirm the demo's close should drive to `/booth-8332`'s Cal.com booking, vs. a different next-step.

If unreachable: `/booth-tv` and `/demo`, demo close drives to `/booth-8332` booking.

## Scope discipline
This is the ONE tab. It does A–D and nothing else. If something feels like it needs a new narrative decision — it doesn't; the deck has it. If something feels like a new feature — it's out of scope. Ship A and B verified over a bigger broken thing. The win condition is: Lior walks onto the floor Saturday with a TV that loops and a demo he can click through in 2 minutes.
