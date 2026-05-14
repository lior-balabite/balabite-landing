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
];

const integrations = ['Square', 'Toast', 'Clover', 'Stripe'];

const faqs = [
  // SEO-targeted entries (answer search-intent queries directly)
  {
    q: 'What is an AI Cofounder for restaurants?',
    a: 'A partner that thinks alongside you — and acts on its own. You can talk to it like you would text a cofounder, but it is not waiting to be asked. It watches the business, makes the call, and runs the rest while you run the place.',
  },
  {
    q: 'How can independent restaurants use AI?',
    a: 'Not for answers on demand — for judgment. A real AI Cofounder watches the business, thinks through what it sees, and shows up every morning with decisions made and the rest already handled.',
  },
  {
    q: 'What AI solutions work best for small or single-location restaurants?',
    a: 'The kind built by someone who has actually run the floor — not studied it from a deck. BalaBite was built from inside a working kitchen. It thinks like an operator because it was made by one.',
  },
  {
    q: 'How is BalaBite different from Toast IQ, Square AI, or other restaurant POS AI?',
    a: 'Toast, Square, and the rest sell you a POS, payments, or loyalty — so their AI will never tell you to leave. BalaBite has nothing to defend. If switching your processor saves real money without dropping your standards, we are the only one who will say so.',
  },

  // Practical adoption FAQs (existing)
  {
    q: 'Does this work with my POS?',
    a: 'Square, Toast, and Clover today. Yours next if it is not on the list — tell us and we will prioritize it.',
  },
  {
    q: 'How long does setup take?',
    a: 'Ten minutes to connect your POS. Twenty-four hours to learn your restaurant. The first briefing lands the next sunrise.',
  },
  {
    q: 'Do I need to change how I work?',
    a: 'No. BalaBite slots in around the tools and workflow you already have. Nothing to rip out, nothing to migrate.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yours stays yours. We do not share it, sell it, or use it to train anything that could end up at the restaurant down the block.',
  },
  {
    q: 'What if I only have one location?',
    a: 'Then you are exactly who this is for. The math does not pay for a real partner at one location — that is the gap BalaBite fills.',
  },
  {
    q: 'Do I need an app to use BalaBite?',
    a: 'No. BalaBite lives where you already live — text it, message it on WhatsApp, open it on the web.',
  },
];

// FAQ JSON-LD — lets Google + AI assistants extract these as rich results
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

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

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* FAQ JSON-LD — Google + AI search rich-result eligibility */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
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
