"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { film } from "@/data/atmosphere";

/**
 * The home hero film (brief 6.1.1 and 9), ported from
 * ~/get-work-abroad/components/home/HeroVideo.tsx.
 *
 * Layout is built in: desktop inset at the gutter, about 72vh tall, 65px
 * below the header, framed at 50/30 (round 2: the source is 1080p with a
 * shallow focus, so the crop keeps the sharp middle band and the horizon);
 * mobile edge to edge directly below the header, 4:5, framed at 50/60.
 * Nothing is written on it.
 *
 * - The graded poster is the first paint and the LCP: next/image, preload,
 *   fetchPriority high, quality 90.
 * - The <video> sources are attached only after requestIdleCallback, 720p
 *   under 768px, WebM then MP4, autoplay muted loop playsInline preload none.
 * - Skipped under prefers-reduced-motion, Save-Data, or 2g/3g.
 * - If play() is refused it retries once on the first interaction.
 * - The film cross-fades over the poster in 1500ms once it is playing.
 * - A 3.5% monochrome grain tile sits over the film (CSS, film only).
 */
const NAME = film.name;
const SOURCES = {
  desktop: [
    { src: `/video/${NAME}-1080.webm`, type: "video/webm" },
    { src: `/video/${NAME}-1080.mp4`, type: "video/mp4" },
  ],
  mobile: [
    { src: `/video/${NAME}-720.webm`, type: "video/webm" },
    { src: `/video/${NAME}-720.mp4`, type: "video/mp4" },
  ],
} as const;

type Tier = keyof typeof SOURCES;

export function HeroFilm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn && (conn.saveData || /(^|-)(2g|3g)$/.test(conn.effectiveType ?? ""))) return;

    const pick = () =>
      setTier(window.matchMedia("(min-width: 768px)").matches ? "desktop" : "mobile");
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(pick, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(pick, 1200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!tier || !v) return;
    v.load();

    let cleanup = () => {};
    v.play().catch(() => {
      const events = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
      const start = () => {
        cleanup();
        v.play().catch(() => {});
      };
      events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
      cleanup = () => events.forEach((e) => window.removeEventListener(e, start));
    });
    return () => cleanup();
  }, [tier]);

  return (
    <div className={`hero-film-wrap ${className}`}>
      <div className="hero-film">
        <Image
          src={film.poster}
          alt=""
          fill
          preload
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="hero-film-media"
        />
        <video
          ref={ref}
          className="hero-film-media hero-film-video"
          data-playing={playing ? "true" : "false"}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        >
          {tier
            ? SOURCES[tier].map((s) => <source key={s.src} src={s.src} type={s.type} />)
            : null}
        </video>
        <div className="grain" aria-hidden="true" />
      </div>
    </div>
  );
}
