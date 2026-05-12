'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const RSVP_URL = '/booth-8332';
const DISMISS_KEY = 'nra-banner-dismissed';
const BANNER_HEIGHT = '2.75rem';
const HIDDEN_ROUTES = ['/pitch', '/booth-8332'];

const TICKER_PHRASES = [
  'Meet your AI Cofounder',
  'You run the place. We do the rest.',
  'Bring your hardest restaurant problem',
  'Pull up a chair',
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
        <span key={i} className="flex items-center gap-4 px-4 whitespace-nowrap">
          <span className="text-[11px] font-medium tracking-[0.16em] text-cream-100/90 uppercase">
            {phrase}
          </span>
          <span
            className="text-accent-300/90 text-[10px] leading-none"
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
      <div className="relative flex h-11 items-center border-b border-black/30">
        {/* Anchored masthead — actionable info that never scrolls off */}
        <div className="flex shrink-0 items-center border-r border-accent-300/30 pl-4 pr-3 sm:pl-6 sm:pr-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-50 sm:text-[12px]">
            <span className="sm:hidden">Booth 8332</span>
            <span className="hidden sm:inline">
              Booth 8332 · NRA Show · May 16–19
            </span>
          </span>
        </div>

        {/* Marquee — editorial parade */}
        <div
          className="nra-marquee group/marquee flex-1 overflow-hidden"
          aria-label="Meet your AI Cofounder — you run the place, we do the rest. Bring your hardest restaurant problem. Pull up a chair."
        >
          <div className="nra-marquee-track flex w-max">
            <TickerSet />
            <TickerSet ariaHidden />
          </div>
        </div>

        {/* CTA + dismiss — pinned outside the marquee */}
        <div className="flex items-center gap-1 pl-2 pr-3 sm:gap-2 sm:pr-5">
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
