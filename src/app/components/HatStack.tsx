'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const staggerIn = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* Updated briefing items — things Balabite actually handles */
const briefingItems = [
  'Staff confirmed for tomorrow. No gaps.',
  'Menu margin alert: swap the halibut special.',
  'Weekend reservations: 34 — 12 are regulars.',
  'Google review responded. Yelp flagged.',
  'Nothing caught fire.',
];

const brains = [
  { name: 'Menu Brain', takes: 'recipes, pricing, food costs', image: '/illustrations/characters/menu-brain.png' },
  { name: 'Finance Brain', takes: 'invoices, margins, P&L', image: '/illustrations/characters/finance-brain.png' },
  { name: 'Team Brain', takes: 'scheduling, no-shows, hiring', image: '/illustrations/characters/team-brain.png' },
  { name: 'Kitchen Brain', takes: 'prep, waste, equipment', image: '/illustrations/characters/kitchen-brain.png' },
  { name: 'Guest Brain', takes: 'reviews, VIPs, loyalty', image: '/illustrations/characters/guest-brain.png' },
  { name: 'Voice Brain', takes: 'calls, orders, messages', image: '/illustrations/characters/voice-brain.png' },
  { name: 'Growth Brain', takes: 'marketing, traffic, promos', image: '/illustrations/characters/growth-brain.png' },
  { name: 'Market Brain', takes: 'competitors, trends, pricing', image: '/illustrations/characters/market-brain.png' },
  { name: 'The Pulse', takes: 'your morning briefing', image: '/illustrations/characters/the-pulse.png' },
];

export default function HatStack() {
  const turnRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: turnProgress } = useScroll({
    target: turnRef,
    offset: ['start end', 'center center'],
  });
  const turnScale = useTransform(turnProgress, [0, 1], [0.9, 1]);
  const turnOpacity = useTransform(turnProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <section className="relative bg-cream-100">

      {/* ===== THE TURN ===== */}
      {/* Intentional breathing room — shorter than before */}
      <div className="h-[20vh]" />

      <div ref={turnRef} className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center"
          style={{ scale: turnScale, opacity: turnOpacity }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cream-400 mb-6">
            What if
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900">
            You weren&apos;t alone.
          </h2>
        </motion.div>
      </div>

      {/* ===== THE BRIEFING ===== */}
      <div className="flex flex-col items-center px-6 pb-20">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-cream-500 italic mb-6">
            Tomorrow morning, 6am. Your phone buzzes once:
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

      {/* ===== MEET BALABITE — THE UNBURYING ===== */}
      <div className="px-6 pb-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cream-500 mb-3">
            Meet your AI partner
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Balabite.
          </h2>
          <p className="text-base sm:text-lg text-cream-600 max-w-xl mx-auto">
            A team of AI brains — each one takes something off your pile,
            works while you sleep, and briefs you at sunrise.
          </p>
        </motion.div>

        {/* Characters grid — clear, no ghost pile overlay */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-9 gap-6 lg:gap-4">
            {brains.map((brain, i) => (
              <motion.div
                key={brain.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                  {brain.takes}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Punchline + CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-lg sm:text-xl text-cream-700 mb-8">
              The pile is gone. The board is level.{' '}
              <span className="font-semibold text-primary-900">You look up.</span>
            </p>
            <a
              href="#capabilities"
              className="inline-block text-sm font-medium text-cream-500 hover:text-primary-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See what each brain does →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
