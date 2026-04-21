# Session: Landing Page Hero Tower — 2026-03-23

## Goal
Redesign the landing page hero around a problem-first concept. "Fall in love with the problem."

## What Was Accomplished

### Phase 1: Full Landing Page Rebuild (code complete, deployed)
- 11-section page architecture built and deployed to Vercel preview
- Components created: Navbar, HeroSection, HatStack, WhatChanges, Capabilities, GuestShowcase, ProductShowcase, HowItWorks, VenueTypes, FinalCTA
- SocialProof restyled for cream theme
- Build passes, preview deployed via `vercel deploy --yes`
- Branch: `feature/landing-rebuild` (committed locally, not pushed to GitHub — SSH key not configured)

### Phase 2: Hero Visual Concept (in progress)
- Decided page arc should be: Problem → Collapse → "Good morning, Chef" resolution → Capabilities/CTA
- Iterated through multiple visual concepts:
  - Hat stack (original plan) — too abstract
  - Papercraft balance board — too cartoony/PowerPoint
  - Photorealistic balance board — CURRENT DIRECTION

### Current Visual Direction
- **Photorealistic studio photograph**
- Genderless figure (black hoodie, dark joggers, white sneakers)
- Standing on a two-piece balance board (cylinder + plank)
- Head completely buried/hidden under an impossibly tall stack of real restaurant chaos items
- Pure white background, no text in image
- CSS floating labels added by code ("Sorry, can't make it today", "PAST DUE", etc.)
- Runway Gen-4.5 for wobble video (balance board rocking, items shifting independently)

### NEW idea (not yet executed): P&L Balance Board
- Balance board represents Revenue vs Costs
- Revenue side (lighter/fewer items) vs Costs side (heavier/overloaded)
- Figure in the middle with daily chaos ALSO piling on top
- Double pressure: horizontal (P&L) + vertical (daily fires)

### Research Completed
Full restaurant owner pain points report with 2025-2026 data:
- 42% of restaurants NOT profitable in 2025
- 3-5% profit margins
- 60-80 hour weeks
- Food costs 35% above pre-pandemic
- $198B in swipe fees (3rd largest expense)
- Delivery apps take 15-30% on a 5% margin
- 70% can't fill positions
- Key quote: "You become the last person who gets to leave."
- Full report: see agent output or re-run research

### Best Runway Prompts So Far

**Image generation (Runway SeedReam 5.0):**
See the long prompt in conversation — photorealistic studio photo, zoomed out, all restaurant items, no text.

**Video generation (Runway Gen-4.5):**
```
The balance board rocks gently side to side on its cylinder, tilting left then right. The person shifts weight to compensate, arms adjusting. Items in the stack sway and shift independently — the wine glass slides slightly, receipts flutter, the laptop tilts. The bag of ice drips. Small items like keys and receipts drift mid-air. The motion is subtle, tense, continuous — everything could collapse any second but never does. Camera is completely static and locked. Seamless loop.
```

## Files Changed
- `/Users/admin/balabite-landing/src/app/landingpage/page.tsx` — new 11-section architecture
- `/Users/admin/balabite-landing/src/app/components/Navbar.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/HeroSection.tsx` — rewritten
- `/Users/admin/balabite-landing/src/app/components/HatStack.tsx` — new (renamed from DayWithout)
- `/Users/admin/balabite-landing/src/app/components/WhatChanges.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/Capabilities.tsx` — new (outcome-first cards)
- `/Users/admin/balabite-landing/src/app/components/GuestShowcase.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/ProductShowcase.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/HowItWorks.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/VenueTypes.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/FinalCTA.tsx` — new
- `/Users/admin/balabite-landing/src/app/components/SocialProof.tsx` — restyled
- `/Users/admin/balabite-landing/src/app/globals.css` — hat-wobble keyframe added

## Next Steps
1. Roundtable session: finalize the hero visual concept (P&L balance board + chaos pile)
2. Generate final hero image (Runway or commissioned)
3. Generate Runway wobble video
4. Restructure HeroSection component around problem-first concept
5. Add CSS floating labels
6. Wire up video with static fallback
7. Responsive pass
8. Fix GitHub SSH key and push branch

## Resume Instructions
```
Resume from docs/sessions/2026-03-23_landing-hero-tower.md
```
Start a roundtable with specialists to finalize the hero tower concept. Bring the restaurant owner research data. The P&L balance board + chaos pile is the leading concept.
