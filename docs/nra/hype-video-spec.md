# Hype Video — production spec

**Built from:** the roundtable resolution (Trillo / Guidara / Collins / Devlin).
**For:** NRA Show 2026, Booth 8332 (May 16–19). Three roles in one piece:
booth-TV variant (rotates with the 82s deck loop), a 15s LinkedIn teaser
(seeds the booth), and a 60s "stopped here" extension. Built in
[`tab/nra-booth-content`](../briefs/tab-NRA-Booth-Content.md).

> **Anti-loop rule for this doc:** the *story* is locked here (7 beats, 5 captions,
> palette, source rules). Every Runway iteration is a *take* on a locked beat —
> never a re-design. If a take fails after 8 generations, *substitute, don't rewrite.*

---

## TL;DR (6 lines)

- **30-second silent hero, captioned, loopable.** 1080p; 16:9 landscape master, reframed to 9:16 + 1:1.
- **7 beats:** black → match → fires (×3) → fixes (×3) → decision → reveal → door.
- **5 captions:** Instrument Serif (matches `/booth-tv`), amber accents, late-rising in-frame timing.
- **Runway generates atmosphere only.** Product pixels (the *Approve* button macro) are **real captures**, not generated. Captions are typography overlays in post — never Runway text.
- **Two cut-downs derive from the hero** — never shot separately.
- **Hero deliverable lives at:** `public/booth/hype/hype-30s.mp4`. Reframes alongside it. Final mp4 ships ≤14 MB at 1080p so the booth laptop and phone can carry it as offline fallback.

---

## Source assets — what we need before generation begins

| Asset | Status | Where it comes from | Action |
|---|---|---|---|
| **`approve-button-macro.png`** — sharp render of the Pulse decision card's amber `Approve` button + the "Reprice Teriyaki" headline above it | Missing in this repo at hero resolution | `balabiteaidev-git-feature-boh-suite-bala-bite-dev.vercel.app` → pulse-preview page → screenshot at `deviceScaleFactor: 3` from the *Approve* button region, ~1800px wide | **Capture tonight before flying.** Save to `public/booth/hype/approve-button-macro.png`. If the preview is gated, get access from the product team or rebuild the button as a React component (content locked to the current `pulse-hero.png`) and screenshot at 3×. |
| **`brand-endcard.png`** — palm + balabite wordmark + booth tag, 1920×1080 | Have the structure on the live `/booth-tv` Real beat (verified screenshot already in `docs/nra/proof/booth-tv-6-real.png`) | Either screenshot a clean version from `/booth-tv?key=…` mid-Real-beat with all surrounding scene faded out, OR render a dedicated `/booth-endcard` route in the booth-content tab and capture there | Recommend: build `/booth-endcard` as a tiny gated route in the new tab — gives a pristine asset and is reusable for future videos. |
| **3 "fires" reference frames** (input images for img2vid) | Stock | Unsplash, royalty-free, no people: search `bok choy supplier crate`, `hurricane warning window rain`, `unread email inbox close-up phone`. Pick one each. | Save 1920×1080 versions to `public/booth/hype/refs/`. |
| **3 "fixes" reference frames** | Mostly mocked | One real-product capture (a notification card from the product preview if available) + 2 stock (`receipt printer paper close-up`, `email draft sent confirmation`) | Same folder. |
| **Ambient kitchen-late-night reference** | Stock | Unsplash: `restaurant kitchen night empty`, `stainless steel pass low light` | One frame for the Match shot's img2vid seed. |
| **Music bed (LinkedIn cut only)** | Source | Artlist / Musicbed: search `cinematic ambient minimal restaurant`. **Booth TV plays silent.** | Pick one ≤1 min track; bake into the LinkedIn cut only. |
| **Room-tone audio (LinkedIn cut)** | Source | Freesound.org: `empty restaurant ambient room tone` | Layer −18 dB under the music. |

---

## Captions track

