'use client';

import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useI18n } from '../../i18n/I18nProvider';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TheSplit from '../components/TheSplit';
import TheTeam from '../components/TheTeam';
import HowItWorks from '../components/HowItWorks';
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

      {/* Section 2: The Split — Without vs With BalaBite */}
      <TheSplit />

      {/* Section 3: The Team — 9 AI brains */}
      <div id="capabilities">
        <TheTeam />
      </div>

      {/* Section 4: How It Works — 3 Steps */}
      <HowItWorks />

      {/* Section 5: Social Proof */}
      <SocialProof />

      {/* Section 6: Final CTA + Footer */}
      <FinalCTA ref={ctaSectionRef} />
    </div>
  );
}
