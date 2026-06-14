CREATE TABLE public.estimate_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  description text NOT NULL,
  estimate_min integer NOT NULL,
  estimate_max integer NOT NULL,
  condition text NOT NULL,
  mode text NOT NULL,
  line_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.estimate_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.estimate_requests TO authenticated;
GRANT ALL ON public.estimate_requests TO service_role;

ALTER TABLE public.estimate_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an estimate request"
ON public.estimate_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view estimate requests"
ON public.estimate_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update estimate requests"
ON public.estimate_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete estimate requests"
ON public.estimate_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));