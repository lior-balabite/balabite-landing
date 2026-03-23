'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/*
 * THE TURN + THE UNBURYING
 *
 * The transition from chaos to calm. Three beats:
 * 1. The quiet — breathing room after the avalanche
 * 2. The question — "What if you weren't alone."
 * 3. The unburying — characters appear, each taking a piece of the pile
 */

const staggerIn = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const briefingItems = [
  'Staff confirmed for tomorrow.',
  'Walk-in temp held steady overnight.',
  'Salmon reorder placed.',
  'Weekend reservations: 34 — up from last week.',
  'Nothing caught fire.',
];

const brains = [
  { name: 'Menu Brain', takes: 'plates, recipes, food costs', image: '/illustrations/characters/menu-brain.png' },
  { name: 'Finance Brain', takes: 'invoices, PAST DUE, margins', image: '/illustrations/characters/finance-brain.png' },
  { name: 'Team Brain', takes: 'scheduling, no-shows, hiring', image: '/illustrations/characters/team-brain.png' },
  { name: 'Kitchen Brain', takes: 'temps, equipment, inventory', image: '/illustrations/characters/kitchen-brain.png' },
  { name: 'Guest Brain', takes: 'reviews, complaints, VIPs', image: '/illustrations/characters/guest-brain.png' },
  { name: 'Voice Brain', takes: 'missed calls, messages, orders', image: '/illustrations/characters/voice-brain.png' },
  { name: 'Growth Brain', takes: 'marketing, traffic, promos', image: '/illustrations/characters/growth-brain.png' },
  { name: 'Market Brain', takes: 'competitors, trends, pricing', image: '/illustrations/characters/market-brain.png' },
  { name: 'The Pulse', takes: 'your morning briefing', image: '/illustrations/characters/the-pulse.png' },
];

export default function HatStack() {
  const turnRef = useRef<HTMLDivElement>(null);
  const unburyRef = useRef<HTMLDivElement>(null);

  // Scroll-driven transition: the "what if" line scales up as you scroll into it
  const { scrollYProgress: turnProgress } = useScroll({
    target: turnRef,
    offset: ['start end', 'center center'],
  });
  const turnScale = useTransform(turnProgress, [0, 1], [0.85, 1]);
  const turnOpacity = useTransform(turnProgress, [0, 0.5, 1], [0, 0.3, 1]);

  // Scroll-driven unburying: pile fades, characters appear
  const { scrollYProgress: unburyProgress } = useScroll({
    target: unburyRef,
    offset: ['start end', 'end start'],
  });
  const pileOpacity = useTransform(unburyProgress, [0.1, 0.35], [1, 0]);
  const cleanOpacity = useTransform(unburyProgress, [0.25, 0.5], [0, 1]);

  return (
    <section className="relative bg-cream-100">

      {/* ===== THE QUIET — empty space, the exhale ===== */}
      <div className="h-[50vh]" />

      {/* ===== THE TURN — scroll-driven scale + fade ===== */}
      <div ref={turnRef} className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center"
          style={{
            scale: turnScale,
            opacity: turnOpacity,
          }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cream-400 mb-6">
            What if
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900">
            You weren&apos;t alone.
          </h2>
        </motion.div>
      </div>

      {/* ===== THE BRIEFING — what "not alone" looks like ===== */}
      <div className="flex flex-col items-center px-6 pb-24">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
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

      {/* ===== THE UNBURYING — characters take the pile apart ===== */}
      <div ref={unburyRef} className="relative px-6 pb-32">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cream-500 mb-3">
            Meet
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Balabite.
          </h2>
          <p className="text-base sm:text-lg text-cream-600 max-w-lg mx-auto">
            Each one takes something off your pile.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Ghost pile fading out */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: pileOpacity }}
          >
            <div className="w-48 sm:w-56 opacity-20">
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

          {/* Characters grid appearing */}
          <motion.div className="relative z-10" style={{ opacity: cleanOpacity }}>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-6 lg:gap-4">
              {brains.map((brain, i) => (
                <motion.div
                  key={brain.name}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              className="text-center mt-20 text-lg sm:text-xl text-cream-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              The pile is gone. The board is level.{' '}
              <span className="font-semibold text-primary-900">You look up.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
