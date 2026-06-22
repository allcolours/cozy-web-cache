
-- BLOG POSTS
DROP POLICY IF EXISTS "Authenticated full access blog_posts" ON public.blog_posts;
CREATE POLICY "Admins manage blog_posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- CASE STUDIES
DROP POLICY IF EXISTS "Authenticated full access case_studies" ON public.case_studies;
CREATE POLICY "Admins manage case_studies" ON public.case_studies
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated full access case_study_images" ON public.case_study_images;
CREATE POLICY "Admins manage case_study_images" ON public.case_study_images
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- GALLERY
DROP POLICY IF EXISTS "Authenticated manage projects" ON public.gallery_projects;
CREATE POLICY "Admins manage gallery_projects" ON public.gallery_projects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated manage images" ON public.gallery_images;
CREATE POLICY "Admins manage gallery_images" ON public.gallery_images
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- STORAGE: gallery bucket
DROP POLICY IF EXISTS "Authenticated write gallery objects" ON storage.objects;
CREATE POLICY "Admins write gallery objects" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

-- TESTIMONIALS
DROP POLICY IF EXISTS "Authenticated full access testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- LEADS: replace permissive authenticated policies with admin-only;
-- keep anonymous INSERT so public website forms continue to work.
DROP POLICY IF EXISTS "Authenticated can read leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can delete leads" ON public.leads;

CREATE POLICY "Admins read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete leads" ON public.leads
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
