import { authenticate } from '@/app/pitch/actions';
import { LogoMark } from './LogoMark';

export function LoginGate({ hasError }: { hasError: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="container-narrow" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, color: 'var(--ink)' }}>
          <LogoMark size={42} />
        </div>
        <div className="eyebrow" style={{ marginBottom: 28 }}>Private · BalaBite Investor Memo</div>
        <h1 className="serif" style={{ fontSize: 'clamp(52px, 8vw, 96px)', margin: '0 0 28px', letterSpacing: '-0.02em' }}>
          You&rsquo;re about to meet <span className="serif-italic">the partner</span>.
        </h1>
        <p style={{ maxWidth: 560, margin: '0 auto 48px', color: 'var(--ink-70)', fontSize: 19, lineHeight: 1.6 }}>
          What follows is a private, time-sensitive memo for prospective investors in
          BalaBite&rsquo;s pre-seed round. Please enter the access phrase shared by Lior.
        </p>

        <form
          action={authenticate}
          style={{
            display: 'flex',
            gap: 12,
            maxWidth: 460,
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <input
            type="password"
            name="password"
            placeholder="access phrase"
            required
            autoFocus
            style={{
              flex: '1 1 240px',
              padding: '16px 22px',
              fontSize: 16,
              border: '1px solid var(--ink-30)',
              borderRadius: 999,
              background: 'transparent',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '16px 32px',
              fontSize: 15,
              fontWeight: 500,
              background: 'var(--ink)',
              color: 'var(--cream)',
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.02em',
            }}
          >
            Enter &rarr;
          </button>
        </form>

        {hasError && (
          <p style={{ marginTop: 24, color: 'var(--burgundy)', fontSize: 14 }}>
            That phrase didn&rsquo;t match. Try again, or reach out to{' '}
            <a href="mailto:lior@balabite.ai" style={{ color: 'var(--burgundy)', textDecoration: 'underline' }}>
              lior@balabite.ai
            </a>
            .
          </p>
        )}

        <div style={{ marginTop: 80, fontSize: 12, color: 'var(--ink-50)', letterSpacing: '0.08em' }}>
          BALABITE.AI &nbsp;·&nbsp; PRE-SEED · 2026
        </div>
      </div>
    </div>
  );
}
