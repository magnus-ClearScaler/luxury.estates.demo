/**
 * Atmosphere photographs deployed in v1 (brief 7.2), each in its file's native
 * orientation, all graded `soft`. Credits come from data/atmosphere.json.
 *
 * Imported by scripts/grade.mjs through Node's type stripping: keep it
 * self-contained (no `@/` imports, JSON with an explicit attribute).
 */
import credits from "../../data/atmosphere.json" with { type: "json" };
import videos from "../../data/video.json" with { type: "json" };

export type AtmosphereSlot =
  | "homeStatement"
  | "homeFeature"
  | "homeBand"
  | "houseWide"
  | "housePortrait"
  | "houseDetail"
  | "enquire"
  | "enquireSent"
  | "notFound"
  | "gate";

export type Atmosphere = {
  /** Basename without extension, as in assets/originals/atmosphere. */
  name: string;
  /** Served path after the grade step. */
  src: string;
  focal: readonly [number, number];
  alt: string;
  orientation: "portrait" | "landscape";
  width: number;
  height: number;
  grade: "soft";
};

type Credit = {
  file: string;
  subject: string;
  orientation: "portrait" | "landscape";
  width: number;
  height: number;
  credit: string;
  photographer: string;
  photographer_url: string;
  source_url: string;
  licence: string;
};

const all = credits as Credit[];

function a(name: string, focal: readonly [number, number], alt: string): Atmosphere {
  const c = all.find((x) => x.file === `/atmosphere/${name}.jpg`);
  if (!c) throw new Error(`Missing atmosphere credit for ${name}`);
  return {
    name,
    src: `/atmosphere/${name}.jpg`,
    focal,
    alt,
    orientation: c.orientation,
    width: c.width,
    height: c.height,
    grade: "soft",
  };
}

export const atmosphere: Record<AtmosphereSlot, Atmosphere> = {
  homeStatement: a("sailboat-beige-sea", [50, 55], "A distant sail on a pale sea"),
  homeFeature: a("pale-shutters-facade", [50, 40], "Pale facade with grey shutters"),
  homeBand: a("leaf-shadow-wall", [50, 50], "Leaf shadows on a sand coloured wall"),
  houseWide: a("stone-pine-solitary", [50, 40], "A single umbrella pine against a pale sky"),
  housePortrait: a("limestone-vault", [50, 35], "A whitewashed limestone vault"),
  houseDetail: a("shutter-light-on-wall", [50, 55], "Shutter light across a plaster wall"),
  enquire: a("boat-still-water-dawn", [50, 50], "A rowing boat on still water at dawn"),
  enquireSent: a("linen-curtain-backlit", [50, 50], "Morning light through a linen curtain"),
  notFound: a("sheer-curtain-window", [50, 50], "A sheer curtain at a tall window"),
  gate: a("terrace-sea-pale-morning", [50, 50], "A pale morning sea past a terrace wall"),
};

/** Deployed atmosphere files, deduplicated, for the grade step and the colophon. */
export const deployedAtmosphere: Atmosphere[] = Object.values(atmosphere).filter(
  (x, i, arr) => arr.findIndex((y) => y.name === x.name) === i,
);

/** Colophon rows: deployed atmosphere photographs, then the one film. */
export type CreditRow = { file: string; photographer: string; source: string; sourceUrl: string };

export const atmosphereCredits: CreditRow[] = deployedAtmosphere.map((x) => {
  const c = all.find((y) => y.file === x.src)!;
  return {
    file: `${x.name}.jpg`,
    photographer: c.photographer,
    source: "Unsplash",
    sourceUrl: c.source_url,
  };
});

type Video = { file: string; credit: string; source_url: string };

/** The hero film (brief 7.3); the other three clips are not deployed. */
export const film = (() => {
  const v = (videos as Video[]).find((x) => x.file === "/video/sea-surface-warm-dusk.mp4");
  if (!v) throw new Error("Missing hero film credit");
  return {
    name: "sea-surface-warm-dusk",
    poster: "/video/sea-surface-warm-dusk-poster.jpg",
    credit: {
      file: "sea-surface-warm-dusk.mp4",
      photographer: v.credit.replace(/^Video by /, "").replace(/ on Pexels$/, ""),
      source: "Pexels",
      sourceUrl: v.source_url,
    } satisfies CreditRow,
  };
})();
