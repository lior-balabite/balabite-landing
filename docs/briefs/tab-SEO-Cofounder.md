# Tab: SEO + AI-Search migration to "AI Cofounder"

> ## ✅ SHIPPED 2026-05-14 — code side complete, on `balabite.ai` prod
>
> All code-side work merged to `main` (PRs #2–#7). What shipped:
> - **NRA banner** — anchored masthead → centered glass sign → event-fact marquee, AI-aurora gradient, palm logo + Instrument Serif italic wordmark, mobile rotating sign + marquee
> - **`/booth-8332`** — menu-style RSVP page (4 dishes), Cal.com modal embed, proof pull-quote, sticky mobile RSVP, `/booth-8332/qr`
> - **Positioning migration** — "AI Cofounder" in title, meta, h1, body copy (HeroSection / ProductReveal / HowItWorks / TheSplit / FinalCTA), footer
> - **AI-search readiness** — `robots.ts` (allows ClaudeBot/GPTBot/PerplexityBot/etc.), `sitemap.ts`, `public/llms.txt` + `llms-full.txt`
> - **Structured data** — Organization + WebSite + SoftwareApplication + FAQPage (root), Event w/ offers + performer (`/booth-8332`)
> - **OG images** — edge-rendered, center-focal (survive chat-app square crops), www canonical
> - **FAQ** — 10 brand-voice Q&A (4 SEO-targeted), FAQPage schema
> - **Favicon** — palm, dark-mode adaptive
> - **Aurora perf opt** on `/booth-8332`
>
> ### ⏭ Post-show TODO — resume after NRA (May 19)
> Crawl re-indexing takes 1–3 weeks; nothing actionable until then.
> - [ ] **Google Search Console** — verify `www.balabite.ai`, submit `sitemap.xml`, Request Indexing on `/`, `/about`, `/booth-8332`
> - [ ] **Bing Webmaster Tools** — submit sitemap (Bing feeds ChatGPT search)
> - [ ] **Weekly AI-assistant tests** — ChatGPT / Claude / Perplexity / Google AI Overviews; confirm "AI Cofounder" not "AI waiter"; screenshots → `docs/seo-test-results/`
> - [ ] **Monitor the crawl shift** — Google's cached description currently says "AI waiter"; should flip to "AI Cofounder" as the new body copy re-crawls
> - [ ] **Lighthouse SEO ≥95** verification once indexed
> - [ ] **Auto-expire check** — confirm the NRA banner self-hides on/after 2026-05-20 (server cutoff + client backup)
> - [ ] **Third-party mentions** (long game) — press, podcasts, industry pubs for backlink authority
> - [ ] Optional: `/ai-for-independent-restaurants` hub page for the niche keyword

---

**Repo**: balabite-landing
**Branch**: `tab/seo-cofounder`
**Worktree**: `/Users/admin/balabite-landing-tab-seo`
**Spawned**: 2026-05-12
**Sprint**: Sprint 2 (overflow) / Sprint 3 prep
**Priority**: P0 — category positioning is locked, public surface is stale

---

## Why this tab exists

**2026-05-11**: Lior locked the public-facing category as **"AI Cofounder"** (replaces "AI Business Partner"). Cofounder is **unclaimed** in the restaurant vertical and the structural moat is the **1% + $299/mo alignment pricing** (cofounder economics, not vendor economics).

The landing page (`balabite.ai`) currently markets us as **"AI Restaurant Management" / "AI Restaurant Partner"** — both in meta tags and visible copy. That's stale. We need every SEO + AI-search surface to say **"AI Cofounder for restaurants"** before NRA (May 16) so anyone Googling us or asking an AI assistant about us during/after the show lands on the correct positioning.

---

## Scope

### In scope
1. **Metadata migration** — every `metadata` export in `src/app/**/*.tsx` retitled to AI Cofounder framing.
2. **JSON-LD structured data** — add `Organization`, `SoftwareApplication` (or `Product`), and `WebSite` schema with the new positioning. Include `slogan`, `applicationCategory: "BusinessApplication"`, `audience: { audienceType: "Restaurant owners and operators" }`.
3. **AI-search files**:
   - `public/llms.txt` (modern standard, see https://llmstxt.org)
   - `public/llms-full.txt` (long-form, full content for AI crawlers)
   - `public/robots.txt` (or `src/app/robots.ts`) — explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai
4. **Sitemap** — `src/app/sitemap.ts` covering `/`, `/about`, `/pitch`, any other public route. Use `metadataBase` so absolute URLs are consistent.
5. **Open Graph + Twitter cards** — update titles/descriptions; verify there's an OG image (or commission one — see Open Questions).
6. **Heading hierarchy** — H1 of the landing must contain "AI Cofounder" within the first viewport. Audit and fix h-tag order on `/`, `/about`, `/landingpage`.
7. **Canonical URLs** — set `alternates.canonical` per page so duplicate routes (`/` vs `/landingpage`) don't fight.
8. **NRA Show announcement banner** — see dedicated section below. **Ships first, separate PR, before SEO work.**

### Out of scope (for this tab)
- Visual redesign of existing sections — only copy/meta/structured data + the new top banner.
- Pricing page rewrite (handled separately).
- Pitch deck content — `/pitch` stays as-is.
- Blog/content marketing — there's no blog yet.

---

## ⚡ Priority 0: NRA Show banner (ships FIRST, separate PR)

**Why first**: NRA Show is **May 16–19, 2026** in Chicago. Lior flies **Fri May 15**. The banner must be live on `balabite.ai` no later than **Wed May 14 EOD** so anyone Googling us on the show floor sees it. SEO migration can ship after.

### Spec
- **Type**: Persistent announcement bar at the very top of the page (above the existing nav/hero).
- **Copy** (locked):
  > **Visit us at NRA Show — Booth 8332, May 16–19, Chicago**
- **CTA**: Subtle text link "See you there →" or similar. Link target: `https://www.nationalrestaurantshow.com/` (the official NRA Show site). Lior to confirm if he prefers linking to `/pitch`, a calendar booking, or an email — **default to the official NRA site** if no answer.
- **Style**:
  - Full-width, dark teal background (use the brand teal `rgb(12, 56, 50)` per `project_nra_backdrop_deadline.md` memory) with cream/white text.
  - Hospitality-grade, not a generic SaaS announcement bar. Think Resy/Linear quality.
  - Mobile-first: stacked or truncated copy on `<640px`, full copy on desktop.
  - Includes a tiny dismiss "×" (sessionStorage — re-appears on next visit so we don't lose impressions).
- **Visibility**: Show on `/`, `/about`, `/landingpage`. **Do NOT** show on `/pitch` (investor audience).
- **Auto-expiry**: Hard-coded date check — banner hides automatically on/after **2026-05-20 00:00 America/Chicago**. Use server-side rendering of the date so it doesn't ship stale to caches.

### Acceptance criteria (banner)
- [ ] Banner renders on `/`, `/about`, `/landingpage`.
- [ ] Banner does NOT render on `/pitch`.
- [ ] Dismissable; dismissal persists across pages within same session but resets on new session.
- [ ] Mobile viewport (375px) shows readable copy + booth number + dates without overflow.
- [ ] Auto-hides server-side on/after 2026-05-20 00:00 Chicago time.
- [ ] Lighthouse Performance score does not drop more than 2 points on `/` vs baseline.
- [ ] Playwright smoke test in `tests/banner.spec.ts` (or equivalent) verifying render + dismiss + auto-hide-after-date.
- [ ] Visual check: must look luxury hospitality grade, not engineer-built. Lior will reject sloppy work (per `feedback_design_quality.md`).
- [ ] Separate PR titled `feat(landing): NRA Show booth 8332 announcement banner` — ship this BEFORE the SEO PR.

### Why a separate PR
- Banner has a hard deadline (May 14); SEO does not.
- Banner is reversible / disposable; SEO touches structural metadata across every page.
- Faster review cycle on a focused PR.

---

## Hard constraints (from memory)

These are durable rules — violating any of them is a reject:

- ❌ **No mention of Claude / Anthropic / underlying model** on any public page or in meta/JSON-LD. (`feedback_no_ai_model.md`)
- ❌ **No implementation leakage** in public copy — thesis only. Don't describe how the AI works (tools, schemas, MCP, RAG, etc.). Apply the Toast-PM test: would a Toast PM reading this learn anything they could copy in a sprint? If yes, cut it. (`feedback_public_thesis_only.md`)
- ❌ **Don't lead with features.** The product IS the AI Cofounder. The AI waiter, BOH suite, Pulse, etc. are surfaces — not the pitch. (`feedback_dont_anchor_on_features.md`)
- ✅ **Pricing is fair game in meta** — "1% of sales + $299/mo" is the moat narrative and Lior wants it surfaced. ("Cofounder economics, not vendor economics.")

---

## Positioning vocabulary (use these)

**Use:**
- "The first AI Cofounder for restaurants"
- "Built like a partner, priced like one"
- "1% of sales. $299/mo floor. We win when you win."
- "Restaurant AI Cofounder"
- "AI Cofounder for independent restaurants" *(variant)*

**Avoid:**
- "AI Restaurant Management" (old)
- "AI Business Partner" (old, deprecated 2026-05-11)
- "AI assistant", "AI tool", "AI platform" (commodity framing — Cofounder is category-defining, don't water it down)
- "Powered by Claude / GPT / LLM"

---

## Acceptance criteria

The tab is done when **all** of these pass:

### Traditional SEO
- [ ] Title tag on `/` contains "AI Cofounder" and is ≤60 chars.
- [ ] Meta description on `/` contains "AI Cofounder" + "restaurants" + pricing hook, 140–160 chars.
- [ ] `<h1>` on `/` contains "AI Cofounder", appears above the fold.
- [ ] `metadataBase` set in root layout (`https://balabite.ai`).
- [ ] `sitemap.xml` generated, lists all public routes, accessible at `/sitemap.xml`.
- [ ] `robots.txt` accessible at `/robots.txt`, allows public crawlers, explicitly allows AI crawlers (see list above).
- [ ] JSON-LD valid — paste into https://validator.schema.org and Google Rich Results Test (`https://search.google.com/test/rich-results`), zero errors.
- [ ] Lighthouse SEO score ≥95 on `/` (run via `npx lighthouse https://localhost:3000 --only-categories=seo`).
- [ ] No 404s, no canonical conflicts (validate via `npx next build` output).

### AI search
- [ ] `public/llms.txt` present, follows https://llmstxt.org spec, lists all public routes with summaries.
- [ ] `public/llms-full.txt` present, contains the full landing copy + about copy + pricing narrative in markdown.
- [ ] Manual AI test: ask **ChatGPT (web search)**, **Claude (with web search)**, and **Perplexity** the following queries — capture screenshots in `docs/seo-test-results/2026-05-12/`:
  - "What is balabite.ai?"
  - "Who makes AI Cofounder software for restaurants?"
  - "Best AI tool for independent restaurants 2026"
  - "balabite.ai pricing"
- [ ] In ≥3 of the 4 queries above, the AI response identifies BalaBite as an "AI Cofounder" (not just "AI tool" or "AI platform").
- [ ] Test results documented in `docs/seo-test-results/2026-05-12/README.md` with: query, AI assistant, response excerpt, screenshot, pass/fail.

### Deployment
- [ ] `npm run build` passes locally.
- [ ] Vercel preview deploys clean on PR.
- [ ] Open a PR titled `feat(seo): migrate to AI Cofounder positioning + AI-search readiness`.
- [ ] PR body links to this brief and the test-results README.

---

## Open questions for Lior (flag before guessing)

1. **OG image** — does a current OG image exist? If not, do we want a placeholder this sprint or commission a real one?
2. **`/about`, `/pitch`, `/landingpage`** — should they also migrate, or is `/pitch` (investor deck) intentionally kept on older framing?
3. **i18n** — there's an `i18n/` directory. Are non-English locales live? If so, do they need parallel migration, or is the rule "English first, others follow"?
4. **`balabite.ai` vs `app.balabite.ai` vs `pitch.balabite.ai`** — should `llms.txt` mention the app/pitch subdomains, or are they intentionally hidden from AI crawlers?

If Lior is unavailable, **default**: English-only this tab, `/about` migrates, `/pitch` stays as-is (it's investor-facing, different audience), OG image becomes a follow-up tab, robots.txt does NOT mention app subdomain (it's authenticated).

---

## How to verify (developer-facing)

```bash
cd /Users/admin/balabite-landing-tab-seo

# 1. Install + build
npm install
npm run build

# 2. Lint + typecheck
npm run lint

# 3. Local SEO smoke test
npm run dev
# In another shell:
curl -s http://localhost:3000 | grep -i "cofounder"     # must hit
curl -s http://localhost:3000/robots.txt                # must respond
curl -s http://localhost:3000/sitemap.xml               # must respond
curl -s http://localhost:3000/llms.txt                  # must respond

# 4. Lighthouse SEO (after dev server up)
npx lighthouse http://localhost:3000 --only-categories=seo --output=html --output-path=./docs/seo-test-results/2026-05-12/lighthouse.html

# 5. Schema validators
# Paste rendered HTML's JSON-LD into:
#  - https://validator.schema.org
#  - https://search.google.com/test/rich-results
```

---

## File map (expected touches)

```
src/components/NRABanner.tsx           # NEW — announcement banner component
src/app/layout.tsx                     # mount NRABanner conditionally + metadata + metadataBase + JSON-LD
src/app/page.tsx                       # h1, hero copy if it conflicts with title
src/app/about/page.tsx                 # metadata, h1
src/app/landingpage/page.tsx           # metadata
src/app/robots.ts                      # NEW
src/app/sitemap.ts                     # NEW
public/llms.txt                        # NEW
public/llms-full.txt                   # NEW
tests/banner.spec.ts                   # NEW — Playwright smoke test for banner
docs/seo-test-results/2026-05-12/      # NEW (test artifacts)
```

Do NOT touch:
- `src/app/pitch/**` (investor deck, different audience)
- `src/app/api/**`
- `src/middleware.ts`
- `src/components/**` unless a visible h1 must change to satisfy SEO acceptance criteria

---

## Done definition (PM checks)

- All acceptance criteria boxes ticked.
- PR opened, preview URL working.
- Test screenshots committed.
- Brief updated with "✅ Shipped YYYY-MM-DD" at the top once merged.
