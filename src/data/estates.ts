/**
 * The twenty-two houses, typed. Eleven are published (index order below, owner
 * round 2: in order of how beautiful the house is in its best frame); eleven
 * are held (`published: false`) so nothing from the research is lost.
 *
 * `type`, `short`, `long`, `features`, `source_url`, `source_agency` and the
 * agency `ref` come unchanged from data/listings-*.json (brief 7). The only
 * override is the Mas Blanc feature line (brief 7, rules).
 *
 * This module is also imported by scripts/grade.mjs through Node's type
 * stripping, so it must stay self-contained: no `@/` imports, no enums, and
 * JSON imported with an explicit attribute.
 */
import east from "../../data/listings-east.json" with { type: "json" };
import west from "../../data/listings-west.json" with { type: "json" };
import newEast from "../../data/listings-new-east.json" with { type: "json" };
import newWest from "../../data/listings-new-west.json" with { type: "json" };

export type Region = "mer" | "collines";
export type Frame = "hero" | "wide" | "portrait" | "detail";
export type Grade = "soft" | "standard" | "garden" | "strong" | "warm" | "interior";
/** `[x%, y%]`, used as CSS `object-position`. */
export type Focal = readonly [number, number];

/**
 * A box cut from the source before it is resized, as fractions of the source
 * `[left, top, width, height]`. Used where a crop by `focal` alone cannot hold
 * a detail or lose something banned (scripts/grade.mjs).
 */
export type Extract = readonly [number, number, number, number];

/** Per-image corrections on top of the preset (scripts/grade.mjs). */
export type Tune = {
  /** Replaces the preset's hue rotation, in degrees. */
  hue?: number;
  /** Replaces the preset's red recomb row. */
  red?: readonly [number, number, number];
  /** Replaces the preset's green recomb row. */
  green?: readonly [number, number, number];
  /** Replaces the preset's blue recomb row. */
  blue?: readonly [number, number, number];
  /** Replaces the preset's `linear(a, b)`. */
  linear?: readonly [number, number];
  /** Replaces the preset's modulate saturation. */
  saturation?: number;
  /** Replaces the preset's modulate brightness. */
  brightness?: number;
  /**
   * Graduated sky pass (round 2): the bright pixels of the upper frame are
   * moved, texture kept, so the mean of the top 12% lands on the one sky
   * target. `true` for full strength, or a strength between 0 and 1.
   */
  sky?: boolean | number;
  /** `false` turns off the hue-selective cyan pass the listing presets run. */
  cyan?: boolean;
  /** Round 3: replaces the sharpen sigma (.4); 0 for no sharpening. */
  sharpen?: number;
  /** Round 3: strength (0 to 1) of the pink pass, which mutes magenta and maroon. */
  pink?: number;
  /**
   * Owner round 2 fix pass: the sky mask's luminance ramp, `[from, to]`
   * (default `[0.42, 0.66]`). Lowered where a deep blue sky grades to slate and
   * falls outside the mask (Villa Camille 02 and 01).
   */
  skyLum?: readonly [number, number];
  /**
   * Fix pass 2: a box (`[left, top, width, height]`, fractions of the graded
   * frame) where the cyan pass is firmer and reaches deep blue, for a pool
   * that stays blue under the preset (Villa Blanche 02 and 03). Replaces the
   * global saturation cuts that greyed the pines and the stone.
   */
  pool?: readonly [number, number, number, number];
};

/**
 * Round 3 retouch (scripts/grade.mjs `retouch`): `to` (`[left, top, width,
 * height]`, fractions of the source) is covered, with a feathered edge, by
 * the clean area whose top left corner is `from`, or, without `from`, by a
 * median-filtered copy of itself (which takes out a thin contrail or wire).
 */
export type Patch = { from?: readonly [number, number]; to: readonly [number, number, number, number] };

export type Photo = {
  /** File number in the source folder, also the served name: `01` → `/estates/<slug>/01.jpg`. */
  file: string;
  frame: Frame;
  focal: Focal;
  grade: Grade;
  alt: string;
  extract?: Extract;
  tune?: Tune;
  patches?: readonly Patch[];
};

type SourceListing = {
  slug: string;
  title: string;
  town: string;
  area: string;
  type: string;
  price_eur: number;
  price_display: string;
  beds: number | null;
  baths: number | null;
  living_m2: number | null;
  land_m2: number | null;
  year_built: number | null;
  features: string[];
  sea_view: boolean;
  short: string;
  long: string;
  photos: string[];
  source_url: string;
  source_agency: string;
  ref: string;
};

