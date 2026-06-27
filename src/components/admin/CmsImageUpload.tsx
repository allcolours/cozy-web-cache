import { useRef, useState } from "react";
import { uploadCmsImage } from "@/lib/admin/cms-upload";

interface CmsImageUploadProps {
  folder: string;
  onUploaded: (url: string) => void;
  label?: string;
  accept?: string;
}

export function CmsImageUpload({
  folder,
  onUploaded,
  label = "Upload image",
  accept = "image/*,.heic,.heif",
}: CmsImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadCmsImage(file, folder);
      onUploaded(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="rounded-sm border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary disabled:opacity-60"
      >
        {uploading ? "Uploading…" : label}
      </button>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
