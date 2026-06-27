DO $$
BEGIN
  -- Ensure authenticated users can be verified as admins
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow admin insert on cms-media'
  ) THEN
    CREATE POLICY "Allow admin insert on cms-media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow admin update on cms-media'
  ) THEN
    CREATE POLICY "Allow admin update on cms-media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'))
    WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow admin delete on cms-media'
  ) THEN
    CREATE POLICY "Allow admin delete on cms-media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow public read access on cms-media'
  ) THEN
    CREATE POLICY "Allow public read access on cms-media"
    ON storage.objects FOR SELECT
    TO anon
    USING (bucket_id = 'cms-media');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow authenticated read access on cms-media'
  ) THEN
    CREATE POLICY "Allow authenticated read access on cms-media"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'cms-media');
  END IF;
END
$$;