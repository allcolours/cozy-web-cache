
WITH new_project AS (
  INSERT INTO public.gallery_projects (title, location, category, description, visible, sort_order)
  VALUES (
    'Period Country Residence — Rowlestown, Co. Dublin',
    'Rowlestown, Co. Dublin',
    'exterior',
    'All Colours delivered painting works on a period country residence in Rowlestown, Co. Dublin. The project covered the full exterior render in a soft sage tone, hand-painted timber sash windows and sills in a warm off-white, and a feature entrance door finished in a deep blue. Works were carried out to a high standard across the main house and its bay and porch elevations.',
    false,
    9999
  )
  RETURNING id
)
INSERT INTO public.gallery_images (project_id, image_url, alt_text, is_cover, sort_order)
SELECT id, url, alt, cover, ord FROM new_project, (VALUES
  ('/__l5e/assets-v1/144f2635-d5e7-4a97-ad6a-761b475e2ce1/rowlestown-country-house-dublin-01.webp', 'All Colours exterior painting of a sage-green period country house in Rowlestown, Dublin', true, 1),
  ('/__l5e/assets-v1/b6c67bb0-7b18-4910-8ce1-5b5c04e9345f/rowlestown-country-house-dublin-02.webp', 'Hand-painted cream sash windows on a country house exterior in Rowlestown, Dublin', false, 2),
  ('/__l5e/assets-v1/aee26d5d-e2e8-4d44-9daa-d1b9828fb4d2/rowlestown-country-house-dublin-03.webp', 'Front elevation with columned porch and blue Georgian entrance door, Rowlestown', false, 3),
  ('/__l5e/assets-v1/8a05bf30-d141-48b3-8134-91787b55eda1/rowlestown-country-house-dublin-04.webp', 'Deep blue painted Georgian entrance door with cream surround, Rowlestown', false, 4)
) AS v(url, alt, cover, ord);
