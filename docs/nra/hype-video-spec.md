# Hype Video — production spec (v3)

**Built from:** the up-and-coming-startup roundtable (Chesky / Collison / Heyward / Lessin / Fadell), the post-Zavo benchmark read, and the locked landing-page canon.
**For:** NRA Show 2026, Booth 8332 (May 16–19). **One** 30-second silent piece, captioned, that plays in `/booth-tv` rotation **and** posts on LinkedIn. Same edit, two audio variants (booth = silent; LinkedIn = ambient bed + one sound-design tap).

> **What changed from v2:** v2 mixed two jobs into one piece — depth (Honesty Beat) and reach (hype). They are different jobs. v3 is **hype-grade only**: a stranger gets BalaBite cold in 30 seconds. The Honesty Beat moves out of this spec; if shipped, it ships separately as a `/booth-tv` depth variant in [`tab/nra-booth-content`](../briefs/tab-NRA-Booth-Content.md). One video, both surfaces — booth-TV rotation + LinkedIn.

---

## Job-to-be-done

The hype's job, in one sentence: **a stranger nods *"yes, that's me"* inside 5 seconds, gets the BalaBite role in 8, sees what the calm looks like in 15, holds the brand stake in 5 more, and leaves with *"Meet your AI Cofounder. You run the place. We do the rest."* stuck in their head.**

Not: depth, education, product demo, comparison-to-competitors. *Hype.* Recognition and signature.

---

## TL;DR (6 lines)

- **30 seconds. Silent. Captioned. Loopable.** Same visual edit plays on `/booth-tv` and on LinkedIn; only the audio variant changes.
- **9 beats:** threshold → ten-person job → and you're doing it all → the pause → the turn → while you slept → one decision waiting → yours alone → the door.
- **7 captions.** Instrument Serif, 6–7 vw display, amber accents on punch words. The tagline is the line that travels.
- **Pulled 100% from canon:** backdrop ("a ten-person job"), `TheTurn.tsx` ("what if you weren't?"), `DayWithout.tsx` (the hats), deck slide 3 (pain→action pairs), `pulse-hero.png` (Shot 5), deck slide 7 ("yours alone"), the locked tagline.
- **Runway atmosphere only.** The Approve macro is a real capture (✅ committed). The end-card is the existing brand asset.
- **Master mp4 ships at** `public/booth/hype/hype-30s.mp4`. Source assets at `docs/nra/hype-assets/`.

---

## The five voices behind this spec

A reminder for whoever generates it — the choices are non-arbitrary.

| Voice | Their non-negotiable |
|---|---|
| **Chesky** (Airbnb) | The 1-second black threshold, the half-second pause at t=7, the long tagline hold. Restraint *is* the brand. |
| **Collison** (Stripe) | Subtract. Every caption and cut earns its time. Three-word captions where possible. |
| **Heyward** (Red Antler) | The "ten-person job" hook line; the "yours alone" brand stake as typography. Quotable. Screenshotable. |
| **Lessin** (Slow Ventures) | LinkedIn rules: silence reads as intentional, logo only at end, captions ARE the script. Same edit, two audio variants. |
| **Fadell** (Nest) | 5 seconds on the Approve macro. The product is the climax. Sound-design tap on the button — the iPod *click*. |

---

## Source assets

| Asset | Status | Path |
|---|---|---|
| `approve-button-macro.png` — Pulse decision card @ 3× DPI | ✅ **Committed** to `tab/nra-booth-content` | `docs/nra/hype-assets/approve-button-macro.png` (1824 × 825) |
| Reference frames — 6 "ten-person-job" objects (Shot 2) | Need | Royalty-free stock (Unsplash / Pexels). Macros: menu open, register-tape stub, staff rota / schedule, phone with notifications, inbox close-up, scuffed clipboard. → `docs/nra/hype-assets/refs/job-{1..6}.jpg` |
| Reference frame — operator-POV midnight (Shot 3) | Need | Unsplash, "restaurant pass at night, no people, receipts" or similar. → `refs/midnight-pov.jpg` |
| Reference frames — 3 pain→action pairs (Shot 6) | Need | Stock; same brief as v2 (bok-choy crate, hurricane window, unread inbox + matching fix frames). → `refs/pair-{1a,1b,2a,2b,3a,3b}.png` |
| Reference frame — kitchen-warm wide (Shot 8) | Need | Real photo. Annie Spratt / Petr Magera Unsplash. → `refs/yours-alone-wide.jpg` |
| Brand end-card | Have | Existing `/booth-tv` Real-beat lockup; capture clean 1920×1080 from `/booth-tv?key=…` mid-Real-beat or build dedicated `/booth-endcard` route |
| Sound design — single Approve "tap" | Need (LinkedIn cut only) | Freesound / Soundsnap, "soft UI tap, single, organic." ≤−10 dB |
| Room-tone ambient bed | Need (LinkedIn cut only) | Freesound: "empty restaurant ambient" |

