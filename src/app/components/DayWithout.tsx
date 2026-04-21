'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function DayWithout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-primary-900">
      <div className="max-w-[72rem] mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-primary-500 mb-4">
            The reality
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-100 mb-4">
            You&apos;re wearing too many hats.
          </h2>
          <p className="text-lg text-primary-400 max-w-[36rem] mx-auto">
            Menu. Kitchen. Staff. Finances. Marketing. Guests. Phone. And somehow you&apos;re also supposed to cook.
          </p>
        </motion.div>

        {/* Hat Stack — the brand image */}
        <motion.div
          className="max-w-[28rem] mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="stack"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  <Image
                    src="/illustrations/scenes/hat-stack.png"
                    alt="Nine hats stacked precariously on top of each other — representing a restaurant owner doing everything alone"
                    width={800}
                    height={1200}
                    className="w-full h-auto"
                  />
                </div>

                {/* Interactive moment */}
                <div className="text-center mt-10">
                  <p className="text-primary-500 text-sm uppercase tracking-wider mb-2">
                    The breaking point
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-100 mb-1">
                    Go ahead. Add one more.
                  </h3>
                  <p className="text-primary-500 text-sm italic mb-6">
                    (What could go wrong?)
                  </p>
                  <button
                    onClick={() => setCollapsed(true)}
                    className="group relative inline-flex items-center justify-center"
                  >
                    <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                    <span className="relative w-14 h-14 rounded-full bg-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapse"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' as const }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20">
                  <Image
                    src="/illustrations/scenes/hat-collapse.png"
                    alt="The hat stack collapses — nine hats flying free, each glowing with its own light"
                    width={800}
                    height={1200}
                    className="w-full h-auto"
                  />
                </div>

                <div className="text-center mt-10">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-100 mb-3">
                    What if each hat had its own brain?
                  </h3>
                  <p className="text-primary-400 mb-1">
                    Not more hats. More heads.
                  </p>
                  <p className="text-primary-500 text-sm mt-4">
                    ↓ Keep scrolling
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Gradient transition to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream-100" />
    </section>
  );
}
