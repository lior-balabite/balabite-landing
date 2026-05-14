/**
 * Shared matching helpers for restaurant enrichment — used by both the
 * Google Places and OpenStreetMap sources so they apply the same precision
 * discipline: the venue's name has to genuinely resemble what the prospect
 * typed, and (if given) the city has to line up.
 */

/** Words that carry no identity — dropped before name comparison. */
const NOISE_WORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'at', 'on', 'in',
  'restaurant', 'restaurants', 'cafe', 'caffe', 'café', 'coffee', 'bar', 'pub',
  'grill', 'grille', 'kitchen', 'eatery', 'bistro', 'diner', 'tavern',
  'ristorante', 'trattoria', 'osteria', 'cantina', 'taqueria', 'pizzeria',
  'co', 'company', 'inc', 'llc', 'ltd', 'group', 'hospitality',
  'house', 'room',
]);

function stripDiacritics(s: string): string {
  // Strip Unicode combining diacritical marks (U+0300–U+036F).
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Lowercase, de-accent, drop punctuation; keep the raw spaceless form too. */
function normalizeName(raw: string): { tokens: string[]; flat: string } {
  const cleaned = stripDiacritics(raw.toLowerCase())
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tokens = cleaned.split(' ').filter((t) => t && !NOISE_WORDS.has(t));
  return { tokens, flat: tokens.join('') };
}

/**
 * Similarity between a typed restaurant name and a candidate's real name.
 * 0 = nothing in common, 1 = effectively the same name.
 */
export function nameSimilarity(typed: string, candidate: string): number {
  const a = normalizeName(typed);
  const b = normalizeName(candidate);
  if (!a.flat || !b.flat) return 0;
  if (a.flat === b.flat) return 1;

  // One name fully contains the other ("Joe's" ⊂ "Joe's Pizza & Pasta").
  if (a.flat.length >= 4 && b.flat.includes(a.flat)) return 0.9;
  if (b.flat.length >= 4 && a.flat.includes(b.flat)) return 0.88;

  // Token overlap (Jaccard), plus a bonus when a long distinctive token lines up.
  const setA = new Set(a.tokens);
  const setB = new Set(b.tokens);
  if (setA.size === 0 || setB.size === 0) return 0;
  let shared = 0;
  for (const t of setA) if (setB.has(t)) shared += 1;
  const jaccard = shared / (setA.size + setB.size - shared);
  let distinctiveHit = 0;
  for (const t of setA) if (t.length >= 6 && setB.has(t)) distinctiveHit = 0.25;
  return Math.min(1, jaccard + distinctiveHit);
}

export function normalizeCity(raw?: string): string {
  if (!raw) return '';
  return stripDiacritics(raw.toLowerCase())
    .replace(/\b(city|town|saint|st)\b/g, (m) => (m === 'st' ? 'saint' : m))
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * How well a typed city matches a set of candidate city strings.
 * Returns -1 when the prospect gave no city (so callers can skip the gate).
 */
export function cityScore(typedCity: string, candidateCities: (string | undefined)[]): number {
  const typed = normalizeCity(typedCity);
  if (!typed) return -1;
  const cands = candidateCities.filter(Boolean).map((c) => normalizeCity(c as string));
  if (cands.length === 0) return 0;
  for (const c of cands) {
    if (c === typed) return 1;
    if (c && (c.includes(typed) || typed.includes(c))) return 0.7;
  }
  return 0;
}
