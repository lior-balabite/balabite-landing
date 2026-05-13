import QRCode from 'qrcode';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR · Booth 8332 — BalaBite',
  description:
    'Scan to plan your visit to BalaBite at NRA Show 2026, Booth 8332.',
  robots: { index: false, follow: false },
};

const QR_TARGET = 'https://balabite.ai/booth-8332';

export default async function BoothQRPage() {
  // Generate the QR as SVG server-side. High error-correction so it survives
  // glare / phone screen / printed handout.
  const svg = await QRCode.toString(QR_TARGET, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#0F172A',
      light: '#FAF5EE',
    },
    width: 720,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-6 py-12 text-primary-900">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary-600 sm:text-[11px]"
        data-testid="qr-eyebrow"
      >
        NRA Show 2026 · Booth 8332 · May 16–19
      </p>

      <h1
        className="mt-4 text-center font-serif text-3xl tracking-tight text-primary-900 sm:text-4xl"
        style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
      >
        <span className="italic">Scan to plan your visit.</span>
      </h1>

      <div
        className="mt-10 rounded-3xl border border-primary-900/10 bg-cream-50 p-6 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.2)] sm:p-8"
        dangerouslySetInnerHTML={{ __html: svg }}
        data-testid="qr-image"
      />

      <p className="mt-8 max-w-md text-center font-serif italic text-primary-700 sm:text-lg">
        balabite.ai/booth-8332
      </p>

      <p className="mt-6 max-w-md text-center text-sm text-primary-600">
        Coffee with the founder before doors open. Drinks after service. A
        demo on your real numbers, after the show.
      </p>
    </main>
  );
}
