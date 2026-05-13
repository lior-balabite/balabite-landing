import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BalaBite — Your AI Cofounder for restaurants';
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
          padding: '70px 96px',
          background:
            'linear-gradient(135deg, rgb(12, 56, 50) 0%, rgb(20, 38, 80) 55%, rgb(60, 30, 60) 100%)',
          color: '#FAF5EE',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.9)',
          }}
        >
          balabite.ai
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontFamily: 'Georgia, serif',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Your AI Cofounder for restaurants.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 38,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(250, 245, 238, 0.78)',
              marginTop: 8,
            }}
          >
            You run the place. We do the rest.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 18,
            fontFamily: 'monospace',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.72)',
          }}
        >
          NRA Show 2026 · Booth 8332 · May 16–19 · Chicago
        </div>
      </div>
    ),
    { ...size },
  );
}
