# Montevie Estates and Riviera agencies: teardown

Researched 2026-10-09. Sources: raw HTML and the Squarespace `site.css` fetched with curl, computed styles read in Chrome at 1440x705, WebFetch of the main pages and three competitor property pages. Screenshots are in `shots/montevie-home-services.jpg` and `shots/montevie-property-hero.jpg`.

Copy rule for this project: no em dashes or en dashes in anything we write.

---

## 1. Montevie Estates (montevie-estates.com)

### What it is
- A small Marbella / Costa del Sol agency (Nueva Andalucía office). It does sales, rentals and concierge. It is **not** a Riviera agency, so the business model and location do not transfer. What transfers is the mood.
- Built on **Squarespace 7.1** (`sqs-seven-one`) with a stock template, a cart icon left in the header, and a visible builder error in the newsletter block ("This newsletter signup form needs a storage option"). It is a well-chosen template with good typography. It is not a crafted build. We can beat it on execution with little effort.

### Brand name and logo
- The wordmark is **MÓNTEVÍE**: no apostrophe, two acute accents (Ó, Í) added for a pseudo-Spanish, couture feel. The page title uses "Móntevíe Estates" and the testimonials say "Montevie".
- Logo = **live text, not an image**: `#site-title`, minerva-modern 400, 22.9px (1.4rem token), **letter-spacing .16em**, uppercase, white over the hero. There is no symbol and no monogram.
- What we take: the name rides on diacritics and wide tracking. Our equivalent is the apostrophe (an Aman-style elision such as `L'...` or `D'...`), set in tracked capitals as live text with no mark. Something like an `R'` monogram can come later if needed.

### Typefaces (Adobe Fonts / Typekit kit)
| Role | Family | Size | Tracking | Case |
|---|---|---|---|---|
| Headings H1 to H4, buttons, site title | **minerva-modern** (Typekit; a flared, high-contrast Roman with an incised feel) | H1 2.8rem, H2 2rem (renders 33px), H3 1.4rem, H4 1rem | .07em (headings), .16em (title), .05em (primary button) | **UPPERCASE everywhere** |
| Body, nav | **futura-pt** 400 | body token 1.2rem but renders 16px; nav 12.5px | nav .07em, body 0 | nav in sentence case, rendered as caps through the markup |
| Meta | freight-text-pro | small | .03em | none |

- All headings are weight 400. Nothing is bold anywhere. Line height on headings is 1.5em, which is airy.
- Free near-equivalents for us: Minerva Modern is close to **Marcellus / Cinzel-light / Forum** (flared caps); futura-pt is close to **Jost**. Per Magnus's standing feedback (single sans, no Fraunces/Playfair pairing), the safest move is **one sans for everything**, with the flared caps used **only for the wordmark**, if at all.

### Palette (from Squarespace color tokens plus computed styles)
| Token | HSL | Hex | Use |
|---|---|---|---|
| white | 0,0%,100% | `#FFFFFF` | most section backgrounds |
| lightAccent | 0,0%,96.08% | `#F5F5F5` | "light-bold" bands (testimonials), body bg, listing card field |
| darkAccent | 0,0%,47.45% | `#797979` | **body paragraph colour (mid grey)**, image overlays |
| accent / safeDarkAccent | 215,37%,17% | `#1B293B` | deep navy: solid "View Property" buttons, the bright-inverse section text |
| black | 0,0%,0% | `#000000` | hero/footer sections ("black" theme), heading text on white |

- There is **no beige or sand**. The palette is cool: white, grey and navy. Warmth comes entirely from the photography (walnut, travertine, linen, taupe velvet). This is the main thing to change for our brief. Keep their restraint and swap the neutrals to warm ones: off-white `#F7F4EE`, sand `#E9E1D3`, stone `#CFC6B8`, warm grey text `#6F675E`, ink `#2A2723` instead of black or navy.
- Grey body text (`#797979` on white) is quiet but fails comfortable contrast at 16px. Our warm grey should stay at or above 4.5:1.

