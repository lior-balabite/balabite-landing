'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhatChanges() {
  return (
    <section id="cream-start" className="py-24 px-6 bg-cream-100">
      <div className="max-w-[72rem] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cream-500 mb-4">
            Meet your AI partner
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-900 mb-4">
            The team you can&apos;t afford to hire.
          </h2>
          <p className="text-lg text-cream-600 max-w-[40rem] mx-auto leading-relaxed">
            Works while you sleep. Doesn&apos;t ask for a raise.
          </p>
        </motion.div>

        {/* Team lineup illustration */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/illustrations/scenes/team-lineup.png"
            alt="AI brain characters — each one handles a different part of your restaurant"
            width={1920}
            height={640}
            className="w-full h-auto rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
