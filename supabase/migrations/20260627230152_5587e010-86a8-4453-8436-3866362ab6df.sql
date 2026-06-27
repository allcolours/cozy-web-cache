
-- 1) RETENTION JOBS
DO $$
DECLARE j text;
BEGIN
  FOREACH j IN ARRAY ARRAY['prune-cron-history','prune-email-log','prune-rate-limits','prune-asset-runs','prune-page-views']
  LOOP
    BEGIN PERFORM cron.unschedule(j); EXCEPTION WHEN OTHERS THEN NULL; END;
  END LOOP;
END $$;

SELECT cron.schedule('prune-cron-history','0 3 * * *',
  $$DELETE FROM cron.job_run_details WHERE end_time < now() - interval '3 days';$$);
SELECT cron.schedule('prune-email-log','10 3 * * *',
  $$DELETE FROM public.email_send_log WHERE created_at < now() - interval '90 days';$$);
SELECT cron.schedule('prune-rate-limits','0 * * * *',
  $$DELETE FROM public.rate_limits WHERE created_at < now() - interval '2 days';$$);
SELECT cron.schedule('prune-asset-runs','20 3 * * *',
  $$DELETE FROM public.asset_error_check_runs WHERE ran_at < now() - interval '30 days';$$);
SELECT cron.schedule('prune-page-views','30 3 * * *',
  $$DELETE FROM public.page_views WHERE created_at < now() - interval '180 days';$$);

-- 2) INDEX
CREATE INDEX IF NOT EXISTS idx_case_study_images_case_study_id
  ON public.case_study_images (case_study_id);

-- 3) TIGHTEN GRANTS on admin introspection functions
REVOKE EXECUTE ON FUNCTION public.admin_db_size() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_top_tables(integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_cron_jobs() FROM anon, public;

GRANT EXECUTE ON FUNCTION public.admin_db_size() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_top_tables(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_cron_jobs() TO authenticated;
