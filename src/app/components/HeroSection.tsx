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

/* ── LABELS ── */
const leftLabels = [
  { text: '"Sorry, can\'t make it today"', s: 'sms' },
  { text: 'Where\'s Miguel?', s: 'sms' },
  { text: 'Yelp: 1 star', s: 'alert' },
  { text: 'Table 9 still waiting', s: 'ticket' },
  { text: '86 the special', s: 'ticket' },
  { text: '"Karen wants the manager"', s: 'sms' },
  { text: 'Google: "never coming back"', s: 'alert' },
  { text: 'Dishwasher quit', s: 'sms' },
  { text: 'Closing Mondays', s: 'note' },
  { text: '"We need to talk"', s: 'sms' },
  { text: 'Short-staffed again', s: 'sms' },
  { text: '3am. Still here.', s: 'note' },
  { text: 'Missed another recital', s: 'note' },
  { text: 'DoorDash refund', s: 'alert' },
  { text: 'No one\'s closing tonight', s: 'sms' },
];

const rightLabels = [
  { text: 'PAST DUE', s: 'stamp' },
  { text: 'Rent due in 3 days', s: 'stamp' },
  { text: 'Insurance +22%', s: 'stamp' },
  { text: 'Gas bill doubled', s: 'stamp' },
  { text: 'Food cost +30%', s: 'alert' },
  { text: 'Register short $47', s: 'alert' },
  { text: 'POS just froze', s: 'alert' },
  { text: 'AC is out again', s: 'ticket' },
  { text: 'Ice machine down', s: 'ticket' },
  { text: 'Grease trap backing up', s: 'ticket' },
  { text: 'Health inspection Tuesday', s: 'alert' },
  { text: '"Can you cover?"', s: 'sms' },
  { text: 'Broke a case of wine', s: 'note' },
  { text: '2-top waiting 40 min', s: 'ticket' },
  { text: 'missed call (3)', s: 'note' },
];

const rots = ['-2.5deg', '1.8deg', '-1.2deg', '2.3deg', '-1.7deg', '1.1deg', '-2.8deg', '3.1deg', '-0.8deg', '2.6deg', '-2.1deg', '0.9deg', '-1.5deg', '2.4deg', '-1.3deg'];

