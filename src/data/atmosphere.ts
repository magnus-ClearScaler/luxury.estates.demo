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
  /** JPEG quality of the graded file; 84 unless set. */
  quality?: number;
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
  more: { grade?: Grade; extract?: Extract; tune?: Tune; quality?: number } = {},
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
    quality: more.quality,
  };
}

export const atmosphere: Record<AtmosphereSlot, Atmosphere> = {
  // Round 2: graded from the full 5184px Unsplash original at q88; the
  // earlier 2560px copy showed block steps in the 21:9 sky at 1440.
  homeStatement: a("sailboat-beige-sea", [50, 55], "A distant sail on a pale sea", { quality: 88 }),
  // Standard, with the highlights held down and a neutral red row, so the
  // overcast sky lands near chalk rather than white (or peach) on the paper.
  // Round 2: saturation .5 and a lower green row take the canopy to olive.
  houseWide: a("stone-pine-solitary", [50, 40], "A single umbrella pine against a pale sky", {
    grade: "standard",
    tune: { red: [0.99, 0.03, 0], green: [0.03, 0.94, 0.03], linear: [0.86, 22], saturation: 0.5 },
  }),
  // The top 76% of the file cut to a 0.76 box: the rubble floor falls away
  // in the grade step, not with a CSS transform.
  // Round 2: saturation .6, hue +5 and a neutral red row, so the vault reads
  // as limestone, not rose plaster.
  housePortrait: a("limestone-vault", [50, 50], "A whitewashed limestone vault", {
    grade: "standard",
    extract: [0.115, 0, 0.77, 0.76],
    tune: { saturation: 0.6, hue: 5, red: [0.99, 0.03, 0] },
  }),
  // Round 2: lifted, so the wall reads warm off-white with a crisp stripe.
  // Round 3: still grey-mauve with a dark top right corner. Cut to the lower
  // 62% (the stripes sit high in the 4:5 and the dark corner falls away),
  // saturation .5, hue +6 and a warmer red row, and the shadows lifted hard
  // (linear .82, 52) so the wall reads warm off-white beside the vault.
  houseDetail: a("shutter-light-on-wall", [50, 50], "Shutter light across a plaster wall", {
    grade: "warm",
    extract: [0.1, 0.38, 0.9, 0.62],
    tune: { brightness: 1.3, linear: [0.82, 52], saturation: 0.5, hue: 6, red: [1.01, 0.05, 0.01] },
  }),
  // Focal 50/65: the grey water and the boat carry the crop, not the sky.
  // Round 3: the `standard` grade left the upper sky grey-green beside the
  // paper. The `warm` preset (its lower green row and lift) at saturation .3
  // lands it on grey beige, as the sailboat.
  enquire: a("boat-still-water-dawn", [50, 65], "A rowing boat on still water at dawn", {
    grade: "warm",
    tune: { saturation: 0.3, hue: 0, brightness: 1.04 },
  }),
  // Round 2: the quietest frame on the site, not the loudest: saturation .5
  // and the shadows lifted. Round 3: the left 60% only, so the pale backlit
  // linen fills the frame and the heavy dark-brown right third is gone.
  enquireSent: a("linen-curtain-backlit", [50, 50], "Morning light through a linen curtain", {
    extract: [0, 0, 0.6, 1],
    tune: { saturation: 0.42, linear: [0.88, 24] },
  }),
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

/**
 * The hero film (brief 7.3); the other three clips are not deployed. Round 3:
 * the 2560 x 1440 aerial `sea-pale-horizon` replaces `sea-surface-warm-dusk`,
 * which exists only at 1080p with a shallow focus and stayed soft at 1440
 * (scripts/encode-video.sh).
 */
export const film = (() => {
  const v = (videos as Video[]).find((x) => x.file === "/video/sea-pale-horizon.mp4");
  if (!v) throw new Error("Missing hero film credit");
  return {
    name: "sea-pale-horizon",
    poster: "/video/sea-pale-horizon-poster.jpg",
    credit: {
      file: "sea-pale-horizon.mp4",
      photographer: v.credit.replace(/^Video by /, "").replace(/ on Pexels$/, ""),
      source: "Pexels",
      sourceUrl: v.source_url,
    } satisfies CreditRow,
  };
})();
