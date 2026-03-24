'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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

/* ── LABELS ── */
const allLabels = [
  // Revenue pressure
  { text: '"Sorry, can\'t make it today"', style: 'sms', side: 'left' as const },
  { text: 'Where\'s Miguel?', style: 'sms', side: 'left' as const },
  { text: 'Yelp: 1 star', style: 'alert', side: 'left' as const },
  { text: 'Table 9 still waiting', style: 'ticket', side: 'left' as const },
  { text: '86 the special', style: 'ticket', side: 'left' as const },
  { text: '"Karen wants the manager"', style: 'sms', side: 'left' as const },
  { text: 'Google: "never coming back"', style: 'alert', side: 'left' as const },
  { text: 'Dishwasher quit', style: 'sms', side: 'left' as const },
  { text: 'Closing Mondays', style: 'note', side: 'left' as const },
  { text: '"We need to talk"', style: 'sms', side: 'left' as const },
  { text: 'Short-staffed again', style: 'sms', side: 'left' as const },
  { text: '3am. Still here.', style: 'note', side: 'left' as const },
  { text: 'Missed another recital', style: 'note', side: 'left' as const },
  { text: 'DoorDash refund', style: 'alert', side: 'left' as const },
  { text: 'No one\'s closing tonight', style: 'sms', side: 'left' as const },
  // Cost pressure
  { text: 'PAST DUE', style: 'stamp', side: 'right' as const },
  { text: 'Rent due in 3 days', style: 'stamp', side: 'right' as const },
  { text: 'Insurance +22%', style: 'stamp', side: 'right' as const },
  { text: 'Gas bill doubled', style: 'stamp', side: 'right' as const },
  { text: 'Food cost +30%', style: 'alert', side: 'right' as const },
  { text: 'Register short $47', style: 'alert', side: 'right' as const },
  { text: 'POS just froze', style: 'alert', side: 'right' as const },
  { text: 'AC is out again', style: 'ticket', side: 'right' as const },
  { text: 'Ice machine down', style: 'ticket', side: 'right' as const },
  { text: 'Grease trap backing up', style: 'ticket', side: 'right' as const },
  { text: 'Health inspection Tuesday', style: 'alert', side: 'right' as const },
  { text: '"Can you cover?"', style: 'sms', side: 'right' as const },
  { text: 'Broke a case of wine', style: 'note', side: 'right' as const },
  { text: '2-top waiting 40 min', style: 'ticket', side: 'right' as const },
  { text: 'missed call (3)', style: 'note', side: 'right' as const },
];

/* Cloud positions — labels cluster around the image, some overlapping */
const cloudPositions = [
  // Left cloud (revenue) — positioned relative to image container
  { top: '2%', left: '-45%' }, { top: '8%', left: '-52%' }, { top: '14%', left: '-40%' },
  { top: '20%', left: '-55%' }, { top: '26%', left: '-42%' }, { top: '32%', left: '-50%' },
  { top: '38%', left: '-45%' }, { top: '44%', left: '-53%' }, { top: '50%', left: '-40%' },
  { top: '56%', left: '-48%' }, { top: '62%', left: '-43%' }, { top: '68%', left: '-52%' },
  { top: '74%', left: '-45%' }, { top: '80%', left: '-50%' }, { top: '86%', left: '-42%' },
  // Right cloud (cost)
  { top: '2%', right: '-45%' }, { top: '8%', right: '-50%' }, { top: '14%', right: '-42%' },
  { top: '20%', right: '-48%' }, { top: '26%', right: '-45%' }, { top: '32%', right: '-52%' },
  { top: '38%', right: '-40%' }, { top: '44%', right: '-48%' }, { top: '50%', right: '-45%' },
  { top: '56%', right: '-50%' }, { top: '62%', right: '-42%' }, { top: '68%', right: '-48%' },
  { top: '74%', right: '-45%' }, { top: '80%', right: '-50%' }, { top: '86%', right: '-42%' },
];

const rotations = ['-2.5deg', '1.8deg', '-1.2deg', '2.3deg', '-1.7deg', '1.1deg', '-2.8deg', '3.1deg', '-0.8deg', '2.6deg', '-2.1deg', '0.9deg', '-1.5deg', '2.4deg', '-1.3deg'];

