'use client';

import { useRef, useState, useEffect } from 'react';
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

const labelFloat = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: [0.5, 0.9, 0.7][i % 3], // varying opacity = depth
    scale: 1,
    transition: { delay: 1.0 + 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/*
 * ALL 30 LABELS — positioned as a cloud around the image.
 * Coordinates are % relative to the image container.
 * Some overlap. Some are partially behind. That's the point — it's suffocating.
 */
const labels: {
  text: string;
  top: string;
  left: string;
  rotate: string;
  size: 'sm' | 'md' | 'lg';
  style: 'sms' | 'stamp' | 'ticket' | 'note' | 'alert';
}[] = [
  // Surrounding the top of the pile
  { text: 'PAST DUE', top: '-2%', left: '75%', rotate: '3deg', size: 'lg', style: 'stamp' },
  { text: '"Sorry, can\'t make it"', top: '0%', left: '-15%', rotate: '-2deg', size: 'md', style: 'sms' },
  { text: 'Yelp: 1 star', top: '5%', left: '85%', rotate: '-1deg', size: 'sm', style: 'alert' },
  { text: 'Insurance +22%', top: '8%', left: '-25%', rotate: '2deg', size: 'md', style: 'stamp' },

  // Upper-middle cluster
  { text: '86 the special', top: '14%', left: '78%', rotate: '2deg', size: 'md', style: 'ticket' },
  { text: 'Where\'s Miguel?', top: '16%', left: '-18%', rotate: '-3deg', size: 'sm', style: 'sms' },
  { text: 'Food cost +30%', top: '20%', left: '88%', rotate: '-2deg', size: 'lg', style: 'alert' },
  { text: 'Rent due in 3 days', top: '22%', left: '-22%', rotate: '1deg', size: 'md', style: 'stamp' },

  // Middle — closing in tight
  { text: 'Table 9 still waiting', top: '28%', left: '80%', rotate: '1deg', size: 'sm', style: 'ticket' },
  { text: '"We need to talk"', top: '30%', left: '-12%', rotate: '-2deg', size: 'md', style: 'sms' },
  { text: 'POS just froze', top: '34%', left: '85%', rotate: '-3deg', size: 'md', style: 'alert' },
  { text: 'Gas bill doubled', top: '36%', left: '-20%', rotate: '2deg', size: 'sm', style: 'stamp' },
  { text: 'DoorDash refund', top: '40%', left: '78%', rotate: '2deg', size: 'sm', style: 'alert' },
  { text: 'Dishwasher quit', top: '42%', left: '-15%', rotate: '-1deg', size: 'md', style: 'sms' },

  // Lower-middle
  { text: '"Karen wants the manager"', top: '48%', left: '82%', rotate: '-2deg', size: 'md', style: 'sms' },
  { text: 'AC is out again', top: '50%', left: '-18%', rotate: '3deg', size: 'sm', style: 'ticket' },
  { text: 'Register short $47', top: '54%', left: '88%', rotate: '1deg', size: 'md', style: 'alert' },
  { text: 'Grease trap backing up', top: '56%', left: '-22%', rotate: '-2deg', size: 'sm', style: 'ticket' },
  { text: 'Google: "never coming back"', top: '60%', left: '75%', rotate: '-1deg', size: 'lg', style: 'alert' },
  { text: 'Ice machine down', top: '62%', left: '-12%', rotate: '2deg', size: 'sm', style: 'ticket' },

  // Lower cluster
  { text: 'Health inspection Tuesday', top: '66%', left: '82%', rotate: '2deg', size: 'md', style: 'alert' },
  { text: '"Can you cover?"', top: '68%', left: '-16%', rotate: '-3deg', size: 'md', style: 'sms' },
  { text: 'Closing Mondays', top: '72%', left: '86%', rotate: '-1deg', size: 'sm', style: 'note' },
  { text: 'Fire suppression failed', top: '74%', left: '-20%', rotate: '2deg', size: 'lg', style: 'stamp' },
  { text: 'No one\'s closing tonight', top: '78%', left: '80%', rotate: '1deg', size: 'sm', style: 'sms' },
  { text: 'Walk-in temp is 48°', top: '80%', left: '-14%', rotate: '-2deg', size: 'md', style: 'alert' },

  // Bottom — around the feet/board
  { text: 'Broke a case of wine', top: '84%', left: '78%', rotate: '-3deg', size: 'sm', style: 'note' },
  { text: 'Sysco wrong order', top: '86%', left: '-18%', rotate: '1deg', size: 'sm', style: 'note' },
  { text: 'Permit expires Friday', top: '90%', left: '85%', rotate: '2deg', size: 'md', style: 'alert' },
  { text: '2-top waiting 40 min', top: '92%', left: '-12%', rotate: '-1deg', size: 'sm', style: 'ticket' },
];

function getLabelClasses(style: string, size: string) {
  const sizeClass = size === 'lg' ? 'text-xs sm:text-sm' : size === 'md' ? 'text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]';
  switch (style) {
    case 'stamp':
      return `bg-red-50 text-red-700 border border-red-300 font-bold uppercase tracking-wider ${sizeClass} px-2 py-0.5 shadow-md`;
    case 'sms':
      return `bg-white text-primary-800 border border-primary-200 ${sizeClass} px-2.5 py-1 shadow-sm rounded-xl italic`;
    case 'ticket':
      return `bg-amber-50 text-amber-900 border border-amber-300 font-mono ${sizeClass} px-2 py-0.5 shadow-sm`;
    case 'alert':
      return `bg-orange-50 text-orange-800 border border-orange-300 ${sizeClass} px-2 py-0.5 shadow-sm font-medium`;
    default:
      return `bg-cream-200/80 text-cream-700 border border-cream-300 ${sizeClass} px-2 py-0.5 shadow-sm`;
  }
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);
  const [margin, setMargin] = useState(5.0);

  useEffect(() => {
    const stored = localStorage.getItem('balabite-pile-count');
    if (stored) setTotalCount(Math.max(30, parseInt(stored, 10)));
  }, []);

  // Animated margin countdown: 5.0% → 3.2% over 8 seconds
  useEffect(() => {
    const start = 5.0;
    const end = 3.2;
    const duration = 8000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setMargin(parseFloat((start - (start - end) * eased).toFixed(1)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(tick, 2000); // start after labels begin
    return () => clearTimeout(timer);
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

  const marginColor = margin > 4.5 ? 'text-green-700' : margin > 3.8 ? 'text-amber-700' : 'text-red-700';

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream-100"
    >
      <div className="relative z-10 flex flex-1 items-center px-6 pt-24 pb-8">
        <div className="mx-auto flex max-w-[76rem] w-full flex-col lg:flex-row items-center gap-10 lg:gap-12">

          {/* LEFT — Headline + copy + CTA */}
          <div className="flex-1 text-center lg:text-left lg:max-w-lg">
            <motion.p
              className="text-xs uppercase tracking-[0.2em] text-cream-500 mb-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              The reality
            </motion.p>

            <motion.h1
              className="text-3xl font-bold leading-[1.15] tracking-tight text-primary-900 sm:text-4xl md:text-5xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              You&apos;re the only thing holding this together.
            </motion.h1>

            <motion.p
              className="mt-4 text-base leading-relaxed text-cream-600 sm:text-lg"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              And it&apos;s costing you everything.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-3 justify-center lg:justify-start"
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

            {/* Social proof */}
            <motion.div
              className="mt-6 flex items-center gap-2.5 text-sm text-cream-500 justify-center lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
              </span>
              Live in 3 restaurants
            </motion.div>
          </div>

          {/* RIGHT — Image with label cloud */}
          <div className="flex-1 flex flex-col items-center w-full lg:max-w-[520px]">
            {/* Image container with label cloud */}
            <div
              ref={imageRef}
              className="relative w-full max-w-[440px]"
            >
              {/* The balance board — continuous 3D wobble via CSS.
                  No mouse tracking needed. The instability is ambient. */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="animate-hat-wobble"
              >
                <Image
                  src="/illustrations/scenes/hero1.png"
                  alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                  width={800}
                  height={1400}
                  className="w-full h-auto relative z-10"
                  priority
                />
              </motion.div>

              {/* Label cloud — 30 labels swarming the image */}
              {labels.map((label, i) => (
                <motion.div
                  key={label.text}
                  className={`absolute z-20 rounded-md whitespace-nowrap hidden sm:block ${getLabelClasses(label.style, label.size)}`}
                  style={{
                    top: label.top,
                    left: label.left,
                    transform: `rotate(${label.rotate})`,
                  }}
                  variants={labelFloat}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {label.text}
                </motion.div>
              ))}

              {/* User-submitted labels join the cloud */}
              {userLabels.map((text, i) => (
                <motion.div
                  key={`user-${i}`}
                  className="absolute z-30 rounded-md whitespace-nowrap hidden sm:block bg-red-50 text-red-800 border border-red-300 text-[10px] sm:text-xs px-2.5 py-1 shadow-lg font-medium"
                  style={{
                    top: `${15 + (i * 7) % 70}%`,
                    left: i % 2 === 0 ? '-20%' : '82%',
                    transform: `rotate(${i % 2 === 0 ? '-2' : '2'}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {text}
                </motion.div>
              ))}
            </div>

            {/* P&L — animated bars + ticking margin */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-5 text-xs"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              {/* Revenue bar — shrinking */}
              <span className="flex items-center gap-2 text-red-500/80">
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-[9px] text-cream-500">Revenue</span>
                  <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-red-400 rounded-full"
                      style={{
                        width: `${Math.max(30, 100 - ((5.0 - margin) / 1.8) * 70)}%`,
                        transition: 'width 0.5s ease-out',
                      }}
                    />
                  </span>
                </span>
                <span className="text-red-500 font-medium">↓</span>
              </span>

              {/* Costs bar — growing */}
              <span className="flex items-center gap-2 text-red-600/80">
                <span className="text-red-600 font-medium">↑</span>
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-[9px] text-cream-500">Costs</span>
                  <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-red-600 rounded-full"
                      style={{
                        width: `${Math.min(95, 50 + ((5.0 - margin) / 1.8) * 45)}%`,
                        transition: 'width 0.5s ease-out',
                      }}
                    />
                  </span>
                </span>
              </span>

              {/* Margin — ticking number with color shift */}
              <span className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-cream-500">Margin</span>
                <span className={`font-bold text-sm tabular-nums ${marginColor} transition-colors duration-300`}>
                  {margin}%
                </span>
              </span>
            </motion.div>

            {/* Counter + Add yours */}
            <motion.div
              className="mt-4 w-full max-w-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
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

        </div>
      </div>
    </section>
  );
}
