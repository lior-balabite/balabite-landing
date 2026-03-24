'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const brains = [
  {
    name: 'The Pulse',
    role: 'Your morning briefing',
    image: '/illustrations/characters/the-pulse.png',
    front: 'Tuesday\u2019s looking tight \u2014 you\u2019re short one closer, lamb shank is 2 days from expiry, and that 4.2 Google rating just dropped to 4.1. Here\u2019s your game plan.',
    back: 'Last week you made $14K more than the week before. Three things drove it \u2014 the prix fixe upsell, cutting Tuesday lunch hours, and firing that parsley garnish nobody touched.',
  },
  {
    name: 'Menu Brain',
    role: 'Your menu strategist',
    image: '/illustrations/characters/menu-brain.png',
    front: 'Your carbonara costs $4.80 to make and outsells everything 3-to-1, but it\u2019s your cheapest entr\u00e9e. That\u2019s not generosity, that\u2019s a leak.',
    back: 'Kill the tuna tartare. It sells 4 a week, ties up $120 in inventory, and guests who order it tip 11% below average. Move the short rib to that slot \u2014 it prints money.',
  },
  {
    name: 'Finance Brain',
    role: 'Your margin watchdog',
    image: '/illustrations/characters/finance-brain.png',
    front: 'Your produce vendor just quietly raised avocado pricing 18% across three invoices. Nobody noticed. I noticed.',
    back: 'You think you\u2019re running 28% food cost. You\u2019re actually at 33.4% \u2014 because nobody\u2019s accounting for staff meals, comps, and the \u201cfamily and friends\u201d tabs your bartender keeps opening.',
  },
  {
    name: 'Team Brain',
    role: 'Your people operator',
    image: '/illustrations/characters/team-brain.png',
    front: 'Sofia has worked 11 doubles in 3 weeks. She hasn\u2019t complained yet. She will \u2014 with a resignation letter. Move her to 4 days before you lose your best server.',
    back: 'Thursday night keeps bleeding money because you schedule 6 when you need 4. Saturday you\u2019re running a skeleton crew through a 90-minute wait. Flip it.',
  },
  {
    name: 'Kitchen Brain',
    role: 'Your back-of-house brain',
    image: '/illustrations/characters/kitchen-brain.png',
    front: 'You prepped 40 portions of soup today. You\u2019ve sold 11 every Wednesday for 6 weeks. That\u2019s 29 portions of margin going into the bin.',
    back: 'Your walk-in has $2,300 in proteins expiring by Friday. I\u2019ve reworked the specials board to burn through the salmon and duck breast first.',
  },
  {
    name: 'Guest Brain',
    role: 'Your guest memory',
    image: '/illustrations/characters/guest-brain.png',
    front: 'Table 12 is the couple who sent back the risotto in October and left a 2-star review. They\u2019re back. This is your redemption dinner.',
    back: '340 guests came exactly once in 90 days and never returned. That\u2019s not a marketing problem. That\u2019s $68K in lost repeat revenue in your blind spot.',
  },
  {
    name: 'Voice Brain',
    role: 'Your front-of-house voice',
    image: '/illustrations/characters/voice-brain.png',
    front: 'While your staff was slammed at 7pm last night, I picked up 23 calls, booked 14 reservations, and talked one guy out of canceling his party of 12.',
    back: 'A woman called three times about dairy-free for her kid\u2019s birthday. Your host dropped the call twice. I called her back, handled it, and booked a party of 18.',
  },
  {
    name: 'Growth Brain',
    role: 'Your traffic engine',
    image: '/illustrations/characters/growth-brain.png',
    front: 'Your competitor two blocks over is running a $9.99 lunch deal pulling your weekday traffic. I\u2019ve drafted a counter-offer that protects your margins.',
    back: 'You spent $800 on Instagram ads last month and got 12 bookings. Your Google Business listing is misspelling \u201cWednesday.\u201d Fix the free stuff before you burn cash.',
  },
  {
    name: 'Market Brain',
    role: 'Your competitive radar',
    image: '/illustrations/characters/market-brain.png',
    front: 'Three new poke spots opened within a mile this quarter. None serve cooked food after 3pm. Your dinner game just became your moat \u2014 lean into it.',
    back: 'The neighborhood\u2019s average entr\u00e9e price jumped 14% this year. You raised yours 3%. You\u2019re leaving $6,200 a month on the table out of politeness.',
  },
];

function BrainCard({ brain }: { brain: typeof brains[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative w-[260px] shrink-0 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="rounded-2xl border border-cream-200 bg-white/80 backdrop-blur p-6 shadow-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-20 h-20 mx-auto mb-4">
            <Image
              src={brain.image}
              alt={brain.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3 className="text-sm font-bold text-primary-900 text-center mb-0.5">
            {brain.name}
          </h3>
          <p className="text-[10px] text-cream-500 text-center uppercase tracking-wider mb-4">
            {brain.role}
          </p>
          <blockquote className="text-[13px] leading-relaxed text-cream-700 italic border-l-2 border-amber-400 pl-3">
            &ldquo;{brain.front}&rdquo;
          </blockquote>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-cream-200 bg-primary-900 p-6 shadow-sm flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-16 h-16 mx-auto mb-3 opacity-60">
            <Image
              src={brain.image}
              alt={brain.name}
              width={64}
              height={64}
              className="object-contain brightness-200"
            />
          </div>
          <h3 className="text-sm font-bold text-cream-100 text-center mb-1">
            {brain.name}
          </h3>
          <p className="text-[10px] text-cream-400 text-center uppercase tracking-wider mb-4">
            Also says...
          </p>
          <blockquote className="text-[13px] leading-relaxed text-cream-200 italic border-l-2 border-amber-400 pl-3 flex-1">
            &ldquo;{brain.back}&rdquo;
          </blockquote>
          <p className="text-[9px] text-cream-500 text-center mt-3">
            tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TheTeam() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-12 md:mb-16 px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3">
          Nine specialists. Zero salaries.
        </h2>
        <p className="text-base sm:text-lg text-cream-600 max-w-xl mx-auto">
          They don&apos;t call in sick. They don&apos;t need health insurance.
          They do need your POS login.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-5 px-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left spacer for centering on large screens */}
          <div className="shrink-0 w-[calc((100vw-92rem)/2)]" />

          {brains.map((brain, i) => (
            <motion.div
              key={brain.name}
              className="snap-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrainCard brain={brain} />
            </motion.div>
          ))}

          {/* Right spacer */}
          <div className="shrink-0 w-[calc((100vw-92rem)/2)]" />
        </div>

        {/* Scroll hint */}
        <p className="text-center text-[10px] text-cream-400 mt-4">
          Scroll to explore all 9 &middot; Hover or tap to flip
        </p>
      </motion.div>

      {/* Bottom line */}
      <motion.p
        className="text-center mt-10 text-lg sm:text-xl text-cream-600 px-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Nine brains. One notification. Every morning.
      </motion.p>
    </section>
  );
}
