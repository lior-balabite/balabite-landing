'use client';

import { motion } from 'framer-motion';

/* ── 4 JAW-DROP PRODUCT MOMENTS ── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const staggerIn = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ── PULSE: Morning briefing phone mockup ── */
function PulseMockup() {
  const cards = [
    { urgency: 'urgent', color: 'border-l-red-500 bg-red-50', badge: 'bg-red-100 text-red-700', label: 'URGENT', text: 'Chicken wrap food cost at 34% (was 28%). Vendor raised price + portion drift. Fix today.' },
    { urgency: 'warning', color: 'border-l-amber-500 bg-amber-50', badge: 'bg-amber-100 text-amber-700', label: 'REVENUE', text: 'Friday revenue up 12% vs last week. Top seller: Lamb Kebab Platter. Consider making it a weekend anchor.' },
    { urgency: 'info', color: 'border-l-blue-500 bg-blue-50', badge: 'bg-blue-100 text-blue-700', label: 'GUESTS', text: '4 regulars haven\'t visited in 45+ days. ~$800/mo at risk. "We miss you" campaign ready to send.' },
    { urgency: 'info', color: 'border-l-purple-500 bg-purple-50', badge: 'bg-purple-100 text-purple-700', label: 'TEAM', text: 'Sofia: 6 doubles in 3 weeks. Burnout risk high. Suggest pulling her off Saturday close.' },
    { urgency: 'good', color: 'border-l-green-500 bg-green-50', badge: 'bg-green-100 text-green-700', label: 'COSTS', text: 'Overall food cost trending down — 30.1% (target: 30%). Menu repositioning drove $840 in weekly margin.' },
  ];

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-[6px] border-cream-300 bg-[#0f172a] overflow-hidden shadow-xl">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] text-white/50 font-medium">6:32 AM</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-white/30" />
            <div className="w-4 h-2 rounded-sm bg-green-400/80" />
          </div>
        </div>
        {/* Greeting */}
        <div className="px-5 pt-2 pb-3">
          <p className="text-[11px] text-white/40">Good morning, Sarah.</p>
          <p className="text-[13px] text-white/90 font-medium mt-0.5">Yesterday was solid. A few things need you.</p>
        </div>
        {/* Cards */}
        <motion.div
          className="px-3 pb-4 space-y-2"
          variants={staggerIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.label}
              variants={cardFade}
              className={`rounded-xl border-l-[3px] ${card.color} p-3`}
            >
              <span className={`text-[8px] font-bold uppercase tracking-wider ${card.badge} px-1.5 py-0.5 rounded`}>
                {card.label}
              </span>
              <p className="text-[10px] leading-relaxed text-cream-800 mt-1.5">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── DISCOVERY: Insight cards fanning out ── */
function DiscoveryMockup() {
  const insights = [
    { icon: '☔', text: 'Rainy Saturdays are your best profit days. Beach closures drive +14% margin — not volume, margin.', tag: 'Weather × Revenue' },
    { icon: '🥑', text: 'Customers who order Avocado Toast on first visit become regulars 2.8x more often than any other dish.', tag: 'Menu × Loyalty' },
    { icon: '👥', text: 'When Mike and Sarah work the same shift, the entire team performs +$8.55 above expected per ticket.', tag: 'Staff × Revenue' },
  ];

  return (
    <motion.div
      className="flex flex-col gap-3 max-w-md mx-auto"
      variants={staggerIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <p className="text-[10px] text-cream-400 uppercase tracking-wider mb-1">Discovered overnight while you slept</p>
      {insights.map((insight, i) => (
        <motion.div
          key={i}
          variants={cardFade}
          className="bg-white border border-cream-200 rounded-xl p-4 shadow-sm"
          style={{ transform: `rotate(${[-1.5, 0.8, -0.5][i]}deg)` }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{insight.icon}</span>
            <div className="flex-1">
              <p className="text-[12px] leading-relaxed text-cream-800">{insight.text}</p>
              <span className="text-[9px] text-cream-400 uppercase tracking-wider mt-2 inline-block">{insight.tag}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── CURATED MENU: Before/After contrast ── */
function CuratedMenuMockup() {
  const fullMenu = [
    'Classic Burger', 'Chicken Parm', 'Caesar Salad', 'Margherita Pizza', 'Fish Tacos',
    'Grilled Salmon', 'Pasta Bolognese', 'Club Sandwich', 'French Onion Soup', 'Steak Frites',
    'Mushroom Risotto', 'Tuna Tartare', 'BBQ Ribs', 'Shrimp Scampi', 'Lobster Roll',
    'Veggie Wrap', 'Lamb Chops', 'Poke Bowl', 'Cobb Salad', 'Chicken Wings',
  ];

  const curatedItems = [
    { name: 'Pan-Seared Salmon', tag: 'Based on your last visit', price: '$32' },
    { name: 'Mushroom Risotto', tag: 'Chef\u2019s pick tonight', price: '$24' },
    { name: 'Roasted Cauliflower', tag: 'Gluten-free \u2022 94% loved it', price: '$19' },
    { name: 'Hanger Steak', tag: 'Trending tonight', price: '$38' },
    { name: 'Burrata Salad', tag: 'Light start', price: '$16' },
    { name: 'Affogato', tag: 'Perfect finish', price: '$12' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start max-w-2xl mx-auto">
      {/* Before: overwhelming menu */}
      <div className="flex-1 w-full relative">
        <p className="text-[10px] text-red-400/70 uppercase tracking-wider mb-2 text-center">Every guest sees this</p>
        <div className="bg-cream-200/50 rounded-xl p-3 border border-cream-300/50 max-h-[320px] overflow-hidden relative">
          <div className="space-y-1.5">
            {fullMenu.map((item, i) => (
              <div key={i} className="flex justify-between text-[10px] text-cream-500/70 py-0.5 border-b border-cream-300/30">
                <span>{item}</span>
                <span>${(15 + Math.floor(i * 1.3)).toString()}</span>
              </div>
            ))}
          </div>
          {/* Fade out */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-cream-200/90 to-transparent" />
          <p className="absolute bottom-2 inset-x-0 text-center text-[10px] text-cream-400">...and 268 more items</p>
        </div>
        <p className="text-center text-[11px] text-cream-500 mt-2">Average decision time: <span className="font-semibold text-red-600">8 minutes</span></p>
      </div>

      {/* Arrow — hidden on mobile, visible on sm+ */}
      <div className="hidden sm:flex items-center pt-16 text-cream-400 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
      {/* Mobile arrow */}
      <div className="flex sm:hidden justify-center text-cream-400 -my-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" /><path d="m5 12 7 7 7-7" />
        </svg>
      </div>

      {/* After: curated 6 */}
      <div className="flex-1 w-full">
        <p className="text-[10px] text-green-600/70 uppercase tracking-wider mb-2 text-center">Each guest sees this</p>
        <div className="bg-white rounded-xl p-3 border border-cream-200 shadow-sm">
          <p className="text-[9px] text-cream-400 mb-2">For you, Sarah \u2022 Gluten-free \u2022 Tuesday dinner</p>
          <div className="space-y-2">
            {curatedItems.map((item, i) => (
              <div key={i} className="flex justify-between items-start py-1.5 border-b border-cream-100 last:border-0">
                <div>
                  <p className="text-[12px] font-medium text-primary-900">{item.name}</p>
                  <p className="text-[9px] text-cream-400">{item.tag}</p>
                </div>
                <span className="text-[11px] font-medium text-cream-600">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-[11px] text-cream-500 mt-2">Average decision time: <span className="font-semibold text-green-600">90 seconds</span></p>
      </div>
    </div>
  );
}

/* ── MENU PSYCHOLOGY: Before/After layout ── */
function MenuPsychologyMockup() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl border border-cream-200 shadow-sm p-5">
        <p className="text-[10px] text-cream-400 uppercase tracking-wider mb-3">Menu Arena Analysis</p>
        {/* Mock menu grid with annotations */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { name: 'Hanger Steak', price: '$38', tag: 'ANCHOR', tagColor: 'bg-amber-100 text-amber-700', star: true },
            { name: 'Lamb Chops', price: '$42', tag: 'STAR', tagColor: 'bg-green-100 text-green-700', star: true },
            { name: 'Ribeye', price: '$52', tag: 'DECOY', tagColor: 'bg-purple-100 text-purple-700', star: false },
            { name: 'Chicken Parm', price: '$22', tag: 'WORKHORSE', tagColor: 'bg-blue-100 text-blue-700', star: false },
            { name: 'Salmon', price: '$34', tag: 'PUZZLE', tagColor: 'bg-orange-100 text-orange-700', star: false },
            { name: 'Tuna Tartare', price: '$28', tag: 'DOG', tagColor: 'bg-red-100 text-red-700', star: false },
          ].map((item) => (
            <div key={item.name} className={`rounded-lg border p-2 text-center ${item.star ? 'border-green-300 bg-green-50/50' : 'border-cream-200'}`}>
              <p className="text-[11px] font-medium text-primary-900">{item.name}</p>
              <p className="text-[10px] text-cream-500">{item.price}</p>
              <span className={`text-[7px] font-bold uppercase tracking-wider ${item.tagColor} px-1.5 py-0.5 rounded mt-1 inline-block`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
        {/* Result */}
        <div className="flex items-center justify-between bg-cream-50 rounded-lg p-3">
          <div>
            <p className="text-[10px] text-cream-500">After repositioning + decoy pricing</p>
            <p className="text-[13px] font-semibold text-primary-900">Average order value</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-cream-400 line-through">$42</span>
            <span className="text-lg font-bold text-green-700 ml-2">$47.60</span>
            <p className="text-[10px] text-green-600">+12% from same menu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function ProductReveal() {
  return (
    <section className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-[80rem] mx-auto px-6">

        {/* ── THE TURN (baked in) ── */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-base sm:text-lg text-cream-500 mb-4">
            It&apos;s not a dashboard.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            It&apos;s the partner you never got to hire.
          </h2>
        </motion.div>

        {/* ── MOMENT 1: THE PULSE (biggest, hero product moment) ── */}
        <motion.div
          className="mb-24 md:mb-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-500/70 mb-3">Every morning at 6am</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                5 cards. Everything that matters.
              </h3>
              <p className="text-base text-cream-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Not a dashboard you have to decode. A briefing that already knows what&apos;s urgent,
                what&apos;s working, and what needs you &mdash; ranked, explained, with actions ready to approve.
              </p>
            </div>
            <div className="flex-1">
              <PulseMockup />
            </div>
          </div>
        </motion.div>

        {/* ── MOMENT 2: AUTONOMOUS DISCOVERY ── */}
        <motion.div
          className="mb-24 md:mb-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-500/70 mb-3">Discovered overnight</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Patterns you&apos;d never spot. Already found.
              </h3>
              <p className="text-base text-cream-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                At 2 AM, BalaBite cross-references weather, staffing, ticket data, and guest behavior.
                By morning, it has answers to questions you didn&apos;t know to ask.
              </p>
            </div>
            <div className="flex-1">
              <DiscoveryMockup />
            </div>
          </div>
        </motion.div>

        {/* ── MOMENT 3: CURATED MENU ── */}
        <motion.div
          className="mb-24 md:mb-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-green-500/70 mb-3">For your guests</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Same menu. Every guest sees a different one.
            </h3>
            <p className="text-base text-cream-600 leading-relaxed max-w-2xl mx-auto">
              Allergies filtered. Kitchen load balanced. Personal history remembered.
              Every guest gets their own menu. Decision time: 90 seconds.
            </p>
          </div>
          <CuratedMenuMockup />
        </motion.div>

        {/* ── MOMENT 4: MENU PSYCHOLOGY ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-500/70 mb-3">Behavioral economics</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Your menu isn&apos;t a list. It&apos;s a sales floor.
              </h3>
              <p className="text-base text-cream-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Anchoring. Decoys. Choice architecture. Position psychology.
                BalaBite re-sequences your menu based on how human brains actually make decisions.
                Same dishes. More revenue.
              </p>
            </div>
            <div className="flex-1">
              <MenuPsychologyMockup />
            </div>
          </div>
        </motion.div>

        {/* ── CLOSING — the headline that earns the CTA ── */}
        <motion.div
          className="text-center mt-24 md:mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3">
            Own it all. Without carrying it alone.
          </h2>
          <p className="text-lg text-cream-600 max-w-xl mx-auto mb-8">
            Not watching your restaurant. Running it.
          </p>
          <button
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-primary-900 px-8 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97]"
          >
            Put AI to Work
          </button>
        </motion.div>

      </div>
    </section>
  );
}
