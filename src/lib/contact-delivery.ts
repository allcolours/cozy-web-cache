type SavedInquiry = { id: string; created_at: string };
type SaveResult = { data: SavedInquiry | null; error: unknown };

/** A saved CRM lead must follow the same notification path as an inbox entry. */
export async function completeContactInquiry(options: {
  inbox: SaveResult;
  saveLead: () => Promise<SaveResult>;
  notify: (inquiry: SavedInquiry) => Promise<void>;
  logError: (message: string, error: unknown) => void;
}): Promise<Response> {
  let saved = !options.inbox.error ? options.inbox.data : null;
  try {
    const lead = await options.saveLead();
    if (lead.error) options.logError("contact: leads insert returned error", lead.error);
    if (!saved && !lead.error) saved = lead.data;
  } catch (error) {
    options.logError("contact: leads insert failed", error);
  }
  if (!saved) {
    return Response.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
  try {
    await options.notify(saved);
  } catch (error) {
    options.logError("Contact email send failed (inquiry was saved)", error);
  }
  return Response.json({ success: true });
}
