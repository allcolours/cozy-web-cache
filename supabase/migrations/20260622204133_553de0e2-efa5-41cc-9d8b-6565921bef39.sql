
-- Drop the existing simple gallery_images table to replace with project-based schema
DROP TABLE IF EXISTS public.gallery_images CASCADE;

-- Projects
CREATE TABLE public.gallery_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text,
  category text NOT NULL CHECK (category IN ('interior','exterior','commercial','epoxy','bespoke')),
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_projects TO authenticated;
GRANT ALL ON public.gallery_projects TO service_role;

ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible projects" ON public.gallery_projects
  FOR SELECT USING (visible = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage projects" ON public.gallery_projects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Images
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.gallery_projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  storage_path text,
  alt_text text,
  is_cover boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX gallery_images_project_idx ON public.gallery_images(project_id, sort_order);

GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view images of visible projects" ON public.gallery_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.gallery_projects p
            WHERE p.id = gallery_images.project_id
              AND (p.visible = true OR public.has_role(auth.uid(), 'admin')))
  );
CREATE POLICY "Admins manage images" ON public.gallery_images
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage RLS: public can read bucket 'gallery'; admins can write
CREATE POLICY "Public read gallery objects" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Admins write gallery objects" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
