
CREATE TABLE public.lead_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'adhd_hub',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.lead_signups TO anon, authenticated;
GRANT ALL ON public.lead_signups TO service_role;

ALTER TABLE public.lead_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert lead signups"
  ON public.lead_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
