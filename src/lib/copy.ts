/**
 * Every copy string from brief section 6, final. Components read from here and
 * never inline copy. Strings set in caps by a style (eyebrow, nav, link) are
 * kept in caps exactly as the brief writes them. No em or en dashes.
 *
 * Image choices for each slot live in src/data/atmosphere.ts (atmosphere) and
 * below where the slot is an estate photograph.
 */
import { NAME_DISPLAY, site } from "./site";

export const copy = {
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
    featureWide: {
      estate: "les-pins-eze",
      image: "/estates/les-pins-eze/01.jpg",
      focal: [50, 40] as const,
      alt: "Umbrella pines over the sea",
      eyebrow: "ÈZE BORD DE MER",
      title: "Les Pins",
      body: "A new house of stone and pale oak among old umbrella pines, above the sea.",
      link: { label: "VIEW THE HOUSE", href: "/estates/les-pins-eze" },
    },
    featurePortrait: {
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
        { slug: "mas-blanc-mougins", file: "01", focal: [50, 55] as const, name: "Mas Blanc", town: "MOUGINS" },
        { slug: "maison-edouard-beaulieu", file: "02", focal: [62, 50] as const, name: "Maison Édouard", town: "BEAULIEU-SUR-MER" },
        { slug: "bastide-des-pres-chateauneuf", file: "06", focal: [50, 50] as const, name: "Bastide des Prés", town: "CHÂTEAUNEUF-GRASSE" },
      ],
      link: { label: "ALL THE HOUSES", href: "/estates" },
    },
    band: {
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
      houseOther: "A house not shown here",
      dates: "Preferred dates",
      message: "Message",
      optional: "optional",
      consent: "You may keep my details to reply to this enquiry.",
      confidence: "Your enquiry is held in confidence.",
      send: "SEND",
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
