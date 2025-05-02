import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/geist';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BalaBite.ai - Your Best Waiter, At Every Table',
  description: 'AI-powered digital waiter system revolutionizing restaurant service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-primary-900 h-full ${geist.variable}`}>
      <body
        className="antialiased min-h-screen bg-primary-900 text-primary-100"
      >
        {children}
      </body>
    </html>
  );
}
