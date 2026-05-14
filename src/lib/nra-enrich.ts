import type { NraEnrichment } from './nra-types';
import { nameSimilarity, cityScore } from './nra-enrich-match';
import { enrichViaGoogle } from './nra-enrich-google';

/**
 * Restaurant auto-enrichment — the orchestrator.
 *
 *   enrichRestaurant() → Google Places (if a key is configured) → OpenStreetMap
 *
 * Google has near-complete restaurant coverage; OSM is the free fallback
 * that needs no key. Either way the matching is precision-first: a wrong
 * guess breaks the "your Cofounder noticed you" moment, so anything short
 * of a confident match returns `null` and the signup proceeds clean.
 *
 * Hard rule: this NEVER throws to the caller.
 */

/* ===================================================================== */
/* OpenStreetMap / Nominatim source (free, no key — the fallback)         */
/* ===================================================================== */

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'BalaBite-NRA-LeadCapture/1.0 (https://balabite.ai; hello@balabite.ai)';
const OSM_TIMEOUT_MS = 5000;

/** OSM amenity types that are genuinely a restaurant prospect. */
const FOOD_AMENITIES = new Set([
  'restaurant', 'cafe', 'fast_food', 'bar', 'pub',
  'food_court', 'biergarten', 'ice_cream',
]);
/** OSM shop types close enough to count (bakery / deli owners are prospects too). */
const FOOD_SHOPS = new Set(['bakery', 'deli', 'pastry', 'coffee', 'confectionery']);

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

async function enrichViaOsm(
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
  const timer = setTimeout(() => controller.abort(), OSM_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const results = (await res.json()) as NominatimResult[];
    if (!Array.isArray(results) || results.length === 0) return null;

    const venues = results.filter(isFoodVenue);
    if (venues.length === 0) return null;

    const hasCity = Boolean(cityTrimmed);
    let best: { r: NominatimResult; confidence: number; nameScore: number } | null = null;

    for (const r of venues) {
      const nameScore = nameSimilarity(name, candidateName(r));
      if (nameScore < 0.5) continue;

      const addr = r.address ?? {};
      const cScore = cityScore(cityTrimmed ?? '', [
        addr.city, addr.town, addr.village, addr.hamlet,
        addr.municipality, addr.suburb, addr.county,
      ]);
      if (hasCity && cScore === 0) continue;

      const confidence = hasCity
        ? nameScore * 0.62 + Math.max(cScore, 0) * 0.3 + (r.importance ?? 0) * 0.08
        : nameScore * 0.92 + (r.importance ?? 0) * 0.08;

      if (!best || confidence > best.confidence) {
        best = { r, confidence, nameScore };
      }
    }

    if (!best) return null;
    const passes = hasCity
      ? best.confidence >= 0.6 && best.nameScore >= 0.5
      : best.nameScore >= 0.66;
    if (!passes) return null;

    const r = best.r;
    const addr = r.address ?? {};
    const cuisine = humanizeCuisine(r.extratags?.cuisine) ?? categoryLabel(r.type);

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

    const hasSignal =
      enrichment.cuisine || enrichment.locality || enrichment.region;
    return hasSignal ? enrichment : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ===================================================================== */
/* Orchestrator                                                           */
/* ===================================================================== */

export async function enrichRestaurant(
  restaurantName: string,
  city?: string
): Promise<NraEnrichment | null> {
  const name = restaurantName?.trim();
  if (!name || name.length < 2) return null;

  // Primary: Google Places — only does anything when GOOGLE_PLACES_API_KEY
  // is set, and it never throws.
  const viaGoogle = await enrichViaGoogle(name, city);
  if (viaGoogle) return viaGoogle;

  // Fallback: OpenStreetMap. Runs when Google has no key, errored, or simply
  // didn't find a confident match.
  return enrichViaOsm(name, city);
}
