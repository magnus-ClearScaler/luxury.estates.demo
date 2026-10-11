import type { ImageProps } from "next/image";
import { getImgProps } from "next/dist/shared/lib/get-img-props";
import type { ImageConfigComplete } from "next/dist/shared/lib/image-config";
import defaultLoader from "next/dist/shared/lib/image-loader";

/**
 * `getImageProps` from next/image, without importing next/image (PSI pass 1).
 * Importing that module from a server component, even for this one helper,
 * puts the client <Image> component in every page's browser bundle; this is
 * the same function (next/dist/shared/lib/image-external.js, Next 16.2),
 * reading the same images config from next.config.ts.
 */
export function getImageProps(imgProps: ImageProps) {
  const { props } = getImgProps(imgProps, {
    defaultLoader,
    // Replaced at build time with the images config, as in next/image.
    imgConf: process.env.__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete,
  });
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) delete (props as Record<string, unknown>)[key];
  }
  return { props };
}
