import { getImageProps } from "@/lib/image-props";
import type { CSSProperties } from "react";
import { preload as preloadResource } from "react-dom";
import { withStaticPhoneWidths } from "@/lib/lcp";
import { DeferredImg } from "./DeferredImg";

/** Brief 5: the only image ratios on the site. */
export const RATIOS = {
  wide: "1.62 / 1",
  portrait: "0.76 / 1",
  pano: "21 / 9",
  detail: "4 / 5",
  film: "16 / 9",
} as const;

export type Ratio = keyof typeof RATIOS;

export type FrameProps = {
  src: string;
  alt: string;
  /** Desktop (and default) ratio. */
  ratio: Ratio;
  /** Ratio under 768px, e.g. `detail` (4:5) for heroes on mobile. */
  mobileRatio?: Ratio;
  /** `[x%, y%]`, becomes `object-position`. Default 50/50. */
  focal?: readonly [number, number];
  /** Required: see brief 11.3 for the values per slot. */
  sizes: string;
  /** 90 on heroes, 85 elsewhere (both are declared in next.config). */
  quality?: 85 | 90;
  /** Eager loading: only the hero and the first row of each page. */
  eager?: boolean;
  /** Preload in <head>: only the page's LCP image. Implies eager. */
  preload?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * An aspect box on sand with an image inside it, covering, positioned from
 * the focal point. The image fades from the sand over 600ms once loaded (the
 * one entrance animation on the site; removed under reduced motion). The
 * head script (src/lib/head-script.ts) sets `data-loaded` when it loads, so the
 * fade does not wait for hydration and this stays a server component. Square,
 * no border, no shadow, nothing written on it.
 */
export function Frame({
  src,
  alt,
  ratio,
  mobileRatio,
  focal = [50, 50],
  sizes,
  quality = 85,
  eager = false,
  preload = false,
  className = "",
  style,
}: FrameProps) {
  const boxStyle = {
    "--ratio": RATIOS[ratio],
    ...(mobileRatio ? { "--ratio-mobile": RATIOS[mobileRatio] } : {}),
    ...style,
  } as CSSProperties;

  const objectPosition = `${focal[0]}% ${focal[1]}%`;

  if (preload) {
    // The page's LCP photograph: a plain <img> from getImageProps rather than
    // next/image (PSI pass 1), so the first paint needs no image component in
    // the browser, with its phone widths from static files (src/lib/lcp.ts).
    // The head script in layout.tsx handles the fade.
    const { props } = getImageProps({
      src,
      alt,
      fill: true,
      sizes,
      quality,
      preload: true,
      fetchPriority: "high",
      style: { objectPosition },
    });
    const srcSet = withStaticPhoneWidths(src, props.srcSet);
    preloadResource(props.src, {
      as: "image",
      imageSrcSet: srcSet,
      imageSizes: props.sizes,
      fetchPriority: "high",
    });
    return (
      <div className={`frame ${className}`} style={boxStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...props} srcSet={srcSet} />
      </div>
    );
  }

  if (eager) {
    // A plain <img> as well, inside a <picture> (laid out as `contents`, so
    // the frame CSS is unchanged): React preloads every eager <img> in the
    // server payload, and the not-found frame is in every page's payload; it
    // leaves images inside <picture> alone.
    const { props } = getImageProps({
      src,
      alt,
      fill: true,
      sizes,
      quality,
      loading: "eager",
      style: { objectPosition },
    });
    return (
      <div className={`frame ${className}`} style={boxStyle}>
        <picture>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...props} />
        </picture>
      </div>
    );
  }

  // Below the fold: the request waits for window `load` (DeferredImg), with
  // the plain image for visitors without JavaScript.
  const { props } = getImageProps({
    src,
    alt,
    fill: true,
    sizes,
    quality,
    loading: "lazy",
    style: { objectPosition },
  });
  return (
    <div className={`frame ${className}`} style={boxStyle}>
      <DeferredImg {...props} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...props} style={{ ...props.style, objectFit: "cover" }} />
      </noscript>
    </div>
  );
}
