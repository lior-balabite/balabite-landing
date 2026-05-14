import { authenticate } from './actions';

/** Passcode gate for the owner-facing lead list. */
export default function AdminGate({ hasError }: { hasError: boolean }) {
  return (
    <div className="nra-gate">
      <div className="nra-gate-inner">
        <div className="nra-gate-eyebrow">BalaBite · NRA 2026</div>
        <h1 className="nra-serif nra-gate-title">The leads, in one place.</h1>
        <p className="nra-gate-sub">Enter the booth passcode to continue.</p>

        <form className="nra-gate-form" action={authenticate}>
          <input
            className="nra-gate-input"
            type="password"
            name="passcode"
            placeholder="passcode"
            autoComplete="off"
            autoFocus
            required
          />
          <button className="nra-gate-button" type="submit">
            Open the list →
          </button>
        </form>

        {hasError && (
          <p className="nra-gate-error">
            That passcode didn’t match. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
