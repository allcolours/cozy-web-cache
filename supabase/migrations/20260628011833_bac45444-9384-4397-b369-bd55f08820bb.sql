GRANT SELECT ON TABLE public.gallery_projects TO anon;
GRANT SELECT ON TABLE public.gallery_images TO anon;

DROP POLICY IF EXISTS "Public can view visible projects" ON public.gallery_projects;
CREATE POLICY "Public can view visible projects"
ON public.gallery_projects
FOR SELECT
TO public
USING (visible = true);

DROP POLICY IF EXISTS "Public can view images of visible projects" ON public.gallery_images;
CREATE POLICY "Public can view images of visible projects"
ON public.gallery_images
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.gallery_projects p
    WHERE p.id = gallery_images.project_id
      AND p.visible = true
  )
);

NOTIFY pgrst, 'reload schema';