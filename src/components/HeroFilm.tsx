import { getImageProps } from "@/lib/image-props";
import { preload } from "react-dom";
import { film } from "@/data/atmosphere";
import { withStaticPhoneWidths } from "@/lib/lcp";
import { FilmVideo } from "./FilmVideo";

/**
 * The home hero film (brief 6.1.1 and 9), ported from
 * ~/get-work-abroad/components/home/HeroVideo.tsx.
 *
 * Layout is built in: desktop inset at the gutter, about 44vh tall (340 to
 * 420px; owner round 2, fix pass 2), 32px below the header, framed at 50/35
 * (round 3: the 2560 x 1440 aerial `sea-pale-horizon`, horizon at about two
 * fifths of the box); mobile edge to edge directly below the header, 1:1,
 * framed at 50/60.
 * Nothing is written on it.
 *
 * - The graded poster is the first paint and the LCP: preloaded, fetchPriority
 *   high, quality 90. A server-rendered <img> (PSI pass 1), so the first paint
 *   needs no JavaScript; its phone widths are static files (src/lib/lcp.ts).
 * - The film itself is the one client part (FilmVideo): sources attached
 *   after requestIdleCallback, cross-faded over the poster once playing.
 * - A 3.5% monochrome grain tile sits over the film (CSS, film only: the tile
 *   is requested once the film plays).
 */
export function HeroFilm({ className = "" }: { className?: string }) {
  const { props } = getImageProps({
    src: film.poster,
    alt: "",
    fill: true,
    loading: "eager",
    fetchPriority: "high",
    quality: 90,
    sizes: "100vw",
    className: "hero-film-media",
  });
  const srcSet = withStaticPhoneWidths(film.poster, props.srcSet);
  preload(props.src, { as: "image", imageSrcSet: srcSet, imageSizes: props.sizes, fetchPriority: "high" });

  return (
    <div className={`hero-film-wrap ${className}`}>
      <div className="hero-film">
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...props} srcSet={srcSet} />
        <FilmVideo name={film.name} />
        <div className="grain" aria-hidden="true" />
      </div>
    </div>
  );
}
