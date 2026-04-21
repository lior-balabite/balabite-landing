'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const bullets = [
  '15+ languages',
  'Allergen safety gates',
  'Remembers every guest',
  'Upsells naturally',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function GuestShowcase() {
  return (
    <section className="py-16 md:py-20 px-6 bg-cream-100">
      <div className="max-w-[72rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cream-500 mb-4">
              FOR YOUR GUESTS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-4">
              Your guests get an AI waiter.
            </h2>
            <p className="text-lg text-cream-600 leading-relaxed mb-8">
              Every table gets personalized service in their language, with their
              allergies remembered, and wine pairings they&apos;ll actually love.
            </p>

            <ul className="space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-cream-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Phone mockup + character */}
          <motion.div
            className="flex items-end justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: 'easeOut' as const },
              },
            }}
          >
            {/* Phone frame */}
            <div
              className="relative rounded-[3rem] border-[8px] border-cream-300 aspect-[9/19.5] max-w-[260px] w-full overflow-hidden bg-white"
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-cream-300 rounded-full z-10" />

              {/* Placeholder screen */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 bg-cream-50">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cream-400"
                >
                  <path d="M12 3C7.5 3 4 6 4 10c0 2.5 1.2 4.5 3 5.7V19l3-2h2c4.5 0 8-3 8-7s-3.5-7-8-7Z" />
                  <path d="M9 9.5h0" />
                  <path d="M12 9.5h0" />
                  <path d="M15 9.5h0" />
                </svg>
                <p className="text-cream-500 text-xs text-center font-medium">
                  AI waiter conversation
                </p>
              </div>
            </div>

            {/* Guest Brain character — decorative */}
            <div className="hidden sm:block w-[80px] h-[80px] shrink-0 -mb-2">
              <Image
                src="/illustrations/characters/guest-brain.png"
                alt=""
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
