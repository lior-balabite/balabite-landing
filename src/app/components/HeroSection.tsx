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

/* ── ALL 30 LABELS ── */
const allLabels = [
  // Revenue (left side, indices 0-14)
  '"Sorry, can\'t make it today"', 'Where\'s Miguel?', 'Yelp: 1 star',
  'Table 9 still waiting', '86 the special', '"Karen wants the manager"',
  'Google: "never coming back"', 'Dishwasher quit', 'Closing Mondays',
  '"We need to talk"', 'Short-staffed again', '3am. Still here.',
  'Missed another recital', 'DoorDash refund', 'No one\'s closing tonight',
  // Cost (right side, indices 15-29)
  'PAST DUE', 'Rent due in 3 days', 'Insurance +22%',
  'Gas bill doubled', 'Food cost +30%', 'Register short $47',
  'POS just froze', 'AC is out again', 'Ice machine down',
  'Grease trap backing up', 'Health inspection Tuesday', '"Can you cover?"',
  'Broke a case of wine', '2-top waiting 40 min', 'missed call (3)',
];

const labelStyles = [
  'sms', 'sms', 'alert', 'ticket', 'ticket', 'sms', 'alert', 'sms', 'note',
  'sms', 'sms', 'note', 'note', 'alert', 'sms',
  'stamp', 'stamp', 'stamp', 'stamp', 'alert', 'alert', 'alert', 'ticket', 'ticket',
  'ticket', 'alert', 'sms', 'note', 'ticket', 'note',
];

/* Cloud positions — % offsets from image edges */
const positions = [
  // Left (revenue) — 15 positions
  { top: '2%', left: '-48%' }, { top: '8%', left: '-42%' }, { top: '14%', left: '-52%' },
  { top: '20%', left: '-44%' }, { top: '26%', left: '-50%' }, { top: '32%', left: '-40%' },
  { top: '38%', left: '-48%' }, { top: '44%', left: '-44%' }, { top: '50%', left: '-52%' },
  { top: '56%', left: '-46%' }, { top: '62%', left: '-42%' }, { top: '68%', left: '-50%' },
  { top: '74%', left: '-44%' }, { top: '80%', left: '-48%' }, { top: '86%', left: '-42%' },
  // Right (cost) — 15 positions
  { top: '2%', right: '-48%' }, { top: '8%', right: '-44%' }, { top: '14%', right: '-50%' },
  { top: '20%', right: '-42%' }, { top: '26%', right: '-48%' }, { top: '32%', right: '-44%' },
  { top: '38%', right: '-50%' }, { top: '44%', right: '-42%' }, { top: '50%', right: '-48%' },
  { top: '56%', right: '-44%' }, { top: '62%', right: '-50%' }, { top: '68%', right: '-42%' },
  { top: '74%', right: '-48%' }, { top: '80%', right: '-44%' }, { top: '86%', right: '-50%' },
];

const rots = ['-2.5deg', '1.8deg', '-1.2deg', '2.3deg', '-1.7deg', '1.1deg', '-2.8deg', '3.1deg', '-0.8deg', '2.6deg', '-2.1deg', '0.9deg', '-1.5deg', '2.4deg', '-1.3deg'];

