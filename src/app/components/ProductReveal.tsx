'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    id: 'menu-arena',
    name: 'Menu Arena',
    description: 'See every dish classified — Stars, Workhorses, Puzzles, Dogs. Drag to reposition. Run what-if pricing scenarios. Know your margins before you print the menu.',
    device: 'laptop',
    // Replace with real screenshot:
    placeholder: 'Menu Arena — drag-and-drop menu editor with food cost per dish, star/dog classification, what-if pricing panel',
    screenshot: null as string | null, // Set to '/screenshots/menu-arena.png' when ready
  },
  {
    id: 'ai-waiter',
    name: 'AI Waiter',
    description: 'Your guests scan, browse in their language, get allergen-safe recommendations, and order — all without waiting for a menu. Upsells naturally. Remembers everyone.',
    device: 'phone',
    placeholder: 'AI Waiter — guest-facing QR menu on phone, showing multilingual dish cards, allergy filters active, wine pairing suggestion',
    screenshot: null as string | null,
  },
  {
    id: 'kds',
    name: 'Kitchen Display',
    description: 'Every order flows from the guest\'s phone to the kitchen screen in under 2 seconds. No paper. No shouting. Allergy flags in red. Course timing automatic.',
    device: 'tablet',
    placeholder: 'KDS — Kanban board with New / Preparing / Ready columns, order cards with allergy flags, station assignment, ticket timers',
    screenshot: null as string | null,
  },
  {
    id: 'finance',
    name: 'Finance Brain',
    description: 'Snap an invoice, get every line item parsed. Cross-reference against last delivery. See your real food cost today — not six weeks from now.',
    device: 'laptop',
    placeholder: 'Finance Brain — scanned invoice with parsed line items, price change flags highlighted in red, food cost impact per dish',
    screenshot: null as string | null,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function DeviceFrame({ device, children }: { device: string; children: React.ReactNode }) {
  if (device === 'phone') {
    return (
      <div className="relative mx-auto rounded-[2.5rem] border-[6px] border-cream-300 bg-white overflow-hidden shadow-lg shadow-cream-400/20 w-[220px]">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-cream-300 rounded-full z-10" />
        <div className="aspect-[9/19]">{children}</div>
      </div>
    );
  }

  if (device === 'tablet') {
    return (
      <div className="relative mx-auto rounded-2xl border-[5px] border-cream-300 bg-white overflow-hidden shadow-lg shadow-cream-400/20 w-full max-w-[480px]">
        <div className="aspect-[4/3]">{children}</div>
      </div>
    );
  }

  // laptop
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Screen */}
      <div className="rounded-t-xl border-[5px] border-cream-300 border-b-0 bg-white overflow-hidden shadow-lg shadow-cream-400/20">
        <div className="aspect-[16/10]">{children}</div>
      </div>
      {/* Base */}
      <div className="h-3 bg-cream-300 rounded-b-lg mx-8" />
      <div className="h-1 bg-cream-400/50 rounded-b mx-16" />
    </div>
  );
}

export default function ProductReveal() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 overflow-hidden">
      <motion.div
        className="max-w-[80rem] mx-auto px-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            variants={fadeUp}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16 ${i > 0 ? 'mt-20 md:mt-28' : ''}`}
          >
            {/* Device frame + screenshot */}
            <div className="flex-1 w-full">
              <DeviceFrame device={product.device}>
                {product.screenshot ? (
                  <Image
                    src={product.screenshot}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  /* Placeholder — replace with real screenshots */
                  <div className="w-full h-full bg-cream-50 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-amber-500/15 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                      <p className="text-[11px] text-cream-500 leading-relaxed max-w-[280px]">
                        {product.placeholder}
                      </p>
                    </div>
                  </div>
                )}
              </DeviceFrame>
            </div>

            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-3">
                {product.name}
              </h3>
              <p className="text-base text-cream-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {product.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
