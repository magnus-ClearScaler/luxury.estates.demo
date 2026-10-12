"use client";

import { useEffect, useRef, type ImgHTMLAttributes } from "react";
import { afterFirstPaint } from "@/lib/after-paint";

/**
 * A below-the-fold frame photograph whose request waits for the window `load`
 * event and the first paint (PSI pass 2: `load` can come before the first
 * frame is on screen). Native lazy loading on a phone starts five or six photographs at once
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
    let cancel = () => {};
    const onLoad = () => {
      cancel = afterFirstPaint(release);
    };
    if (document.readyState === "complete") {
      onLoad();
      return () => cancel();
    }
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cancel();
    };
  }, [src, srcSet]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} alt={alt} data-defer="" {...rest} />;
}
