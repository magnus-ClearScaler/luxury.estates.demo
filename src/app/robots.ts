import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Owner decision 2026-10-09: public and indexable. Allow all, point to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