function lc(s: string) {
  const b = 'whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-sm transition-all duration-700 ease-out';
  switch (s) {
    case 'stamp': return `${b} bg-red-50 text-red-700 border-red-300 font-bold uppercase tracking-wider shadow-md`;
    case 'sms': return `${b} bg-white text-primary-800 border-primary-200 rounded-xl italic`;
    case 'ticket': return `${b} bg-amber-50 text-amber-900 border-amber-300 font-mono`;
    case 'alert': return `${b} bg-orange-50 text-orange-800 border-orange-300 font-medium`;
    default: return `${b} bg-cream-200/80 text-cream-700 border-cream-300`;
  }
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const tiltElRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);
  // P&L state — margin %, revenue bar fill, costs bar fill
  const [pnl, setPnl] = useState({ margin: 12.2, revFill: 85, costFill: 40 });

  useEffect(() => {
    const s = localStorage.getItem('balabite-pile-count');
    if (s) setTotalCount(Math.max(30, parseInt(s, 10)));
  }, []);

  // Mouse — ref only, picked up by animation loop with lerp
  const onMM = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    // Mouse influence: horizontal position maps to tilt direction
    mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * -0.3;
  }, []);
  const onML = useCallback(() => { mouseRef.current = { x: 0, y: 0 }; }, []);

  // ── WOBBLE + P&L LOOP ──
  // The board tilts side-to-side like a seesaw (Z-axis rotation).
  // Tilt LEFT (negative) = revenue pressure side → revenue drops
  // Tilt RIGHT (positive) = cost pressure side → costs rise
  // Balanced (center) = healthy margin
  useEffect(() => {
    const t0 = Date.now();
    let lastP = 0;
    const sm = { x: 0, y: 0 };

    const tick = () => {
      const now = Date.now();
      const t = (now - t0) / 1000;

      // Smooth mouse lerp
      sm.x += (mouseRef.current.x - sm.x) * 0.03;
      sm.y += (mouseRef.current.y - sm.y) * 0.03;

      // ── SLOW, DELIBERATE WOBBLE ──
      // Primary: one slow sine wave (~8s per full cycle) for the main seesaw lean
      // Secondary: subtle organic variation
      const primaryTilt = Math.sin(t * 0.8) * 4.5;        // ±4.5° over ~8s
      const secondaryTilt = Math.sin(t * 0.3 + 2) * 1.5;  // ±1.5° very slow drift
      const mouseInfluence = sm.x * 3;                     // mouse adds up to ±3°

      // Z-axis rotation = visible seesaw tilt
      const tiltZ = primaryTilt + secondaryTilt + mouseInfluence;
      // Subtle 3D depth — very minor, just enough to feel alive
      const tiltX = Math.sin(t * 0.5 + 1) * 0.4 + sm.y;
      const tiltY = Math.sin(t * 0.6) * 0.3;

      if (tiltElRef.current) {
        tiltElRef.current.style.transform =
          `perspective(800px) rotate(${tiltZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // ── P&L DRIVEN BY TILT DIRECTION ──
      // tiltZ negative = leaning LEFT = revenue pressure (those labels are on the left)
      // tiltZ positive = leaning RIGHT = cost pressure (those labels are on the right)
      // The further the lean, the worse that side gets
      if (now - lastP > 100) {
        lastP = now;

        // Normalize tilt: -1 (full left) to +1 (full right)
        const maxAngle = 8; // max possible tilt from sine + mouse
        const normalizedTilt = Math.max(-1, Math.min(1, tiltZ / maxAngle));
        const absTilt = Math.abs(normalizedTilt);

        // Revenue: hurt by LEFT tilt (negative). Healthy at center/right.
        // Range: 85% fill (good) → 45% fill (bad)
        const leftPressure = Math.max(0, -normalizedTilt); // 0-1, only when tilting left
        const revFill = 85 - leftPressure * 40 - absTilt * 5; // slight overall penalty too

        // Costs: hurt by RIGHT tilt (positive). Low at center/left.
        // Range: 40% fill (good) → 80% fill (bad)
        const rightPressure = Math.max(0, normalizedTilt); // 0-1, only when tilting right
        const costFill = 40 + rightPressure * 40 + absTilt * 5;

        // Margin: derived from the gap
        // Balanced: ~12%. Max left tilt: ~3%. Max right tilt: ~3%.
        const margin = 12.2 - leftPressure * 9 - rightPressure * 9 - absTilt * 0.5;

        setPnl({
          margin: parseFloat(Math.max(1.0, margin).toFixed(1)),
          revFill: Math.max(30, Math.min(90, revFill)),
          costFill: Math.max(35, Math.min(85, costFill)),
        });
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // ── SCROLL-DRIVEN ── continuous transforms, no state snapping
  // 350vh container = more scroll room. P&L appears ~40% and has time to breathe.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const labelProgress = useTransform(scrollYProgress, [0.05, 0.4], [0, 15]);
  const pnlOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  // Track label count — only goes UP (once revealed, stays revealed)
  const [visibleCount, setVisibleCount] = useState(0);
  const maxSeenRef = useRef(0);
  const [pnlRevealed, setPnlRevealed] = useState(false);
  const scrollFrameRef = useRef(0);

  useEffect(() => {
    const check = () => {
      const lp = labelProgress.get();
      const count = Math.floor(Math.max(0, Math.min(15, lp)));
      if (count > maxSeenRef.current) {
        maxSeenRef.current = count;
        setVisibleCount(count);
      }
      if (!pnlRevealed && pnlOpacity.get() > 0.3) setPnlRevealed(true);
      scrollFrameRef.current = requestAnimationFrame(check);
    };
    const timeout = setTimeout(() => {
      scrollFrameRef.current = requestAnimationFrame(check);
    }, 100);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [labelProgress, pnlOpacity, pnlRevealed]);

  const handleAdd = () => {
    const trimmed = userLabel.trim();
    if (!trimmed || trimmed.length > 80) return;
    setUserLabels(prev => [...prev, trimmed]);
    setUserLabel('');
    setTotalCount(prev => { const n = prev + 1; localStorage.setItem('balabite-pile-count', String(n)); return n; });
  };

  const mColor = pnl.margin > 10 ? 'text-green-700' : pnl.margin > 5 ? 'text-amber-600' : 'text-red-700';

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '350vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen bg-cream-100">
        <div className="h-full flex items-center px-6 sm:px-10 lg:px-16 pt-20 pb-8 overflow-x-clip">
          <div className="mx-auto flex max-w-[90rem] w-full flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── LEFT: Headline ── */}
            <div className="flex-1 text-center lg:text-left lg:max-w-md">
              <motion.p className="text-xs uppercase tracking-[0.2em] text-cream-500 mb-3"
                variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                The reality
              </motion.p>
              <motion.h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-primary-900 sm:text-5xl md:text-[3.5rem]"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                This is a ten-person job.
              </motion.h1>
              <motion.p className="mt-5 text-base leading-relaxed text-cream-600 sm:text-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                You&apos;ve been doing it alone.<br />
                <span className="text-primary-900 font-medium">AI changes that.</span>
              </motion.p>
              <motion.div className="mt-8 flex gap-3 justify-center lg:justify-start"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <button onClick={onCtaClick}
                  className="rounded-full bg-primary-900 px-7 py-3 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97]">
                  Put AI to Work
                </button>
                <button onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full border border-primary-900/20 px-7 py-3 text-sm font-semibold text-primary-900 transition-all hover:border-primary-900/40 hover:bg-primary-900/5 active:scale-[0.97]">
                  See how
                </button>
              </motion.div>
              <motion.div className="mt-5 flex items-center gap-2.5 text-sm text-cream-500 justify-center lg:justify-start"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                </span>
                Live in 3 restaurants
              </motion.div>
            </div>

            {/* ── RIGHT: Image + labels + P&L + Add yours — pushed right ── */}
            <div className="flex-[1.4] flex flex-col items-center w-full lg:max-w-[580px]">

              {/* Image container — labels cluster around this */}
              <div ref={imgRef} className="relative w-full max-w-[440px]"
                onMouseMove={onMM} onMouseLeave={onML}>

                {/* Wobbling image — tilts like a seesaw */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                  <div ref={tiltElRef} style={{ transformOrigin: '50% 95%', willChange: 'transform' }}>
                    <div className="relative">
                      <Image src="/illustrations/scenes/hero1.png"
                        alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                        width={800} height={1400} className="w-full h-auto" priority />
                      {/* Soft gradient blend into background */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `
                            linear-gradient(to bottom, transparent 0%, transparent 85%, var(--cream-100, #FAF5EE) 100%),
                            radial-gradient(ellipse at center, transparent 60%, var(--cream-100, #FAF5EE) 100%)
                          `,
                        }} />
                    </div>
                  </div>
                </motion.div>

                {/* LEFT LABEL CLOUD — revenue pressure */}
                <div className="absolute top-0 right-full pr-4 hidden sm:flex flex-col gap-2 items-end w-[240px]">
                  <p className={`text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-0.5 mr-1 transition-opacity duration-500 ${visibleCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    Revenue pressure
                  </p>
                  {leftLabels.map((label, i) => {
                    const show = i < visibleCount;
                    return (
                      <div
                        key={label.text}
                        className={lc(label.s)}
                        style={{
                          transform: show ? `rotate(${rots[i % rots.length]}) translateX(0)` : `rotate(${rots[i % rots.length]}) translateX(20px)`,
                          opacity: show ? 1 : 0,
                          maxHeight: show ? '40px' : '0px',
                          marginBottom: show ? undefined : '-4px',
                          overflow: 'hidden',
                          transitionDelay: show ? `${(i % 3) * 60}ms` : '0ms',
                        }}
                      >
                        {label.text}
                      </div>
                    );
                  })}
                  {userLabels.filter((_, i) => i % 2 === 0).map((text, i) => (
                    <div key={`ul-${i}`}
                      className="whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-lg bg-red-50 text-red-800 border-red-300 font-medium transition-all duration-500"
                      style={{ transform: `rotate(${rots[(i + 3) % rots.length]})` }}>
                      {text}
                    </div>
                  ))}
                </div>

                {/* RIGHT LABEL CLOUD — cost pressure */}
                <div className="absolute top-0 left-full pl-4 hidden sm:flex flex-col gap-2 items-start w-[240px]">
                  <p className={`text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-0.5 ml-1 transition-opacity duration-500 ${visibleCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    Cost pressure
                  </p>
                  {rightLabels.map((label, i) => {
                    const show = i < visibleCount;
                    return (
                      <div
                        key={label.text}
                        className={lc(label.s)}
                        style={{
                          transform: show ? `rotate(${rots[(i + 5) % rots.length]}) translateX(0)` : `rotate(${rots[(i + 5) % rots.length]}) translateX(-20px)`,
                          opacity: show ? 1 : 0,
                          maxHeight: show ? '40px' : '0px',
                          marginBottom: show ? undefined : '-4px',
                          overflow: 'hidden',
                          transitionDelay: show ? `${(i % 3) * 60}ms` : '0ms',
                        }}
                      >
                        {label.text}
                      </div>
                    );
                  })}
                  {userLabels.filter((_, i) => i % 2 === 1).map((text, i) => (
                    <div key={`ur-${i}`}
                      className="whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-lg bg-red-50 text-red-800 border-red-300 font-medium transition-all duration-500"
                      style={{ transform: `rotate(${rots[(i + 7) % rots.length]})` }}>
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* P&L — margin % with directional revenue/cost bars */}
              <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                {/* Revenue bar — shrinks when board leans left */}
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Revenue</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-200 ease-out"
                      style={{
                        width: `${pnl.revFill}%`,
                        backgroundColor: pnl.revFill > 75 ? '#22c55e' : pnl.revFill > 60 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
                {/* Margin % — the hero number */}
                <span className="flex flex-col items-center">
                  <span className="text-[10px] text-cream-500 font-medium">Margin</span>
                  <span className={`font-bold text-2xl tabular-nums leading-none ${mColor} transition-colors duration-200`}>
                    {pnl.margin}%
                  </span>
                </span>
                {/* Costs bar — grows when board leans right */}
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Costs</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-200 ease-out"
                      style={{
                        width: `${pnl.costFill}%`,
                        backgroundColor: pnl.costFill < 50 ? '#22c55e' : pnl.costFill < 65 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
              </div>

              {/* Add yours — under the P&L in the right column */}
              <div className={`mt-5 w-full max-w-sm transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <p className="text-center text-sm text-cream-600 mb-2">
                  Things on this person&apos;s plate:{' '}
                  <span className="font-bold text-primary-900 text-base">{totalCount}</span>
                </p>
                <div className="flex gap-2">
                  <input type="text" value={userLabel}
                    onChange={(e) => setUserLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="What's on yours?" maxLength={80}
                    className="flex-1 rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm text-primary-900 placeholder:text-cream-400 focus:outline-none focus:border-cream-500 focus:ring-1 focus:ring-cream-500" />
                  <button onClick={handleAdd}
                    className="rounded-lg bg-primary-900 px-4 py-2 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97] whitespace-nowrap">
                    Add yours
                  </button>
                </div>
                <p className="text-[10px] text-cream-400 text-center mt-1.5">
                  Every operator carries something different. Leave yours.
                </p>
              </div>
            </div>

            {/* Mobile labels — below image, no scroll gating */}
            <div className="flex sm:hidden gap-3 w-full max-w-md mx-auto">
              <div className="flex-1 flex flex-col items-end gap-1.5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Revenue</p>
                {leftLabels.slice(0, 6).map((l, i) => (
                  <div key={l.text} className={lc(l.s)} style={{ transform: `rotate(${rots[i]})` }}>{l.text}</div>
                ))}
              </div>
              <div className="flex-1 flex flex-col items-start gap-1.5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Costs</p>
                {rightLabels.slice(0, 6).map((l, i) => (
                  <div key={l.text} className={lc(l.s)} style={{ transform: `rotate(${rots[(i+5) % rots.length]})` }}>{l.text}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
