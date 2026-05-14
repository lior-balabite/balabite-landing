import type { NraEnrichment } from './nra-types';
import { nameSimilarity, cityScore } from './nra-enrich-match';

/**
 * Restaurant enrichment via the Google Places API (New) — Text Search.
 *
 * Primary source when `GOOGLE_PLACES_API_KEY` is set. Google's restaurant
 * coverage is effectively complete, and one Text Search call also carries
 * the rich signal — editorial summary, rating, website, service traits —
 * so the "your Cofounder noticed you" moment can be specific without a
 * second request.
 *
 * Still runs the same precision gates as the OSM path (name + city must
 * genuinely match). Hard rule: never throws — any failure returns `null`
 * and the caller falls back to OpenStreetMap.
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
  // richer signal — same call, no extra latency
  'places.editorialSummary',
  'places.rating',
  'places.userRatingCount',
  'places.priceLevel',
  'places.websiteUri',
  'places.nationalPhoneNumber',
  'places.businessStatus',
  'places.servesBrunch',
  'places.servesCocktails',
  'places.servesVegetarianFood',
  'places.takeout',
  'places.delivery',
  'places.reservable',
  'places.outdoorSeating',
  'places.goodForGroups',
  'places.liveMusic',
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
  editorialSummary?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  businessStatus?: string;
  servesBrunch?: boolean;
  servesCocktails?: boolean;
  servesVegetarianFood?: boolean;
  takeout?: boolean;
  delivery?: boolean;
  reservable?: boolean;
  outdoorSeating?: boolean;
  goodForGroups?: boolean;
  liveMusic?: boolean;
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
    if (lower === 'restaurant') return undefined;
    if (lower === 'fast food restaurant') return 'Quick-service';
    if (lower === 'cafe' || lower === 'café' || lower === 'coffee shop')
      return 'Coffee shop';
    const stripped = display.replace(/\s+restaurant$/i, '').trim();
    return stripped || undefined;
  }
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

function priceLabel(level?: string): string | undefined {
  switch (level) {
    case 'PRICE_LEVEL_FREE':
    case 'PRICE_LEVEL_INEXPENSIVE':
      return '$';
    case 'PRICE_LEVEL_MODERATE':
      return '$$';
    case 'PRICE_LEVEL_EXPENSIVE':
      return '$$$';
    case 'PRICE_LEVEL_VERY_EXPENSIVE':
      return '$$$$';
    default:
      return undefined;
  }
}

/** Collect the human-readable service traits, most useful first, capped at 6. */
function collectTraits(p: GooglePlace): string[] {
  const traits: string[] = [];
  if (p.servesCocktails) traits.push('cocktails');
  if (p.servesBrunch) traits.push('brunch');
  if (p.outdoorSeating) traits.push('outdoor seating');
  if (p.liveMusic) traits.push('live music');
  if (p.goodForGroups) traits.push('good for groups');
  if (p.reservable) traits.push('takes reservations');
  if (p.servesVegetarianFood) traits.push('vegetarian-friendly');
  if (p.takeout) traits.push('takeout');
  if (p.delivery) traits.push('delivery');
  return traits.slice(0, 6);
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

    // Soft multi-location hint: same-brand venues among the results we already
    // have (no extra call; the city scope keeps generic-name noise down).
    const siblingLocations = venues.filter(
      (v) => nameSimilarity(name, v.displayName?.text ?? '') >= 0.85
    ).length;

    const locality =
      component(p, 'locality')?.longText ??
      component(p, 'postal_town')?.longText ??
      component(p, 'sublocality')?.longText;
    const region = component(p, 'administrative_area_level_1')?.longText;
    const country = component(p, 'country')?.longText;
    const traits = collectTraits(p);

    const enrichment: NraEnrichment = {
      cuisine: deriveCuisine(p),
      category: p.primaryType,
      locality,
      region,
      country,
      displayName: p.formattedAddress,
      matchedName: p.displayName?.text || undefined,
      lat: p.location?.latitude,
      lon: p.location?.longitude,
      matchCount: venues.length,
      editorialSummary: p.editorialSummary?.text || undefined,
      rating: typeof p.rating === 'number' ? p.rating : undefined,
      reviewCount:
        typeof p.userRatingCount === 'number' ? p.userRatingCount : undefined,
      priceLevel: priceLabel(p.priceLevel),
      website: p.websiteUri || undefined,
      phone: p.nationalPhoneNumber || undefined,
      traits: traits.length ? traits : undefined,
      businessStatus: p.businessStatus
        ? p.businessStatus.toLowerCase()
        : undefined,
      siblingLocations: siblingLocations > 1 ? siblingLocations : undefined,
      source: 'google',
    };

    const hasSignal =
      enrichment.cuisine ||
      enrichment.locality ||
      enrichment.region ||
      enrichment.editorialSummary;
    return hasSignal ? enrichment : null;
  } catch {
    return null; // timeout / network / bad JSON → fall back to OSM
  } finally {
    clearTimeout(timer);
  }
}
