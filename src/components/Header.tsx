import Link from "next/link";
import { copy } from "@/lib/copy";
import { Drawer } from "./Drawer";
import { Wordmark } from "./Wordmark";

/**
 * Brief 5.1. Sticky, 88px, compacts to 64px after 40px of scroll (400ms).
 * Grid 1fr auto 1fr: MENU with two hairlines | wordmark | ENQUIRE.
 * Transparent on paper before scroll; chalk with a 1px hair rule once compact.
 * Never over a photograph, ink text always. Mobile: MENU, wordmark, nothing
 * right; 64px tall. The sticky box keeps 88px in the flow and only the bar
 * inside it shrinks, so the page below never moves on scroll (globals.css).
 *
 * A server component (PSI pass 1): the compaction and the drawer run from
 * the small script in the document head (`headScript`, src/lib/head-script.ts),
 * so neither ships React code to the browser.
 */
export function Header() {
  return (
    <>
      <header className="site-header" data-compact="false">
        <div className="site-header-bar">
          <div className="site-header-inner container-x">
            <div className="site-header-left">
              <button
                type="button"
                className="menu-button t-nav"
                aria-expanded={false}
                aria-controls="site-drawer"
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
        </div>
      </header>
      <Drawer />
    </>
  );
}
