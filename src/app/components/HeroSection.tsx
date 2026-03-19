'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '../../i18n/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';

interface HeroSectionProps {
  onCtaClick: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-primary-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary-900/80 backdrop-blur-lg shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-4">
          <Image
            src="/logo.png"
            alt="BalaBite.ai"
            width={48}
            height={48}
          />
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <motion.h1
          className="max-w-[56rem] text-4xl font-bold leading-tight tracking-tight text-primary-100 sm:text-5xl md:text-6xl lg:text-7xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[36rem] text-lg leading-relaxed text-primary-300 sm:text-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <button
            onClick={onCtaClick}
            className="rounded-full bg-accent-500 px-8 py-3.5 text-base font-semibold text-primary-900 shadow-lg shadow-accent-500/25 transition-all duration-200 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/30 active:scale-[0.97]"
          >
            {t('hero.ctaPrimary')}
          </button>
          <button
            onClick={scrollToFeatures}
            className="rounded-full border border-primary-100/20 px-8 py-3.5 text-base font-semibold text-primary-100 transition-all duration-200 hover:border-primary-100/40 hover:bg-primary-100/5 active:scale-[0.97]"
          >
            {t('hero.ctaSecondary')}
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-8 flex items-center gap-2.5 text-sm text-primary-100/50"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {t('hero.socialProof')}
        </motion.div>

        {/* Hero scene illustration */}
        <motion.div
          className="relative mt-16 w-full flex justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {/* Warm ambient glow behind image */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[80%] rounded-full bg-amber-500/10 blur-[100px]"
            aria-hidden="true"
          />
          <Image
            src="/illustrations/hero-scene.png"
            alt="BalaBite AI restaurant management — Pulse crown at dawn"
            width={1344}
            height={768}
            className="relative z-10 max-w-[42rem] w-full h-auto rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
