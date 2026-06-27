-- Rotate cron jobs to use HOOK_AUTH_TOKEN instead of the public anon key.
SELECT cron.unschedule('check-asset-errors-hourly');
SELECT cron.unschedule('gsc-coverage-weekly');

SELECT cron.schedule(
  'check-asset-errors-hourly',
  '5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--3e6266a6-b65e-4789-949e-663e75a751ba.lovable.app/api/public/hooks/check-asset-errors',
    headers := '{"Content-Type":"application/json","x-hook-token":"002e8606b76369002b59fdd22638cc4275de82794e975613a0a067e12249faee"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

SELECT cron.schedule(
  'gsc-coverage-weekly',
  '0 20 * * 0',
  $$
  SELECT net.http_post(
    url := 'https://project--3e6266a6-b65e-4789-949e-663e75a751ba.lovable.app/api/public/hooks/gsc-coverage-report',
    headers := '{"Content-Type":"application/json","x-hook-token":"002e8606b76369002b59fdd22638cc4275de82794e975613a0a067e12249faee"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);