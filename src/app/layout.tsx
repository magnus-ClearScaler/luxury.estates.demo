import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { copy } from "@/lib/copy";
import { headScript } from "@/lib/head-script";
import { siteJsonLd } from "@/lib/jsonld";
import { NAME_DISPLAY, site } from "@/lib/site";
import "./globals.css";

// Fonts (PSI pass 1): plain @font-face rules in globals.css instead of
// next/font, so each face is split by unicode-range into a small first file
// (the glyphs the site sets, preloaded below) and a rest-of-latin file that
// only loads if a page or a visitor's typing needs it. Same outlines, same
// axes, same fallback faces. Regenerate with scripts/subset-fonts.sh.
const FONT_PRELOADS = ["/fonts/newsreader-a.v2.woff2", "/fonts/jost-a.v2.woff2"];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: copy.meta.titleDefault,
    template: copy.meta.titleTemplate,
  },
  description: copy.meta.description,
  applicationName: NAME_DISPLAY,
  // Public and indexable (owner decision 2026-10-09). No `alternates` here:
  // children would inherit a canonical to `/`. Each page sets its own
  // through `pageMeta` (src/lib/seo.ts).
};

export const viewport: Viewport = {
  themeColor: "#F6F2EB",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  for (const href of FONT_PRELOADS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "" });
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {copy.skipLink}
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
