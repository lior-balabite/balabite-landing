'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const TIMELINE = [
  {
    time: '5:30 AM',
    label: 'The Pulse',
    text: 'One notification. "Good morning, Chef. Here\'s what happened overnight." Kitchen Brain ordered chicken. Team Brain filled tomorrow\'s shift. Voice Brain answered 4 calls. Growth Brain drafted a response to that 1-star review.',
    illustration: '/illustrations/scene-calm-morning.png',
    brainBadges: [
      { name: 'Kitchen', color: 'bg-emerald-500/20 text-emerald-300' },
      { name: 'Team', color: 'bg-purple-500/20 text-purple-300' },
      { name: 'Voice', color: 'bg-blue-500/20 text-blue-300' },
      { name: 'Growth', color: 'bg-amber-500/20 text-amber-300' },
    ],
  },
  {
    time: '5:31 AM',
    label: 'Three Taps',
    text: 'Approve. Approve. Dismiss. Done. You pour your coffee.',
    illustration: null,
    brainBadges: [],
  },
  {
    time: '8:00 AM',
    label: 'Everything\'s Handled',
    text: 'You walk in. Prep is set — Kitchen Brain calculated it from tonight\'s reservations. Menu Brain moved shawarma to position 2 yesterday. Orders are up 22%.',
    illustration: null,
    brainBadges: [
      { name: 'Kitchen', color: 'bg-emerald-500/20 text-emerald-300' },
      { name: 'Menu', color: 'bg-amber-500/20 text-amber-300' },
    ],
  },
  {
    time: '7:00 PM',
    label: 'Friday Rush — Handled',
    text: 'Guest Brain is taking orders in English, Spanish, and Japanese. Kitchen Brain is pacing courses. Voice Brain just booked a table for next Saturday. Finance Brain flagged a $200 tab that hasn\'t been closed. You\'re at the pass. Talking to guests. Where you belong.',
    illustration: '/illustrations/scene-calm-rush.png',
    brainBadges: [
      { name: 'Guest', color: 'bg-amber-500/20 text-amber-300' },
      { name: 'Kitchen', color: 'bg-emerald-500/20 text-emerald-300' },
      { name: 'Voice', color: 'bg-blue-500/20 text-blue-300' },
      { name: 'Finance', color: 'bg-emerald-500/20 text-emerald-300' },
    ],
  },
];

export default function DayWith() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[72rem] mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-accent-400 mb-4">
            Same day. Different story.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-100 mb-4">
            Now with your AI partner.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-[48rem] mx-auto">
          {/* Vertical line — this one glows warm */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/50 via-accent-400/30 to-accent-500/50" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.time}
              className="relative flex gap-6 md:gap-10 mb-16 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
            >
              {/* Time marker */}
              <div className="flex-shrink-0 w-16 md:w-24 text-right">
                <span className="text-sm md:text-base font-mono font-bold text-accent-400">
                  {item.time}
                </span>
              </div>

              {/* Dot on line — warm glow */}
              <div className="absolute left-8 md:left-12 top-1.5 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-accent-400 ring-4 ring-primary-900 shadow-sm shadow-accent-400/50" />
              </div>

              {/* Content */}
              <div className="flex-1 pl-4">
                <h3 className="text-lg font-semibold text-primary-100 mb-2">
                  {item.label}
                </h3>
                <p className="text-primary-300 leading-relaxed mb-3">
                  {item.text}
                </p>

                {/* Brain badges */}
                {item.brainBadges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.brainBadges.map((badge) => (
                      <span
                        key={badge.name}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${badge.color}`}
                      >
                        {badge.name}
                      </span>
                    ))}
                  </div>
                )}

                {item.illustration && (
                  <div className="rounded-xl overflow-hidden shadow-lg shadow-accent-500/10 border border-accent-500/20">
                    <Image
                      src={item.illustration}
                      alt={item.label}
                      width={800}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The payoff */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-accent-400 mb-4">
            this button you can touch
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-100 mb-6">
            See it in action.
          </h3>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-accent-500 px-8 py-3.5 text-base font-semibold text-primary-900 shadow-lg shadow-accent-500/25 transition-all duration-200 hover:bg-accent-400 hover:shadow-xl active:scale-[0.97]"
          >
            Meet the brains
          </button>
        </motion.div>
      </div>
    </section>
  );
}
