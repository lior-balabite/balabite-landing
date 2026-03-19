'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import { ReactNode } from 'react';

interface SpecialistVisual {
  color: string;
  accentClass: string;
  borderClass: string;
  iconColorClass: string;
  insightBg: string;
  icon: ReactNode;
}

const specialistVisuals: SpecialistVisual[] = [
  {
    color: 'amber',
    accentClass: 'bg-amber-500',
    borderClass: 'border-amber-500/20',
    iconColorClass: 'text-amber-400',
    insightBg: 'bg-primary-900/50',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4H20" />
        <path d="M4 8H16" />
        <path d="M4 12H20" />
        <path d="M4 16H14" />
        <path d="M4 20H18" />
        <path d="M19 14L21 17L19 20" />
      </svg>
    ),
  },
  {
    color: 'emerald',
    accentClass: 'bg-emerald-500',
    borderClass: 'border-emerald-500/20',
    iconColorClass: 'text-emerald-400',
    insightBg: 'bg-primary-900/50',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20V10" />
        <path d="M9 20V6" />
        <path d="M14 20V12" />
        <path d="M19 20V4" />
        <circle cx="19" cy="4" r="1.5" fill="currentColor" stroke="none" />
        <path d="M12 16L16 8" />
      </svg>
    ),
  },
  {
    color: 'purple',
    accentClass: 'bg-purple-500',
    borderClass: 'border-purple-500/20',
    iconColorClass: 'text-purple-400',
    insightBg: 'bg-primary-900/50',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="4" />
        <path d="M9 5V4" />
        <path d="M9 14V13" />
        <path d="M5 9H4" />
        <path d="M14 9H13" />
        <circle cx="17" cy="17" r="3" />
        <path d="M17 14.5V14" />
        <path d="M17 20V19.5" />
        <path d="M14.5 17H14" />
        <path d="M20 17H19.5" />
      </svg>
    ),
  },
  {
    color: 'blue',
    accentClass: 'bg-blue-500',
    borderClass: 'border-blue-500/20',
    iconColorClass: 'text-blue-400',
    insightBg: 'bg-primary-900/50',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="7" r="3" />
        <circle cx="16" cy="7" r="3" />
        <path d="M3 19C3 16 5 14 8 14C9.5 14 10.8 14.5 11.8 15.3" />
        <path d="M12.2 15.3C13.2 14.5 14.5 14 16 14C19 14 21 16 21 19" />
        <path d="M12 18L13 20L15 17" />
      </svg>
    ),
  },
];

export default function SpecialistsGrid() {
  const { t } = useI18n();

  const items = t('specialists.items') as Array<{ title: string; description: string; insight: string }>;
  const comingSoonItems = t('specialists.comingSoon.items') as string[];

  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16 max-w-[48rem] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('specialists.heading')}
        </h2>
        <p className="text-primary-100/80 text-lg">
          {t('specialists.subheading')}
        </p>
      </motion.div>

      {/* Specialist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[64rem] mx-auto">
        {Array.isArray(items) && items.map((item, index) => {
          const visual = specialistVisuals[index];
          if (!visual) return null;

          return (
            <motion.div
              key={index}
              className={`relative bg-primary-800/40 backdrop-blur-sm border ${visual.borderClass} rounded-2xl p-6 overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Colored accent bar on left */}
              <div
                className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${visual.accentClass}`}
              />

              {/* Card Content */}
              <div className="pl-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={visual.iconColorClass}>{visual.icon}</div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-primary-100/70 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Insight */}
                <div className={`${visual.insightBg} rounded-xl p-4`}>
                  <span className="text-xs font-semibold text-primary-100/50 uppercase tracking-wider">
                    {t('specialists.insightLabel')}
                  </span>
                  <p className="text-sm text-primary-100/90 italic mt-1 leading-relaxed">
                    &ldquo;{item.insight}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Coming Soon Card */}
        <motion.div
          className="relative bg-primary-800/40 backdrop-blur-sm border border-primary-600/20 rounded-2xl p-6 overflow-hidden opacity-60 md:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Muted accent bar */}
          <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary-500" />

          <div className="pl-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('specialists.comingSoon.title')}
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {Array.isArray(comingSoonItems) && comingSoonItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-primary-100/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400/50" />
                  {item}
                </li>
              ))}
            </ul>

            <span className="inline-block text-xs font-semibold text-primary-100/40 uppercase tracking-wider bg-primary-700/40 rounded-full px-3 py-1">
              {t('specialists.comingSoon.date')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Teaser */}
      <motion.p
        className="text-center text-accent-300 mt-12 text-sm font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {t('specialists.teaser')}
      </motion.p>
    </section>
  );
}
