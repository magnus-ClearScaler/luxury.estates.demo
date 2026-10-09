"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

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
 * An aspect box on sand with a next/image inside it, covering, positioned from
 * the focal point. The image fades from the sand over 600ms once loaded (the
 * one entrance animation on the site; removed under reduced motion). Square,
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
  const [loaded, setLoaded] = useState(false);
  const boxStyle = {
    "--ratio": RATIOS[ratio],
    ...(mobileRatio ? { "--ratio-mobile": RATIOS[mobileRatio] } : {}),
    ...style,
  } as CSSProperties;

  return (
    <div className={`frame ${className}`} style={boxStyle}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload ? undefined : eager ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : undefined}
        style={{ objectPosition: `${focal[0]}% ${focal[1]}%` }}
        data-loaded={loaded ? "true" : "false"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
