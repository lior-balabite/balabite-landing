import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className={`bg-primary-900 h-full ${inter.variable}`}>
      <body
        className="antialiased min-h-screen bg-primary-900 text-primary-100"
      >
        {children}
      </body>
    </html>
  );
}
