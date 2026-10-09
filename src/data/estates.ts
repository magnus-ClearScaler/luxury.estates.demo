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
export type Grade = "soft" | "standard" | "strong" | "warm";
/** `[x%, y%]`, used as CSS `object-position`. */
export type Focal = readonly [number, number];

export type Photo = {
  /** File number in the source folder, also the served name: `01` → `/estates/<slug>/01.jpg`. */
  file: string;
  frame: Frame;
  focal: Focal;
  grade: Grade;
  alt: string;
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
): Photo {
  return { file, frame, focal, grade, alt };
}

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
      p("01", "hero", [50, 45], "standard", "White columned villa with a stone stair, facing the sea"),
      p("03", "wide", [50, 55], "strong", "Rocky shore below the garden"),
      p("07", "portrait", [40, 50], "standard", "Villa steps beside the water"),
      p("06", "portrait", [20, 50], "standard", "Columned loggia over the bay"),
      p("11", "detail", [70, 35], "standard", "White facade and shutters"),
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
      p("01", "hero", [50, 40], "strong", "Umbrella pines over the sea"),
      p("03", "wide", [50, 50], "standard", "Pool between timber louvres"),
      p("06", "portrait", [60, 50], "standard", "Bedroom opening to pines and sea"),
      p("05", "portrait", [50, 50], "standard", "Living room open to the garden"),
      p("09", "detail", [45, 60], "standard", "Bath beneath a louvred window"),
      p("11", "wide", [50, 60], "strong", "The coast from above"),
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
      p("02", "hero", [62, 50], "standard", "Olive tree beside an infinity pool and the sea"),
      p("01", "wide", [50, 50], "standard", "The villa on the hillside"),
      p("07", "portrait", [50, 50], "standard", "Winter garden"),
      p("12", "portrait", [40, 50], "strong", "Pool and sea from the winter garden"),
      p("04", "detail", [20, 50], "standard", "Salon window"),
      p("11", "wide", [50, 50], "standard", "Pool along the garden wall"),
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
      p("01", "hero", [50, 45], "strong", "Deck, one lounger, the horizon"),
      p("06", "wide", [50, 50], "strong", "Sea through leaves"),
      p("02", "portrait", [50, 50], "strong", "Pool edge and sea"),
      p("08", "portrait", [50, 50], "strong", "Bedroom with a tall window"),
      p("05", "wide", [50, 55], "strong", "Coastline from the terrace"),
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
      p("05", "hero", [50, 40], "strong", "Cream Belle Époque facade"),
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
      p("01", "hero", [50, 55], "standard", "White house above a reflecting pool"),
      p("03", "wide", [50, 50], "standard", "Dining room open to the garden"),
      p("05", "portrait", [40, 50], "standard", "Bedroom with an arched window"),
      p("07", "portrait", [50, 50], "standard", "Linen pergola"),
      p("04", "detail", [40, 30], "standard", "Timber beams"),
      p("02", "wide", [50, 50], "standard", "The pool from above"),
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
      p("02", "hero", [50, 40], "standard", "Umbrella pines over the lawn"),
      p("05", "wide", [50, 50], "standard", "Sitting room open to the garden"),
      p("06", "portrait", [50, 50], "standard", "Beams and stone floor"),
      p("07", "portrait", [50, 50], "standard", "Bedroom to the garden"),
      p("03", "wide", [50, 50], "standard", "The house among the pines"),
      p("01", "wide", [50, 50], "standard", "The pool"),
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
      p("09", "detail", [30, 50], "standard", "Facade and pool"),
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

/** All fourteen houses; published ones first, in index order. */
export const estates: Estate[] = own.map((o) => {
  const s = source(o.sourceSlug);
  return {
    slug: o.slug,
    sourceSlug: o.sourceSlug,
    reference: o.reference,
    published: o.published,
    name: s.title,
    town: s.town,
    region: o.region,
    type: s.type,
    priceEur: s.price_eur,
    beds: s.beds,
    baths: s.baths,
    living: s.living_m2,
    land: s.land_m2,
    built: s.year_built,
    builtApprox: o.builtApprox ?? false,
    outlook: o.outlook,
    short: s.short,
    long: s.long,
    features: o.features ?? s.features,
    sourceUrl: s.source_url,
    sourceAgency: s.source_agency,
    agencyRef: s.ref,
    gallery: o.gallery,
  };
});

/** Served path of a graded estate photograph. */
export function photoSrc(slug: string, file: string): string {
  return `/estates/${slug}/${file}.jpg`;
}
