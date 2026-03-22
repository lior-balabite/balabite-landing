'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useI18n } from '../../i18n/I18nProvider';

// ── Types ──────────────────────────────────────────────

type FormStep = 'pain' | 'contact' | 'confirmation';

const PAIN_POINTS = [
  "I'm losing money but can't pinpoint where",
  "I can't find or keep good staff",
  "I have no idea what's actually selling",
  "I'm spending more time on operations than on my guests",
  "My menu hasn't been optimized in years",
  'All of the above (honestly)',
] as const;

const LOCATION_OPTIONS = ['1', '2-5', '6+'] as const;
const POS_OPTIONS = ['Toast', 'Square', 'Clover', 'Other', 'None'] as const;

// ── Animation variants ─────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

// ── Component ──────────────────────────────────────────

export default function CTASection() {
  const { locale, t } = useI18n();
  const formRef = useRef<HTMLDivElement>(null);

  // Form state machine
  const [step, setStep] = useState<FormStep>('pain');
  const [selectedPains, setSelectedPains] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact fields
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationCount, setLocationCount] = useState('');
  const [currentPOS, setCurrentPOS] = useState('');

  // Translated pain points (fall back to hardcoded)
  const painPointItems = t('cta.painPoints.items');
  const painPoints: readonly string[] = Array.isArray(painPointItems) ? painPointItems : PAIN_POINTS;

  // ── Pain point helpers ─────────────────────────────

  const allOfAboveIdx = painPoints.length - 1;

  function togglePain(idx: number) {
    setSelectedPains((prev) => {
      const next = new Set(prev);

      if (idx === allOfAboveIdx) {
        // "All of the above" toggles everything
        if (next.has(allOfAboveIdx)) {
          next.clear();
        } else {
          painPoints.forEach((_, i) => next.add(i));
        }
      } else {
        if (next.has(idx)) {
          next.delete(idx);
          next.delete(allOfAboveIdx); // uncheck "all" if deselecting one
        } else {
          next.add(idx);
          // If all individual items are now selected, also check "all of the above"
          const allIndividual = Array.from({ length: allOfAboveIdx }, (_, i) => i).every((i) =>
            next.has(i) || i === idx,
          );
          if (allIndividual) next.add(allOfAboveIdx);
        }
      }

      return next;
    });
  }

  // ── Scroll to form ─────────────────────────────────

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── Phone formatting ───────────────────────────────

  function formatPhone(value: string): string {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }

  // ── Submit ─────────────────────────────────────────

  async function handleSubmit() {
    // Basic validation
    if (!restaurantName.trim() || !ownerName.trim() || !email.trim() || !phone.trim()) {
      toast.error(t('cta.validation.incompleteFields'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('cta.validation.invalidEmail'));
      return;
    }

    setIsSubmitting(true);

    const painMessages = Array.from(selectedPains)
      .filter((i) => i !== allOfAboveIdx)
      .map((i) => painPoints[i])
      .join('; ');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: restaurantName.trim(),
          ownerName: ownerName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          restaurantType: 'from-landing',
          location: locationCount || '1',
          message: painMessages,
          language: locale,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      toast.success(t('cta.messages.success'));
      setStep('confirmation');
    } catch {
      toast.error(t('cta.messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Input classes ──────────────────────────────────

  const inputCls =
    'w-full bg-primary-900/50 border border-primary-700 rounded-lg px-4 py-3 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors';

  const selectCls =
    'w-full bg-primary-900/50 border border-primary-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors appearance-none';

  // ── Render ─────────────────────────────────────────

  return (
    <section className="relative py-24 px-6 bg-cream-100">
      {/* ── Header ── */}
      <div className="max-w-[48rem] mx-auto text-center mb-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream-900 leading-tight mb-8"
        >
          {t('cta.mainHeading')}{' '}
          <span className="text-accent-500">{t('cta.mainHeadingAccent')}</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold text-lg px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-accent-500/20"
          >
            {t('cta.mainCta')}
          </button>
        </motion.div>
      </div>

      {/* ── Empathy Form ── */}
      <div ref={formRef} className="max-w-[32rem] mx-auto">
        <div className="relative backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Pain Points ── */}
            {step === 'pain' && (
              <motion.div
                key="pain"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  {t('cta.painPoints.heading')}
                </h3>

                <div className="space-y-3 mb-8">
                  {painPoints.map((label, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedPains.has(idx)}
                          onChange={() => togglePain(idx)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded border border-primary-600 bg-primary-900/50 peer-checked:bg-accent-500 peer-checked:border-accent-500 transition-colors flex items-center justify-center">
                          {selectedPains.has(idx) && (
                            <svg
                              className="w-3 h-3 text-primary-900"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-primary-200 group-hover:text-white transition-colors text-sm leading-relaxed">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => setStep('contact')}
                  disabled={selectedPains.size === 0}
                  className="w-full bg-accent-500 hover:bg-accent-400 disabled:opacity-40 disabled:cursor-not-allowed text-primary-900 font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                  {t('cta.buttons.next')}
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Contact Details ── */}
            {step === 'contact' && (
              <motion.div
                key="contact"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  {t('cta.contact.heading')}
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.restaurant')} <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      placeholder={t('cta.contact.placeholders.restaurant')}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.owner')} <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder={t('cta.contact.placeholders.owner')}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.email')} <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('cta.contact.placeholders.email')}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.phone')} <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder={t('cta.contact.placeholders.phone')}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.locations')}
                    </label>
                    <select
                      value={locationCount}
                      onChange={(e) => setLocationCount(e.target.value)}
                      className={selectCls}
                    >
                      <option value="" disabled>
                        {t('cta.contact.placeholders.select')}
                      </option>
                      {LOCATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-primary-300 mb-1">
                      {t('cta.contact.labels.currentPos')}
                    </label>
                    <select
                      value={currentPOS}
                      onChange={(e) => setCurrentPOS(e.target.value)}
                      className={selectCls}
                    >
                      <option value="" disabled>
                        {t('cta.contact.placeholders.select')}
                      </option>
                      {POS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('pain')}
                    className="flex-1 border border-primary-600 text-primary-200 hover:text-white hover:border-primary-500 font-medium py-3 rounded-xl transition-colors duration-200"
                  >
                    {t('cta.buttons.back')}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-accent-500 hover:bg-accent-400 disabled:opacity-60 text-primary-900 font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {t('cta.buttons.submitting')}
                      </>
                    ) : (
                      t('cta.buttons.submit')
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Confirmation ── */}
            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-6"
              >
                {/* Pulsing orb */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-amber-600 opacity-20 animate-ping" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent-400 to-amber-600 opacity-30 animate-pulse" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent-400 to-amber-500 shadow-lg shadow-accent-500/40" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('cta.confirmation.heading')}
                </h3>
                <p className="text-primary-400 text-sm">
                  {t('cta.confirmation.subtext')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="max-w-[48rem] mx-auto mt-24 pt-8 border-t border-primary-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-500">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-primary-300">{t('cta.footer.brand')}</span>
            <span>{t('cta.footer.copyright')}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-300 transition-colors">
              {t('cta.footer.about')}
            </a>
            <a href="#" className="hover:text-primary-300 transition-colors">
              {t('cta.footer.privacy')}
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-primary-600 mt-4">
          {t('cta.footer.builtWith')}
        </p>
      </footer>
    </section>
  );
}
