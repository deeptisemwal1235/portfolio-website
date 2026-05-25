"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#analysis", label: "Analysis" },
  // /about is an absolute route — keep it separate from the anchor links
  { href: "/about", label: "About", absolute: true },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  // Close drawer on Escape; lock body scroll while open; trap focus inside.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusable = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    // Move focus into the drawer when it opens.
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
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
    <>
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
              <li key={l.href}>
                <a href={l.absolute ? l.href : `${prefix}${l.href}`}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a className="nav-cta" href={`${prefix}#contact`}>Let&apos;s Talk →</a>

          <button
            ref={burgerRef}
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
      </nav>

      {/* Rendered as a sibling of <nav> (NOT a child) so position:fixed escapes
          the nav's backdrop-filter containing block. */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={`nav-drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        aria-modal={open ? "true" : undefined}
        aria-label="Site navigation"
        role="dialog"
      >
        <ul className="nav-drawer-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.absolute ? l.href : `${prefix}${l.href}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="nav-drawer-cta" href={`${prefix}#contact`} onClick={() => setOpen(false)}>
          Let&apos;s Talk →
        </a>
      </div>
    </>
  );
}
