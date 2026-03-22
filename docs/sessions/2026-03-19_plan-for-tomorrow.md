# Plan for Tomorrow — March 20, 2026

## Honest Assessment

We built the infrastructure (stack, components, i18n, form) and generated good character illustrations. But the page is still a **feature list with pictures**, not a **story with a world**. Fig doesn't work because of their illustrations alone — it works because the Jenga tower IS the scroll experience. You don't read about the problem — you WATCH it happen.

We're missing the equivalent of that.

---

## What Fig Has That We Don't (Yet)

| Fig | BalaBite | Gap |
|-----|----------|-----|
| Jenga tower spans the entire page as a scroll narrative | Hat illustrations placed in static cards | No scroll narrative, no centerpiece visual |
| "DO NOT touch" interactive moment — click → tower collapses | Nothing interactive | No play, no delight, no shareability |
| "this button you can touch" — callback payoff | Nothing | No humor arc |
| Tower context changes as you scroll (wrecking ball, characters appear) | Sections are independent, no visual thread | No continuity between sections |
| Before/after (sketch → color) on feature cards | Text descriptions of features | No visual transformation |
| Characters watching the product demo (from behind, with popcorn) | Empty phone mockup placeholder | No product showcase moment |
| Irreverent copy at interaction points | Copy is good but safe | Missing the personality that makes you SHARE the link |

---

## The Core Question

**What is BalaBite's Jenga tower?**

Fig's tower = a fragile stack that represents the SOC. One wrong move breaks it. The product prevents that.

BalaBite needs ONE visual metaphor that:
1. Spans the page (not contained in one section)
2. Represents the restaurant owner's reality
3. Changes as you scroll (gets worse → gets better)
4. Has an interactive moment
5. IS the brand identity

### Candidates:

**A. The Hat Stack**
A pile of hats stacked precariously on one head (the owner). As you scroll:
- Problem section: more hats pile on, the stack wobbles
- Interactive moment: "Try adding one more hat" → click → they all fall
- Solution: the hats float off the owner's head, each one starts glowing, finds its place
- Rest of page: each hat is at its station, doing its job

**B. The Kitchen Line**
A restaurant kitchen pass/line that runs across the page. As you scroll:
- It starts calm (dawn, empty kitchen)
- Orders start appearing (tickets, chaos builds)
- Peak rush: chaos, tickets flying, pots boiling over
- Interactive moment: "DO NOT touch this ticket queue" → click → tickets explode
- The hats appear on the line, each one taking a station
- Order is restored

**C. The Owner's Day**
A clock or timeline running down the page. As you scroll:
- 5am: alarm goes off
- 6am: checking phone, seeing problems
- 7am: dealing with vendor calls, staff no-shows
- 11am: prep chaos
- 7pm: Friday rush, everything on fire
- Interactive moment: "Rewind to 5am — but this time, with BalaBite"
- Same timeline, but the Pulse handles everything while the owner drinks coffee

---

## Tomorrow's Priorities (In Order)

### 1. Decide the centerpiece metaphor (30 min)
Pick A, B, or C (or something new). This decision shapes everything else.

### 2. Generate the key visual (2-3 hours)
Use ChatGPT/Midjourney to create the centerpiece illustration set:
- If Hat Stack: the wobbling pile, the falling moment, the floating-to-stations moment
- If Kitchen Line: calm → chaos → order sequence
- If Owner's Day: the timeline scenes

### 3. Build the interactive moment (2 hours)
Code the "DO NOT touch" equivalent. This is achievable with:
- A static illustration of the precarious state
- A CSS/Framer Motion animation triggered on click (things fall apart)
- A second state that shows order restored
- Can be canvas-based (like Fig) or pure CSS/motion

### 4. Redesign the page flow as a scroll narrative (3 hours)
Instead of 8 independent sections, make the page ONE continuous story:
- The visual centerpiece appears in the hero
- It CHANGES as you scroll through the problem section
- The team/brains section shows the resolution
- The Pulse briefing shows the new normal
- The CTA closes the arc

### 5. Polish copy with Fig-level personality (1 hour)
Add irreverent, self-aware humor at interaction points:
- "DO NOT touch this ticket queue. It's fine. Everything's fine. (Nobody's crying in the walk-in.)"
- "this button you can touch" on the product demo
- "Chefs who get it" instead of "Testimonials"
- "We work with what you already have. (Yes, even that POS from 2019.)"

---

## What NOT to Do Tomorrow

- Don't polish existing sections. They'll change once the centerpiece is decided.
- Don't update translations for other languages. English first, translate later.
- Don't fix responsive issues yet. Get the desktop story right first.
- Don't add more brains/features. The 8 are set. Focus on presentation.

---

## Resume Instructions

```bash
cd /Users/admin/balabite-landing && npm run dev
```

Read:
- This file
- `docs/research-fig-security-design-analysis.md` (the design bible)
- `docs/research-fig-security-technical-implementation.md` (how to build it)
- `docs/brain-architecture-final.md` (the 9 brains)

Start with: "What's our Jenga tower?"
