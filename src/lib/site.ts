/** Name as stored in data and code (straight apostrophe). */
export const NAME = "Aube'Mar";
/** Name as rendered: always U+2019. */
export const NAME_DISPLAY = "Aube’Mar";
export const SLUG = "aubemar";

export const site = {
  name: NAME,
  displayName: NAME_DISPLAY,
  /** The one office line (drawer, The House). */
  office: "Saint-Jean-Cap-Ferrat, by appointment.",
  description: "A few houses on the Côte d'Azur, shown by appointment.",
  url: "https://aubemar-demo.vercel.app",
  clearscalerUrl: "https://clearscaler.com",
} as const;

/** Last content change, for the sitemap. Move it when the houses change. */
export const UPDATED = new Date("2026-10-09");

/** Drawer items, in order (brief 5.2). */
export const nav = [
  { label: "Estates", href: "/estates" },
  { label: "The House", href: "/house" },
  { label: "Enquire", href: "/enquire" },
] as const;

/** Footer column 3 (brief 5.3). */
export const houseLinks = [
  { label: "The House", href: "/house" },
  { label: "Enquire", href: "/enquire" },
  { label: "Colophon", href: "/colophon" },
] as const;