| # | t (s) | On screen | Style |
|---|---|---|---|
| C1 | 4.5 → 10.0 | *the day isn't done.* | Instrument Serif italic, cream-50, 4 vw, lower-third center |
| C2 | 10.5 → 16.0 | *while you slept.* | Same as C1, amber-300, slightly above center |
| C3 | 17.0 → 22.0 | *one decision waiting.* | Mono uppercase, 1.4 vw, letter-spacing 0.22 em, amber-300, beside the Approve button |
| C4 | 23.0 → 27.0 | **Your cofounder.** | Instrument Serif italic, cream-50, 5 vw, center |
| C5 | 27.5 → 30.0 | **You run the place. We do the rest.** + `BOOTH 8332 · NRA SHOW 2026` | Same as the existing `/booth-tv` Real beat lockup |

**Caption layer is built as a separate overlay track** (After Effects / Final Cut / Resolve titles, or a one-off `/hype-captions` React route screen-recorded for ✨ exact ✨ typography match with the booth TV). Never let Runway render text — it cannot.

---

## Shot list (the 7 beats)

> Every shot generates **16:9 1080p**. Reframes (9:16, 1:1) are cropped in post.
> **Camera move language:** uses Runway Gen-3 Camera Control vocabulary (zoom, push-in, pan, tilt) — keep moves slow and short, ≤2s of travel.
> **Iteration budget:** 8 generations per shot, max. If the take isn't there at 8, **substitute** the shot with a slower static of the reference frame (Ken Burns push-in in post) — don't burn time fishing.

### Shot 1 — Threshold *(1.5s, black)*
Just a hold on black with a faint warm vignette. **Built in post, not in Runway.** Use a 0×0 black solid; for the last 0.3s of the hold, ease a soft amber radial-gradient up from below frame (the warmth of the Match shot bleeding through). No generation needed.

### Shot 2 — The Match *(2.5s)*

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `public/booth/hype/refs/match-still.png` — phone on stainless steel pass, screen waking, kitchen out of focus behind, lights off except a single overhead heat lamp |
| Camera | Very slow zoom-in, 5% over 2.5s |
| Acceptance | Phone screen must NOT have legible text. Lamp glow must be warm (3000K-ish), not blue. No human in frame. |

**Prompt:**
```
A smartphone resting on a brushed stainless-steel restaurant pass at 11:47 pm,
the screen softly waking with a single warm amber glow. The kitchen beyond is
out of focus, dark, with one overhead heat lamp casting a small warm pool of
light on the back wall. Slow, almost imperceptible push-in. Anamorphic look,
shallow depth of field, film grain, hospitality cinematography.
```
**Negative:** `<<NEG_BASE>>, no people, no hands, no face, no readable text on screen, no UI text, harsh fluorescent light, daylight, blue cool tone, plastic, cartoon`

### Shot 3 — Fires ×3 *(2.0s each, 6.0s total)*

Three quick beats, **identical pacing**, hard cuts between them. Each is its own generation.

**3a — the bok choy that didn't show**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fire-1-bok-choy.png` — an empty produce crate, the slot where a bok-choy delivery should have been, paper packing slip dangling, walk-in shelf around it |
| Camera | Static, slight handheld micro-shake |
| Prompt | `An empty wood-fiber produce crate on a stainless walk-in shelf, the packing slip clipped to its side stamped "MISSED", soft fluorescent walk-in light, faint condensation breath in the air. Static camera with a barely-perceptible handheld micro-shake. Cinematic, melancholy, documentary.` |
| Negative | `<<NEG_BASE>>, full crate, lush vegetables, vibrant green, anything implying success, people, hands` |

**3b — the hurricane Wednesday**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fire-2-hurricane.png` — a phone weather-alert screen reflected on a rain-streaked storefront window, restaurant interior glowing warmly behind |
| Camera | Slow pan-right, 4 px/s |
| Prompt | `A rain-streaked restaurant storefront window at dusk; the warm interior glows behind it; in the foreground a phone screen with a weather alert reflects in the glass; thick wind-driven rain. Slow horizontal pan right.` |
| Negative | `<<NEG_BASE>>, readable text on phone, lightning, dramatic storm, screaming, sunny, blue sky` |

**3c — the catering DM sitting since Monday**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fire-3-inbox.png` — extreme close-up of a phone inbox row, an unread message highlight (no readable copy), badge "(4d)" |
| Camera | Very slow tilt-down, framing the row from top-of-thread to bottom |
| Prompt | `Macro-close-up of a phone inbox row, a single unread message highlighted in a soft accent color, a small badge marker. Very slow vertical tilt-down. Cinematic, shallow DOF, dark UI.` |
| Negative | `<<NEG_BASE>>, legible body text, sender names, email content, finger, hand, glare` |

