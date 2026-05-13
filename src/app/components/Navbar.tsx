'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On cream bg throughout since hero is now cream
  const bgClass = !isScrolled
    ? 'bg-transparent'
    : 'bg-cream-100/80 backdrop-blur-lg shadow-lg shadow-black/5';

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
      style={{ top: 'var(--nra-banner-h, 0px)' }}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 sm:px-10 lg:px-16 py-2 sm:py-4">
        {/* Logo — SVG inline so we can control color */}
        <a href="/" className="flex items-end gap-2.5 leading-none sm:gap-3">
          {/* Prospero Alpini 1592 date-palm woodcut — vectorized in the NRA
              book repo. CSS-masked so we can color it via Tailwind. Gentle
              sway from the trunk base — barely perceptible at a glance. */}
          <span
            aria-label="BalaBite"
            role="img"
            className="nra-palm-sway inline-block h-8 w-[22px] bg-primary-900 sm:h-11 sm:w-[30px]"
            style={{
              WebkitMaskImage: 'url(/palm-1592.svg)',
              maskImage: 'url(/palm-1592.svg)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
          <span
            className="italic text-primary-900 text-2xl sm:text-[2rem] leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
          >
            balabite
          </span>
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={onCtaClick}
            className="hidden sm:block rounded-full bg-primary-900 text-cream-100 hover:bg-primary-800 px-5 py-2 text-sm font-semibold transition-all duration-200"
          >
            Put AI to Work
          </button>
        </div>
      </div>
    </nav>
  );
}
