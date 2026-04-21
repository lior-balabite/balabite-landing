# Fig.security — Design System Analysis
### Competitive Intelligence Report | March 2026
### For: BalaBite.ai Landing Page Redesign

---

## Executive Summary

Fig Security has built one of the most distinctive B2B SaaS landing pages in the 2025-2026 Israeli startup landscape. Their approach rejects every convention of enterprise security marketing (dark mode, circuit boards, shields, lock icons) and instead builds an **illustrated narrative world** that makes a complex product immediately understandable and deeply memorable.

This report deconstructs Fig's design system for adaptation to BalaBite.ai's restaurant AI platform.

---

## 1. Visual Identity System

### 1.1 The Illustrated World

Fig's entire brand exists inside a single, cohesive illustration universe:

- **The Jenga Tower** — a towering stack of colorful, patterned blocks that IS the central metaphor. The tower represents the SOC (Security Operations Center) stack — fragile, complex, and one wrong move from collapse. This single image communicates the entire product problem.
- **Animal Characters** — each animal is a SOC persona:
  - **Sloth with magnifying glass** — the investigator, slow and methodical
  - **Owl reading blueprints** — the architect/planner
  - **Eagle/bird with hard hat** — the builder/deployer on a ladder
  - **Elephant carrying a block** — the heavy lifter, moving infrastructure
  - **Duck with popcorn** — the observer (watching the demo, literally)
  - **Wolf/fox** — the threat actor or watchful guardian
  - **Frog/chameleon** — adaptability
- **All characters wear the same patterned outfit** (green/orange/purple checkerboard) — this is the "Fig uniform," creating visual unity across every illustration
- **Art style**: Low-poly/papercraft aesthetic — not quite 3D, not quite flat. Feels handmade, tactile, warm. Like a children's book illustration for adults.

### 1.2 Color Palette

| Element | Color | Hex (approx) |
|---------|-------|---------------|
| Background | Warm cream/off-white | #FAF5EE |
| Text | Near-black | #1A1A1A |
| Character outfits | Green, orange, purple checkerboard | Multi |
| Tower blocks | Pink, green, purple, orange, teal | Saturated pastels |
| CTA buttons | Black with white text | #000000 |
| Accent (tags/labels) | Soft pastels on cards | Various |
| Disco ball | Silver/chrome | Metallic |

**Key insight**: NO brand accent color. The illustration palette IS the brand. The UI is pure black + cream + the illustrations provide all the color. This is the opposite of BalaBite's current multi-accent approach.

### 1.3 Typography

- **Headlines**: Serif font (appears to be a custom or Stack Sans Headline variant), very large, bold weight. Headlines feel editorial, like a magazine cover.
- **Body**: Sans-serif (Stack Sans Text), lightweight (300), generous line height.
- **Section labels**: All-caps, letterspaced, small — "SAY HELLO TO", "DRIFT (UNPLANNED CHANGES)", "OUR RESOURCES"
- **Personality copy**: Mixed weights within sentences — bold keywords inline. e.g., "Keep your detection and response working through **any change**"

### 1.4 Typography Hierarchy Examples

```
Label:    SAY HELLO TO (12px, caps, letterspaced, muted)
Headline: Security Operations Resilience (48-64px, serif, bold)
Body:     Keep your detection and response working through any change (18px, light, generous leading)
CTA:      Get a demo (16px, black button, white text)
```

---

## 2. Page Structure & Flow

### Section-by-Section Breakdown

