export function contactFallbackResponse(error: unknown): Response {
  return error
    ? Response.json({ error: "Failed to save inquiry" }, { status: 500 })
    : Response.json({ success: true });
}