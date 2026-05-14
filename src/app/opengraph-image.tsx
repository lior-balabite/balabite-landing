import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BalaBite — Your AI Cofounder for restaurants';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Designed for square-crop safety: the centered "balabite / AI Cofounder"
 * block sits in the middle ~600×500 safe zone so chat-app previews
 * (which crop to a small center square) still surface the brand identity
 * and the deal line.
 */
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '44px 80px',
          background:
            'linear-gradient(135deg, rgb(12, 56, 50) 0%, rgb(20, 38, 80) 55%, rgb(60, 30, 60) 100%)',
          color: '#FAF5EE',
        }}
      >
        {/* Top brand URL */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.88)',
          }}
        >
          balabite.ai
        </div>

        {/* Centered focal block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 124,
              color: '#FAF5EE',
              letterSpacing: '-0.015em',
              lineHeight: 0.95,
            }}
          >
            balabite
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontSize: 60,
              color: 'rgba(250, 245, 238, 0.94)',
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
              marginTop: 6,
              textAlign: 'center',
            }}
          >
            Your AI Cofounder for restaurants.
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 32,
              color: '#FCD34D',
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            You run the place. We do the rest.
          </div>
        </div>

        {/* Bottom event line */}
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.7)',
          }}
        >
          NRA Show 2026 · Booth 8332 · May 16–19 · Chicago
        </div>
      </div>
    ),
    { ...size },
  );
}
