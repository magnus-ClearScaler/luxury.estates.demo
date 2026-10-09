/**
 * The fourteen houses, typed. Nine are published (index order below), five are
 * held (`published: false`) so nothing from the research is lost.
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
};

export type Photo = {
  /** File number in the source folder, also the served name: `01` → `/estates/<slug>/01.jpg`. */
  file: string;
  frame: Frame;
  focal: Focal;
  grade: Grade;
  alt: string;
  extract?: Extract;
  tune?: Tune;
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
};

const sources = [...(east as SourceListing[]), ...(west as SourceListing[])];

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
};

function p(
  file: string,
  frame: Frame,
  focal: Focal,
  grade: Grade,
  alt: string,
  more: { extract?: Extract; tune?: Tune } = {},
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

const own: Own[] = [
  {
    slug: "villa-cap-fleuri",
    sourceSlug: "villa-cap-fleuri-cap-dail",
    reference: "AM-0101",
    published: true,
    region: "mer",
    outlook: "Sea",
    builtApprox: true,
    gallery: [
      // Round 2: the extract loses the neighbour's block on the left edge and
      // the paving below, and keeps the red cushions small.
      p("01", "hero", [50, 45], "standard", "White columned villa with a stone stair, facing the sea", {
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
    slug: "les-pins-eze",
    sourceSlug: "les-pins-eze-bord-de-mer",
    reference: "AM-0102",
    published: true,
    region: "mer",
    outlook: "Sea",
    gallery: [
      // Round 2: the hero is cut above the glass rail (its top edge sits at
      // 68% of the source), so the frame is pines over the sea, without the
      // rail, the lawn or the black column. The page then runs pool,
      // rooms, bath and closes on the coast (11, cut above the parked cars).
      p("01", "hero", [45, 50], "strong", "Umbrella pines over the sea", {
        extract: [0, 0.02, 0.88, 0.66],
        tune: SKY,
      }),
      p("03", "wide", [50, 50], "standard", "Pool between timber louvres"),
      p("04", "portrait", [30, 50], "interior", "Dining room to the glass wall"),
      p("05", "portrait", [50, 50], "interior", "Living room open to the garden"),
      p("09", "detail", [45, 60], "interior", "Bath beneath a louvred window"),
      p("11", "wide", [50, 60], "strong", "The coast from above", { extract: [0.06, 0, 0.74, 0.6], tune: SKY }),
    ],
  },
  {
    slug: "maison-edouard-beaulieu",
    sourceSlug: "maison-edouard-beaulieu",
    reference: "AM-0103",
    published: true,
    region: "mer",
    outlook: "Sea",
    builtApprox: true,
    gallery: [
      p("02", "hero", [62, 50], "strong", "Olive tree beside an infinity pool and the sea", {
        tune: { ...NEUTRAL_SKY, ...SKY },
      }),
      // Round 2: the villa's upper floors and the hillside, not the aerial
      // with the neighbours either side.
      p("01", "wide", [50, 50], "strong", "The villa on the hillside", {
        extract: [0.24, 0.1, 0.54, 0.5],
        tune: NEUTRAL_SKY,
      }),
      p("07", "portrait", [50, 50], "interior", "Winter garden"),
      p("12", "portrait", [40, 50], "strong", "Pool and sea from the winter garden", { tune: NEUTRAL_SKY }),
      // Round 2: the curtain and the window only, no sofa.
      p("04", "detail", [50, 50], "interior", "Salon window", { extract: [0.14, 0.2, 0.22, 0.37] }),
      p("11", "wide", [50, 50], "strong", "Pool along the garden wall"),
    ],
  },
  {
    slug: "le-belvedere-nice",
    sourceSlug: "belvedere-cap-de-nice",
    reference: "AM-0104",
    published: true,
    region: "mer",
    outlook: "Sea",
    gallery: [
      // Round 2: the residence second, so three pool and sea frames never
      // run together; 05 closes, cut to the right two thirds without the
      // sun's glare.
      p("01", "hero", [50, 45], "strong", "Deck, one lounger, the horizon", { tune: SKY }),
      p("07", "wide", [50, 50], "strong", "The residence from the deck"),
      p("02", "portrait", [50, 50], "strong", "Pool edge and sea"),
      p("08", "portrait", [50, 50], "interior", "Bedroom with a tall window"),
      p("05", "wide", [50, 55], "strong", "Coastline from the terrace", { extract: [0.33, 0.28, 0.67, 0.72] }),
    ],
  },
  {
    slug: "villa-blanche-cap-dantibes",
    sourceSlug: "villa-blanche-cap-dantibes",
    reference: "AM-0105",
    published: true,
    region: "mer",
    outlook: "Garden and pines",
    gallery: [
      // Focal 50/0: the 1.62 crop takes its 7% from the bottom, with the pool.
      // The sky pass at .75 so the cream facade below it is not lifted too.
      p("05", "hero", [50, 0], "strong", "Cream Belle Époque facade", { tune: { sky: 0.75 } }),
      p("01", "wide", [50, 40], "strong", "The villa among the pines from above"),
      p("10", "portrait", [50, 45], "strong", "Entrance stair under plane trees"),
      p("07", "portrait", [40, 50], "strong", "Stone wall beneath a single pine"),
      p("04", "wide", [50, 50], "strong", "The sea through stone pines"),
    ],
  },
  {
    slug: "mas-blanc-mougins",
    sourceSlug: "mas-blanc-mougins",
    reference: "AM-0106",
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
      // 03 dropped (the kitchen in its right third). 04 is cut to the beams
      // and the lantern; 02 loses its band of cumulus.
      p("01", "hero", [50, 55], "standard", "White house above a reflecting pool", { tune: SKY }),
      p("07", "portrait", [50, 50], "standard", "Linen pergola"),
      p("05", "portrait", [40, 50], "interior", "Bedroom with an arched window", {
        tune: { blue: [0.02, 0.06, 0.925] },
      }),
      p("04", "detail", [50, 50], "interior", "Timber beams", {
        extract: [0.4, 0.02, 0.26, 0.46],
        tune: { blue: [0.02, 0.06, 0.915] },
      }),
      p("02", "wide", [50, 50], "strong", "The pool from above", { extract: [0, 0.22, 1, 0.78] }),
    ],
  },
  {
    slug: "bastide-des-pres-chateauneuf",
    sourceSlug: "bastide-des-pres-chateauneuf",
    reference: "AM-0107",
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
      p("08", "detail", [50, 50], "warm", "Stone basin"),
      p("07", "wide", [50, 50], "warm", "Allée under the trees"),
      p("10", "portrait", [50, 50], "warm", "Table under the plane tree"),
      p("02", "portrait", [50, 50], "warm", "Shuttered facade"),
      p("12", "wide", [50, 50], "warm", "The estate from above"),
    ],
  },
  {
    slug: "domaine-des-vignes-saint-tropez",
    sourceSlug: "domaine-des-vignes-saint-tropez",
    reference: "AM-0108",
    published: true,
    region: "collines",
    outlook: "Garden and vines",
    gallery: [
      // 01 (the house beyond the pool) leads; 02 (mostly lawn) dropped; 05
      // cut to its centre to lose the wide angle stretch at the edges.
      p("01", "hero", [50, 45], "garden", "The house beyond the pool", { tune: SKY }),
      p("05", "wide", [50, 50], "interior", "Sitting room open to the garden", {
        extract: [0.15, 0.15, 0.7, 0.7],
        tune: VIGNES_WALLS,
      }),
      p("06", "portrait", [50, 50], "interior", "Beams and stone floor", { tune: VIGNES_WALLS }),
      p("07", "portrait", [50, 50], "interior", "Bedroom to the garden", { tune: VIGNES_WALLS }),
      p("03", "wide", [50, 50], "garden", "The house among the pines"),
    ],
  },
  {
    slug: "maison-des-collines-ramatuelle",
    sourceSlug: "maison-des-collines-ramatuelle",
    reference: "AM-0109",
    published: true,
    region: "collines",
    outlook: "Sea",
    gallery: [
      // Round 2: `standard` (strong turned the vines mustard) with the sky pass.
      p("01", "hero", [50, 50], "standard", "The house in the hills", { tune: SKY }),
      p("05", "wide", [50, 50], "interior", "Living room open to the garden", { tune: COLLINES_WALLS }),
      p("06", "portrait", [50, 50], "interior", "Dining room", { tune: COLLINES_WALLS }),
      p("07", "portrait", [75, 50], "interior", "Bedroom over the pool", { tune: COLLINES_WALLS }),
      // Agapanthus on the stone wall, not the whole facade.
      p("09", "detail", [50, 50], "standard", "Agapanthus on a stone wall", { extract: [0.12, 0.44, 0.22, 0.49] }),
      p("10", "wide", [50, 40], "standard", "Pines to the distant sea"),
    ],
  },
  // Held: kept in data, not graded, not deployed (brief 7).
  { slug: "domaine-des-cypres-cap-ferrat", sourceSlug: "domaine-des-cypres-cap-ferrat", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "bastide-de-la-rade-villefranche", sourceSlug: "bastide-de-la-rade-villefranche", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "villa-lerins-cannes", sourceSlug: "villa-lerins-cannes", reference: null, published: false, region: "mer", outlook: null, gallery: [] },
  { slug: "bastide-du-ciel-gassin", sourceSlug: "bastide-du-ciel-gassin", reference: null, published: false, region: "collines", outlook: null, gallery: [] },
  { slug: "lattique-saint-tropez", sourceSlug: "lattique-saint-tropez", reference: null, published: false, region: "collines", outlook: null, gallery: [] },
];

/**
 * Rendered prose takes the typographic apostrophe (U+2019); the source JSON
 * keeps the straight one. Same rule as `typo()` in src/lib/copy.ts, repeated
 * here so this module stays self-contained for scripts/grade.mjs.
 */
const curl = (t: string) => t.replace(/'/g, "\u2019");

/** All fourteen houses; published ones first, in index order. */
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
  };
});

/** Served path of a graded estate photograph. */
export function photoSrc(slug: string, file: string): string {
  return `/estates/${slug}/${file}.jpg`;
}
