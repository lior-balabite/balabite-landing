# BalaBite.ai — Design Bible
### Inspired by Fig.security + Airfleet.co | March 20, 2026
### Strategic Design Analysis & Implementation Guide

---

## 0. Purpose of This Document

This is the single source of truth for BalaBite's landing page design direction. Every design decision, illustration prompt, component architecture, and copy pattern should trace back to this document. Written for Claude Code to reference during implementation.

---

## 1. Executive Summary

**The Insight**: Fig.security — a cybersecurity startup — built one of the most effective B2B SaaS landing pages of 2026 by rejecting every convention of their industry. Dark mode, shields, circuit boards, jargon — gone. Replaced with: a warm cream background, hand-crafted papercraft illustrations, animal characters in work clothes, a single Jenga tower metaphor, and irreverent copy that treats CISOs like humans.

**The Result**: $38M raised. Instant brand recognition. A page people share not because they need the product, but because the *experience* is remarkable.

**The Translation**: BalaBite operates in restaurants, not cybersecurity. But the pattern is identical:
- A fragmented, stressful reality → made visible through ONE visual metaphor
- Complex AI functionality → embodied in characters with personality
- A product that removes chaos → shown as a narrative arc, not a feature list
- Premium positioning → through craft, not corporate polish

**BalaBite's Jenga Tower = The Hat Stack.** One owner, wearing every hat, about to collapse. BalaBite gives each hat its own body.

---

## 2. Competitive Analysis: Fig's Design System

### 2.1 What Fig Built (Airfleet Agency, ~$50K-100K budget, 90 days)

| Dimension | Fig's Approach | Why It Works |
|-----------|---------------|-------------|
| **Platform** | WordPress + Airfleet Lightyear theme v2.0.0 | Fast to build, agency-managed |
| **Visual Identity** | Single illustrated world — all assets share palette, material, lighting | Feels like ONE place, not a slideshow |
| **Central Metaphor** | Jenga tower = fragile SecOps stack | Universal comprehension. Everyone knows Jenga anxiety. |
| **Characters** | Anthropomorphic animals (sloth, owl, eagle, turtle) in work clothes | Characters > icons. You remember a sloth with a magnifying glass. |
| **Color** | Cream bg `#FFF8E8`, black text `#050606`, pastel accents on illustration only | UI is invisible. Art provides all color. |
| **Typography** | Stack Sans (variable), H1: 75px/weight 400, body: 18px/weight 300 | Extremely light heading weights = airy, premium, editorial |
| **Animation** | 121-frame WebP canvas sequence (tower), 3 Lottie players, 12 MP4 video loops | Looks magical, technically simple |
| **Interactivity** | ONE moment: "DO NOT touch" → tower collapses on click | Constraining interactivity makes the ONE moment unforgettable |
| **CTAs** | "Get a demo" × 4 placements. Black button on cream. One action. | Single CTA discipline. Never confused about what to do. |
| **Copy** | Irreverent, self-aware, short headlines (3-6 words), humor at interaction points | "People we like, saying things we like" — not "Testimonials" |
| **Navigation** | 3 items: Resources, About, Get a demo | Radical simplicity. Nothing competes with the story. |
| **Page length** | 10 sections, ~6 screen heights | Tight. No filler. Every section earns its place. |

### 2.2 Fig's Complete Headline Catalog

Every headline on the homepage, in scroll order:

1. `"Don't break for a change."` — Hero (5 words, period)
2. `"Your SOC is deathly allergic to two types of changes:"` — Problem intro
3. `"drift (unplanned changes)"` — Problem A
4. `"planned changes"` — Problem B
5. `"Say hello to Security Operations Resilience"` — Solution reveal
6. `"Get a handle on change"` — Features header
7. `"drift detection" / "drift repair" / "model your changes" / "deploy to production"` — Feature cards
8. `"People we like, saying things we like"` — Testimonials
9. `"See Fig in action"` — Product demo
10. `"With change under control, you..."` — Benefits
11. `"We don't play favorites"` — Integrations
12. `"We take security personally"` — Trust/compliance
13. `"Explore the world of Fig"` — Resources
14. `"Don't break for a change."` — Footer CTA (bookend)

