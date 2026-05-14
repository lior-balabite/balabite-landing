'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LOCATION_BUCKETS,
  type LeadSource,
  type LocationBucket,
  type NraEnrichment,
} from '@/lib/nra-types';

/* Role quick-picks — values are tuned so the server-side fit score reads them. */
const ROLE_CHIPS = [
  { label: 'Owner', value: 'Owner' },
  { label: 'Operator / GM', value: 'Operator / GM' },
  { label: 'Chef', value: 'Chef' },
  { label: 'Other', value: '__other__' },
] as const;

const LOCATION_LABELS: Record<LocationBucket, string> = {
  '1': '1',
  '2-5': '2–5',
  '6-20': '6–20',
  '20+': '20+',
};

type EnrichStatus = 'idle' | 'loading' | 'found' | 'none';
type Step = 'form' | 'submitting' | 'done';

interface FieldErrors {
  fullName?: string;
  restaurantName?: string;
  role?: string;
  email?: string;
  locationCount?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Compose the "feel seen" line from public enrichment + the prospect's own input. */
function composeReflection(e: NraEnrichment, bucket?: LocationBucket): string {
  const place = e.locality?.trim() || e.region?.trim();
  const cuisine = e.cuisine?.trim();

  // No cuisine signal — just acknowledge the place so it still feels seen.
  if (!cuisine) {
    if (place) {
      return bucket === '2-5' || bucket === '6-20'
        ? `found you — ${place} and around, right?`
        : `found you — ${place}, right?`;
    }
    return 'found it.';
  }

  // Some enrichment values are place-nouns ("Coffee shop"); others are
  // cuisine adjectives ("Italian"). Phrase each naturally.
  const isPlaceNoun = /(shop|bar|pub|bakery|deli|court|stand|house|hall|room)$/i.test(
    cuisine
  );
  const noun = isPlaceNoun ? cuisine.toLowerCase() : `${cuisine} spot`;
  const plural = isPlaceNoun ? `${cuisine.toLowerCase()}s` : `${cuisine} spots`;
  const article = /^[aeiou]/i.test(noun) ? 'an' : 'a';

  let phrase: string;
  switch (bucket) {
    case '2-5':
      phrase = place ? `a handful of ${plural} around ${place}` : `a handful of ${plural}`;
      break;
    case '6-20':
      phrase = place
        ? `a growing group of ${plural} — ${place} and beyond`
        : `a growing group of ${plural}`;
      break;
    case '20+':
      phrase = place
        ? `a serious ${noun} operation out of ${place}`
        : `a serious ${noun} operation`;
      break;
    default:
      phrase = place ? `${article} ${noun} in ${place}` : `${article} ${noun}`;
      break;
  }
  return `looks like ${phrase}.`;
}

export default function NraSignup({ source }: { source: LeadSource }) {
  const [step, setStep] = useState<Step>('form');

  const [fullName, setFullName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [city, setCity] = useState('');
  const [roleChip, setRoleChip] = useState<string>('');
  const [roleOther, setRoleOther] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationCount, setLocationCount] = useState<LocationBucket | undefined>();

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');

  const [enrichStatus, setEnrichStatus] = useState<EnrichStatus>('idle');
  const [enrichment, setEnrichment] = useState<NraEnrichment | null>(null);

  // What the confirmation screen echoes back (frozen at submit time).
  const [confirmName, setConfirmName] = useState('');

  const enrichAbort = useRef<AbortController | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolvedRole = roleChip === '__other__' ? roleOther.trim() : roleChip;

  /* --- Background enrichment: debounced on restaurant name (+ city) ----- */
  useEffect(() => {
    const name = restaurantName.trim();
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (name.length < 3) {
      enrichAbort.current?.abort();
      setEnrichStatus('idle');
      setEnrichment(null);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      enrichAbort.current?.abort();
      const controller = new AbortController();
      enrichAbort.current = controller;
      setEnrichStatus('loading');

      fetch('/api/nra/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantName: name, city: city.trim() || undefined }),
        signal: controller.signal,
      })
        .then((r) => (r.ok ? r.json() : { enrichment: null }))
        .then((data: { enrichment: NraEnrichment | null }) => {
          if (controller.signal.aborted) return;
          if (data.enrichment) {
            setEnrichment(data.enrichment);
            setEnrichStatus('found');
          } else {
            setEnrichment(null);
            setEnrichStatus('none');
          }
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          // Enrichment never blocks the form — a failure just means no reflection.
          setEnrichment(null);
          setEnrichStatus('none');
        });
    }, 650);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [restaurantName, city]);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (fullName.trim().length < 2) next.fullName = 'Your name, please.';
    if (restaurantName.trim().length < 2) next.restaurantName = 'Restaurant name, please.';
    if (!resolvedRole) {
      next.role =
        roleChip === '__other__' ? 'Tell us your role.' : 'Pick the one that fits.';
    }
    if (!EMAIL_RE.test(email.trim())) next.email = 'A valid email, please.';
    if (!locationCount) next.locationCount = 'How many locations?';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;

