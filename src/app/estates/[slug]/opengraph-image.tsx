import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { bySlug, heroOf, published, srcOf } from "@/lib/estates";
import { NAME_DISPLAY } from "@/lib/site";

/**
 * Brief 11.2: the estate hero, no text, inset on paper with 40px margins like
 * the root card. Positioned from its focal point.
 */
export const alt = NAME_DISPLAY;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return published().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = bySlug(slug);
  if (!e) return new Response(null, { status: 404 });
  const hero = heroOf(e);
  const jpeg = await readFile(join(process.cwd(), "public", srcOf(e, hero)));
  const src = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  const M = 40;
  const w = size.width - M * 2;
  const h = size.height - M * 2;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6F2EB", padding: M }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={src}
          width={w}
          height={h}
          style={{
            width: w,
            height: h,
            background: "#E2D8C9",
            objectFit: "cover",
            objectPosition: `${hero.focal[0]}% ${hero.focal[1]}%`,
          }}
        />
      </div>
    ),
    size,
  );
}
