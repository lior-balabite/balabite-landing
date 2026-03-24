'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ── MATCHED MOMENTS — same trigger, different outcome ── */
const moments = [
  {
    time: '6:12 AM',
    without: 'Your sous chef texts: "can\'t come in." You\'re still in bed. Your day just broke before it started.',
    with: 'Your sous chef texts: "can\'t come in." BalaBite already flagged low coverage and suggested two available staff. You approve one from bed. Back to sleep.',
  },
  {
    time: '11:47 AM',
    without: 'Tomato delivery is 30 kilos short. Lunch service starts in 73 minutes. You\'re calling three suppliers while prepping mise en place.',
    with: 'Tomato delivery is 30 kilos short. BalaBite caught the discrepancy on intake and auto-sent a top-up order to your backup supplier 20 minutes ago. You\'re tasting the soup.',
  },
  {
    time: '2:33 PM',
    without: 'You realize the cost on the new lamb dish is 41%, not the 29% you pitched. You\'ve been bleeding money for two weeks and didn\'t know.',
    with: 'BalaBite flagged the lamb dish cost on day three. You adjusted the portion, updated the recipe card. The last eleven days ran at 28%. You\'re having coffee.',
  },
  {
    time: '5:15 PM',
    without: 'Saturday\'s private event for 45 — you still haven\'t confirmed headcount, adjusted the prep list, or told your team they\'re losing their day off.',
    with: 'Saturday\'s event: headcount confirmed, prep list auto-adjusted, team notified last Thursday. One of them swapped shifts voluntarily. You didn\'t touch it.',
  },
  {
    time: '9:48 PM',
    without: 'Service is over. You sit down for the first time in 14 hours. You still need to count inventory, close the register, and reconcile Thursday\'s numbers.',
    with: 'Service is over. Register reconciled automatically. Inventory counted at close using BalaBite\'s 90-second scan. Thursday\'s discrepancy was a voided check — already resolved.',
  },
  {
    time: '11:55 PM',
    without: 'You\'re in bed doing tomorrow\'s schedule on your phone. Your partner asks if you\'re coming to sleep. You say "two minutes." It\'s been two minutes for three years.',
    with: 'You\'re in bed. Tomorrow\'s schedule was built on Sunday. You\'re watching something dumb on TV with your partner. Your phone is charging in the other room.',
  },
];

export default function TheSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerPos, setDividerPos] = useState(50); // percentage
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setDividerPos(Math.max(15, Math.min(85, pct)));
  }, []);

  const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);
  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => { isDragging.current = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleMove]);

  return (
    <section className="relative bg-cream-100 py-20 md:py-28">
      {/* Heading */}
      <motion.div
        className="text-center mb-12 md:mb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900">
          Same restaurant. Same day.
        </h2>
      </motion.div>

      {/* Split container */}
      <motion.div
        ref={containerRef}
        className="relative mx-auto max-w-[80rem] px-4 sm:px-6 select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-cream-200/50"
          style={{ minHeight: '520px' }}>

          {/* ── LEFT SIDE: WITHOUT ── */}
          <div
            className="absolute inset-0 bg-[#1a1a2e] text-white/90"
            style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)` }}
          >
            <div className="h-full p-6 sm:p-8 md:p-10 max-w-[38rem]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400/80">Without</span>
              </div>
              <p className="text-sm text-white/40 italic mb-8">Your Tuesday.</p>

              <div className="space-y-5">
                {moments.map((m) => (
                  <div key={`wo-${m.time}`} className="flex gap-3">
                    <span className="text-xs font-mono text-red-400/60 whitespace-nowrap pt-0.5 w-16 shrink-0">
                      {m.time}
                    </span>
                    <p className="text-sm leading-relaxed text-white/70">
                      {m.without}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: WITH BALABITE ── */}
          <div
            className="absolute inset-0 bg-[#FDF8F0]"
            style={{ clipPath: `inset(0 0 0 ${dividerPos}%)` }}
          >
            <div className="h-full p-6 sm:p-8 md:p-10 flex justify-end">
              <div className="max-w-[38rem] w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600/80">With BalaBite</span>
                </div>
                <p className="text-sm text-cream-500 italic mb-8">Also your Tuesday.</p>

                <div className="space-y-5">
                  {moments.map((m) => (
                    <div key={`wi-${m.time}`} className="flex gap-3">
                      <span className="text-xs font-mono text-green-600/50 whitespace-nowrap pt-0.5 w-16 shrink-0">
                        {m.time}
                      </span>
                      <p className="text-sm leading-relaxed text-cream-700">
                        {m.with}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── DRAGGABLE DIVIDER ── */}
          <div
            className="absolute top-0 bottom-0 z-10 flex items-center"
            style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)' }}
          >
            {/* Line */}
            <div className="absolute inset-y-0 w-px bg-cream-400/40" />

            {/* Handle */}
            <div
              className="relative w-10 h-10 rounded-full bg-white shadow-lg border border-cream-300 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cream-500">
                <path d="M5 3L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 3L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 3L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Invisible sizing content (keeps the container tall enough) */}
          <div className="invisible p-6 sm:p-8 md:p-10">
            <div className="mb-10" />
            <div className="space-y-5">
              {moments.map((m) => (
                <div key={`sz-${m.time}`} className="flex gap-3">
                  <span className="w-16 shrink-0 text-xs">{m.time}</span>
                  <p className="text-sm leading-relaxed">{m.without}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom line */}
      <motion.p
        className="text-center mt-10 md:mt-14 text-lg sm:text-xl text-cream-600 px-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        You already know which side you&apos;re on.
      </motion.p>

      {/* CTA */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <button
          onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full bg-primary-900 px-8 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97]"
        >
          Put AI to Work
        </button>
      </motion.div>
    </section>
  );
}
