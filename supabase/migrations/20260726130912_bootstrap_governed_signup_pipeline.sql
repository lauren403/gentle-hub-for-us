-- Final, idempotent signup schema for the connected BBC ADHD Hub project.
-- This migration can safely repair an existing Lovable-era database or
-- bootstrap the newly connected Supabase project from an empty state.
-- Its version matches the migration already applied to the connected project;
-- retired Lovable-project migrations remain recoverable in Git history.

CREATE TABLE IF NOT EXISTS public.lead_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'adhd_hub',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_signups
  ADD COLUMN IF NOT EXISTS consent_version text,
  ADD COLUMN IF NOT EXISTS consented_at timestamptz,
  ADD COLUMN IF NOT EXISTS sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS sync_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS sync_error text;

-- Do not silently convert pre-consent records into marketing consent.
UPDATE public.lead_signups
SET consent_version = 'legacy_unrecorded'
WHERE consent_version IS NULL;

ALTER TABLE public.lead_signups
  ALTER COLUMN consent_version SET NOT NULL,
  DROP CONSTRAINT IF EXISTS lead_signups_consent_version_check,
  DROP CONSTRAINT IF EXISTS lead_signups_consent_time_check,
  DROP CONSTRAINT IF EXISTS lead_signups_sync_status_check;

ALTER TABLE public.lead_signups
  ADD CONSTRAINT lead_signups_consent_version_check
    CHECK (consent_version IN ('hub-updates-v1', 'anchor-updates-v1', 'legacy_unrecorded')),
  ADD CONSTRAINT lead_signups_consent_time_check
    CHECK (
      (consent_version = 'legacy_unrecorded' AND consented_at IS NULL)
      OR
      (consent_version <> 'legacy_unrecorded' AND consented_at IS NOT NULL)
    ),
  ADD CONSTRAINT lead_signups_sync_status_check
    CHECK (sync_status IN ('pending', 'synced', 'failed', 'paused_no_api_key'));

ALTER TABLE public.lead_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert lead signups" ON public.lead_signups;
DROP POLICY IF EXISTS "Consent-gated lead signup insert" ON public.lead_signups;

-- Public visitors may submit a current, time-bound consent record only.
CREATE POLICY "Consent-gated lead signup insert"
  ON public.lead_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_version IN ('hub-updates-v1', 'anchor-updates-v1')
    AND consented_at IS NOT NULL
    AND consented_at <= now() + interval '5 minutes'
    AND consented_at >= now() - interval '1 day'
    AND source IN ('adhd_hub', 'anchor_waitlist')
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    AND sync_status = 'pending'
    AND sync_last_attempt_at IS NULL
    AND sync_error IS NULL
  );

-- No public read, update or delete access. The service role remains the only
-- application role able to administer or synchronise signup records.
REVOKE ALL ON TABLE public.lead_signups FROM anon, authenticated;
GRANT INSERT ON TABLE public.lead_signups TO anon, authenticated;
GRANT ALL ON TABLE public.lead_signups TO service_role;

CREATE INDEX IF NOT EXISTS lead_signups_created_at_idx
  ON public.lead_signups (created_at DESC);
CREATE INDEX IF NOT EXISTS lead_signups_sync_status_idx
  ON public.lead_signups (sync_status, created_at)
  WHERE sync_status <> 'synced';

-- Outbound email sync is deliberately off at launch. Consent may be recorded,
-- but no address leaves Supabase/Netlify until the email vendor, unsubscribe
-- and data-processing gates are separately approved and tested.
DROP TRIGGER IF EXISTS lead_signups_mailerlite_sync ON public.lead_signups;
DROP FUNCTION IF EXISTS public.forward_lead_signup_to_mailerlite();
DROP FUNCTION IF EXISTS public.get_mailerlite_webhook_secret();
