'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── ANIMATED COUNTER ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {isInView ? count.toLocaleString() : '0'}
      {suffix}
    </span>
  );
}

const metrics = [
  { value: 152, suffix: 'K+', label: 'Orders processed' },
  { value: 15, suffix: '+', label: 'Languages supported' },
  { value: 3, suffix: '', label: 'Restaurants live' },
];

const integrations = ['Square', 'Toast', 'Clover', 'Stripe'];

const faqs = [
  {
    q: 'Does this work with my POS?',
    a: 'BalaBite integrates with Square, Toast, and Clover. More integrations are coming — if yours isn\u2019t listed, let us know and we\u2019ll prioritize it.',
  },
  {
    q: 'How long does setup take?',
    a: '10 minutes to connect your POS. 24 hours for BalaBite to learn your restaurant. Your first briefing arrives the next morning.',
  },
  {
    q: 'Do I need to change how I work?',
    a: 'No. BalaBite works alongside your existing tools and workflow. Nothing to replace, nothing to rip out.',
  },
  {
    q: 'Is my data safe?',
    a: 'Bank-level encryption. Your data stays yours. We never share, sell, or use your data for anything other than making YOUR restaurant smarter.',
  },
  {
    q: 'What if I only have one location?',
    a: 'BalaBite is built for single locations and multi-location groups alike. Most of our pilots are independent restaurants.',
  },
  {
    q: 'Do my guests need to download an app?',
    a: 'No. Guests scan a QR code and the AI Waiter opens right in their browser. No download, no friction.',
  },
  {
    q: 'How much does it cost?',
    a: 'Early access is free for your first 90 days. After that, plans start from an affordable monthly rate based on your restaurant\u2019s size. No contracts, cancel anytime.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SocialProof() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-cream-100">
      <div className="max-w-[64rem] mx-auto">

        {/* ── METRICS ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream-900 mb-12">
            Already in the kitchen.
          </h2>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {metrics.map((metric) => (
              <motion.div key={metric.label} className="text-center" variants={fadeUp}>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-cream-900 mb-2">
                  <Counter target={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-cream-500 text-sm uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Integrations */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm text-cream-500 mr-2">Works with</span>
            {integrations.map((name) => (
              <span
                key={name}
                className="bg-white border border-cream-300 rounded-full px-4 py-1.5 text-sm font-medium text-cream-700"
              >
                {name}
              </span>
            ))}
          </motion.div>
          <p className="text-[11px] text-cream-400">
            More integrations coming. Don&apos;t see yours? Let us know.
          </p>
        </motion.div>

        {/* ── TESTIMONIAL PLACEHOLDER ── */}
        <motion.div
          className="bg-white/80 backdrop-blur border border-cream-200 rounded-2xl p-8 md:p-10 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="text-lg leading-relaxed text-cream-800 italic mb-4">
            &ldquo;I used to spend my first hour every morning just figuring out what went wrong yesterday.
            Now I open BalaBite, see the five things that matter, and I&apos;m done before my coffee gets cold.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-cream-500 text-sm font-bold">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold text-cream-900">Early access restaurant</p>
              <p className="text-xs text-cream-500">Name and details coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* ── PRICING SIGNAL ── */}
        <motion.div
          className="text-center mb-16 py-8 border-y border-cream-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-amber-600/70 mb-2">Early access</p>
          <p className="text-2xl md:text-3xl font-bold text-cream-900 mb-2">
            Free for your first 90 days.
          </p>
          <p className="text-base text-cream-600">
            No credit card. No contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-cream-900 text-center mb-8">
            Questions you&apos;d ask over a drink.
          </h3>
          <div className="space-y-2 max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-cream-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream-50 transition-colors"
                >
                  <span className="text-sm font-medium text-cream-900">{faq.q}</span>
                  <span className={`text-cream-400 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: openFaq === i ? '300px' : '0px' }}
                >
                  <p className="px-5 pb-4 text-sm text-cream-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
