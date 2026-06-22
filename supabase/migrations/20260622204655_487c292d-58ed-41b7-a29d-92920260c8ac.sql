
DROP POLICY IF EXISTS "Admins manage projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admins manage images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins write gallery objects" ON storage.objects;

CREATE POLICY "Authenticated manage projects" ON public.gallery_projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated manage images" ON public.gallery_images
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated write gallery objects" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'gallery') WITH CHECK (bucket_id = 'gallery');
