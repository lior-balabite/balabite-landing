'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const BRIEFING_ITEMS = [
  {
    ring: 'Menu',
    text: 'Chicken Shawarma dropped 15% in orders. Suggest swapping lunch position.',
    borderColor: 'border-l-amber-500',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-700',
    actions: true,
  },
  {
    ring: 'Revenue',
    text: 'Friday revenue up 12% vs last week. Top seller: Lamb Kebab Platter.',
    borderColor: 'border-l-emerald-500',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-700',
    actions: false,
  },
  {
    ring: 'Customers',
    text: '3 VIP guests returning today. One has a nut allergy — kitchen notified.',
    borderColor: 'border-l-blue-500',
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-700',
    actions: false,
  },
  {
    ring: 'Operations',
    text: 'Server #4 averaged 23min ticket time yesterday. 8min above target.',
    borderColor: 'border-l-purple-500',
    badgeBg: 'bg-purple-500/15',
    badgeText: 'text-purple-700',
    actions: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ProductShowcase() {
  return (
    <section className="relative bg-cream-100 py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[72rem] px-6">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Pulse illustration + device frame */}
          <motion.div
            className="flex items-end justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            {/* The Pulse character — concierge beside the screen */}
            <div className="hidden sm:block w-[80px] h-[80px] shrink-0 -mb-2">
              <Image
                src="/illustrations/characters/the-pulse.png"
                alt=""
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Device frame (papercraft bezel placeholder) */}
            <div className="relative rounded-2xl border-[6px] border-cream-300 bg-white overflow-hidden shadow-lg shadow-cream-400/20 max-w-[320px] w-full">
              {/* Top bar */}
              <div className="bg-cream-200 px-4 py-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cream-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-cream-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-cream-400" />
              </div>

              {/* Screenshot placeholder */}
              <div className="aspect-[3/4] bg-cream-50 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/15 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-600"
                    >
                      <path d="M12 3v18" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <p className="text-cream-500 text-xs font-medium">
                    Pulse UI screenshot
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Copy + briefing items */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cream-500 mb-4">
              EVERY MORNING AT 6AM
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-4">
              One notification. Three taps. Done.
            </h2>
            <p className="text-lg text-cream-600 leading-relaxed mb-8">
              Your AI partner briefs you on everything that happened overnight.
              Revenue, inventory, staffing, reviews — summarized into actions.
              Approve. Dismiss. Pour your coffee.
            </p>

            {/* Briefing line items */}
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {BRIEFING_ITEMS.map((item) => (
                <motion.li
                  key={item.ring}
                  className={`rounded-xl border-l-4 ${item.borderColor} bg-white/80 p-4`}
                  variants={itemVariants}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badgeBg} ${item.badgeText}`}
                    >
                      {item.ring}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream-700 leading-relaxed">
                        {item.text}
                      </p>
                      {item.actions && (
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-500/25">
                            Approve
                          </button>
                          <button className="rounded-lg bg-cream-200 px-3 py-1.5 text-xs font-semibold text-cream-600 transition-colors hover:bg-cream-300">
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