    setStep('submitting');
    const submittedName = restaurantName.trim();

    try {
      const res = await fetch('/api/nra/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          restaurantName: submittedName,
          role: resolvedRole,
          email: email.trim(),
          phone: phone.trim() || undefined,
          city: city.trim() || undefined,
          locationCount,
          source,
          enrichment: enrichStatus === 'found' ? enrichment : null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setFormError(
          body?.error === 'Validation failed'
            ? 'Something looks off above — give it another look.'
            : 'That didn’t go through. One more try?'
        );
        setStep('form');
        return;
      }

      setConfirmName(submittedName);
      setStep('done');
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setFormError('That didn’t go through — check your connection and try once more.');
      setStep('form');
    }
  }

  const showReflection = enrichStatus === 'loading' || enrichStatus === 'found';

  /* ===================================================================
     CONFIRMATION SCREEN
     ── PITCH-TAB HANDOFF ─────────────────────────────────────────────
     This is the screen the booth/booklet pitch closes into. Copy here
     is intentionally the "one product" voice with the pitch deck:
     Cofounder framing, plants intent, no feature-anchoring. If the
     pitch tab (tab/nra-pitch) revises its closing line, mirror it in
     `confirmHeadline` / `confirmBody` below so the two stay aligned.
     =================================================================== */
  if (step === 'done') {
    return (
      <motion.div
        className="nra-confirm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="nra-confirm-seal">
          <span className="nra-reflect-dot" aria-hidden="true" />
          You’re in
        </span>

        <h1 className="nra-serif nra-confirm-headline">
          Your Cofounder is already reading up on {confirmName}.
        </h1>

        <p className="nra-confirm-body">
          You run the place — that part’s yours.{' '}
          <strong>BalaBite is the Cofounder that takes the rest.</strong> It’s
          already reading up on {confirmName}, so by the time we talk, we can
          skip the small talk and get straight to what’s costing you.
        </p>

        <div className="nra-confirm-card">
          <div className="nra-confirm-card-label">What happens next</div>
          <p className="nra-confirm-step">
            Lior reaches out within the week. No pitch theater — just a straight
            conversation about where a Cofounder would pull its weight at{' '}
            {confirmName}. There’s a note from him in your inbox already.
          </p>
        </div>

        <p className="nra-confirm-signoff">
          — Lior
          <span>Founder, BalaBite · Booth 8332</span>
        </p>
      </motion.div>
    );
  }

  /* ===================================================================
     SIGNUP FORM
     =================================================================== */
  return (
    <form className="nra-form" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="nra-field">
        <label className="nra-label" htmlFor="nra-name">
          Your name
        </label>
        <input
          id="nra-name"
          className={`nra-input ${errors.fullName ? 'nra-input-error' : ''}`}
          type="text"
          autoComplete="name"
          placeholder="Jordan Rivera"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <span className="nra-error-text" role="alert">
            {errors.fullName}
          </span>
        )}
      </div>

      {/* Restaurant + City — the pair that drives enrichment */}
      <div className="nra-field-row">
        <div className="nra-field">
          <label className="nra-label" htmlFor="nra-restaurant">
            Restaurant
          </label>
          <input
            id="nra-restaurant"
            className={`nra-input ${errors.restaurantName ? 'nra-input-error' : ''}`}
            type="text"
            autoComplete="organization"
            placeholder="Maple & Vine"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            aria-invalid={!!errors.restaurantName}
          />
          {errors.restaurantName && (
            <span className="nra-error-text" role="alert">
              {errors.restaurantName}
            </span>
          )}
        </div>
        <div className="nra-field">
          <label className="nra-label" htmlFor="nra-city">
            City
            <span className="nra-optional">helps</span>
          </label>
          <input
            id="nra-city"
            className="nra-input"
            type="text"
            autoComplete="address-level2"
            placeholder="Cleveland"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      {/* Enrichment reflection — the "Cofounder noticed you" moment */}
      <AnimatePresence>
        {showReflection && (
          <motion.div
            key={enrichStatus}
            initial={{ opacity: 0, height: 0, marginTop: -18 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: -18 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nra-reflect" aria-live="polite">
              <span className="nra-reflect-dot" aria-hidden="true" />
              {enrichStatus === 'loading' ? (
                <div className="nra-reflect-thinking">
                  Reading up on {restaurantName.trim()}…
                </div>
              ) : (
                <div>
                  <div className="nra-reflect-label">Your Cofounder</div>
                  <div className="nra-reflect-text">
                    Got it — {enrichment && composeReflection(enrichment, locationCount)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role */}
      <div className="nra-field">
        <span className="nra-label">Your role</span>
        <div className="nra-chips" role="group" aria-label="Your role">
          {ROLE_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className="nra-chip"
              aria-pressed={roleChip === chip.value}
              onClick={() => {
                setRoleChip(chip.value);
                setErrors((p) => ({ ...p, role: undefined }));
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
        {roleChip === '__other__' && (
          <input
            className={`nra-input ${errors.role ? 'nra-input-error' : ''}`}
            type="text"
            placeholder="e.g. Beverage Director"
            value={roleOther}
            onChange={(e) => setRoleOther(e.target.value)}
            aria-label="Your role"
            aria-invalid={!!errors.role}
            style={{ marginTop: 9 }}
          />
        )}
        {errors.role && (
          <span className="nra-error-text" role="alert">
            {errors.role}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="nra-field">
        <label className="nra-label" htmlFor="nra-email">
          Email
        </label>
        <input
          id="nra-email"
          className={`nra-input ${errors.email ? 'nra-input-error' : ''}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          placeholder="you@restaurant.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="nra-error-text" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Phone (optional) */}
      <div className="nra-field">
        <label className="nra-label" htmlFor="nra-phone">
          Phone
          <span className="nra-optional">optional</span>
        </label>
        <input
          id="nra-phone"
          className="nra-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(216) 555-0142"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* # of locations */}
      <div className="nra-field">
        <span className="nra-label">How many locations</span>
        <div className="nra-chips" role="group" aria-label="Number of locations">
          {LOCATION_BUCKETS.map((bucket) => (
            <button
              key={bucket}
              type="button"
              className="nra-chip"
              aria-pressed={locationCount === bucket}
              onClick={() => {
                setLocationCount(bucket);
                setErrors((p) => ({ ...p, locationCount: undefined }));
              }}
            >
              {LOCATION_LABELS[bucket]}
            </button>
          ))}
        </div>
        {errors.locationCount && (
          <span className="nra-error-text" role="alert">
            {errors.locationCount}
          </span>
        )}
      </div>

      <button type="submit" className="nra-submit" disabled={step === 'submitting'}>
        {step === 'submitting' ? 'One moment…' : 'Start the conversation'}
      </button>

      {formError && (
        <p className="nra-form-error" role="alert">
          {formError}
        </p>
      )}

      <p className="nra-trust">
        No clipboard, no spam — just a real conversation about your restaurant.
        Lior reads every one of these himself.
      </p>
    </form>
  );
}
