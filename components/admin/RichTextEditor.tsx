"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { uploadImageToStorage } from "@/lib/storage";
import { toast } from "sonner";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing…",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: { attributes: { class: "editor-content" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!mounted || !editor) return <div className="editor" style={{ minHeight: 360 }} />;

  async function onImage() {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadImageToStorage(file);
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Upload failed");
      }
    };
    input.click();
  }

  function onLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const btn = (active: boolean, onClick: () => void, label: string) => (
    <button type="button" className={active ? "is-active" : ""} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="editor">
      <div className="editor-toolbar">
        {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2")}
        {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3")}
        {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), "Bold")}
        {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), "Italic")}
        {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "• List")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), "1. List")}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), "Quote")}
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</button>
        <button type="button" onClick={onLink} className={editor.isActive("link") ? "is-active" : ""}>Link</button>
        <button type="button" onClick={onImage}>Image</button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
