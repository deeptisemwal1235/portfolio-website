"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { uploadImageToStorage, listBucketImages } from "@/lib/storage";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [items, setItems] = useState<{ name: string; url: string }[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);

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

  // Lazy-load the bucket list the first time the user opens the browser.
  useEffect(() => {
    if (!browsing || items !== null) return;
    setLoadingList(true);
    listBucketImages()
      .then((rows) => setItems(rows.map((r) => ({ name: r.name, url: r.url }))))
      .catch((e) => toast.error(e instanceof Error ? e.message : "Could not list images"))
      .finally(() => setLoadingList(false));
  }, [browsing, items]);

  return (
    <div>
      {value && (
        <div style={{ marginBottom: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="cover" style={{ maxHeight: 160, borderRadius: 4, border: "1px solid var(--rule)" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input type="file" accept="image/*" onChange={onFile} disabled={uploading} />
        <button type="button" className="btn-link" onClick={() => setBrowsing((v) => !v)}>
          {browsing ? "Close library" : "Browse uploads"}
        </button>
        {value && (
          <button type="button" className="btn-link danger" onClick={() => onChange(null)}>
            Remove
          </button>
        )}
        {uploading && <span style={{ fontSize: 12 }}>Uploading…</span>}
      </div>

      {browsing && (
        <div className="image-library">
          {loadingList && <p style={{ fontSize: 13, color: "var(--ink-3)" }}>Loading…</p>}
          {items && items.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--ink-3)" }}>No images uploaded yet.</p>
          )}
          {items && items.length > 0 && (
            <div className="image-library-grid">
              {items.map((it) => (
                <button
                  key={it.name}
                  type="button"
                  className={`image-library-item${value === it.url ? " selected" : ""}`}
                  onClick={() => {
                    onChange(it.url);
                    setBrowsing(false);
                    toast.success("Picked");
                  }}
                  title={it.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.url} alt={it.name} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