| # | Section | Content | Visual Element | Emotional Beat |
|---|---------|---------|---------------|----------------|
| 0 | **Announcement bar** | RSAC Sandbox Top 10 Finalist | Black bar, full width | Credibility/urgency |
| 1 | **Hero** | "Don't break for a change." + subheadline + CTA | Jenga tower (right half of viewport), hand pointing at "DO NOT touch" button | Curiosity + humor |
| 2 | **Problem: Drift** | "Your SOC is deathly allergic to two types of changes: drift" | Tower with disco ball wrecking ball, sloth investigating, builder on ladder | Fear/recognition |
| 3 | **Problem: Planned** | "planned changes" — changes go so slow "you can hear the grass grow" | Elephant carrying block carefully | Empathy |
| 4 | **Solution intro** | "Say hello to Security Operations Resilience" | Tab interface: Drift vs Planned | Relief/hope |
| 5 | **Product demo** | Tabbed video player inside illustrated laptop, "this button you can touch" with red button | Laptop with characters peeking out, red button | Delight/interaction |
| 6 | **Features grid** | 4 capability cards: drift detection, drift repair, model changes, deploy | Mini tower illustrations per card (sketched vs. colored = before/after) | Understanding |
| 7 | **Testimonials** | "People we like, saying things we like" — 4 CISO quotes with photos | Colorful background cards, carousel | Trust |
| 8 | **Product demo 2** | "See Fig in action" — video with dashboard, characters watching | Animals sitting watching a presentation screen, popcorn duck | Delight |
| 9 | **Benefits carousel** | "With change under control, you..." — 5 benefit cards | Each card has a unique character animation | Aspiration |
| 10 | **Integrations** | "We don't play favorites" — logo grid | Scattered grid layout, not a boring row | Confidence |
| 11 | **Trust/Compliance** | "We take security personally" — SOC2, ISO 27001 | Illustrated badge ribbons with characters | Reassurance |
| 12 | **Resources** | 3 blog/guide cards with author attribution | Clean cards, minimal | Authority |
| 13 | **Final CTA** | "Don't break for a change." — repeat hero line | Tower animation replay | Closure |
| 14 | **Footer** | Links + illustrated construction scene | Animals building a wall together | Community/warmth |

### Flow Pattern

```
HOOK (humor + visual) → PROBLEM (fear + empathy) → SOLUTION (relief) →
PRODUCT (proof) → TRUST (testimonials) → BENEFITS (aspiration) →
CREDIBILITY (integrations + compliance) → CONTENT (authority) → CTA (action)
```

---

## 3. Interactive & Animation Design

### 3.1 The "DO NOT Touch" Button

- A hand-drawn pointing finger next to a red button on the tower
- Copy: "DO NOT touch this parser. It's fine. Everything's fine. (No idea what it does.)"
- On click: the top of the tower collapses/breaks apart
- This is the SINGLE MOST MEMORABLE MOMENT on the page
- It communicates the product problem (fragility) through PLAY, not explanation

### 3.2 The Red Button at Product Demo

- "this button you can touch" — inverts the earlier joke
- Positioned next to the illustrated laptop showing the product
- Creates a callback/payoff to the earlier interactive moment

### 3.3 The Tower as Scroll Narrative

- The Jenga tower spans from the hero through the problem section
- As you scroll, the tower context changes — wrecking ball appears, characters appear around it
- The tower IS the scroll experience — you're moving through the story spatially

### 3.4 Feature Cards: Sketch → Color

- The "before" state of each feature card shows a pencil-sketched tower (broken/unstable)
- The "after" state shows a full-color, solid tower (repaired/stable)
- This before/after visual metaphor communicates "Fig fixes this" without a word

### 3.5 Character Carousel

- Benefits section uses a horizontal carousel where each card features a different character performing an action
- The character IS the benefit visualization

---

## 4. Copy & Voice Analysis

### Tone
- **Irreverent**: "People we like, saying things we like" (testimonials header)
- **Self-aware**: "No idea what it does" (admitting complexity with humor)
- **Direct**: "Don't break for a change." (5 words. Period.)
- **Human**: "Deploy without drama" / "soul-crushing data plumbing"
- **NOT corporate**: Zero jargon headers. Zero "leverage" or "synergy"

### Copy Patterns
- Headlines are SHORT (3-6 words)
- Body copy is conversational, uses "you" and "your"
- Section transitions use small-caps labels ("SAY HELLO TO", "GET A PERSONALIZED DEMO")
- Feature descriptions are one sentence each
- Humor is placed at INTERACTION POINTS (buttons, CTAs), not randomly

### Headlines Catalog
1. "Don't break for a change."
2. "Your SOC is deathly allergic to two types of changes:"
3. "Say hello to Security Operations Resilience"
4. "Get a handle on change"
5. "People we like, saying things we like"
6. "See Fig in action"
7. "With change under control, you..."
8. "We don't play favorites"
9. "We take security personally"
10. "Explore the world of Fig"

---

## 5. What Fig DOESN'T Have

- No vanity metrics (zero "10,000 customers" or "99.9% uptime")
- No pricing page
- No feature comparison tables
- No logo carousel/trust bar (just a casual grid)
- No dark mode
- No gradients on UI elements
- No animated text rotations
- No video autoplay
- Minimal navigation (just Resources, About, Get a demo)

**What this proves**: You don't need metrics, dark mode, or feature dumps to build a premium, converting page. You need a STORY.

---

## 6. Adaptation Framework for BalaBite.ai

