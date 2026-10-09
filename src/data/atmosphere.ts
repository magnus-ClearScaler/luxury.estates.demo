/**
 * Atmosphere photographs deployed in v1 (brief 7.2), each in its file's native
 * orientation. Graded `soft` unless the slot says otherwise (round 1 moved the
 * cool or saturated frames to `standard` or `warm`). Credits come from
 * data/atmosphere.json.
 *
 * Round 1 (owner): Home shows the houses, so the feature portrait and the
 * linen band are estate photographs (src/lib/copy.ts); the sailboat is the
 * one atmosphere frame left on Home.
 *
 * Imported by scripts/grade.mjs through Node's type stripping: keep it
 * self-contained (no `@/` imports, JSON with an explicit attribute).
 */
import credits from "../../data/atmosphere.json" with { type: "json" };
import videos from "../../data/video.json" with { type: "json" };
import type { Extract, Grade, Tune } from "./estates";

export type AtmosphereSlot =
  | "homeStatement"
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
  grade: Grade;
  extract?: Extract;
  tune?: Tune;
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

function a(
  name: string,
  focal: readonly [number, number],
  alt: string,
  more: { grade?: Grade; extract?: Extract; tune?: Tune } = {},
): Atmosphere {
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
    grade: more.grade ?? "soft",
    extract: more.extract,
    tune: more.tune,
  };
}

export const atmosphere: Record<AtmosphereSlot, Atmosphere> = {
  homeStatement: a("sailboat-beige-sea", [50, 55], "A distant sail on a pale sea"),
  // Standard, with the highlights held down and a neutral red row, so the
  // overcast sky lands near chalk rather than white (or peach) on the paper.
  houseWide: a("stone-pine-solitary", [50, 40], "A single umbrella pine against a pale sky", {
    grade: "standard",
    tune: { red: [0.99, 0.03, 0], linear: [0.86, 22] },
  }),
  // The top 76% of the file cut to a 0.76 box: the rubble floor falls away
  // in the grade step, not with a CSS transform.
  housePortrait: a("limestone-vault", [50, 50], "A whitewashed limestone vault", {
    grade: "standard",
    extract: [0.115, 0, 0.77, 0.76],
  }),
  houseDetail: a("shutter-light-on-wall", [50, 55], "Shutter light across a plaster wall", {
    grade: "warm",
    tune: { linear: [0.88, 30] },
  }),
  // Focal 50/65: the grey water and the boat carry the crop, not the sky.
  enquire: a("boat-still-water-dawn", [50, 65], "A rowing boat on still water at dawn", { grade: "standard" }),
  enquireSent: a("linen-curtain-backlit", [50, 50], "Morning light through a linen curtain"),
  notFound: a("sheer-curtain-window", [50, 50], "A sheer curtain at a tall window", {
    grade: "warm",
    tune: { linear: [0.9, 20] },
  }),
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
