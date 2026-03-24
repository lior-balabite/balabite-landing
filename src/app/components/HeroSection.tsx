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

/* ── INITIAL LABELS (scroll-revealed) ── */
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

/* ── EXTRA LABEL POOL — drawn from on "Pile it on" clicks ── */
const extraPool: { text: string; s: string; side: 'left' | 'right' }[] = [
  // Revenue pressure (left)
  { text: 'Party of 12 no-showed', s: 'sms', side: 'left' },
  { text: '"Food was cold"', s: 'alert', side: 'left' },
  { text: 'Reservation cancelled (6)', s: 'ticket', side: 'left' },
  { text: 'Uber Eats refund x3', s: 'alert', side: 'left' },
  { text: 'Competitor opened next door', s: 'note', side: 'left' },
  { text: '"We waited 45 minutes"', s: 'sms', side: 'left' },
  { text: 'Wedding cancelled', s: 'sms', side: 'left' },
  { text: 'Rainy week — dead floor', s: 'note', side: 'left' },
  { text: 'Food blogger: "meh"', s: 'alert', side: 'left' },
  { text: 'Catering gig fell through', s: 'sms', side: 'left' },
  { text: '"Manager never came over"', s: 'sms', side: 'left' },
  { text: 'Empty patio again', s: 'note', side: 'left' },
  { text: 'Lost the private event', s: 'sms', side: 'left' },
  { text: 'Regulars stopped coming', s: 'note', side: 'left' },
  { text: 'Gift cards unredeemed', s: 'ticket', side: 'left' },
  // Cost pressure (right)
  { text: 'Minimum wage +$2', s: 'stamp', side: 'right' },
  { text: 'Grease trap emergency', s: 'ticket', side: 'right' },
  { text: 'Walk-in compressor died', s: 'ticket', side: 'right' },
  { text: 'Overtime: 47 hours', s: 'stamp', side: 'right' },
  { text: 'Produce prices +18%', s: 'alert', side: 'right' },
  { text: 'Plumbing backup', s: 'ticket', side: 'right' },
  { text: 'Hood vent inspection: FAIL', s: 'stamp', side: 'right' },
  { text: 'New POS system $4K', s: 'alert', side: 'right' },
  { text: 'Workers comp claim', s: 'stamp', side: 'right' },
  { text: 'Linen service +25%', s: 'alert', side: 'right' },
  { text: 'Fire suppression expired', s: 'stamp', side: 'right' },
  { text: 'Pest control emergency', s: 'ticket', side: 'right' },
  { text: 'Deep clean: $2,800', s: 'alert', side: 'right' },
  { text: 'Fryer needs replacing', s: 'ticket', side: 'right' },
  { text: 'Credit card fees up', s: 'alert', side: 'right' },
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
  const extraWeightRef = useRef(0); // extra tilt from user clicks

  // "Pile it on" state
  const [piledLabels, setPiledLabels] = useState<{ text: string; s: string; side: 'left' | 'right' }[]>([]);
  const [pileCount, setPileCount] = useState(30); // starts at 30 (initial labels)
  const usedIndicesRef = useRef<Set<number>>(new Set());
  const [lastPiledSide, setLastPiledSide] = useState<'left' | 'right'>('left');

  // P&L state — sales & costs in $K behind the scenes
  const [pnl, setPnl] = useState({ sales: 85, costs: 80 });

  // Mouse tracking
  const onMM = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * -0.3;
  }, []);
  const onML = useCallback(() => { mouseRef.current = { x: 0, y: 0 }; }, []);

  // ── PILE IT ON — click handler ──
  const handlePileOn = useCallback(() => {
    // Find an unused label from the pool
    const available = extraPool
      .map((_, i) => i)
      .filter(i => !usedIndicesRef.current.has(i));

    if (available.length === 0) return; // pool exhausted

    const idx = available[Math.floor(Math.random() * available.length)];
    usedIndicesRef.current.add(idx);
    const label = extraPool[idx];

    setPiledLabels(prev => [...prev, label]);
    setPileCount(prev => prev + 1);
    setLastPiledSide(label.side);

    // Increase wobble amplitude — each click adds persistent weight
    extraWeightRef.current = Math.min(12, extraWeightRef.current + 0.8);
  }, []);

  // ── WOBBLE + P&L LOOP ──
  useEffect(() => {
    const t0 = Date.now();
    let lastP = 0;
    const sm = { x: 0, y: 0 };

    const tick = () => {
      const now = Date.now();
      const t = (now - t0) / 1000;

      sm.x += (mouseRef.current.x - sm.x) * 0.03;
      sm.y += (mouseRef.current.y - sm.y) * 0.03;

      // Slow seesaw wobble. Extra weight increases amplitude.
      const weight = extraWeightRef.current;
      const baseAmplitude = 4.5 + weight * 0.15; // gets slightly wilder with more pile
      const primaryTilt = Math.sin(t * 0.8) * baseAmplitude;
      const secondaryTilt = Math.sin(t * 0.3 + 2) * 1.5;
      const mouseInfluence = sm.x * 2;

      const tiltZ = Math.max(-8, Math.min(8, primaryTilt + secondaryTilt + mouseInfluence));
      const tiltX = Math.sin(t * 0.5 + 1) * 0.4 + sm.y;
      const tiltY = Math.sin(t * 0.6) * 0.3;

      if (tiltElRef.current) {
        tiltElRef.current.style.transform =
          `perspective(800px) rotate(${tiltZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // P&L: sales & costs move, margin = gap
      // Extra weight makes the baseline worse (more chaos = harder to run profitably)
      if (now - lastP > 100) {
        lastP = now;

        const maxAngle = 8;
        const normalizedTilt = Math.max(-1, Math.min(1, tiltZ / maxAngle));
        const leftPressure = Math.max(0, -normalizedTilt);
        const rightPressure = Math.max(0, normalizedTilt);

        // Extra weight erodes baseline: each piled label costs ~$0.3K in sales, ~$0.2K in costs
        const weightSalesDrag = weight * 0.3;
        const weightCostsDrag = weight * 0.2;

        const sales = 85 - weightSalesDrag - leftPressure * 10 - rightPressure * 3;
        const costs = 80 + weightCostsDrag + rightPressure * 7 + leftPressure * 1;

        setPnl({ sales, costs });
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // ── SCROLL-DRIVEN ──
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const labelProgress = useTransform(scrollYProgress, [0.05, 0.4], [0, 15]);
  const pnlOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

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

  // Derived P&L display
  const margin = pnl.sales > 0 ? ((pnl.sales - pnl.costs) / pnl.sales) * 100 : 0;
  const marginDisplay = parseFloat(margin.toFixed(1));
  const mColor = margin > 4 ? 'text-green-700' : margin > 1.5 ? 'text-amber-600' : 'text-red-700';
  const maxScale = 100;
  const salesFill = (pnl.sales / maxScale) * 100;
  const costsFill = (pnl.costs / maxScale) * 100;

  // Extra labels split by side
  const piledLeft = piledLabels.filter(l => l.side === 'left');
  const piledRight = piledLabels.filter(l => l.side === 'right');

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen bg-cream-100">
        <div className="h-full flex items-center px-6 sm:px-10 lg:px-16 pt-16 pb-8 overflow-x-clip">
          <div className="mx-auto flex max-w-[90rem] w-full flex-col lg:flex-row items-center gap-8 lg:gap-10">

            {/* ── LEFT: Headline ── */}
            <div className="flex-1 text-center lg:text-left lg:max-w-lg">
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

            {/* ── RIGHT: Image + labels + P&L + Pile on ── */}
            <div className="flex-[1.4] flex flex-col items-center w-full lg:pr-4 xl:pr-8">

              {/* Image container */}
              <div ref={imgRef} className="relative w-full max-w-[440px]"
                onMouseMove={onMM} onMouseLeave={onML}>

                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                  <div ref={tiltElRef} style={{ transformOrigin: '50% 95%', willChange: 'transform' }}>
                    <div className="relative">
                      <Image src="/illustrations/scenes/hero1.png"
                        alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                        width={800} height={1400} className="w-full h-auto" priority />
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
                      <div key={label.text} className={lc(label.s)}
                        style={{
                          transform: show ? `rotate(${rots[i % rots.length]}) translateX(0)` : `rotate(${rots[i % rots.length]}) translateX(20px)`,
                          opacity: show ? 1 : 0,
                          maxHeight: show ? '40px' : '0px',
                          marginBottom: show ? undefined : '-4px',
                          overflow: 'hidden',
                          transitionDelay: show ? `${(i % 3) * 60}ms` : '0ms',
                        }}>
                        {label.text}
                      </div>
                    );
                  })}
                  {/* User-piled labels */}
                  {piledLeft.map((label, i) => (
                    <div key={`pile-l-${i}`}
                      className={`${lc(label.s)} animate-pile-in`}
                      style={{ transform: `rotate(${rots[(i + 7) % rots.length]})` }}>
                      {label.text}
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
                      <div key={label.text} className={lc(label.s)}
                        style={{
                          transform: show ? `rotate(${rots[(i + 5) % rots.length]}) translateX(0)` : `rotate(${rots[(i + 5) % rots.length]}) translateX(-20px)`,
                          opacity: show ? 1 : 0,
                          maxHeight: show ? '40px' : '0px',
                          marginBottom: show ? undefined : '-4px',
                          overflow: 'hidden',
                          transitionDelay: show ? `${(i % 3) * 60}ms` : '0ms',
                        }}>
                        {label.text}
                      </div>
                    );
                  })}
                  {/* User-piled labels */}
                  {piledRight.map((label, i) => (
                    <div key={`pile-r-${i}`}
                      className={`${lc(label.s)} animate-pile-in`}
                      style={{ transform: `rotate(${rots[(i + 3) % rots.length]})` }}>
                      {label.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* P&L — sales & costs bars, margin derived from the gap */}
              <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Sales</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-200 ease-out"
                      style={{
                        width: `${salesFill}%`,
                        backgroundColor: margin > 4 ? '#22c55e' : margin > 1.5 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="text-[10px] text-cream-500 font-medium">Margin</span>
                  <span className={`font-bold text-2xl tabular-nums leading-none ${mColor} transition-colors duration-200`}>
                    {marginDisplay}%
                  </span>
                </span>
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Costs</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-200 ease-out"
                      style={{
                        width: `${costsFill}%`,
                        backgroundColor: margin > 4 ? '#22c55e' : margin > 1.5 ? '#eab308' : '#ef4444',
                      }} />
                  </span>
                </span>
              </div>

              {/* ── PILE IT ON — the interactive moment ── */}
              <div className={`mt-4 flex flex-col items-center gap-2 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <button
                  onClick={handlePileOn}
                  disabled={usedIndicesRef.current.size >= extraPool.length}
                  className="group relative rounded-full border-2 border-dashed border-cream-400/60 px-5 py-2 text-sm text-cream-600 transition-all hover:border-red-400/60 hover:text-red-700 hover:bg-red-50/50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base leading-none transition-transform group-hover:rotate-12">+</span>
                    Pile it on
                  </span>
                </button>
                <p className="text-[10px] text-cream-400 tabular-nums">
                  {pileCount} things on this plate
                  {piledLabels.length > 0 && (
                    <span className="text-red-400"> — you added {piledLabels.length}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Mobile labels */}
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
