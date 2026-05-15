# NRA Booth — TV loop + demo

Everything for Booth 8332 at NRA Show 2026 (May 16–19, Chicago).

## What's here

| File | What it is |
|---|---|
| `demo-script.md` | The exact words Lior says for the laptop demo — open, 3 screens, close, plus the 10-second elevator pitch + handshake line. |
| `tv-loop.mp4` | A 1080p screen recording of the `/booth-tv` loop — the **offline fallback**. |
| `proof/` | Playwright screenshots of every `/booth-tv` beat and every `/demo` step. |

## ⚠️ Before you fly — copy the fallback

**`tv-loop.mp4` → onto the laptop AND the phone.** Conference wifi dies. If
`balabite.ai/booth-tv` won't load at the booth, play this file on loop instead
(QuickTime / Photos → loop playback). It's silent and 1920×1080 — same as the
live route.

## The two surfaces

### 🔑 Access — both surfaces are gated
`/booth-tv` and `/demo` aren't public. Two ways through:
- **Kiosk / quick:** open the URL with the key in it —
  `balabite.ai/booth-tv?key=<KEY>` / `balabite.ai/demo?key=<KEY>`. Bookmark this on
  the booth TV; it never has to be re-entered, even after a reboot.
- **Passphrase:** open the bare URL, type the access phrase — it's remembered for
  30 days on that device (good for your laptop).
- The key is `BOOTH_ACCESS_KEY` in the Vercel project env (default if unset:
  `balabite-nra-2026`). **Bookmark the `?key=` URLs before you fly.**

### `/booth-tv` — the silent TV loop
- URL: **`balabite.ai/booth-tv?key=<KEY>`** — open on the booth TV, fullscreen.
- Silent, captioned, auto-advancing, ~82s, loops forever. No chrome, no clicks needed.
- Covers all 6 beats from the deck: Hook → Problem → Proof → How → Product → Real.
- Hidden operator keys if you ever need them: **Space** = pause/resume,
  **← / →** = step beats, **F** = toggle fullscreen.

### `/demo` — the 2–3 min guided demo
- URL: **`balabite.ai/demo?key=<KEY>`** — open it on the laptop.
- Click-through walk of the 3 Pulse screens: **it sees → it acts → it owns it.**
- Built from the 3 Pulse images — the product is not rebuilt.
- Advance with the **"Next →"** button or the **→ / Space** keys; **← Back** to revisit.
- The close screen drives straight to a Cal.com booking.
  - The booking link is read from `NEXT_PUBLIC_DEMO_CAL_URL` (falls back to the
    booth page's `NEXT_PUBLIC_NRA_NUMBERS_URL` / `NEXT_PUBLIC_NRA_DRINKS_URL`).
    If none is set in the Vercel project env, the CTA falls back to
    `/booth-8332#menu` so it never dead-ends. **Set `NEXT_PUBLIC_DEMO_CAL_URL`
    in Vercel to point the close CTA at the exact Cal.com slot you want.**

### `/NRA-booklet` — the printed-booklet QR target
- Owned by `tab/nra-lead-capture` (merged separately). The booklet QR lands on the
  lead-capture signup flow, attributed `?src=booklet`. This tab no longer ships a
  redirect for it — see that tab's `docs/lead-capture-proof/`.

## Re-capturing the proof / re-recording the loop

The screenshots and `tv-loop.mp4` were generated with a Playwright script against
a local production build (`npm run build && npm run start`, then a headless
1080p capture of one full loop, converted to mp4 with ffmpeg). Re-run that capture
if the loop copy or timing changes.
