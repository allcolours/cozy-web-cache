
CREATE OR REPLACE FUNCTION public.admin_db_size()
RETURNS TABLE(size_bytes bigint, size_pretty text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  RETURN QUERY SELECT pg_database_size(current_database())::bigint,
                      pg_size_pretty(pg_database_size(current_database()));
END $$;

CREATE OR REPLACE FUNCTION public.admin_top_tables(limit_count int DEFAULT 15)
RETURNS TABLE(schema_name text, table_name text, size_bytes bigint, size_pretty text, row_est bigint)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  RETURN QUERY
    SELECT n.nspname::text, c.relname::text,
           pg_total_relation_size(c.oid)::bigint,
           pg_size_pretty(pg_total_relation_size(c.oid)),
           c.reltuples::bigint
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind = 'r'
      AND n.nspname NOT IN ('pg_toast','information_schema')
    ORDER BY pg_total_relation_size(c.oid) DESC
    LIMIT limit_count;
END $$;

CREATE OR REPLACE FUNCTION public.admin_cron_jobs()
RETURNS TABLE(
  jobid bigint, jobname text, schedule text, active boolean, command text,
  last_start timestamptz, last_end timestamptz, last_status text,
  runs_24h bigint, failures_24h bigint
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  RETURN QUERY
    SELECT j.jobid, j.jobname::text, j.schedule::text, j.active, j.command::text,
           lr.start_time, lr.end_time, lr.status::text,
           COALESCE(agg.runs_24h, 0), COALESCE(agg.failures_24h, 0)
    FROM cron.job j
    LEFT JOIN LATERAL (
      SELECT start_time, end_time, status
      FROM cron.job_run_details d
      WHERE d.jobid = j.jobid
      ORDER BY start_time DESC NULLS LAST
      LIMIT 1
    ) lr ON true
    LEFT JOIN LATERAL (
      SELECT count(*) AS runs_24h,
             count(*) FILTER (WHERE status <> 'succeeded') AS failures_24h
      FROM cron.job_run_details d
      WHERE d.jobid = j.jobid
        AND d.start_time > now() - interval '24 hours'
    ) agg ON true
    ORDER BY j.jobid;
END $$;

REVOKE ALL ON FUNCTION public.admin_db_size() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_top_tables(int) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_cron_jobs() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_db_size() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_top_tables(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_cron_jobs() TO authenticated;
