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
     * Owner round 1: Home shows the houses. The feature pair and the linen
     * band are estate photographs (slug and file; alt from the gallery entry).
     * Round 2: none of them is a house's hero, so no photograph is seen on
     * Home, again on /estates and again atop its page; and the sea houses
     * lead. Les Pins is the featured house again (conductor decision 10),
     * with the brief's own sentence.
     */
    featureWide: {
      estate: "les-pins-eze",
      file: "03",
      focal: [50, 50] as const,
      eyebrow: "ÈZE BORD DE MER",
      title: "Les Pins",
      body: "A new house of stone and pale oak among old umbrella pines, above the sea.",
      link: { label: "VIEW THE HOUSE", href: "/estates/les-pins-eze" },
    },
    featurePortrait: {
      estate: "villa-blanche-cap-dantibes",
      file: "07",
      focal: [40, 50] as const,
      eyebrow: "THE HOUSE",
      title: "Held quietly",
      body: "A small number of houses each year, each shown at the hour it is at its best.",
      link: { label: "ABOUT THE HOUSE", href: "/house" },
    },
    /** One italic word allowed; none is set. */
    statement:
      "The coast is loudest in August and quietest at seven in the morning. We prefer it then.",
    estatesRow: {
      eyebrow: "ESTATES",
      cards: [
        { slug: "mas-blanc-mougins", file: "07", focal: [50, 50] as const, name: "Mas Blanc", town: "MOUGINS" },
        { slug: "maison-edouard-beaulieu", file: "12", focal: [40, 50] as const, name: "Maison Édouard", town: "BEAULIEU-SUR-MER" },
        { slug: "bastide-des-pres-chateauneuf", file: "02", focal: [50, 45] as const, name: "Bastide des Prés", town: "CHÂTEAUNEUF-GRASSE" },
      ],
      link: { label: "ALL THE HOUSES", href: "/estates" },
    },
    band: {
      estate: "villa-blanche-cap-dantibes",
      file: "04",
      focal: [50, 50] as const,
      eyebrow: "VIEWINGS",
      title: "In person, before ten.",
      body: "Viewings are private and held in the morning, when the light is level and the roads are empty.",
      link: { label: "ARRANGE A VIEWING", href: "/enquire" },
    },
  },

  estates: {
    title: "Estates",
    /** `Nine houses between Cap-d'Ail and Ramatuelle.` The count word comes from the data. */
    intro: (countWord: string) => `${countWord} houses between Cap-d'Ail and Ramatuelle.`,
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
        body: `${countWord} at present, between Cap-d'Ail and Ramatuelle. We would rather know each one well than list many.`,
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
