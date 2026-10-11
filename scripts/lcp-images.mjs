#!/usr/bin/env node
/**
 * Phone-width copies of the first-screen photographs (PSI pass 1). A local
 * script, like grade.mjs: its outputs in public/lcp/ are committed.
 *
 *   node --no-warnings scripts/lcp-images.mjs
 *
 * The photograph a page preloads (the film poster on Home, each house's hero
 * on its page and on the /estates row, the wide frame on /house) is served at
 * 640, 750 and 828px from these static files instead of /_next/image, so the
 * first paint never waits for the image optimizer to encode, and it decodes
 * as a JPEG, which is quicker than AVIF on a phone. Wider candidates still go
 * through /_next/image. `src/lib/lcp.ts` builds the srcset and falls back to
 * /_next/image for any width whose file is missing.
 *
 * Reads   public/<path>.jpg (the graded files, grade.mjs)
 * Writes  public/lcp/<path>-<width>.jpg, JPEG q74 mozjpeg (side by side at 2x with the q90 AVIF from /_next/image, no visible difference)
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { atmosphere, film } from "../src/data/atmosphere.ts";
import { estates, photoSrc } from "../src/data/estates.ts";
import { LCP_QUALITY, LCP_WIDTHS, lcpPath } from "../src/lib/lcp-paths.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const sources = new Set([film.poster, atmosphere.houseWide.src]);
for (const e of estates) {
  if (!e.published) continue;
  for (const p of e.gallery) if (p.frame === "hero") sources.add(photoSrc(e.slug, p.file));
  if (e.indexFrame) sources.add(photoSrc(e.slug, e.indexFrame.file));
}

let bytes = 0;
for (const src of sources) {
  for (const w of LCP_WIDTHS) {
    const out = join(root, "public", lcpPath(src, w));
    mkdirSync(dirname(out), { recursive: true });
    const info = await sharp(join(root, "public", src))
      .resize(w, undefined, { withoutEnlargement: true })
      .jpeg({ quality: LCP_QUALITY, mozjpeg: true })
      .toFile(out);
    bytes += info.size;
    if (!existsSync(out)) throw new Error(`not written: ${out}`);
  }
}
console.log(`${sources.size} photographs, ${sources.size * LCP_WIDTHS.length} files, ${Math.round(bytes / 1024)} KB`);
