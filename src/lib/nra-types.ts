/** Shared types for the NRA Show 2026 lead-capture system. */

/** # of locations buckets — must match the SQL CHECK-free `location_count` text values. */
export const LOCATION_BUCKETS = ['1', '2-5', '6-20', '20+'] as const;
export type LocationBucket = (typeof LOCATION_BUCKETS)[number];

/** Lead origin — drives the `?src=` attribution. */
export type LeadSource = 'booth' | 'booklet';

/** Public-source restaurant enrichment. Every field optional — enrichment degrades gracefully. */
export interface NraEnrichment {
  /** Cuisine / kind of place, human-readable, e.g. "Italian", "Coffee shop". */
  cuisine?: string;
  /** OSM category: restaurant | cafe | fast_food | bar | pub | ... */
  category?: string;
  /** City / town. */
  locality?: string;
  /** State / region. */
  region?: string;
  country?: string;
  /** Full formatted name / address returned by the source. */
  displayName?: string;
  /** The venue's actual name as matched — lets the owner sanity-check the match. */
  matchedName?: string;
  lat?: number;
  lon?: number;
  /** How many food/drink venues the source returned for the query. */
  matchCount?: number;

  /* --- Richer signal (Google Places only; absent on the OSM fallback) --- */
  /** Google's curated one-line description of the place. */
  editorialSummary?: string;
  /** Average rating, 0–5. */
  rating?: number;
  /** Number of ratings behind `rating`. */
  reviewCount?: number;
  /** Price level normalized to "$"–"$$$$". */
  priceLevel?: string;
  /** The restaurant's own website. */
  website?: string;
  phone?: string;
  /** Human-readable service traits: "brunch", "cocktails", "outdoor seating", … */
  traits?: string[];
  /** "operational" | "closed_temporarily" | "closed_permanently". */
  businessStatus?: string;
  /** Same-brand venues found in the prospect's metro — a soft multi-location hint. */
  siblingLocations?: number;

  /** Which source produced this match. */
  source: 'openstreetmap' | 'google';
}

/** Fields the prospect submits from the one-screen signup form. */
export interface NraLeadInput {
  fullName: string;
  restaurantName: string;
  role: string;
  email: string;
  phone?: string;
  city?: string;
  locationCount?: LocationBucket;
  source: LeadSource;
  /** Enrichment the client already resolved (so we don't re-fetch on submit). */
  enrichment?: NraEnrichment | null;
}

/** Light AI fit signal — is this an independent owner/operator (our ICP)? */
export interface NraFitScore {
  /** 0-100. */
  score: number;
  signal: 'strong' | 'medium' | 'weak';
  /** Short human-readable rationale for the owner list. */
  reason: string;
}

/** A row of `public.nra_leads` as read back for the owner list view. */
export interface NraLeadRow {
  id: string;
  created_at: string;
  full_name: string;
  restaurant_name: string;
  role: string | null;
  email: string;
  phone: string | null;
  city: string | null;
  location_count: string | null;
  enrichment: NraEnrichment | null;
  enriched_at: string | null;
  fit_score: number | null;
  fit_signal: 'strong' | 'medium' | 'weak' | null;
  fit_reason: string | null;
  note: string | null;
  source: string;
  user_agent: string | null;
}
