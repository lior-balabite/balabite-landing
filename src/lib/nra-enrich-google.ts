import type { NraEnrichment } from './nra-types';
import { nameSimilarity, cityScore } from './nra-enrich-match';

/**
 * Restaurant enrichment via the Google Places API (New) — Text Search.
 *
 * Google's restaurant coverage is effectively complete, so this is the
 * primary source when `GOOGLE_PLACES_API_KEY` is set. It still runs the
 * same precision gates as the OSM path (name + city must genuinely match)
 * — Google ranks well, but a loose text query can still surface the wrong
 * place, and a wrong guess breaks the "your Cofounder noticed you" moment.
 *
 * Hard rule: never throws. Any failure (no key, quota, network, no match)
 * returns `null`, and the caller falls back to OpenStreetMap.
 */

const ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';
const TIMEOUT_MS = 4500;

const FIELD_MASK = [
  'places.displayName',
  'places.formattedAddress',
  'places.types',
  'places.primaryType',
  'places.primaryTypeDisplayName',
  'places.location',
  'places.addressComponents',
].join(',');

/** Google place types that mean "this is a food/drink venue". */
const FOOD_TYPES = new Set([
  'restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway', 'meal_delivery',
  'coffee_shop', 'fast_food_restaurant', 'pub', 'food_court', 'ice_cream_shop',
  'sandwich_shop', 'deli', 'food', 'bar_and_grill', 'wine_bar',
]);

interface GoogleLocalizedText {
  text?: string;
  languageCode?: string;
}
interface GoogleAddressComponent {
  longText?: string;
  shortText?: string;
  types?: string[];
}
interface GooglePlace {
  displayName?: GoogleLocalizedText;
  formattedAddress?: string;
  types?: string[];
  primaryType?: string;
  primaryTypeDisplayName?: GoogleLocalizedText;
  location?: { latitude?: number; longitude?: number };
  addressComponents?: GoogleAddressComponent[];
}

function isFoodVenue(place: GooglePlace): boolean {
  const types = place.types ?? [];
  if (types.some((t) => FOOD_TYPES.has(t))) return true;
  if (place.primaryType && /_restaurant$|^restaurant$/.test(place.primaryType)) return true;
  return false;
}

function component(
  place: GooglePlace,
  type: string
): GoogleAddressComponent | undefined {
  return place.addressComponents?.find((c) => c.types?.includes(type));
}

/** Derive a human cuisine/venue label from Google's primary-type metadata. */
function deriveCuisine(place: GooglePlace): string | undefined {
  const display = place.primaryTypeDisplayName?.text?.trim();
  if (display) {
    const lower = display.toLowerCase();
    if (lower === 'restaurant') return undefined; // generic — say nothing specific
    if (lower === 'fast food restaurant') return 'Quick-service';
    if (lower === 'cafe' || lower === 'café' || lower === 'coffee shop')
      return 'Coffee shop';
    // "Italian restaurant" -> "Italian"; "Bakery"/"Bar"/"Pub" stay as-is.
    const stripped = display.replace(/\s+restaurant$/i, '').trim();
    return stripped || undefined;
  }
  // Fallback: derive from the machine primaryType.
  const pt = place.primaryType;
  if (!pt) return undefined;
  if (pt === 'cafe' || pt === 'coffee_shop') return 'Coffee shop';
  if (pt === 'fast_food_restaurant' || pt === 'meal_takeaway') return 'Quick-service';
  if (pt === 'bakery') return 'Bakery';
  if (pt === 'bar' || pt === 'wine_bar' || pt === 'bar_and_grill') return 'Bar';
  if (pt === 'pub') return 'Pub';
  if (pt === 'ice_cream_shop') return 'Ice cream shop';
  if (pt.endsWith('_restaurant')) {
    const word = pt.replace(/_restaurant$/, '').replace(/_/g, ' ');
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : undefined;
  }
  return undefined;
}

export async function enrichViaGoogle(
  restaurantName: string,
  city?: string
): Promise<NraEnrichment | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null; // not configured — caller falls back to OSM

  const name = restaurantName?.trim();
  if (!name || name.length < 2) return null;
  const cityTrimmed = city?.trim();
  const hasCity = Boolean(cityTrimmed);
  const textQuery = cityTrimmed ? `${name}, ${cityTrimmed}` : name;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery,
        maxResultCount: 10,
        languageCode: 'en',
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { places?: GooglePlace[] };
    const places = data.places ?? [];
    if (places.length === 0) return null;

    const venues = places.filter(isFoodVenue);
    if (venues.length === 0) return null;

    let best: { p: GooglePlace; confidence: number; nameScore: number } | null = null;

    for (let index = 0; index < venues.length; index++) {
      const p = venues[index];
      const candidate = p.displayName?.text ?? '';
      const nameScore = nameSimilarity(name, candidate);
      if (nameScore < 0.5) continue;

      const locality =
        component(p, 'locality')?.longText ??
        component(p, 'postal_town')?.longText ??
        component(p, 'sublocality')?.longText;
      const adminArea = component(p, 'administrative_area_level_2')?.longText;
      const cScore = cityScore(cityTrimmed ?? '', [locality, adminArea]);
      if (hasCity && cScore === 0) continue; // wrong city — not their restaurant

      // Google returns results in relevance order — a small position bonus.
      const positionBonus = Math.max(0, 0.08 - index * 0.015);
      const confidence = hasCity
        ? nameScore * 0.6 + Math.max(cScore, 0) * 0.34 + positionBonus
        : nameScore * 0.92 + positionBonus;

      if (!best || confidence > best.confidence) {
        best = { p, confidence, nameScore };
      }
    }

    if (!best) return null;
    const { p, confidence, nameScore } = best;
    const passes = hasCity
      ? confidence >= 0.6 && nameScore >= 0.5
      : nameScore >= 0.66;
    if (!passes) return null;

    const locality =
      component(p, 'locality')?.longText ??
      component(p, 'postal_town')?.longText ??
      component(p, 'sublocality')?.longText;
    const region = component(p, 'administrative_area_level_1')?.longText;
    const country = component(p, 'country')?.longText;
    const cuisine = deriveCuisine(p);

    const enrichment: NraEnrichment = {
      cuisine,
      category: p.primaryType,
      locality,
      region,
      country,
      displayName: p.formattedAddress,
      matchedName: p.displayName?.text || undefined,
      lat: p.location?.latitude,
      lon: p.location?.longitude,
      matchCount: venues.length,
      source: 'google',
    };

    const hasSignal = enrichment.cuisine || enrichment.locality || enrichment.region;
    return hasSignal ? enrichment : null;
  } catch {
    return null; // timeout / network / bad JSON → fall back to OSM
  } finally {
    clearTimeout(timer);
  }
}
