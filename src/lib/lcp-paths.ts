/**
 * Paths of the phone-width first-screen photographs (scripts/lcp-images.mjs).
 * Self-contained (no `@/` imports) so the script can import it through
 * Node's type stripping.
 */
export const LCP_WIDTHS = [640, 750, 828] as const;
export const LCP_QUALITY = 74;

/** `/estates/x/01.jpg` at 750 -> `/lcp/estates/x/01-750.jpg`. */
export function lcpPath(src: string, width: number): string {
  return `/lcp${src.replace(/\.jpg$/, "")}-${width}.jpg`;
}
