'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const brains = [
  {
    name: 'The Pulse',
    role: 'Your morning briefing',
    image: '/illustrations/characters/the-pulse.png',
    front: 'It\u2019s 6:40 AM. You haven\u2019t opened the door yet and there are already three problems. Your fish delivery is late, tonight\u2019s reservations just doubled from last Tuesday, and your closer called in sick. You\u2019ll find out about two of those around 4 PM. I found all three before your coffee.',
    back: 'You used to walk in and ask \u201cwhat happened last night?\u201d and get a different answer from every person. The bartender says it was slow. The server says it was slammed. The POS says you did $4,200 but left $600 in food cost on the table. I don\u2019t have opinions. I have the numbers.',
  },
  {
    name: 'Menu Brain',
    role: 'Your menu strategist',
    image: '/illustrations/characters/menu-brain.png',
    front: 'Your braised short rib has been your bestseller for two years. It\u2019s also been losing you $1.80 a plate since beef went up in March. You didn\u2019t touch the price because \u201cpeople love it.\u201d People also love your restaurant staying open.',
    back: 'Saturday night, table 12 stared at your menu for nine minutes. They ordered the chicken. Not because they wanted the chicken \u2014 because 42 items is not a menu, it\u2019s a phone book. I\u2019ll show you the six dishes doing 60% of your revenue and the fourteen doing nothing but exhausting your line.',
  },
  {
    name: 'Finance Brain',
    role: 'Your margin watchdog',
    image: '/illustrations/characters/finance-brain.png',
    front: 'Your produce vendor raised the price on microgreens by 18% in October. Small line item, easy to miss. You missed it. So did November. That\u2019s $1,100 gone on a garnish your customers push to the side of the plate.',
    back: 'It\u2019s the first of the month. You need to know if you made money in February. Your bookkeeper will tell you in three weeks. Your accountant in six. I\u2019ll tell you right now: you made money, but not on Sundays, not on brunch, and not on the patio. We should talk about the patio.',
  },
  {
    name: 'Team Brain',
    role: 'Your people operator',
    image: '/illustrations/characters/team-brain.png',
    front: 'Your best server just picked up her sixth double this month. She hasn\u2019t complained yet. She won\u2019t complain. She\u2019ll just stop showing up one Tuesday and you\u2019ll find out she\u2019s pouring wine at the place down the street. I see the burnout three weeks before the resignation text.',
    back: 'You\u2019ve got eleven people on the floor Saturday and four on Wednesday. Saturdays, your servers are tripping over each other. Wednesdays, they\u2019re apologizing to every table. You\u2019re spending the same labor both nights and neither night is right.',
  },
  {
    name: 'Kitchen Brain',
    role: 'Your back-of-house brain',
    image: '/illustrations/characters/kitchen-brain.png',
    front: 'Your prep cook made 6 quarts of pico on Monday morning. You threw out 2 on Wednesday night. This has happened every week since September. That\u2019s not a recipe problem, it\u2019s a par problem, and it\u2019s been costing you $80 a week on just that one sixth pan.',
    back: 'The walk-in is a graveyard of good intentions. Half a case of basil from a special two weeks ago. A hotel pan of braised pork shoulder \u201csomeone was going to use.\u201d Your inventory doesn\u2019t have a counting problem. It has a nobody-talks-to-each-other problem. I talk to everyone.',
  },
  {
    name: 'Guest Brain',
    role: 'Your guest memory',
    image: '/illustrations/characters/guest-brain.png',
    front: 'A woman left a 3-star review last Thursday. Said \u201cfood was fine, felt rushed.\u201d She\u2019s been in nine times this year. Average check: $140. She\u2019s not a complainer \u2014 she\u2019s a regular who just told you she\u2019s about to become someone else\u2019s regular. That review is a $6,000 warning.',
    back: 'Table 7 tonight is a couple who came in on their first date fourteen months ago. They\u2019ve been back eleven times. They always start with the burrata. He\u2019s allergic to tree nuts. She drinks the Sancerre, not the Sauvignon Blanc \u2014 she\u2019s corrected your staff twice. This should not be the third time.',
  },
  {
    name: 'Voice Brain',
    role: 'Your front-of-house voice',
    image: '/illustrations/characters/voice-brain.png',
    front: 'Seventeen calls went to voicemail last Friday between 5 and 7 PM. Eleven were reservation attempts. Your host was seating a six-top. That\u2019s a slow Tuesday night of revenue that called and you sent it to \u201cleave a message after the beep.\u201d',
    back: 'A guy called at 2:15 asking about private dining for 30 on the 18th. Your lunch server said \u201cI think so, let me have the manager call you back.\u201d The manager was off. Nobody called back. He booked the Italian place. That\u2019s an $8,000 event you lost to \u201cI think so.\u201d',
  },
  {
    name: 'Growth Brain',
    role: 'Your traffic engine',
    image: '/illustrations/characters/growth-brain.png',
    front: 'You posted a photo of your salmon on Instagram last Tuesday. 40 likes. Your bartender posted a 12-second video of a cocktail being lit on fire \u2014 1,100 likes. Your marketing isn\u2019t bad. It just doesn\u2019t know what people stop scrolling for. I do.',
    back: '900 people within a mile search \u201cdinner near me\u201d on a Thursday night. You\u2019re not showing up. The Thai place that opened four months ago is. They\u2019re not better \u2014 they just answered 11 questions on their Google profile that you left blank in 2021.',
  },
  {
    name: 'Market Brain',
    role: 'Your competitive radar',
    image: '/illustrations/characters/market-brain.png',
    front: 'The new place on Elm Street priced their burger at $17. Yours is $22. Theirs is a smash burger with American cheese. Yours is dry-aged with gruy\u00e8re and bone marrow aioli. You\u2019re not overpriced \u2014 you\u2019ve just never told anyone why there\u2019s a $5 difference.',
    back: 'Three restaurants in your neighborhood added a \u201cdate night for two\u201d prix fixe in the last six weeks. Your Thursday covers dropped 15% this month and you blamed the weather. It\u2019s not the weather. It\u2019s the $72 couple\u2019s menu at the place your customers drive past to get to you.',
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
          Your dream team. Already hired.
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
          Scroll to meet the team &middot; Hover or tap to flip
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
        One team. One notification. Every morning.
      </motion.p>
    </section>
  );
}
