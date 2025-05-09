import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BalaBite.ai - Your Best Waiter, At Every Table',
  description: 'AI-powered digital waiter system revolutionizing restaurant service with personal care',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#F59E0B'
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-primary-900 h-full ${inter.variable}`}>
      <body
        className="antialiased min-h-screen bg-primary-900 text-primary-100"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
