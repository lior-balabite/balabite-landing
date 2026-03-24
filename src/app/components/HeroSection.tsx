'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
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

/*
 * ALL 30 LABELS — appear one by one as you scroll through viewport 2.
 * Split into revenue (left) and cost (right) pressures.
 */
const revenueLabels = [
  { text: '"Sorry, can\'t make it today"', style: 'sms' },
  { text: 'Where\'s Miguel?', style: 'sms' },
  { text: 'Yelp: 1 star', style: 'alert' },
  { text: 'Table 9 still waiting', style: 'ticket' },
  { text: '86 the special', style: 'ticket' },
  { text: '"Karen wants the manager"', style: 'sms' },
  { text: 'Google: "never coming back"', style: 'alert' },
  { text: 'Dishwasher quit', style: 'sms' },
  { text: 'Closing Mondays', style: 'note' },
  { text: '"We need to talk"', style: 'sms' },
  { text: 'DoorDash refund request', style: 'alert' },
  { text: 'No one\'s closing tonight', style: 'sms' },
  { text: 'Short-staffed again', style: 'sms' },
  { text: '3am. Still here.', style: 'note' },
  { text: 'Missed another recital', style: 'note' },
];

const costLabels = [
  { text: 'PAST DUE', style: 'stamp' },
  { text: 'Rent due in 3 days', style: 'stamp' },
  { text: 'Insurance +22%', style: 'stamp' },
  { text: 'Gas bill doubled', style: 'stamp' },
  { text: 'Food cost +30%', style: 'alert' },
  { text: 'Register short $47', style: 'alert' },
  { text: 'POS just froze', style: 'alert' },
  { text: 'AC is out again', style: 'ticket' },
  { text: 'Ice machine down', style: 'ticket' },
  { text: 'Grease trap backing up', style: 'ticket' },
  { text: 'Health inspection Tuesday', style: 'alert' },
  { text: '"Can you cover?"', style: 'sms' },
  { text: 'Broke a case of wine', style: 'note' },
  { text: '2-top waiting 40 min', style: 'ticket' },
  { text: 'missed call (3)', style: 'note' },
];

function getLabelClass(style: string) {
  switch (style) {
    case 'stamp': return 'bg-red-50 text-red-700 border-red-300 font-bold uppercase tracking-wider';
    case 'sms': return 'bg-white text-primary-800 border-primary-200 rounded-xl italic';
    case 'ticket': return 'bg-amber-50 text-amber-900 border-amber-300 font-mono';
    case 'alert': return 'bg-orange-50 text-orange-800 border-orange-300 font-medium';
    default: return 'bg-cream-200/80 text-cream-700 border-cream-300';
  }
}