export type Estate = {
  /** Our slug, used for the route and the graded image folder. */
  slug: string;
  /** Folder name under assets/originals/listings. */
  sourceSlug: string;
  /** Our reference, `AM-0101` onwards in index order; null for held houses. */
  reference: string | null;
  published: boolean;
  name: string;
  town: string;
  region: Region;
  type: string;
  priceEur: number;
  beds: number | null;
  baths: number | null;
  living: number | null;
  land: number | null;
  built: number | null;
  /** Renders `About 1900` instead of `1900`. */
  builtApprox: boolean;
  /** Per-house Outlook string (brief 7 table), never derived from sea_view. */
  outlook: string | null;
  short: string;
  long: string;
  features: string[];
  sourceUrl: string;
  sourceAgency: string;
  /** The listing agency's own reference. */
  agencyRef: string;
  /** Hero first (`frame: "hero"`), then the sequence in order. Empty for held houses. */
  gallery: Photo[];
  /**
   * Round 3: the gallery file shown on the /estates row instead of the hero,
   * where the hero has no building in it. The estate page still opens on the
   * hero.
   */
  indexFrame?: { file: string; focal: Focal };
};

const sources = [
  ...(east as SourceListing[]),
  ...(west as SourceListing[]),
  ...(newEast as SourceListing[]),
  ...(newWest as SourceListing[]),
];

function source(slug: string): SourceListing {
  const s = sources.find((l) => l.slug === slug);
  if (!s) throw new Error(`Missing source listing ${slug}`);
  return s;
}

type Own = {
  slug: string;
  sourceSlug: string;
  reference: string | null;
  published: boolean;
  region: Region;
  outlook: string | null;
  builtApprox?: boolean;
  /** Replaces the source features list; used for Mas Blanc only (brief 7, rules). */
  features?: string[];
  gallery: Photo[];
  indexFrame?: { file: string; focal: Focal };
};

function p(
  file: string,
  frame: Frame,
  focal: Focal,
  grade: Grade,
  alt: string,
  more: { extract?: Extract; tune?: Tune; patches?: readonly Patch[] } = {},
): Photo {
  return { file, frame, focal, grade, alt, ...more };
}

/**
 * Blue sky originals that the warm red row and a negative hue push towards
 * lilac (Maison Edouard 01, 02, 12; Villa Cap Fleuri 01). Aimed at the neutral
 * grey beige sky of Maison des Collines 01.
 */
const NEUTRAL_SKY: Tune = { hue: 3, red: [0.99, 0.06, 0.01] };

/**
 * Round 2: every hero takes the graduated sky pass, so the nine skies on
 * /estates meet on one warm grey (scripts/grade.mjs, SKY_TARGET #D8D4CB).
 */
const SKY: Tune = { sky: true };

/** Round 2: Villa Cap Fleuri was graded milky; its contrast is held at .93/10. */
const CAP_FLEURI: Tune = { linear: [0.93, 10] };

/**
 * Round 2 interior corrections on top of the `interior` preset, so a white
 * wall lands on the same cream across houses: Collines' cool originals take a
 * little more red, Vignes' and Mas Blanc's warm ones a little more blue.
 */
const COLLINES_WALLS: Tune = { red: [1.0, 0.04, 0], brightness: 1.08 };
const VIGNES_WALLS: Tune = { blue: [0.02, 0.07, 0.92], brightness: 1.08 };
const BASTIDE_WALLS: Tune = { blue: [0.02, 0.06, 0.92] };

/**
 * Round 3: the Bastide garden frames read as HDR beside Mas Blanc and Domaine
 * des Vignes (crunchy foliage, yellow-green lawns). Less saturation, a lower
 * green row, flatter contrast, hue +4 so the lower green does not turn the
 * skies lilac, and no sharpening over the halos already in the files. The
 * copper beech (07) and the hydrangeas (10) also take the pink pass.
 */
const BASTIDE_GARDEN: Tune = {
  saturation: 0.38,
  green: [0.03, 0.92, 0.03],
  linear: [0.86, 22],
  hue: 4,
  sharpen: 0,
};
/**
 * Owner round 2: Bastide du Ciel's files are flat HDR (crunchy foliage, a
 * render-like ochre). Less saturation, flatter contrast and no sharpening over
 * the halos (as BASTIDE_GARDEN). The brief's hue +4 turned the skies lilac on
 * the sheet (no lower green row here to offset it), so hue 0 and a neutral
 * red row; the frames with open sky take a light sky pass too (CIEL_SKY).
 * Fix pass: at .42 and linear .88/18 the set was the most milky and pink on
 * the site, lighter and flatter than Mas Blanc; .55 and .95/8 now.
 * Fix pass 2: still milky and pinkish beside Le Mas Rose. Every Ciel frame
 * now runs on `standard` (Le Mas Rose's preset) instead of `warm`, at
 * saturation .58, a less lifted black point (.95/6) and a less red row, so
 * the greens are as dense as Mas Rose 01 and the ochre is not pink.
 */