**Pattern**: Short, punchy, conversational. Zero jargon in headlines. Technical language lives in body copy only.

### 2.3 Fig's Color System (Exact Values)

```
Background:    #FFF8E8  (warm cream)
Text:          #050606  (near-black ink)
CTA Button:    #050606 bg / #FFF8E8 text  (inverted)
Pink:          #EB6986
Green:         #43835A
Purple:        #7B55A7
Peach:         #FFB5A9
Tower blocks:  9 gradients mixing the above palette
```

**Key principle**: The UI itself has NO color. Black text on cream background. All color comes from the illustrations. This makes the art feel immersive rather than decorative.

### 2.4 Airfleet's Design Methodology

From their cybersecurity website analysis (10 companies, 5 dimensions):

| Principle | What It Means | BalaBite Application |
|-----------|--------------|---------------------|
| **Single hero message** | One headline, not a carousel | "Good morning, Chef." — nothing else |
| **Plain language** | No jargon in headlines | "You're wearing too many hats" not "AI-powered restaurant operations platform" |
| **Customer evidence** | Testimonials prominent, not buried | Move social proof higher (Act 3-4, not Act 8) |
| **No fake interactivity** | If it looks clickable, it must be | Every card, button, illustration — if it has hover state, it goes somewhere |
| **Distinctive identity** | Like Vanta's llama — ONE iconic visual | The Hat Stack. The papercraft figurines. The crown. |
| **Show the story** | "Don't sell the speedometer" | Show the morning briefing STORY, not a dashboard screenshot |

---

## 3. BalaBite Design System

### 3.1 The Illustrated World

**Art Style**: Designer papercraft figurines
- Warm fabric/paper material (kraft paper, cream linen)
- Hats ARE the heads (no human faces)
- Bodies in tailored suits/professional attire
- Small glowing amber eyes on the hats
- Warm inner glow emanating from each character
- Proportions: tall, elegant, professional (NOT cute/stubby/toy)
- Think: designer collectible × department head × papercraft

**The Two Lighting Worlds**:
| State | Lighting | Palette | Feeling |
|-------|---------|---------|---------|
| **Without BalaBite** (problem) | Dark, moody, warm shadows | Amber on dark wood, red notification glow | Ratatouille kitchen at 2am |
| **With BalaBite** (solution) | Bright, clean, sunrise warmth | Cream/white bg, amber glow, natural light | Calm morning, everything handled |

The page literally gets LIGHTER as the story resolves.

### 3.2 Color System

```css
/* Background — warm cream (Fig-inspired) */
--bg-primary:       #FAF5EE;    /* Main page background */
--bg-dark:          #1C1714;    /* Problem section backgrounds */
--bg-card:          #FFFFFF;    /* Card surfaces */

/* Text */
--text-primary:     #1A1A1A;    /* Headlines, body */
--text-secondary:   #6B6560;    /* Muted text */
--text-on-dark:     #FAF5EE;    /* Text on dark backgrounds */

/* Brand — Amber/Gold (the inner glow) */
--amber-400:        #FBBF24;
--amber-500:        #F59E0B;
--amber-600:        #D97706;

/* Pillar Colors */
--pillar-make:      #F59E0B;    /* Make Money — amber */
--pillar-stop:      #10B981;    /* Stop Losing — emerald */
--pillar-save:      #8B5CF6;    /* Save Time — violet */

/* CTA */
--cta-bg:           #1A1A1A;    /* Black button */
--cta-text:         #FAF5EE;    /* Cream text on button */
--cta-hover:        #333333;    /* Slightly lighter on hover */
```

**Rule**: UI surfaces are neutral (cream, white, black). All color comes from illustrations and pillar accents. No gradients on UI elements.

### 3.3 Typography

