CREATE TABLE public.asset_error_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_key text NOT NULL UNIQUE,
  alert_type text NOT NULL,
  asset_url text,
  notified_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_asset_error_alerts_notified_at ON public.asset_error_alerts(notified_at DESC);

GRANT SELECT ON public.asset_error_alerts TO authenticated;
GRANT ALL ON public.asset_error_alerts TO service_role;

ALTER TABLE public.asset_error_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read alerts"
ON public.asset_error_alerts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages alerts"
ON public.asset_error_alerts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);