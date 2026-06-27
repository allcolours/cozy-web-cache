-- Lock down SECURITY DEFINER functions: revoke from PUBLIC and anon.
-- Only public.has_role needs to remain executable by authenticated (used in RLS policies).
-- Admin_* functions self-gate on has_role(); allow authenticated to call so the gate can run.
-- Email queue helpers are invoked from server code with service_role only.

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.admin_db_size()          FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_top_tables(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_cron_jobs()        FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.admin_db_size()          TO authenticated, service_role;
GRANT  EXECUTE ON FUNCTION public.admin_top_tables(integer) TO authenticated, service_role;
GRANT  EXECUTE ON FUNCTION public.admin_cron_jobs()        TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)        FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)        FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)        TO service_role;
GRANT  EXECUTE ON FUNCTION public.delete_email(text, bigint)        TO service_role;
GRANT  EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT  EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   TO service_role;

-- handle_new_user_admin is a trigger function; revoke direct EXECUTE entirely.
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;