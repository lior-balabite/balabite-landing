# Session: Character Regeneration & Design Bible
### March 20, 2026

---

## Goal
Regenerate all AI brain character illustrations in a new professional designer-figurine style (the-pulse-b), create a comprehensive design bible, and begin scene compositions for the landing page.

## What Was Accomplished

### 1. Design Bible Created
- **`docs/design-bible-fig-balabite.md`** — McKinsey-style reference doc covering:
  - Fig.security full technical teardown (121-frame WebP canvas, Airfleet Lightyear, color system)
  - Airfleet agency methodology (6 principles from 400+ B2B sites)
  - BalaBite complete design system (colors, typography, spacing, animation philosophy)
  - Page architecture — 10-section scroll narrative with dark→light transition
  - Character design specs, copy voice guide, CTA strategy
  - Technical implementation map (Fig tool → BalaBite equivalent)

### 2. Character Prompts Written
- **`docs/character-prompts-v2.md`** — Full prompt set for ChatGPT generation
  - Setup prompt locking the style
  - All 9 individual characters + 5 scene prompts
  - Genderless bodies enforced (same build across all 9)
  - No props in individual portraits (hat + pose = identity)
  - Quality checklist and troubleshooting tips

### 3. All 9 Individual Characters Generated
Saved in `public/illustrations/characters/`:
- `the-pulse.png` — Golden crown, calm confident stance
- `menu-brain.png` — Chef's toque, hand on chin thinking
- `guest-brain.png` — Fedora, arm extended welcoming
- `growth-brain.png` — Top hat, hand on hip, attitude
- `market-brain.png` — Safari hat, hand shielding brow, mid-stride
- `kitchen-brain.png` — Bandana + apron, wide stance
- `finance-brain.png` — Green visor, upright precise
- `team-brain.png` — Manager's cap + headset, arms open
- `voice-brain.png` — Headphones, hand to ear, moon+stars

**Style**: Tall genderless kraft paper mannequins, monochrome beige body, hat is the only color/character, warm glowing dot eyes, no props, white background.

### 4. Hero Scene Generated
- `public/illustrations/scenes/hero-calm.png` — The Pulse in commercial kitchen, sunrise, coffee on pass, text space on left. Ready for "Good morning, Chef."

### 5. Team Scene — In Progress
- Generated empty kitchen background (wide panoramic, kraft paper commercial kitchen)
- Attempted full 9-character team scene — got 8-9 characters but with recurring issues:
  - AI keeps adding mouths/smiles (should be eyes only)
  - Headphones bleed to multiple characters (only Voice Brain should have them)
  - Finance Brain (green visor) keeps getting lost or merged
  - Market Brain (safari hat) sometimes merges with Guest Brain (fedora)
  - Kitchen Brain's bandana not always distinct enough

### 6. Old Illustrations Archived
- `public/illustrations/characters-v1/` — all old hat-only illustrations + test versions
- `public/illustrations/scenes/` — old scene illustrations (chaos morning, hats piling, peak chaos, calm morning) kept for potential reuse

## Key Design Decisions Made
- **the-pulse-b.png body + sharper geometric crown** = the style reference
- **Genderless mannequin bodies** — identical build across all 9
- **No props in individual portraits** — props only in scene compositions
- **No wax seals** — unnecessary detail removed
- **Problem sections stay dark, solution sections go light/cream** — lighting transition IS the story
- **Not too Zavo** — confirmed our papercraft style is distinct from Zavo's glossy white mannequins (different material, hats as heads, warm vs cold)

## Files Changed
- `docs/design-bible-fig-balabite.md` — NEW (comprehensive design reference)
- `docs/character-prompts-v2.md` — NEW (generation prompts)
- `public/illustrations/characters/` — NEW (9 character PNGs)
- `public/illustrations/scenes/hero-calm.png` — NEW
- `public/illustrations/characters-v1/` — moved old illustrations here
- `public/illustrations/scenes/` — moved old scenes here

## Next Steps

### 1. Fix the Team Scene (Priority 1)
The 9-character kitchen scene needs work. Two approaches:
- **Option A**: Keep iterating in ChatGPT with the fix prompt (remove mouths, fix headphone bleed, add missing Finance/Market Brain)
- **Option B** (recommended): Take the best generated version, then composite missing/wrong characters individually using Photoshop/Canva. Generate Finance Brain and Market Brain separately in matching lighting, drop them in.

Fix prompt ready in the session — key issues: no mouths, headphones on Voice Brain ONLY, Finance Brain needs visible green visor at desk, Market Brain needs safari hat near window.

### 2. Generate Remaining Scenes
From `docs/character-prompts-v2.md`:
- **Hat Stack (Jenga Tower)** — all 9 hats piled precariously, dark moody kitchen. This is the brand image.
- **The Collapse** — hats flying apart mid-air, cathartic moment
- **The Resolution** — dark-to-light transition, hats finding their bodies

### 3. Redo Characters 0-2 (Optional Polish)
Characters 0 (Pulse), 1 (Menu), 2 (Guest) were generated before the style fully locked with Character 3. They're usable but could be regenerated to match 3-8 more closely. Use Character 3 (Growth Brain) as the reference image.

### 4. Start Building the Landing Page
Once scenes are done, rebuild the page around the scroll narrative:
1. Hero — Pulse + "Good morning, Chef." (hero-calm.png ready)
2. Problem — chaos scenes (existing dark scenes may still work)
3. Breaking point — hat stack + interactive "add one more" moment
4. Resolution — hats become people
5. Team showcase — team scene + individual character cards by pillar
6. Pulse briefing — morning briefing UI mockup
7. CTA — "Your team is ready."

Reference: `docs/design-bible-fig-balabite.md` for full page architecture.

## Resume Instructions

```bash
cd /Users/admin/balabite-landing && npm run dev
```

Read:
- This file (`docs/sessions/2026-03-20_character-regeneration.md`)
- `docs/design-bible-fig-balabite.md` (the design bible)
- `docs/character-prompts-v2.md` (generation prompts)
- `docs/brain-architecture-final.md` (the 9 brains)

Review current illustrations:
- `public/illustrations/characters/` (the 9 new characters)
- `public/illustrations/scenes/hero-calm.png` (hero scene)

Start with: fixing the team scene, then generating the hat stack / collapse / resolution scenes.
