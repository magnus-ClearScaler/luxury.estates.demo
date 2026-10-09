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
export type Grade = "soft" | "standard" | "garden" | "strong" | "warm";
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
  /** Replaces the preset's `linear(a, b)`. */
  linear?: readonly [number, number];
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
      // Extract drops the neighbour's house on the left and the paving below.
      p("01", "hero", [50, 45], "standard", "White columned villa with a stone stair, facing the sea", {
        extract: [0.1, 0, 0.8, 0.75],
        tune: NEUTRAL_SKY,
      }),
      p("03", "wide", [50, 55], "strong", "Rocky shore below the garden"),
      p("07", "portrait", [40, 50], "standard", "Villa steps beside the water"),
      // Focal 0/50 keeps the neighbour's cyan pool and the red chairs out;
      // strong calms the bay and the cumulus that remain.
      p("06", "portrait", [0, 50], "strong", "Columned loggia over the bay"),
      // Shutters only: no sky, no bougainvillea.
      p("11", "detail", [50, 50], "standard", "White facade and shutters", {
        extract: [0.74, 0.13, 0.26, 0.41],
      }),
      p("08", "wide", [50, 50], "standard", "Garden path to the rocks"),
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
      // 06 (TV, crane) and 11 (parked cars) dropped in round 1; the page
      // closes on the diptych rather than the bath.
      p("01", "hero", [50, 40], "strong", "Umbrella pines over the sea"),
      p("03", "wide", [50, 50], "standard", "Pool between timber louvres"),
      p("09", "detail", [45, 60], "standard", "Bath beneath a louvred window"),
      p("04", "portrait", [30, 50], "standard", "Dining room to the glass wall"),
      p("05", "portrait", [50, 50], "standard", "Living room open to the garden"),
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
      p("02", "hero", [62, 50], "strong", "Olive tree beside an infinity pool and the sea", { tune: NEUTRAL_SKY }),
      p("01", "wide", [50, 50], "strong", "The villa on the hillside", { tune: NEUTRAL_SKY }),
      p("07", "portrait", [50, 50], "standard", "Winter garden"),
      p("12", "portrait", [40, 50], "strong", "Pool and sea from the winter garden", { tune: NEUTRAL_SKY }),
      // Window, curtain and the arm of the sofa, not the whole salon.
      p("04", "detail", [50, 50], "standard", "Salon window", { extract: [0.06, 0.2, 0.34, 0.64] }),
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
      // 06 dropped (a fifth pool, deck and sea); the diptych sits between
      // the two remaining pool wides.
      p("01", "hero", [50, 45], "strong", "Deck, one lounger, the horizon"),
      p("05", "wide", [50, 55], "strong", "Coastline from the terrace"),
      p("02", "portrait", [50, 50], "strong", "Pool edge and sea"),
      p("08", "portrait", [50, 50], "strong", "Bedroom with a tall window"),
      p("07", "wide", [50, 50], "strong", "The residence from the deck"),
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
      p("05", "hero", [50, 0], "strong", "Cream Belle Époque facade"),
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
      p("01", "hero", [50, 55], "standard", "White house above a reflecting pool"),
      p("07", "portrait", [50, 50], "standard", "Linen pergola"),
      p("05", "portrait", [40, 50], "standard", "Bedroom with an arched window"),
      p("04", "detail", [50, 50], "standard", "Timber beams", { extract: [0.4, 0.02, 0.26, 0.46] }),
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
      p("11", "hero", [50, 50], "warm", "The farmhouse beyond the pond"),
      p("06", "wide", [50, 50], "warm", "Stone front door"),
      p("03", "portrait", [50, 50], "warm", "Sitting room"),
      p("04", "portrait", [50, 50], "warm", "Bedroom in linen"),
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
      p("01", "hero", [50, 45], "garden", "The house beyond the pool"),
      p("05", "wide", [50, 50], "garden", "Sitting room open to the garden", { extract: [0.15, 0.15, 0.7, 0.7] }),
      p("06", "portrait", [50, 50], "standard", "Beams and stone floor"),
      p("07", "portrait", [50, 50], "standard", "Bedroom to the garden"),
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
      p("01", "hero", [50, 50], "strong", "The house in the hills"),
      p("05", "wide", [50, 50], "standard", "Living room open to the garden"),
      p("06", "portrait", [50, 50], "standard", "Dining room"),
      p("07", "portrait", [75, 50], "standard", "Bedroom over the pool"),
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
