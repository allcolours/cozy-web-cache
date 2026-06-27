DO $$
DECLARE proj_id uuid;
BEGIN
  INSERT INTO public.gallery_projects (title, location, category, sort_order, visible)
  VALUES ('Sandyford Apartments', 'Sandyford, Dublin 18', 'interior', 0, true)
  RETURNING id INTO proj_id;
  INSERT INTO public.gallery_images (project_id, image_url, alt_text, is_cover, sort_order) VALUES
  (proj_id, '/__l5e/assets-v1/e4c91f4b-421d-4a98-a1d8-05d29d1dcb89/sandyford-apartments-dublin-01.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (01)', true, 1),
  (proj_id, '/__l5e/assets-v1/45d61b41-9438-497d-a8d0-d41cb0d2bffe/sandyford-apartments-dublin-02.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (02)', false, 2),
  (proj_id, '/__l5e/assets-v1/75e7d846-0221-42e0-88f1-73f31c78666e/sandyford-apartments-dublin-03.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (03)', false, 3),
  (proj_id, '/__l5e/assets-v1/3365e130-0bdf-4e05-89d1-836bee2cf3a2/sandyford-apartments-dublin-04.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (04)', false, 4),
  (proj_id, '/__l5e/assets-v1/eeff16f9-00d4-4179-a194-981b15c4a806/sandyford-apartments-dublin-05.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (05)', false, 5),
  (proj_id, '/__l5e/assets-v1/f5612e5a-d1c8-4d67-8e81-a6eb68ad223c/sandyford-apartments-dublin-06.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (06)', false, 6),
  (proj_id, '/__l5e/assets-v1/e29a7358-7935-43c0-ae07-323a2cfccfe2/sandyford-apartments-dublin-07.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (07)', false, 7),
  (proj_id, '/__l5e/assets-v1/509bd573-4041-48cb-8130-2717eb4e3419/sandyford-apartments-dublin-08.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (08)', false, 8),
  (proj_id, '/__l5e/assets-v1/65ba6f4b-e7bb-4b00-8940-17cc1196211c/sandyford-apartments-dublin-09.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (09)', false, 9),
  (proj_id, '/__l5e/assets-v1/45ef126e-c943-4ba6-93b4-17cec185eb11/sandyford-apartments-dublin-10.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (10)', false, 10),
  (proj_id, '/__l5e/assets-v1/a334187e-9801-44db-820b-2daa9e3731cf/sandyford-apartments-dublin-11.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (11)', false, 11),
  (proj_id, '/__l5e/assets-v1/76971b43-4dcb-4242-bb47-1695afb976fe/sandyford-apartments-dublin-12.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (12)', false, 12),
  (proj_id, '/__l5e/assets-v1/82ca334b-8bd1-4dd1-ae23-e817c10365d1/sandyford-apartments-dublin-13.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (13)', false, 13),
  (proj_id, '/__l5e/assets-v1/14f9c05f-5153-4aaa-bc6f-0dbd6c89ea47/sandyford-apartments-dublin-14.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (14)', false, 14),
  (proj_id, '/__l5e/assets-v1/99299b47-7954-4d7c-a51a-087b3bb4b770/sandyford-apartments-dublin-15.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (15)', false, 15),
  (proj_id, '/__l5e/assets-v1/759e4c70-5a0a-46dc-a781-d9556b8138f3/sandyford-apartments-dublin-16.webp', 'Painting and decorating works at Sandyford apartments, Dublin 18 — All Colours Painting (16)', false, 16);
END $$;