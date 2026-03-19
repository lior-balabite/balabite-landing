'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '../../i18n/I18nProvider';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.2 },
  },
};

export default function MeetYourTeam() {
  const { t } = useI18n();

  const heading =
    t('meetTeam.heading') !== 'meetTeam.heading'
      ? t('meetTeam.heading')
      : 'What if each hat had its own brain?';

  const description =
    t('meetTeam.description') !== 'meetTeam.description'
      ? t('meetTeam.description')
      : 'Behind every great restaurant are specialists — the menu engineer, the sommelier, the floor manager, the numbers person. We gave each role its own AI brain. They work together, 24/7, so you can focus on what you do best: hospitality.';

  return (
    <section className="py-24 px-6 bg-primary-900">
      <div className="max-w-[72rem] mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-primary-100 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {heading}
        </motion.h2>

        {/* Team scene illustration */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Image
            src="/illustrations/team-scene.png"
            alt="Nine illuminated hats on a wooden counter — each representing an AI brain specialist, with the Pulse crown glowing in the center"
            width={1440}
            height={810}
            className="w-full h-auto rounded-2xl"
            priority={false}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="mt-10 text-center text-lg sm:text-xl text-primary-300 max-w-[48rem] mx-auto leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
