SELECT cron.unschedule('prune-cron-history');
SELECT cron.schedule('prune-cron-history','0 * * * *', $$DELETE FROM cron.job_run_details WHERE end_time < now() - interval '1 day';$$);