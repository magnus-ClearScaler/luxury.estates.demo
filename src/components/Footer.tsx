import Link from "next/link";
import { copy } from "@/lib/copy";
import { published } from "@/lib/estates";
import { houseLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/**
 * Brief 5.3. Linen. Grid 1.4fr 1fr 1fr on desktop, stacked on mobile:
 * wordmark and line | ESTATES with the nine names | HOUSE links. Then a
 * hairline and the legal line with the colophon linked. No social glyphs,
 * newsletter, phone, email or address.
 */
export function Footer() {
  const f = copy.footer;
  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label={copy.header.homeLabel} className="footer-mark">
              <Wordmark size={22} />
            </Link>
            <p className="t-small c-umber footer-line">{f.line}</p>
          </div>
          <nav aria-label={f.estatesNavLabel}>
            <p className="t-eyebrow c-taupe footer-head">{f.estatesHead}</p>
            <ul className="footer-list">
              {published().map((e) => (
                <li key={e.slug}>
                  <Link href={`/estates/${e.slug}`} className="t-small inline-link">
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={f.houseNavLabel}>
            <p className="t-eyebrow c-taupe footer-head">{f.houseHead}</p>
            <ul className="footer-list">
              {houseLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="t-small inline-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <hr className="hairline" />
        <p className="footer-legal">
          {f.legalBefore}
          <Link href="/colophon" className="inline-link">
            {f.legalLink}
          </Link>
          {f.legalAfter}
        </p>
      </div>
    </footer>
  );
}
