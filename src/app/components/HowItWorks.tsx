'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    number: '1',
    title: 'Connect your POS',
    body: 'Plug in Toast, Square, or Clover. 10 minutes, no developer needed.',
    character: '/illustrations/characters/the-pulse.png',
  },
  {
    number: '2',
    title: 'Your AI team learns',
    body: 'Nine brains analyze your menu, sales, costs, staff, and guests. Takes 24 hours.',
    character: '/illustrations/characters/kitchen-brain.png',
  },
  {
    number: '3',
    title: 'Wake up to your briefing',
    body: "Every morning: what happened, what to do, three taps. That's it.",
    character: '/illustrations/characters/finance-brain.png',
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
    transition: { duration: 0.5, ease: 'easeOut' as const },
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
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-4">
            Three steps. Ten minutes.
          </h2>
        </motion.div>

        {/* Step cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative bg-white/80 backdrop-blur border border-cream-200 rounded-2xl p-8 text-center shadow-sm"
              variants={cardFade}
            >
              {/* Step number */}
              <div className="w-10 h-10 rounded-full bg-primary-900 text-cream-100 text-lg font-bold flex items-center justify-center mx-auto mb-6">
                {step.number}
              </div>

              {/* Character vignette */}
              <div className="w-[80px] h-[80px] mx-auto mb-6">
                <Image
                  src={step.character}
                  alt=""
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-cream-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-cream-600 leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
