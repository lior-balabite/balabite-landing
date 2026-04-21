# Fig.security — Technical Implementation Report
### How They Built It | March 19, 2026

---

## Executive Summary

Fig.security is built on **WordPress** with a custom theme called **Airfleet Lightyear** (`wp-theme-airfleet-lightyear`). The visual magic comes from a combination of **pre-rendered illustration PNGs**, **Lottie animations rendered via WebGL canvases**, **MP4 video loops**, and **Swiper.js carousels**. There is NO GSAP, NO Framer Motion, NO Three.js. The interactivity is simpler than it looks.

---

## 1. Platform & Stack

| Layer | Technology |
|-------|-----------|
| **CMS** | WordPress (body class: `wp-singular page-template-default`) |
| **Theme** | Airfleet Lightyear (custom, likely agency-built) |
| **Component System** | Custom BEM-style: `afb-` (blocks), `afc-` (components), `afp-` (patterns), `afu-` (utilities) |
| **Animation** | Lottie (WebGL canvas renderer), CSS keyframes, native video |
| **Carousel** | Swiper.js (3 instances on page) |
| **Hosting** | Likely WP Engine or similar managed WordPress |
| **CDN/Assets** | wp-content/uploads/ (standard WP media library) |

### What They DON'T Use
- No GSAP / ScrollTrigger
- No Framer Motion
- No Three.js / WebGL 3D
- No Spline
- No React / Next.js
- No Webflow / Framer
- No AOS (Animate On Scroll)
- No custom scroll-driven animations library

**Key insight**: The site FEELS like a heavily custom-coded experience but is actually WordPress with smart use of pre-rendered assets. The "magic" is in the CONTENT (illustrations, videos), not the code.

---

## 2. The Hero Section — Jenga Tower

### How the tower works

The hero uses a `<canvas>` element with id `homepage-hero-canvas` (1920x1080).

```html
<canvas id="homepage-hero-canvas" class="afb-homepage-hero-v2__canvas" width="1920" height="1080"></canvas>
```

This canvas is NOT WebGL — it's a 2D canvas. The tower animation is driven by **inline JavaScript** (base64-encoded in `<script>` tags). The animation:

1. On page load: tower is static (a pre-rendered frame sequence or sprite sheet drawn to canvas)
2. "Play tower animation" button triggers the collapse sequence
3. The canvas draws frame-by-frame to show blocks falling

**The tower itself is a pre-rendered animation** — not real-time 3D. It was likely created in **After Effects** or a **3D tool** (Blender, Cinema 4D), exported as a frame sequence, and played back on canvas. This is a common technique for complex animations that need to feel interactive but don't need real-time computation.

### The "DO NOT touch" interaction

- A static PNG of a hand pointing (`/wp-content/uploads/2026/01/Hand.png`) is positioned next to the tower
- The red button is likely part of the tower illustration or a positioned HTML element
- Clicking triggers the canvas animation (tower collapse)
- The "this button you can touch" text appears near the product demo section as a callback

### Implementation for BalaBite
```
Option A: Pre-render a "ticket queue collapse" animation in After Effects/Rive,
          export as frame sequence, play on canvas click.
Option B: Use Rive (rive.app) for interactive vector animation — more flexible
          than frame sequences, smaller file size.
Option C: Use Lottie for the animation with a click trigger.
```

---

## 3. Lottie Animations (WebGL)

Fig uses **3 Lottie players** on the page, rendered via WebGL canvases (500x500px each).

```html
<canvas class="afp-lottie-player__canvas" width="500" height="500"></canvas>
```

These are used for:
- Small character animations (the animals doing actions)
- Micro-interactions on feature cards
- The "before/after" illustration transitions on the feature section

### Lottie Component System

```
afc-lottie           — container
afc-lottie-player    — the player wrapper
afc-lottie-poster    — static fallback image shown before animation loads
afp-lottie-player    — pattern-level player with WebGL canvas
```

**How they work**: Each Lottie animation has a **poster image** (static PNG) that shows immediately. The Lottie JSON loads asynchronously, and when ready, replaces the poster with the animated version on the WebGL canvas. This means:
- Page loads FAST (posters are tiny PNGs)
- Animations appear smooth (WebGL rendering, not CSS)
- No jank on scroll (Lottie handles its own render loop)

### Implementation for BalaBite
```
Use @lottiefiles/react-lottie-player or @rive-app/react-canvas.
Each brain character can have:
  - A static PNG poster (loads instantly)
  - A Lottie/Rive animation that plays on scroll-into-view or hover
  - Small file size (Lottie JSONs are typically 50-200KB)
```

