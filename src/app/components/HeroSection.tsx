'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

/* ── ALL LABELS — initial 15 per side + 30 extras ── */
const leftLabelsAll = [
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
  // Extras (from pool)
  { text: 'Party of 12 no-showed', s: 'sms' },
  { text: '"Food was cold"', s: 'alert' },
  { text: 'Reservation cancelled (6)', s: 'ticket' },
  { text: 'Uber Eats refund x3', s: 'alert' },
  { text: 'Competitor opened next door', s: 'note' },
  { text: '"We waited 45 minutes"', s: 'sms' },
  { text: 'Wedding cancelled', s: 'sms' },
  { text: 'Rainy week — dead floor', s: 'note' },
  { text: 'Food blogger: "meh"', s: 'alert' },
  { text: 'Catering gig fell through', s: 'sms' },
  { text: '"Manager never came over"', s: 'sms' },
  { text: 'Empty patio again', s: 'note' },
  { text: 'Lost the private event', s: 'sms' },
  { text: 'Regulars stopped coming', s: 'note' },
  { text: 'Gift cards unredeemed', s: 'ticket' },
];

const rightLabelsAll = [
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
  // Extras (from pool)
  { text: 'Minimum wage +$2', s: 'stamp' },
  { text: 'Grease trap emergency', s: 'ticket' },
  { text: 'Walk-in compressor died', s: 'ticket' },
  { text: 'Overtime: 47 hours', s: 'stamp' },
  { text: 'Produce prices +18%', s: 'alert' },
  { text: 'Plumbing backup', s: 'ticket' },
  { text: 'Hood vent inspection: FAIL', s: 'stamp' },
  { text: 'New POS system $4K', s: 'alert' },
  { text: 'Workers comp claim', s: 'stamp' },
  { text: 'Linen service +25%', s: 'alert' },
  { text: 'Fire suppression expired', s: 'stamp' },
  { text: 'Pest control emergency', s: 'ticket' },
  { text: 'Deep clean: $2,800', s: 'alert' },
  { text: 'Fryer needs replacing', s: 'ticket' },
  { text: 'Credit card fees up', s: 'alert' },
];

const rots = ['-2.5deg', '1.8deg', '-1.2deg', '2.3deg', '-1.7deg', '1.1deg', '-2.8deg', '3.1deg', '-0.8deg', '2.6deg', '-2.1deg', '0.9deg', '-1.5deg', '2.4deg', '-1.3deg'];

function lc(s: string) {
  const b = 'whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-sm';
  switch (s) {
    case 'stamp': return `${b} bg-red-50 text-red-700 border-red-300 font-bold uppercase tracking-wider shadow-md`;
    case 'sms': return `${b} bg-white text-primary-800 border-primary-200 rounded-xl italic`;
    case 'ticket': return `${b} bg-amber-50 text-amber-900 border-amber-300 font-mono`;
    case 'alert': return `${b} bg-orange-50 text-orange-800 border-orange-300 font-medium`;
    default: return `${b} bg-cream-200/80 text-cream-700 border-cream-300`;
  }
}

