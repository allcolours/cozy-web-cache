DROP POLICY IF EXISTS "Anyone can submit an estimate request" ON public.estimate_requests;
REVOKE INSERT ON public.estimate_requests FROM anon, authenticated;