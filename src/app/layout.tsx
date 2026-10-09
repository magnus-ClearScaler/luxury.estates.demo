import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { copy } from "@/lib/copy";
import { siteJsonLd } from "@/lib/jsonld";
import { NAME_DISPLAY, site } from "@/lib/site";
import "./globals.css";

// Newsreader, the Google Fonts latin file (the one next/font/google served),
// with the weight axis pinned to the two weights the site sets (300 and 400)
// and the optical size axis kept whole, so the display cuts are unchanged.
// 91 KB instead of 132 KB before first paint. Roman only: nothing is set in
// italic. Regenerate with fontTools:
//   python3 -m fontTools.varLib.instancer <latin roman>.woff2 wght=300:400
const newsreader = localFont({
  src: "../fonts/newsreader-latin-300-400.woff2",
  weight: "300 400",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
  // The fallback face next/font/google generated for Newsreader, kept exactly
  // (globals.css), so the swap behaves as before.
  adjustFontFallback: false,
  fallback: ["Newsreader Fallback"],
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans",
  display: "swap",
});

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

// Marks the document as scripted before first paint so image fades only apply
// when JavaScript can reveal them (globals.css `.js .frame > img`), and marks
// each frame photograph as loaded the moment it loads, without waiting for
// React: a capturing `load` listener on the document sees every image,
// including those added by client navigation.
const jsFlag =
  "document.documentElement.classList.add('js');" +
  "document.addEventListener('load',function(e){var t=e.target;" +
  "if(t.tagName==='IMG'&&t.parentNode&&t.parentNode.classList&&t.parentNode.classList.contains('frame'))" +
  "t.setAttribute('data-loaded','true')},true)";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
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