// Flying label animation: starts at button position, flies to target slot
const flyVariants = {
  initial: (custom: { dx: number; dy: number }) => ({
    x: custom.dx,
    y: custom.dy,
    scale: 1.1,
    opacity: 0.9,
  }),
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const tiltElRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const extraWeightRef = useRef(0);

  // Dynamic column capacity — measured on mount
  const [maxLabels, setMaxLabels] = useState(13);

  // Current visible labels per column (swappable)
  const [leftSlots, setLeftSlots] = useState<{ text: string; s: string; key: number }[]>([]);
  const [rightSlots, setRightSlots] = useState<{ text: string; s: string; key: number }[]>([]);
  const nextPoolIdxRef = useRef({ left: 15, right: 15 }); // start after initial 15
  const keyCounterRef = useRef(100);

  // Flying label state: which slot is being swapped and the flight vector
  const [flyingLabel, setFlyingLabel] = useState<{
    text: string; s: string; side: 'left' | 'right';
    slotIdx: number; dx: number; dy: number; key: number;
  } | null>(null);

  const [pnl, setPnl] = useState({ sales: 85, costs: 80 });

  // Measure column capacity on mount and resize
  useEffect(() => {
    const measure = () => {
      if (leftColRef.current) {
        const h = leftColRef.current.clientHeight;
        const labelH = 28; // approx height per label + gap
        setMaxLabels(Math.max(8, Math.floor(h / labelH)));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Initialize slots when visibleCount or maxLabels changes
  const [visibleCount, setVisibleCount] = useState(0);
  const prevVisibleRef = useRef(0);

  useEffect(() => {
    if (visibleCount > prevVisibleRef.current) {
      const count = Math.min(visibleCount, maxLabels);
      setLeftSlots(leftLabelsAll.slice(0, count).map((l, i) => ({ ...l, key: i })));
      setRightSlots(rightLabelsAll.slice(0, count).map((l, i) => ({ ...l, key: i })));
      prevVisibleRef.current = visibleCount;
    }
  }, [visibleCount, maxLabels]);

  const onMM = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * -0.3;
  }, []);
  const onML = useCallback(() => { mouseRef.current = { x: 0, y: 0 }; }, []);

  // ── CLICK HANDLER: Pick a label, fly it to a random slot, swap ──
  const handlePileOn = useCallback(() => {
    // Alternate sides, pick next from the pool
    const side: 'left' | 'right' = nextPoolIdxRef.current.left <= nextPoolIdxRef.current.right ? 'left' : 'right';
    const pool = side === 'left' ? leftLabelsAll : rightLabelsAll;
    const poolIdx = nextPoolIdxRef.current[side];
    if (poolIdx >= pool.length) return; // exhausted

    const newLabel = pool[poolIdx];
    nextPoolIdxRef.current[side] = poolIdx + 1;

    // Pick a random visible slot to replace
    const slots = side === 'left' ? leftSlots : rightSlots;
    if (slots.length === 0) return;
    const slotIdx = Math.floor(Math.random() * slots.length);

    // Calculate flight vector: from button to target slot
    let dx = 0, dy = 0;
    if (buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const colRef = side === 'left' ? leftColRef.current : rightColRef.current;
      if (colRef) {
        const slotEls = colRef.querySelectorAll('[data-label-slot]');
        const targetEl = slotEls[slotIdx];
        if (targetEl) {
          const targetRect = targetEl.getBoundingClientRect();
          dx = btnRect.left + btnRect.width / 2 - (targetRect.left + targetRect.width / 2);
          dy = btnRect.top + btnRect.height / 2 - (targetRect.top + targetRect.height / 2);
        }
      }
    }

    const key = keyCounterRef.current++;

    // Start the flying animation
    setFlyingLabel({ text: newLabel.text, s: newLabel.s, side, slotIdx, dx, dy, key });

    // After flight completes, swap the slot content
    setTimeout(() => {
      if (side === 'left') {
        setLeftSlots(prev => prev.map((slot, i) =>
          i === slotIdx ? { text: newLabel.text, s: newLabel.s, key } : slot
        ));
      } else {
        setRightSlots(prev => prev.map((slot, i) =>
          i === slotIdx ? { text: newLabel.text, s: newLabel.s, key } : slot
        ));
      }
      setFlyingLabel(null);
    }, 500);

    extraWeightRef.current = Math.min(15, extraWeightRef.current + 1);
  }, [leftSlots, rightSlots]);

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

      const weight = extraWeightRef.current;
      const baseAmplitude = 4.5 + weight * 0.15;
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

      if (now - lastP > 100) {
        lastP = now;
        const maxAngle = 8;
        const normalizedTilt = Math.max(-1, Math.min(1, tiltZ / maxAngle));
        const leftPressure = Math.max(0, -normalizedTilt);
        const rightPressure = Math.max(0, normalizedTilt);

        const weightSalesDrag = weight * 0.2;
        const weightCostsDrag = weight * 0.15;
        const leftEased = leftPressure * leftPressure;
        const rightEased = rightPressure * rightPressure;

        const sales = 85 - weightSalesDrag - leftEased * 12 - rightEased * 4;
        const costs = 80 + weightCostsDrag + rightEased * 9 + leftEased * 1.5;

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

  const maxSeenRef = useRef(0);
  const [pnlRevealed, setPnlRevealed] = useState(false);
  const scrollFrameRef = useRef(0);

  useEffect(() => {
    const check = () => {
      const lp = labelProgress.get();
      const count = Math.floor(Math.max(0, Math.min(maxLabels, lp)));
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
  }, [labelProgress, pnlOpacity, pnlRevealed, maxLabels]);

  // Derived P&L
  const margin = pnl.sales > 0 ? ((pnl.sales - pnl.costs) / pnl.sales) * 100 : 0;
  const marginDisplay = parseFloat(margin.toFixed(1));
  const mColor = margin > 4 ? 'text-green-700' : margin > 1.5 ? 'text-amber-600' : 'text-red-700';

  const salesMin = 70, salesMax = 86;
  const salesFill = Math.max(12, Math.min(90, ((pnl.sales - salesMin) / (salesMax - salesMin)) * 100));
  const salesColor = pnl.sales > 83 ? '#22c55e' : pnl.sales > 79 ? '#eab308' : '#ef4444';

  const costsMin = 76, costsMax = 90;
  const costsFill = Math.max(12, Math.min(90, ((pnl.costs - costsMin) / (costsMax - costsMin)) * 100));
  const costsColor = pnl.costs < 81.5 ? '#22c55e' : pnl.costs < 83 ? '#eab308' : '#ef4444';

  const isPoolExhausted =
    nextPoolIdxRef.current.left >= leftLabelsAll.length &&
    nextPoolIdxRef.current.right >= rightLabelsAll.length;

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '300vh' }}>
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

            {/* ── RIGHT: Image + labels + P&L ── */}
            <div className="flex-[1.4] flex flex-col items-center w-full lg:pr-4 xl:pr-8">

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

                {/* ── Button at the fulcrum ── */}
                <div className={`absolute bottom-[3%] left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                  <button
                    ref={buttonRef}
                    onClick={handlePileOn}
                    disabled={isPoolExhausted || flyingLabel !== null}
                    className="group rounded-full bg-white/80 backdrop-blur-sm border border-cream-300/80 shadow-sm px-4 py-1.5 text-xs text-cream-600 transition-all hover:border-red-400/60 hover:text-red-700 hover:bg-red-50/80 hover:shadow-md active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed animate-nudge"
                  >
                    <span className="inline-flex items-center gap-1">
                      <span className="text-sm leading-none transition-transform group-hover:rotate-12">+</span>
                      {isPoolExhausted ? 'Plate is full' : 'Add another problem'}
                    </span>
                  </button>
                </div>

                {/* LEFT LABEL CLOUD */}
                <div ref={leftColRef} className="absolute top-0 right-full pr-4 pt-14 bottom-8 hidden sm:flex flex-col gap-1.5 items-end w-[240px] overflow-hidden">
                  <p className={`text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-0.5 mr-1 transition-opacity duration-500 flex-shrink-0 ${visibleCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    Revenue pressure
                  </p>
                  <AnimatePresence mode="popLayout">
                    {leftSlots.map((label, i) => (
                      <motion.div
                        key={label.key}
                        data-label-slot
                        layout
                        initial={label.key >= 100 ? { scale: 0.8, opacity: 0 } : false}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={lc(label.s)}
                        style={{ transform: `rotate(${rots[i % rots.length]})` }}
                      >
                        {label.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* RIGHT LABEL CLOUD */}
                <div ref={rightColRef} className="absolute top-0 left-full pl-4 pt-14 bottom-8 hidden sm:flex flex-col gap-1.5 items-start w-[240px] overflow-hidden">
                  <p className={`text-[10px] uppercase tracking-[0.25em] text-red-400/50 mb-0.5 ml-1 transition-opacity duration-500 flex-shrink-0 ${visibleCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    Cost pressure
                  </p>
                  <AnimatePresence mode="popLayout">
                    {rightSlots.map((label, i) => (
                      <motion.div
                        key={label.key}
                        data-label-slot
                        layout
                        initial={label.key >= 100 ? { scale: 0.8, opacity: 0 } : false}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={lc(label.s)}
                        style={{ transform: `rotate(${rots[(i + 5) % rots.length]})` }}
                      >
                        {label.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* ── Flying label — animates from button to target slot ── */}
                <AnimatePresence>
                  {flyingLabel && (
                    <motion.div
                      key={flyingLabel.key}
                      custom={{ dx: flyingLabel.dx, dy: flyingLabel.dy }}
                      variants={flyVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={`fixed z-50 ${lc(flyingLabel.s)} shadow-lg pointer-events-none`}
                      style={{
                        // Position at the target slot — the animation starts offset and flies TO here
                        left: 0, top: 0,
                      }}
                    >
                      {flyingLabel.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* P&L bars */}
              <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 ${pnlRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] text-cream-500 font-medium">Sales</span>
                  <span className="relative h-2.5 w-20 bg-cream-200 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-200 ease-out"
                      style={{ width: `${salesFill}%`, backgroundColor: salesColor }} />
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
                      style={{ width: `${costsFill}%`, backgroundColor: costsColor }} />
                  </span>
                </span>
              </div>

            </div>

            {/* Mobile labels */}
            <div className="flex sm:hidden gap-3 w-full max-w-md mx-auto">
              <div className="flex-1 flex flex-col items-end gap-1.5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Revenue</p>
                {leftLabelsAll.slice(0, 6).map((l, i) => (
                  <div key={l.text} className={lc(l.s)} style={{ transform: `rotate(${rots[i]})` }}>{l.text}</div>
                ))}
              </div>
              <div className="flex-1 flex flex-col items-start gap-1.5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-red-400/50 mb-1">Costs</p>
                {rightLabelsAll.slice(0, 6).map((l, i) => (
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
