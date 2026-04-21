'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    label: 'Prep',
    time: '10 minutes',
    title: 'Connect your POS',
    body: 'Toast, Square, or Clover. No developer. No IT person. Just your login. BalaBite syncs your menu, transactions, and history.',
    detail: 'Works with restaurants from 10 seats to 200 covers.',
  },
  {
    label: 'Cook',
    time: '24 hours',
    title: 'BalaBite learns your restaurant',
    body: 'Menu, sales patterns, costs, guests, staff. Not generic restaurant data — YOUR data. YOUR patterns. YOUR place.',
    detail: 'Every insight is specific to your restaurant, not an industry average.',
  },
  {
    label: 'Plate',
    time: 'Every morning',
    title: 'Open the app. Three taps. Done.',
    body: 'Your first briefing arrives. What happened, what to do, what to watch. Approve, dismiss, or dig deeper. Then go run your restaurant.',
    detail: 'The partner is already working. You just showed up.',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-cream-50">
      <div className="max-w-[72rem] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cream-500 mb-4">
            The recipe
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-3">
            Live in 48 hours. Not 48 days.
          </h2>
          <p className="text-lg text-cream-600 max-w-lg mx-auto">
            Three steps. The last one is the one that changes everything.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="relative bg-white/80 backdrop-blur border border-cream-200 rounded-2xl p-8 shadow-sm"
              variants={cardFade}
            >
              {/* Step label + time */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                  {step.label}
                </span>
                <span className="text-xs text-cream-400 font-mono">
                  {step.time}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-cream-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-cream-600 leading-relaxed mb-4">
                {step.body}
              </p>
              <p className="text-[11px] text-cream-400 italic">
                {step.detail}
              </p>

              {/* Connection line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-cream-300" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Step 4: You */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-cream-500 mb-4">
            Step 4
          </p>
          <button
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-primary-900 px-8 py-3.5 text-base font-semibold text-cream-100 transition-all duration-200 hover:bg-primary-800 active:scale-[0.97]"
          >
            Put AI to Work
          </button>
        </motion.div>
      </div>
    </section>
  );
}
