# Session: Post-Hero Iteration — 2026-03-24

## Context
Continuing from hero iteration. Hero is finalized (tilt, P&L, labels, pile-on interaction). Now building sections after the hero.

## What Was Built

### THE SPLIT — "Same restaurant. Same day."
- Full-width split screen: "Without" (dark) vs "With BalaBite" (warm)
- Draggable divider in the center
- **8 tabs** with different angles:
  1. Your Why (emotional — Italian couple, peanut allergy boy, "gave you your restaurant back")
  2. Your Day (general ops — full Tuesday of fires)
  3. Your Guests (AI Waiter focus — allergies, multilingual, upselling)
  4. Your Menu (Menu Arena + Finance Brain — food costs, mispricing)
  5. Your Kitchen (KDS — ticket flow, course timing, zero lost orders)
  6. All Together (greatest hits — every feature in one day)
  7. Your Money (month-end P&L — profit leaks, real-time tracking)
  8. Your Life (owner's week — Monday→Sunday, life reclaimed)
- Each tab: 6 matched time-stamped moments, same trigger, different outcome
- All "With" claims mapped to real/being-built BalaBite features
- Copy references specific brain names: Menu Brain, Finance Brain, Kitchen Brain, etc.

### Hero Fixes
- Container reduced from 300vh to 220vh (P&L no longer visible when Split appears)
- Scroll thresholds adjusted: labels 8%-55%, P&L 50%-60%

## Key Decisions
- Roundtable consensus: 7 sections after hero (down from 9)
- THE SPLIT goes immediately after hero (not HatStack)
- "Your Why" tab leads — emotional hook first
- All claims must be honest — only live or being-built features
- No auto-scheduling claims, no automated vendor ordering (future features)

## Open Question: Split Height
- Tabs have different content lengths (Your Day = short, Your Life = long)
- Current: each tab uses natural height, content below shifts
- Alternative: fixed height with internal scroll
- Needs resolution

## Next Steps (Roundtable Plan)

### Section 2: THE TEAM (replaces WhatChanges + Capabilities)
- 9 brain characters as playing-card carousel
- Each card: character illustration + killer quote showing a RESULT
- Heading: "Nine specialists. Zero salaries."
- Hover/tap for idle animation or flip to second quote

### Section 3: THE PROOF (replaces SocialProof + VenueTypes)
- Field-report style — real restaurants, real numbers
- POS logos woven in naturally
- Venue types as tags on testimonials

### Section 4: HOW IT WORKS (refined)
- Recipe-card style: Prep / Cook / Plate
- CTA as "Step 4: You."
- Venue range + POS logos in Step 1

### Section 5: THE GUT PUNCH (new, from brainstorm "THE CLOCK")
- Live timer counting from page entry
- Items appear showing what BalaBite could have done

### Section 6: FINAL CTA (refined)
- "What if tomorrow morning was different?"
- Restaurant name personalizes a simulated briefing preview
- "Apply for early access" language

### What Gets Cut
- HatStack "What if / You weren't alone" (hero already did this)
- WhatChanges static team image (replaced by THE TEAM carousel)
- GuestShowcase standalone (Guest Brain becomes a card in THE TEAM)
- VenueTypes pill cloud (tags on testimonials instead)
- Orphan CTA button section (becomes Step 4 in recipe)
- ProductShowcase (merged into THE TEAM quotes)

## Immediate Next Steps (Website)

### 1. Fix THE SPLIT height issue
- Decide: internal scroll with max-height + fade, or natural height
- Test on different tabs — "Your Day" (short) vs "Your Life" (long)
- Ensure content below (tagline, CTA) remains accessible

### 2. Build THE TEAM section
- Replace HatStack + WhatChanges + Capabilities
- 9 brain characters as horizontal card carousel
- Each card: large character illustration + one killer RESULT quote
- Hover/tap: flip to second quote or idle animation
- Heading: "Nine specialists. Zero salaries."
- Sub: "They don't call in sick. They don't need health insurance. They do need your POS login."

### 3. Build THE PROOF section
- Replace SocialProof + VenueTypes
- Field-report style with real restaurant results
- POS integration logos (Square, Toast, Clover) woven in
- Venue types as tags on testimonials (not separate section)

### 4. Rebuild HOW IT WORKS
- Recipe-card style: Prep / Cook / Plate
- CTA as "Step 4: You" — Put AI to Work
- POS logos + venue range in Step 1

### 5. Build THE GUT PUNCH (new)
- Live timer counting from page entry
- Items appear showing what BalaBite could have done in that time
- Full dark background

### 6. Refine FINAL CTA
- Heading: "What if tomorrow morning was different?"
- Restaurant name personalizes a simulated briefing preview on submit
- "Apply for early access" framing
- Dark background to bookend with hero

### 7. Remove old sections
- Delete HatStack (or keep "What if / You weren't alone" as a simple transition line)
- Delete WhatChanges
- Delete GuestShowcase standalone
- Delete VenueTypes standalone
- Delete orphan CTA button section
- Delete ProductShowcase

### 8. Polish & responsive
- Mobile layout for THE SPLIT (stack vertically?)
- Mobile layout for THE TEAM (swipe carousel)
- Test all scroll interactions on different screen sizes
- Ensure hero P&L doesn't leak into THE SPLIT on any viewport

## March 25 Updates

### Major Decisions
- THE TEAM section CUT from landing page (unanimous roundtable). Brain characters redeployed to about page/onboarding.
- Product Reveal redesigned with 4 real jaw-drop moments from actual product capabilities
- Closing headline: "Own it all. Without carrying it alone." / "Not watching your restaurant. Running it."
- How It Works rebuilt as recipe-card style (Prep / Cook / Plate)
- Voice rule: BalaBite is SINGULAR. Use "someone" or drop pronoun. Never "they."

### Product Reveal — 4 Jaw-Drop Moments
All sourced from actual BalaBite_ai product docs:
1. The Pulse — morning briefing, 5 priority cards (from BOH Suite plan)
2. Autonomous Discovery — finds patterns nobody asked for (from AI Brain vision)
3. Curated Menu — 288 items → 6 personalized dishes (from Gen 4 roadmap)
4. Menu Psychology — behavioral economics, anchoring, decoys (from Menu Arena)

### Current Page Flow
1. Hero → 2. Split → 3. Product Reveal → 4. How It Works → 5. Social Proof (needs rebuild) → 6. Final CTA (needs refinement)

### Still To Do
1. Rebuild Social Proof as THE PROOF — real restaurants, real numbers, field-report style
2. Refine Final CTA — "What if tomorrow morning was different?" + personalization
3. Consider THE GUT PUNCH (live timer) — optional, between proof and CTA
4. Mobile responsive pass on all sections
5. A/B test headlines: "Own it all. Without carrying it alone" vs "You own everything. Now it doesn't own you."

## March 26 Updates

### Mobile Responsive Pass
- TheSplit: toggle between sides on mobile (no draggable divider), horizontal scroll tabs
- ProductReveal: curated menu stacks vertically, arrow becomes down-arrow
- SocialProof: text sizing scaled, FAQ max-height increased
- FinalCTA: form padding responsive
- Hero: image constrained, labels on sides (tiny, wrapping), navbar smaller
- Labels overlap image edge slightly on mobile (right-[90%]/left-[90%])
- Overlay labels hidden on mobile (no hover), red dot indicator instead
- Label text wraps on mobile (removed whitespace-nowrap below sm:)

### Still To Do (Mobile)
- Flip card interaction for piled labels on mobile (tap to flip between original and added problem)
- Test on actual devices (375px iPhone, Android)
- Some labels may still clip on very narrow screens

## Resume Instructions
```
Resume from docs/sessions/2026-03-24_post-hero-iteration.md
```
Next: test mobile on real device, then focus on app V1. Come back to website 1-2 weeks before meetings.
