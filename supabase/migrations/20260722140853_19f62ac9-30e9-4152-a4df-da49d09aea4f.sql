-- Ensure pg_net is available for background HTTP calls from Postgres.
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: forward every new lead_signups row to the mailerlite-sync
-- Edge Function. Fail-safe: any error is caught so it never blocks the INSERT.
CREATE OR REPLACE FUNCTION public.forward_lead_signup_to_mailerlite()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_url text := 'https://nqtauxdajttaechidyjg.supabase.co/functions/v1/mailerlite-sync';
  v_secret text := 'REPLACE_ME_WEBHOOK_SECRET';
BEGIN
  BEGIN
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

DROP TRIGGER IF EXISTS lead_signups_mailerlite_sync ON public.lead_signups;
CREATE TRIGGER lead_signups_mailerlite_sync
AFTER INSERT ON public.lead_signups
FOR EACH ROW
EXECUTE FUNCTION public.forward_lead_signup_to_mailerlite();