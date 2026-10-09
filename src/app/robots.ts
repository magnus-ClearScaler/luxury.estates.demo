import type { MetadataRoute } from "next";

/** Brief 11.5: disallow all, no sitemap. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
