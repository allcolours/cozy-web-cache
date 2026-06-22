
-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  location text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  project_type text,
  visible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT ALL ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible testimonials" ON public.testimonials FOR SELECT USING (visible = true);
CREATE POLICY "Authenticated full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_title text,
  meta_description text,
  excerpt text,
  cover_image_url text,
  category text,
  author text DEFAULT 'All Colours Painting',
  read_time text,
  intro text,
  content jsonb DEFAULT '[]'::jsonb,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Authenticated full access blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Case studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  location text,
  category text,
  client_type text,
  cover_image_url text,
  intro text,
  challenge text,
  approach text,
  result text,
  materials text,
  duration text,
  visible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
GRANT SELECT ON public.case_studies TO anon;
GRANT ALL ON public.case_studies TO authenticated;
GRANT ALL ON public.case_studies TO service_role;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible case studies" ON public.case_studies FOR SELECT USING (visible = true);
CREATE POLICY "Authenticated full access case_studies" ON public.case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Case study images
CREATE TABLE IF NOT EXISTS public.case_study_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES public.case_studies(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  storage_path text,
  caption text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
GRANT SELECT ON public.case_study_images TO anon;
GRANT ALL ON public.case_study_images TO authenticated;
GRANT ALL ON public.case_study_images TO service_role;
ALTER TABLE public.case_study_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read case study images" ON public.case_study_images FOR SELECT USING (true);
CREATE POLICY "Authenticated full access case_study_images" ON public.case_study_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
