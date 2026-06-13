
-- 1. user_roles: prevent any authenticated user from inserting/updating/deleting roles
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated, PUBLIC;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- Explicit restrictive policies for defense-in-depth
DROP POLICY IF EXISTS "Only service role can insert roles" ON public.user_roles;
CREATE POLICY "Only service role can insert roles" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (false);
DROP POLICY IF EXISTS "Only service role can update roles" ON public.user_roles;
CREATE POLICY "Only service role can update roles" ON public.user_roles
  FOR UPDATE TO authenticated USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS "Only service role can delete roles" ON public.user_roles;
CREATE POLICY "Only service role can delete roles" ON public.user_roles
  FOR DELETE TO authenticated USING (false);

-- 2. contact_submissions: drop public insert policy (form uses secured API with service role)
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
REVOKE INSERT ON public.contact_submissions FROM anon;

-- 3. page_views: replace WITH CHECK (true) with a real validation
DROP POLICY IF EXISTS "Anyone can record view" ON public.page_views;
CREATE POLICY "Anyone can record view" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    path IS NOT NULL
    AND length(path) BETWEEN 1 AND 500
    AND path LIKE '/%'
    AND (user_agent IS NULL OR length(user_agent) <= 1000)
    AND (referrer IS NULL OR length(referrer) <= 2000)
  );

-- 4. Lock down SECURITY DEFINER email queue functions to service_role only
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- 5. Set fixed search_path on functions that lack it
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pg_temp;
