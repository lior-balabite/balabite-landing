'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

const featureIcons = [
  // Kitchen Display (KDS)
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M6 8h4" />
      <path d="M6 11h3" />
    </svg>
  ),
  // Floor Management
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <circle cx="6.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  // Food Cost & BOH
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
      <path d="M15 14l1.5 2L20 12" />
    </svg>
  ),
  // Menu Management
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="M4 7h5" />
      <path d="M4 11h3" />
    </svg>
  ),
  // Tips Calculator
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-2 0-3 1-3 2.25S10 12 12 12.5s3 1 3 2.25-1 2.25-3 2.25c-1.5 0-2.5-.5-3-1.5" />
      <path d="M12 6v1.5" />
      <path d="M12 16.5V18" />
    </svg>
  ),
  // POS Integration
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M7 15h2" />
      <path d="M12 15h5" />
    </svg>
  ),
  // Promotions
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l18-6v14L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      <path d="M19 6.5l1.5-1.5" />
      <path d="M20.5 10H22" />
    </svg>
  ),
  // Checkout & Payments
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="3" />
      <path d="M1 10h22" />
      <path d="M6 15h3" />
      <path d="M13 15h4" />
      <circle cx="19.5" cy="15" r="1" />
    </svg>
  ),
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function OperationsSuite() {
  const { t } = useI18n();

  const translatedFeatures = t('operations.features');
  const features = Array.isArray(translatedFeatures)
    ? translatedFeatures.map((f: { title: string; description: string }, i: number) => ({
        ...f,
        icon: featureIcons[i],
      }))
    : featureIcons.map((icon, i) => ({ title: `Feature ${i + 1}`, description: '', icon }));

  return (
    <section className="py-24 px-6">
      <div className="max-w-[72rem] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-4">
            {t('operations.heading')}
          </h2>
          <p className="text-primary-400 text-lg max-w-[42rem] mx-auto">
            {t('operations.subheading')}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(245, 158, 11, 0.3)',
              }}
              className="bg-primary-800/30 border border-primary-700/30 rounded-xl p-5 transition-colors"
            >
              <div className="text-accent-400 mb-3">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-primary-100 mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-primary-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