function labelClass(style: string) {
  const base = 'whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-sm';
  switch (style) {
    case 'stamp': return `${base} bg-red-50 text-red-700 border-red-300 font-bold uppercase tracking-wider shadow-md`;
    case 'sms': return `${base} bg-white text-primary-800 border-primary-200 rounded-xl italic`;
    case 'ticket': return `${base} bg-amber-50 text-amber-900 border-amber-300 font-mono`;
    case 'alert': return `${base} bg-orange-50 text-orange-800 border-orange-300 font-medium`;
    default: return `${base} bg-cream-200/80 text-cream-700 border-cream-300`;
  }
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);

  // Animation state — single object, 30fps
  const animRef = useRef({ rotY: 0, rotX: 0, rotZ: 0, margin: 5.0, revW: 75, costW: 45, mouseX: 0, mouseY: 0 });
  const [display, setDisplay] = useState({ rotY: 0, rotX: 0, rotZ: 0, margin: 5.0, revW: 75, costW: 45 });
  const frameRef = useRef(0);

  // Scroll-driven phases
  const [phase, setPhase] = useState(0); // 0=breathe, 1=labels, 2=pnl, 3=counter, 4=release

  useEffect(() => {
    const stored = localStorage.getItem('balabite-pile-count');
    if (stored) setTotalCount(Math.max(30, parseInt(stored, 10)));
  }, []);

  // Mouse tilt — updates ref (no re-render), picked up by animation loop
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    animRef.current.mouseX = x * 6;
    animRef.current.mouseY = y * -3;
  }, []);

  const handleMouseLeave = useCallback(() => {
    animRef.current.mouseX = 0;
    animRef.current.mouseY = 0;
  }, []);

  // Main animation loop — wobble + P&L, 30fps, single setState
  useEffect(() => {
    const start = Date.now();
    let last = 0;

    const tick = () => {
      const now = Date.now();
      if (now - last < 33) { frameRef.current = requestAnimationFrame(tick); return; }
      last = now;

      const t = (now - start) / 1000;
      const a = animRef.current;

      // Ambient wobble
      const ambY = Math.sin(t * 1.1) * 2.5 + Math.sin(t * 0.7) * 1.0;
      const ambX = Math.sin(t * 0.8 + 1) * 0.5 + Math.sin(t * 1.3) * 0.3;
      const ambZ = Math.sin(t * 0.9 + 2) * 0.8 + Math.sin(t * 0.5) * 0.4;

      const rotY = ambY + a.mouseX;
      const rotX = ambX + a.mouseY;
      const rotZ = ambZ;

      const tilt = Math.max(-1, Math.min(1, rotY / 6));

      // Margin decay over 25 seconds
      const decay = Math.min(t / 25, 1);
      const baseMarg = 5.0 - 1.8 * (1 - Math.pow(1 - decay, 3));
      const margin = Math.max(1.8, Math.min(5.0, baseMarg - Math.abs(tilt) * 0.4));

      const revW = Math.max(20, 75 - 25 * decay + Math.min(0, tilt) * 20);
      const costW = Math.min(95, 45 + 30 * decay + Math.max(0, tilt) * 20);

      setDisplay({ rotY, rotX, rotZ, margin: parseFloat(margin.toFixed(1)), revW, costW });
      frameRef.current = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => { frameRef.current = requestAnimationFrame(tick); }, 800);
    return () => { clearTimeout(timer); cancelAnimationFrame(frameRef.current); };
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.1) setPhase(0);
    else if (v < 0.5) setPhase(1);
    else if (v < 0.65) setPhase(2);
    else if (v < 0.82) setPhase(3);
    else setPhase(4);
  });

  const visibleCount = phase === 0 ? 0 : phase >= 1 ? 15 : 0;
  const showPnL = phase >= 2 && phase < 4;
  const showCounter = phase >= 3 && phase < 4;
  const released = phase === 4;

  const handleAddLabel = () => {
    const trimmed = userLabel.trim();
    if (!trimmed || trimmed.length > 80) return;
    setUserLabels(prev => [...prev, trimmed]);
    setUserLabel('');
    setTotalCount(prev => { const n = prev + 1; localStorage.setItem('balabite-pile-count', String(n)); return n; });
  };

  const mColor = display.margin > 4.5 ? 'text-green-700' : display.margin > 3.8 ? 'text-amber-700' : 'text-red-700';

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-cream-100">
        <div className="h-full flex items-center px-6 pt-20 pb-8">
          <div className="mx-auto flex max-w-[72rem] w-full flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* ── LEFT: Headline + CTA ── */}
            <div className="flex-1 text-center lg:text-left lg:max-w-md">
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-cream-500 mb-3"
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
              >
                The reality
              </motion.p>

              <motion.h1
                className="text-4xl font-bold leading-[1.1] tracking-tight text-primary-900 sm:text-5xl md:text-[3.5rem]"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
              >
                This is a ten-person job.
              </motion.h1>

              <motion.p
                className="mt-5 text-base leading-relaxed text-cream-600 sm:text-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
              >
                You&apos;ve been doing it alone.
                <br />
                <span className="text-primary-900 font-medium">AI changes that.</span>
              </motion.p>

              <motion.div
                className="mt-8 flex gap-3 justify-center lg:justify-start"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
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
                  See how
                </button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                className="mt-5 flex items-center gap-2.5 text-sm text-cream-500 justify-center lg:justify-start"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                </span>
                Live in 3 restaurants
              </motion.div>
            </div>

            {/* ── RIGHT: Image + label cloud + P&L + counter ── */}
            <motion.div
              className="flex-1 flex flex-col items-center w-full lg:max-w-[480px]"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
            >
              {/* Image with cloud */}
              <div
                ref={imageWrapRef}
                className="relative w-full max-w-[400px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* The wobbling image */}
                <div
                  style={{
                    transform: `perspective(800px) rotateY(${display.rotY}deg) rotateX(${display.rotX}deg) rotate(${display.rotZ}deg)`,
                    transformOrigin: '50% 95%',
                    willChange: 'transform',
                  }}
                >
                  <Image
                    src="/illustrations/scenes/hero1.png"
                    alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                    width={800}
                    height={1400}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Label cloud — clustered tight around image */}
                {!released && allLabels.map((label, i) => {
                  const show = i < 15 ? i < visibleCount : (i - 15) < visibleCount;
                  if (!show) return null;
                  const pos = cloudPositions[i];
                  return (
                    <div
                      key={label.text}
                      className={`absolute hidden sm:block transition-all duration-500 ${labelClass(label.style)}`}
                      style={{
                        top: pos.top,
                        left: 'left' in pos ? pos.left : undefined,
                        right: 'right' in pos ? pos.right : undefined,
                        transform: `rotate(${rotations[i % rotations.length]})`,
                        opacity: 1,
                      }}
                    >
                      {label.text}
                    </div>
                  );
                })}

                {/* User-submitted labels */}
                {!released && userLabels.map((text, i) => (
                  <div
                    key={`u-${i}`}
                    className="absolute hidden sm:block bg-red-50 text-red-800 border border-red-300 text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-lg font-medium"
                    style={{
                      top: `${10 + (i * 11) % 75}%`,
                      [i % 2 === 0 ? 'left' : 'right']: '-48%',
                      transform: `rotate(${i % 2 === 0 ? '-2' : '2.5'}deg)`,
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>

              {/* P&L — visible, reactive, synced to wobble */}
              {showPnL && (
                <div className="mt-4 flex items-center justify-center gap-5 text-xs transition-opacity duration-700">
                  <span className="flex items-center gap-2 text-red-500/80">
                    <span className="flex flex-col items-end gap-0.5">
                      <span className="text-[9px] text-cream-500">Revenue</span>
                      <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                        <span className="absolute inset-y-0 left-0 bg-red-400 rounded-full" style={{ width: `${display.revW}%` }} />
                      </span>
                    </span>
                    <span className="text-red-500 font-medium">↓</span>
                  </span>

                  <span className="flex items-center gap-2 text-red-600/80">
                    <span className="text-red-600 font-medium">↑</span>
                    <span className="flex flex-col items-start gap-0.5">
                      <span className="text-[9px] text-cream-500">Costs</span>
                      <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                        <span className="absolute inset-y-0 left-0 bg-red-600 rounded-full" style={{ width: `${display.costW}%` }} />
                      </span>
                    </span>
                  </span>

                  <span className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-cream-500">Margin</span>
                    <span className={`font-bold text-base tabular-nums ${mColor} transition-colors duration-300`}>
                      {display.margin}%
                    </span>
                  </span>
                </div>
              )}

              {/* Counter + Add yours */}
              {showCounter && (
                <div className="mt-5 w-full max-w-sm transition-opacity duration-700">
                  <p className="text-center text-sm text-cream-600 mb-2">
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
                  <p className="text-[10px] text-cream-400 text-center mt-1.5">
                    Every operator carries something different. Leave yours.
                  </p>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
