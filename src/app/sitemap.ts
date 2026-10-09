import type { MetadataRoute } from "next";
import { published } from "@/lib/estates";
import { site, UPDATED } from "@/lib/site";

/** Every public route except the enquiry confirmation. Static at build. */
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string) => `${site.url}${path}`;
  const lastModified = UPDATED;
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: at("/estates"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...published().map((e) => ({
      url: at(`/estates/${e.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: at("/house"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: at("/enquire"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: at("/colophon"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
