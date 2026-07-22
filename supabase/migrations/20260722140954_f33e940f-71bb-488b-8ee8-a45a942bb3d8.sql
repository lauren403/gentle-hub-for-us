-- Store an internal shared secret in Vault. Both the trigger (below) and the
-- mailerlite-sync Edge Function (via service_role) will read this same value.
DO $$
DECLARE
  v_existing uuid;
BEGIN
  SELECT id INTO v_existing FROM vault.secrets WHERE name = 'mailerlite_webhook_secret';
  IF v_existing IS NULL THEN
    PERFORM vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'hex'),
      'mailerlite_webhook_secret',
      'Shared secret between lead_signups trigger and mailerlite-sync Edge Function'
    );
  END IF;
END $$;

-- Rewrite the trigger function to fetch the secret from Vault at call time.
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
        'created_at', NEW.created_at
      ),
      timeout_milliseconds := 5000
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'forward_lead_signup_to_mailerlite failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

-- Lock down direct execution: only the table owner (running the trigger) can
-- invoke this. Revokes fix the SECURITY DEFINER linter warnings.
REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM anon;
REVOKE ALL ON FUNCTION public.forward_lead_signup_to_mailerlite() FROM authenticated;