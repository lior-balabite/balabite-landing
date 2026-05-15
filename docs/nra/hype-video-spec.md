# Hype Video — production spec (v2, post-Zavo benchmark)

**Built from:** the Trillo / Guidara / Collins / Devlin roundtable + the read on Y
Combinator's Zavo launch video (the visible benchmark in our category).
**For:** NRA Show 2026, Booth 8332 (May 16–19). Three deliverables — one master,
two derivatives. Built in [`tab/nra-booth-content`](../briefs/tab-NRA-Booth-Content.md).

> **What changed from v1:** Zavo's piece is character-driven cinematic ad
> (mannequin "agents" Greg / Theo / Maria, real shoot, agency-tier polish, ~60s).
> We don't match its tier of polish in this timeline — and we shouldn't try.
> The bet is **editorial cinematic** (Bottega Veneta silent films, A24 trailer
> opens, Chef's Table cold opens), not narrative cinematic ad. Quieter, slower,
> POV-driven, no characters. We invert their playbook on purpose; their video
> accidentally makes our slide-4 moat undeniable.
>
> Concrete changes vs v1:
> 1. **60s is now the master**, not 30s. (Format parity with the benchmark; gives
>    room for the *"didn't land"* honesty beat — the one thing Zavo can't match.)
> 2. **Shot 5 specs upgraded** to Frame-4-caliber composition (low angle, warm
>    overhead pendant, hero card, micro-text label).
> 3. **Match + Reveal lean on real photography** plus Runway-overlay motion, not
>    pure Runway generation. Avoids the "AI-generated kitchen" tell.
> 4. **Captions sized up** to display scale (6–7 vw) — confident, not timid.
> 5. **Negative-prompt block** explicitly steers away from Zavo's aesthetic
>    (mannequins, suited agents, margin-dollar UI overlays, choreographed kitchen).
> 6. New **Reference Works** section locks the cinematic-editorial style anchors.

---

## TL;DR (6 lines)

- **60s silent hero, captioned, loopable** is the master deliverable (booth-TV variant). Two derivatives — **30s social cut** and **15s teaser** — cut from it, never re-shot.
- **9 beats:** black → match → fires (×3) → fixes (×3) → decision → **honesty beat** (what worked / still working / didn't land) → reveal → door.
- **5 captions in the 30s, +2 in the 60s extension.** Instrument Serif, 6–7 vw display, amber accents.
- **Runway generates atmosphere only.** Product pixels (the *Approve* button macro) are **real captures**, never generated. Captions are typography overlays in post — never Runway text.
- **Match + Reveal** use real photography (royalty-free) with Runway-applied subtle motion — not pure generation.
- Final mp4s ship at **`public/booth/hype/`**. Source assets at **`docs/nra/hype-assets/`**.

---

## Source assets — what we have, what we still need

| Asset | Status | Path | Notes |
|---|---|---|---|
| **`approve-button-macro.png`** — Pulse decision card @ 3× DPI | ✅ **Committed** to `tab/nra-booth-content` | `docs/nra/hype-assets/approve-button-macro.png` | 1824 × 825, sharp. Use for Shot 5. Trim faint left-edge hairline in post. |
| **Honesty-beat captures** — `/demo` Owns-it screen at high DPI (the *what worked / still working / didn't land* section) | Need | `docs/nra/hype-assets/owns-it-{worked,working,didnt-land}.png` | Same DevTools DPR=3 capture pattern, against `/demo?key=…` on the new tab. Crop tight on each section. |
| **Brand end-card** (palm + balabite wordmark + booth tag, 1920×1080) | Have working version on live `/booth-tv` Real beat | new gated `/booth-endcard` route in the new tab is cleaner | Build `/booth-endcard` as a tiny route in the new tab; capture at 3×. Reusable for future videos. |
| **Reference frames — Match** (phone-on-pass, kitchen-night) | Need | `docs/nra/hype-assets/refs/match-still.{jpg,png}` | **Real photo, not AI.** Annie Spratt (Unsplash) restaurant series, or `unsplash.com/s/photos/restaurant-kitchen-night` royalty-free. |
| **Reference frames — Fires ×3** | Need | `refs/fire-{1,2,3}-*.png` | Stock: empty produce crate, rain-streaked storefront window, phone inbox macro |
| **Reference frames — Fixes ×3** | Need | `refs/fix-{1,2,3}-*.png` | Stock or product capture |
| **Reference frame — Reveal** (wide kitchen with warm hospitality light) | Need | `refs/reveal-still.{jpg,png}` | **Real photo, not AI.** Petr Magera or Edwin Tan (Unsplash). Pick a shot with the right pendant-light warmth. |
| **Music bed** (social cut only — booth TV stays silent) | Need | n/a (license-tracked) | Musicbed / Artlist; *"cinematic ambient minimal, instrumental, ~70 BPM, no drums, sub-1-min"*. **Anything pre-licensed Lior wants to reuse?** |
| **Room-tone audio** (social cut only) | Need | n/a | Freesound.org: *empty restaurant ambient room tone* |

---

## Captions track

| # | Cut | t (s) | On screen | Style |
|---|---|---|---|---|
| C1 | all | 4.5 → 10.0 | *the day isn't done.* | Instrument Serif italic, cream-50, **6.5 vw**, lower-third center |
| C2 | all | 10.5 → 16.0 | *while you slept.* | same; amber-300; slightly above center |
| C3 | 30s + 60s | 17.0 → 22.0 | one decision waiting. | Mono uppercase, **1.6 vw**, letter-spacing 0.24 em, amber-300, beside the Approve button |
| C4 *(60s only)* | 60s | 36.0 → 40.0 | a vendor never tells you their thing failed. | Instrument Serif italic, cream-50, **6 vw**, center |
| C5 *(60s only)* | 60s | 40.5 → 44.0 | *a cofounder does.* | same; amber-300, slightly larger (7 vw) |
| C6 | all | 45.5 → 49.0 *(60s)* · 23.0 → 27.0 *(30s)* | **Your cofounder.** | Instrument Serif italic, cream-50, **7 vw**, center |
| C7 | all | 51.0 → 60.0 *(60s)* · 27.5 → 30.0 *(30s)* | **You run the place. We do the rest.**<br>`BOOTH 8332 · NRA SHOW 2026` | Identical to existing `/booth-tv` Real-beat lockup |

**Caption layer is a separate overlay track** — After Effects / Final Cut / Resolve titles, or a one-off `/hype-captions` React route screen-recorded for exact typography parity with `/booth-tv`. **Never let Runway render text.**

---

## Shot list — the 9 beats of the 60s master

> Every shot generates at **16:9 1080p** (or upscaled to 1080p via Topaz Video AI).
> **24 fps end-to-end.** **8-generation budget per shot, hard.** If the take
> isn't there at 8, substitute (slow Ken Burns on the reference still) — don't
> fish past 8.

### Shot 1 — Threshold *(1.5s, black)*
Pure black hold with a faint warm vignette easing up from below frame in the last 0.3s (the warmth of Shot 2 bleeding through). **Built in post, not in Runway.**

### Shot 2 — The Match *(2.5s)*

| | |
|---|---|
| Type | **Real photo + Runway img2vid (motion overlay only)** |
| Base image | `refs/match-still.jpg` — real photograph of a phone on a stainless-steel restaurant pass at night, kitchen out of focus behind. **Source from Unsplash.** Grade in post to match palette (warm amber lift, deep blacks). |
| Runway role | Take the graded still through Runway's image-to-video at **Gen-4** with a *very slow zoom-in (5% over 2.5s)* + a subtle screen-glow pulse. Use it for motion only — keep the underlying photograph readable. |
| Camera | Very slow zoom-in |
| Acceptance | Phone screen MUST NOT have legible text. Lamp glow warm (3000K-ish), never blue. No human in frame. |

**Runway motion prompt:**
```
Subtle living motion only: very slow zoom-in by 5%, gentle screen-glow pulse
once, faint condensation breath in the air. Keep all other elements still.
```
**Negative:** `<<NEG_BASE>>`

### Shot 3 — Fires ×3 *(2.0s each, 6.0s total)*

Three quick beats, identical pacing, hard cuts between them.

**3a — the bok-choy that didn't show**

| | |
|---|---|
| Type | Runway img2vid (Gen-3 Alpha Turbo) |
| Reference | `refs/fire-1-bok-choy.png` — empty produce crate on a walk-in shelf, packing-slip clipped, paper marked "MISSED" |
| Camera | Static, micro-handheld shake |
| Prompt | `Empty wood-fiber produce crate on a stainless walk-in shelf, packing slip clipped to the side stamped MISSED, soft fluorescent walk-in light, faint condensation breath visible in the cold air. Static camera with a barely-perceptible handheld micro-shake. Documentary, melancholy.` |

**3b — the hurricane Wednesday**

| | |
|---|---|
| Reference | `refs/fire-2-hurricane.png` — phone weather-alert reflected on a rain-streaked storefront window, warm interior glowing behind |
| Camera | Slow horizontal pan-right, 4 px/s |
| Prompt | `Rain-streaked restaurant storefront window at dusk; warm interior glows behind it; in the foreground a phone screen with a weather alert reflects in the glass; thick wind-driven rain. Slow horizontal pan right.` |

**3c — the catering DM sitting since Monday**

| | |
|---|---|
| Reference | `refs/fire-3-inbox.png` — macro of a phone inbox row, a single unread message highlighted, badge `(4d)` |
| Camera | Very slow tilt-down |
| Prompt | `Macro-close-up of a phone inbox row, a single unread message highlighted in a soft accent color, a small unread badge. Very slow vertical tilt-down. Shallow DOF, dark UI.` |

### Shot 4 — Fixes ×3 *(2.0s each, 6.0s total)*

Same cadence as Fires, hard cuts, **matched against their fires** (3a→4a, etc.).

**4a — reordered before Friday**
- Reference: confirmation card sliding into view, "REORDERED" stamp, bok-choy crate now full behind
- Prompt: `A clean confirmation card sliding gently into view over a warmly lit walk-in shelf; a faint REORDERED stamp; the previously empty crate now full. Subtle warm light, optimistic but restrained. Slight push-in.`

**4b — promo pushed before the storm**
- Reference: phone showing a promo card sending out, rain still at the edge
- Prompt: `Macro on a phone screen, a promo card animating outward with a soft motion blur suggesting it's been sent; warm storefront light at the right edge of frame; rain still faintly visible. Slow slide-left.`

**4c — quote drafted, date held**
- Reference: draft email-quote card folding into a "sent" envelope, soft amber accent
- Prompt: `A draft message card softly folding away into a "sent" envelope graphic with a small amber accent; dark UI, very shallow DOF; subtle parallax movement. Cinematic, restrained.`

### Shot 5 — The Decision *(6.0s)* — **REAL CAPTURE, NOT GENERATED**

This is the most expensive frame in the video and the one Zavo's video frames sideways. Match Frame-4's composition philosophy — low angle, hero asset, single companion data element, deep blacks, warm light from above.

| | |
|---|---|
| Type | **Real capture** — `docs/nra/hype-assets/approve-button-macro.png` ✅ committed |
| Composition | **Low-angle lift.** The Approve-button macro sits as the visual hero, occupying ~65–70% of frame width, positioned ~55% down. A single soft warm pendant-glow gradient hangs above (added in post, mimicking Frame-4's overhead pendant). A small micro-text card to the side reads: `11:47 PM · Fima's` — Instrument Serif italic, cream-100, 1.4 vw. *No* margin-dollar overlays (Zavo's Frame-4 owns that exact visual; we explicitly steer away). |
| Move | 0.0–1.5s static hold · 1.5–4.0s **subtle warm-light sweep** across the button at 5%/s (rotating gradient in post) · 4.0–6.0s gentle 3% push-in |
| Audio (social cut only) | Single soft tap/chime at t=1.5 (sound design); keep ≤ −10 dB |
| Acceptance | Amber matches `--color-accent-500` (#f59e0b ±5). Pixel-sharp at 6 ft. The micro-text label `Fima's` reads as a *restraint signal* — we name the restaurant by first-name, not a price/margin. |

**Why this isn't Runway:** Runway cannot reliably reproduce specific brand UI. Animating the real asset in post is faster, sharper, and on-brand. Period.

### Shot 6 — Honesty Beat *(22.0s, 60s cut only)* — **REAL CAPTURES**

The single thing in this video Zavo's piece cannot match. Their video brags *"400+ businesses."* Ours shows the experiment that *failed and got reverted*. This is the moat moment.

The full beat is screen-recording-style on `/demo`'s Owns-it step (or the `pulse-record` PNG/component), graded down to the booth palette, with captions appearing in rhythm.

**6a — What worked *(4.0s, t=22.0–26.0)***
- Source: real capture from `docs/nra/hype-assets/owns-it-worked.png` — *"Customer retention up 34% → 41%. Food cost on 4 flagged items down from 48% to 31%."*
- Motion: slow scroll-up across the section, 1.2× speed of natural reading
- Caption: none (let the screen speak)

**6b — Still working on *(4.0s, t=26.0–30.0)***
- Source: `owns-it-working.png` — *"Server performance gap narrowing. Cost data: 14 of 29 items entered."*
- Motion: continue the scroll, no acceleration
- Caption: none

**6c — Didn't land *(6.0s, t=30.0–36.0)***
- Source: `owns-it-didnt-land.png` — *"Happy hour pricing experiment. Orders up 20% but revenue per order dropped 35%. Net negative. Reverted."*
- Motion: scroll slows by half; gentle vignette darkens around the *"reverted"* line
- Caption: none yet — the screen says it

**6d — The line *(8.0s, t=36.0–44.0)***
- Source: black, then white type, then black
- Captions land in succession:
  - C4 *(36.0–40.0)*: *a vendor never tells you their thing failed.*
  - C5 *(40.5–44.0)*: ***a cofounder does.***
- Audio (social cut): a single low piano note enters on C5

### Shot 7 — The Reveal *(5.0s)*

| | |
|---|---|
| Type | **Real photo + Runway img2vid (motion overlay)** |
| Base | `refs/reveal-still.jpg` — wide of a phone on a stainless pass, kitchen alive in warm hospitality light, a server's shoulder at the edge of frame. **Real photo.** Annie Spratt / Petr Magera Unsplash. |
| Runway role | Image-to-video: slow dolly-out, 8% over 5s, add ambient steam motion in the kitchen background |
| Camera | Slow pull-back |
| Acceptance | Faces never in close-up. Hands holding plates partially visible at frame edge only. No fluorescent / clinical light. |

### Shot 8 — The Door *(11.0s in 60s cut · 3.0s in 30s cut)* — **REAL ASSET**

| | |
|---|---|
| Type | Existing `/booth-tv` Real-beat lockup, or a dedicated `/booth-endcard` route built in the new tab. |
| Move (60s cut) | t=49.0–55.5: hold the lockup (palm + balabite wordmark). Palm has the existing `.nra-palm-sway` 7s sway. C6 *(Your cofounder.)* fades in at t=45.5 and rides into this beat. t=55.5–60.0: C7 (*You run the place. We do the rest.* + `BOOTH 8332 · NRA SHOW 2026`) lands as the door closes. Slow fade-to-black at t=59.4. |
| Move (30s cut) | Same lockup, compressed to 3.0s. C7 lands at t=27.5. |

---

## Master timeline (60s)

```
t=0.0   ┃ Shot 1  Threshold (black)             ┃ 1.5s
t=1.5   ┃ Shot 2  The Match                      ┃ 2.5s   amber glow begins
t=4.0   ┃ Shot 3a Fire — bok choy                ┃ 2.0s
        ┃   [C1 fades in t=4.5]
t=6.0   ┃ Shot 3b Fire — hurricane               ┃ 2.0s
t=8.0   ┃ Shot 3c Fire — inbox                   ┃ 2.0s
t=10.0  ┃ Shot 4a Fix — reorder                  ┃ 2.0s
        ┃   [C1 fades out · C2 fades in t=10.5]
t=12.0  ┃ Shot 4b Fix — promo                    ┃ 2.0s
t=14.0  ┃ Shot 4c Fix — quote                    ┃ 2.0s
t=16.0  ┃ Shot 5  Decision (Approve macro)        ┃ 6.0s   REAL
        ┃   [C2 fades out · C3 fades in t=17.0]
t=22.0  ┃ Shot 6a Honesty — what worked          ┃ 4.0s   REAL
        ┃   [C3 fades out at 22.0]
t=26.0  ┃ Shot 6b Honesty — still working        ┃ 4.0s   REAL
t=30.0  ┃ Shot 6c Honesty — didn't land           ┃ 6.0s   REAL
t=36.0  ┃ Shot 6d The line                       ┃ 8.0s
        ┃   [C4 fades in t=36.0]
        ┃   [C5 fades in t=40.5]
t=44.0  ┃ Shot 7  Reveal (slow dolly-out)        ┃ 5.0s
        ┃   [C5 fades out · C6 fades in t=45.5]
t=49.0  ┃ Shot 8  Door + lockup hold              ┃ 11.0s  REAL
        ┃   [C7 + booth tag fade in t=51.0]
t=59.4  ┃   slow fade-to-black (0.6s)
t=60.0  ┃ END
```

---

## The two cut-downs (derived from the 60s master — never re-shot)

### 30s social cut (LinkedIn landscape · IG square)
The 60s master with the **Honesty Beat removed** and the **Reveal/Door tightened**.

```
0.0   Threshold (black)                  1.5s
1.5   Match                              2.5s
4.0   Fires ×3                           6.0s
10.0  Fixes ×3                           6.0s
16.0  Decision                           6.0s
22.0  Reveal                             5.0s
27.0  Door + tagline                     3.0s
                                       ─────
                                       30.0s
```
- Captions C1 · C2 · C3 · C6 · C7 (no C4/C5).
- **Audio:** music bed −12 dB, room tone −22 dB, single tap on Shot 5.
- Export at 1920×1080 and 1080×1080.

### 15s teaser (LinkedIn vertical · TikTok · Reels)
The compressed *fires → fixes → brand* version.

```
0.0   Fires ×3                           6.0s
6.0   Fixes ×3                           6.0s
12.0  End-card: "Your AI Cofounder."     3.0s
      + booth tag
                                       ─────
                                       15.0s
```
- Caption C1 enters t=0.5; C2 enters t=6.5.
- Export at 1080×1920. **First-touch piece** — drives traffic to `/booth-8332`.

---

## Edit & assembly

**Tool:** any timeline NLE (Final Cut / Premiere / Resolve / CapCut). Hard cuts everywhere except the final 0.6s fade.

**Color grade:**
- LUT: Kodak Vision3 250D feel at ~30% strength
- Crush blacks gently — Devlin's threshold needs *deep* black on Shot 1
- Match Shot 5's amber to `#f59e0b` reference

**Audio (social + teaser only — booth-TV cut is silent):**
- Music bed at −12 dB
- Room-tone bed at −22 dB across the piece
- Sound design taps at t=17.5 (decision lands) and t=40.5 (C5 — *a cofounder does*) — both ≤ −10 dB
- No drums anywhere

**Reframing:** crop centered for 9:16 + 1:1; Shots 2, 5, 7 may need a 5% re-pan to keep the subject central.

**Export specs:**
- `hype-60s.mp4` — 1920×1080 h.264 CRF 20 faststart ≤ 28 MB *(booth-TV master)*
- `hype-30s-1920.mp4` — 1920×1080 ≤ 14 MB
- `hype-30s-1x1.mp4` — 1080×1080 ≤ 12 MB
- `hype-15s-9x16.mp4` — 1080×1920 ≤ 8 MB
- All in `public/booth/hype/`.

---

## Reference Works — the cinematic-editorial style anchors

The operator generating Runway shots **studies these for tone before they prompt anything.** The goal isn't to copy them — it's to recognize the *quality of restraint* they share and tune Runway prompts toward it.

| Reference | Why it's the anchor |
|---|---|
| **Bottega Veneta — silent product films (2018–2024)** (e.g., *Salon 02* film, leather-bag close-ups) | The "object as protagonist, no narration, no music" template. Premium restraint without a single character. |
| **Chef's Table — cold opens (Netflix, dirs. David Gelb)** | Slow ambient establishment of a real kitchen — light, water, breath. Specifically the cold opens, not the chef-monologue body. |
| **A24 trailer openings** — *Past Lives*, *Aftersun*, *Mass* | Quiet first 10–20 seconds, captions over visual, no music at first. The opposite of a typical promo. |
| **Apple Watch product film** (2014 launch) | Object cinema with single companion micro-text labels. Direct template for Shot 5's restraint-text. |
| **Soderbergh openings** — *Contagion*, *No Sudden Move* | Hard cuts, observational POV, real lens grain, no overscoring. The cutting rhythm we want for Fires/Fixes. |
| **"The Bear" pilot — opening minute** (2022, FX, dir. Christopher Storer) | Kitchen ambient *before the chaos* — the quiet warm-light beat. **Specifically the first 60 seconds**, not the kitchen-rush sequences. |

**Aesthetic do/don't shortlist:**

| Do | Don't |
|---|---|
| Real photography graded down | Generated kitchen interiors (Runway will hallucinate AI tells) |
| One object, one moment | Crowded compositions with action everywhere |
| Hospitality warmth (2700–3000 K) | Clinical white, fluorescent green |
| Captions late, restrained | Captions over every shot |
| Single sound-design tap | Layered SFX |
| Deep black thresholds | Mid-grey fades |

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
| Hero shots (Match, Reveal) | **Runway Gen-4** if available; otherwise Gen-3 Alpha | Better motion coherence on slow camera moves |
| Atmosphere shots (Fires, Fixes) | **Runway Gen-3 Alpha Turbo** | Faster, cheaper, 2 s clips don't need top-tier fidelity |
| Reference stills you need to generate | **Runway Frames** | Same look as the video model |
| Generation length per shot | **5 seconds**, slice best 2.0–2.5 s in editing | Runway coherence degrades past 5 s |
| Generations per shot | **8 max**, then substitute (Ken Burns on the still) | Spec rule |
| Runway output res | 1280×768 (Gen-3) / 1408×768 (Gen-4) | Upscale to 1920×1080 in post via Topaz Video AI |
| Frame rate | **24 fps end-to-end** | Cinema feel; 30 fps reads as social-video |
| Total Runway cost | ~$30–50 across 8 shots × 8 generations | Trivial |
| Total generation time | ~90 minutes of clock time | A plane flight |

---

## Production sequence

**Done before flying:**
1. ✅ Asset committed — `docs/nra/hype-assets/approve-button-macro.png` is in `tab/nra-booth-content`.
2. ✅ Spec v2 locked — this doc.

**Tonight (Lior, before flying — ~30 min total):**
3. Capture the Honesty-beat sources (`/demo?key=...` Owns-it screen, DPR=3) → `docs/nra/hype-assets/owns-it-{worked,working,didnt-land}.png`. Same DevTools workflow as the Approve macro.
4. Source the **6 Fires/Fixes** + **Match** + **Reveal** reference frames from Unsplash royalty-free (1920×1080) → `docs/nra/hype-assets/refs/`.
5. (Optional but recommended) license one music track from Musicbed/Artlist for the social cut.

**In transit (plane / hotel, ~90 min):**
6. Generate Shots 2, 3a-c, 4a-c, 7. 8 attempts each. Save winners + seeds.

**Day 1 evening (May 16, post-floor — ~2 h):**
7. Assemble the 60s hero. Drop captions track. Color grade. Export `hype-60s.mp4` (1920×1080) + `hype-30s-1920.mp4` (derived).

**Day 2 morning (May 17 — ~30 min):**
8. Cut the 15s teaser from the 60s. Add music bed. Export `hype-15s-9x16.mp4`.
9. Post the 15s teaser on LinkedIn + email + iMessage from your booth contacts. Booth address in the copy.

**Day 2 evening:**
10. Load `hype-60s.mp4` onto the booth-TV laptop. Add to rotation alongside the existing `/booth-tv` deck loop (rotation mechanism = deliverable of `tab/nra-booth-content`).

---

## What `tab/nra-booth-content` owns

This spec hands off cleanly to that tab. The new tab's brief at
`docs/briefs/tab-NRA-Booth-Content.md` references this file directly. That
session executes:

- Honesty-beat captures (step 3 above)
- Reference-frame sourcing (step 4)
- The `/booth-endcard` route (optional clean-asset route)
- The Runway generation passes (if running with `RUNWAY_API_KEY`)
- Final assembly, export, and the booth-TV rotation mechanism

---

## File tree after this ships

```
docs/nra/
  hype-video-spec.md              ← this file (v2)
  hype-assets/
    approve-button-macro.png      ← ✅ committed (1824×825)
    owns-it-worked.png
    owns-it-working.png
    owns-it-didnt-land.png
    brand-endcard.png             ← optional, from /booth-endcard route
    refs/
      match-still.jpg
      fire-{1,2,3}-*.png
      fix-{1,2,3}-*.png
      reveal-still.jpg

public/booth/hype/
  hype-60s.mp4                    ← master (booth TV)
  hype-30s-1920.mp4               ← social landscape
  hype-30s-1x1.mp4                ← social square
  hype-15s-9x16.mp4               ← teaser vertical
  takes/                          ← winners + seeds
    shot-2-match.mp4
    shot-3a-bok-choy.mp4
    …
```
