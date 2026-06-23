CREATE TABLE public.asset_errors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_url text NOT NULL,
  page_url text,
  user_agent text,
  status integer,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_asset_errors_created_at ON public.asset_errors(created_at DESC);
CREATE INDEX idx_asset_errors_asset_url ON public.asset_errors(asset_url);

GRANT SELECT ON public.asset_errors TO authenticated;
GRANT ALL ON public.asset_errors TO service_role;

ALTER TABLE public.asset_errors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view asset errors"
ON public.asset_errors
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages asset errors"
ON public.asset_errors
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);