### Layout and grid
- Full-width sections stacked vertically. Content is centred and the max-width comes from Squarespace fluid engine (24-col grid, about 1440 wide with generous gutters).
- Home section heights at 1440 wide: hero 813 (full-bleed **native MP4 video**, 1920x1080, overlay opacity 0.02, so effectively none), intro 654, services 885, "featured homes" title band 151, listing carousel 808, testimonials 627 (#F5F5F5), journal 1034, newsletter, black footer.
- Header: **transparent over the hero**, `fixed-header-style-scroll-back`, so it hides on scroll down and returns on scroll up. Title is centred with the nav centred below it (two rows, very symmetrical, hotel-like).
- Services: three portrait images of **staggered heights** (the middle one is taller and lower). Each has a small caps heading and one line of grey text below. This is the most "crafted" moment on the site.
- Hairline rules (1px grey) separate sections.

### How listings are presented
- Home "our featured HOMES": a horizontal **carousel of cards** with arrow controls (thin long arrows, bottom left). Each card shows a landscape photo, a title in caps, a spec line `4 BEDROOMS | 4 BATHROOMS | 305 m²`, the price, and a solid navy square button "View Property". Below the carousel is "See all listings →" in underlined caps.
- **Price is always shown in full**: "€ 3,495,000", "€ 5.975.000" (separators are inconsistent across cards), "Prices Starting at € 539,000". There is never "price on request".
- Ref numbers are in the URL and title: `/ref-m-1203`, page title "Ref: M - 1203 | Móntevíe Estates".
- `/buy` and `/properties` show only a hero, a heading and one line ("A curated collection of apartments, duplexes, and luxury villas in prime locations."). The listing grid is injected by JS or is empty, and there are **no filters**. This is a small-inventory boutique pattern: no search UI at all.
- There are a couple of quality lapses: the typo "BATHRROMS", a duplicated listing, and mixed number formats.

### Property detail page (ref-m-1203), in order
1. Full-bleed **hero photo** with a dark overlay, nav in white, a small "↓" scroll cue. The label "For sale" and the title "modern Renovated Penthouse" sit on the image.
2. White band, centred: location in caps ("NUEVA ANDALUCIA, MARBELLA"), spec line `4 Bed | 4 Bath | 305 m² built`, then **"Offered at € 3,495,000"**, then an outline square button **"See it in person"** (anchors to the enquiry).
3. **Gallery reel**: a Squarespace `gallery-reel` horizontal slideshow with prev/next. 32 photos in a numbered professional set (001 to 039.jpg).
4. "Overview": a one-line subtitle (SEO-style headline) and **4 paragraphs, about 180 words**. Features are written into the prose, not bullets. "Ref: M - 1203". Two buttons: "Request viewing" and "request more info".
5. A single standalone image, then "inquire for this property" with a form.
6. Contact block (email, phone, office address). There is **no agent name or face, no map, no energy rating** (Spain), and no similar properties.
- The page carries about 200 words in total, and the photos do the selling.

### Enquiry flow
- Property form fields: **Name, Email, Phone, Desired Viewing Date (date picker), Time, Your Nationality, Message**. The Ref is passed as a hidden or prefilled value. "Your Nationality" is a nice touch for qualifying international HNW buyers and is worth keeping.
- Contact page: "Get in Touch", one line, "Monday–Saturday 09am–8pm", Phone/WhatsApp, and a form with Name, Email, Phone, "What services are you interested in?" (checkboxes), Details.
- Everything funnels to **viewing**, not to "valuation" or "call now". The tone is invitation, not conversion.

### Copy density and voice
- Home: about 300 words in total, About about 290, Departments about 256, Contact 33, property about 200.
- Voice: "Lifestyle driven real estate", "discretion, local knowledge and a hospitality-first approach", "we take care of the details quietly and efficiently". It is hospitality language borrowed from hotels, which is the Aman lesson applied to property.
- Weak spots to avoid: generic service blurbs ("Uncover buyer demand. Know your competition."), first-name testimonials ("-JAMES r."), a "STAY AHEAD OF THE MARKET" newsletter pitch with an exclamation-adjacent tone, em dashes in the copy, and random capitalisation ("EXplore ALL OUR listingS", "mónTEVÍE").

### Motion
- Squarespace global animations: **fade**, duration **0.9s**, delay **0.6s**, curve `ease`. Everything fades in on scroll and nothing slides or scales.
- Hero is a muted autoplay video. The header hides on scroll. The gallery reel uses its own easing.
- What we take: one slow fade (0.8 to 1.2s), long delays, no parallax gimmicks, video only in the hero.

### Verdict: what to copy, what to beat
- **Copy:** a two-row centred header, a wordmark in tracked caps, everything uppercase at weight 400, full-bleed hero video, staggered portrait triptych, a property page that leads with photo, then location, spec line and price, then a gallery reel and short prose, enquiry framed as "See it in person", and a nationality field.
- **Beat:** warm the palette (they are cool grey and navy), replace stock Unsplash interiors with real listing photography, fix consistency (one number format, no typos), remove the cart icon and newsletter hard-sell, and add the French legal layer (section 3), which a real Riviera site must carry and which, done quietly, reads as *more* premium.

---

## 2. Riviera agencies: what reads premium vs cheap

### Michaël Zingraf Real Estate (Christie's affiliate), michaelzingraf.com
- Nav: For Sale, Rentals, Map Search, Collections, Contact, Login, plus EN/FR/DE and a currency switch (€, $, Rs).
- The hero is a featured listing ("Remarkable castle", ref MZIOP1288) with a heavy **search panel overlaid** (city, type, max price, ref, bedrooms 1 to 6, feature tags) and a map.
- Cards: full price "€13,950,000"; rentals "From / Week"; some "Price on request". Refs are long codes (MZICA6408), and "EXCLUSIVE – CANNES…" is written in caps in titles (with dashes).
- Property page (MZICA6408) is a good model for **legal data presented calmly**: tab bar "Description, Features, Gallery, Energy, Fees, Location, Contact us"; "Sale price", "**Fees included, payable by the seller**", "Request the fee schedule"; Energy class A / GES A, 41.8 kWhEP/m².an, 5.5 kgCO2/m².an, "View energy reports"; Géorisques notice under Location; a named agent ("Angie DELATTRE PRESTIGE"); form First name, Last name*, Phone*, Email*, Message, 2 consents, Send. About 120 words of description over 12 photos ("01 / 12" counter).
- **Cheap tells:** "Since 1977" and Christie's logo lockups, valuation CTA, careers, reviews, a social feed and a buyer-guide PDF lead magnet all on one page. Untranslated keys are visible ("recruitment.title"), and French map text ("Chargement de la carte") appears on the EN site.

### John Taylor (founded 1864), john-taylor.com
- Serif display face **Austin (custom "AustinArtcurial" Light / Medium Italic)** over **Gotham**. The italic serif headings are the most "old money" type in the set.
- Top bar: 8 languages, 5+ currencies, metric/imperial. Nav: BUY, RENT (Holidays, Events, Long term), VALUATION, AGENCIES, SERVICES (… Luxury Concierge), ABOUT US, YACHTING.
- Cards: location, price as **"7 900 000 EUR"** (French thin-space style, ISO code after), "**Price upon request**", "Price from 600 EUR / Day", "Ref: V2757CO", tags **Exclusive / Exclusive agent / Co-exclusive / Video / SOLD**.
- Property page (V0417AN, Cap d'Antibes, 9 500 000 EUR): breadcrumb, a "Co-exclusive" status plus "Has this property caught your attention ?" and phone, icon row (Surface 1 095 m², Property 1 252 m², **Plot 8 000 m²**, 10 Rooms, 7 Bedrooms, **View: Peek view, Countryside, Sea**, **Exposure East**, Swimming pool), about 146-word description, "Proximities", agency block with WhatsApp, "Online enquiry" with a prefilled message "I would like to have more information about the product V0417AN". The gallery uses 300x175 thumbs, which is dated.
- **Cheap tells:** a rotating 7-slide hero, a SOLD wall, an auction-result banner for a Mercedes 300 SL, yachting in the main nav, tiny thumbnails, and figures that contradict each other on the page (1 095 vs 1 252 vs "more than 1300 sqm"). On this page the fees, DPE and Géorisques were not visible in the text, which is a compliance gap.

### Côte d'Azur Sotheby's International Realty, cotedazur-sothebysrealty.com
- Typekit kit plus Open Sans. The H1 "Luxury real estate on the Côte d'Azur" sits over a search panel, followed by 11 destination tiles (Cannes, Saint-Jean-Cap-Ferrat, Around Monaco…) and **lifestyle tiles: Sea view, Waterfront, Contemporary, Belle Epoque, Penthouse, Provençal**. That taxonomy is genuinely useful for our filters, even if we only show it as quiet text links.
- Cards read "Sale - apartment - 7 rooms - 248 m²" with "Discover". The price is not on the card.
- Property page (CA7-1309, Roquebrune-Cap-Martin): "Ref. CA7-1309", **"4,600,000 €"**, "7 Rooms / 5 Bedrooms / 258m² Area / 1418m² Land area", "**View: on sea, on valley**", Bathroom(s) / Shower room(s), Year of construction, "**Agency fees chargeable to the seller**" plus "Consult the scale of agency fees", a collapsed "Display energy diagnostics", "**Estimated amount of annual energy expenditure for standard use: between 1360€ and 1900€ (ref: 2021, 2022, 2023)**", "Information on the risks to which this property is exposed is available at: www.georisques.gouv.fr", a named agent card, Send a message / Request a Callback / Request an appointment, and BLOCTEL and reCAPTCHA notices. About 340 words of description.
- **Cheap tells:** a "To safeguard" favourites counter (literal mistranslation of "sauvegarder"), flag icons for language, a "Recruitment" link in the header, "nearly 80 agencies" network bragging, and dense SEO paragraphs.

### Knight Frank France, knightfrank.fr
- A corporate commercial-property site (offices, coworking, research, client-logo wall). The Riviera appears only as a "Residential" service label with no listings on the homepage. **Not a style reference**; it shows the corporate register to avoid.

### BARNES, barnes-international.com (the Côte d'Azur domain no longer resolves)
- Nav: Buy, Sell, Rent, Services, Hospitality, About BARNES, Agencies. Currency includes **BTC and AED**, plus a m²/sqft switch.
- Cards use long descriptive titles ("Renovated apartment of 164 m², 3 en-suite bedrooms, Paris 1st…"), "Exclusive listing:" and "New" prefixes, and the ref only in the URL. Lifestyle verticals ("The French art of living": Interior design, Yachting, Fine Wines).
- **Cheap tells:** "150 agencies, 22 countries, 75 destinations, over 25 years" stat stack (and "19 countries" elsewhere on the same page), a giant SEO link footer, and a crypto currency switch.
- Aggregator copies of Barnes Cannes listings show the typical inventory band: €5.995M to €17.5M, 430 to 500 m² on 1,000 to 3,500 m² plots, "excluding notary and registration fees".

### Carlton Immobilier, Daniel Féau
- Both were unreachable from this environment (Carlton: TLS cert mismatch on an OVH shared host; Féau: connection refused/reset). The shared-hosting cert error on Carlton is itself a cheap tell. Not assessed further.

### Pattern summary
| Reads **premium** | Reads **cheap** |
|---|---|
| One featured image, full bleed, no slider | Rotating hero carousels, search panel over the hero |
| Serif italic or tracked caps in small sizes (John Taylor's Austin) | Flags, currency/BTC switchers, 8-language bars up top |
| Price written plainly, or "Price upon request" | Stat stacks (years, agencies, countries), SOLD walls |
| Legal data in a calm tab or footnote (Zingraf "Fees", "Energy") | Valuation / careers / buyer-guide lead magnets on the home page |
| Named agent, small, with direct phone | Mistranslations ("To safeguard"), untranslated keys, contradicting m² figures |
| Spec line in one row: rooms, bedrooms, m², land, view | Tiny thumbnails (300x175), heavy SEO footers |
| Inventory curated small (Montevie: no filters at all) | Exclamation marks, "EXCLUSIVE" in caps in titles, auction/yacht banners |

---

## 3. Industry conventions a credible Côte d'Azur listing must carry

Do all of this quietly, in small type in a "Details" or "Fees and energy" fold. It is what separates a real French agency from a template.

- **Ref number** on every listing. House style is a 2 to 3 letter office or zone code plus digits (Zingraf `MZICA6408`, JT `V0417AN`, Sotheby's `CA7-1309`, Montevie `M-1203`). Proposal: a short prefix plus 4 digits, such as `CF-0412` (Cap Ferrat), `AN-0318` (Antibes), `MO-...` (Mougins). Show it as "Ref. CF-0412".
- **Surfaces**: "living area" (surface habitable, often "Loi Carrez" for apartments in copropriété) and **land / plot** (terrain) in m². Typical premium Riviera villa: 300 to 1,100 m² on 1,000 to 8,000 m². Also rooms (pièces), bedrooms, bathrooms or shower rooms. Optional: terrace m².
- **View and exposure**: "View: sea, bay, Estérel, mountain, Cap" and "Exposure: south / south-west". "Sea view" (vue mer) and "panoramic sea view" (vue mer panoramique) are the most valuable phrases in the market. Waterfront is "pieds dans l'eau".
- **Mandate status**: Exclusive (mandat exclusif), Co-exclusive, or simple. Premium houses mark "Exclusive" small and never in caps.
- **Price**: French style `9 500 000 €` or `€9,500,000` in English. **"Price on request" / "Prix sur demande"** is common at the top end (JT uses it), especially off-market. In France, agent ads must state who pays the fees, and if the buyer pays, the price must be shown with and without fees plus the fee % (arrêté of 10 January 2017). The clean, common luxury formula is **"Fees payable by the seller"** / "Honoraires à la charge du vendeur", which means one price only. The agency fee scale (barème des honoraires) must be accessible from the site: a footer link "Fee schedule".
- **DPE (energy performance)**: energy class A to G plus GES (climate) class A to G, with kWhEP/m²/year and kgCO2/m²/year. Since 2022, ads also show the **estimated annual energy costs** ("between X € and Y €, reference year …"). Class G carries a mandatory "excessive energy consumption" mention. Present it as the small A to G colour bar in muted tones, or text only.
- **Géorisques**: "Information on the risks to which this property is exposed is available at www.georisques.gouv.fr" (mandatory in ads since 2023).
- **Copropriété** (apartments): number of lots, average annual charges, and any ongoing procedure.
- **Agency legal mentions** (footer or legal page): carte professionnelle (CPI number, CCI Nice Côte d'Azur), financial guarantee, RC Pro insurance, Hoguet law, RGPD notice, Bloctel mention for phone contact.
- **Units and currency**: m² first, with sq ft optional in a quiet toggle. € only. Skip the BTC/AED theatre.
- **Seasonal vs sale**: Riviera houses split Sale, Seasonal rentals (per week, July and August peak) and Long-term. For a calm demo: **Sale only**, maybe "Seasonal" as a single quiet link.
- **Zones vocabulary** for navigation and filters: Cap Ferrat, Villefranche, Beaulieu, Èze, Cap d'Ail / around Monaco, Roquebrune-Cap-Martin, Nice (Mont Boron), Cap d'Antibes, Super Cannes / Cannes Californie, Mougins, Saint-Paul-de-Vence, Saint-Tropez / Ramatuelle. Sotheby's style tags: Sea view, Waterfront, Belle Époque, Provençal (mas / bastide), Contemporary, Penthouse.

---

## 4. Direct implications for our build

1. **Header**: centred wordmark in tracked caps (about .16em, weight 400), nav as one quiet row underneath or in a "Menu" overlay. Transparent over the hero, hides on scroll down and returns on scroll up.
2. **Home**: full-bleed video or still (one image, no slider), then one sentence, then a staggered portrait triptych, then 3 to 6 houses shown large, one per row or in a 2-up, then a single line on the house, then a footer. Target **under 150 words** on the home page (Montevie is about 300).
3. **Listing card**: photo (4:5 or 3:2), place in caps, then one spec line `5 bedrooms · 640 m² · 4 200 m² land · sea view` (use a middle dot, never a dash), then price or "Price on request". No buttons: the whole card is the link.
4. **Property page**: hero photo, then centred place / spec line / price, then "Arrange a visit" (our "See it in person"), then a long horizontal or full-width stacked gallery of 20 to 30 photos, then 80 to 150 words of prose, then a "Details" fold (Ref, surfaces, land, view, exposure, year, mandate, **Fees payable by the seller**, DPE/GES classes and cost band, Géorisques line), then one named advisor with a direct line, then the enquiry.
5. **Enquiry**: Name, Email, Telephone, Preferred date to visit, Nationality / country of residence (optional), Message prefilled with the Ref. Button: "Request a visit". Confirmation: one sentence.
6. **Motion**: fade only, 0.9 to 1.2s, ease-out, 0.2 to 0.6s stagger. A slow Ken Burns at most on the hero. No parallax on listings.
7. **Palette** (warm, not Montevie's cool grey and navy): `#FBF9F5` paper, `#F3EEE6` off-white, `#E6DDCF` sand, `#CBBFAE` stone, `#8A8073` warm grey, `#4A443D` text, `#2A2622` ink. No navy and no pure black.
8. **Type**: one sans for everything (Jost or a similar geometric sans at 300 to 400, small sizes, tracked caps for labels). If a serif appears at all, only in the wordmark.
