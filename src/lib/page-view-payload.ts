export function pageViewPayload(path: string, referrer: string, userAgent: string) {
  if (path.startsWith("/admin") || path.startsWith("/auth")) return null;
  return { path, referrer: referrer.slice(0, 2000) || null, user_agent: userAgent.slice(0, 500) };
}