CREATE TABLE public.asset_error_check_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ran_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  total_last_24h INTEGER NOT NULL DEFAULT 0,
  new_urls_count INTEGER NOT NULL DEFAULT 0,
  new_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  alerts_sent TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  triggered_by TEXT NOT NULL DEFAULT 'cron',
  duration_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'ok',
  error_message TEXT
);

CREATE INDEX idx_asset_error_check_runs_ran_at ON public.asset_error_check_runs (ran_at DESC);

GRANT SELECT ON public.asset_error_check_runs TO authenticated;
GRANT ALL ON public.asset_error_check_runs TO service_role;

ALTER TABLE public.asset_error_check_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view check runs"
  ON public.asset_error_check_runs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages check runs"
  ON public.asset_error_check_runs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);