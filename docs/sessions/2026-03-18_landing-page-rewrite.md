# Session: Landing Page Rewrite | March 18, 2026

## Goal
Rewrite BalaBite.ai landing page into a sales weapon for trade shows, fundraising, and organic traffic.

## What Was Accomplished

### Code (Phases 0-7)
- Stack upgraded: Next.js 16, React 19, Tailwind 4, Framer Motion 12, TS 5.9
- 8 section components built (Hero, Problem, Pulse, Specialists, Guest, Ops, SocialProof, CTA)
- Full i18n: 1,312-line translation file, 8 languages, all components wired
- 3-step empathy form wired to Supabase API
- Critical CSS bug fixed: `* { margin: 0; padding: 0 }` overriding Tailwind 4 layers
- Container variables added for Tailwind 4 + explicit max-w fallbacks
- Accessibility: aria-hidden, semantic HTML
- Dead code cleanup

### Research & Strategy
- **4-hat roundtable review** with 5 customer personas (docs/landing-page-review-2026-03-18.md)
- **Fig.security design analysis** — full visual deconstruction, character design framework, adaptation guide (docs/research-fig-security-design-analysis.md)
- **Zavo competitive intelligence** — head-to-head product comparison, positioning analysis, content gaps (docs/research-zavopay-competitive-analysis.md)
- **AI art generation guide** — Midjourney prompts for characters and scenes (docs/ai-art-generation-guide.md)
- **Brain architecture** — final 9-brain taxonomy with generational roadmap (docs/brain-architecture-final.md)

### Key Design Decisions
- **Pivot to Fig-style illustrated world**: light/cream bg, custom characters, interactive storytelling
- **9 AI brains finalized**: Pulse + Menu + Guest + Growth + Market + Kitchen + Finance + Team + Voice
- **Three-pillar structure**: Make Money / Stop Losing / Save Time
- **No AI model disclosure** on public pages
- **Social proof**: "Now onboarding early restaurant partners" (honest, no fake numbers)
- **Subheadline**: "From morning briefings to last call — AI that manages what you don't have time for."
- **Entry point**: The Pulse morning briefing as a STORY, not Voice Brain
- **Logo**: TBD (explored Midjourney, bitten circle concept promising)

## Key Documents
1. `docs/brain-architecture-final.md` — THE source of truth for brain taxonomy
2. `docs/research-fig-security-design-analysis.md` — Design direction bible
3. `docs/research-zavopay-competitive-analysis.md` — Competitive playbook
4. `docs/ai-art-generation-guide.md` — Midjourney prompts (needs update for 9 characters)
5. `docs/landing-page-review-2026-03-18.md` — Roundtable review + customer personas

## Next Steps
1. **Update art guide** with final 9-brain characters + Market Brain prompts
2. **Generate character art** in Midjourney (start with Pulse, Menu Brain, Guest Brain)
3. **Design logo** (bitten circle or Pulse mark concept)
4. **Rebuild landing page** with Fig-style visual direction:
   - Switch to light/cream background
   - Serif headlines + sans body
   - Illustration placeholders for characters/scenes
   - Interactive "DO NOT touch" moment
   - Product screenshots inside illustrated scenes
   - Three-pillar section structure (Make Money / Stop Losing / Save Time)
5. **Add missing content**: nav menu + CTA, onboarding story, venue type targeting, product screenshots

## Resume Instructions
```bash
cd /Users/admin/balabite-landing && npm run dev
```
Start by reading:
- `docs/brain-architecture-final.md` (brain taxonomy)
- `docs/research-fig-security-design-analysis.md` (design direction)
- This session file

## Technical Notes
- Build compiles clean (zero errors)
- The `* { margin: 0; padding: 0 }` bug: unlayered CSS overrides Tailwind 4 @layer utilities. Fixed by removing it. DO NOT re-add a global margin/padding reset.
- `max-w-6xl` etc. need `--container-*` variables defined in `@theme` for Tailwind 4, OR use explicit `max-w-[72rem]` syntax (currently using explicit).
- `logo.png` is in `public/` — temporary placeholder.
