'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '../../i18n/I18nProvider';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Brain {
  id: string;
  name: string;
  description: string;
  insight: string;
}

interface Pillar {
  id: string;
  label: string;
  colorClass: string;       // pill bg
  borderColor: string;      // insight left-border
  textColor: string;        // pill text
  brains: Brain[];
}

const pillars: Pillar[] = [
  {
    id: 'make-money',
    label: 'Make Money',
    colorClass: 'bg-amber-500/20',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    brains: [
      {
        id: 'menu',
        name: 'Menu Brain',
        description:
          'Analyzes every dish from 4 expert perspectives. Pricing, positioning, what to cut, what to push.',
        insight:
          'Your Margherita has 78% margin but sits in a dead zone. Move to position 2 — projected +22% orders.',
      },
      {
        id: 'guest',
        name: 'Guest Brain',
        description:
          "AI waiter that knows your menu, speaks 15+ languages, remembers every guest's preferences.",
        insight:
          "Welcome back, Sarah. Your usual Negroni? Tonight's lamb pairs perfectly with it.",
      },
      {
        id: 'growth',
        name: 'Growth Brain',
        description:
          'Fills seats, brings guests back, protects your reputation. Campaigns, loyalty, reviews.',
        insight:
          '28% more repeat visits from automated post-dinner follow-ups.',
      },
      {
        id: 'market',
        name: 'Market Brain',
        description:
          'Watches everything outside your walls. Competitors, trends, local demand signals.',
        insight:
          "2,300 people near you searched 'gluten-free brunch' this month. You don't offer it.",
      },
    ],
  },
  {
    id: 'stop-losing',
    label: 'Stop Losing Money',
    colorClass: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    brains: [
      {
        id: 'kitchen',
        name: 'Kitchen Brain',
        description:
          'Everything from ingredient to plate. Inventory, waste, vendor ordering, recipes, food cost.',
        insight:
          'Waste dropped from 8.2% to 4.1%. Auto-switched salmon vendor — saved $340/week.',
      },
      {
        id: 'finance',
        name: 'Finance Brain',
        description:
          'P&L, margins, tips, invoices, anomalies. Plus a what-if simulator for pricing decisions.',
        insight:
          'If you raise burger price $2: lose ~5% orders, gain $2,800/month net. Do it.',
      },
    ],
  },
  {
    id: 'save-time',
    label: 'Save Time',
    colorClass: 'bg-purple-500/20',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    brains: [
      {
        id: 'team',
        name: 'Team Brain',
        description:
          "Auto-schedules 20 staff in 30 seconds. Predicts who's burning out. Optimizes labor cost.",
        insight:
          "Maria's tips dropped 18% this week. Possible burnout — suggested schedule adjustment.",
      },
      {
        id: 'voice',
        name: 'Voice Brain',
        description:
          'Answers your phone 24/7. Takes reservations, handles to-go orders, never misses a call.',
        insight:
          'Recovered 23 missed reservations last month. Estimated revenue saved: $3,200.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
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
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PillarPill({ label, colorClass, textColor }: { label: string; colorClass: string; textColor: string }) {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${colorClass} ${textColor}`}
    >
      {label}
    </span>
  );
}

function BrainCard({
  brain,
  borderColor,
  t,
}: {
  brain: Brain;
  borderColor: string;
  t: (key: string) => any;
}) {
  const name =
    t(`brains.${brain.id}.name`) !== `brains.${brain.id}.name`
      ? t(`brains.${brain.id}.name`)
      : brain.name;

  const description =
    t(`brains.${brain.id}.description`) !== `brains.${brain.id}.description`
      ? t(`brains.${brain.id}.description`)
      : brain.description;

  const insight =
    t(`brains.${brain.id}.insight`) !== `brains.${brain.id}.insight`
      ? t(`brains.${brain.id}.insight`)
      : brain.insight;

  const insightLabel =
    t('brains.insightLabel') !== 'brains.insightLabel'
      ? t('brains.insightLabel')
      : 'What it found';

  return (
    <motion.div
      className="bg-white/80 backdrop-blur border border-cream-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm"
      variants={cardVariant}
    >
      {/* Illustration */}
      <div className="mb-4 relative w-[120px] h-[120px]">
        <Image
          src={`/illustrations/characters/${brain.id === 'pulse' ? 'the-pulse' : brain.id + '-brain'}.png`}
          alt={`${brain.name} illustration`}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-cream-900 mb-2">{name}</h3>

      {/* Description */}
      <p className="text-sm text-cream-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Insight */}
      <div className="w-full mt-auto">
        <p className="text-xs uppercase tracking-wider text-cream-500 mb-2">
          {insightLabel}
        </p>
        <blockquote
          className={`text-sm italic text-cream-800 border-l-2 ${borderColor} pl-3 text-left`}
        >
          {insight}
        </blockquote>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TheBrains() {
  const { t } = useI18n();

  const heading =
    t('brains.heading') !== 'brains.heading'
      ? t('brains.heading')
      : 'Your AI management team';

  const subheading =
    t('brains.subheading') !== 'brains.subheading'
      ? t('brains.subheading')
      : '8 specialist brains. Three missions. One partner.';

  return (
    <section className="py-24 px-6 bg-cream-100">
      <div className="max-w-[72rem] mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-900 mb-4">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl text-cream-600 max-w-[42rem] mx-auto">
            {subheading}
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
              {/* Pillar label */}
              <motion.div className="flex justify-center mb-8" variants={cardVariant}>
                <PillarPill
                  label={
                    t(`brains.pillar.${pillar.id}`) !== `brains.pillar.${pillar.id}`
                      ? t(`brains.pillar.${pillar.id}`)
                      : pillar.label
                  }
                  colorClass={pillar.colorClass}
                  textColor={pillar.textColor}
                />
              </motion.div>

              {/* Brain cards grid */}
              <div
                className={`grid gap-6 ${
                  pillar.brains.length === 4
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 max-w-[48rem] mx-auto'
                }`}
              >
                {pillar.brains.map((brain) => (
                  <BrainCard
                    key={brain.id}
                    brain={brain}
                    borderColor={pillar.borderColor}
                    t={t}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
