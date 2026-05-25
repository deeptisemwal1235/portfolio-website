"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import slugify from "slugify";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { calcReadTime } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";
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

export default function ContentEditor({
  mode,
  kind,
  initial,
  knownTags = [],
}: {
  mode: Mode;
  kind: Kind;
  initial: Initial;
  knownTags?: string[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const draftKey = `editor-draft:${kind}:${initial.id ?? "new"}`;
  const [form, setForm] = useState<Initial>(initial);
  const [restoredAt, setRestoredAt] = useState<string | null>(null);
  const [autosavedAt, setAutosavedAt] = useState<string | null>(null);
  // When true, slug auto-tracks title. Flipped to false the moment the
  // user edits the slug field manually, so we don't clobber their edit.
  const [slugAuto, setSlugAuto] = useState(mode === "create");

  // Dirty-tracking: keep a snapshot of the saved form. Anything diverging
  // means there are unsaved edits, which trips Cmd+S + beforeunload.
  const savedRef = useRef<Initial>(initial);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setDirty(JSON.stringify(form) !== JSON.stringify(savedRef.current));
  }, [form]);

  // Autosave: debounce writes of the working form to localStorage so a tab
  // close / browser crash / accidental navigation doesn't eat a long write.
  // Restore prompt offered on mount if a fresher draft exists than `initial`.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { savedAt: string; form: Initial };
      const sameAsServer =
        JSON.stringify(parsed.form) === JSON.stringify(initial);
      if (sameAsServer) {
        window.localStorage.removeItem(draftKey);
        return;
      }
      setRestoredAt(parsed.savedAt);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dirty || typeof window === "undefined") return;
    const t = setTimeout(() => {
      try {
        const stamp = new Date().toISOString();
        window.localStorage.setItem(draftKey, JSON.stringify({ savedAt: stamp, form }));
        setAutosavedAt(stamp);
      } catch {}
    }, 1000);
    return () => clearTimeout(t);
  }, [form, dirty, draftKey]);

  function restoreDraft() {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { savedAt: string; form: Initial };
      setForm(parsed.form);
      setRestoredAt(null);
      toast.success("Draft restored");
    } catch {}
  }
  function discardDraft() {
    try { window.localStorage.removeItem(draftKey); } catch {}
    setRestoredAt(null);
  }

  // beforeunload — browser-native "unsaved changes" warning.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Most modern browsers ignore the message string but honour the prompt.
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Cmd+S / Ctrl+S → save.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // `save` is stable enough — it reads form from closure each call. Re-binding
    // every keystroke would be wasteful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  function currentTags(): string[] {
    return form.tags.split(",").map((t) => t.trim()).filter(Boolean);
  }
  function addTag(tag: string) {
    const existing = currentTags();
    if (existing.includes(tag)) return;
    const next = [...existing, tag].join(", ");
    update("tags", next);
  }

  function update<K extends keyof Initial>(key: K, value: Initial[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function onTitleChange(value: string) {
    setForm((s) => {
      const next: Initial = { ...s, title: value };
      if (slugAuto) {
        next.slug = slugify(value, { lower: true, strict: true });
      }
      return next;
    });
  }

  function onSlugChange(value: string) {
    setSlugAuto(false);
    update("slug", value);
  }

  function autoSlug() {
    if (!form.title) return;
    setSlugAuto(true);
    update("slug", slugify(form.title, { lower: true, strict: true }));
  }

  async function save() {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    start(async () => {
      const sb = createSupabaseBrowserClient();
      // Sanitize before persisting — strips <script>, inline event handlers,
      // and any unexpected tags Tiptap shouldn't be able to produce.
      const safeContent = sanitizeHtml(form.content);
      // Auto-fill read_time when the editor left it blank.
      const readTime = form.read_time.trim() || calcReadTime(safeContent) || null;
      const row: Record<string, unknown> = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim() || null,
        content: safeContent,
        cover_image_url: form.cover_image_url,
        category: form.category.trim() || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : null,
        read_time: readTime,
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
      // Mark clean before navigating so beforeunload doesn't prompt.
      savedRef.current = { ...form };
      setDirty(false);
      // Clear the local draft now that the server has the canonical copy.
      try { window.localStorage.removeItem(draftKey); } catch {}
      setAutosavedAt(null);
      toast.success("Saved");
      router.push("/admin/dashboard");
      router.refresh();
    });
  }

  return (
    <div className="admin-form">
      {restoredAt && (
        <div className="restore-banner" role="status">
          <span>
            ● A more recent draft was found in this browser
            (autosaved {new Date(restoredAt).toLocaleString()}).
          </span>
          <span>
            <button type="button" className="btn-link" onClick={restoreDraft}>Restore</button>
            <button type="button" className="btn-link danger" onClick={discardDraft}>Discard</button>
          </span>
        </div>
      )}
      <div className="row">
        <div>
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => onTitleChange(e.target.value)} />
        </div>
        <div>
          <label>Slug</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={form.slug} onChange={(e) => onSlugChange(e.target.value)} />
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
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="Wind, Techno-econ"
            list="known-tags"
          />
          <datalist id="known-tags">
            {knownTags.map((t) => <option key={t} value={t} />)}
          </datalist>
          {knownTags.length > 0 && (
            <div className="tag-suggest">
              <span className="tag-suggest-label">Used before:</span>
              {knownTags.filter((t) => !currentTags().includes(t)).slice(0, 16).map((t) => (
                <button key={t} type="button" className="tag-chip" onClick={() => addTag(t)}>
                  {t}
                </button>
              ))}
            </div>
          )}
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
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={form.read_time} onChange={(e) => update("read_time", e.target.value)} placeholder="Auto-calc on save" />
            <button
              type="button"
              className="btn-link"
              onClick={() => update("read_time", calcReadTime(form.content) ?? "")}
              title="Compute from current content"
            >
              Auto
            </button>
          </div>
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
        <button type="button" className="btn-primary-cta" onClick={save} disabled={pending} title="Save (⌘S / Ctrl+S)">
          {pending ? "Saving…" : "Save"}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push("/admin/dashboard")}>Cancel</button>
        <span className="save-state">
          {pending
            ? "Saving…"
            : dirty
              ? "● Unsaved changes — ⌘S to save"
              : mode === "edit"
                ? "Saved"
                : ""}
        </span>
      </div>
      {autosavedAt && dirty && (
        <p className="editor-autosave">
          Autosaved locally · {new Date(autosavedAt).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