const CIEL: Tune = { saturation: 0.58, linear: [0.95, 6], red: [0.96, 0.07, 0.03], sharpen: 0 };
const CIEL_SKY: Tune = { ...CIEL, sky: 0.6 };

const own: Own[] = [
  // Owner round 2 (villas first, brief R2.1): eleven houses in order of how
  // beautiful the house is in its best frame. Every one opens on the house.
  {
    slug: "mas-blanc-mougins",
    sourceSlug: "mas-blanc-mougins",
    reference: "AM-0101",
    published: true,
    region: "collines",
    outlook: "Hills and garden",
    features: [
      "Fully renovated",
      "White walls in natural pigments",
      "Stone floors and raw timber",
      "Master suite with study and dressing room",
      "Spa with gym, sauna and hammam",
      "Wine cellar",
      "Large pool with pool house",
      "Boules court",
    ],
    gallery: [
      // R2.5.2: the drone comes forward so the house is seen twice before
      // the rooms; 03 comes back cut left of the kitchen, so the page no
      // longer ends on a detail.
      p("01", "hero", [50, 55], "standard", "White house above a reflecting pool", { tune: SKY }),
      p("02", "wide", [50, 50], "strong", "The pool from above", { extract: [0, 0.22, 1, 0.78] }),
      p("07", "portrait", [50, 50], "standard", "Linen pergola"),
      p("05", "portrait", [40, 50], "interior", "Bedroom with an arched window", {
        tune: { blue: [0.02, 0.06, 0.925] },
      }),
      p("04", "detail", [50, 50], "interior", "Timber beams", {
        extract: [0.4, 0.02, 0.26, 0.46],
        tune: { blue: [0.02, 0.06, 0.915] },
      }),
      // The brief's [0, 0, .7, 1] still showed the bar stools at its right
      // edge: cut to the left 60%, at about 1.62, so nothing is cropped again.
      p("03", "wide", [50, 50], "interior", "Dining room open to the garden", {
        extract: [0, 0.2, 0.6, 0.6],
        tune: { blue: [0.02, 0.06, 0.925] },
      }),
    ],
  },
  {
    slug: "bastide-des-oliviers-vence",
    sourceSlug: "bastide-des-oliviers-vence",
    reference: "AM-0102",
    published: true,
    region: "collines",
    outlook: "Garden and hills",
    gallery: [
      // Fix pass 2: the hero is also the Home statement image (21:9 at
      // 65/40). It was yellower than its neighbours and haloed along the
      // tree line: no sharpening and cooler red and blue rows. 07, the top
      // down drone, is dropped (roofs, a near white pool, a teal tarp); 02,
      // the long pool with the bastide behind, comes second.
      p("01", "hero", [65, 50], "garden", "The bastide across its lawn, among old olives", {
        tune: { ...SKY, sharpen: 0, red: [0.95, 0.07, 0.03], blue: [0.05, 0.11, 0.82] },
      }),
      // At .32 the pool went almost white and the frame read as a sepia
      // print. The lower half of the empty pool is cut and the saturation
      // is .7, so the pool reads grey green and the stone and ivy keep
      // their colour.
      p("02", "wide", [50, 60], "garden", "The long pool, the pool house and the bastide", {
        extract: [0, 0, 1, 0.8],
        tune: { ...SKY, saturation: 0.7 },
      }),
      p("03", "portrait", [40, 50], "garden", "Vine pergola along the house"),
      // Cut above the sill and its debris.
      p("05", "portrait", [45, 50], "garden", "The garden through an open shutter", {
        extract: [0.1, 0, 0.8, 0.86],
      }),
      // Fix pass 2: 65/45 moves the standing lamp at the left out of the crop.
      p("08", "detail", [65, 45], "interior", "Arched windows in the vaulted salon", { tune: { pink: 0.6 } }),
    ],
  },
  {
    slug: "les-arcades-ramatuelle",
    sourceSlug: "les-arcades-ramatuelle",
    reference: "AM-0103",
    published: true,
    region: "mer",
    outlook: "Sea and pines",
    gallery: [
      // Slightly soft at 100%, so a firmer sharpen than the default .4.
      p("02", "hero", [50, 45], "standard", "The path between cypresses to the ivy covered door", {
        tune: { ...SKY, sharpen: 0.6 },
      }),
      // Fix pass: the page ends on 01, the whole house, not on 03, where the
      // house is small in a wide aerial of pines.
      p("03", "wide", [50, 55], "garden", "The house among the umbrella pines", { tune: { saturation: 0.45 } }),
      p("07", "portrait", [45, 50], "standard", "Arched loggias above the yuccas"),
      p("08", "portrait", [40, 50], "strong", "Pergola table facing the sea"),
      p("06", "detail", [25, 50], "strong", "A single umbrella pine over the pool and the sea", {
        // The infinity pool stayed teal at .42: .3.
        tune: { saturation: 0.3 },
      }),
      // The empty upper sky and, below 88%, the car court and the solar
      // panels fall away. Fix pass: a red car on a drive at the far left
      // edge, about 45% down: the left 10% is cut as well.
      p("01", "wide", [50, 40], "standard", "The white house among olives and pines, the sea beyond", {
        extract: [0.1, 0.14, 0.9, 0.74],
        tune: SKY,
      }),
    ],
  },
  {
    slug: "villa-blanche-cap-dantibes",
    sourceSlug: "villa-blanche-cap-dantibes",
    reference: "AM-0104",
    published: true,
    region: "mer",
    outlook: "Garden and pines",
    gallery: [
      // R2.5.2: the whole villa in the pines, pool in front. Cut right of the
      // thatched pool bar; the sky pass at .75 so the cream facade is not
      // lifted with the sky.
      // Fix pass 2: the global saturation .32 greyed the pines and turned
      // the facade sepia, so the frame read as a render beside Mas Blanc.
      // It now runs on `standard` with cooler red and blue rows (the stone
      // reads cream, not peach), and the pool alone takes the firmer cyan
      // pass (`pool`). The extract keeps the pool and the pines at left,
      // cuts the thatched pool bar, and leaves only a small piece of the
      // palm frond at top right (the porch's last column sits at .904, so
      // the right edge stays at .91).
      p("02", "hero", [50, 60], "standard", "The villa among the stone pines, its pool in front", {
        extract: [0.16, 0.14, 0.75, 0.78],
        tune: { sky: 0.75, pool: [0, 0.6, 1, 0.4], red: [0.95, 0.06, 0.03], blue: [0.05, 0.11, 0.82] },
      }),
      // 01 (aerial) and 03 (drone looking down on the tower) are kept apart
      // by 10. Fix pass 2: as 02, on `standard` with the pool pass, no
      // global saturation cut.
      p("03", "portrait", [58, 42], "standard", "The lantern tower and balconies", {
        tune: { pool: [0, 0.55, 0.5, 0.45], red: [0.94, 0.06, 0.03], blue: [0.05, 0.11, 0.84] },
      }),
      p("10", "portrait", [50, 45], "strong", "Entrance stair under plane trees"),
      // Fix pass 2: 05 (the colonnade from almost the hero's angle) is
      // dropped, so the house is not shown twice the same way.
      p("01", "wide", [50, 40], "strong", "The villa among the pines from above"),
      // Round 3: the neutral sky, a warmer red row and a light sky pass.
      p("07", "detail", [40, 50], "strong", "Stone wall beneath a single pine", {
        tune: { hue: 4, red: [1.02, 0.07, 0.01], sky: 0.6 },
      }),
      p("04", "wide", [50, 50], "strong", "The sea through stone pines"),
    ],
  },
  {
    slug: "villa-camille-roquebrune",
    sourceSlug: "villa-camille-roquebrune",
    reference: "AM-0105",
    published: true,
    region: "mer",
    outlook: "Sea and Monaco",
    gallery: [
      // The deep Riviera blue is this house's weakness: the sky pass runs at
      // full strength on every exterior, and (fix pass) every exterior takes
      // the neutral sky rows too, so the sky is the warm grey of the other
      // houses, not a cold blue grey.
      // Saturation .4: the deep blue at the top left stayed slate at .5.
      // Fix pass: that slate sits below the sky mask's luminance ramp, so the
      // ramp is lowered for this frame.
      // Fix pass 2: the sky at right went near white and the facade
      // highlights pink. A lower red row, no hue shift (with it the sky
      // went green grey), brightness .97 and the sky pass at .9 on a
      // slightly higher mask ramp, so the sky is the warm grey and the
      // stone reads pale ivory.
      p("02", "hero", [50, 52], "strong", "The villa among olives and bougainvillea, the sea at right", {
        tune: { red: [0.97, 0.06, 0.02], sky: 0.9, saturation: 0.38, skyLum: [0.3, 0.52], brightness: 0.97 },
      }),
      p("07", "portrait", [35, 60], "strong", "Balustraded terrace over the open sea", { tune: { pink: 0.6 } }),
      // Focal 62 keeps the diving board out on the left.
      p("03", "portrait", [62, 40], "strong", "The villa above its pool terrace", {
        // The pool stayed blue at .42 (the brief's value): .3.
        tune: { ...NEUTRAL_SKY, ...SKY, saturation: 0.3 },
      }),
      // Fix pass 2: the lone detail is the house, not the bay (08). 04 cut
      // to the villa, its tower and terrace; the built up slope to the
      // right and the road above fall outside, and a parked car behind the
      // tower roof is cloned out from the gravel beside it.
      p("04", "detail", [50, 40], "strong", "The villa, its tower and terrace above the coast", {
        extract: [0, 0.17, 0.32, 0.5],
        tune: NEUTRAL_SKY,
        patches: [
          { from: [0.062, 0.2], to: [0.09, 0.2, 0.03, 0.024] },
          { from: [0.066, 0.214], to: [0.09, 0.214, 0.017, 0.02] },
        ],
      }),
      // Shrinks the palm frond at top left. Fix pass: the top cut is .18, so
      // the flat sky no longer fills a third of the frame; the page ends here,
      // on the house, not on the Monaco view.
      p("01", "wide", [50, 60], "strong", "The forecourt facade and its curved stair", {
        extract: [0.1, 0.18, 0.9, 0.82],
        // The house fills the top of the frame, so the sky pass alone left
        // the open sky at right slate blue: the neutral sky rows, saturation
        // .32 and the lowered mask ramp as well.
        tune: { ...NEUTRAL_SKY, ...SKY, saturation: 0.32, skyLum: [0.34, 0.56] },
      }),
      // Dropped in the fix pass: 06 (the villa above Monaco). Cars on the
      // coast road and in the car park below the towers stay in every crop
      // that keeps the villa, and the full frame ends on high-rises.
    ],
  },
  {
    slug: "maison-du-chemin-saint-tropez",
    sourceSlug: "maison-du-chemin-saint-tropez",
    reference: "AM-0106",
    published: true,
    region: "collines",
    outlook: "Garden",
    gallery: [
      // Loses the loungers at right and the wire across the top. Fix pass:
      // the lounger in the bottom right corner went at width .7 and height
      // .68; the pair on the terrace stays, as cutting it would clip the house.
      p("06", "hero", [40, 45], "garden", "The second house across its lawn and pool, under old oaks", {
        extract: [0, 0.08, 0.7, 0.68],
        tune: SKY,
      }),
      p("04", "portrait", [30, 50], "garden", "Balcony and loggia under the vine"),
      p("07", "portrait", [35, 50], "garden", "Table under the wisteria, the pool beyond"),
      // Fix pass 2: focal 28 puts the right edge at the pillar, so the
      // orange armchair stays out; the stair, newel and rail stay whole.
      p("08", "detail", [28, 50], "interior", "Stone stair and iron rail"),
      // Fix pass 2: 05 is dropped (a stop darker than 02 and 06, and a
      // garden hose at the foot of the loggia). The page ends on 02, so
      // the house is seen twice.
      p("02", "wide", [50, 50], "garden", "The facade behind an old tree, arched windows and agapanthus"),
    ],
  },
  {
    slug: "bastide-du-ciel-gassin",
    sourceSlug: "bastide-du-ciel-gassin",
    reference: "AM-0107",
    published: true,
    region: "collines",
    outlook: "Hills and sea",
    gallery: [
      // Fix pass 2: the top 10% goes (a mottled, mirrored band in the drone's
      // sky) with the bottom 6% (the white reflector); the cypress top sits
      // at about .2, so it stays whole.
      p("02", "hero", [55, 50], "standard", "The ochre bastide between a cypress and a pine, the gulf beyond", {
        extract: [0, 0.1, 1, 0.84],
        tune: { ...CIEL, ...SKY },
      }),
      p("03", "wide", [50, 50], "standard", "Vine pergola along the house", { tune: CIEL_SKY }),
      p("04", "portrait", [70, 50], "standard", "Shuttered courtyard", { tune: CIEL }),
      p("05", "portrait", [65, 50], "standard", "The glass veranda", { tune: CIEL_SKY }),
      p("01", "wide", [50, 50], "standard", "The house under a great umbrella pine", { tune: { ...CIEL, ...SKY } }),
      // Fix pass 2: 06 (wrapped parasols and loungers either side of the
      // pool) is dropped. A view, last, after five frames of the house.
      p("09", "wide", [50, 50], "standard", "The hills to the Gulf of Saint-Tropez", { tune: { ...CIEL, ...SKY } }),
    ],
  },
  {
    slug: "le-mas-rose-ramatuelle",
    sourceSlug: "le-mas-rose-ramatuelle",
    reference: "AM-0108",
    published: true,
    region: "collines",
    outlook: "Garden and pines",
    gallery: [
      p("01", "hero", [50, 50], "standard", "The rose house above its green pool, among pines and cypress", { tune: SKY }),
      // Fix pass: the portrait pair comes before 04, so the two aerials (the
      // hero and 04) are no longer side by side.
      p("03", "portrait", [45, 50], "standard", "Under the reed pergola"),
      p("07", "portrait", [20, 50], "interior", "French windows open to the vines"),
      p("04", "wide", [50, 55], "garden", "The house in the pines, the sea beyond", { tune: SKY }),
      // Blue skies beside the hero's warm grey: a light sky pass.
      p("05", "detail", [40, 40], "standard", "Two cypresses over the pool", { tune: { sky: 0.6 } }),
      p("06", "wide", [50, 50], "standard", "The long table under the pergola", { tune: { sky: 0.6 } }),
    ],
  },
  {
    slug: "bastide-des-pres-chateauneuf",
    sourceSlug: "bastide-des-pres-chateauneuf",
    reference: "AM-0109",
    published: true,
    region: "collines",
    outlook: "Meadow and garden",
    gallery: [
      p("11", "hero", [50, 50], "warm", "The farmhouse beyond the pond", { tune: SKY }),
      p("06", "wide", [50, 50], "warm", "Stone front door"),
      p("03", "portrait", [50, 50], "interior", "Sitting room", {
        tune: { red: [0.98, 0.03, 0], blue: [0.02, 0.07, 0.94] },
      }),
      p("04", "portrait", [50, 50], "interior", "Bedroom in linen", { tune: BASTIDE_WALLS }),
      p("08", "detail", [50, 50], "warm", "Stone basin", { tune: BASTIDE_GARDEN }),
      p("07", "wide", [50, 50], "warm", "Allée under the trees", { tune: { ...BASTIDE_GARDEN, pink: 0.8 } }),
      p("10", "portrait", [50, 50], "warm", "Table under the plane tree", { tune: { ...BASTIDE_GARDEN, pink: 0.8 } }),
      p("02", "portrait", [50, 50], "warm", "Shuttered facade"),
      p("12", "wide", [50, 50], "warm", "The estate from above", { tune: BASTIDE_GARDEN }),
    ],
  },
  {
    slug: "domaine-des-vignes-saint-tropez",
    sourceSlug: "domaine-des-vignes-saint-tropez",
    reference: "AM-0110",
    published: true,
    region: "collines",
    outlook: "Garden and vines",
    gallery: [
      // 01 (the house beyond the pool) leads; R2.5.2: 04, the drone of the
      // main house, pool house and plunge pool, comes back second.
      // Fix pass 2: the dark pool filled the bottom third. The bottom 10%
      // goes, the focal rises to 30 (more house and garden steps), and the
      // pool is lifted and greyed by the pool pass rather than crushed.
      p("01", "hero", [50, 30], "garden", "The house beyond the pool", {
        extract: [0, 0, 1, 0.9],
        tune: { ...SKY, pool: [0, 0.55, 1, 0.45] },
      }),
      p("04", "wide", [50, 50], "garden", "The house and pool house among the pines", { tune: SKY }),
      p("05", "wide", [50, 50], "interior", "Sitting room open to the garden", {
        extract: [0.15, 0.15, 0.7, 0.7],
        tune: VIGNES_WALLS,
      }),
      // Round 3: cut to the table, the garden door and the first beams.
      p("06", "portrait", [50, 65], "interior", "Beams and stone floor", {
        extract: [0.2, 0.2, 0.396, 0.78],
        tune: VIGNES_WALLS,
      }),
      p("07", "portrait", [50, 50], "interior", "Bedroom to the garden", { tune: VIGNES_WALLS }),
      p("03", "wide", [50, 50], "garden", "The house among the pines"),
    ],
  },
  {
    slug: "maison-edouard-beaulieu",
    sourceSlug: "maison-edouard-beaulieu",
    reference: "AM-0111",
    published: true,
    region: "mer",
    outlook: "Sea",
    builtApprox: true,
    gallery: [
      // Fix pass 2: the tight crop opened on the villa cut below its first
      // floor, upscaled from 1267px. The honest frame of a town villa: the
      // whole house, its winter garden, garden and pool, with the
      // neighbour's lower floors behind and air above the roof. Focal x 35
      // keeps the facade whole in the 4:5 crop on phones.
      p("01", "hero", [35, 50], "strong", "The villa on the hillside above its pool", {
        extract: [0.2, 0.22, 0.8, 0.66],
        tune: { ...NEUTRAL_SKY, ...SKY },
      }),
      // Fix pass 2 (owner: "not enough photos of the house"): 08, the
      // corner of the villa and its winter garden over the pool, comes
      // second; the view the owner liked (02) now closes the page.
      p("08", "wide", [50, 50], "strong", "The winter garden and the pool at the foot of the villa", {
        // No hue shift (the deep blue sky went lilac with it) and a lowered
        // mask ramp, so the sky at left reaches the warm grey.
        tune: { red: [0.99, 0.06, 0.01], sky: true, skyLum: [0.3, 0.5], saturation: 0.42, pool: [0, 0.65, 1, 0.35] },
      }),
      p("07", "portrait", [50, 50], "interior", "Winter garden"),
      p("12", "portrait", [40, 50], "strong", "Pool and sea from the winter garden", { tune: NEUTRAL_SKY }),
      // Round 2: the curtain and the window only, no sofa.
      p("04", "detail", [50, 50], "interior", "Salon window", { extract: [0.14, 0.2, 0.22, 0.37] }),
      p("11", "wide", [50, 50], "strong", "Pool along the garden wall"),
      // The pool still read blue at the preset's .5: .42 (R2.5).
      p("02", "wide", [62, 50], "strong", "Olive tree beside an infinity pool and the sea", {
        tune: { ...NEUTRAL_SKY, saturation: 0.42 },
      }),
    ],
  },
  // Held in round 2 (brief R2.1): their galleries stay so nothing is lost,
  // but they are not graded, not routed and not deployed.
  {
    slug: "les-pins-eze",
    sourceSlug: "les-pins-eze-bord-de-mer",
    reference: null,
    published: false,
    region: "mer",
    outlook: "Sea",
    gallery: [
      // Round 2: the hero is cut above the glass rail (its top edge sits at
      // 68% of the source), so the frame is pines over the sea, without the
      // rail, the lawn or the black column. The page then runs pool,
      // rooms, bath and closes on the coast (11, cut above the parked cars).
      // Round 3: the two contrails in the upper right sky and the utility
      // pole, its lamp and wire at the bottom centre are retouched out
      // (scripts/grade.mjs `retouch`, median healed).
      p("01", "hero", [45, 50], "strong", "Umbrella pines over the sea", {
        extract: [0, 0.02, 0.88, 0.66],
        tune: SKY,
        patches: [
          { to: [0.66, 0.1, 0.15, 0.12] },
          { to: [0.76, 0.02, 0.15, 0.12] },
          { to: [0.55, 0, 0.22, 0.1] },
          { to: [0.294, 0.636, 0.042, 0.05] },
          { to: [0.316, 0.636, 0.05, 0.046] },
        ],
      }),
      p("03", "wide", [50, 50], "standard", "Pool between timber louvres"),
      // Round 3: the brief's diptych again, 06 + 05, room and view. 06 is cut
      // right of the television on its tripod (which ends at 51% of the
      // width) and the crane jib behind the pines is healed out; both are
      // cut to their centres, so the ceiling and the stretched wide-angle
      // edges fall away. 04 (dining room) is dropped.
      p("06", "portrait", [50, 65], "interior", "Bedroom opening to pines and sea", {
        extract: [0.52, 0.15, 0.405, 0.8],
        // The crane sits just behind a window mullion: cloned from the clear
        // sky straight below it, so the mullion lines up through the patch.
        patches: [{ from: [0.6, 0.402], to: [0.6, 0.348, 0.082, 0.046] }],
      }),
      p("05", "portrait", [50, 65], "interior", "Living room open to the garden", {
        extract: [0.22, 0.22, 0.359, 0.71],
      }),
      p("09", "detail", [45, 60], "interior", "Bath beneath a louvred window"),
      p("11", "wide", [50, 60], "strong", "The coast from above", { extract: [0.06, 0, 0.74, 0.6], tune: SKY }),
    ],
  },
  {
    slug: "le-belvedere-nice",
    sourceSlug: "belvedere-cap-de-nice",
    reference: null,
    published: false,
    region: "mer",
    outlook: "Sea",
    gallery: [
      // 05 is cut to the right two thirds without the sun's glare.
      // Round 3: the coastline second and the residence last, so the deck
      // frames (01, 02, 07) never run three in a row. 08 is cut to its
      // centre: the window and the foot of the bed, not the ceiling.
      p("01", "hero", [50, 45], "strong", "Deck, one lounger, the horizon", { tune: SKY }),
      p("05", "wide", [50, 55], "strong", "Coastline from the terrace", { extract: [0.33, 0.28, 0.67, 0.72] }),
      p("02", "portrait", [50, 50], "strong", "Pool edge and sea"),
      p("08", "portrait", [50, 65], "interior", "Bedroom with a tall window", {
        extract: [0.36, 0.18, 0.405, 0.8],
      }),
      p("07", "wide", [50, 50], "strong", "The residence from the deck"),
    ],
  },
  {
    slug: "villa-cap-fleuri",
    sourceSlug: "villa-cap-fleuri-cap-dail",
    reference: null,
    published: false,
    region: "mer",
    outlook: "Sea",
    builtApprox: true,
    gallery: [
      // Round 2: the extract loses the neighbour's block on the left edge and
      // the paving below, and keeps the red cushions small.
      // Round 3: focal 50/0. The gable's peak sits a few pixels below the
      // source's top edge, so every crop (1.62 and 4:5) keeps all of the top
      // and loses the lower steps instead.
      p("01", "hero", [50, 0], "standard", "White columned villa with a stone stair, facing the sea", {
        extract: [0.23, 0, 0.62, 0.72],
        tune: { ...NEUTRAL_SKY, ...SKY, ...CAP_FLEURI },
      }),
      p("03", "wide", [50, 55], "strong", "Rocky shore below the garden", { tune: CAP_FLEURI }),
      p("07", "portrait", [40, 50], "standard", "Villa steps beside the water", { tune: CAP_FLEURI }),
      // The lower left only: a column, the paving and the bay; no apartment
      // blocks on the hill and no red chairs.
      p("06", "portrait", [65, 50], "strong", "Columned loggia over the bay", {
        extract: [0.1, 0.4, 0.38, 0.6],
        tune: CAP_FLEURI,
      }),
      // The shutter only, right of the drainpipe; a white wall, so it takes
      // the `interior` preset's cream rather than standard's peach.
      p("11", "detail", [50, 50], "interior", "White facade and shutters", {
        extract: [0.865, 0.16, 0.135, 0.36],
        tune: CAP_FLEURI,
      }),
      p("08", "wide", [50, 50], "standard", "Garden path to the rocks", { tune: CAP_FLEURI }),
    ],
  },
  {
    slug: "maison-des-collines-ramatuelle",
    sourceSlug: "maison-des-collines-ramatuelle",
    reference: null,
    published: false,
    region: "collines",
    outlook: "Sea",
    gallery: [
      // Round 2: `standard` (strong turned the vines mustard) with the sky pass.
      p("01", "hero", [50, 50], "standard", "The house in the hills", { tune: SKY }),
      // Round 3: the three interiors are cut to their centres, so the empty
      // ceiling and the stretched wide-angle edges fall away and the
      // furniture and the view carry each frame.
      p("05", "wide", [50, 50], "interior", "Living room open to the garden", {
        extract: [0.12, 0.22, 0.7, 0.72],
        tune: COLLINES_WALLS,
      }),
      p("06", "portrait", [50, 65], "interior", "Dining room", {
        extract: [0.33, 0.2, 0.334, 0.78],
        tune: COLLINES_WALLS,
      }),
      p("07", "portrait", [50, 65], "interior", "Bedroom over the pool", {
        extract: [0.5, 0.2, 0.342, 0.8],
        tune: COLLINES_WALLS,
      }),
      // Agapanthus on the stone wall, not the whole facade.
      p("09", "detail", [50, 50], "standard", "Agapanthus on a stone wall", { extract: [0.12, 0.44, 0.22, 0.49] }),
      p("10", "wide", [50, 40], "standard", "Pines to the distant sea"),
    ],
  },
  { slug: "la-pinede-ramatuelle", sourceSlug: "la-pinede-ramatuelle", reference: null, published: false, region: "collines", outlook: null, gallery: [] },
  { slug: "maison-du-cap-roquebrune", sourceSlug: "maison-du-cap-roquebrune", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "la-pergola-beaulieu", sourceSlug: "la-pergola-beaulieu", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  // Held since round 1 (brief 7).
  { slug: "domaine-des-cypres-cap-ferrat", sourceSlug: "domaine-des-cypres-cap-ferrat", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "bastide-de-la-rade-villefranche", sourceSlug: "bastide-de-la-rade-villefranche", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "villa-lerins-cannes", sourceSlug: "villa-lerins-cannes", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "lattique-saint-tropez", sourceSlug: "lattique-saint-tropez", reference: null, published: false, region: "collines", outlook: null, gallery: [] },
];

/**
 * Rendered prose takes the typographic apostrophe (U+2019); the source JSON
 * keeps the straight one. Same rule as `typo()` in src/lib/copy.ts, repeated
 * here so this module stays self-contained for scripts/grade.mjs.
 */
const curl = (t: string) => t.replace(/'/g, "\u2019");

/** All twenty-two houses; published ones first, in index order. */
export const estates: Estate[] = own.map((o) => {
  const s = source(o.sourceSlug);
  return {
    slug: o.slug,
    sourceSlug: o.sourceSlug,
    reference: o.reference,
    published: o.published,
    name: curl(s.title),
    town: curl(s.town),
    region: o.region,
    type: curl(s.type),
    priceEur: s.price_eur,
    beds: s.beds,
    baths: s.baths,
    living: s.living_m2,
    land: s.land_m2,
    built: s.year_built,
    builtApprox: o.builtApprox ?? false,
    outlook: o.outlook,
    short: curl(s.short),
    long: curl(s.long),
    features: (o.features ?? s.features).map(curl),
    sourceUrl: s.source_url,
    sourceAgency: curl(s.source_agency),
    agencyRef: s.ref,
    gallery: o.gallery,
    indexFrame: o.indexFrame,
  };
});

/** Served path of a graded estate photograph. */
export function photoSrc(slug: string, file: string): string {
  return `/estates/${slug}/${file}.jpg`;
}