```css
/* Headlines — editorial, light weight, large */
font-family: 'Inter', system-ui, sans-serif;  /* or consider a serif for headlines */
h1: 72px / weight 500 / line-height 1.1 / letter-spacing -0.02em
h2: 48px / weight 500 / line-height 1.15
h3: 28px / weight 500 / line-height 1.3
label: 12px / weight 600 / uppercase / letter-spacing 0.1em / muted color

/* Body — light, generous leading */
body: 18px / weight 400 / line-height 1.7
small: 14px / weight 400 / line-height 1.6

/* Copy personality */
- Bold keywords inline within sentences
- Short headlines (3-7 words preferred)
- Section labels: ALL-CAPS, letterspaced, small, muted
- Humor placed at INTERACTION POINTS (buttons, CTAs), not randomly
```

### 3.4 Spacing & Layout

```css
/* Section padding */
section: py-24 (96px) on desktop, py-16 (64px) on mobile
max-width: 1280px (content), full-bleed for backgrounds

/* Card spacing */
gap: 24px (grid gaps)
padding: 32px (card internal)
border-radius: 16px (cards), 8px (buttons), 9999px (pills)

/* The "breathing room" rule */
Every illustration gets 2x the padding you think it needs.
White space IS the design.
```

### 3.5 Animation Philosophy

**Fig's rule**: The wow comes from the ART, not the code.

| What | How | Library |
|------|-----|---------|
| Section reveals | Fade up + opacity on scroll | Framer Motion `whileInView` |
| Character hover | Subtle float/glow pulse | CSS animation (no JS) |
| Interactive moment | Hat stack collapse on click | Rive or canvas frame sequence |
| Stagger reveals | Cards appear one by one | Framer Motion `staggerChildren: 0.1` |
| Logo ticker | Infinite horizontal scroll | CSS `@keyframes` only |
| Page transitions | None. Scroll is the experience. | — |

**4 CSS keyframes max** on the entire page (Fig uses exactly 4). Restraint IS the style.

### 3.6 CTA Strategy

**One action**: "Join the Waitlist" (or "Get Early Access" or "Book a Demo" once live)

| Placement | Style | Copy |
|-----------|-------|------|
| Navbar (sticky) | Small, dark button | "Join Waitlist" |
| Hero | Large, dark button | "Join the Waitlist" |
| After problem section | Inline text link | "Meet your AI team →" |
| After brain showcase | Medium, dark button | "Join the Waitlist" |
| Footer CTA (final) | Large, dark button, full section | "Join the Waitlist" |

**4 placements of the same CTA.** Never more than 2 screen-heights from a CTA. Same text everywhere for consistency.

---

## 4. Page Architecture — The Scroll Narrative

### 4.1 The Story Arc

```
HOOK → PROBLEM → BREAKING POINT → RESOLUTION → PROOF → ACTION

Fig:     Tower standing → Wrecking ball → "DO NOT touch" → Tower rebuilt → Testimonials → "Get a demo"
BalaBite: Calm morning → Hats piling → "Add one more" → Hats become people → Brain showcase → "Join waitlist"
```

### 4.2 Section-by-Section Blueprint

| # | Section | Headline | Visual | Emotional Beat | Bg |
|---|---------|----------|--------|---------------|-----|
| 0 | **Navbar** | Logo + "Join Waitlist" | Sticky, minimal, 3 links max | Trust | Transparent → cream on scroll |
| 1 | **Hero** | "Good morning, Chef." | The Pulse (full-body figurine) in calm kitchen, coffee, sunrise | Aspiration + curiosity | Light/cream |
| 2 | **Problem** | "You're wearing too many hats." | Hat stack building, phone with notifications | Recognition + anxiety | Dark/moody |
| 3 | **Breaking Point** | "Add one more hat." | Interactive: click → stack collapses. Kitchen chaos scene. | Tension → catharsis | Dark, then transition |
| 4 | **Resolution** | "What if each hat had its own brain?" | Each hat lands on a body. 9 figurines walk to their stations. | Relief + wonder | Transition dark → light |
| 5 | **The Team** | "Meet your AI management team." | All 9 characters at their stations (team scene, new style) | Confidence | Light/cream |
| 6 | **Brain Showcase** | Three pillars: Make Money / Stop Losing / Save Time | Individual character portraits in cards, grouped by pillar | Understanding | Light/cream |
| 7 | **The Pulse** | "Every morning at 6am." | Morning briefing mockup, action items | "I want this" | Light with amber glow |
| 8 | **Social Proof** | "Restaurants who get it." | Testimonials, logos (when available) | Trust | Light/cream |
| 9 | **CTA** | "Your team is ready." | The Pulse figurine again, bookending the page | Action | Light/cream, amber glow |
| 10 | **Footer** | Links, legal, brand | Minimal, warm | Closure | Dark/cream |