---

## 4. Video Strategy

Fig has **12 video elements** on the page. Most use lazy-loaded sources (src is empty until scrolled into view).

### Video types found:

| Type | Count | Purpose |
|------|-------|---------|
| Autoplay + loop + muted | 4 | Background/ambient character animations |
| Click-to-play + loop + muted | 8 | Product demos, feature showcases |

### Key video:
```
/wp-content/uploads/2026/01/Lion-4.mp4  — Lion character animation
```

### Video component system:
```
afc-video              — container
afc-video-file         — the video element wrapper
afc-video-overlay      — overlay (poster/play button)
afc-video-play-button  — the play button
afc-video-poster       — poster image before play
afp-video-file         — pattern-level video
afp-video-vimeo        — Vimeo embed variant
```

### Lazy loading pattern:
Videos have `no-lazy` class for above-fold content, and standard lazy loading for below-fold. Sources are injected via JavaScript when the video enters the viewport (IntersectionObserver).

### Implementation for BalaBite
```
Use next/dynamic + IntersectionObserver for lazy video loading.
Character animation videos: render in 3D tool, export as MP4 (< 2MB each).
Product demo videos: screen recordings with illustrated frame overlay.
Keep videos SHORT (3-8 seconds), looping, muted, autoplay on scroll.
```

---

## 5. Illustration Assets

All illustrations are stored as **static PNGs** in WordPress media library:

```
/wp-content/uploads/2026/02/bottom-layer-v3-1.webp    — Tower base layer
/wp-content/uploads/2026/02/Frame-427321288.png        — Feature card illustration
/wp-content/uploads/2026/02/Frame-427321289.png        — Feature card illustration
/wp-content/uploads/2026/02/Frame-427321290.png        — Feature card illustration
/wp-content/uploads/2026/02/Image-2.png                — Product screenshot
/wp-content/uploads/2026/01/Hand.png                   — Pointing hand illustration
/wp-content/uploads/2026/01/1-13.png                   — Testimonial photo
/wp-content/uploads/2026/01/2-11.png                   — Testimonial photo
/wp-content/uploads/2026/01/3-13.png                   — Testimonial photo
/wp-content/uploads/2026/01/4-10.png                   — Testimonial photo
/wp-content/uploads/2026/01/logo.svg                   — Fig logo (SVG)
```

### Image format strategy:
| Format | Count | Usage |
|--------|-------|-------|
| PNG | 54 | Illustrations, character art, UI elements |
| WebP | 3 | Optimized background layers |
| SVG | 4 | Logo, icons |

### Key insight:
54 out of 61 images are **PNG**. The illustrations are NOT SVG — they're raster images. This means they were likely:
1. Created in a 3D tool (Blender/C4D) or illustration tool (Procreate/Photoshop)
2. Exported as high-res PNG with transparency
3. Uploaded to WordPress
4. Displayed with CSS positioning and lazy loading

**Almost all images use `loading="lazy"`** (54 out of 61). Only the above-fold hero elements load eagerly.

### Implementation for BalaBite
```
Same approach: create illustrations as PNGs with transparency.
Use next/image with priority={true} for hero, lazy loading for rest.
Consider WebP for larger illustrations (30-50% smaller than PNG).
Store in /public/illustrations/ directory.
```

---

## 6. Carousel / Slider (Swiper.js)

**3 Swiper instances** on the page:

1. **Testimonial carousel** — horizontal scroll through 4 CISO quotes, with custom navigation arrows
2. **Benefits carousel** — horizontal scroll through 5 benefit cards (each with character animation)
3. **Logo ticker** — infinite horizontal scroll of integration logos

### CSS animation for logo ticker:
```css
@keyframes ticker {
  /* 20s linear infinite — standard marquee effect */
}
.afb-side-by-side-logos__carousel .afb-side-by-side-logos__media {
  animation: 20s linear 0s infinite normal none running ticker;
}
```

### Implementation for BalaBite
```
Option A: Swiper.js (what Fig uses) — well-tested, accessible, good touch support
Option B: embla-carousel (lighter, React-native, used by shadcn/ui)
Option C: CSS-only for the logo ticker (just CSS animation, no JS needed)

For testimonials: Swiper or embla with custom arrows
For logo ticker: Pure CSS animation (duplicate the logo row, animate translateX)
```

---

## 7. Tab Interface (Product Demo Section)

Fig uses a custom tab component for "Drift vs Planned changes":

