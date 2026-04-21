'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

const featureIcons = [
  // 4 Menu Modes
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  // AI Waiter
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3C7.5 3 4 6 4 10c0 2.5 1.2 4.5 3 5.7V19l3-2h2c4.5 0 8-3 8-7s-3.5-7-8-7Z" />
      <path d="M9 9.5h0" />
      <path d="M12 9.5h0" />
      <path d="M15 9.5h0" />
    </svg>
  ),
  // 15+ Languages
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17" />
      <path d="M12 3c-2.5 3-2.5 9 0 18" />
      <path d="M12 3c2.5 3 2.5 9 0 18" />
    </svg>
  ),
  // Multi-Guest Ordering
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M3 20c0-3.5 2.5-6 6-6 1.5 0 2.8.5 3.8 1.3" />
      <path d="M13 20c0-2.8 1.8-5 4-5s4 2.2 4 5" />
    </svg>
  ),
  // Noted Saves
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5c0-1 .8-2 2-2h10c1.2 0 2 1 2 2v16l-7-4-7 4V5Z" />
    </svg>
  ),
  // Food Pairings
  (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v3M8 8v1M8 5c-2.5 0-4 1.5-4 3h8c0-1.5-1.5-3-4-3Z" />
      <path d="M4 8c0 3 1.5 5 4 5v5c0 1.5 1.2 2 2 2" />
      <path d="M18 2v14c0 2-1 4-3 4" />
      <path d="M16 8h4" />
    </svg>
  ),
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const phoneVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function GuestExperience() {
  const { t } = useI18n();

  const translatedFeatures = t('guestExperience.features');
  const features = Array.isArray(translatedFeatures)
    ? translatedFeatures.map((f: { title: string; description: string }, i: number) => ({
        ...f,
        icon: featureIcons[i],
      }))
    : featureIcons.map((icon, i) => ({ title: `Feature ${i + 1}`, description: '', icon }));

  return (
    <section className="py-24 px-6">
      <div className="max-w-[72rem] mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('guestExperience.heading')}{' '}
            <span className="text-accent-200">{t('guestExperience.headingAccent')}</span>
          </h2>
          <p className="text-primary-300 text-lg max-w-[42rem] mx-auto">
            {t('guestExperience.subheading')}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Feature list */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="flex gap-4"
                variants={featureVariants}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-500/10 text-accent-300 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-accent-200 font-bold text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-primary-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={phoneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div
              className="relative rounded-[3rem] border-[8px] border-primary-700 aspect-[9/19.5] max-w-[280px] w-full overflow-hidden"
              style={{
                boxShadow: '0 0 80px rgba(var(--color-accent-500), 0.1)',
              }}
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-primary-700 rounded-full z-10" />

              {/* Phone screen content */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary-800 to-primary-900 flex flex-col items-center justify-center gap-4 px-6">
                {/* Camera icon */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-500"
                >
                  <rect x="2" y="6" width="20" height="14" rx="3" />
                  <circle cx="12" cy="13" r="4" />
                  <path d="M7 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
                </svg>
                <p className="text-primary-500 text-sm text-center font-medium">
                  {t('guestExperience.phonePlaceholder')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