### 4.3 The Lighting Transition (Key Design Moment)

```
Sections 1      → Light, warm, aspirational (the "with" world — flash-forward)
Sections 2-3    → Dark, moody, chaotic (the "without" world — current reality)
Section 4       → TRANSITION — dark to light (the product moment)
Sections 5-10   → Light, cream, clean (the "with" world — permanent)
```

This mirrors Fig's approach where the problem sections feel heavier and the solution sections feel lighter — but BalaBite makes it MORE dramatic by actually changing the background color.

---

## 5. Character Design — The 9 AI Brains

### 5.1 Design Principles (the-pulse-b.png as reference)

Every character MUST share:
- **Material**: Warm kraft paper / cream linen papercraft
- **Construction**: Visible folds, seams, paper texture — handmade feeling
- **Proportions**: Tall, elegant (NOT chibi/cute). Think: designer figurine, 7-8 heads tall equivalent
- **The hat IS the head**: No separate face. Eyes are small warm dots on the hat itself.
- **Inner glow**: Warm amber light emanating from inside the body, visible at seams and hat openings
- **Attire**: Professional — suits, blazers, vests. Each character's outfit hints at their role.
- **Props**: Each holds ONE signature item that defines their function
- **Pose**: Confident, professional. Standing tall. Not action poses — PRESENCE.
- **Background**: Clean white/cream for individual portraits. Restaurant setting for scenes.
- **Wax seal**: Each hat has a small BalaBite wax seal/medallion (brand consistency element from Gen 1)

### 5.2 The Characters

| # | Brain | Hat | Outfit | Signature Prop | Personality in Posture |
|---|-------|-----|--------|---------------|----------------------|
| 0 | **The Pulse** | Golden crown (5 points) | Cream suit, amber tie | Leather notebook under arm | Standing tall, centered, calm. The one who arrives first. |
| 1 | **Menu Brain** | Chef's toque (tall, pleated) | Chef's coat, clean | Magnifying glass + small plate | Leaning forward, examining. Analytical passion. |
| 2 | **Guest Brain** | Fedora (classic, wide brim) | Maître d' vest + tie | Small menu card, one arm extended "right this way" | Welcoming lean, gracious. Makes you feel like a VIP. |
| 3 | **Growth Brain** | Top hat (tall, statement piece) | Sharp blazer, confident | Megaphone pointed up, other hand on hip | The most ATTITUDE. Leaning back. Knows she's good. |
| 4 | **Market Brain** | Safari/explorer hat (wide, adventure) | Field jacket, utilitarian | Binoculars + compass | Forward lean, one foot ahead. About to move. |
| 5 | **Kitchen Brain** | Bandana/kitchen cap (tied knot) | Apron over sturdy clothes | Wooden spoon + clipboard | Stockiest build. Both feet planted wide. Unflappable. |
| 6 | **Finance Brain** | Green visor/accountant shade | Precise suit, meticulous | Calculator + receipt tape trailing | Most upright posture. Sharp, controlled. |
| 7 | **Team Brain** | Manager's cap (structured) | Polo + headset | Schedule card + whistle | Open posture, both arms slightly out. Warm, organized. |
| 8 | **Voice Brain** | Headphones (wrapping small round head) | Night-shift casual, alert | Old telephone receiver + notepad | Most "alive" energy. Bright eyes despite the crescent moon. |

### 5.3 Silhouette Test

