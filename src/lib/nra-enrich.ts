import type { NraEnrichment } from './nra-types';

/**
 * Restaurant auto-enrichment from a free, public source (OpenStreetMap /
 * Nominatim). No API key, no paid tier.
 *
 * Hard rule: this NEVER throws to the caller. Anything goes wrong — timeout,
 * rate limit, no match, malformed response — and it returns `null`. The signup
 * must always submit clean whether enrichment found something or not.
 */

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
// Nominatim's usage policy asks for an identifying User-Agent + contact.
const USER_AGENT = 'BalaBite-NRA-LeadCapture/1.0 (https://balabite.ai; hello@balabite.ai)';
const TIMEOUT_MS = 4500;

const FOOD_TYPES = new Set([
  'restaurant',
  'cafe',
  'fast_food',
  'bar',
  'pub',
  'food_court',
  'biergarten',
  'ice_cream',
  'bakery',
  'deli',
]);

interface NominatimResult {
  lat?: string;
  lon?: string;
  display_name?: string;
  type?: string;
  class?: string;
  address?: Record<string, string>;
  extratags?: Record<string, string> | null;
}

/** Humanize an OSM `cuisine` tag: "coffee_shop;italian" -> "Coffee shop". */
function humanizeCuisine(raw?: string): string | undefined {
  if (!raw) return undefined;
  const first = raw.split(';')[0]?.trim();
  if (!first) return undefined;
  const spaced = first.replace(/_/g, ' ').trim();
  if (!spaced) return undefined;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Friendly label for an OSM amenity type when there's no cuisine tag. */
function categoryLabel(type?: string): string | undefined {
  switch (type) {
    case 'cafe':
      return 'Coffee shop';
    case 'fast_food':
      return 'Quick-service';
    case 'bar':
      return 'Bar';
    case 'pub':
      return 'Pub';
    case 'bakery':
      return 'Bakery';
    case 'ice_cream':
      return 'Ice cream shop';
    case 'deli':
      return 'Deli';
    case 'restaurant':
      return undefined; // generic — let cuisine carry the description
    default:
      return undefined;
  }
}

export async function enrichRestaurant(
  restaurantName: string,
  city?: string
): Promise<NraEnrichment | null> {
  const name = restaurantName?.trim();
  if (!name || name.length < 2) return null;

  const query = city?.trim() ? `${name}, ${city.trim()}` : name;
  const url =
    `${NOMINATIM}?q=${encodeURIComponent(query)}` +
    `&format=jsonv2&addressdetails=1&extratags=1&limit=5`;

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

    // Prefer an actual food/drink venue; fall back to the first result.
    const foodMatches = results.filter(
      (r) => r.class === 'amenity' && r.type && FOOD_TYPES.has(r.type)
    );
    const best = foodMatches[0] ?? results[0];
    if (!best) return null;

    const addr = best.address ?? {};
    const cuisine =
      humanizeCuisine(best.extratags?.cuisine) ?? categoryLabel(best.type);

    const enrichment: NraEnrichment = {
      cuisine,
      category: best.type,
      locality:
        addr.city || addr.town || addr.village || addr.hamlet || addr.suburb,
      region: addr.state || addr.region,
      country: addr.country,
      displayName: best.display_name,
      lat: best.lat ? Number(best.lat) : undefined,
      lon: best.lon ? Number(best.lon) : undefined,
      matchCount: foodMatches.length || results.length,
      source: 'openstreetmap',
    };

    // If we genuinely learned nothing useful, treat it as no match.
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
