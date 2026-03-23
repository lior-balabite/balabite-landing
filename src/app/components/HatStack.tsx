'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/*
 * THE TURN + THE UNBURYING
 *
 * Act 2: The quiet — empty space, "What if you weren't alone."
 * Act 3: The unburying — 9 figurines appear and take items from the pile.
 *        The pile shrinks. The board levels. The operator looks up.
 *        Each character walks to their station holding their items.
 *
 * Uses scroll-driven animations via Framer Motion useScroll/useTransform.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const staggerIn = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.6 + 0.2 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const briefingItems = [
  'Staff confirmed for tomorrow.',
  'Walk-in temp held steady overnight.',
  'Salmon reorder placed.',
  'Weekend reservations: 34 — up from last week.',
  'Nothing caught fire.',
];

/* The 9 brains — each one takes a category of chaos */
const brains = [
  { name: 'Menu Brain', takes: 'plates, recipes, food costs', image: '/illustrations/characters/menu-brain.png' },
  { name: 'Finance Brain', takes: 'invoices, PAST DUE, margins', image: '/illustrations/characters/finance-brain.png' },
  { name: 'Team Brain', takes: 'scheduling, no-shows, hiring', image: '/illustrations/characters/team-brain.png' },
  { name: 'Kitchen Brain', takes: 'temps, equipment, inventory', image: '/illustrations/characters/kitchen-brain.png' },
  { name: 'Guest Brain', takes: 'reviews, complaints, VIPs', image: '/illustrations/characters/guest-brain.png' },
  { name: 'Voice Brain', takes: 'missed calls, messages, orders', image: '/illustrations/characters/voice-brain.png' },
  { name: 'Growth Brain', takes: 'marketing, traffic, promos', image: '/illustrations/characters/growth-brain.png' },
  { name: 'Market Brain', takes: 'competitors, trends, pricing', image: '/illustrations/characters/market-brain.png' },
  { name: 'The Pulse', takes: 'everything else — your morning briefing', image: '/illustrations/characters/the-pulse.png' },
];

export default function HatStack() {
  const unburyRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the unburying section
  const { scrollYProgress } = useScroll({
    target: unburyRef,
    offset: ['start end', 'end start'],
  });

  // Opacity for the pile shrinking effect
  const pileOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const cleanOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section className="relative bg-cream-100">

      {/* ===== ACT 2: THE QUIET ===== */}
      <div className="h-[30vh]" />

      <div className="flex flex-col items-center justify-center px-6 pb-24">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-cream-500 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          What if
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          You weren&apos;t alone.
        </motion.h2>

        {/* The morning briefing — handwritten note, not a dashboard */}
        <motion.div
          className="mt-16 max-w-md w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <p className="text-sm text-cream-500 italic mb-6">
            Last night, while you slept:
          </p>

          <ul className="space-y-3">
            {briefingItems.map((item, i) => (
              <motion.li
                key={item}
                className={`text-base sm:text-lg leading-relaxed ${
                  i === briefingItems.length - 1
                    ? 'text-primary-900 font-medium mt-6'
                    : 'text-cream-700'
                }`}
                variants={staggerIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <span className="text-cream-400 mr-3">—</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ===== ACT 3: THE UNBURYING ===== */}
      <div ref={unburyRef} className="relative px-6 pb-32">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cream-500 mb-3">
            Meet
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Balabite.
          </h2>
          <p className="text-base sm:text-lg text-cream-600 max-w-lg mx-auto">
            Nine AI brains. Each one takes something off your pile.
          </p>
        </motion.div>

        {/* The unburying visual — pile fading, characters appearing */}
        <div className="relative max-w-5xl mx-auto">

          {/* The pile (fading out as you scroll) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: pileOpacity }}
          >
            <div className="w-48 sm:w-64 opacity-30">
              <Image
                src="/illustrations/scenes/hero1.png"
                alt=""
                width={400}
                height={700}
                className="w-full h-auto"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* The 9 characters grid (fading in) */}
          <motion.div
            className="relative z-10"
            style={{ opacity: cleanOpacity }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-6 lg:gap-4">
              {brains.map((brain, i) => (
                <motion.div
                  key={brain.name}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 * i,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
                    <Image
                      src={brain.image}
                      alt={brain.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-primary-900 mb-1">
                    {brain.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-cream-500 leading-tight">
                    takes the {brain.takes}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* The punchline */}
            <motion.p
              className="text-center mt-16 text-lg sm:text-xl text-cream-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              The pile is gone. The board is level.{' '}
              <span className="font-semibold text-primary-900">You look up.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream-100" />
    </section>
  );
}