### The Translation

| Fig Concept | BalaBite Equivalent |
|-------------|-------------------|
| Jenga tower (fragile SOC stack) | Restaurant kitchen chaos (orders piling up, tickets everywhere, understaffed line) |
| Animal personas (sloth, owl, eagle...) | AI specialist characters (Menu Brain, Revenue Brain, Ops Brain, Customer Brain) |
| "Don't break for a change" | "You run the restaurant. Your AI partner runs the rest." |
| "DO NOT touch this parser" | "DO NOT touch this ticket queue" (interactive — clicking causes chaos) |
| Wrecking ball (drift breaking things) | Clock hitting 7PM Friday rush (chaos trigger) |
| Tower blocks = SOC components | Kitchen elements = orders, ingredients, staff schedules, guest preferences |
| Sketch → Color (before/after) | Chaos → Calm (before/after BalaBite) |
| Characters watching demo | AI specialists gathered around the Pulse morning briefing |
| "People we like, saying things we like" | Same — or "Chefs who get it" |

### Character Design Direction

Each BalaBite AI specialist should be a CHARACTER, not a dashboard:

1. **Menu Brain** — A warm, round character with a chef's toque, always analyzing/tasting. Carries a clipboard with dish scores. Personality: curious, opinionated, passionate about food.

2. **Revenue Brain** — Sharper, more geometric. Wears an apron with a calculator pocket. Always surrounded by floating numbers/charts. Personality: precise, eagle-eyed, protective.

3. **Operations Brain** — Stocky, strong, wearing a headset. Holds a stopwatch in one hand and a schedule in the other. Personality: efficient, calm under pressure, the anchor.

4. **Customer Brain** — Soft, approachable, wearing a maître d' vest. Surrounded by heart icons and guest profile cards. Personality: empathetic, remembers everything, the host.

5. **The Pulse** — The central character. An orb/being that all four specialists orbit around. The conductor. Appears in the morning briefing scene, in the hero, and at the final CTA.

### Art Style Adaptation

- Fig uses **low-poly/papercraft** — BalaBite should use a similar **warm, tactile, handmade** style
- NOT robotic, NOT neon, NOT circuit-board
- Think: Pixar meets restaurant kitchen
- Warm palette: ambers, terracotta, sage green, cream, warm purple
- Same character outfit/pattern concept (BalaBite "uniform" = kitchen apron in a signature pattern?)
- Light background (cream/warm white) — **consider switching from dark mode**

### Page Structure Adaptation

```
1. Hero: "You run the restaurant." + AI characters greeting the visitor
2. Problem: Kitchen chaos illustration (before BalaBite)
3. Meet your partner: Pulse orb + 4 specialists introduced as characters
4. Interactive moment: "DO NOT touch this ticket queue" → chaos → Pulse restores order
5. Product demo: Dashboard inside illustrated scene (like Fig's laptop)
6. Features: Each specialist gets a card with their character + what they found
7. Guest experience: Phone mockup held by the Customer Brain character
8. Testimonials: "Chefs who get it" (when available)
9. Integrations: POS logos in Fig-style casual grid
10. CTA: Characters gathered around a table, one empty chair → "Your seat at the table"
```

---

## 7. Implementation Requirements

### What You Need (Can't Code This)
- **Illustrator/3D artist** who can create the character set in a consistent style
- Reference brief: "Fig.security meets restaurant kitchen, Pixar warmth, low-poly/papercraft"
- Deliverables needed: 5 characters (4 specialists + Pulse), 10-15 scene illustrations, tower/kitchen chaos hero scene
- Budget estimate: $2,000-5,000 for a full illustration set from a skilled freelancer
- Timeline: 2-3 weeks for illustration, 1 week for integration

### What Can Be Coded Now
- Light background + black text + cream palette
- Serif headlines + sans-serif body (typography upgrade)
- Section structure matching Fig's flow
- Interactive "DO NOT touch" moment (the button/animation logic)
- Illustration PLACEHOLDER frames (sized, positioned, ready for art to drop in)
- Tab-based product showcase
- Testimonial carousel structure
- Casual integration grid layout

### Recommended Illustrator Brief Keywords
"Low-poly papercraft illustration, warm restaurant characters, AI brain specialists as friendly creatures, kitchen scene, amber/terracotta/sage palette, Pixar warmth, Fig.security art style reference, B2B SaaS with personality"

---

*Report prepared for BalaBite.ai strategic design direction.*
*Reference: fig.security (accessed March 18, 2026)*
