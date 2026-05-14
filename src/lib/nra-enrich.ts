import type { NraEnrichment } from './nra-types';

/**
 * Restaurant auto-enrichment from a free, public source (OpenStreetMap /
 * Nominatim). No API key, no paid tier.
 *
 * Precision over recall — by a wide margin. A wrong guess ("an Italian spot
 * in Portland" when they run a taco truck in Cleveland) breaks the whole
 * "the Cofounder noticed you" moment, so this is deliberately strict:
 *
 *   1. Only actual food/drink venues count — never a street, a city, a park.
 *   2. The venue's real name has to genuinely resemble what they typed.
 *   3. If they gave a city, the venue has to be in it.
 *   4. Anything short of a confident match returns `null` — and the signup
 *      proceeds clean. Saying nothing always beats saying something wrong.
 *
 * Hard rule: this NEVER throws to the caller.
 */

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'BalaBite-NRA-LeadCapture/1.0 (https://balabite.ai; hello@balabite.ai)';
const TIMEOUT_MS = 5000;

/** OSM amenity types that are genuinely a restaurant prospect. */
const FOOD_AMENITIES = new Set([
  'restaurant',
  'cafe',
  'fast_food',
  'bar',
  'pub',
  'food_court',
  'biergarten',
  'ice_cream',
]);
/** OSM shop types close enough to count (bakery / deli owners are prospects too). */
const FOOD_SHOPS = new Set(['bakery', 'deli', 'pastry', 'coffee', 'confectionery']);

/** Words that carry no identity — dropped before name comparison. */
const NOISE_WORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'at', 'on', 'in',
  'restaurant', 'restaurants', 'cafe', 'caffe', 'café', 'coffee', 'bar', 'pub',
  'grill', 'grille', 'kitchen', 'eatery', 'bistro', 'diner', 'tavern',
  'ristorante', 'trattoria', 'osteria', 'cantina', 'taqueria', 'pizzeria',
  'co', 'company', 'inc', 'llc', 'ltd', 'group', 'hospitality',
  'bar&grill', 'house', 'room',
]);

interface NominatimResult {
  lat?: string;
  lon?: string;
  display_name?: string;
  name?: string;
  type?: string;
  /** `jsonv2` calls it `category`; older `json` calls it `class`. Handle both. */
  category?: string;
  class?: string;
  importance?: number;
  address?: Record<string, string>;
  namedetails?: Record<string, string> | null;
  extratags?: Record<string, string> | null;
}

/** The OSM top-level group, normalized across Nominatim response formats. */
function venueClass(r: NominatimResult): string | undefined {
  return r.category ?? r.class;
}

/* --------------------------- name matching --------------------------- */

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
function nameSimilarity(typed: string, candidate: string): number {
  const a = normalizeName(typed);
  const b = normalizeName(candidate);
  if (!a.flat || !b.flat) return 0;

  if (a.flat === b.flat) return 1;

  // One name fully contains the other ("Joe's" ⊂ "Joe's Pizza & Pasta").
  if (a.flat.length >= 4 && b.flat.includes(a.flat)) return 0.9;
  if (b.flat.length >= 4 && a.flat.includes(b.flat)) return 0.88;

  // Token overlap (Jaccard), with a small bonus when the rarer/longer
  // distinctive tokens line up.
  const setA = new Set(a.tokens);
  const setB = new Set(b.tokens);
  if (setA.size === 0 || setB.size === 0) return 0;
  let shared = 0;
  for (const t of setA) if (setB.has(t)) shared += 1;
  const jaccard = shared / (setA.size + setB.size - shared);

  // A shared distinctive token (6+ chars) is a strong signal on its own.
  let distinctiveHit = 0;
  for (const t of setA) if (t.length >= 6 && setB.has(t)) distinctiveHit = 0.25;

  return Math.min(1, jaccard + distinctiveHit);
}

/* --------------------------- city matching --------------------------- */

