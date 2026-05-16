'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Recipes slideshow — branding roundtable rev 2.
//
// House rule (Vignelli): every slide drifts 1.02 → 1.05 over its full
// duration. No object-position pan. Image is object-fit: contain on a
// near-black field — the WHOLE captured screenshot is on screen.
//
// Sagmeister's exception: one slide (the pivot) is type-only — no image,
// just one italic phrase at full bleed.
//
// Vignelli's exception: the closer pulls 1.08 → 1.00 — ending exactly at
// 1:1. The viewer's eye is allowed to land.
//
// Tufte: no annotation, no scrim, no callouts. The caption lives in a
// bottom letterbox bar, never over the image.
//
// Bourdain wrote the copy.

type ImageSlide = {
  kind: 'image';
  src: string;
  eyebrow: string;
  caption: React.ReactNode;
  ms: number;
  fromScale: number;
  toScale: number;
};

type HeroSlide = {
  kind: 'hero';
  body: React.ReactNode;
  ms: number;
};

type Slide = ImageSlide | HeroSlide;

// SV + Israel top-talent roundtable rev 3 (Atzmon/Chesky/Bourdain/
// Bar-On/Vignelli): tell the engine's story by following ONE dish
// (Tuna Toast) through one night. Closer is a number (266) the operator
// can verify in their POS Monday morning.
const SLIDES: Slide[] = [
  {
    kind: 'image',
    src: '/booth/screens/recipes-crawl/00-baseline.png',
    eyebrow: 'WHILE YOU SLEPT',
    caption: (
      <>
        It re-costed two hundred and seventy dishes. <i>Four need you.</i>
      </>
    ),
    ms: 7000,
    fromScale: 1.02,
    toScale: 1.04,
  },
  {
    kind: 'image',
    src: '/booth/screens/recipes-crawl/14-drift-5-mo.png',
    eyebrow: 'THE WORST ONE',
    caption: (
      <>
        Tuna Toast. Margin slipped six points over four weeks.{' '}
        <i>Sysco raised mayo by eighteen.</i>
      </>
    ),
    ms: 7500,
    fromScale: 1.02,
    toScale: 1.05,
  },
  {
    // Vignelli's gravity beat — hold dead still. The operator must read
    // the receipt; do not move the frame underneath them.
    kind: 'image',
    src: '/booth/screens/recipes-crawl/23-show-math.png',
    eyebrow: 'IT BROUGHT THE MATH',
    caption: (
      <>
        Restaurant Depot has the same chicken breast eleven percent
        cheaper. <i>Receipts attached.</i>
      </>
    ),
    ms: 7000,
    fromScale: 1.0,
    toScale: 1.0,
  },
  {
    kind: 'image',
    src: '/booth/screens/recipes-crawl/11-ambiguous.png',
    eyebrow: 'WHEN IT’S NOT SURE',
    caption: (
      <>
        Three recipes call for avocado. Two suppliers match.{' '}
        <i>It asks before it locks.</i>
      </>
    ),
    ms: 6800,
    fromScale: 1.02,
    toScale: 1.04,
  },
  {
    // Type-only pivot — earns its place.
    kind: 'hero',
    body: <>The book doesn&rsquo;t lie at 2am.</>,
    ms: 5500,
  },
  {
    kind: 'image',
    src: '/booth/screens/recipes-crawl/27-review-draft.png',
    eyebrow: 'IT WROTE THE RECIPE FOR YOU',
    caption: (
      <>
        You added Mango Tango Bowl yesterday.{' '}
        <i>Eight lines. Three eighty-five plate. Yours to approve.</i>
      </>
    ),
    ms: 8000,
    fromScale: 1.02,
    toScale: 1.05,
  },
  {
    // Closer — the number that earns the contract. Bar-On's argument:
    // 266 is the operator's relief, not the engine's brag.
    kind: 'image',
    src: '/booth/screens/recipes-crawl/30-see-the-four-see-the-266.png',
    eyebrow: 'LAST NIGHT, IN ONE LINE',
    caption: (
      <>
        Two hundred and sixty-six dishes didn&rsquo;t move.{' '}
        <i>The four that did are on your bench.</i>
      </>
    ),
    ms: 16000,
    fromScale: 1.1,
    toScale: 1.0,
  },
];

const EASE: [number, number, number, number] = [0.33, 0, 0.4, 1];

export function RecipesSlideshow() {
  const [i, setI] = useState(0);
  const [bumper, setBumper] = useState(false);

  useEffect(() => {
    if (bumper) {
      const t = setTimeout(() => {
        setBumper(false);
        setI(0);
      }, 2400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (i === SLIDES.length - 1) {
        setBumper(true);
      } else {
        setI((n) => n + 1);
      }
    }, SLIDES[i].ms);
    return () => clearTimeout(t);
  }, [i, bumper]);

  const slide = SLIDES[i];

  return (
    <main className="rx-root" data-testid="booth-mockup-recipes">
      <div className="rx-stage">
        <AnimatePresence mode="wait">
          {bumper ? (
            // Station bumper — palm + wordmark, shared with /booth-tv
            <motion.div
              key="bumper"
              className="rx-bumper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="rx-lockup">
                <span className="rx-lockup-palm" aria-hidden="true" />
                <span className="rx-lockup-word">balabite</span>
              </div>
            </motion.div>
          ) : slide.kind === 'hero' ? (
            <motion.div
              key={`hero-${i}`}
              className="rx-hero-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <motion.div
                className="rx-hero-text"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              >
                {slide.body}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key={`slide-${i}`} className="rx-frame">
              <div className="rx-canvas">
                <motion.img
                  src={slide.src}
                  alt={slide.eyebrow}
                  className="rx-img"
                  initial={{ scale: slide.fromScale }}
                  animate={{ scale: slide.toScale }}
                  transition={{ duration: slide.ms / 1000, ease: EASE }}
                  style={{ transformOrigin: '50% 50%' }}
                />
              </div>
              <motion.div
                className="rx-caption"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              >
                <div className="rx-eyebrow">{slide.eyebrow}</div>
                <div className="rx-body">{slide.caption}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress hairline */}
        <motion.div
          key={`progress-${i}-${bumper ? 'b' : 'p'}`}
          className="rx-progress"
          initial={{ width: '0%' }}
          animate={{ width: bumper ? '0%' : '100%' }}
          transition={{
            duration: bumper ? 0.4 : slide.ms / 1000,
            ease: 'linear',
          }}
        />
      </div>
    </main>
  );
}