const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-2.5deg', '3deg', '-1deg', '2.5deg', '-2deg', '1deg', '-1.5deg', '2deg', '-1deg'];

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);

  // Wobble + P&L state (single object to reduce re-renders)
  const [anim, setAnim] = useState({
    rotY: 0, rotX: 0, rotZ: 0,
    margin: 5.0, revenueW: 75, costW: 45,
  });
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  // How many labels are visible (driven by scroll)
  const [visibleLabels, setVisibleLabels] = useState(0);
  // P&L section visible
  const [showPnL, setShowPnL] = useState(false);
  // Counter visible
  const [showCounter, setShowCounter] = useState(false);
  // Release state — labels fly off
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('balabite-pile-count');
    if (stored) setTotalCount(Math.max(30, parseInt(stored, 10)));
  }, []);

  // Mouse handler — adds extra tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseTiltRef.current = {
      x: Math.max(-1, Math.min(1, x)) * 5,
      y: Math.max(-1, Math.min(1, y)) * -2,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseTiltRef.current = { x: 0, y: 0 };
  }, []);

  // Animation loop — wobble + P&L (batched into single setState, throttled to 30fps)
  useEffect(() => {
    const startTime = Date.now();
    let lastFrame = 0;

    const tick = () => {
      const now = Date.now();
      // Throttle to ~30fps
      if (now - lastFrame < 33) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const elapsed = (now - startTime) / 1000;
      const mouse = mouseTiltRef.current;

      const ambientY = Math.sin(elapsed * 1.1) * 2.5 + Math.sin(elapsed * 0.7) * 1.0;
      const ambientX = Math.sin(elapsed * 0.8 + 1) * 0.5 + Math.sin(elapsed * 1.3) * 0.3;
      const ambientZ = Math.sin(elapsed * 0.9 + 2) * 0.8 + Math.sin(elapsed * 0.5) * 0.4;

      const rotY = ambientY + mouse.x;
      const rotX = ambientX + mouse.y;
      const rotZ = ambientZ;
      const tiltNorm = Math.max(-1, Math.min(1, rotY / 5));

      const marginDecay = Math.min(elapsed / 20, 1);
      const baseMargin = 5.0 - 1.8 * (1 - Math.pow(1 - marginDecay, 3));
      const tiltEffect = tiltNorm * 0.4;
      const margin = Math.max(1.8, Math.min(5.0, baseMargin - Math.abs(tiltEffect)));

      const baseRev = 75 - 25 * marginDecay;
      const revTilt = Math.min(0, tiltNorm) * 20;
      const baseCost = 45 + 30 * marginDecay;
      const costTilt = Math.max(0, tiltNorm) * 20;

      setAnim({
        rotY, rotX, rotZ,
        margin: parseFloat(margin.toFixed(1)),
        revenueW: Math.max(20, baseRev + revTilt),
        costW: Math.min(95, baseCost + costTilt),
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, 1000);

    return () => { clearTimeout(timer); cancelAnimationFrame(frameRef.current); };
  }, []);

  // Scroll tracking — drives label reveal, P&L, counter, release
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // 0.0–0.15: breathe (just headline + image)
    // 0.15–0.55: labels cascade in (0 → 30)
    // 0.55–0.65: P&L appears
    // 0.65–0.75: counter appears
    // 0.75–0.85: hold at max density
    // 0.85–1.0: release — labels fly off
    if (v < 0.15) {
      setVisibleLabels(0);
      setShowPnL(false);
      setShowCounter(false);
      setReleased(false);
    } else if (v < 0.55) {
      const labelProgress = (v - 0.15) / 0.4;
      setVisibleLabels(Math.floor(labelProgress * 15));
      setShowPnL(false);
      setShowCounter(false);
      setReleased(false);
    } else if (v < 0.65) {
      setVisibleLabels(15);
      setShowPnL(true);
      setShowCounter(false);
      setReleased(false);
    } else if (v < 0.85) {
      setVisibleLabels(15);
      setShowPnL(true);
      setShowCounter(true);
      setReleased(false);
    } else {
      setReleased(true);
    }
  });

  const handleAddLabel = () => {
    const trimmed = userLabel.trim();
    if (!trimmed || trimmed.length > 80) return;
    setUserLabels(prev => [...prev, trimmed]);
    setUserLabel('');
    const newCount = totalCount + 1;
    setTotalCount(newCount);
    localStorage.setItem('balabite-pile-count', String(newCount));
  };

  const marginColor = anim.margin > 4.5 ? 'text-green-700' : anim.margin > 3.8 ? 'text-amber-700' : 'text-red-700';

  return (
    <>
      {/* Scroll container — tall enough for the sticky sequence */}
      <div ref={stickyRef} className="relative bg-cream-100" style={{ height: '400vh' }}>

        {/* Sticky viewport — pinned while scrolling through the 400vh container */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-cream-100">
          <div className="relative z-10 flex flex-1 items-center px-6 pt-24 pb-8">
            <div className="mx-auto flex max-w-[76rem] w-full flex-col lg:flex-row items-center gap-10 lg:gap-12">

              {/* LEFT — Headline + CTA (always visible) */}
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
                  Still standing.
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
                </motion.div>

                {/* Revenue labels — appear on scroll */}
                <div className="hidden lg:flex flex-col items-start gap-2 mt-10">
                  {!released && (
                    <>
                      {visibleLabels > 0 && (
                        <p className="text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-1 transition-opacity duration-300">
                          Revenue pressure
                        </p>
                      )}
                      {revenueLabels.slice(0, visibleLabels).map((label, i) => (
                        <div
                          key={label.text}
                          className={`border rounded-md whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 shadow-sm transition-all duration-500 ${getLabelClass(label.style)}`}
                          style={{
                            transform: `rotate(${rotations[i % rotations.length]})`,
                            opacity: 1,
                          }}
                        >
                          {label.text}
                        </div>
                      ))}
                      {userLabels.filter((_, i) => i % 2 === 0).map((text, i) => (
                        <div
                          key={`user-l-${i}`}
                          className="border rounded-md whitespace-nowrap bg-red-50 text-red-800 border-red-300 text-[10px] sm:text-xs px-2.5 py-1 shadow-md font-medium"
                          style={{ transform: `rotate(${rotations[(i + 3) % rotations.length]})` }}
                        >
                          {text}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT — Image + labels + P&L + counter */}
              <div className="flex-1 flex flex-col items-center w-full lg:max-w-[520px]">
                <div
                  ref={imageRef}
                  className="relative w-full max-w-[440px]"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* The wobbling balance board */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <div
                      style={{
                        transform: `perspective(800px) rotateY(${anim.rotY}deg) rotateX(${anim.rotX}deg) rotate(${anim.rotZ}deg)`,
                        transformOrigin: '50% 95%',
                        willChange: 'transform',
                      }}
                    >
                      <Image
                        src="/illustrations/scenes/hero1.png"
                        alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                        width={800}
                        height={1400}
                        className="w-full h-auto relative z-10"
                        priority
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Cost labels — right side, appear on scroll */}
                <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-start gap-2 max-w-[200px]">
                  {!released && (
                    <>
                      {visibleLabels > 0 && (
                        <p className="text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-1">
                          Cost pressure
                        </p>
                      )}
                      {costLabels.slice(0, visibleLabels).map((label, i) => (
                        <div
                          key={label.text}
                          className={`border rounded-md whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 shadow-sm transition-all duration-500 ${getLabelClass(label.style)}`}
                          style={{
                            transform: `rotate(${rotations[(i + 5) % rotations.length]})`,
                            opacity: 1,
                          }}
                        >
                          {label.text}
                        </div>
                      ))}
                      {userLabels.filter((_, i) => i % 2 === 1).map((text, i) => (
                        <div
                          key={`user-r-${i}`}
                          className="border rounded-md whitespace-nowrap bg-red-50 text-red-800 border-red-300 text-[10px] sm:text-xs px-2.5 py-1 shadow-md font-medium"
                          style={{ transform: `rotate(${rotations[(i + 7) % rotations.length]})` }}
                        >
                          {text}
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* P&L — appears at scroll phase 3 */}
                {showPnL && !released && (
                  <div className="mt-3 flex items-center justify-center gap-5 text-xs animate-in fade-in duration-500">
                    <span className="flex items-center gap-2 text-red-500/80">
                      <span className="flex flex-col items-end gap-0.5">
                        <span className="text-[9px] text-cream-500">Revenue</span>
                        <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                          <span
                            className="absolute inset-y-0 left-0 bg-red-400 rounded-full"
                            style={{ width: `${anim.revenueW}%` }}
                          />
                        </span>
                      </span>
                      <span className="text-red-500 font-medium">↓</span>
                    </span>

                    <span className="flex items-center gap-2 text-red-600/80">
                      <span className="text-red-600 font-medium">↑</span>
                      <span className="flex flex-col items-start gap-0.5">
                        <span className="text-[9px] text-cream-500">Costs</span>
                        <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                          <span
                            className="absolute inset-y-0 left-0 bg-red-600 rounded-full"
                            style={{ width: `${anim.costW}%` }}
                          />
                        </span>
                      </span>
                    </span>

                    <span className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-cream-500">Margin</span>
                      <span className={`font-bold text-sm tabular-nums ${marginColor} transition-colors duration-300`}>
                        {anim.margin}%
                      </span>
                    </span>
                  </div>
                )}

                {/* Counter + Add yours — appears at scroll phase 4 */}
                {showCounter && !released && (
                  <div className="mt-4 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
