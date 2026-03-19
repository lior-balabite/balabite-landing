import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from '../i18n/I18nProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BalaBite.ai — The First AI Restaurant Partner',
  description:
    'BalaBite is the first AI that manages your menu, kitchen, team, and guests — so you don\'t have to. Put AI to work for your restaurant.',
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
    title: 'BalaBite.ai — The First AI Restaurant Partner',
    description:
      'You run the restaurant. Your AI partner runs the rest. Menu, kitchen, team, and guests — managed by AI.',
    type: 'website',
    siteName: 'BalaBite.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BalaBite.ai — The First AI Restaurant Partner',
    description:
      'You run the restaurant. Your AI partner runs the rest.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-primary-900 h-full ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-primary-900 text-primary-100">
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
