"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { copy } from "@/lib/copy";
import { nav } from "@/lib/site";

/**
 * Brief 5.2. Chalk panel from the left, 480px (full width under 768px):
 * opacity and translateX(-16px to 0) over 400ms; backdrop fades over 300ms.
 * Items in Newsreader 26px, a hairline, the office line. A hairline X closes
 * it, as do Escape and a backdrop click. Body scroll is locked while open;
 * the closed panel is inert. Route changes close it via the parent's
 * `openedOn === pathname` state.
 */
export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className="drawer-root" data-open={open ? "true" : "false"}>
      <div className="drawer-backdrop" aria-hidden="true" onClick={onClose} />
      <div
        id="site-drawer"
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={copy.drawer.label}
        inert={!open}
      >
        <button
          ref={closeButton}
          type="button"
          className="drawer-close"
          aria-label={copy.drawer.close}
          onClick={onClose}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav className="drawer-nav">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="drawer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="hairline" />
        <p className="t-small c-umber drawer-office">{copy.drawer.office}</p>
      </div>
    </div>
  );
}
