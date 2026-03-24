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
  const tiltValueRef = useRef(0); // expose tilt for P&L indicator

  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);
  // Realistic restaurant monthly P&L (in $K)
  // Balanced: $82K rev, $72K costs, $10K margin (12%)
  // Max tilt: ~$68K rev, ~$67K costs, ~$1K margin (~1.5%)
  const [pnl, setPnl] = useState({ rev: 82, costs: 72, margin: 12.2 });

  useEffect(() => {
    const s = localStorage.getItem('balabite-pile-count');
    if (s) setTotalCount(Math.max(30, parseInt(s, 10)));
  }, []);

  // Mouse — ref only, picked up by animation loop with lerp
  const onMM = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * -4;
  }, []);
  const onML = useCallback(() => { mouseRef.current = { x: 0, y: 0 }; }, []);

  // Wobble + P&L loop — direct DOM for tilt, low-freq state for P&L
  useEffect(() => {
    const t0 = Date.now();
    let lastP = 0;
    const sm = { x: 0, y: 0 };

    const tick = () => {
      const now = Date.now();
      const t = (now - t0) / 1000;
      sm.x += (mouseRef.current.x - sm.x) * 0.06;
      sm.y += (mouseRef.current.y - sm.y) * 0.06;

      const rY = Math.sin(t * 1.1) * 2.5 + Math.sin(t * 0.7) * 1.0 + sm.x;
      const rX = Math.sin(t * 0.8 + 1) * 0.5 + Math.sin(t * 1.3) * 0.3 + sm.y;
      const rZ = Math.sin(t * 0.9 + 2) * 0.8 + Math.sin(t * 0.5) * 0.4;

      if (tiltElRef.current) {
        tiltElRef.current.style.transform =
          `perspective(800px) rotateY(${rY}deg) rotateX(${rX}deg) rotate(${rZ}deg)`;
      }

      // Expose tilt for visual indicator
      tiltValueRef.current = rY;

      // Realistic restaurant P&L driven by tilt magnitude
      // Balanced board = healthy operation, any tilt = both revenue drops AND costs rise
      if (now - lastP > 60) {
        lastP = now;
        const maxTilt = 6;
        const tiltMag = Math.min(1, Math.abs(rY) / maxTilt);
        const eased = tiltMag * tiltMag;

        // Revenue drops when tilted (cancellations, empty tables, bad reviews)
        // $82K → $68K at max tilt
        const rev = 82 - eased * 14;
        // Costs rise when tilted (food waste, overtime, emergency repairs, comps)
        // $72K → $67K baseline doesn't drop — costs are sticky. They RISE.
        // $72K → $77K at max tilt
        const costs = 72 + eased * 5;
        // Margin = what's left
        const margin = ((rev - costs) / rev) * 100;

        setPnl({
          rev: parseFloat(rev.toFixed(0)),
          costs: parseFloat(costs.toFixed(0)),
          margin: parseFloat(Math.max(0.5, margin).toFixed(1)),
        });
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // ── SCROLL-DRIVEN ── continuous transforms, no state snapping
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  // Continuous 0-1 value for how many labels to show (mapped to 0-15)
  const labelProgress = useTransform(scrollYProgress, [0.06, 0.5], [0, 15]);
  // P&L, counter, release — continuous opacity
  const pnlOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  // releaseOpacity removed — once things appear, they stay

  // Track label count — only goes UP (once revealed, stays revealed)
  // Using RAF poll instead of on('change') for reliability on initial load
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
    // Delay first check to let framer-motion initialize scroll values
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

  const mColor = pnl.margin > 10 ? 'text-green-700' : pnl.margin > 6 ? 'text-amber-600' : 'text-red-700';

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '250vh' }}>
      {/* Sticky viewport — NO overflow-hidden so labels can extend beyond */}
      <div className="sticky top-0 h-screen bg-cream-100">
        <div className="h-full flex items-center px-4 sm:px-6 pt-20 pb-8 overflow-x-clip">
          <div className="mx-auto flex max-w-[90rem] w-full flex-col lg:flex-row items-center gap-10 lg:gap-12">

            {/* ── LEFT: Headline + Add yours ── */}
            <div className="flex-1 text-center lg:text-left lg:max-w-lg lg:pl-4 xl:pl-12">
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

              {/* ── Add yours — under headline, always visible ── */}
              <motion.div className="mt-8 w-full max-w-sm mx-auto lg:mx-0"
                variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <p className="text-sm text-cream-600 mb-2 lg:text-left text-center">
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
                <p className="text-[10px] text-cream-400 lg:text-left text-center mt-1.5">
                  Every operator carries something different. Leave yours.
                </p>
              </motion.div>
            </div>

            {/* ── RIGHT: Image + labels + P&L — pushed right ── */}
            <div className="flex-[1.3] flex flex-col items-center w-full lg:max-w-[560px] lg:mr-0">

              {/* Image container — labels cluster around this */}
              <div ref={imgRef} className="relative w-full max-w-[440px]"
                onMouseMove={onMM} onMouseLeave={onML}>

                {/* Wobbling image with soft edge blend */}
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

              {/* P&L — margin % with revenue/cost bars that shift green↔red with tilt */}
              <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                {/* Revenue bar */}
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Revenue</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-75"
                      style={{
                        width: `${(pnl.rev / 90) * 100}%`,
                        backgroundColor: pnl.margin > 10 ? '#22c55e' : pnl.margin > 6 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
                {/* Margin % — the hero number */}
                <span className="flex flex-col items-center">
                  <span className="text-[10px] text-cream-500 font-medium">Margin</span>
                  <span className={`font-bold text-2xl tabular-nums leading-none ${mColor} transition-colors duration-150`}>
                    {pnl.margin}%
                  </span>
                </span>
                {/* Costs bar */}
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Costs</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-75"
                      style={{
                        width: `${(pnl.costs / 90) * 100}%`,
                        backgroundColor: pnl.margin > 10 ? '#22c55e' : pnl.margin > 6 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
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
