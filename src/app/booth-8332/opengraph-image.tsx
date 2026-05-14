import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BalaBite at NRA Show 2026 — Booth 8332';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Designed for square-crop safety: chat apps (iMessage, WhatsApp) crop OG
 * images to a small square showing the center. The focal block — booth
 * plaque + dates + scarcity line — is centered and sized to fit in a
 * ~600×500 safe zone so it survives any crop.
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
            'linear-gradient(135deg, rgb(12, 56, 50) 0%, rgb(28, 32, 78) 55%, rgb(60, 30, 60) 100%)',
          color: '#FAF5EE',
        }}
      >
        {/* Top brand wordmark */}
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

        {/* Centered focal block — survives any square crop */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontFamily: 'monospace',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(250, 245, 238, 0.72)',
            }}
          >
            NRA Show 2026 · May 16–19 · Chicago
          </div>

          {/* Plaque — visual focal point of the OG */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid rgba(252, 211, 77, 0.42)',
              borderRadius: 28,
              padding: '24px 68px 30px',
              background: 'rgba(15, 23, 42, 0.55)',
              boxShadow: '0 0 60px rgba(252, 211, 77, 0.18)',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontFamily: 'monospace',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: 'rgba(250, 245, 238, 0.7)',
                marginBottom: 6,
              }}
            >
              Booth
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 180,
                fontWeight: 800,
                color: '#FCD34D',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              8332
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(250, 245, 238, 0.9)',
              marginTop: 4,
              textAlign: 'center',
            }}
          >
            Coffee with the founder before doors open. Limited.
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            fontFamily: 'monospace',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(252, 211, 77, 0.68)',
          }}
        >
          balabite.ai/booth-8332
        </div>
      </div>
    ),
    { ...size },
  );
}
