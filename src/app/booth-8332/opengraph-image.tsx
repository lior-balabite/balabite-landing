import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BalaBite at NRA Show 2026 — Booth 8332';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 96px',
          background:
            'linear-gradient(135deg, rgb(12, 56, 50) 0%, rgb(28, 32, 78) 55%, rgb(60, 30, 60) 100%)',
          color: '#FAF5EE',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.9)',
          }}
        >
          balabite.ai · the AI Cofounder for independent restaurants
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontFamily: 'monospace',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(250, 245, 238, 0.78)',
            }}
          >
            NRA Show 2026 · May 16–19 · Chicago
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 240,
              fontWeight: 800,
              color: '#FCD34D',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            BOOTH 8332
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(250, 245, 238, 0.92)',
              marginTop: 6,
            }}
          >
            Coffee with the founder before doors open. Limited.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 18,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.72)',
          }}
        >
          balabite.ai/booth-8332
        </div>
      </div>
    ),
    { ...size },
  );
}
