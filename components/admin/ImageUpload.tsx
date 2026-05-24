"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadImageToStorage } from "@/lib/storage";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToStorage(file);
      onChange(url);
      toast.success("Uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      {value && (
        <div style={{ marginBottom: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="cover" style={{ maxHeight: 160, borderRadius: 4, border: "1px solid var(--rule)" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="file" accept="image/*" onChange={onFile} disabled={uploading} />
        {value && (
          <button type="button" className="btn-link danger" onClick={() => onChange(null)}>
            Remove
          </button>
        )}
        {uploading && <span style={{ fontSize: 12 }}>Uploading…</span>}
      </div>
    </div>
  );
}
