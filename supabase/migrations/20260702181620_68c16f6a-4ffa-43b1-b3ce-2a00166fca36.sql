
-- 1) Drop old constraint first
ALTER TABLE public.gallery_projects DROP CONSTRAINT IF EXISTS gallery_projects_category_check;

-- 2) Migrate data
UPDATE public.gallery_projects SET category = 'woodwork' WHERE category = 'bespoke';
UPDATE public.gallery_projects SET category = 'commercial' WHERE id = 'df805a71-beec-4483-b028-39d1579c2181';

-- 3) Add new constraint
ALTER TABLE public.gallery_projects ADD CONSTRAINT gallery_projects_category_check
  CHECK (category = ANY (ARRAY[
    'interior'::text,
    'exterior'::text,
    'woodwork'::text,
    'metalwork'::text,
    'kitchens'::text,
    'plaster'::text,
    'commercial'::text,
    'epoxy'::text
  ]));
