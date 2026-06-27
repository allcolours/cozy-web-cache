import { supabase } from "@/integrations/supabase/client";

export async function uploadCmsImage(file: File, folder: string): Promise<string> {
  const { data: session } = await supabase.auth.getSession();
  const token = session?.session?.access_token;
  if (!token) throw new Error("Not authenticated");

  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const res = await fetch("/api/admin/cms-upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  if (!data.url || typeof data.url !== "string") throw new Error("Invalid upload response");
  return data.url;
}
