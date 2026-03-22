'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-primary-900">
      {/* Hero content — split layout */}
      <div className="relative z-10 flex flex-1 items-center px-6 pt-24 pb-16">
        <div className="mx-auto flex max-w-[80rem] w-full flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              className="text-sm uppercase tracking-widest text-accent-400 mb-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Every morning at 6am
            </motion.p>

            <motion.h1
              className="text-4xl font-bold leading-tight tracking-tight text-primary-100 sm:text-5xl md:text-6xl lg:text-7xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Good morning, Chef.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-[32rem] text-lg leading-relaxed text-primary-300 sm:text-xl mx-auto lg:mx-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Your restaurant ran itself overnight. Here&apos;s the 30-second briefing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <button
                onClick={onCtaClick}
                className="rounded-full bg-primary-100 px-8 py-3.5 text-base font-semibold text-primary-900 transition-all duration-200 hover:bg-white active:scale-[0.97]"
              >
                Join the Waitlist
              </button>
              <button
                onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-primary-100/20 px-8 py-3.5 text-base font-semibold text-primary-100 transition-all duration-200 hover:border-primary-100/40 hover:bg-primary-100/5 active:scale-[0.97]"
              >
                See how it works
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-8 flex items-center gap-2.5 text-sm text-primary-100/50 justify-center lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Live in 3 restaurants
            </motion.div>
          </div>

          {/* Right — hero illustration with video overlay support */}
          <motion.div
            className="flex-1 relative w-full max-w-[36rem]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {/* Warm ambient glow */}
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[80%] rounded-full bg-amber-500/10 blur-[100px]"
              aria-hidden="true"
            />

            {/* Video overlay — will be hero-ambient.mp4 when available */}
            {/* <video
              className="absolute inset-0 z-20 w-full h-full object-cover rounded-2xl mix-blend-screen opacity-60"
              autoPlay muted loop playsInline
              src="/videos/hero-ambient.mp4"
            /> */}

            <Image
              src="/illustrations/scenes/hero-calm.png"
              alt="AI command center for your restaurant — a calm kitchen at sunrise"
              width={1344}
              height={768}
              className="relative z-10 w-full h-auto rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
