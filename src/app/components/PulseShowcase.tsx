'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '../../i18n/I18nProvider';

const BRIEFING_ITEMS = [
  {
    color: 'amber' as const,
    borderColor: 'border-l-amber-500',
    badgeClasses: 'bg-amber-500/20 text-amber-300',
    actions: true,
  },
  {
    color: 'green' as const,
    borderColor: 'border-l-emerald-500',
    badgeClasses: 'bg-emerald-500/20 text-emerald-300',
    actions: false,
  },
  {
    color: 'blue' as const,
    borderColor: 'border-l-blue-500',
    badgeClasses: 'bg-blue-500/20 text-blue-300',
    actions: false,
  },
  {
    color: 'purple' as const,
    borderColor: 'border-l-purple-500',
    badgeClasses: 'bg-purple-500/20 text-purple-300',
    actions: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function PulseShowcase() {
  const { t } = useI18n();

  const briefingData = t('pulse.briefing');
  const briefingItems = Array.isArray(briefingData)
    ? briefingData
    : [
        { ring: 'Menu', text: 'Chicken Shawarma dropped 15% in orders. Suggest swapping lunch position.' },
        { ring: 'Revenue', text: 'Friday revenue up 12% vs last week. Top seller: Lamb Kebab Platter.' },
        { ring: 'Customers', text: '3 VIP guests returning today. One has a nut allergy — kitchen notified.' },
        { ring: 'Operations', text: 'Server #4 averaged 23min ticket time yesterday. 8min above target.' },
      ];

  return (
    <section className="relative bg-primary-900 py-24 md:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[72rem] px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('pulse.heading')}
          </h2>
          <p className="text-lg md:text-xl text-primary-300 max-w-[42rem] mx-auto">
            {t('pulse.subheading')}
          </p>
        </motion.div>

        {/* Pulse illustration */}
        <motion.div
          className="relative mx-auto mb-16 md:mb-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        >
          {/* Warm glow behind illustration */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[80px]"
            aria-hidden="true"
          />
          <Image
            src="/illustrations/pulse.png"
            alt="Pulse — AI brain for your restaurant"
            width={200}
            height={200}
            className="relative z-10 w-[200px] h-auto"
          />
        </motion.div>

        {/* Morning Briefing Card */}
        <motion.div
          className="mx-auto max-w-[42rem] rounded-2xl border border-primary-700/50 bg-primary-800/60 p-6 md:p-8 backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Briefing header */}
          <p className="text-sm text-primary-400 mb-1">{t('pulse.briefingLabel')}</p>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
            {t('pulse.briefingGreeting')}
          </h3>

          {/* Action items */}
          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {BRIEFING_ITEMS.map((item, i) => (
              <motion.li
                key={item.color}
                className={`rounded-xl border-l-4 ${item.borderColor} bg-primary-900/50 p-4`}
                variants={itemVariants}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badgeClasses}`}
                  >
                    {briefingItems[i]?.ring}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary-200 leading-relaxed">
                      {briefingItems[i]?.text}
                    </p>
                    {item.actions && (
                      <div className="mt-3 flex gap-2">
                        <button className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/30">
                          {t('pulse.approve')}
                        </button>
                        <button className="rounded-lg bg-primary-700/50 px-3 py-1.5 text-xs font-semibold text-primary-400 transition-colors hover:bg-primary-700/70">
                          {t('pulse.dismiss')}
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
    </section>
  );
}