---

## Captions track (all 7)

| # | t (s) | On screen | Style |
|---|---|---|---|
| C1 | 1.3 → 4.0 | *a ten-person job.* | Instrument Serif italic, cream-50, **6.5 vw**, lower-third center |
| C2 | 4.5 → 7.0 | *and you're doing it all.* | same; cream-100, slightly larger |
| C3 | 8.5 → 11.0 | *what if you weren't?* | same; amber-300 (the warmth returns) |
| C4 | 11.5 → 17.0 | *while you slept.* | same; cream-50, **7 vw** |
| C5 | 18.0 → 22.0 | one decision waiting. | Mono uppercase, **1.6 vw**, letter-spacing 0.24 em, amber-300, beside the Approve button |
| C6 | 22.3 → 25.0 | **yours alone.** | Instrument Serif italic, amber-300, **7.5 vw**, center |
| C7 (line 1) | 25.5 → 26.5 | **Meet your AI Cofounder.** | Instrument Serif italic, cream-50, **6.5 vw** |
| C7 (line 2) + booth tag | 26.8 → 29.4 | **You run the place. We do the rest.**<br>`BOOTH 8332 · NRA SHOW 2026` | Same as the existing `/booth-tv` Real-beat lockup |

**Captions are an overlay track** — After Effects / Final Cut / Resolve titles, or a one-off `/hype-captions` React route screen-recorded for exact typography parity with `/booth-tv`. **Never let Runway render text.**

---

## Shot list — the 9 beats

> **24 fps. 1080p output. 8-generation budget per Runway shot.** If a take isn't there at 8, substitute (slow Ken Burns on the reference still) — never fish past 8.

