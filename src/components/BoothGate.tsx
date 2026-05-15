import { authenticateBooth } from '@/lib/booth-gate';

// The access gate shown for /booth-tv and /demo when the visitor has
// neither the ?key= URL param nor the auth cookie. Dark booth aesthetic,
// matching the surfaces it protects.
export function BoothGate({
  next,
  hasError,
}: {
  next: string;
  hasError: boolean;
}) {
  return (
    <main
      data-testid="booth-gate"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#faf5ee',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        padding: '6vh 6vw',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(251,191,36,0.12), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 540,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 22,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace), monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.34em',
            fontSize: 12,
            color: 'rgba(252,211,77,0.8)',
          }}
        >
          BalaBite &middot; Booth 8332
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontWeight: 400,
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.06,
            margin: 0,
            color: '#fffdf9',
          }}
        >
          This one&rsquo;s <i>just for the booth.</i>
        </h1>
        <p
          style={{
            color: 'rgba(250,245,238,0.66)',
            fontSize: 17,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 440,
          }}
        >
          The booth loop and the guided demo aren&rsquo;t public. Enter the
          access phrase Lior set &mdash; or open the link with the key already
          in it.
        </p>
        <form
          action={authenticateBooth}
          style={{
            display: 'flex',
            gap: 10,
            width: '100%',
            maxWidth: 420,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="key"
            placeholder="access phrase"
            required
            autoFocus
            data-testid="booth-gate-input"
            style={{
              flex: '1 1 220px',
              padding: '15px 22px',
              fontSize: 16,
              border: '1px solid rgba(250,245,238,0.22)',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.03)',
              color: '#faf5ee',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '15px 30px',
              fontSize: 15,
              fontWeight: 600,
              background: '#f59e0b',
              color: '#020617',
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Enter &rarr;
          </button>
        </form>
        {hasError && (
          <p style={{ color: '#fca5a5', fontSize: 14, margin: 0 }}>
            That phrase didn&rsquo;t match. Try again, or text Lior.
          </p>
        )}
      </div>
    </main>
  );
}
