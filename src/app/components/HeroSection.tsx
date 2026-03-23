'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
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

const labelFade = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { delay: 1.2 + 0.12 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* Fewer labels per column — only what fits in viewport */
const revenueLabels = [
  { text: '"Sorry, can\'t make it today"', style: 'sms' as const },
  { text: 'Yelp: 1 star', style: 'alert' as const },
  { text: 'Table 9 still waiting', style: 'ticket' as const },
  { text: '86 the special', style: 'ticket' as const },
  { text: '"Karen wants the manager"', style: 'sms' as const },
  { text: 'Google: "never coming back"', style: 'alert' as const },
  { text: 'Closing Mondays', style: 'note' as const },
  { text: 'Where\'s Miguel?', style: 'sms' as const },
  { text: 'Dishwasher quit', style: 'sms' as const },
  { text: '"We need to talk"', style: 'sms' as const },
];

const costLabels = [
  { text: 'PAST DUE', style: 'stamp' as const },
  { text: 'Rent due in 3 days', style: 'stamp' as const },
  { text: 'Insurance +22%', style: 'stamp' as const },
  { text: 'Food cost +30%', style: 'alert' as const },
  { text: 'Register short $47', style: 'alert' as const },
  { text: 'POS just froze', style: 'alert' as const },
  { text: 'AC is out again', style: 'ticket' as const },
  { text: 'Ice machine down', style: 'ticket' as const },
  { text: 'Grease trap backing up', style: 'ticket' as const },
  { text: 'Fire suppression failed', style: 'stamp' as const },
];

function getLabelClasses(style: string) {
  switch (style) {
    case 'stamp':
      return 'bg-red-50 text-red-700 border border-red-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs px-2.5 py-1 shadow-md';
    case 'sms':
      return 'bg-white text-primary-800 border border-primary-200 text-[10px] sm:text-xs px-3 py-1.5 shadow-sm rounded-xl italic';
    case 'ticket':
      return 'bg-amber-50 text-amber-900 border border-amber-300 font-mono text-[10px] sm:text-xs px-2.5 py-1 shadow-sm';
    case 'alert':
      return 'bg-orange-50 text-orange-800 border border-orange-300 text-[10px] sm:text-xs px-2.5 py-1 shadow-sm font-medium';
    default:
      return 'bg-cream-50 text-cream-800 border border-cream-300 text-[10px] sm:text-xs px-2.5 py-1 shadow-sm';
  }
}

const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-2.5deg', '3deg', '-1deg', '2.5deg'];

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('balabite-pile-count');
    if (stored) setTotalCount(Math.max(30, parseInt(stored, 10)));
  }, []);

  /*
   * Mouse-driven tilt — transform origin at the BOTTOM CENTER (the cylinder).
   * This makes it feel like the balance board is physically rocking on the cylinder.
   * Only rotateZ (left-right lean), not rotateX/Y — boards don't tip forward.
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)) * 5,
      y: 0,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 });
  }, []);

  const handleAddLabel = () => {
    const trimmed = userLabel.trim();
    if (!trimmed || trimmed.length > 80) return;
    setUserLabels(prev => [...prev, trimmed]);
    setUserLabel('');
    const newCount = totalCount + 1;
    setTotalCount(newCount);
    localStorage.setItem('balabite-pile-count', String(newCount));
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream-100"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 flex flex-1 items-center px-6 pt-24 pb-8">
        <div className="mx-auto flex max-w-[80rem] w-full flex-col lg:flex-row items-start gap-8 lg:gap-0">

          {/* LEFT — Headline + copy + labels */}
          <div className="flex-1 flex flex-col lg:pr-8">
            <div className="lg:max-w-lg text-center lg:text-right mb-6">
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-cream-500 mb-3"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                The reality of running a restaurant
              </motion.p>

              <motion.h1
                className="text-3xl font-bold leading-tight tracking-tight text-primary-900 sm:text-4xl md:text-5xl"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                Every hat. Every fire.{' '}
                <span className="text-cream-500">Every single day.</span>
              </motion.h1>

              <motion.p
                className="mt-3 text-sm leading-relaxed text-cream-600 sm:text-base"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                39% of restaurants weren&apos;t profitable last year.
                The ones that survived? They carried all of this.
              </motion.p>

              <motion.div
                className="mt-6 flex gap-3 lg:justify-end justify-center"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <button
                  onClick={onCtaClick}
                  className="rounded-full bg-primary-900 px-7 py-3 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97]"
                >
                  Put AI to Work
                </button>
                <button
                  onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full border border-primary-900/20 px-7 py-3 text-sm font-semibold text-primary-900 transition-all hover:border-primary-900/40 hover:bg-primary-900/5 active:scale-[0.97]"
                >
                  See what changes
                </button>
              </motion.div>
            </div>

            {/* Revenue pressure labels */}
            <div className="hidden lg:flex flex-col items-end gap-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-1 mr-1">
                Revenue pressure
              </p>
              {revenueLabels.map((label, i) => (
                <motion.div
                  key={label.text}
                  className={`rounded-md whitespace-nowrap ${getLabelClasses(label.style)}`}
                  style={{ transform: `rotate(${rotations[i % rotations.length]})` }}
                  variants={labelFade}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {label.text}
                </motion.div>
              ))}
              {userLabels.filter((_, i) => i % 2 === 0).map((text, i) => (
                <motion.div
                  key={`user-l-${i}`}
                  className="rounded-md whitespace-nowrap bg-red-50 text-red-800 border border-red-300 text-[10px] sm:text-xs px-3 py-1.5 shadow-md font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ transform: `rotate(${rotations[(i + 3) % rotations.length]})` }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTER-RIGHT — Hero image + counter + P&L */}
          <div className="w-full lg:w-auto lg:min-w-[380px] lg:max-w-[440px] flex flex-col items-center">
            {/* Balance board image — tilts like a physical board on a cylinder */}
            <div
              ref={imageRef}
              className="relative w-full"
              style={{
                transform: `rotate(${mouseTilt.x}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: '50% 95%', /* cylinder is at the bottom */
              }}
            >
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <Image
                  src="/illustrations/scenes/hero1.png"
                  alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                  width={800}
                  height={1400}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </div>

            {/* P&L indicator — right under the image */}
            <motion.div
              className="mt-2 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-cream-500"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-400/50" />
                Revenue shrinking
              </span>
              <span className="text-cream-300">|</span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600/50" />
                Costs rising
              </span>
              <span className="text-cream-300">|</span>
              <span className="font-semibold text-primary-900">Margin: 3.2%</span>
            </motion.div>

            {/* Counter + Add yours — compact, right under P&L */}
            <motion.div
              className="mt-4 w-full max-w-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <p className="text-center text-sm text-cream-600 mb-2">
                Things on this person&apos;s plate:{' '}
                <span className="font-bold text-primary-900">{totalCount}</span>
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userLabel}
                  onChange={(e) => setUserLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLabel()}
                  placeholder="What's on yours?"
                  maxLength={80}
                  className="flex-1 rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm text-primary-900 placeholder:text-cream-400 focus:outline-none focus:border-cream-500 focus:ring-1 focus:ring-cream-500"
                />
                <button
                  onClick={handleAddLabel}
                  className="rounded-lg bg-primary-900 px-4 py-2 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97] whitespace-nowrap"
                >
                  Add yours
                </button>
              </div>
              <p className="text-[10px] text-cream-400 text-center mt-1.5">
                Every operator carries something different. Leave yours.
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Cost pressure labels */}
          <div className="hidden lg:flex flex-1 flex-col items-start gap-2 lg:pl-8 pt-24">
            <p className="text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-1 ml-1">
              Cost pressure
            </p>
            {costLabels.map((label, i) => (
              <motion.div
                key={label.text}
                className={`rounded-md whitespace-nowrap ${getLabelClasses(label.style)}`}
                style={{ transform: `rotate(${rotations[(i + 5) % rotations.length]})` }}
                variants={labelFade}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {label.text}
              </motion.div>
            ))}
            {userLabels.filter((_, i) => i % 2 === 1).map((text, i) => (
              <motion.div
                key={`user-r-${i}`}
                className="rounded-md whitespace-nowrap bg-red-50 text-red-800 border border-red-300 text-[10px] sm:text-xs px-3 py-1.5 shadow-md font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transform: `rotate(${rotations[(i + 7) % rotations.length]})` }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* Mobile labels */}
          <div className="flex lg:hidden gap-3 w-full max-w-md mx-auto">
            <div className="flex-1 flex flex-col items-end gap-1.5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Revenue</p>
              {revenueLabels.slice(0, 6).map((label, i) => (
                <motion.div
                  key={label.text}
                  className={`rounded-md whitespace-nowrap ${getLabelClasses(label.style)}`}
                  style={{ transform: `rotate(${rotations[i % rotations.length]})` }}
                  variants={labelFade}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {label.text}
                </motion.div>
              ))}
            </div>
            <div className="flex-1 flex flex-col items-start gap-1.5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Costs</p>
              {costLabels.slice(0, 6).map((label, i) => (
                <motion.div
                  key={label.text}
                  className={`rounded-md whitespace-nowrap ${getLabelClasses(label.style)}`}
                  style={{ transform: `rotate(${rotations[(i + 5) % rotations.length]})` }}
                  variants={labelFade}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {label.text}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
