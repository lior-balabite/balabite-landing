# Tab: Digital Business Card — `/connect`

**Repo**: balabite-landing
**Branch**: `tab/connect-card`
**Worktree**: `/Users/admin/balabite-landing-tab-connect`
**Spawned**: 2026-05-14 — **last working day before Lior flies May 15**
**Priority**: P1 — Lior has no physical business cards; this is his contact hand-off at the NRA Show.

---

## Why this tab exists

Lior is working Booth 8332 at the NRA Show (May 16–19) solo, with no printed business cards (intentional — physical cards are dead). He needs a **modern digital business card**: a prospect scans a QR or taps a link, lands on `/connect`, and can add Lior to their contacts in one tap. He has a Blinq card as a backup; this is the on-brand, owned version.

## Locked context (decided — don't re-derive)
- **Category**: "AI Cofounder for restaurants" (locked 2026-05-11). Lior's title/tagline uses this framing. Never "AI assistant/tool/platform," never "AI Business Partner."
- **No model disclosure** — never mention Claude/Anthropic/GPT/LLM.
- **No implementation leakage** — thesis only (Toast-PM test).
- **Design bar**: luxury-hospitality grade. Resy/Linear/Arc quality. Brand-teal palette consistent with `balabite.ai`. Lior will reject sloppy visual work — validate with Playwright.
- **Stack**: Next.js 16 / React 19 / Tailwind v4 (this repo).

## Scope
- **Route `/connect`** on balabite.ai. Mobile-first — every visitor lands here on a phone.
- **One-tap "Add to Contacts"** — serve a proper vCard (`.vcf`) with: Lior Brik, Founder — BalaBite, lior@balabite.ai, phone (confirm with Lior — see Open Questions), balabite.ai, LinkedIn URL. Tapping it adds him to the phone's contacts natively.
- **The page itself** is a clean, premium card: name, title, a one-line Cofounder tagline, the "Add to Contacts" button, and links (site, LinkedIn, email). Not a landing page — a *card*. Fast, calm, confident.
- **Optional polish if time**: Apple Wallet / Google Wallet pass. Don't sink time here — vCard is the must-have.
- A small printable QR pointing at `/connect` saved to `docs/connect-proof/connect-qr.png` so Lior can stick it on the booth/table or his phone case.

## Acceptance criteria
- [ ] `/connect` renders mobile-first, luxury-hospitality grade.
- [ ] "Add to Contacts" serves a valid vCard that imports cleanly on iOS + Android.
- [ ] QR image generated and committed to `docs/connect-proof/`.
- [ ] Zero Claude/Anthropic/GPT/LLM mentions. AI Cofounder framing only.
- [ ] `npm run build` passes; Playwright screenshot committed to `docs/connect-proof/`.
- [ ] **Deploys to production `balabite.ai/connect`** — a QR card is useless on a preview URL. Scoped prod deploy of just this route; do NOT touch unrelated prod surfaces (the SEO tab and lead-capture tab own other routes/files — stay in `/connect`).
- [ ] PR opened: `feat(landing): /connect digital business card`.

## Open questions — flag to Lior, don't guess
1. **Phone number** — include Lior's mobile on the vCard, or email + LinkedIn only?
2. **LinkedIn URL** — confirm the exact profile URL.
3. **Tagline** — one line under his name. Suggest something Cofounder-framed; Lior approves.

If unreachable: email + LinkedIn only (no phone), use a clean placeholder tagline clearly marked for Lior to swap.

## Coordination
- Three sibling tabs are live in this same repo on other branches: `tab/seo-cofounder`, `tab/nra-lead-capture`, `tab/connect-card` (this one). **Stay strictly inside the `/connect` route and your own files** — do not touch `src/app/layout.tsx`, shared metadata, or other routes. Each tab ships its own scoped PR.
