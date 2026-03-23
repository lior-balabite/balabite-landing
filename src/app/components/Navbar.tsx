'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [onCream, setOnCream] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Switch navbar theme when entering cream sections
  useEffect(() => {
    const creamSentinel = document.getElementById('cream-start');
    if (!creamSentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnCream(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    );

    observer.observe(creamSentinel);
    return () => observer.disconnect();
  }, []);

  const bgClass = !isScrolled
    ? 'bg-transparent'
    : onCream
      ? 'bg-cream-100/80 backdrop-blur-lg shadow-lg shadow-black/5'
      : 'bg-primary-900/80 backdrop-blur-lg shadow-lg shadow-black/10';

  const textClass = onCream && isScrolled ? 'text-cream-900' : 'text-primary-100';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-4">
        <Image
          src="/logo.png"
          alt="BalaBite.ai"
          width={48}
          height={48}
        />
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={onCtaClick}
            className={`hidden sm:block rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              onCream && isScrolled
                ? 'bg-primary-900 text-cream-100 hover:bg-primary-800'
                : 'bg-primary-100 text-primary-900 hover:bg-white'
            }`}
          >
            Put AI to Work
          </button>
        </div>
      </div>
    </nav>
  );
}
