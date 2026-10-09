/**
 * Every copy string from brief section 6, final. Components read from here and
 * never inline copy. Strings set in caps by a style (eyebrow, nav, link) are
 * kept in caps exactly as the brief writes them. No em or en dashes.
 *
 * Image choices for each slot live in src/data/atmosphere.ts (atmosphere) and
 * below where the slot is an estate photograph.
 *
 * Apostrophes are straight here, as in data, and curly (U+2019) when rendered:
 * `copy` is passed through `typo()` once, below.
 */
import { NAME_DISPLAY, site } from "./site";

/** Straight apostrophes to U+2019 for rendered prose (`Cap-d'Ail` → `Cap-d’Ail`). */
export function typo<T extends string>(s: T): T {
  return s.replace(/'/g, "\u2019") as T;
}

/** `typo()` over every string in a copy tree, including strings returned by functions. */
function typoDeep<T>(v: T): T {
  if (typeof v === "string") return typo(v) as T;
  if (typeof v === "function") {
    const fn = v as unknown as (...args: unknown[]) => unknown;
    return ((...args: unknown[]) => typoDeep(fn(...args))) as T;
  }
  if (Array.isArray(v)) return v.map(typoDeep) as T;
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typoDeep(x)])) as T;
  }
  return v;
}

const raw = {
  meta: {
    titleDefault: NAME_DISPLAY,
    titleTemplate: `%s · ${NAME_DISPLAY}`,
    description: site.description,
  },

  skipLink: "Skip to content",

  header: {
    menu: "MENU",
    enquire: "ENQUIRE",
    homeLabel: `${NAME_DISPLAY}, home`,
  },

  drawer: {
    label: "Menu",
    close: "Close the menu",
    office: site.office,
  },

  footer: {
    line: "Houses on the Côte d'Azur, shown by appointment.",
    estatesHead: "ESTATES",
    houseHead: "HOUSE",
    estatesNavLabel: "Estates",
    houseNavLabel: "House",
    /** `© 2026 Aube’Mar. A case study by ClearScaler. The houses shown are listed by third parties; sources in the {colophon}.` */
    legalBefore: `© 2026 ${NAME_DISPLAY}. A case study by ClearScaler. The houses shown are listed by third parties; sources in the `,
    legalLink: "colophon",
    legalAfter: ".",
  },

  home: {
    /** Visually hidden page heading (Home has no visible h1 in the brief). */
    srTitle: NAME_DISPLAY,
    intro: {
      eyebrow: "CÔTE D'AZUR",
      title: "Houses between the hills and the sea.",
      link: { label: "THE ESTATES", href: "/estates" },
    },
    /**
     * Owner round 2 (brief R2.4): every still on Home is a house, whole, seen
     * from outside, in its setting; the seven best houses in index order.
     * Slug and file; alt from the gallery entry. The portrait feature is a
     * house card now, not The House card. Both feature bodies are the
     * listings' own `short` sentences, trimmed.
     */
    featureWide: {
      estate: "mas-blanc-mougins",
      file: "01",
      focal: [50, 55] as const,
      eyebrow: "MOUGINS",
      title: "Mas Blanc",
      body: "A white house of stone, lime and old wood above a long green pool.",
      link: { label: "VIEW THE HOUSE", href: "/estates/mas-blanc-mougins" },
    },
    featurePortrait: {
      estate: "villa-camille-roquebrune",
      file: "02",
      focal: [50, 50] as const,
      eyebrow: "ROQUEBRUNE-CAP-MARTIN",
      title: "Villa Camille",
      body: "A Belle Époque villa of 1891, pale stone and balustrades above an open sea.",
      link: { label: "VIEW THE HOUSE", href: "/estates/villa-camille-roquebrune" },
    },
    /** One italic word allowed; none is set. */
    statement:
      "The coast is loudest in August and quietest at seven in the morning. We prefer it then.",
    /** Round 2: the 21:9 under the statement is a house, not the sailboat. */
    statementImage: {
      estate: "bastide-des-oliviers-vence",
      file: "01",
      // Fix pass 2: the house sits in the right half, so the crop follows
      // the hero's x of 65.
      focal: [65, 40] as const,
    },
    estatesRow: {
      eyebrow: "ESTATES",
      cards: [
        // Fix pass 2: at 50 the left edge cut a neighbouring pavilion in the
        // middle of its arch; at 64 the card starts on the ivy and the hedge
        // and ends on the cypress.
        { slug: "les-arcades-ramatuelle", file: "02", focal: [64, 50] as const, name: "Les Arcades", town: "RAMATUELLE" },
        // Fix pass: 02 (the colonnade, the iron balconies and the pool), not 03,
        // where a palm hid the porch and the drone looked down.
        { slug: "villa-blanche-cap-dantibes", file: "02", focal: [55, 50] as const, name: "Villa Blanche", town: "CAP D'ANTIBES" },
        { slug: "bastide-du-ciel-gassin", file: "02", focal: [72, 44] as const, name: "Bastide du Ciel", town: "GASSIN" },
      ],
      link: { label: "ALL THE HOUSES", href: "/estates" },
    },
    band: {
      estate: "maison-du-chemin-saint-tropez",
      file: "02",
      focal: [50, 50] as const,
      eyebrow: "VIEWINGS",
      title: "In person, before ten.",
      body: "Viewings are private and held in the morning, when the light is level and the roads are empty.",
      link: { label: "ARRANGE A VIEWING", href: "/enquire" },
    },
  },

  estates: {
    title: "Estates",
    /** `Eleven houses between Roquebrune and the Saint-Tropez peninsula.` The count word comes from the data. */
    intro: (countWord: string) => `${countWord} houses between Roquebrune and the Saint-Tropez peninsula.`,
    lead: "Each is held on a private basis and shown by appointment. Prices are given where the seller allows; the others are available on request.",
    enquireLink: { label: "MAKE AN ENQUIRY", href: "/enquire" },
    rowLink: "VIEW THE HOUSE",
    closing: "Other houses are offered privately.",
    closingLink: { label: "ENQUIRE", href: "/enquire" },
  },

  estate: {
    viewingLink: { label: "ARRANGE A VIEWING", href: "#enquire" },
    particularsTitle: "Particulars",
    featuresLabel: "Features",
    enquiryTitle: "Arrange a viewing",
    enquiryLine: "Tell us when you are on the coast. We answer personally.",
    enquiryMessage: (name: string, reference: string) =>
      `I would like to arrange a viewing of ${name}, ref. ${reference}.`,
    next: (name: string) => `Next, ${name}`,
    credit: "Photographs from the listing agency's public listing, shown for study. Sources in the colophon.",
  },

  house: {
    title: "The House",
    lead: `${NAME_DISPLAY} is a small house of estate agents on the Côte d'Azur. We take on a few houses a year and show each one as it is.`,
    blocks: (countWord: string) => [
      {
        title: "A few houses",
        body: `${countWord} at present, between Roquebrune and the Saint-Tropez peninsula. We would rather know each one well than list many.`,
      },
      {
        title: "Seen early",
        body: "Viewings are private and set for the morning. The coast is at its truest before the day fills.",
      },
      {
        title: "Said plainly",
        body: "No superlatives and no figures we cannot stand behind. The particulars are on every page.",
      },
    ],
    office: site.office,
    link: { label: "ENQUIRE", href: "/enquire" },
  },

  enquire: {
    title: "Enquire",
    lead: "Write to us about a house, or about what you are looking for.",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      telephone: "Telephone",
      country: "Country of residence",
      house: "House",
      /** Added in round 1 (not in the brief): the select's first, empty option. */
      housePlaceholder: "Choose a house",
      houseOther: "A house not shown here",
      dates: "Preferred dates",
      message: "Message",
      optional: "optional",
      consent: "You may keep my details to reply to this enquiry.",
      confidence: "Your enquiry is held in confidence.",
      send: "SEND",
      /** Added with the form (not in the brief): server validation messages. */
      errors: {
        firstName: "Please add your first name.",
        lastName: "Please add your last name.",
        email: "Please add an email address we can reply to.",
        consent: "We need your consent to reply.",
      },
    },
    sent: {
      title: "Thank you.",
      lead: "We will write back shortly.",
      link: { label: "THE ESTATES", href: "/estates" },
    },
  },

  colophon: {
    title: "Colophon",
    body: `${NAME_DISPLAY} is a study in how a house of estates on the Côte d'Azur might present itself. It is not a licensed agency, holds no professional card or financial guarantee, and sells nothing. The houses shown are real and are listed by the agencies credited below; the photographs and particulars are drawn from their public listings and remain the property of those agencies. Atmosphere photography and film are from Unsplash and Pexels under their licences.`,
    estatesTitle: "Estates",
    estatesColumns: ["Our name", "Reference", "Town", "Listed by", "Agency reference", "Listing"],
    sourceLink: "Source",
    atmosphereTitle: "Atmosphere",
    atmosphereColumns: ["File", "Photographer", "Source"],
    typeTitle: "Type",
    type: "Newsreader and Jost, from Google Fonts under the SIL Open Font License.",
    madeBy: { before: "Made by ", link: "ClearScaler", href: site.clearscalerUrl, after: "." },
  },

  notFound: {
    title: "This page is not here. The houses are.",
    link: { label: "THE ESTATES", href: "/estates" },
  },

  gate: {
    title: "Private preview",
    eyebrow: "PRIVATE PREVIEW",
    password: "Password",
    enter: "ENTER",
    error: "Incorrect password.",
  },
} as const;

export const copy = typoDeep(raw);