### Shot 4 — Fixes ×3 *(2.0s each, 6.0s total)*

Same cadence as Fires, hard cuts, matched against their fires (3a→4a, etc.). The contrast is the point.

**4a — reordered before Friday's delivery**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fix-1-reorder.png` — a confirmation card sliding into view, "REORDERED" stamp, bok-choy crate now full in background |
| Camera | Slight push-in |
| Prompt | `A clean confirmation card sliding gently into view over a warmly lit walk-in shelf in the background; a faint "REORDERED" stamp; the previously empty crate now full. Subtle warm light, optimistic but restrained. Slight push-in.` |
| Negative | `<<NEG_BASE>>, legible body text, brand logos, faces, hands, harsh ui` |

**4b — promo pushed before the storm killed dine-in**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fix-2-promo.png` — a phone showing a generic promo card sending out, weather-rain still visible at edge of frame |
| Camera | Slow horizontal slide-left as the card finishes sending |
| Prompt | `Macro on a phone screen showing a promo card animating outward with a soft motion blur, suggesting it's been sent; warm storefront light at the right edge of frame; rain still visible faintly. Slow slide-left.` |
| Negative | `<<NEG_BASE>>, legible promo text, prices, brand names, hands, faces` |

**4c — quote drafted, date held**

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/fix-3-quote.png` — a draft email-quote card folding away into a "sent" envelope, soft amber accent |
| Camera | Static, subtle parallax |
| Prompt | `A draft message card softly folding away into a "sent" envelope graphic with a small amber accent; dark UI, very shallow DOF; subtle parallax movement. Cinematic, restrained.` |
| Negative | `<<NEG_BASE>>, legible body text, brand logos, currency symbols, hands, faces` |

### Shot 5 — The Decision *(6.0s) — REAL CAPTURE, NOT GENERATED**

| | |
|---|---|
| Type | Real capture (from `approve-button-macro.png`), animated in post |
| Source | `public/booth/hype/approve-button-macro.png` — see "Source assets" above |
| Move | 0.0–1.5s hold static, 1.5–4.0s **subtle warm-light sweep** across the button (in post; rotating gradient at 5%/s), 4.0–6.0s gentle push-in of 3% |
| Audio (LinkedIn cut only) | A single soft tap/chime at t=1.5 (sound design — keep restrained) |
| Acceptance | The amber `Approve` color matches `--color-accent-500` (#f59e0b ±5). Pixel-sharp from 6 ft. |

**Why this isn't Runway:** Runway cannot reliably reproduce a specific brand UI element. Animating the real asset in post is faster, sharper, and on-brand.

### Shot 6 — The Reveal *(5.0s)*

| | |
|---|---|
| Type | Runway img2vid |
| Reference frame | `refs/reveal-still.png` — wide of the phone on the pass, kitchen now alive in warm light, a server's shoulder picking up a plate at the edge of frame |
| Camera | Slow pull-back / dolly-out, 8% over 5s |
| Prompt | `Wide shot of a smartphone on a brushed stainless-steel pass, kitchen alive in warm hospitality light behind, a server's shoulder at the edge of frame lifting a plate. The phone screen still has the same soft amber glow. Slow dolly-out, anamorphic, hospitality cinematography, film grain.` |
| Negative | `<<NEG_BASE>>, faces in close-up, hands holding plates clearly visible, harsh fluorescent, clinical, bright, blue tone, daylight` |

### Shot 7 — The Door *(3.0s) — REAL CAPTURE**

| | |
|---|---|
| Type | Real capture / brand graphic (the existing `/booth-tv` Real-beat lockup, or a new `/booth-endcard` route) |
| Move | Hold static; the palm leaf has the existing 7s sway loop (already in the codebase, class `.nra-palm-sway`). At t=29.0, a slow 0.6s fade-to-black |
| Acceptance | Palm + balabite wordmark + `BOOTH 8332 · NRA SHOW 2026` tag — identical to the booth-TV closer |

