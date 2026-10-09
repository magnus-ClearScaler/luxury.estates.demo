import { copy } from "./copy";
import { heroOf, priceDisplay, published, sequenceOf, srcOf, type Estate } from "./estates";
import { NAME_DISPLAY, site } from "./site";

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

/**
 * Owner decision pending (docs/lh/seo-plan.md section 0): an Offer with the
 * price and the listing agency as `offeredBy`, on houses whose price is public.
 */
const LISTING_OFFERS = false;

/**
 * WebSite and the house as an Organization. Not RealEstateAgent: the colophon
 * says Aube'Mar is not a licensed agency.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: site.url,
        name: NAME_DISPLAY,
        description: copy.meta.description,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: NAME_DISPLAY,
        url: site.url,
        logo: `${site.url}/icon.png`,
        description: copy.meta.description,
        areaServed: { "@type": "Place", name: "Côte d’Azur" },
      },
    ],
  };
}

/** The listing page, the house it describes, and the breadcrumb. */
export function estateJsonLd(e: Estate) {
  const url = `${site.url}/estates/${e.slug}`;
  const images = [heroOf(e), ...sequenceOf(e)].slice(0, 6).map((p) => `${site.url}${srcOf(e, p)}`);
  const house = {
    "@type": "House",
    name: e.name,
    description: e.short,
    address: {
      "@type": "PostalAddress",
      addressLocality: e.town,
      addressRegion: "Provence-Alpes-Côte d’Azur",
      addressCountry: "FR",
    },
    ...(e.beds != null ? { numberOfBedrooms: e.beds } : {}),
    ...(e.baths != null ? { numberOfBathroomsTotal: e.baths } : {}),
    ...(e.living != null ? { floorSize: { "@type": "QuantitativeValue", value: e.living, unitCode: "MTK" } } : {}),
    ...(e.built != null && !e.builtApprox ? { yearBuilt: e.built } : {}),
  };
  const publicPrice = priceDisplay(e, "index").startsWith("€");
  const offer =
    LISTING_OFFERS && publicPrice
      ? {
          offers: {
            "@type": "Offer",
            price: e.priceEur,
            priceCurrency: "EUR",
            offeredBy: { "@type": "Organization", name: e.sourceAgency, url: e.sourceUrl },
          },
        }
      : {};
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        url,
        name: `${e.name}, ${e.town}`,
        description: e.short,
        image: images,
        inLanguage: "en",
        isPartOf: { "@id": SITE_ID },
        about: house,
        // The agency listing the photographs and particulars come from.
        isBasedOn: e.sourceUrl,
        ...offer,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAME_DISPLAY, item: site.url },
          { "@type": "ListItem", position: 2, name: copy.estates.title, item: `${site.url}/estates` },
          { "@type": "ListItem", position: 3, name: e.name, item: url },
        ],
      },
    ],
  };
}

/** The index as an ordered list of the published houses. */
export function estatesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: published().map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/estates/${e.slug}`,
      name: e.name,
    })),
  };
}
