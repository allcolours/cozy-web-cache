const REDIRECTS: Record<string, string> = {
  "/painter-maynooth": "/painters",
  "/painter-naas": "/painters",
  "/painter-navan": "/painters",
  "/painter-balbriggan": "/painters",
  "/blog/cost-of-painting-a-house-dublin-2025": "/blog/cost-to-paint-house-dublin-2025",
};

export function permanentRedirect(path: string) {
  return REDIRECTS[path.replace(/\/$/, "")];
}