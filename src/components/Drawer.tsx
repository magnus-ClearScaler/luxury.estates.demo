import Link from "@/components/SiteLink";
import { copy } from "@/lib/copy";
import { nav } from "@/lib/site";

/**
 * Brief 5.2. Chalk panel from the left, 480px (full width under 768px):
 * opacity and translateX(-16px to 0) over 400ms; backdrop fades over 300ms.
 * Items in Newsreader 26px, a hairline, the office line. A hairline X closes
 * it, as do Escape and a backdrop click. Body scroll is locked while open;
 * the closed panel is inert. Following a link to another page closes it.
 *
 * Rendered closed on the server; the head script (src/lib/head-script.ts)
 * opens and closes it. Focus goes to the X on opening, and back to MENU only
 * when it was closed from the keyboard, so pointer users never see the focus
 * ring appear on MENU.
 */
export function Drawer() {
  return (
    <div className="drawer-root" data-open="false">
      <div className="drawer-backdrop" aria-hidden="true" />
      <div
        id="site-drawer"
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={copy.drawer.label}
        inert
      >
        <button type="button" className="drawer-close" aria-label={copy.drawer.close}>
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
