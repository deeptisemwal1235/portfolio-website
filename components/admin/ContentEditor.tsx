"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import slugify from "slugify";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";

type Mode = "create" | "edit";
type Kind = "projects" | "posts";

type Initial = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  tags: string;
  year?: number | null;
  read_time: string;
  published_at?: string | null;
  published: boolean;
};

export default function ContentEditor({ mode, kind, initial }: { mode: Mode; kind: Kind; initial: Initial }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [form, setForm] = useState<Initial>(initial);

  function update<K extends keyof Initial>(key: K, value: Initial[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function autoSlug() {
    if (!form.title) return;
    update("slug", slugify(form.title, { lower: true, strict: true }));
  }

  async function save() {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    start(async () => {
      const sb = createSupabaseBrowserClient();
      const row: Record<string, unknown> = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim() || null,
        content: form.content,
        cover_image_url: form.cover_image_url,
        category: form.category.trim() || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : null,
        read_time: form.read_time.trim() || null,
        published: form.published,
      };
      if (kind === "projects") row.year = form.year ?? null;
      if (kind === "posts") row.published_at = form.published_at || (form.published ? new Date().toISOString() : null);

      const { error } = mode === "create"
        ? await sb.from(kind).insert(row)
        : await sb.from(kind).update(row).eq("id", form.id!);

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Saved");
      router.push("/admin/dashboard");
      router.refresh();
    });
  }

  return (
    <div className="admin-form">
      <div className="row">
        <div>
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} onBlur={() => !form.slug && autoSlug()} />
        </div>
        <div>
          <label>Slug</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
            <button type="button" className="btn-link" onClick={autoSlug}>From title</button>
          </div>
        </div>
      </div>

      <div>
        <label>Excerpt / standfirst</label>
        <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} />
      </div>

      <div className="row">
        <div>
          <label>Category</label>
          <input type="text" value={form.category} onChange={(e) => update("category", e.target.value)} placeholder={kind === "projects" ? "Project · Wind" : "Carbon"} />
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input type="text" value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="Wind, Techno-econ" />
        </div>
      </div>

      <div className="row">
        {kind === "projects" ? (
          <div>
            <label>Year</label>
            <input type="number" value={form.year ?? ""} onChange={(e) => update("year", e.target.value ? parseInt(e.target.value) : null)} />
          </div>
        ) : (
          <div>
            <label>Publish date</label>
            <input
              type="date"
              value={form.published_at ? form.published_at.slice(0, 10) : ""}
              onChange={(e) => update("published_at", e.target.value ? new Date(e.target.value).toISOString() : null)}
            />
          </div>
        )}
        <div>
          <label>Read time</label>
          <input type="text" value={form.read_time} onChange={(e) => update("read_time", e.target.value)} placeholder="6 min read" />
        </div>
      </div>

      <div>
        <label>Cover image</label>
        <ImageUpload value={form.cover_image_url} onChange={(url) => update("cover_image_url", url)} />
      </div>

      <div>
        <label>Content</label>
        <RichTextEditor value={form.content} onChange={(html) => update("content", html)} placeholder="Write the article body…" />
      </div>

      <div className="checkbox-row">
        <input id="published" type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
        <label htmlFor="published" style={{ margin: 0 }}>Published</label>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary-cta" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push("/admin/dashboard")}>Cancel</button>
      </div>
    </div>
  );
}
