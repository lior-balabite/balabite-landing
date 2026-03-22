'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  Data — outcome-first, no bios                                      */
/* ------------------------------------------------------------------ */

interface CapCard {
  characterImg: string;
  insight: string;
}

interface Pillar {
  id: string;
  label: string;
  pillBg: string;
  pillText: string;
  borderColor: string;
  cards: CapCard[];
}

const pillars: Pillar[] = [
  {
    id: 'make-money',
    label: 'Make Money',
    pillBg: 'bg-amber-500/20',
    pillText: 'text-amber-600',
    borderColor: 'border-amber-500',
    cards: [
      {
        characterImg: '/illustrations/characters/menu-brain.png',
        insight:
          '\u201cYour Margherita has 78% margin but sits in a dead zone. Move to position 2.\u201d',
      },
      {
        characterImg: '/illustrations/characters/guest-brain.png',
        insight:
          '\u201cWelcome back, Sarah. Your usual Negroni?\u201d',
      },
      {
        characterImg: '/illustrations/characters/growth-brain.png',
        insight:
          '\u201c28% more repeat visits from automated post-dinner follow-ups.\u201d',
      },
      {
        characterImg: '/illustrations/characters/market-brain.png',
        insight:
          '\u201c2,300 people near you searched \u2018gluten-free brunch\u2019 this month.\u201d',
      },
    ],
  },
  {
    id: 'stop-losing',
    label: 'Stop Losing Money',
    pillBg: 'bg-emerald-500/20',
    pillText: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    cards: [
      {
        characterImg: '/illustrations/characters/kitchen-brain.png',
        insight:
          '\u201cWaste dropped from 8.2% to 4.1%. Auto-switched salmon vendor \u2014 saved $340/week.\u201d',
      },
      {
        characterImg: '/illustrations/characters/finance-brain.png',
        insight:
          '\u201cIf you raise burger price $2: lose ~5% orders, gain $2,800/month net.\u201d',
      },
    ],
  },
  {
    id: 'save-time',
    label: 'Save Time',
    pillBg: 'bg-purple-500/20',
    pillText: 'text-purple-600',
    borderColor: 'border-purple-500',
    cards: [
      {
        characterImg: '/illustrations/characters/team-brain.png',
        insight:
          '\u201cMaria\u2019s tips dropped 18% this week. Possible burnout.\u201d',
      },
      {
        characterImg: '/illustrations/characters/voice-brain.png',
        insight:
          '\u201cRecovered 23 missed reservations last month. Revenue saved: $3,200.\u201d',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Capabilities() {
  return (
    <section className="py-24 px-6 bg-cream-100">
      <div className="max-w-[72rem] mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-900 mb-4">
            What nine brains actually do.
          </h2>
          <p className="text-lg sm:text-xl text-cream-600 max-w-[42rem] mx-auto">
            Three missions. Real numbers.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="space-y-20">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
            >
              {/* Pillar pill */}
              <motion.div className="flex justify-center mb-8" variants={cardVariant}>
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${pillar.pillBg} ${pillar.pillText}`}
                >
                  {pillar.label}
                </span>
              </motion.div>

              {/* Outcome cards */}
              <div
                className={`grid gap-6 ${
                  pillar.cards.length === 4
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 max-w-[48rem] mx-auto'
                }`}
              >
                {pillar.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur border border-cream-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm"
                    variants={cardVariant}
                  >
                    {/* Character portrait — decorative, no name */}
                    <div className="mb-4 relative w-[120px] h-[120px]">
                      <Image
                        src={card.characterImg}
                        alt=""
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>

                    {/* Outcome insight */}
                    <blockquote
                      className={`text-sm italic text-cream-800 border-l-2 ${pillar.borderColor} pl-3 text-left w-full`}
                    >
                      {card.insight}
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
