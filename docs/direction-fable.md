# Creative direction, Fable boss

Written 2026-10-09 after reading every file in `docs/research/`, both listing data sets, and contact sheets of all 142 listing photos and all 30 atmosphere photos. This is an independent direction, to be merged with the other boss's. Where I depart from a research recommendation I say so and why.

The whole document, including every line of proposed copy, uses no em dashes and no en dashes.

---

## 0. The decision in one paragraph

The site is a sheet of warm paper with photographs laid on it, in the Aman manner, but set at seven in the morning on the Côte d'Azur. One serif for reading, one geometric sans for wayfinding and the wordmark, no accent colour, no scroll animation, no hover zoom, square corners, images inset on the paper with a 24px margin like prints. Twelve houses, each introduced by a place name, a name, one sentence and a quiet line of particulars. The home page carries about 110 words. The name is **Aube'Mar**.

---

## 1. Name and wordmark

### Pick: Aube'Mar

French *aube* (dawn) and Occitan *mar* (sea). "Dawn sea." Pronounced ohb-MAR in every target language (English, French, Norwegian, Arabic). It is the owner's stated preference (`owner-preference.md`), and I would have chosen it anyway over Mont'Albe for three reasons:

1. **It is not a Montevie derivative.** "Mont'Albe" borrows Montevie's prefix, and a prospect who has seen Montevie will read it as a copy. Aube'Mar owes nothing to either reference brand.
2. **The name is the hero image.** The two best atmosphere frames in the set are a dawn sea with a single boat (`sailboat-beige-sea`, `boat-still-water-dawn`). The brand idea, the opening image and the name are the same thing. That is the kind of coherence Aman has (the name means peace, the pictures are peaceful).
3. **It is the softest sound on the list**, two syllables, and it carries no place in it, so the house is never tied to one town.

Status from `naming.md`: aubemar.com, aubemar.fr and aubemar.estate all unregistered on 2026-10-09. No brand use found. Aubade (lingerie, class 25) is the only near sound and is a different class. **Still to do before any public use:** a manual TMview and INPI search for AUBEMAR in classes 36 and 43 (offices EM, FR, WO), and a logged-in Instagram check of @aubemar. Nothing has been bought and nothing should be bought without the owner's explicit approval.

Runner up if a conflict appears: Mont'Avisio (Roman name of Èze, vanished). Mont'Albe third.

### Wordmark

Live text, no image, no symbol, no monogram, no tagline (Montevie and Aman both prove that the name alone is enough).

