
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_new_user_admin() TO service_role;
