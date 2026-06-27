-- Rate limiting table for public lead endpoints
CREATE TABLE public.rate_limits (
  id BIGSERIAL PRIMARY KEY,
  bucket TEXT NOT NULL,
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX rate_limits_bucket_ip_created_idx
  ON public.rate_limits (bucket, ip, created_at DESC);

-- Service role only — anon/authenticated must not see or write this table
GRANT ALL ON public.rate_limits TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.rate_limits_id_seq TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages rate_limits"
  ON public.rate_limits
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');