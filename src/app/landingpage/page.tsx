'use client';

import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useI18n } from '../../i18n/I18nProvider';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import MeetYourTeam from '../components/MeetYourTeam';
import TheBrains from '../components/TheBrains';
import PulseShowcase from '../components/PulseShowcase';
import GuestExperience from '../components/GuestExperience';
import SocialProof from '../components/SocialProof';
import CTASection from '../components/CTASection';

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

      {/* 1. Hero */}
      <HeroSection onCtaClick={scrollToCta} />

      {/* 2. The Problem — "You're wearing too many hats" */}
      <ProblemSection />

      {/* 3. Meet Your Team — team scene reveal */}
      <MeetYourTeam />

      {/* 4. The Brains — 8 specialists in 3 pillars */}
      <div id="features">
        <TheBrains />
      </div>

      {/* 5. The Pulse — morning briefing */}
      <PulseShowcase />

      {/* 6. Guest Experience */}
      <GuestExperience />

      {/* 7. Social Proof */}
      <SocialProof />

      {/* 8. CTA + Footer */}
      <div ref={ctaSectionRef}>
        <CTASection />
      </div>
    </div>
  );
}