- `AUBE’MAR` in **Jost 300**, uppercase, letter-spacing **0.34em**, ink `#2C2824`. Header size 17px, footer 22px, OG image 56px.
- The apostrophe is the typographic apostrophe U+2019, not the straight quote. It is the only mark in the brand: a small raised stroke between the two words, which at wordmark size reads like a first light above the horizon. Do not add a macron, a dot, a rule or any other device.
- Over photographs the wordmark is paper `#F7F3EC`, never pure white.
- Favicon and app icon: the letter pair `A’` in Jost 400 charcoal, centred on a paper disc (same device as Aman's avatar: wordmark on an off-white circle).
- Never set the name in the serif, never in bold, never with the apostrophe dropped except in URLs, handles and file names (`aubemar`).

---

## 2. Brand idea

**Aube'Mar sells the first hour of the day on the Côte d'Azur, and the twelve houses that have it.**

Everything follows from that: morning light in the grade, empty terraces instead of people, viewings "before ten", copy that names the hour and the season rather than the features, and a site that never raises its voice because the coast at dawn does not.

---

## 3. Palette

White, off-white, beige and stone only. No accent. This departs from the Villa Alba brief (one bronze accent) because Aman has no accent at all, and the moment a bronze underline appears the page starts to look like a hotel template. Colour lives in the photographs.

```css
:root {
  --paper:  #F7F3EC;  /* page ground, slightly brighter than Aman's #F3EEE7 for Riviera light */
  --chalk:  #FCFAF6;  /* header when scrolled, enquiry form panel, menu drawer */
  --sand:   #EAE3D7;  /* the one deeper band per page: viewings band, particulars, footer */
  --stone:  #C9BFB0;  /* image placeholders, hairlines on sand, outline button border */
  --hair:   #DED6C9;  /* hairlines on paper */
  --taupe:  #746A5E;  /* eyebrows, secondary text, footer lists (4.8:1 on paper) */
  --ink:    #2C2824;  /* all primary text, the one solid button */
  --white:  #FFFFFF;  /* input fields only */
}
```

Rules:
- Body text is ink on paper, never black on white. Reversed text on the solid button is paper, not white.
- `--taupe` is the floor for any text a person must read; `--stone` is for lines and placeholders only.
- Pure white appears only inside form fields, so the enquiry form reads as a sheet of stationery laid on the paper.
- Scrim over photographs: none by default. Where the wordmark must sit on a photo (header over the hero before scroll), a 12% ink gradient over the top 160px only.
- Focus ring: 1px ink outline, 3px offset. No coloured ring.
- Image placeholder colour is `--stone`, so an image loading looks like a sheet of card, not a grey box.

---

## 4. Type

Two families from Google Fonts, four files in total. The owner's standing "single sans" rule came from trade and clinic demos; the Villa Alba brief already overrode it for this register, and Aman's whole voice is the inversion "serif for reading, sans for wayfinding". I keep that inversion but swap the faces the research proposed.

| Role | Family | Why |
|---|---|---|
| Reading (headings, body, prices, captions) | **Newsreader**, weights 300 and 400, italic 400, optical size axis on | A book face with a text and a display cut, modest contrast, lining numerals available. Reads like the Lyon faces Aman uses. Already proven in `structured-talent-demo/app/opengraph-image.tsx` (TTF fetch works for the OG renderer). |
| Wayfinding (wordmark, eyebrows, nav, buttons, form labels) | **Jost**, weights 300 and 400 | A Futura cut, which is exactly what Montevie's old-money look rests on (futura-pt). It gives the wordmark for free, so no logo file. |

Rejected: Cormorant Garamond (too calligraphic at display size, reads "wedding"), Playfair and Fraunces (banned by the owner), Inter (too technical for the eyebrows), any script face.

Root font size stays 16px. Scale (desktop / mobile):

| Token | Face | Size / line | Tracking | Case | Where |
|---|---|---|---|---|---|
| display | Newsreader 300, opsz 36 | 44/48 desktop, 32/38 mobile | 0 | sentence | H1 on Estates index, estate name on detail, The House, Enquire |
| h2 | Newsreader 400 | 28/36, mobile 24/32 | 0.01em | sentence | section heads, feature titles |
| h3 | Newsreader 400 | 20/28 | 0.02em | sentence | card titles, zigzag row names |
| statement | Newsreader 300 italic allowed on one word | 30/40, mobile 24/34 | 0 | sentence | the single home page statement |
| lead | Newsreader 400 | 19/30 | 0.01em | | intros, centred, max 640px |
| body | Newsreader 400 | 17/28 | 0.01em | | prose, max 60ch |
| small | Newsreader 400 | 15/24 | 0.01em | | spec lines, prices, particulars, captions, credits; `font-variant-numeric: lining-nums tabular-nums` |
| eyebrow | Jost 400 | 11/16 | 0.22em | UPPER | one per section at most, place names |
| nav | Jost 400 | 12/16 | 0.14em | UPPER | header links, drawer items at 22px sentence case |
| button | Jost 400 | 12/16 | 0.18em | UPPER | the three CTA kinds |
| label | Jost 400 | 11/16 | 0.12em | sentence | form labels |
| wordmark | Jost 300 | 17 header, 22 footer | 0.34em | UPPER | |

Discipline:
- The largest heading on the home page is 30px (the statement). The 44px display size appears once per page and never on the home page. Weight never exceeds 400.
- `font-synthesis-weight: none` on body so a missing weight is never faux-bolded.
- No text below 11px, and nothing a person must read below 15px except eyebrows and labels.
- Italic is allowed once per page: one word inside the statement or a caption ("the *long* afternoon").
- Numbers: never in headlines. Prices and areas live in the small serif with lining tabular figures.

---

## 5. Site map and page layouts

Six routes plus the colophon. No journal in version one (three titles are reserved in section 5.8 if the owner wants it later).

```
/                       Home
/estates                Estates index
/estates/[slug]         Estate detail (12 published, 2 held in data)
/house                  The House (about)
/enquire                Enquire
/colophon               Credits, sources and legal mentions
```

Global layout rules (from the Aman measurements, adapted):
- Container 1440px, side gutter `clamp(16px, 1.7vw, 24px)`. Photographs go to the gutter, never to the window edge, on desktop. On mobile only the home hero is edge to edge.
- Section spacing `clamp(80px, 10vw, 160px)`. Bands (sand) have 80px top and bottom padding. Between a photograph and its eyebrow: 24px. Eyebrow to title: 20px. Title to sentence: 12px. Sentence to link: 40px.
- Column gap 37px for image rows, 48px for two-column text.
- Base unit 8px. When in doubt, add space.

### 5.1 Header

- Height 88px, compacts to 64px after 40px of scroll (height transition 400ms, no slide away, no shadow, no border).
- Three-column grid `1fr auto 1fr`: left "Menu" (three hairlines plus the word, Jost 12 tracked); centre wordmark; right one text link "Enquire" (underlined on hover only). No filled button in the header, no phone, no WhatsApp, no language switch, no search.
- Transparent over the home hero (wordmark and links in paper), then `--chalk` at 95% with a 12px blur once scrolled, cross-fading the two wordmark colours rather than swapping.
- Drawer: opens from the left as a `--chalk` panel 480px wide (full width on mobile), items in Newsreader 22px: Estates, The House, Enquire, Colophon; below a hairline, the twelve estate names in Jost 12 caps as a quiet index. Closes on route change, on Escape, and on the single hairline X. Body scroll locked while open. `inert` on the closed drawer.

### 5.2 Home

Target under 120 words of main content. Section by section, with the exact copy.

1. **Hero**: the sea film `sea-surface-warm-dusk.mp4` (poster is its own frame at 2s, extracted with ffmpeg, graded), inset on paper at desktop in 16:9, edge to edge in 4:5 on mobile using `curtain-white-wind-vertical.mp4` with `terrace-sea-pale-morning.jpg` as its poster. Nothing written on the film. Reduced motion, data saver and slow connections get the poster only.
2. **Under the hero** (paper, left aligned, 640px):
   - eyebrow: `CAP D'AIL TO RAMATUELLE`
   - h2: `Houses for the first hour of the day.`
   - link: `The estates`
3. **Feature pair** (915 + 37 + 439, both 570px tall):
   - Left, landscape 1.61:1: `les-pins-eze-bord-de-mer/01.jpg` (umbrella pines over the sea through the glass balustrade). Below it: eyebrow `ÈZE BORD DE MER`, h3 `Les Pins`, sentence `A new house of stone and pale oak among old umbrella pines, level with the sea.`, link `Discover more`.
   - Right, portrait 0.76:1: `atmosphere/leaf-shadow-wall.jpg` cropped portrait. Below it: eyebrow `THE HOUSE`, h3 `A few houses, seen early`, sentence `We take on a small number of houses each year and show each one at the hour it is at its best.`, link `About the house`.
4. **Statement and wide image**: one centred sentence at 30px, 680px wide, then a 21:9 photograph inset on paper.
   - `The coast is loudest in August and quietest at seven in the morning. We prefer it then.`
   - Image: `atmosphere/sailboat-beige-sea.jpg`, horizon kept in the upper third, boat right of centre.
5. **Estates** (three portraits 0.76:1 in a row, 37px gaps):
   - eyebrow above the row: `ESTATES`
   - cards, each with the name in Newsreader 20 on the left and the commune in Jost 11 caps on the right, no frame, no button, whole card is the link:
     - `maison-edouard-beaulieu/02.jpg` (olive tree over the infinity pool and the sea), `Maison Édouard`, `BEAULIEU-SUR-MER`
     - `bastide-des-pres-chateauneuf/10.jpg` (long table under the plane tree), `Bastide des Prés`, `CHÂTEAUNEUF-GRASSE`
     - `domaine-des-vignes-saint-tropez/02.jpg` (umbrella pines over the lawn), `Domaine des Vignes`, `SAINT-TROPEZ`
   - below the row, right aligned text link: `All twelve`
6. **Sand band** (the one deeper band on the page), image left 894x552 (`atmosphere/shutter-light-on-wall.jpg`), text right in a 469px column:
   - eyebrow `VIEWINGS`
   - h2 `In person, before ten.`
   - sentence `Every viewing is private and arranged for the morning, when the light is level and the roads are empty.`
   - link `Arrange a viewing`
7. **Footer** (sand, see 5.7).

Word count of items 2 to 6: 106 words.

### 5.3 Estates index

1. display H1, left: `Estates`
2. Two columns, 48px gap. Left (h2 weight 300): `Twelve houses between Cap d'Ail and Ramatuelle.` Right (lead): `Each is held on a private basis and shown by appointment. Prices are given where the seller allows; the others are available on request.`
3. Centred text link: `Make an enquiry` (anchors to /enquire).
4. **No filters, no search, no map, no sort control.** Two groups with a serif h2 and a hairline under each: `The eastern coast` and `The western coast`. Order inside each group runs along the coast from Monaco westward:
   - East: Villa Cap Fleuri (Cap-d'Ail), Les Pins (Èze), Maison Édouard (Beaulieu-sur-Mer), Domaine des Cyprès (Saint-Jean-Cap-Ferrat), Bastide de la Rade (Villefranche-sur-Mer), Le Belvédère (Nice).
   - West: Villa Blanche (Cap d'Antibes), Mas Blanc (Mougins), Bastide des Prés (Châteauneuf-Grasse), Domaine des Vignes (Saint-Tropez), Bastide du Ciel (Gassin), Maison des Collines (Ramatuelle).
5. **Zigzag rows** exactly as Aman's residences index: image 894x552 (1.62:1) alternating left and right, text column 469px top aligned, 635px row height on desktop, stacked on mobile with the image first.
   - eyebrow: commune in caps, e.g. `VILLEFRANCHE-SUR-MER`
   - h3: the name
   - sentence: the `short` field from the data (20 words or fewer, already written and dash free)
   - small serif spec line, items separated by a middle dot: `7 bedrooms · 523 m² · 2,150 m² of land · sea view`
   - small serif price line: `€15,500,000` or `Price on request`
   - a hairline, then an outline button `Discover more` (1px `--stone` border, 36px high, 35px side padding, square). This is the only place the outline button appears.
6. Footer.

Price rule, house style: a figure is shown up to and including €20,000,000; above that the line reads `Price on request`. That makes Domaine des Cyprès and Domaine des Vignes "on request", which is also how the top of this market behaves (John Taylor, see the Montevie teardown). The real figure stays in the data and in the colophon table.

### 5.4 Estate detail

Page ground stays `--paper`; the particulars sit on one `--sand` band. No sub-navigation bar, no tabs, no gallery lightbox, no carousel, no map, no agent card, no "similar properties" grid.

1. **Opening image**: the estate hero, inset 1391x860 (1.62:1), nothing written on it.
2. **Centred intro** (680px): eyebrow `ÈZE BORD DE MER, ALPES-MARITIMES`; display H1 `Les Pins`; lead paragraph = the `short` field plus one sentence of the `long` field; then the small serif spec line and price line as on the index; then a text link `Arrange a viewing` anchored to the form at the foot of the page.
3. **Sequence** (the Aman carousel rhythm from `aman-instagram.md`: long view, words, pan, detail, life, texture, close), built from the curated image order in `data/curation.json` (section 6). Layout alternates: full width 1.62:1, then a diptych of two 0.76:1 portraits with a 37px gap, then one 4:5 detail floating at 440px wide with at least 8vw of paper either side, then full width again. Images fade in on load. No captions, except an optional single italic line under the floating detail ("Linen, morning.").
4. **Prose**: the `long` field (60 to 90 words), set in body size in the right half of the container only (x from 50%), the left half empty. One paragraph.
5. **Particulars** (sand band, h2 `Particulars`, a two-column definition list in small serif, labels in Jost 11 taupe):
   - Reference: `AM-0611` (our own refs, two letters plus four digits; the source ref lives in the colophon)
   - Living area: `400 m²`
   - Land: `1,300 m²`
   - Bedrooms: `5`, Bathrooms: `4` (omit the row where the data is null)
   - View: `Sea` / `Park` / `Hills to the sea`
   - Completed: `2025` (omit where null)
   - Mandate: `Private sale`
   - Fees: `Payable by the seller.`
   - Energy: `Diagnostics available on request.` (never invent a class; the sources do not give one)
   - Risks: `Information on the risks to which this property is exposed is available at georisques.gouv.fr.`
6. **Enquiry** (chalk panel, 640px form, labels above fields, 40px high inputs with 1px `--taupe` border, square, white fill, Newsreader 16 inside so iOS does not zoom):
   - h2 `Arrange a viewing`
   - line `Tell us when you are on the coast. We answer personally.`
   - fields: First name, Last name, Email, Telephone, Country of residence, Preferred date, Message (prefilled: `I would like to arrange a viewing of Les Pins, ref. AM-0611.`)
   - consent checkbox: `You may keep my details to reply to this enquiry.`
   - solid button `Send` (ink fill, paper text, 140x42)
   - confirmation page copy: `Thank you. We will write back shortly.`
7. **Next**: a hairline, then right aligned small serif `Next, Maison Édouard` linking to the next published estate along the coast, wrapping at the end.
8. **Credit line** (small serif, taupe): `Photographs from the listing agency's public listing, shown for study. Sources in the colophon.`
9. Footer.

### 5.5 The House

1. display H1 `The House`
2. lead, 680px centred: `Aube'Mar is a small house of estate agents on the Côte d'Azur. We take on a few houses a year, most of them never advertised, and show each one as it is.`
3. Full width image: `atmosphere/umbrella-pines-hillside-villa.jpg` (graded, its lilac pulled toward grey).
4. Image left (912x563, `atmosphere/limestone-vault.jpg` cropped landscape) and three short titled blocks on the right (Aman residence pattern), h3 plus body:
   - `A few houses` / `Twelve at present, between Cap d'Ail and Ramatuelle. We would rather know each one well than list many.`
   - `Seen early` / `Viewings are private and set for the morning. The coast is at its truest before the day fills.`
   - `Said plainly` / `No superlatives, no staging, no figures we cannot stand behind. The particulars are on every page.`
5. One floating detail 4:5: `atmosphere/stone-pine-solitary.jpg`.
6. Closing line, centred: `Enquiries are answered by the partners.` then link `Enquire`.
7. Footer.

No portraits, no names, no founding year, no "since", no team grid. A fictional house must not invent people with faces.

### 5.6 Enquire

1. display H1 `Enquire`
2. lead: `Write to us about a house, or about what you are looking for.`
3. The same form as 5.4 without the prefilled message; Message placeholder empty.
4. Aside column (small serif): `By appointment` / `Saint-Jean-Cap-Ferrat` / `enquiries@aubemar.com`. No street number, no phone number, no WhatsApp.
5. Footer.

Version one has no mail backend: the form posts to a server action that validates and redirects to `/enquire/sent` with the confirmation line. Wiring Resend later is a one-file change.

### 5.7 Footer

Sand band, 4-column grid `1.4fr 1fr 1fr 1.2fr` on desktop, stacked on mobile.
- Column 1: wordmark at 22px, then small serif `Saint-Jean-Cap-Ferrat, by appointment.`
- Column 2: eyebrow `ESTATES`, then the twelve names in small serif, two per line is fine.
- Column 3: eyebrow `HOUSE`, links: The House, Enquire, Colophon.
- Column 4: eyebrow `WRITE`, `enquiries@aubemar.com`.
- Bottom hairline, then a 13px Jost line: `© 2026 Aube'Mar. A study; photographs are credited in the colophon.` No social glyphs, no newsletter, no sign-up button.

### 5.8 Colophon

1. display H1 `Colophon`
2. body: `Aube'Mar is a study in how a house of estates on the Côte d'Azur might present itself. It is not a licensed agency and sells nothing. The houses shown are real and are listed by the agencies credited below; the photographs and particulars are drawn from their public listings. Atmosphere photography is from Unsplash and Pexels under their licences.`
3. Table `Estates`: our name, our ref, source agency, source ref, listing URL, price as listed. Generated from the JSON.
4. Table `Atmosphere`: file, photographer, source URL. Generated from `data/atmosphere.json` and `data/video.json`.
5. `Legal mentions`: a short placeholder block in small serif stating that no professional card, financial guarantee or insurance is held because the house is a study. This is more honest than fictional CPI numbers and reads calmer than leaving the section out.
6. Last line: `Made by ClearScaler.` with the link. The only place the maker appears.

Journal, reserved for later: three entries titled `Before the Mistral`, `The Long Afternoon`, `Light on Stone`, each a 2-column square grid entry (Aman stories) with one image and one standfirst. Not built in version one.

---

## 6. Photo direction

### 6.1 What the contact sheets show

The listing sets are agency photography: midday, saturated skies, cyan pools, wide lenses. They are usable because the build pipeline grades every frame into one shoot (6.4), and because the curation below removes the frames that cannot be saved. The atmosphere set is already in the register and needs only a light grade.

Best frames in the whole collection, in order (these carry the home page and the OG image):
1. `atmosphere/sailboat-beige-sea` (horizon upper third, 70% empty, one boat)
2. `maison-edouard-beaulieu/02` (olive tree over an infinity pool and open sea)
3. `atmosphere/boat-still-water-dawn` (portrait, pink dawn, one boat)
4. `bastide-des-pres-chateauneuf/10` (long table under a plane tree)
5. `les-pins-eze-bord-de-mer/01` (umbrella pines over the sea)
6. `maison-des-collines-ramatuelle/01` (the house small in a long view)
7. `villa-cap-fleuri-cap-dail/01` (symmetrical Belle Époque facade, straight on)
8. `atmosphere/shutter-light-on-wall`, `leaf-shadow-wall`, `limestone-vault` (textures)
9. `domaine-des-vignes-saint-tropez/02` (pines over lawn)
10. `maison-edouard-beaulieu/12` (sea through the steel window, frame in frame)

### 6.2 Which listings to publish, and the curated sequence

Twelve published, two held. A house is published only if it can show at least five frames that survive the grade without a cheap tell (people facing camera, loud furniture, watermark, mini golf, resort parasols, gilded salons).

| Estate | Decision | Hero | Sequence (file numbers) | Drop | Grade preset |
|---|---|---|---|---|---|
| Villa Cap Fleuri, Cap-d'Ail | publish | 01 | 01, 03, 08, 05, 02, 11, 12 | 10 (red curtains), 06 (red cushions), 09 | standard |
| Les Pins, Èze | publish, home feature | 01 | 01, 02, 03, 06, 09, 05, 11 | 04 (red object), 10 (duplicate of 11) | blue |
| Maison Édouard, Beaulieu | publish, home card | 02 | 02, 01, 12, 07, 11, 06, 08, 10 | 04, 05 (busy salons), 03 | standard |
| Domaine des Cyprès, Cap Ferrat | publish, price on request | 02 | 02, 05, 04, 08, 03, 06 | 01 and 10 (mini golf visible), 07, 09 | strong (HDR terracotta) |
| Bastide de la Rade, Villefranche | publish | 03 | 03, 01, 06, 05, 09, 07, 02, 04 | 10 (turquoise sofas), 11 (pink room) | strong |
| Le Belvédère, Nice | publish | 05 | 05, 01, 06, 02, 08, 04 | 09 (coloured object), 07 (hotel look), 03 | blue |
| Villa Blanche, Cap d'Antibes | publish | 04 | 04, 01, 07, 10, 03, 09, 06 | 08 (gilded salon), 02, 05 (same facade thrice) | blue |
| Mas Blanc, Mougins | publish | 01 | 01, 02, 05, 04, 07, 03 | 06 (kitchen), 08 (bathroom) | standard |
| Bastide des Prés, Châteauneuf | publish, home card | 10 | 10, 01, 06, 03, 07, 09, 04, 11, 12 | 05 (orange shelves), 02 optional | warm, skip recomb |
| Domaine des Vignes, Saint-Tropez | publish, price on request, home card | 02 | 02, 01, 03, 05, 07, 04, 08 | 09 (bathroom), 06 | standard |
| Bastide du Ciel, Gassin | publish | 01 | 01, 02, 05, 09, 06, 03 | 07, 08 (dated interiors), 04 | warm |
| Maison des Collines, Ramatuelle | publish | 01 | 01, 10, 02, 06, 05, 09, 07 | 03, 04, 08 (render-like whites) | standard |
| Villa Lérins, Cannes | **hold** (`published: false`) | 01 | 01, 02, 04 | the rest | | 
| L'Attique, Saint-Tropez | **hold** (`published: false`) | | | | |

Why the two are held: Villa Lérins reads as a resort (parasols, wicker, teal sofas, three pool angles) and only two frames survive; Cannes is covered by Cap d'Antibes and Mougins in the middle of the coast. L'Attique is a flat in a gated residence with a communal pool and an indoor pool; it is not a house and it pulls the register toward "apartment listing". Both stay in the data and the colophon so nothing is lost; reinstating one is a flag flip. If the owner wants a Cannes address, `listings-west.md` names CA9-1010 Ramatuelle (umbrella pine over the sea) and CA6-2831 Cap d'Antibes as clean runners up, not a Cannes one; Cannes would need a new scrape.

Twelve also fixes the copy: "All twelve", "Twelve houses", "Twelve at present".

### 6.3 Crops

- Opening image on the detail page and the home feature: 1.62:1, horizon on the upper third or the lower fifth, subject off centre.
- Mobile hero: 4:5 recropped through `object-position` from a stored focal point, never squashed.
- Diptychs: 0.76:1 portraits. Floating detail: 4:5 at 440px wide with 8vw of paper either side.
- Index rows and home cards: 1.62:1 and 0.76:1 respectively.
- Every horizon straightened in the pipeline; every image stores `focal: [x, y]` in percent in `data/curation.json`.
- Crop sea and sky in, not out. If a frame has a pool in the foreground and sea behind, crop toward the sea.

### 6.4 Grade

One build step so photographs from four agencies and thirty Unsplash photographers look like one shoot: warm whites, muted greens, soft blacks, one hero hue per image. The `sharp` script from `aman-instagram.md` section C is the implementation; the presets referenced in the table above are:

- `standard`: `modulate({ brightness: 1.03, saturation: 0.86, hue: -3 })`, `linear(0.92, 14)`, the warm recomb, `gamma(1.05)`, restrained sharpen.
- `strong` (HDR agency sets): saturation 0.75, `linear(0.88, 18)`.
- `blue` (cyan pools and skies): hue -8, blue row of the recomb at 0.92, saturation 0.80.
- `warm` (already golden): skip recomb, saturation 0.92.

Output: AVIF at quality 58 plus a JPEG fallback, 2400px long edge, into `public/estates/<slug>/NN.jpg` and `public/atmosphere/<name>.jpg`; originals move to `assets/originals/` and are never served. The CSS fallback `filter: saturate(.86) contrast(.92) brightness(1.03) sepia(.06)` is kept on a `.photo` class only for images that cannot be reprocessed; never exceed `sepia(.1)`.

A 3.5% monochrome grain tile is overlaid on the home hero only, in CSS, never baked into gallery images.

### 6.5 Rhythm rules across every page

- Alternate scale: never two aerials or two details in a row.
- Alternate light: never three dusk frames in a row (the set has almost none anyway).
- At most one human figure per page, small and turned away. The current sets have none; keep it that way.
- Every index row and home card uses its opening frame graded identically so the index reads as one series.
- No text on photographs anywhere. Words sit on paper, below or beside.

---

## 7. Motion

Calm comes from stillness. Aman has no scroll-triggered reveals at all, and that is the single biggest difference between its site and every "luxury template". So, departing from the demo convention and from `craft-demos.md`:

- **No `Reveal` component. Nothing moves on scroll.** Text is always rendered at full opacity in its final place.
- Images fade in on load: `opacity 0 → 1`, 600ms, ease-in-out, from the `--stone` placeholder. That is the only entrance animation on the site.
- Hero film: poster first (it is the LCP), the video attached after idle (the Get Work Abroad loader, ported as is: 720p under 768px, 1080p above, WebM then MP4, skipped on reduced motion, save-data and 2g/3g, retried once on first interaction). The video fades over the poster in 1.5s. Loop seamlessly; the 30s clip gets a 1s cross-dissolve at the join when re-encoded.
- No Ken Burns, no slow zoom, no parallax, no hover zoom on images, no card lift, no marquee, no counters.
- Links and buttons: `color .4s, background-color .4s, border-color .4s`. Underlines appear on hover only, offset 6px.
- Header compaction 400ms. Drawer `slide-fade-in-left` 400ms, overlay fade 300ms.
- `prefers-reduced-motion: reduce`: poster instead of video, image fades removed, drawer appears without sliding.
- Native scroll only, `data-scroll-behavior="smooth"` on `<html>` for anchor links. No Lenis, no scroll-jacking.

---

## 8. What must never appear (the cheap list)

From the owner's feedback, the Aman discipline and the agency teardowns. Any one of these on a page is a reason to reject the page.

- Stat cards, counters, "since 1977", "150 agencies", "4.9 stars", awards, press logos, testimonials with first names.
- Floating badges, "Exclusive" in caps, "New", "Sold" walls, ribbon tags on cards.
- A search panel or filters over the hero, a map, a currency or unit switch, flag icons, a language bar.
- Rounded corners, drop shadows, gradients as decoration, gold or bronze dividers, glyph ornaments, icon rows.
- Pill buttons, two CTAs in one block, arrows inside buttons, "Book a call", "Don't miss", exclamation marks, emoji.
- Hover zooms, card lifts, parallax, scroll reveals, marquees, pulsing dots, loaders.
- Text on photographs, dark scrims across whole images, HDR frames, blazing blue twilight, people facing the camera, cars, TVs, pool robots, watermarks.
- Bathrooms, kitchens, gyms, saunas, cellars, cinemas or billiard rooms as lead or second images.
- A black or navy footer, a chat bubble, a newsletter pop-up, a cookie banner larger than one line.
- Em dashes and en dashes anywhere, including quoted source text on the colophon (rewrite with commas or full stops).
- Fabricated facts about a real listing: energy classes, year built, bathroom counts, agent names. Where the source is silent the row is omitted or says "on request".
- Any paragraph wider than 680px when centred, any home page over 150 words, any heading over 30px on the home page.

---

## 9. Technical plan

Stack and conventions follow `craft-demos.md` and `craft-luxury.md` unless noted.

### 9.1 Repo and stack
- `create-next-app` on **next 16.2.11, react 19.2.4, tailwind 4** (CSS-first `@theme`), TypeScript 5, ESLint 9, `src/` layout with `@/` alias. Copy `AGENTS.md` and `CLAUDE.md` (`@AGENTS.md`) from `~/get-work-abroad`. Read `node_modules/next/dist/docs/` before writing code; Next 16 has breaking changes (`proxy` not `middleware`, `preload` not `priority`, `params` is a Promise).
- Dev port **3430** (`next dev -p 3430`).
- Fonts via `next/font/google`: `Newsreader({ weight: ["300","400"], style: ["normal","italic"], axes: ["opsz"] })` and `Jost({ weight: ["300","400"] })`, variables on `<html>`, mapped in `@theme inline`.
- Only dependency beyond the stack: `sharp` as a dev dependency for the grade script.

### 9.2 Data
- `data/listings-east.json` and `data/listings-west.json` stay the source of truth and are never hand-edited for presentation.
- New `data/curation.json`, keyed by slug: `published`, `order` (position along the coast), `coast` (`east` | `west`), `ref` (our AM-xxxx), `hero`, `sequence[]`, `drop[]`, `grade` preset, `focal` per file, `view`, `mandate`. Section 6.2 is its content.
- `src/lib/estates.ts` merges the three files at build time into a typed `Estate[]`, exposes `published()`, `bySlug()`, `next(slug)`. `src/lib/atmosphere.ts` does the same for `data/atmosphere.json` and `data/video.json`. `src/lib/site.ts` holds the name, email, nav and the exact copy strings from section 5 so layout files never contain prose.

### 9.3 Images and video
- `scripts/grade.mjs` (sharp) reads `assets/originals/**`, writes graded 2400px AVIF plus JPEG into `public/estates/<slug>/` and `public/atmosphere/`, honouring the preset per estate and the drop list. Runs on `prebuild`. Originals: move `public/listings/*` and `public/atmosphere/*` into `assets/originals/` (about 120MB, under GitHub limits, no LFS needed).
- `next.config.ts`: `images.formats ["image/avif","image/webp"]`, `qualities [70, 82, 90]` (declared, or Next 16 silently uses 75), `deviceSizes [640, 828, 1080, 1440, 1920, 2560]`, `minimumCacheTTL 31536000`; headers: `/video/:path*` immutable for a year, and `X-Robots-Tag: noindex, nofollow` on every route.
- `sizes` must be honest: `100vw` for the hero, `(min-width:1024px) 66vw, 100vw` for the wide feature, `(min-width:1024px) 30vw, 50vw` for cards. Eager loading only for the hero and the first row. Every image inside an aspect-ratio box with the `--stone` background.
- Video: re-encode `sea-surface-warm-dusk.mp4` to 1080p and 720p MP4 plus WebM VP9, with the loop join dissolved; extract the poster with `ffmpeg -ss 2 -frames:v 1`; grade the poster like a photo. Same for the portrait curtain clip.

### 9.4 Routes and components
- `src/app/layout.tsx`: fonts, `metadataBase` on the vercel.app URL, `title: { default: "Aube'Mar", template: "%s · Aube'Mar" }`, `robots: { index: false, follow: false }`, skip link, `data-scroll-behavior="smooth"`.
- `src/app/page.tsx`, `estates/page.tsx`, `estates/[slug]/page.tsx` (static params from `published()`, `generateMetadata` awaiting `params`, `notFound()`, wrap-around next link, cloned from `~/fotogenic-of-scotland-demo/src/app/weddings/[slug]/page.tsx`), `house/page.tsx`, `enquire/page.tsx`, `enquire/sent/page.tsx`, `colophon/page.tsx`.
- `src/app/opengraph-image.tsx`: ported from `~/structured-talent-demo/app/opengraph-image.tsx`, Newsreader TTF fetched at build, wordmark in Jost over `sailboat-beige-sea`. Per-estate OG images use the estate hero.
- `src/app/robots.ts`: disallow all. No sitemap.
- Components: `Header` (fotogenic base, minus phone and button, drawer per 5.1), `HeroFilm` (Get Work Abroad `HeroVideo` ported, `preload` on the poster), `Statement`, `FeaturePair`, `EstateCards`, `Band`, `ZigzagRow`, `Sequence` (full / diptych / float layouts driven by position), `Particulars`, `EnquiryForm` (server action), `Footer`. No `Reveal`.
- CSS: fotogenic's two-layer tokens (`:root --*`, then `@theme inline --color-*`), the image-frame helper with the hover zoom removed, underline-only inputs replaced by the Aman bordered field, premier's reduced-motion kill switch, ink focus ring.

### 9.5 Password gate
- `src/proxy.ts` exporting `proxy`, ported from `~/structured-talent-demo/middleware.ts` (the one that leaves `opengraph-image` open so WhatsApp previews work). Password `120226`, cookie `demo-auth`, 30 days, 303 redirect on success, 401 page otherwise. Matcher: `['/((?!_next/static|_next/image|opengraph-image|favicon\\.ico|.*\\..*).*)']`.
- The gate page is restyled in the brand: paper ground, Jost label `Password`, Newsreader input, outline button `Enter`, the wordmark above. Every prior demo shows a black box; this one must not.
- The cookie is `secure: true`, so it will not stick on `http://localhost`; test on a Vercel preview, or set `secure` from `process.env.NODE_ENV === "production"`.
- `DEMO_GATE=off` env var bypasses the gate, so the owner can open the case study publicly later without a code change. Default on, because every outreach demo is gated and the password is shared across them.

### 9.6 Deploy
- `vercel whoami` must say `magnus-clearscaler`; stop if it says `cleargroup-magnus`. Team id `team_7g7UBIYZk8JDX6nEHExOCijM`, Hobby.
- Project name `aubemar-demo`. Deploy with `vercel --yes --prod` from the repo root; no Git integration, no Actions. Then `vercel alias set <deploy>.vercel.app aubemar-demo.vercel.app` and turn off Vercel Authentication (`ssoProtection: null`) so the gate, not Vercel, asks for the password.
- Commits: `PATH=/Applications/Xcode.app/Contents/Developer/usr/bin:$PATH git -c user.email=magnus@clearscaler.com -c user.name="Magnus Motzfeldt-Berge" commit ...`, pushed with `gh` as `magnus-ClearScaler` to `luxury.estates.demo`.
- Share the bare `aubemar-demo.vercel.app` URL. Keep `robots` noindex until the owner decides otherwise.

### 9.7 Checks before the first share
1. Grep the whole `src/` and `data/` for U+2014 and U+2013 (`grep -rP '[\x{2014}\x{2013}]'`): zero hits.
2. Home page word count under 120 (script over the rendered HTML).
3. Lighthouse on a Vercel preview: LCP is the hero poster, not the video; no CLS from images.
4. Every published estate has 5 to 9 graded frames and a focal point for its hero.
5. Colophon lists every file in `public/estates` and `public/atmosphere` with a source.
6. The gate page renders in brand colours and `opengraph-image` loads without the cookie.

---

## 10. Where I depart from the research, and open points for the merge

- **No accent colour** (Villa Alba brief had bronze). Aman has none and the page is calmer without it.
- **Newsreader plus Jost**, not Cormorant plus Inter (craft-luxury) and not Jost alone (montevie notes). The serif-for-reading inversion is the core of the Aman voice; Cormorant is too ornamental; one sans alone cannot carry a book-like property page.
- **No scroll reveal at all**, not a slowed one (craft-demos suggested 1100ms). Stillness is the brand.
- **Inset photographs on paper** with a 24px margin at desktop, not full-bleed heroes (the fotogenic hero). Full bleed only on mobile.
- **Twelve published, two held** (L'Attique, Villa Lérins). The researchers collected fourteen; the quality bar removes two.
- **Price on request above €20M**, figures below. Montevie shows everything, Aman shows nothing; this is the Riviera middle path and it protects the top of the list from reading like a price tag.
- **No energy class, no invented facts.** Where the source is silent the row is omitted or reads "on request".
- **Gate on by default with an env switch**, since the case study is likely to be shared with prospects first.

Questions for the other boss:
1. Agree on the name and the apostrophe treatment (U+2019 as the only device, no symbol).
2. Agree on no reveals and no accent; these are the two decisions most likely to be re-added by habit during the build.
3. Whether to spend one more scrape on a clean Cannes house so the coast has no gap, or accept twelve as final.
4. Whether the home hero is the sea film or the still `sailboat-beige-sea`; the film is the Aman move, the still is lighter and already perfect. I lean film with the still immediately below.
