'use client';

import { useEffect, useState } from 'react';

export default function StickyMobileRSVP() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once the visitor has scrolled past the hero (~600px)
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-primary-700/50 bg-primary-950/95 px-5 py-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#menu"
        className="flex items-center justify-between rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-primary-950 shadow-[0_8px_24px_-12px_rgba(251,191,36,0.6)]"
      >
        <span>Reserve at booth 8332</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