Each character MUST be identifiable from a thumbnail silhouette:
- Pulse: Crown points + suit + notebook = "the leader"
- Menu: Tall toque + leaning + magnifying glass = "the analyst"
- Guest: Wide fedora brim + extended arm = "the host"
- Growth: Tall top hat + megaphone + hand on hip = "the marketer"
- Market: Wide safari hat + binoculars = "the scout"
- Kitchen: Bandana knot + wide stance + spoon = "the backbone"
- Finance: Low visor + receipt tape = "the guardian"
- Team: Cap + headset + open arms = "the people person"
- Voice: Headphones + phone receiver + moon = "the night owl"

---

## 6. Technical Implementation

### 6.1 What Fig Uses → What BalaBite Uses

| Fig | BalaBite | Notes |
|-----|---------|-------|
| WordPress + Lightyear | Next.js 14 + App Router | Already more capable |
| Canvas 2D frame sequence (121 WebP frames) | Rive or Lottie on canvas | For the interactive hat-stack collapse |
| Lottie via WebGL (3 players) | `@lottiefiles/react-lottie-player` | Character idle animations (future) |
| MP4 video loops (12 elements) | HTML5 `<video>` with `next/image` poster | Product demos, character animations |
| Static PNG illustrations (54 files) | PNG/WebP via `next/image` | Character art, scene illustrations |
| Swiper.js carousels (3 instances) | `embla-carousel` (lighter, React-native) | Testimonials, benefits |
| CSS ticker `@keyframes` | Same CSS approach | Integration logo scroll |
| ARIA tabs (custom) | Radix UI Tabs + Framer Motion | Brain feature tab switcher |
| IntersectionObserver (vanilla JS) | Framer Motion `whileInView` | Already using this |
| BEM CSS (`afb-`, `afc-`, `afp-`) | Tailwind 4 utilities | Already using this |
| Custom variable font (Stack Sans) | Inter (already loaded) or upgrade to serif headlines | Consider Playfair Display for headlines |

### 6.2 Image Strategy

```
/public/illustrations/
├── characters/           # Individual portraits (white bg)
│   ├── the-pulse.png     # ~800KB WebP
│   ├── menu-brain.png
│   ├── guest-brain.png
│   ├── growth-brain.png
│   ├── market-brain.png
│   ├── kitchen-brain.png
│   ├── finance-brain.png
│   ├── team-brain.png
│   └── voice-brain.png
├── scenes/               # Narrative compositions
│   ├── hero-calm.png          # Pulse in calm kitchen, sunrise
│   ├── chaos-morning.png      # Phone with notifications
│   ├── hats-piling.png        # The tower — all hats on one head
│   ├── hats-falling.png       # The collapse moment
│   ├── hats-becoming-people.png  # The resolution
│   ├── team-at-stations.png   # All 9 at work
│   └── peak-chaos.png         # Kitchen on fire
└── ui/                   # UI elements
    ├── wax-seal.png
    └── paper-texture.png
```

**Format**: WebP preferred (30-50% smaller than PNG). PNG fallback for transparency.
**Sizes**: Characters ~800px tall for cards, scenes ~1920px wide for full-width.
**Loading**: `priority` for hero + first scene, `loading="lazy"` for everything else.

### 6.3 Component Architecture

```
src/app/components/
├── Navbar.tsx                  # Sticky, minimal, 3 items
├── HeroSection.tsx             # "Good morning, Chef" + Pulse character
├── ProblemSection.tsx          # Hat stack narrative (dark bg)
│   ├── HatStack.tsx            # The tower illustration + interactive moment
│   └── ChaosTimeline.tsx       # Phone notifications → hats piling → peak chaos
├── ResolutionSection.tsx       # Hats → characters transition (dark → light)
├── TeamShowcase.tsx            # All 9 characters at stations
├── BrainGrid.tsx               # Three-pillar feature cards
│   └── BrainCard.tsx           # Individual brain card (portrait + copy)
├── PulseBriefing.tsx           # Morning briefing mockup
├── SocialProof.tsx             # Testimonials + logos
├── CTASection.tsx              # Final CTA + waitlist form
└── Footer.tsx                  # Links, legal, brand
```

