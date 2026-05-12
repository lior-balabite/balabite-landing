'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const NRA_BOOKING_URL =
  process.env.NEXT_PUBLIC_NRA_BOOKING_URL ?? 'https://cal.com/lior-balabite/nra-2026';
const DISMISS_KEY = 'nra-banner-dismissed';
const BANNER_HEIGHT = '2.75rem';

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

export default function NRABannerClient({ hideAfterIso }: Props) {
  const pathname = usePathname();
  // Lazy init so the first hydrated render already reflects sessionStorage.
  // Prevents a banner flash on reload when the user has previously dismissed.
  const [dismissed, setDismissed] = useState<boolean>(readDismissed);
  const [pastCutoff, setPastCutoff] = useState(false);

  useEffect(() => {
    if (Date.now() >= new Date(hideAfterIso).getTime()) setPastCutoff(true);
  }, [hideAfterIso]);

  const onPitch = pathname?.startsWith('/pitch') ?? false;
  const shouldShow = !dismissed && !pastCutoff && !onPitch;

  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    if (shouldShow) {
      root.style.setProperty('--nra-banner-h', BANNER_HEIGHT);
    } else {
      root.style.setProperty('--nra-banner-h', '0px');
    }
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
      className="fixed inset-x-0 top-0 z-[60] overflow-hidden"
      style={{
        height: 'var(--nra-banner-h, 0px)',
        transition: 'height 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: 'rgb(12, 56, 50)',
        pointerEvents: shouldShow ? 'auto' : 'none',
      }}
      data-testid="nra-banner"
    >
      <div className="mx-auto flex h-11 max-w-[90rem] items-center justify-between gap-3 border-b border-black/30 px-4 text-cream-100 sm:px-10 lg:px-16">
        <p className="flex-1 truncate text-[13px] font-medium tracking-tight sm:hidden">
          Booth 8332 · May 16–19
        </p>
        <p className="hidden text-sm font-medium tracking-tight sm:block">
          Visit us at NRA Show — Booth 8332, May 16–19, Chicago
        </p>

        <div className="flex items-center gap-2 sm:gap-5">
          <a
            href={NRA_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={shouldShow ? 0 : -1}
            className="group flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium tracking-tight text-cream-100 transition-colors hover:text-accent-200 focus-visible:text-accent-200 focus-visible:outline-none sm:text-sm"
            data-testid="nra-banner-cta"
          >
            <span className="hidden sm:inline">Book 15 min at booth 8332</span>
            <span className="sm:hidden">Book 15 min</span>
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
