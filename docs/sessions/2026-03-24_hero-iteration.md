# Session: Hero Iteration — 2026-03-24

## Context
Continuing from 2026-03-23 session. Hero image (hero1.png) generated via Runway — balance board operator with chaos pile.

## Key Decisions Made

### Headline
- **"This is a ten-person job."** — chosen after extensive roundtable with 30 operators
- Subtext: "You've been doing it alone. AI changes that."
- Tested against: "Still standing.", "All of it. Just you.", "You carry all of it.", "When did it get like this?", "Yeah. We know."
- Operators ranked "This is a ten-person job" #1 — specific, concrete, universal across chef-owners, business-owners, investor-owners

### CTA
- **"Put AI to Work"** — from March 18 review, praised as active and direct
- Secondary: "See how"
- All "Join Waitlist" removed — product is LIVE

### Copy Voice
- No stats in headline (kills the feeling, Fig doesn't do it)
- No "nine brains" anywhere — dropped the number, emotional not informational
- WhatChanges: "The team you can't afford to hire." / "Works while you sleep. Doesn't ask for a raise."
- Capabilities: "What you stop worrying about."

### Labels
- 30 total, split Revenue pressure (left) / Cost pressure (right)
- Best labels from operator testing: "Sorry can't make it today", "PAST DUE", "86 the special", "Where's Miguel?", "We need to talk", "Missed another recital", "3am. Still here."
- Should cluster as CLOUD around image, not in columns

### Hero Architecture (Fig/Airfleet approved)
- Scroll-driven sticky sequence over ~350vh
- Phase 0: Breathe — headline + image only
- Phase 1: Labels cascade in as cloud
- Phase 2: P&L appears (revenue/cost bars + margin ticking down)
- Phase 3: Counter + "Add yours" input
- Phase 4: Release — everything disappears, into the turn
- Image wobbles with 3D perspective (ambient sine waves + mouse influence)
- P&L is DRIVEN by the wobble — tilt left = revenue dips, tilt right = costs spike

### The Turn (HatStack.tsx)
- 20vh breathing room
- "What if / You weren't alone." — scroll-driven scale+opacity
- Briefing: "Tomorrow morning, 6am. Your phone buzzes once:" + 5 items
- Unburying: "Meet your AI partner / Balabite." + character grid
- Punchline: "The pile is gone. The board is level. You look up."

### Competitor Analysis
- Nory: "Profitability's secret ingredient" — clever pun, product-first
- Owner: "You're losing sales online" — fear + fix
- Zavo: "The operating system for modern hospitality" — platform positioning
- Restoke: "Run a restaurant you love again" — emotional but assumes chef-owner
- Gap: Nobody talks to the PERSON. All talk about the BUSINESS.

### Brand Principles
- Fig/Airfleet are the north star for design
- No VC funding — David vs Goliath. Landing page IS the sales team.
- The wow (wobble, labels, P&L) IS the brand. Built with code, not cash.
- Image is the Purple Cow — no competitor has anything like it

## Current Issues (to fix next)
1. Scroll transition is laggy — needs smooth flow like Fig, not state-jumping
2. Mouse tilt feels sticky/laggy — needs smoother easing or different approach
3. P&L (margin/revenue/cost) needs smarter behavior — currently too simple
4. Labels should flow in smoothly during scroll, not jump in batches
5. Need to flow between phases, not snap between states

## Files Changed
- src/app/components/HeroSection.tsx — full rewrite (scroll sequence)
- src/app/components/HatStack.tsx — turn + unburying
- src/app/components/WhatChanges.tsx — "The team you can't afford to hire"
- src/app/components/Capabilities.tsx — "What you stop worrying about"
- src/app/components/Navbar.tsx — inline SVG logo, "Put AI to Work" CTA
- src/app/components/HowItWorks.tsx — removed "nine brains"
- src/app/components/MeetYourTeam.tsx — removed "nine" from alt text
- src/app/layout.tsx — meta tags for SEO/GEO
- src/app/globals.css — 3D wobble keyframes
- docs/nra-2025-hero-research.md — NRA report extraction
- docs/unreasonable-ideas-brainstorm.md — Purple Cow concepts

## Resume Instructions
```
Resume from docs/sessions/2026-03-24_hero-iteration.md
```
Fix the scroll flow (laggy transitions), mouse tilt smoothness, and P&L intelligence. The phases should blend like Fig — continuous scroll-driven transforms, not state-snapping.
