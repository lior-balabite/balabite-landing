/**
 * Single source of truth for Lior's contact details.
 * Consumed by the /connect card and the /connect/vcard handler so the
 * page and the downloadable vCard can never drift apart.
 *
 * Decided 2026-05-14 (see docs/briefs/tab-Connect-Card.md):
 *  - No phone number on the card — email + LinkedIn only.
 *  - LinkedIn slug confirmed by Lior.
 *  - Tagline locked: Cofounder-framed, no model/implementation leakage.
 */
export const CONTACT = {
  firstName: 'Lior',
  lastName: 'Brik',
  fullName: 'Lior Brik',
  title: 'Founder',
  org: 'BalaBite',
  email: 'lior@balabite.ai',
  site: 'https://balabite.ai',
  siteLabel: 'balabite.ai',
  linkedin: 'https://www.linkedin.com/in/lior-brik',
  linkedinLabel: 'linkedin.com/in/lior-brik',
  tagline: 'Building the AI Cofounder for restaurants',
} as const;
