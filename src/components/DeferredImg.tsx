"use client";

import { useEffect, useRef, type ImgHTMLAttributes } from "react";

/**
 * A below-the-fold frame photograph whose request waits for the window `load`
 * event. Native lazy loading on a phone starts five or six photographs at once
 * with the first screen's own image; holding them until `load` keeps the first
 * screen's bytes to itself. Once `srcset` and `src` are set, native
 * `loading="lazy"` takes over as usual. The 600ms fade from sand
 * (globals.css) hides the timing. After a client navigation the document is
 * already loaded, so the photograph is released at once.
 *
 * `src` and `srcSet` stay out of React's props on purpose: they are set on the
 * element directly, so React never renders them on the server or resets them.
 */
export function DeferredImg({ src, srcSet, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img || typeof src !== "string") return;
    const release = () => {
      if (srcSet) img.srcset = srcSet;
      img.src = src;
    };
    if (document.readyState === "complete") {
      release();
      return;
    }
    window.addEventListener("load", release, { once: true });
    return () => window.removeEventListener("load", release);
  }, [src, srcSet]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} alt={alt} data-defer="" {...rest} />;
}