function lc(style: string) {
  const b = 'whitespace-nowrap text-[10px] sm:text-xs px-2.5 py-1 border rounded-md shadow-sm';
  switch (style) {
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

  const [userLabel, setUserLabel] = useState('');
  const [userLabels, setUserLabels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(30);

  // Wobble animation — ref-based, no state re-renders for mouse
  const wobbleRef = useRef({ rotY: 0, rotX: 0, rotZ: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const tiltElRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  // P&L display ref — updated by rAF, read by transform style
  const [pnl, setPnl] = useState({ margin: 5.0, revW: 75, costW: 45 });

  useEffect(() => {
    const s = localStorage.getItem('balabite-pile-count');
    if (s) setTotalCount(Math.max(30, parseInt(s, 10)));
  }, []);

  // Mouse — direct ref update, no state
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2 * 5;
    mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2 * -2;
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  // Animation loop — updates DOM directly for tilt, state only for P&L at 15fps
  useEffect(() => {
    const t0 = Date.now();
    let lastPnl = 0;
    // Smooth lerp targets for mouse
    const smooth = { x: 0, y: 0 };

    const tick = () => {
      const now = Date.now();
      const t = (now - t0) / 1000;

      // Smooth mouse with lerp (no jitter)
      smooth.x += (mouseRef.current.x - smooth.x) * 0.08;
      smooth.y += (mouseRef.current.y - smooth.y) * 0.08;

      // Ambient wobble
      const aY = Math.sin(t * 1.1) * 2.5 + Math.sin(t * 0.7) * 1.0;
      const aX = Math.sin(t * 0.8 + 1) * 0.5 + Math.sin(t * 1.3) * 0.3;
      const aZ = Math.sin(t * 0.9 + 2) * 0.8 + Math.sin(t * 0.5) * 0.4;

      const rotY = aY + smooth.x;
      const rotX = aX + smooth.y;
      const rotZ = aZ;

      // Apply transform directly to DOM — no React re-render
      if (tiltElRef.current) {
        tiltElRef.current.style.transform =
          `perspective(800px) rotateY(${rotY}deg) rotateX(${rotX}deg) rotate(${rotZ}deg)`;
      }

      // P&L at 15fps — driven by tilt
      if (now - lastPnl > 66) {
        lastPnl = now;
        const tilt = Math.max(-1, Math.min(1, rotY / 6));
        const decay = Math.min(t / 25, 1);
        const bm = 5.0 - 1.8 * (1 - Math.pow(1 - decay, 3));
        const margin = Math.max(1.8, Math.min(5.0, bm - Math.abs(tilt) * 0.5));
        const revW = Math.max(20, 75 - 25 * decay + Math.min(0, tilt) * 18);
        const costW = Math.min(95, 45 + 30 * decay + Math.max(0, tilt) * 18);
        setPnl({ margin: parseFloat(margin.toFixed(1)), revW, costW });
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // ── SCROLL-DRIVEN TRANSFORMS (continuous, no state snapping) ──
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  // Label opacity — each label fades in at its own scroll point (staggered)
  const labelOpacities = allLabels.map((_, i) => {
    const idx = i < 15 ? i : i - 15;
    const start = 0.08 + idx * 0.025;  // stagger: each label starts 2.5% later
    const end = start + 0.04;           // fade-in over 4% of scroll
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  // P&L opacity — fades in around 45-55%
  const pnlOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

  // Counter opacity — fades in around 58-68%
  const counterOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  // Release — everything fades out around 80-95%
  const releaseOpacity = useTransform(scrollYProgress, [0.78, 0.92], [1, 0]);

  const handleAdd = () => {
    const trimmed = userLabel.trim();
    if (!trimmed || trimmed.length > 80) return;
    setUserLabels(prev => [...prev, trimmed]);
    setUserLabel('');
    setTotalCount(prev => { const n = prev + 1; localStorage.setItem('balabite-pile-count', String(n)); return n; });
  };

  const mColor = pnl.margin > 4.5 ? 'text-green-700' : pnl.margin > 3.8 ? 'text-amber-700' : 'text-red-700';

  return (
    <div ref={containerRef} className="relative bg-cream-100" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-cream-100">
        <div className="h-full flex items-center px-6 pt-20 pb-8">
          <div className="mx-auto flex max-w-[72rem] w-full flex-col lg:flex-row items-center gap-8 lg:gap-16">

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

            {/* ── RIGHT: Image + cloud + P&L + counter ── */}
            <motion.div className="flex-1 flex flex-col items-center w-full lg:max-w-[480px]"
              style={{ opacity: releaseOpacity }}>

              <div ref={imgRef} className="relative w-full max-w-[400px]"
                onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

                {/* Image with wobble — DOM-direct transform, no React re-render */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                  <div ref={tiltElRef}
                    style={{ transformOrigin: '50% 95%', willChange: 'transform' }}>
                    <Image
                      src="/illustrations/scenes/hero1.png"
                      alt="A restaurant operator balancing on an unstable board, head buried under a towering pile of daily chaos"
                      width={800} height={1400}
                      className="w-full h-auto" priority
                    />
                  </div>
                </motion.div>

                {/* Label cloud — each label has its own scroll-driven opacity */}
                {allLabels.map((text, i) => {
                  const pos = positions[i];
                  return (
                    <motion.div
                      key={text}
                      className={`absolute hidden sm:block ${lc(labelStyles[i])}`}
                      style={{
                        top: pos.top,
                        left: 'left' in pos ? pos.left : undefined,
                        right: 'right' in pos ? pos.right : undefined,
                        transform: `rotate(${rots[i % rots.length]})`,
                        opacity: labelOpacities[i],
                      }}
                    >
                      {text}
                    </motion.div>
                  );
                })}
              </div>

              {/* P&L — continuous scroll-driven opacity */}
              <motion.div className="mt-4 flex items-center justify-center gap-5 text-xs"
                style={{ opacity: pnlOpacity }}>
                <span className="flex items-center gap-2 text-red-500/80">
                  <span className="flex flex-col items-end gap-0.5">
                    <span className="text-[9px] text-cream-500">Revenue</span>
                    <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                      <span className="absolute inset-y-0 left-0 bg-red-400 rounded-full transition-[width] duration-100"
                        style={{ width: `${pnl.revW}%` }} />
                    </span>
                  </span>
                  <span className="text-red-500 font-medium">↓</span>
                </span>
                <span className="flex items-center gap-2 text-red-600/80">
                  <span className="text-red-600 font-medium">↑</span>
                  <span className="flex flex-col items-start gap-0.5">
                    <span className="text-[9px] text-cream-500">Costs</span>
                    <span className="relative h-1.5 w-16 bg-cream-200 rounded-full overflow-hidden">
                      <span className="absolute inset-y-0 left-0 bg-red-600 rounded-full transition-[width] duration-100"
                        style={{ width: `${pnl.costW}%` }} />
                    </span>
                  </span>
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] text-cream-500">Margin</span>
                  <span className={`font-bold text-base tabular-nums ${mColor} transition-colors duration-300`}>
                    {pnl.margin}%
                  </span>
                </span>
              </motion.div>

              {/* Counter + Add yours — scroll-driven opacity */}
              <motion.div className="mt-5 w-full max-w-sm" style={{ opacity: counterOpacity }}>
                <p className="text-center text-sm text-cream-600 mb-2">
                  Things on this person&apos;s plate:{' '}
                  <span className="font-bold text-primary-900 text-base">{totalCount}</span>
                </p>
                <div className="flex gap-2">
                  <input type="text" value={userLabel}
                    onChange={(e) => setUserLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="What's on yours?" maxLength={80}
                    className="flex-1 rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm text-primary-900 placeholder:text-cream-400 focus:outline-none focus:border-cream-500 focus:ring-1 focus:ring-cream-500"
                  />
                  <button onClick={handleAdd}
                    className="rounded-lg bg-primary-900 px-4 py-2 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97] whitespace-nowrap">
                    Add yours
                  </button>
                </div>
                <p className="text-[10px] text-cream-400 text-center mt-1.5">
                  Every operator carries something different. Leave yours.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
