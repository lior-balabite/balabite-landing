'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';

const painPointIcons = [
  <svg
    key="clock"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* clock face */}
    <circle cx={12} cy={12} r={9.5} />
    {/* hour hand */}
    <path d="M12 7.5v5l3.2 2.1" />
    {/* stress lines */}
    <path d="M3.5 3.5l1.2 1.2" />
    <path d="M20.5 3.5l-1.2 1.2" />
  </svg>,
  <svg
    key="coin"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* coin outline */}
    <circle cx={12} cy={12} r={9.5} />
    {/* dollar sign */}
    <path d="M12 6.5v11" />
    <path d="M15 9.5c0-1.4-1.3-2.2-3-2.2s-3 .7-3 2.2c0 1.6 2 2 3 2.3s3 .8 3 2.4c0 1.5-1.3 2.3-3 2.3s-3-.8-3-2.3" />
  </svg>,
  <svg
    key="chart"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* chart axes */}
    <path d="M4 19.5h16" />
    <path d="M4 4.5v15" />
    {/* question-mark bar chart */}
    <path d="M8 19.5v-5" />
    <path d="M12 19.5v-9" />
    <path d="M16 19.5v-3" />
    {/* question mark */}
    <path d="M17 5.5c0-1-1-2-2.5-2S12 4.5 12 5.5c0 .8.6 1.2 1.2 1.5" />
    <circle cx={13.2} cy={9} r={0.3} fill="currentColor" />
  </svg>,
  <svg
    key="person"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* person */}
    <circle cx={9} cy={7} r={3} />
    <path d="M3 20.5c0-3.5 2.7-6.5 6-6.5s6 3 6 6.5" />
    {/* exit arrow */}
    <path d="M18 8.5h3.5" />
    <path d="M19.5 6l2.5 2.5-2.5 2.5" />
  </svg>,
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ProblemSection() {
  const { t } = useI18n();

  const painPointsData = t('problems.painPoints');
  const painPoints = Array.isArray(painPointsData)
    ? painPointsData
    : [
        { title: '80-Hour Weeks', description: "You're the first in and the last out. Your AI partner never clocks out." },
        { title: 'Razor-Thin Margins', description: '3-5% profit margins with zero visibility into what\u2019s actually making money.' },
        { title: 'Flying Blind', description: "No real-time data on what's selling, what's wasted, or what your guests actually want." },
        { title: 'Staffing Chaos', description: 'Hiring, training, turnover, repeat. Your best server just gave two weeks\u2019 notice.' },
      ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[72rem] mx-auto">
        {/* Opening line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center text-xl md:text-2xl lg:text-3xl font-medium text-primary-100 leading-relaxed max-w-[48rem] mx-auto mb-16"
        >
          {t('problems.opening')}
        </motion.p>

        {/* Pain point cards — 2x2 grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              variants={cardVariants}
              className="bg-primary-800/40 backdrop-blur border border-primary-700/50 rounded-2xl p-8 flex flex-col gap-4"
            >
              <div className="text-accent-400">{painPointIcons[index]}</div>
              <h3 className="text-xl font-semibold text-primary-100">
                {point.title}
              </h3>
              <p className="text-primary-300 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Transition text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-2xl md:text-3xl font-semibold mt-20 bg-gradient-to-r from-accent-300 to-accent-400 bg-clip-text text-transparent"
        >
          {t('problems.transition')}
        </motion.p>
      </div>
    </section>
  );
}
