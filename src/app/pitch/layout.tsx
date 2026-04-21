import type { Metadata } from 'next';
import {
  Instrument_Serif,
  Inter,
  Caveat,
  IBM_Plex_Mono,
  Bodoni_Moda,
  Playfair_Display,
} from 'next/font/google';
import './pitch.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-investors',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BalaBite — The AI Business Partner',
  description: 'The AI business partner every restaurant owner deserves. Pre-seed deck.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${instrumentSerif.variable} ${inter.variable} ${caveat.variable} ${plexMono.variable} ${bodoniModa.variable} ${playfair.variable} investors-root`}
    >
      {children}
    </div>
  );
}