function normalizeCity(raw?: string): string {
  if (!raw) return '';
  return stripDiacritics(raw.toLowerCase())
    .replace(/\b(city|town|saint|st)\b/g, (m) => (m === 'st' ? 'saint' : m))
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cityScore(typedCity: string, addr: Record<string, string>): number {
  const typed = normalizeCity(typedCity);
  if (!typed) return -1; // signal: user gave no city
  const candidates = [
    addr.city, addr.town, addr.village, addr.hamlet,
    addr.municipality, addr.suburb, addr.county,
  ]
    .filter(Boolean)
    .map((c) => normalizeCity(c as string));
  if (candidates.length === 0) return 0;
  for (const c of candidates) {
    if (c === typed) return 1;
    if (c.includes(typed) || typed.includes(c)) return 0.7;
  }
  return 0;
}

/* --------------------------- cuisine labels -------------------------- */

function humanizeCuisine(raw?: string): string | undefined {
  if (!raw) return undefined;
  const first = raw.split(';')[0]?.trim();
  if (!first) return undefined;
  const spaced = first.replace(/_/g, ' ').trim();
  if (!spaced) return undefined;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function categoryLabel(type?: string): string | undefined {
  switch (type) {
    case 'cafe':
    case 'coffee':
      return 'Coffee shop';
    case 'fast_food':
      return 'Quick-service';
    case 'bar':
      return 'Bar';
    case 'pub':
      return 'Pub';
    case 'bakery':
      return 'Bakery';
    case 'pastry':
      return 'Pâtisserie';
    case 'ice_cream':
      return 'Ice cream shop';
    case 'deli':
      return 'Deli';
    case 'biergarten':
      return 'Beer garden';
    default:
      return undefined; // generic restaurant — let the cuisine tag describe it
  }
}

/* --------------------------- candidate eval -------------------------- */

function isFoodVenue(r: NominatimResult): boolean {
  const cls = venueClass(r);
  if (cls === 'amenity' && r.type && FOOD_AMENITIES.has(r.type)) return true;
  if (cls === 'shop' && r.type && FOOD_SHOPS.has(r.type)) return true;
  return false;
}

function candidateName(r: NominatimResult): string {
  return (
    r.namedetails?.name ||
    r.namedetails?.['name:en'] ||
    r.name ||
    r.display_name?.split(',')[0] ||
    ''
  );
}

/* ------------------------------- main -------------------------------- */

export async function enrichRestaurant(
  restaurantName: string,
  city?: string
): Promise<NraEnrichment | null> {
  const name = restaurantName?.trim();
  if (!name || name.length < 2) return null;

  const cityTrimmed = city?.trim();
  const query = cityTrimmed ? `${name}, ${cityTrimmed}` : name;
  const url =
    `${NOMINATIM}?q=${encodeURIComponent(query)}` +
    `&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&limit=20`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const results = (await res.json()) as NominatimResult[];
    if (!Array.isArray(results) || results.length === 0) return null;

    // Only real food/drink venues are ever eligible.
    const venues = results.filter(isFoodVenue);
    if (venues.length === 0) return null;

    const hasCity = Boolean(cityTrimmed);
    let best: { r: NominatimResult; confidence: number; nameScore: number } | null = null;

    for (const r of venues) {
      const nameScore = nameSimilarity(name, candidateName(r));
      if (nameScore < 0.5) continue; // the name has to actually resemble theirs

      const cScore = cityScore(cityTrimmed ?? '', r.address ?? {});
      // City given but the venue is in a different city → not their restaurant.
      if (hasCity && cScore === 0) continue;

      // Weighted confidence. With a city we trust the pair; without one the
      // name has to carry the whole decision.
      const confidence = hasCity
        ? nameScore * 0.62 + Math.max(cScore, 0) * 0.3 + (r.importance ?? 0) * 0.08
        : nameScore * 0.92 + (r.importance ?? 0) * 0.08;

      if (!best || confidence > best.confidence) {
        best = { r, confidence, nameScore };
      }
    }

    if (!best) return null;

    // Final gate: stricter when we had no city to disambiguate with.
    const passes = hasCity
      ? best.confidence >= 0.6 && best.nameScore >= 0.5
      : best.nameScore >= 0.66;
    if (!passes) return null;

    const r = best.r;
    const addr = r.address ?? {};
    const cuisine =
      humanizeCuisine(r.extratags?.cuisine) ?? categoryLabel(r.type);

    const enrichment: NraEnrichment = {
      cuisine,
      category: r.type,
      locality:
        addr.city || addr.town || addr.village || addr.hamlet || addr.suburb,
      region: addr.state || addr.region,
      country: addr.country,
      displayName: r.display_name,
      matchedName: candidateName(r) || undefined,
      lat: r.lat ? Number(r.lat) : undefined,
      lon: r.lon ? Number(r.lon) : undefined,
      matchCount: venues.length,
      source: 'openstreetmap',
    };

    // Must have learned something worth reflecting back.
    const hasSignal =
      enrichment.cuisine || enrichment.locality || enrichment.region;
    return hasSignal ? enrichment : null;
  } catch {
    // Timeout, network error, bad JSON — all degrade to "no enrichment".
    return null;
  } finally {
    clearTimeout(timer);
  }
}
