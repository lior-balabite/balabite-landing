'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const RSVP_URL = '/booth-8332';
const DISMISS_KEY = 'nra-banner-dismissed';
const BANNER_HEIGHT = '2.75rem';
const HIDDEN_ROUTES = ['/pitch', '/booth-8332'];

const TICKER_PHRASES = [
  'Coffee with the founder before doors open — limited',
  'Drinks off-floor after the floor closes — four nights',
  'Demo on your real numbers — slots open after May 20',
  'Booth 8332 — through Tuesday',
];

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props {
  hideAfterIso: string;
}

function readDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function TickerSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={ariaHidden}>
      {TICKER_PHRASES.map((phrase, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap text-[13px] font-normal tracking-tight text-cream-100/90"
        >
          <span>{phrase}</span>
          <span
            className="mx-7 text-[11px] leading-none text-accent-300/90 select-none"
            aria-hidden="true"
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function NRABannerClient({ hideAfterIso }: Props) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState<boolean>(readDismissed);
  const [pastCutoff, setPastCutoff] = useState(false);

  useEffect(() => {
    if (Date.now() >= new Date(hideAfterIso).getTime()) setPastCutoff(true);
  }, [hideAfterIso]);

  const onHiddenRoute = HIDDEN_ROUTES.some((r) => pathname?.startsWith(r));
  const shouldShow = !dismissed && !pastCutoff && !onHiddenRoute;

  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--nra-banner-h', shouldShow ? BANNER_HEIGHT : '0px');
    return () => {
      root.style.removeProperty('--nra-banner-h');
    };
  }, [shouldShow]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="NRA Show 2026 announcement"
      aria-hidden={!shouldShow}
      className="nra-banner-bg fixed inset-x-0 top-0 z-[60] overflow-hidden"
      style={{
        height: 'var(--nra-banner-h, 0px)',
        transition: 'height 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: shouldShow ? 'auto' : 'none',
      }}
      data-testid="nra-banner"
    >
      <div className="relative h-11 border-b border-black/30">
        {/* Marquee — full-width, runs behind the centered sign so phrases pass
            from one side to the other (continues on both sides of the sign).
            Hidden on mobile (cramped at 375px). */}
        <div
          className="nra-marquee absolute inset-0 hidden overflow-hidden sm:block"
          aria-label="Coffee with the founder before doors open — limited. Drinks off-floor after the floor closes — four nights. Demo on your real numbers — slots open after May 20. Booth 8332 — through Tuesday."
        >
          <div className="nra-marquee-track flex h-full w-max items-center">
            <TickerSet />
            <TickerSet ariaHidden />
          </div>
        </div>

        {/* Centered booth sign — modern glass pill: backdrop-blur, thin gold
            inlay, soft halo. Lit-from-within gold number, no emboss. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-accent-500/45 bg-primary-950/90 px-7 py-2 backdrop-blur-xl shadow-[0_2px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] sm:gap-4 sm:px-9 sm:py-2.5"
          data-testid="nra-banner-sign"
        >
          <span
            className="hidden uppercase tracking-[0.24em] text-cream-200/70 text-[10px] sm:inline sm:text-[11px]"
            style={{ fontFamily: 'var(--font-mono, ui-monospace)' }}
          >
            NRA Show 2026
          </span>
          <span
            className="hidden text-accent-500/50 sm:inline"
            aria-hidden="true"
          >
            ·
          </span>
          <span className="flex items-center gap-2">
            <span
              className="uppercase tracking-[0.24em] text-cream-200/85 text-[10px] sm:text-[11px]"
              style={{ fontFamily: 'var(--font-mono, ui-monospace)' }}
            >
              Booth
            </span>
            <span
              className="leading-none text-[24px] font-bold tracking-tight text-accent-300 sm:text-[32px]"
              style={{
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 28px rgba(251,191,36,0.35)',
              }}
            >
              8332
            </span>
          </span>
          <span
            className="hidden text-accent-500/50 sm:inline"
            aria-hidden="true"
          >
            ·
          </span>
          <span
            className="hidden uppercase tracking-[0.24em] text-cream-200/70 text-[10px] sm:inline sm:text-[11px]"
            style={{ fontFamily: 'var(--font-mono, ui-monospace)' }}
          >
            May 16–19
          </span>
        </div>

        {/* CTA + dismiss — right-anchored, on top of any marquee/bg */}
        <div className="absolute inset-y-0 right-0 z-10 flex items-center gap-1 pr-3 sm:gap-2 sm:pr-5">
          <a
            href={RSVP_URL}
            tabIndex={shouldShow ? 0 : -1}
            className="group flex items-center gap-1.5 whitespace-nowrap rounded-sm text-[13px] font-medium tracking-tight text-cream-100 transition-colors hover:text-accent-200 focus-visible:text-accent-200 focus-visible:outline-none sm:text-sm"
            data-testid="nra-banner-cta"
          >
            <span>RSVP</span>
            <span
              className="transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            tabIndex={shouldShow ? 0 : -1}
            aria-label="Dismiss announcement"
            className="-mr-1 grid place-items-center rounded p-1.5 text-cream-200/60 transition-colors hover:text-cream-100 focus-visible:text-cream-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream-100/40"
            data-testid="nra-banner-dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 2 L10 10 M10 2 L2 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
