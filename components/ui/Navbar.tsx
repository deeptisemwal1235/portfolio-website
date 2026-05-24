"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#analysis", label: "Analysis" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  const [open, setOpen] = useState(false);

  // Close drawer on Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav className={`nav${open ? " open" : ""}`}>
      <div className="container nav-inner">
        <Link className="logo" href={home ? "#top" : "/"} aria-label="Deepti Semwal — Home" onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <em>DS</em>
          </span>
          <span>
            <span className="logo-name">Deepti Semwal</span>
            <span className="logo-sub">Energy Policy · Regulations</span>
          </span>
        </Link>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={`${prefix}${l.href}`}>{l.label}</a></li>
          ))}
        </ul>
        <a className="nav-cta" href={`${prefix}#contact`}>Let&apos;s Talk →</a>

        <button
          className={`nav-burger${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      <div id="mobile-drawer" className="nav-drawer" aria-hidden={!open} role="dialog">
        <ul className="nav-drawer-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={`${prefix}${l.href}`} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="nav-drawer-cta" href={`${prefix}#contact`} onClick={() => setOpen(false)}>
          Let&apos;s Talk →
        </a>
      </div>
    </nav>
  );
}
