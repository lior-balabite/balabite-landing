'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// AI waiter scenario layered over the original captured ordering surface.
// The menu PNG IS the surface — we render small mask overlays only where
// brand-identifying text appears, with generic replacement text on top.
// All percentage coordinates reference the captured PNG (1170 × 2532).
//
// The AI waiter sheet slides up over the menu. When the allergy filter
// fires, the whole menu dims + a top badge announces what's hidden.

type DishId =
  | 'morning-press'
  | 'green-press'
  | 'crispy-potatoes'
  | 'avocado-toast'
  | 'greens-omelet'
  | 'salmon-bagel';

type Dish = {
  id: DishId;
  name: string;
  desc: string;
  price: string;
  tags: string[];
  photo: string;
  hasGluten: boolean;
  swapNote?: string;
};

const DISHES: Record<DishId, Dish> = {
  'morning-press': {
    id: 'morning-press',
    name: 'Morning Press',
    desc: 'Fresh-squeezed lemons, oranges, pineapple, mint',
    price: '$9.00',
    tags: ['Light', 'Citrus'],
    photo: '/booth/menu-photos/featured-drink.jpg',
    hasGluten: false,
  },
  'green-press': {
    id: 'green-press',
    name: 'Green Press',
    desc: 'Cold-pressed greens, ginger, lime',
    price: '$9.00',
    tags: ['Vegan', 'No dairy'],
    photo: '/booth/menu-photos/green-drink.jpg',
    hasGluten: false,
  },
  'crispy-potatoes': {
    id: 'crispy-potatoes',
    name: 'Crispy Potatoes',
    desc: 'Smoked paprika, lemon aioli',
    price: '$5.00',
    tags: ['Side'],
    photo: '/booth/menu-photos/fries.jpg',
    hasGluten: false,
  },
  'avocado-toast': {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    desc: 'Sourdough, smashed avo, chili crisp',
    price: '$10.00',
    tags: ['Brunch'],
    photo: '/booth/menu-photos/toast.jpg',
    hasGluten: true,
  },
  'greens-omelet': {
    id: 'greens-omelet',
    name: 'Greens Omelet',
    desc: 'Spinach, feta, herbs, choice of bread',
    price: '$16.00',
    tags: ['Protein'],
    photo: '/booth/menu-photos/omelet.jpg',
    hasGluten: true,
    swapNote: 'GF sourdough +$2',
  },
  'salmon-bagel': {
    id: 'salmon-bagel',
    name: 'Salmon Bagel',
    desc: 'Everything bagel, dill cream, capers',
    price: '$15.00',
    tags: ['Brunch'],
    photo: '/booth/menu-photos/bagel.jpg',
    hasGluten: true,
  },
};

type Beat =
  | { kind: 'sheet-open'; key: string; hold: number }
  | { kind: 'user'; key: string; text: string; hold: number }
  | {
      kind: 'ai';
      key: string;
      body: React.ReactNode;
      dishes?: DishId[];
      bodySoft?: React.ReactNode;
      triggersFilter?: boolean;
      hold: number;
    };

