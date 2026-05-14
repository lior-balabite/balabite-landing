-- ============================================================
-- NRA Show 2026 — Lead Capture
-- Table: public.nra_leads
-- Run this once in the Supabase SQL editor before the show.
-- Namespaced `nra_*` so it never collides with `waitlist` / `guest_waitlist`.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.nra_leads (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Prospect-submitted fields (one-screen signup)
    full_name         TEXT NOT NULL,
    restaurant_name   TEXT NOT NULL,
    role              TEXT,
    email             TEXT NOT NULL,
    phone             TEXT,
    city              TEXT,
    location_count    TEXT,            -- "1", "2-5", "6-20", "20+"

    -- Background restaurant enrichment (degrades gracefully — may be null)
    enrichment        JSONB,           -- { cuisine, locality, region, country, lat, lon, display_name, source }
    enriched_at       TIMESTAMP WITH TIME ZONE,

    -- Light AI fit signal (is this an independent owner/operator = ICP?)
    fit_score         INTEGER,         -- 0-100
    fit_signal        TEXT CHECK (fit_signal IN ('strong', 'medium', 'weak')),
    fit_reason        TEXT,            -- short human-readable rationale

    -- Owner triage (Lior, at the booth / each evening)
    note              TEXT,

    -- Attribution
    source            TEXT NOT NULL DEFAULT 'booth',  -- 'booth' | 'booklet' | other ?src= values
    user_agent        TEXT,

    -- Raw submitted payload, for debugging
    raw               JSONB
);

COMMENT ON TABLE  public.nra_leads                IS 'Restaurant prospects captured at NRA Show 2026 (Booth 8332) via the /nra and /NRA-booklet signup flow.';
COMMENT ON COLUMN public.nra_leads.location_count IS 'Self-reported # of locations bucket: 1 / 2-5 / 6-20 / 20+';
COMMENT ON COLUMN public.nra_leads.enrichment     IS 'Public-source restaurant enrichment (OpenStreetMap). Null when nothing was found — the signup still succeeds.';
COMMENT ON COLUMN public.nra_leads.fit_signal     IS 'ICP read: strong = independent owner/operator, weak = vendor/student/enterprise.';
COMMENT ON COLUMN public.nra_leads.source         IS 'Lead origin: booth QR (booth) vs printed booklet QR (booklet).';

-- Fast sort / filter for the owner list view
CREATE INDEX IF NOT EXISTS nra_leads_created_at_idx  ON public.nra_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS nra_leads_source_idx      ON public.nra_leads (source);
CREATE INDEX IF NOT EXISTS nra_leads_fit_signal_idx  ON public.nra_leads (fit_signal);

-- ------------------------------------------------------------
-- Row Level Security
-- The public signup form never touches this table directly — it
-- POSTs to /api/nra/lead, which writes with the service-role key
-- (service role bypasses RLS). So we enable RLS and grant NO anon
-- policies: the anon key cannot read or write nra_leads at all.
-- ------------------------------------------------------------
ALTER TABLE public.nra_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages nra_leads" ON public.nra_leads;
CREATE POLICY "Service role manages nra_leads"
    ON public.nra_leads
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
