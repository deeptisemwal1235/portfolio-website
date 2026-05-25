"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const x = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <div className="share-row" aria-label="Share this article">
      <span className="share-label">Share —</span>
      <a className="share-btn" href={x} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
      <a className="share-btn" href={li} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">LinkedIn</a>
      <button type="button" className="share-btn" onClick={copy}>{copied ? "Copied ✓" : "Copy link"}</button>
    </div>
  );
}