---

## Edit & assembly

**Tool:** any timeline NLE — Final Cut, Premiere, Resolve, CapCut. Cuts are hard except the final 0.6s fade.

**Timeline (master = 16:9 1080p, 24 fps):**

```
t=0.0  ┃ Shot 1 (black hold)            ┃ 1.5s
t=1.5  ┃ Shot 2 (the match)              ┃ 2.5s  ← amber glow begins
t=4.0  ┃ Shot 3a (fire — bok choy)       ┃ 2.0s
       ┃   [C1 caption fades in t=4.5]
t=6.0  ┃ Shot 3b (fire — hurricane)      ┃ 2.0s
t=8.0  ┃ Shot 3c (fire — inbox)          ┃ 2.0s
t=10.0 ┃ Shot 4a (fix — reorder)         ┃ 2.0s
       ┃   [C1 fades, C2 fades in t=10.5]
t=12.0 ┃ Shot 4b (fix — promo)           ┃ 2.0s
t=14.0 ┃ Shot 4c (fix — quote)           ┃ 2.0s
t=16.0 ┃ Shot 5 (Approve button macro)   ┃ 6.0s
       ┃   [C2 fades, C3 fades in t=17.0]
t=22.0 ┃ Shot 6 (reveal pull-back)       ┃ 5.0s
       ┃   [C3 fades, C4 fades in t=23.0]
t=27.0 ┃ Shot 7 (the door / end-card)    ┃ 3.0s
       ┃   [C4 fades, C5 fades in t=27.5]
t=29.4 ┃   slow fade-to-black 0.6s
t=30.0 ┃ END
```

**Color grade (post):**
- Lift the warm midtones (LUT: a soft "Kodak Vision3 250D" feel, ~30% strength).
- Crush blacks gently — Devlin's threshold requires *deep* black on Shot 1.
- Match Shot 5's amber to `#f59e0b` reference.

**Audio (LinkedIn / 9:16 / 1:1 cuts only):**
- Music bed at −12 dB.
- Room-tone layer at −22 dB across the full piece for "presence."
- Single sound-design tap at Shot 5 t=17.5 (the decision lands) — keep ≤−10 dB.
- **Booth-TV cut: silent — no audio track at all.**

**Reframing:**
- **9:16 (LinkedIn / TikTok / IG Reels):** crop centered; Shots 2, 5, 6 may need a 5% re-pan to keep the subject centered.
- **1:1 (LinkedIn feed):** crop centered; Shot 5 may need to re-bias toward the Approve button.

**Export:**
- `hype-30s.mp4` — 1920×1080 h.264, CRF 20, faststart, ≤14 MB
- `hype-30s-9x16.mp4` — 1080×1920
- `hype-30s-1x1.mp4` — 1080×1080
- All in `public/booth/hype/`.

---

## The two cut-downs (derived from the hero — do not re-shoot)

### 15s LinkedIn teaser
Fires + Fixes only. **No threshold, no match, no decision, no reveal, no door.**
- t=0 Shot 3a — 3b — 3c (6s, captions: C1 from t=0.5)
- t=6 Shot 4a — 4b — 4c (6s, caption: C2 from t=6.5)
- t=12 quick end-card: `Your AI Cofounder.` + booth tag (3s)
- Audio: music bed only, gentle fade-out.
- Export at 9:16 1080×1920. **Send to LinkedIn day-2 morning.**

### 60s "stopped here" cut
The hero + extends Shot 6 with **the "didn't land" honesty beat** (the happy-hour reverted line from `/demo`).
- Insert between hero t=22 and t=27 (the reveal) a 30s passage:
  - 30s of *This Week's Record*-style content (real product capture from the preview, scrolling vertically slow) with captions:
    - *"customer retention up to 41%."*
    - *"food cost down to 31%."*
    - *"happy-hour pricing experiment — reverted."*
    - **"A vendor never tells you their thing failed."**
    - *"A cofounder does."*
- Then resume the hero's Door beat.
- Audio: music bed continues, a single low note on "A cofounder does."
- For: prospects who stop and want more.

