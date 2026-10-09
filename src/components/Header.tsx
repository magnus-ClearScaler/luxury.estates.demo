"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { Drawer } from "./Drawer";
import { Wordmark } from "./Wordmark";

/**
 * Brief 5.1. Sticky, 88px, compacts to 64px after 40px of scroll (400ms).
 * Grid 1fr auto 1fr: MENU with two hairlines | wordmark | ENQUIRE.
 * Transparent on paper before scroll; chalk with a 1px hair rule once compact.
 * Never over a photograph, ink text always. Mobile: MENU, wordmark, nothing
 * right; 64px tall.
 */
export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  // The drawer is open only on the path it was opened on, so it closes on
  // route change without an effect (brief 5.2).
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpenedOn(null);
    menuButton.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="site-header" data-compact={compact ? "true" : "false"}>
        <div className="site-header-inner container-x">
          <div className="site-header-left">
            <button
              ref={menuButton}
              type="button"
              className="menu-button t-nav"
              aria-expanded={open}
              aria-controls="site-drawer"
              onClick={() => setOpenedOn(pathname)}
            >
              <span className="menu-glyph" aria-hidden="true">
                <span />
                <span />
              </span>
              <span>{copy.header.menu}</span>
            </button>
          </div>
          <Link href="/" className="site-header-mark" aria-label={copy.header.homeLabel}>
            <Wordmark className="header-wordmark" />
          </Link>
          <div className="site-header-right">
            <Link href="/enquire" className="t-link header-enquire">
              {copy.header.enquire}
            </Link>
          </div>
        </div>
      </header>
      <Drawer open={open} onClose={close} />
    </>
  );
}
