import { estates, photoSrc, type Estate, type Photo, type Region } from "@/data/estates";

export type { Estate, Photo, Region };
export { photoSrc };

/** Published houses in index order (brief 7 table). */
export function published(): Estate[] {
  return estates.filter((e) => e.published);
}

/** Published slugs in index order. */
export const indexOrder: string[] = published().map((e) => e.slug);

/** A published house by our slug, or undefined. */
export function bySlug(slug: string): Estate | undefined {
  return published().find((e) => e.slug === slug);
}

/** The next published house in index order, wrapping at the end. */
export function next(slug: string): Estate {
  const list = published();
  const i = list.findIndex((e) => e.slug === slug);
  return list[(i + 1) % list.length];
}

export const regionLabel: Record<Region, string> = {
  mer: "Bord de mer",
  collines: "Collines",
};

/** The two index groups, in order, each with its published houses. */
export function groups(): { region: Region; label: string; estates: Estate[] }[] {
  return (["mer", "collines"] as const).map((region) => ({
    region,
    label: regionLabel[region],
    estates: published().filter((e) => e.region === region),
  }));
}

const PRICE_ON_REQUEST_FROM = 20_000_000;

/** `1,300` style grouping. */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-GB");
}

/**
 * Price as shown. Below €20,000,000 the figure (`€9,900,000`); at and above it
 * `Price on request` on the index and estate intro, `On request` in Particulars.
 */
export function priceDisplay(e: Estate, where: "index" | "particulars" = "index"): string {
  if (e.priceEur >= PRICE_ON_REQUEST_FROM) {
    return where === "particulars" ? "On request" : "Price on request";
  }
  return `€${formatNumber(e.priceEur)}`;
}

/** `5 bedrooms · 400 m² · 1,300 m² of land`; the land part omitted when null. */
export function specLine(e: Estate): string {
  const parts: string[] = [];
  if (e.beds != null) parts.push(`${e.beds} bedrooms`);
  if (e.living != null) parts.push(`${formatNumber(e.living)} m²`);
  if (e.land != null) parts.push(`${formatNumber(e.land)} m² of land`);
  return parts.join(" · ");
}

/** Estate intro eyebrow, `Èze, Bord de mer` (set in caps by the eyebrow style). */
export function placeLine(e: Estate): string {
  return `${e.town}, ${regionLabel[e.region]}`;
}

/** `Built` value: `2025`, or `About 1900` where the source gives c. 1900. */
export function builtDisplay(e: Estate): string | null {
  if (e.built == null) return null;
  return e.builtApprox ? `About ${e.built}` : String(e.built);
}

/** The opening image (gallery entry with `frame: "hero"`). */
export function heroOf(e: Estate): Photo {
  const h = e.gallery.find((p) => p.frame === "hero");
  if (!h) throw new Error(`No hero for ${e.slug}`);
  return h;
}

/** The sequence after the hero, in order, each with its own frame. */
export function sequenceOf(e: Estate): Photo[] {
  return e.gallery.filter((p) => p.frame !== "hero");
}

/** Served path of one gallery photo of a house. */
export function srcOf(e: Estate, p: Photo): string {
  return photoSrc(e.slug, p.file);
}

/**
 * Particulars rows (brief 6.3.5), null rows omitted, nine at most. Land is
 * omitted for the apartment because its value is null.
 */
export function particulars(e: Estate): { term: string; value: string }[] {
  const rows: [string, string | null][] = [
    ["Reference", e.reference],
    ["Type", e.type],
    ["Living area", e.living != null ? `${formatNumber(e.living)} m²` : null],
    ["Land", e.land != null ? `${formatNumber(e.land)} m²` : null],
    ["Bedrooms", e.beds != null ? String(e.beds) : null],
    ["Bathrooms", e.baths != null ? String(e.baths) : null],
    ["Built", builtDisplay(e)],
    ["Outlook", e.outlook],
    ["Price", priceDisplay(e, "particulars")],
  ];
  return rows.filter((r): r is [string, string] => r[1] != null).map(([term, value]) => ({ term, value }));
}

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

/** `Nine`; the count word used in copy comes from the data. */
export function countWord(n: number = published().length): string {
  return WORDS[n] ?? String(n);
}