const BEATS: Beat[] = [
  { kind: 'sheet-open', key: 'open', hold: 1300 },
  {
    kind: 'user',
    key: 'u1',
    hold: 2400,
    text: 'any peanut-free, gluten-free options?',
  },
  {
    kind: 'ai',
    key: 'a1',
    hold: 2400,
    triggersFilter: true,
    body: (
      <>
        Got it &mdash; filtering for{' '}
        <strong>peanut-free + gluten-free</strong>. Hiding 3 items.
      </>
    ),
  },
  {
    kind: 'ai',
    key: 'a2',
    hold: 4200,
    body: <>Try starting with these &mdash; light, no swaps needed:</>,
    dishes: ['morning-press', 'green-press'],
  },
  {
    kind: 'ai',
    key: 'a3',
    hold: 4500,
    body: (
      <>
        The Greens Omelet works too &mdash; with a gluten-free sourdough
        swap:
      </>
    ),
    dishes: ['greens-omelet'],
    bodySoft: <>Want me to start the order?</>,
  },
  {
    kind: 'user',
    key: 'u2',
    hold: 5500,
    text: 'morning press + the omelet, gf bread please',
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function MicWave() {
  return (
    <span className="mw-wave" aria-hidden="true">
      <span className="mw-wave-bar" />
      <span className="mw-wave-bar" />
      <span className="mw-wave-bar" />
      <span className="mw-wave-bar" />
      <span className="mw-wave-bar" />
    </span>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <motion.div
      className="mw-dish"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div
        className="mw-dish-art"
        style={{ backgroundImage: `url(${dish.photo})` }}
        aria-hidden="true"
      />
      <div className="mw-dish-body">
        <div className="mw-dish-row">
          <div className="mw-dish-name">{dish.name}</div>
          <div className="mw-dish-price">{dish.price}</div>
        </div>
        <div className="mw-dish-desc">{dish.desc}</div>
        <div className="mw-dish-tags">
          {dish.tags.map((t) => (
            <span key={t} className="mw-dish-tag">
              {t}
            </span>
          ))}
          {dish.swapNote && (
            <span className="mw-dish-tag mw-dish-tag-swap">
              {dish.swapNote}
            </span>
          )}
        </div>
      </div>
      <button className="mw-dish-add" aria-label={`Add ${dish.name}`}>
        +
      </button>
    </motion.div>
  );
}

export function MenuWaiterMockup() {
  const [index, setIndex] = useState(0);
  const [runId, setRunId] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (index >= BEATS.length) {
      const t = setTimeout(() => {
        setIndex(0);
        setRunId((n) => n + 1);
      }, 2400);
      return () => clearTimeout(t);
    }
    const beat = BEATS[index];
    const t = setTimeout(() => setIndex((i) => i + 1), beat.hold);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.scrollTo({ top: s.scrollHeight, behavior: 'smooth' });
  }, [index, runId]);

  const sheetOpen = index >= 1;
  const filtered = BEATS.slice(0, index + 1).some(
    (b) => b.kind === 'ai' && b.triggersFilter,
  );
  const visibleBeats = BEATS.slice(0, Math.min(index + 1, BEATS.length))
    .filter((b) => b.kind !== 'sheet-open');
  const activeBeat = BEATS[Math.min(index, BEATS.length - 1)];
  const aiIsTyping = activeBeat?.kind === 'ai' && index < BEATS.length;

  return (
    <main className="mw-root" data-testid="booth-mockup-menu">
      <div className="mw-phone">
        <div className="mw-notch" aria-hidden="true" />

        {/* Menu surface — captured PNG, untouched. AI sheet slides over. */}
        <div className={`mw-menu ${filtered ? 'is-filtered' : ''}`}>
          <div className="mw-menu-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mw-menu-img"
              src="/booth/screens/menu-miami-squeeze-full.png"
              alt="Menu"
            />
          </div>

          {/* Filter badge across the top when the AI hides items */}
          <AnimatePresence>
            {filtered && (
              <motion.div
                key="filter-badge"
                className="mw-filter-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="mw-filter-dot" aria-hidden="true" />
                <span>Peanut-free · Gluten-free</span>
                <span className="mw-filter-count">3 hidden</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI waiter sheet */}
        <motion.section
          key={`run-${runId}`}
          className="mw-sheet"
          initial={{ y: '100%' }}
          animate={{ y: sheetOpen ? '0%' : '100%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mw-sheet-grabber" aria-hidden="true" />
          <header className="mw-sheet-header">
            <span className="mw-sheet-avatar" aria-hidden="true">
              <span className="mw-sheet-avatar-orbit" />
              <span className="mw-sheet-palm" />
            </span>
            <div className="mw-sheet-headtext">
              <div className="mw-sheet-title">
                AI Waiter
                <span className="mw-sheet-badge">
                  <span className="mw-sheet-badge-dot" />
                  Live
                </span>
              </div>
              <div className="mw-sheet-sub">
                Listening · any language your guest speaks
              </div>
            </div>
          </header>

          <div className="mw-thread" ref={scrollRef}>
            <div className="mw-thread-hint">
              Ask in plain language. Voice or text. The waiter knows the
              menu, the allergies, and what&rsquo;s ready now.
            </div>

            {visibleBeats.map((b) => {
              if (b.kind === 'user') {
                return (
                  <motion.div
                    key={b.key}
                    className="mw-msg-row mw-msg-out"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="mw-bubble mw-bubble-out">{b.text}</div>
                  </motion.div>
                );
              }
              if (b.kind === 'ai') {
                return (
                  <motion.div
                    key={b.key}
                    className="mw-msg-row mw-msg-in"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div className="mw-bubble mw-bubble-in">
                      <div>{b.body}</div>
                      {b.dishes && (
                        <div className="mw-dish-stack">
                          {b.dishes.map((id) => (
                            <DishCard key={id} dish={DISHES[id]} />
                          ))}
                        </div>
                      )}
                      {b.bodySoft && (
                        <div className="mw-soft">{b.bodySoft}</div>
                      )}
                    </div>
                  </motion.div>
                );
              }
              return null;
            })}

            {aiIsTyping && (
              <div className="mw-typing-row">
                <span className="mw-typing" aria-hidden="true">
                  <span className="mw-typing-dot" />
                  <span className="mw-typing-dot" />
                  <span className="mw-typing-dot" />
                </span>
                <span className="mw-typing-label">Thinking</span>
              </div>
            )}

            <div className="mw-tail" aria-hidden="true" />
          </div>

          <footer className="mw-input">
            <div className="mw-input-pill">
              <MicWave />
              <span className="mw-input-placeholder">
                Hold to speak, or type…
              </span>
            </div>
            <button className="mw-send" aria-label="Voice or send">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5.91-3a.91.91 0 0 0-.91.91A5 5 0 0 1 7 11.91a.91.91 0 1 0-1.82 0 6.83 6.83 0 0 0 5.91 6.75V21h1.82v-2.34a6.83 6.83 0 0 0 5.91-6.75.91.91 0 0 0-.91-.91z"
                />
              </svg>
            </button>
          </footer>
        </motion.section>
      </div>
    </main>
  );
}
