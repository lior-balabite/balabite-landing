'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {isInView ? count.toLocaleString() : '0'}
      {suffix}
    </span>
  );
}

const metricValues = [
  { value: 152, suffix: 'K+' },
  { value: 15, suffix: '+' },
  { value: 4, suffix: '' },
];

const integrations = ['Square', 'Toast', 'Stripe', 'Syrve'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function SocialProof() {
  const { t } = useI18n();

  const translatedMetrics = t('socialProof.metrics');
  const metrics = Array.isArray(translatedMetrics)
    ? metricValues.map((mv, i) => ({
        ...mv,
        label: translatedMetrics[i]?.label ?? `Metric ${i + 1}`,
      }))
    : metricValues.map((mv, i) => ({ ...mv, label: `Metric ${i + 1}` }));

  return (
    <section className="py-20 px-6">
      <div className="max-w-[56rem] mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {t('socialProof.heading')}
        </motion.h2>

        {/* Metrics */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              className="flex-1 text-center"
              variants={itemVariants}
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-primary-400 text-sm uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* POS Integration Logos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {integrations.map((name) => (
            <span
              key={name}
              className="bg-primary-800/50 border border-primary-700/40 rounded-full px-4 py-2 text-sm text-primary-300"
            >
              {name}
            </span>
          ))}
        </motion.div>

{/* AI model reference removed intentionally */}
      </div>
    </section>
  );
}
