'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TheTurn() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.4, 1]);

  return (
    <section ref={ref} className="relative bg-cream-100 py-24 md:py-32">
      <motion.div
        className="text-center px-6"
        style={{ scale, opacity }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-cream-400 mb-6">
          What if
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-6">
          You weren&apos;t alone.
        </h2>
        <p className="text-lg sm:text-xl text-cream-600 max-w-2xl mx-auto">
          Meet BalaBite &mdash; the AI partner that runs your restaurant
          the way you would. If there were more of you.
        </p>
      </motion.div>
    </section>
  );
}