---

## Production sequence — what to do, in order

**Tonight (May 15, before you fly):**
1. Capture `approve-button-macro.png` from `balabiteaidev-...` pulse-preview at 3× DPI. Save to `public/booth/hype/approve-button-macro.png` on `tab/nra-booth-content`.
2. Capture or generate the 6 fires/fixes reference stills. Save to `refs/`.
3. Get Runway access ready on the device you'll generate from (web app on the laptop, or the iOS app).
4. Commit the captured/source frames to `tab/nra-booth-content`.

**On the plane / in the hotel tonight:**
5. Generate Shots 2, 3a, 3b, 3c, 4a, 4b, 4c, 6. 8-generation budget each. Pick the best take per shot — *write down the seed*. Save selected takes as `shot-<id>.mp4`.

**Day 1 evening (May 16, post-floor):**
6. Assembly pass 1 of the 30s hero. Drop captions track. Color grade. Export `hype-30s.mp4`.
7. **Stop.** Sleep on it. Don't post yet.

**Day 2 morning (May 17):**
8. Sanity-check the hero. Reframe to 9:16. Cut the 15s LinkedIn teaser from the hero. Add music bed. Export.
9. Post the 15s teaser on LinkedIn from `@balabite.ai` with the booth address + a single sentence.

**Day 2 evening:** load `hype-30s.mp4` onto the booth-TV laptop. Add to the rotation alongside the existing `/booth-tv` loop. (How the rotation works is in `tab/nra-booth-content`'s deliverable E.)

**Day 3 (optional):**
10. Cut the 60s "stopped here" version. Keep on the booth laptop, cue when someone has actually stopped.

---

## `<<NEG_BASE>>` — paste into every shot's negative-prompt

```
deformed hands, extra fingers, six fingers, melting fingers, warped face, wax skin,
plastic skin, AI generated, smooth motion blur, ghosting, double exposure, low
quality, blurry, jpeg artifacts, watermark, logo, brand name, signage, readable
text, UI mockup, screen UI text, captions, subtitles, neural network, circuit
board, glowing brain, glowing data stream, holographic UI, robot, AI orb,
chatbot avatar, futuristic hologram, cyberpunk, neon, cartoon, illustration,
3D render, video game, anime, cgi look, oversaturated, fluorescent green,
clinical white, harsh shadows, fish-eye distortion
```

---

## What I need from you tonight (3 things)

1. **The `approve-button-macro.png` capture.** Without this Shot 5 doesn't ship — the whole spec hangs on this one real frame. If `balabiteaidev` pulse-preview is gated or has drifted from the button design in `pulse-hero.png`, we have a fallback: in `tab/nra-booth-content` rebuild the button as a tiny React component (content **locked** to the existing PNG) and screenshot at 3×. Tell me which path.

2. **Booth-floor music decision.** Confirmed silent at the booth. The LinkedIn cut wants a music bed — I'd push a single piece from Musicbed / Artlist in the "cinematic ambient minimal" lane (instrumental, no drums, ~70 BPM, sub-1-min). Any rights-restricted tracks to avoid? Anything you've already licensed I should reuse?

3. **Who's generating?** You on the plane, a contractor, or me (within scoped budget)? If me — give me a Runway API key in a project-scoped env var (`RUNWAY_API_KEY`) and I'll script the 8×8 generation passes in `tab/nra-booth-content` overnight. If you, the spec above is paste-ready.

---

## What lives where after this ships

```
docs/nra/hype-video-spec.md         ← this file (the locked story)
public/booth/hype/
  approve-button-macro.png          ← real capture, source of Shot 5
  brand-endcard.png                 ← real capture (or new /booth-endcard route)
  refs/
    match-still.png
    fire-{1,2,3}-*.png
    fix-{1,2,3}-*.png
    reveal-still.png
  takes/
    shot-2-the-match.mp4            ← selected Runway output
    shot-3a-bok-choy.mp4
    … etc
  hype-30s.mp4                      ← the hero
  hype-15s-9x16.mp4                 ← LinkedIn teaser
  hype-60s-stopped.mp4              ← extended version
```