### 6.4 Performance Budget

| Metric | Target | Fig's Score |
|--------|--------|------------|
| LCP | < 2.5s | ~2.8s (heavy images) |
| FID | < 100ms | ~50ms |
| CLS | < 0.1 | ~0.05 |
| Total page weight | < 8MB | ~12MB (54 PNGs) |
| JS bundle | < 200KB | ~150KB (vanilla) |

Beat Fig by using WebP, `next/image` optimization, and lazy loading aggressively.

---

## 7. Copy Voice Guide

### 7.1 The Voice

**Tone**: Confident. Warm. Slightly irreverent. Never corporate.

| ✅ BalaBite sounds like | ❌ BalaBite does NOT sound like |
|------------------------|-------------------------------|
| A trusted advisor over coffee | A vendor pitching at a trade show |
| "Your sous chef who happens to know data" | "Leverage AI-powered insights to optimize..." |
| Fig: "People we like, saying things we like" | Generic: "What Our Customers Say" |
| "Your Friday night, handled." | "End-to-end restaurant management solution" |

### 7.2 Headline Patterns

```
Hero:           "Good morning, Chef."                    (3 words. Period.)
Problem:        "You're wearing too many hats."          (Universal idiom, instant recognition)
Interactive:    "Go ahead. Add one more."                (Dare. Humor at interaction point.)
Resolution:     "What if each hat had its own brain?"    (Question that IS the product pitch)
Team:           "Meet your AI management team."          (Simple, direct)
Pillars:        "Make Money." / "Stop Losing." / "Save Time."   (Three imperatives)
Pulse:          "Every morning at 6am."                  (Intrigue — what happens at 6am?)
Social proof:   "Restaurants who get it."                (Tribe signal — you're either in or out)
CTA:            "Your team is ready."                    (Not "Sign up" — an invitation)
```

### 7.3 Copy Rules

1. **Headlines: 3-7 words.** If it's longer, it's body copy.
2. **No jargon in headlines.** "AI" appears in body copy, never in H1/H2.
3. **Body copy uses "you" and "your."** Never "our platform" or "BalaBite's solution."
4. **Humor lives at interaction points** — buttons, CTAs, interactive moments. Not in body copy.
5. **Section labels are ALL-CAPS, muted, letterspaced.** "MEET THE TEAM" above the headline.
6. **Bold keywords inline**: "Your restaurant runs on *people*. We give each role its own *brain*."
7. **Never mention the underlying AI model.** No "powered by Claude" or "built on GPT." (Per project memory)
8. **Periods, not exclamation marks.** Confidence doesn't shout.

---

## 8. What This Document Does NOT Cover

- Responsive/mobile breakpoints (design desktop-first, then adapt)
- Translation/i18n updates (English first, translate after design is locked)
- Animation keyframe details (implement after illustrations are final)
- Payment/checkout flow (separate product, not landing page)
- SEO strategy (implement after content is final)

---

## 9. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-18 | 9 AI brains architecture finalized | See `brain-architecture-final.md` |
| 2026-03-19 | Fig.security chosen as primary design reference | Best-in-class illustrated B2B world |
| 2026-03-19 | Airfleet methodology adopted (single hero, plain language, distinctive identity) | Proven at scale across 400+ B2B sites |
| 2026-03-20 | `the-pulse-b.png` style chosen — tall, professional figurines | Roundtable consensus: designer collectible > cute toy |
| 2026-03-20 | All illustrations to be regenerated in new style | Consistency requirement — can't mix art styles |
| 2026-03-20 | Problem sections stay dark, solution sections go light/cream | Lighting transition IS the story |
| 2026-03-20 | Hat stack (scene-hats-piling) confirmed as "Jenga tower" equivalent | Best existing asset, universal metaphor |

---

*This document is a living reference. Update the Decision Log as new choices are made.*
*For character generation prompts, see: `docs/character-prompts-v2.md`*
*For the original Fig analysis, see: `docs/research-fig-security-design-analysis.md`*
