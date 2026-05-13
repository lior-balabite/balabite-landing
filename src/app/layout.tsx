import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from '../i18n/I18nProvider';
import NRABanner from './components/NRABanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.balabite.ai'),
  title: 'BalaBite — Your AI Cofounder for restaurants',
  description:
    'You run the restaurant. We do the rest. The AI Cofounder for independent restaurants — live at NRA Show 2026, Booth 8332, May 16–19, Chicago.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#F59E0B',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'BalaBite — Your AI Cofounder for restaurants',
    description:
      'You run the place. We do the rest. Live at NRA Show 2026 — Booth 8332, May 16–19, Chicago.',
    type: 'website',
    siteName: 'BalaBite',
    url: 'https://www.balabite.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BalaBite — Your AI Cofounder for restaurants',
    description:
      'You run the place. We do the rest. NRA Show 2026 · Booth 8332.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
};

// JSON-LD structured data — Organization + WebSite + SoftwareApplication
// Helps Google + AI search understand the brand without parsing the page
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BalaBite',
  alternateName: 'BalaBite.ai',
  url: 'https://www.balabite.ai',
  logo: 'https://www.balabite.ai/palm-1592.svg',
  description:
    'The AI Cofounder for independent restaurants. You run the place. We do the rest.',
  founder: { '@type': 'Person', name: 'Lior Brik' },
  foundingDate: '2026',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'lior@balabite.ai',
    contactType: 'Customer Support',
  },
  sameAs: ['https://www.balabite.ai'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BalaBite',
  url: 'https://www.balabite.ai',
  description:
    'Your AI Cofounder for restaurants. You run the place. We do the rest.',
  publisher: { '@type': 'Organization', name: 'BalaBite' },
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BalaBite',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI Cofounder for independent restaurants. Built like a partner, priced like one.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '299',
    description:
      '$299/month floor + 1% of sales. Partner economics, not software pricing.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Restaurant owners and operators',
  },
  url: 'https://www.balabite.ai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-primary-900 h-full ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased min-h-screen bg-primary-900 text-primary-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <NRABanner />
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
