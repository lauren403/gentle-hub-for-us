-- Record evidence of express consent for commercial email and prevent
-- anonymous inserts that do not carry the current consent contract.

ALTER TABLE public.lead_signups
  ADD COLUMN IF NOT EXISTS consent_version text,
  ADD COLUMN IF NOT EXISTS consented_at timestamptz;

-- Existing rows pre-date the explicit website checkbox. Do not rewrite them
-- as consented; preserve the uncertainty for audit and suppression decisions.
UPDATE public.lead_signups
SET consent_version = 'legacy_unrecorded'
WHERE consent_version IS NULL;

ALTER TABLE public.lead_signups
  ALTER COLUMN consent_version SET NOT NULL,
  ADD CONSTRAINT lead_signups_consent_version_check
    CHECK (consent_version IN ('hub-updates-v1', 'anchor-updates-v1', 'legacy_unrecorded')),
  ADD CONSTRAINT lead_signups_consent_time_check
    CHECK (
      (consent_version = 'legacy_unrecorded' AND consented_at IS NULL)
      OR
      (consent_version <> 'legacy_unrecorded' AND consented_at IS NOT NULL)
    );

DROP POLICY IF EXISTS "Anyone can insert lead signups" ON public.lead_signups;

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
  );

-- Include the consent evidence in the internal MailerLite webhook.
CREATE OR REPLACE FUNCTION public.forward_lead_signup_to_mailerlite()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, vault
AS $$
DECLARE
  v_url text := 'https://nqtauxdajttaechidyjg.supabase.co/functions/v1/mailerlite-sync';
  v_secret text;
BEGIN
  BEGIN
    SELECT decrypted_secret INTO v_secret
    FROM vault.decrypted_secrets
    WHERE name = 'mailerlite_webhook_secret'
    LIMIT 1;

    IF v_secret IS NULL THEN
      RAISE WARNING 'mailerlite_webhook_secret not found in vault';
      RETURN NEW;
    END IF;

    PERFORM net.http_post(
      url     := v_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', v_secret
      ),
      body    := jsonb_build_object(
        'email', NEW.email,
        'source', NEW.source,
        'id', NEW.id,
        'created_at', NEW.created_at,
        'consent_version', NEW.consent_version,
        'consented_at', NEW.consented_at
      ),
      timeout_milliseconds := 5000
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'forward_lead_signup_to_mailerlite failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM anon;
REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM authenticated;
