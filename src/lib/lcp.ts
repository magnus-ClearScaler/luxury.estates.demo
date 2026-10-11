import { existsSync } from "node:fs";
import { join } from "node:path";
import { LCP_WIDTHS, lcpPath } from "./lcp-paths";

/**
 * A /_next/image srcset with its phone widths (640, 750, 828) pointed at the
 * static copies from scripts/lcp-images.mjs (PSI pass 1). A width whose file
 * is missing keeps its /_next/image URL, so a new photograph still works
 * before the script is run again. Server only: runs at build time.
 */
export function withStaticPhoneWidths(src: string, srcSet: string | undefined): string | undefined {
  if (!srcSet) return srcSet;
  return srcSet
    .split(", ")
    .map((entry) => {
      const [, descriptor] = entry.split(" ");
      const w = Number(descriptor?.replace(/w$/, ""));
      if (!(LCP_WIDTHS as readonly number[]).includes(w)) return entry;
      const path = lcpPath(src, w);
      return existsSync(join(process.cwd(), "public", path)) ? `${path} ${descriptor}` : entry;
    })
    .join(", ");
}
