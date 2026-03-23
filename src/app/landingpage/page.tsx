'use client';

import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useI18n } from '../../i18n/I18nProvider';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HatStack from '../components/HatStack';
import WhatChanges from '../components/WhatChanges';
import Capabilities from '../components/Capabilities';
import GuestShowcase from '../components/GuestShowcase';
import ProductShowcase from '../components/ProductShowcase';
import HowItWorks from '../components/HowItWorks';
import VenueTypes from '../components/VenueTypes';
import SocialProof from '../components/SocialProof';
import FinalCTA from '../components/FinalCTA';

export default function LandingPage() {
  const { isLoading } = useI18n();
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCta = () => {
    ctaSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-accent-300 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          },
          success: {
            iconTheme: { primary: '#f59e0b', secondary: '#1e293b' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#1e293b' },
          },
        }}
      />

      {/* Sticky Navbar */}
      <Navbar onCtaClick={scrollToCta} />

      {/* === DARK SECTIONS === */}

      {/* Section 1: Hero — "Good morning, Chef." */}
      <HeroSection onCtaClick={scrollToCta} />

      {/* Section 2: Problem + Breaking Point — hat stack → collapse */}
      <HatStack />

      {/* === CREAM SECTIONS === */}

      {/* Section 3: The Resolution — nine brains, one partner */}
      <WhatChanges />

      {/* Section 4: Capabilities — three pillars, outcome-first */}
      <div id="capabilities">
        <Capabilities />
      </div>

      {/* CTA 3/4 — after capabilities */}
      <section className="py-12 px-6 bg-cream-100 text-center">
        <button
          onClick={scrollToCta}
          className="rounded-full bg-primary-900 px-8 py-3.5 text-base font-semibold text-cream-100 transition-all duration-200 hover:bg-primary-800 active:scale-[0.97]"
        >
          Get Started
        </button>
      </section>

      {/* Section 5: Guest Experience */}
      <GuestShowcase />

      {/* Section 6: Product Showcase — Pulse Briefing */}
      <ProductShowcase />

      {/* Section 7: How It Works — 3 Steps */}
      <HowItWorks />

      {/* Section 8: Venue Types */}
      <VenueTypes />

      {/* Section 9: Social Proof */}
      <SocialProof />

      {/* Section 10: Final CTA + Footer */}
      <FinalCTA ref={ctaSectionRef} />
    </div>
  );
}