```
afb-new-tabs — block-level tab container
[role="tab"] — standard ARIA tabs
[role="tabpanel"] — standard ARIA tabpanels
```

Each tab switches:
- A video player (product demo)
- Associated descriptive content

The tabs use standard ARIA roles — accessible, semantic, no framework needed.

### Implementation for BalaBite
```
Can build with Framer Motion's AnimatePresence for tab transitions.
Or use Radix UI Tabs for accessible primitives + custom styling.
Each tab shows a different brain's product demo (Menu Brain view, Guest Brain view, etc.)
```

---

## 8. CSS Architecture

### Only 4 CSS keyframe animations on the entire page:

| Animation | Purpose |
|-----------|---------|
| `afu-animation-video-spinner` | Loading spinner for videos |
| `swiper-preloader-spin` | Swiper loading indicator |
| `ticker` | Infinite logo marquee scroll |
| `CookiebotWidgetFadeIn` | Cookie banner fade-in |

**That's it.** No complex CSS animations. No scroll-triggered CSS. The "animation" feeling comes from Lottie and video, not CSS.

### Component naming convention (BEM-like):
```
afb- = Airfleet Block (page-level sections)
afc- = Airfleet Component (reusable UI elements)
afp- = Airfleet Pattern (composed components)
afu- = Airfleet Utility (helper classes)

Modifiers: --style-default, --state-loading
Children: __canvas, __media, __item, __carousel
```

---

## 9. Performance Strategy

| Technique | Implementation |
|-----------|---------------|
| **Lazy loading images** | 54/61 images use `loading="lazy"` |
| **Lazy loading videos** | Sources injected on scroll via IntersectionObserver |
| **Lottie poster pattern** | Static PNG shown instantly, animation loads async |
| **No heavy JS frameworks** | No React, no Vue — vanilla JS + WordPress |
| **Minimal CSS animations** | Only 4 keyframe animations total |
| **WebP for large images** | Used for background layers |

---

## 10. Complete Technology Summary for BalaBite Adaptation

### What Fig Uses → What BalaBite Should Use

| Fig's Approach | BalaBite Equivalent | Notes |
|---------------|-------------------|-------|
| WordPress + Airfleet theme | Next.js 16 (already in place) | Better performance, better DX |
| Canvas 2D for hero animation | **Rive** or **Lottie on canvas** | Interactive animation on click/scroll |
| Lottie via WebGL canvases | **@lottiefiles/react-lottie-player** | Character animations, micro-interactions |
| MP4 video loops | **next/video** or HTML5 video with lazy loading | Product demos, character animations |
| Static PNG illustrations | **PNG/WebP in /public/** via next/image | Character art, scene illustrations |
| Swiper.js carousels | **embla-carousel** (lighter, React-native) | Testimonials, benefit cards |
| CSS ticker animation | **CSS animation** (same approach) | Logo/integration marquee |
| ARIA tabs | **Radix UI Tabs** or custom | Product feature tabs |
| IntersectionObserver | **Framer Motion whileInView** (already using) | Scroll-triggered reveals |
| BEM CSS naming | **Tailwind 4** (already in place) | Utility-first |

### Key Takeaway

Fig's technical implementation is **deceptively simple**. The wow factor comes from:

1. **High-quality pre-rendered illustrations** (the hardest part — requires artist/3D tool)
2. **Lottie animations** for character movement (created in After Effects, exported as Lottie JSON)
3. **Short MP4 loops** for product demos and ambient character animation
4. **One interactive canvas moment** (the tower collapse on click)
5. **Standard carousels** (Swiper.js) for horizontal content

The CODE is not complex. The ART is what makes it special. BalaBite's technical stack (Next.js + Framer Motion + Tailwind) is actually MORE capable than Fig's WordPress setup. The bottleneck is the illustrations, not the engineering.

---

### Implementation Checklist for BalaBite

```
[ ] Create character illustrations (PNG/WebP) — AI generation + refinement
[ ] Create Lottie/Rive animations for key characters (idle, action, reaction)
[ ] Record short product demo videos (3-8 second loops, muted)
[ ] Build interactive "DO NOT touch" moment using Rive or canvas
[ ] Implement embla-carousel for testimonials + benefit cards
[ ] Add CSS-only logo ticker for integrations
[ ] Use next/image with lazy loading for all illustrations
[ ] Add poster images for videos (show instantly, video loads async)
[ ] Implement tab interface for brain feature showcase
[ ] Switch to light/cream background (#FAF5EE)
```

---

*Technical analysis conducted via Playwright browser inspection.*
*Source: fig.security (accessed March 19, 2026)*
