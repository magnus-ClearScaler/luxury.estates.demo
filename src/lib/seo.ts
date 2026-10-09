import type { Metadata } from "next";
import { NAME_DISPLAY } from "./site";

/** Root card (src/app/opengraph-image.tsx), for routes with no image of their own. */
const ROOT_OG_IMAGE = [{ url: "/opengraph-image", width: 1200, height: 630, alt: NAME_DISPLAY }];

/**
 * Title, description, canonical and Open Graph for one route. Metadata merges
 * shallowly, so a page `openGraph` replaces the layout's: siteName, locale and
 * type are set here every time. `ownImage` is for a segment with its own
 * opengraph-image file (estate pages): `images` must then stay unset or the
 * file loses. Twitter tags fill themselves from Open Graph.
 */
export function pageMeta({
  path,
  title,
  description,
  absoluteTitle = false,
  ownImage = false,
  index = true,
}: {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  ownImage?: boolean;
  index?: boolean;
}): Metadata {
  if (description.length > 160) {
    throw new Error(`Meta description over 160 characters on ${path} (${description.length})`);
  }
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: NAME_DISPLAY,
      locale: "en_GB",
      ...(ownImage ? {} : { images: ROOT_OG_IMAGE }),
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
