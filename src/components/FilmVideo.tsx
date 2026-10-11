"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero film's <video> (HeroFilm): the one part of the hero that needs the
 * browser.
 *
 * - Sources are attached only after requestIdleCallback, 720p under 768px,
 *   WebM then MP4, autoplay muted loop playsInline preload none.
 * - Skipped under prefers-reduced-motion, Save-Data, or 2g/3g.
 * - If play() is refused it retries once on the first interaction.
 * - It cross-fades over the poster in 1500ms once it is playing.
 */
type Tier = "desktop" | "mobile";

const sources = (name: string, tier: Tier) => {
  const h = tier === "desktop" ? 1080 : 720;
  return [
    { src: `/video/${name}-${h}.webm`, type: "video/webm" },
    { src: `/video/${name}-${h}.mp4`, type: "video/mp4" },
  ];
};

export function FilmVideo({ name }: { name: string }) {
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
      {tier ? sources(name, tier).map((s) => <source key={s.src} src={s.src} type={s.type} />) : null}
    </video>
  );
}
