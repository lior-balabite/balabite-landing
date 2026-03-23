'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const revenueLabels = [
  { text: '"Sorry, can\'t make it today"', style: 'sms' as const },
  { text: '61% less traffic this year', style: 'note' as const },
  { text: 'Yelp: 1 star', style: 'alert' as const },
  { text: 'Table 9 still waiting', style: 'ticket' as const },
  { text: 'DoorDash refund request', style: 'alert' as const },
  { text: '86 the special', style: 'ticket' as const },
  { text: 'Google review: "never coming back"', style: 'alert' as const },
  { text: '"Karen wants to speak to manager"', style: 'sms' as const },
  { text: '2-top has been waiting 40 min', style: 'ticket' as const },
  { text: 'Closing Mondays', style: 'note' as const },
  { text: 'Where\'s Miguel?', style: 'sms' as const },
  { text: 'No one\'s closing tonight', style: 'sms' as const },
  { text: 'Dishwasher quit', style: 'sms' as const },
  { text: '"We need to talk"', style: 'sms' as const },
  { text: '"Can you cover? No one else can"', style: 'sms' as const },
];

const costLabels = [
  { text: 'PAST DUE', style: 'stamp' as const },
  { text: 'Rent due in 3 days', style: 'stamp' as const },
  { text: 'Insurance renewal +22%', style: 'stamp' as const },
  { text: 'Gas bill doubled', style: 'stamp' as const },
  { text: 'Food cost +30%', style: 'alert' as const },
  { text: 'Register short $47', style: 'alert' as const },
  { text: 'Sysco delivery wrong order', style: 'note' as const },
  { text: 'Broke a case of wine', style: 'note' as const },
  { text: 'POS just froze', style: 'alert' as const },
  { text: 'AC is out again', style: 'ticket' as const },
  { text: 'Ice machine is down', style: 'ticket' as const },
  { text: 'Grease trap backing up', style: 'ticket' as const },
  { text: 'Health inspection Tuesday', style: 'alert' as const },
  { text: 'Fire suppression failed', style: 'stamp' as const },
  { text: 'Walk-in temp is 48°', style: 'alert' as const },
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

const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-2.5deg', '3deg', '-1deg', '2.5deg', '-2deg', '1deg', '-1.5deg', '2deg', '-1deg'];

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('balabite-pile-count');
    if (stored) setTotalCount(Math.max(30, parseInt(stored, 10)));
  }, []);

  // Mouse-driven tilt — the board reacts to cursor like it's physically unstable
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Normalize to -1..1 range
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    // Clamp and apply subtle tilt — max 4 degrees
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)) * 4,
      y: Math.max(-1, Math.min(1, y)) * -2,
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

  // Scroll-driven: labels fade out as user scrolls away from hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const labelsOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream-100"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 flex flex-1 items-center px-6 pt-28 pb-16">
        <div className="mx-auto flex max-w-[80rem] w-full flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* LEFT — Headline + copy + labels */}
          <div className="flex-1 flex flex-col lg:items-end">
            {/* Copy block */}
            <div className="lg:max-w-md lg:text-right text-center lg:pr-6 mb-8">
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
                className="mt-4 text-sm leading-relaxed text-cream-600 sm:text-base"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                39% of restaurants weren&apos;t profitable last year.
                The ones that survived? They carried all of this.
              </motion.p>

              {/* CTA */}
              <motion.div
                className="mt-8 flex gap-3 lg:justify-end justify-center"
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

            {/* Revenue pressure labels — left column */}
            <motion.div
              className="hidden lg:flex flex-col items-end gap-2 pr-6"
              style={{ opacity: labelsOpacity }}
            >
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
            </motion.div>
          </div>

          {/* CENTER-RIGHT — Hero image */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-auto lg:min-w-[420px] lg:max-w-[500px]">
            <div
              ref={imageRef}
              className="relative w-full"
              style={{
                transform: `perspective(1000px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformOrigin: '50% 90%',
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
                  alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos — laptops, invoices, plates, payment terminals, receipts"
                  width={800}
                  height={1400}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </div>

            {/* Counter + Add yours */}
            <motion.div
              className="mt-6 w-full max-w-sm mx-auto lg:mx-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <p className="text-center lg:text-left text-sm text-cream-600 mb-3">
                Things on this person&apos;s plate:{' '}
                <span className="font-bold text-primary-900 text-base">{totalCount}</span>
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
              <p className="text-[10px] text-cream-400 text-center lg:text-left mt-2">
                Every operator carries something different. Leave yours.
              </p>
            </motion.div>

            {/* P&L indicator */}
            <motion.div
              className="mt-3 flex items-center gap-3 text-[10px] sm:text-xs text-cream-500 mx-auto lg:mx-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-red-400/40" />
                Revenue shrinking
              </span>
              <span className="text-cream-300">|</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500/60" />
                Costs rising
              </span>
              <span className="text-cream-300">|</span>
              <span className="font-medium text-cream-700">Margin: 3.2%</span>
            </motion.div>
          </div>

          {/* FAR RIGHT — Cost pressure labels */}
          <motion.div
            className="hidden lg:flex flex-col items-start gap-2 pl-4"
            style={{ opacity: labelsOpacity }}
          >
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
          </motion.div>

          {/* Mobile labels */}
          <div className="flex lg:hidden gap-3 mt-4 w-full max-w-md mx-auto">
            <div className="flex-1 flex flex-col items-end gap-1.5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Revenue</p>
              {revenueLabels.slice(0, 8).map((label, i) => (
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
              {costLabels.slice(0, 8).map((label, i) => (
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