### Shot 1 — The Threshold *(1.0s, black)*
Pure black hold. Last 0.2s: a faint warm vignette begins to ease up from below (Shot 2's warmth bleeding through). **Post only — no Runway.**

### Shot 2 — The Ten-Person Job *(3.0s — six object cuts at 0.5s each)*
Hard cuts, no transitions. Each cut is a still macro from `refs/job-{1..6}.jpg` with the slightest 1–2% Runway-applied push-in for life. Order, locked:

1. **menu** — an open paper menu, half-folded
2. **register tape** — a printed receipt tail curled on the counter
3. **staff rota** — a paper schedule, names handwritten
4. **phone alerts** — a phone with notification badges (no readable text)
5. **inbox** — close-up of an unread email row (no readable copy)
6. **clipboard** — a scuffed prep clipboard with a list

**Audio (LinkedIn cut):** a soft tick-tick-tick under each cut, like a stopwatch — same gesture as a chef's tasting list ticking off. ≤−14 dB.

### Shot 3 — And You're Doing It All *(3.0s)*

| | |
|---|---|
| Type | **Real photo + Runway img2vid (motion overlay)** |
| Base | `refs/midnight-pov.jpg` — operator-POV at a stainless pass, warm pendant overhead, pile of receipts, single phone with the Pulse glowing |
| Runway role | Image-to-video at **Gen-4**: imperceptibly slow 3% zoom-in, the phone screen pulses once. Otherwise static. |
| Acceptance | No face. No hands holding anything readable. Hospitality warmth (2700–3000 K). |

### Shot 4 — The Pause *(1.0s, total black)*
Pure black. **Total silence on both audio variants.** This is Chesky's second. Don't compress it.

### Shot 5 — The Turn *(3.0s)*

| | |
|---|---|
| Type | **Real photo + Runway img2vid (motion overlay)** |
| Base | `refs/midnight-pov.jpg` (same frame as Shot 3) — but re-graded warmer, the Pulse now visibly glowing brighter |
| Runway role | Image-to-video Gen-4: the Pulse glow blooms (4% brightness lift), camera pushes in 5% over 3s |
| Acceptance | Same composition as Shot 3 so the *return* feels like the same room — but warmer, brighter, alive |

### Shot 6 — While You Slept *(6.0s — three pain→action pairs at 2.0s each)*
Three quick beats, hard cuts. Each pair is two reference stills hard-cut together (pain image → action image), 1.0s + 1.0s. Subtle Runway motion on each.

| Pair | Pain image | Action image |
|---|---|---|
| 6a | empty produce crate, "MISSED" stamp | confirmation card sliding in, "REORDERED" stamp |
| 6b | rain on storefront window + weather-alert reflection | promo card animating out, motion-blur of "sent" |
| 6c | phone inbox macro, single unread row, "(4d)" badge | draft message folding into "sent" envelope, amber accent |

Runway prompts: see `<<NEG_BASE>>` block below; use the same atmosphere prompts from v2 (still valid).

### Shot 7 — One Decision Waiting *(5.0s)* — **REAL CAPTURE**

| | |
|---|---|
| Type | Real capture, animated in post |
| Source | `docs/nra/hype-assets/approve-button-macro.png` (committed @ 3× DPI) |
| Composition | Low-angle lift. Approve macro occupies ~65–70% of frame width, positioned ~55% down. Soft warm pendant-glow gradient hangs above (post-added). Micro restraint-label to the side: `11:47 PM · Fima's` — Instrument Serif italic, cream-100, 1.4 vw. **No margin-dollar overlays.** |
| Move | 0.0–1.5s hold static · 1.5–4.0s subtle warm-light sweep across the button at 5%/s · 4.0–5.0s gentle 3% push-in |
| Sound (LinkedIn cut) | One soft tap chime at t=1.5 — the iPod-click moment. ≤−10 dB. |
| Acceptance | Approve amber matches `--color-accent-500` (#f59e0b ±5). Crisp at 6 ft. Restraint label reads as a *human* moment (a name + a time), not a dashboard data point. |

### Shot 8 — Yours Alone *(3.0s)*

| | |
|---|---|
| Type | **Real photo + typography overlay (no Runway character work)** |
| Base | `refs/yours-alone-wide.jpg` — wide of a warm-lit working kitchen, no people centered, hospitality warmth, slight motion blur in the deep background only |
| Caption | **yours alone.** — Instrument Serif italic, amber-300, 7.5 vw, centered. Held for the full 3 seconds. |
| Sound (LinkedIn cut) | Room tone only. No tap, no swell. |
| Rule | **No mannequins. No suited figures. No split-screen comparison. No competitor parody.** The brand stake is typography. |

### Shot 9 — The Door *(4.5s)* — **REAL ASSET**

| | |
|---|---|
| Type | The existing `/booth-tv` Real-beat lockup, or a dedicated `/booth-endcard` route built in the new tab |
| Move | t=25.5–26.5: lockup appears, C7 line 1 (*Meet your AI Cofounder.*) holds. t=26.5–26.8: micro pause. t=26.8–29.4: C7 line 2 (*You run the place. We do the rest.*) + `BOOTH 8332 · NRA SHOW 2026` mono tag land. t=29.4–30.0: slow fade to black. |
| Acceptance | Identical typography to the booth-TV closer — so the LinkedIn viewer and the booth-floor viewer leave with the same lockup imprinted. |

---

## Master timeline

```
t=0.0   ┃ Shot 1  Threshold (black)            ┃ 1.0s
t=1.0   ┃ Shot 2  Ten-person job (6 cuts)      ┃ 3.0s
        ┃   [C1 'a ten-person job.' fades in 1.3]
t=4.0   ┃ Shot 3  And you're doing it all      ┃ 3.0s
        ┃   [C1 fades · C2 fades in 4.5]
t=7.0   ┃ Shot 4  THE PAUSE (black, silent)    ┃ 1.0s
t=8.0   ┃ Shot 5  The Turn (warmth returns)    ┃ 3.0s
        ┃   [C3 'what if you weren't?' fades in 8.5]
t=11.0  ┃ Shot 6  While you slept (3 pairs)    ┃ 6.0s
        ┃   [C3 fades · C4 'while you slept.' fades in 11.5]
t=17.0  ┃ Shot 7  One Decision Waiting          ┃ 5.0s   REAL CAPTURE
        ┃   [C4 fades · C5 'one decision waiting.' fades in 18.0]
        ┃   [LinkedIn cut: soft tap at 18.5]
t=22.0  ┃ Shot 8  Yours Alone                  ┃ 3.0s
        ┃   [C5 fades at 22.0 · C6 'yours alone.' fades in 22.3]
t=25.0  ┃ Shot 9  The Door                     ┃ 4.5s   REAL ASSET
        ┃   [C7 line 1 fades in 25.5]
        ┃   [C7 line 2 + booth tag fade in 26.8]
t=29.4  ┃   slow fade to black (0.6s)
t=30.0  ┃ END
```

---

## Edit & assembly

**Tool:** any timeline NLE — Final Cut, Premiere, Resolve, CapCut. Hard cuts everywhere except the final 0.6s fade.

**Color grade:**
- LUT: Kodak Vision3 250D feel at ~30% strength
- Crush blacks gently — the threshold and the pause must read as *deep* black
- Match Shot 7's amber to `#f59e0b` reference
- Shots 3 + 5 should share the *exact* warmth (same room, same time, both phases of the Turn)

**Audio — TWO variants from the same edit:**

**Booth-TV variant (silent):**
- No audio track at all. Renders as a silent mp4. The booth TV is in a loud aisle.

**LinkedIn variant (ambient bed + one tap):**
- Room tone bed at −22 dB across the piece (continuous "presence")
- Soft tick-tick-tick under Shot 2's object cuts (≤−14 dB)
- ZERO audio during Shot 4 (the Pause) — silence is the gesture
- ONE soft tap on the Approve frame at t=18.5 (≤−10 dB)
- ZERO music. The brief from the roundtable is explicit: music signals "ad," silence signals "film."

**Reframing for vertical/square (LinkedIn 9:16 + 1:1):**
- Crop centered.
- Shots 3, 5, 7 may need a 4% re-pan to keep the subject central.
- Captions need re-laid out for vertical (single column, larger).

**Export specs:**
- `hype-30s-silent.mp4` — 1920×1080 h.264 CRF 20 faststart, no audio, ≤14 MB → **booth-TV rotation file**
- `hype-30s-linkedin.mp4` — 1920×1080, with LinkedIn audio variant, ≤16 MB → **LinkedIn landscape**
- `hype-30s-9x16.mp4` — 1080×1920, LinkedIn audio → **LinkedIn vertical / Reels / TikTok**
- `hype-30s-1x1.mp4` — 1080×1080, LinkedIn audio → **LinkedIn feed square**
- All in `public/booth/hype/`.

---

## Reference Works — the cinematic-editorial anchors

Whoever generates studies these before prompting. The goal isn't to copy — it's to recognize the *quality of restraint* they share and tune Runway prompts toward it.

| Reference | Why it's the anchor |
|---|---|
| **Airbnb "Belong Anywhere" launch films** (Chesky-era) | Founder-aesthete: hospitality warmth, no characters, the brand emerges from a feeling. |
| **Stripe Press launch films** | Collison restraint: clarity, only what does work, no decoration. |
| **Bottega Veneta silent product films** | Object-as-protagonist. Premium without performance. |
| **Casper / Allbirds early launch films** (Red Antler) | The Heyward brand-stake template — claim a category in one line. |
| **Chef's Table cold opens** | Slow ambient establishment of a real kitchen. Light, water, breath. |
| **Apple Watch product film (2014 launch)** | Object cinema with single companion micro-text labels. Direct template for Shot 7's restraint-text. |
| **"The Bear" pilot — opening minute** | Kitchen ambient *before the chaos.* The quiet warm-light beat. |

**Do / don't shortlist:**

| Do | Don't |
|---|---|
| Real photography graded down | Generated kitchen interiors (Runway's AI tells will show) |
| One object, one moment | Crowded compositions with action everywhere |
| Hospitality warmth (2700–3000 K) | Clinical white, fluorescent green |
| Captions late, large, restrained | Captions over every shot |
| Single sound-design tap | Layered SFX, music beds |
| Deep black thresholds | Mid-grey fades |
| Typography as brand stake ("yours alone") | Mannequin/character comparison frames |

---

## `<<NEG_BASE>>` — paste into every Runway shot

```
deformed hands, extra fingers, six fingers, melting fingers, warped face, wax skin,
plastic skin, AI generated look, smooth motion blur, ghosting, double exposure, low
quality, blurry, jpeg artifacts, watermark, logo, brand name, signage, readable
text, UI mockup, screen UI text, captions, subtitles, neural network, circuit
board, glowing brain, glowing data stream, holographic UI, robot, AI orb,
chatbot avatar, futuristic hologram, cyberpunk, neon, cartoon, illustration,
3D render, video game, anime, cgi look, oversaturated, fluorescent green,
clinical white, harsh shadows, fish-eye distortion,

— competitor mitigation (Zavo) —
mannequin head, faceless figure, mannequin in suit, tuxedo mannequin, suited AI
character, named agent, agent placard, label superimposed "FINANCE AGENT",
choreographed kitchen, conductor-chef, dancing line cooks, hero shot of food
with margin dollar amounts overlaid, restaurant ad with named characters,
Wes Anderson symmetrical kitchen, real chef toque close-up
```

---

## Models, lengths, costs

| | What | Why |
|---|---|---|
| Hero shots (Shot 3, Shot 5) | **Runway Gen-4** if available; otherwise Gen-3 Alpha | Better motion coherence on slow pushes |
| Atmosphere shots (Shot 2 cuts, Shot 6 pairs) | **Runway Gen-3 Alpha Turbo** | Fast, cheap, sub-1s motion is undemanding |
| Reference stills, if generating own | **Runway Frames** | Same model family — consistent look |
| Generation length per shot | **5 seconds**, slice best 1–3s in editing | Coherence degrades past 5s |
| Generations per shot | **8 max** — then substitute (Ken Burns on still) | Hard rule |
| Output resolution from Runway | 1280×768 (Gen-3) / 1408×768 (Gen-4) | Upscale to 1920×1080 in post via Topaz Video AI |
| Frame rate | **24 fps end-to-end** | Cinema feel |
| Total Runway cost | ~$25–40 across ~7 generated shots | Trivial |
| Total generation time | ~70 minutes of clock time | A plane flight |

---

## Production sequence

**Done before flying:**
1. ✅ Approve-button macro committed.
2. ✅ Spec v3 locked — this document.

**Tonight (Lior, ~20 min):**
3. Source the **6 ten-person-job object** stills + **1 midnight-POV** still + **6 pain→action pair** stills + **1 yours-alone wide** = 14 reference frames from Unsplash royalty-free.
4. Commit them all under `docs/nra/hype-assets/refs/` on `tab/nra-booth-content`.

**In transit (~70 min):**
5. Generate the 7 Runway shots (Shot 2 ×6 cuts, Shot 3, Shot 5, Shot 6 ×6 frames, Shot 8 motion). 8 attempts each. Save winners + seeds.

**Day 1 evening (May 16, post-floor, ~90 min):**
6. Assemble the 30s master. Caption track. Color grade. Export both audio variants and all three reframes (landscape silent, landscape LinkedIn, vertical, square).

**Day 2 morning (May 17, ~15 min):**
7. Post to LinkedIn (square or vertical, depending on what the algorithm rewards that morning). Booth address in the caption copy.

**Day 2 onward:**
8. Load `hype-30s-silent.mp4` onto the booth-TV laptop. Add to rotation alongside the 82s `/booth-tv` deck loop (rotation mechanism = `tab/nra-booth-content` deliverable).

---

## File tree after this ships

```
docs/nra/
  hype-video-spec.md              ← this file (v3)
  hype-assets/
    approve-button-macro.png      ← ✅ committed
    refs/
      job-{1..6}.jpg              ← 6 object stills
      midnight-pov.jpg            ← Shot 3 / Shot 5 base
      pair-{1a,1b,2a,2b,3a,3b}.png ← 3 pain→action pairs
      yours-alone-wide.jpg        ← Shot 8 base

public/booth/hype/
  hype-30s-silent.mp4             ← BOOTH-TV master (in rotation)
  hype-30s-linkedin.mp4           ← LinkedIn landscape
  hype-30s-9x16.mp4               ← LinkedIn vertical
  hype-30s-1x1.mp4                ← LinkedIn square
  takes/                          ← winners + Runway seeds
```

---

## What `tab/nra-booth-content` owns from here

This spec hands off cleanly. That tab's brief at `docs/briefs/tab-NRA-Booth-Content.md` references this file. That session executes:

- Sourcing the 14 reference frames (step 3 above)
- The `/booth-endcard` route, if we go that path for Shot 9
- Runway generation passes (if running with `RUNWAY_API_KEY`)
- Final assembly, export, and the booth-TV rotation mechanism
- The Honesty-Beat *depth* piece — separate from this hype — as a parallel deliverable for the booth-TV rotation only (no LinkedIn version)
