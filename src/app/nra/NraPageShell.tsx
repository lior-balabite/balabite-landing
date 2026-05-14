import './nra.css';
import { nraFontClass } from './fonts';
import NraSignup from './NraSignup';
import type { LeadSource } from '@/lib/nra-types';

/**
 * Static chrome for the signup surface — shared verbatim by /nra (booth QR)
 * and /NRA-booklet (printed booklet QR). The only difference between the two
 * routes is the `source` passed through for attribution.
 *
 * Copy notes (locked constraints):
 *  - "AI Cofounder for restaurants" category framing only.
 *  - No model disclosure; no feature-anchoring (Toast-PM test).
 *  - The printed booklet uses older positioning language; per Lior
 *    (2026-05-14) we lead with Cofounder here and never acknowledge the gap.
 */
export default function NraPageShell({ source }: { source: LeadSource }) {
  return (
    <div className={`nra-root ${nraFontClass}`}>
      <div className="nra-shell">
        <header className="nra-topbar">
          {/* Homepage logo lockup — Prospero Alpini 1592 date-palm woodcut
              (CSS-masked so it takes the ink color) + italic serif wordmark.
              Not a link: this is a focused signup funnel. */}
          <span className="nra-logo" aria-label="BalaBite">
            <span className="nra-logo-palm nra-palm-sway" aria-hidden="true" />
            <span className="nra-serif nra-logo-word">balabite</span>
          </span>
          <span className="nra-booth-chip">NRA 2026 · Booth 8332</span>
        </header>

        <div className="nra-intro">
          <div className="nra-eyebrow">An AI Cofounder for your restaurant</div>
          <h1 className="nra-serif nra-headline">
            You run the place.
            <br />
            <em>Let’s talk about the rest.</em>
          </h1>
          <p className="nra-subhead">
            Two minutes — tell your Cofounder about your restaurant. It’s
            already listening.
          </p>
        </div>

        <NraSignup source={source} />

        <footer className="nra-footer">
          BalaBite · NRA Show 2026 · McCormick Place · Booth 8332
        </footer>
      </div>
    </div>
  );
}
