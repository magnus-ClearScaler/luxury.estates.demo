import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { atmosphere } from "@/data/atmosphere";
import { NAME_DISPLAY } from "@/lib/site";

/**
 * Brief 11.2: 1200 x 630 paper ground, the wordmark at 56px in ink in the top
 * band, sailboat-beige-sea inset below with 40px paper margins, nothing written
 * on the photograph. Ported from ~/structured-talent-demo/app/opengraph-image.tsx.
 *
 * Satori reads ttf/otf/woff but not woff2; Google serves ttf when the request
 * carries no browser User-Agent. If the fetch fails the card still renders in
 * the default sans.
 */
export const alt = NAME_DISPLAY;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F6F2EB";
const SAND = "#E2D8C9";
const INK = "#2A2622";
const MARGIN = 40;
const BAND = 170;

async function jost300() {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Jost:wght@300").then((r) => r.text());
    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name: "Jost", data, style: "normal" as const, weight: 300 as const };
  } catch {
    return null;
  }
}

export default async function Image() {
  const photo = atmosphere.homeStatement;
  const [font, jpeg] = await Promise.all([
    jost300(),
    readFile(join(process.cwd(), "public", photo.src)),
  ]);
  const src = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  const w = size.width - MARGIN * 2;
  const h = size.height - BAND - MARGIN;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
        }}
      >
        <div
          style={{
            height: BAND,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Jost",
            fontWeight: 300,
            fontSize: 56,
            letterSpacing: "0.34em",
            color: INK,
            // Trailing tracking would push the mark off centre (as on the site).
            marginRight: "-0.34em",
          }}
        >
          <span>AUBE</span>
          <span style={{ letterSpacing: 0, marginLeft: "-0.2em", marginRight: "-0.06em" }}>’</span>
          <span>MAR</span>
        </div>
        <div
          style={{
            display: "flex",
            width: w,
            height: h,
            marginLeft: MARGIN,
            background: SAND,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={src}
            width={w}
            height={h}
            style={{
              width: w,
              height: h,
              objectFit: "cover",
              objectPosition: `${photo.focal[0]}% ${photo.focal[1]}%`,
            }}
          />
        </div>
      </div>
    ),
    { ...size, ...(font ? { fonts: [font] } : {}) },
  );
}
