import type { NraEnrichment, NraFitScore, NraLeadInput } from './nra-types';

/**
 * Light, explainable ICP fit signal for a captured lead.
 *
 * ICP = an independent restaurant owner / operator who can say yes to a pilot.
 * Anti-ICP = vendors, students, press, and large enterprise chains (long cycle).
 *
 * Deliberately a transparent heuristic, not a black box — `reason` always
 * explains the score so Lior can trust (or override) it at the booth.
 */

const OWNER_ROLE = /\b(owner|founder|proprietor|principal|partner)\b/i;
const OPERATOR_ROLE = /\b(operator|gm|general manager|managing|director of ops|coo|ceo)\b/i;
const KITCHEN_ROLE = /\b(chef|kitchen|culinary|f&b|food and beverage)\b/i;
const FRONTLINE_ROLE = /\b(manager|management|hospitality|service)\b/i;
const ANTI_ROLE =
  /\b(student|professor|teacher|intern|press|media|journalist|reporter|vendor|supplier|sales|account exec|consultant|investor|recruiter|distributor|broker)\b/i;

const FREE_EMAIL =
  /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|protonmail|gmx|me|msn)\./i;

function normalizeDomainStem(restaurantName: string): string {
  return restaurantName
    .toLowerCase()
    .replace(/\b(the|restaurant|cafe|café|bar|grill|kitchen|co|inc|llc|group|hospitality)\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function scoreLead(
  input: Pick<NraLeadInput, 'role' | 'email' | 'restaurantName' | 'locationCount'>,
  enrichment?: NraEnrichment | null
): NraFitScore {
  let score = 50; // neutral baseline
  const reasons: string[] = [];

  // --- Role: the strongest single signal ---
  const role = input.role || '';
  if (ANTI_ROLE.test(role)) {
    score -= 35;
    reasons.push('role reads as vendor / student / non-operator');
  } else if (OWNER_ROLE.test(role)) {
    score += 28;
    reasons.push('owner / founder');
  } else if (OPERATOR_ROLE.test(role)) {
    score += 22;
    reasons.push('operator / GM-level');
  } else if (KITCHEN_ROLE.test(role)) {
    score += 12;
    reasons.push('kitchen leadership');
  } else if (FRONTLINE_ROLE.test(role)) {
    score += 6;
    reasons.push('restaurant management');
  } else if (role.trim()) {
    reasons.push(`role: "${role.trim()}"`);
  }

  // --- # of locations: 1-5 is the pilot sweet spot ---
  switch (input.locationCount) {
    case '1':
      score += 14;
      reasons.push('single independent location');
      break;
    case '2-5':
      score += 18;
      reasons.push('2-5 locations — pilot sweet spot');
      break;
    case '6-20':
      score += 6;
      reasons.push('6-20 locations — small group');
      break;
    case '20+':
      score -= 12;
      reasons.push('20+ locations — enterprise, longer cycle');
      break;
  }

  // --- Email domain ---
  const email = (input.email || '').toLowerCase();
  if (/@.+\.edu(\.|$)/.test(email)) {
    score -= 25;
    reasons.push('.edu address — likely student / academic');
  } else if (FREE_EMAIL.test(email)) {
    // Very common for genuine independent operators — mild, not a penalty.
    reasons.push('personal email domain');
  } else if (email.includes('@')) {
    const domain = email.split('@')[1]?.split('.')[0] ?? '';
    const stem = normalizeDomainStem(input.restaurantName);
    if (stem && domain && (domain.includes(stem) || stem.includes(domain))) {
      score += 12;
      reasons.push('email domain matches the restaurant — real operator');
    } else {
      score += 4;
      reasons.push('business email domain');
    }
  }

  // --- Enrichment: a public match confirms a real, operating restaurant ---
  if (enrichment) {
    score += 10;
    reasons.push('restaurant found in public listings');
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const signal: NraFitScore['signal'] =
    score >= 68 ? 'strong' : score >= 42 ? 'medium' : 'weak';

  return {
    score,
    signal,
    reason: reasons.length ? reasons.join('; ') : 'no strong signals either way',
  };
}
