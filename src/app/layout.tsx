import type { Metadata, Viewport } from "next";
import { Jost, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";
import "./globals.css";

// Variable font: no `weight` key, or next/font rejects the `axes` option.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
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
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F2EB",
};

// Marks the document as scripted before first paint so image fades only apply
// when JavaScript can reveal them (globals.css `.js .frame > img`).
const jsFlag = "document.documentElement.classList.add('js')";

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
      </body>
    </html>
  );
}
