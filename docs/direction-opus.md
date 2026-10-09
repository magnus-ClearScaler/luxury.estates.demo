# Creative direction (Opus boss)

Independent direction for the Côte d'Azur quiet-luxury estates case study. Written 2026-10-09 after reading every file in `docs/research/`, all of `data/*.json`, and reviewing every listing photo (14 contact sheets), all 30 atmosphere photos and frames from all 4 video loops.

Copy rule throughout: no em dashes, no en dashes. Ranges are written "8 to 12". Hyphens appear only inside place names (Saint-Jean-Cap-Ferrat) and code.

---

## 0. The verdict in ten lines

1. Name: **Aube'Mar**. Wordmark `AUBE’MAR` in tracked serif capitals, live text, no symbol.
2. Idea: the coast at first light, before anyone is awake.
3. Palette: warm paper, chalk, linen, sand, stone, umber, ink. **No accent colour.** The photographs are the only colour.
4. Type: **Cormorant Garamond** (wordmark, headings, the few sentences of prose) plus **Jost** (labels, nav, spec lines, forms). Serif to read, sans to find your way, as Aman does.
5. Pages: Home, The Houses, a House, La Maison, Carnet (3 short photo essays), Enquire, Credits. Seven routes, 9 houses.
6. Home under 150 words of main content. One moving image on the whole site (home hero sea loop).
7. Keep 9 of the 14 scraped listings. Drop 5 that fail the calm bar (orange HDR, cyan pools, wicker and palms, developer apartment).
8. Every photo is baked through one grade at build so two agencies look like one photographer.
9. Motion is opacity only. No drift on stills, no hover zoom, no parallax, no text that moves.
10. Next.js 16.2.11, static data, `src/proxy.ts` password gate (`120226`), noindex everywhere, Vercel `magnus-clearscaler`, Credits page for every source.

---

## 1. Name and wordmark

### Pick: Aube'Mar

"Dawn sea": French *aube* plus Occitan *mar*. Said ohb-MAR in every target language.

Why it wins over Mont'Albe:
- Magnus prefers it (`owner-preference.md`), and the bosses were told to weigh that strongly.
- Mont'Albe shares the "Mont'" prefix with Montevie, one of the two named references. A case study that reads as a derivative of its own reference is weaker in a pitch.
- Aube'Mar names the hour and the water, which is the whole brand idea (section 2) and the hero image (the sea at first light).
- It is the softest-sounding name on the list, and nothing else uses it: aubemar.com, aubemar.fr and aubemar.estate were all free on 2026-10-09.

Still open before any public use (nothing was bought):
- a manual TMview and INPI search on AUBEMAR in classes 36 and 43;
- a logged-in check of @aubemar on Instagram;
- buying the domains, which only Magnus can approve.

Mont'Albe stays the reserve.

Written forms:
- In text: **Aube'Mar** (straight apostrophe in data, typographic `’` when rendered).
- Descriptor where one is needed (footer, OG image, page title): `Aube'Mar, Côte d'Azur`.
- Page title template: `%s · Aube'Mar`.

### Wordmark treatment

- Live text, never an image. Set as `AUBE’MAR`.
- Font: Cormorant Garamond 500 in capitals. 500 rather than 400 because the hairlines of the capitals vanish over the hero video at 400.
- Size: 20px desktop header, 17px mobile, 15px in the compact header.
- Tracking: `0.34em`.
- Apostrophe: the curly `’` (U+2019). Wrap it in a span with `margin: 0 -0.22em` so it sits tight between E and M instead of floating in the tracking. Without that it reads as "AUBE ’ MAR". This kerning is the one piece of craft that makes the mark look drawn rather than typed.
- Colour: chalk `#FBF9F5` over the hero, ink `#2A2622` on paper. Two stacked spans cross-fade over 500ms, the Omnimundi header pattern, so the logo never flashes.
- Favicon and app icon: a monogram `A’M` in Cormorant 500 capitals, ink on paper, no circle or frame. OG image: the hero still with the wordmark centred in chalk, nothing else.
- Never add: a crest, a palm, a sun, a wave, a line under the word, a tagline lock-up, or gold.

---

## 2. Brand idea

**Aube'Mar shows a few houses on the Côte d'Azur as they are at first light: still, unhurried, and never announced.**

What follows from it:
- The site sells the hour and the stillness first, the house second and the numbers last.
- Every listing is shown as a place to wake up in, not an inventory.
- The house is small on purpose. It talks about "a few houses" and never about volume, years or rankings.

---

## 3. Palette tokens

Warm, low-contrast, paper-like. Aman's page is `#F3EEE7`. Ours is a shade lighter and whiter, because Riviera light is whiter than the desert or mountain light Aman's palette was built for, and the owner asked for white and off-white first.

| Token | Hex | Role | Contrast of ink on it |
|---|---|---|---|
| `--chalk` | `#FBF9F5` | Header when solid, menu panel, enquiry form panel, gate page | ink 14.3:1 |
| `--paper` | `#F6F2EB` | **Page ground on every page** | ink 13.5:1, umber 5.4:1 |
| `--linen` | `#EDE6DA` | One deeper band per page at most, and the footer | ink 12.1:1, umber 4.8:1 |
| `--sand` | `#E2D8C9` | Image placeholders, so photos load onto sand and not grey | |
| `--hair` | `#DCD4C7` | 1px rules | |
| `--stone` | `#B8AD9C` | Outline button border, input border, inactive filter text on hover only | 2.0:1, never for text |
| `--taupe` | `#8C8273` | Large labels over 18px only, credit lines | 3.4:1, large text only |
| `--umber` | `#6B6258` | Secondary text, spec lines, form labels | 5.4:1 on paper (AA) |
| `--ink` | `#2A2622` | Primary text, solid button fill, focus ring | 13.5:1 |

Rules:
- **No accent colour.** I am overruling the Villa Alba bronze. Aman has no accent, and old money does not need a highlight colour. The focus ring is 1px ink with a 3px offset.
- Text is never pure black, and the ground is never pure white. `#FFFFFF` does not appear anywhere.
- Text on a solid ink button is paper `#F6F2EB`, not white. This is Aman's rule.
- Selection colour: `::selection { background: var(--sand); color: var(--ink) }`.
- No gradients anywhere, with one exception: the hero scrim behind the header, `linear-gradient(to bottom, rgba(42,38,34,.28), transparent 22%)`, so the chalk wordmark reads over a bright sky. There is no scrim at the foot of the hero, because no text sits there.

---

## 4. Type system

Two free families from Google Fonts via `next/font/google`, with CSS variables on `<html>`.

| Family | Weights loaded | Job |
|---|---|---|
| **Cormorant Garamond** | 400, 500, italic 400 | Wordmark, all headings, intros, house descriptions, pull lines, prices |
| **Jost** | 400, 500 | Eyebrows and place labels, nav, spec lines, buttons, form labels, footer, legal |

Why this pair:
- **Serif to read, sans to find your way.** Aman sets body copy in a serif and keeps the sans for wayfinding. That inversion is the core of its voice, and it is what separates this from every agency template, which does the opposite.
- **Cormorant** is the serif the owner already approved for the Aman-style Villa Alba brief. Its capitals carry the wordmark, so one serif covers the mark and the headings. Playfair and Fraunces stay banned. The "single sans" rule came from trade and clinic demos and does not apply here.
- **Jost over Inter.**
  - Jost is a free Futura revival, and Futura is the type of the 1920s and 1930s Riviera posters (Cassandre, the Train Bleu era), so it carries period and place.
  - Montevie's UI face is futura-pt, so Jost is its closest free equivalent.
  - The Aman teardown found Inter too techy at small sizes, and tracked Jost capitals look far more expensive at 11px.
- Weight never goes above 500. There is no bold anywhere. Set `font-synthesis-weight: none`.

Scale (desktop / mobile, px):

| Token | Family | Size / line-height | Tracking | Case | Where |
|---|---|---|---|---|---|
| `display` | Cormorant 400 | 56/60 (40/44) | -0.005em | Sentence | One per page, index pages only (The Houses, Carnet, La Maison) |
| `h1` | Cormorant 400 | 40/48 (32/38) | 0 | Sentence | House name on the detail page, Enquire |
| `h2` | Cormorant 400 | 30/40 (26/34) | 0.005em | Sentence | Section statements |
| `h3` | Cormorant 500 | 22/30 (21/28) | 0.01em | Title | Card and row titles (house names) |
| `lead` | Cormorant 400 | 22/34 (20/31) | 0.005em | | Intro sentence under a title |
| `body` | Cormorant 500 | 19/31 (18/29) | 0.005em | | House descriptions, essays. Max 60ch |
| `pull` | Cormorant italic 400 | 26/36 (22/31) | 0 | | One line per essay at most |
| `label` | Jost 500 | 11/16 | 0.24em | UPPER | Place eyebrow ("ÈZE"), section labels |
| `nav` | Jost 400 | 12/16 | 0.18em | UPPER | Menu, Enquire, footer heads |
| `spec` | Jost 400 | 12/18 | 0.14em | UPPER | `5 BEDROOMS · 400 M² · €9,900,000` |
| `link` | Jost 400 | 12/16 | 0.16em | UPPER | "View the house", with a 1px underline 6px below the baseline |
| `small` | Jost 400 | 13/20 | 0.02em | Sentence | Form labels, footer text, credits, legal |
| `input` | Cormorant 500 | 18 | 0 | | Field text. At least 16px avoids iOS zoom |

- Body uses Cormorant at **500, not 400**, and at 19px, not 16. Its x-height is small and its 400 weight breaks up on non-retina screens.
  - Fallback if body text fails a readability check on a Windows screen: switch `body`, `lead` and `input` to Newsreader 400 at 17/28 and keep Cormorant for headings and the wordmark. This is the only allowed swap.
- Headings stay small, as on Aman, where the biggest home-page heading is 31px. We use 56px once per index page and never on Home.
- Prices are set in the `spec` style, never as a large serif number.
- `text-wrap: balance` on headings and `text-wrap: pretty` on body.

---

## 5. Site map, layouts and exact copy

Layout system:
- Container 1440px, gutter `clamp(16px, 1.7vw, 24px)`.
- After the home hero, every image is inset inside the gutter, like a print on paper. Images only run edge to edge on mobile.
- Section spacing `clamp(96px, 11vw, 168px)`, with one linen band per page at most.
- Square corners everywhere. Base unit is 8px.

Header: 88px tall, compacting to 60px after 40px of scroll.
- Left: "MENU" with two hairlines that turn into an X.
- Centre: the wordmark.
- Right: "ENQUIRE" as an underlined text link.
- It is transparent with chalk text over a hero, then a paper background once scrolled.
- No shadow and no border; a 1px `--hair` rule appears only once compacted.
- On mobile: Menu on the left, wordmark centred, nothing on the right, and no fixed bottom bar. This is not a hotel with a "Reserve" button.

Menu drawer:
- A chalk panel slides and fades in from the left over 400ms.
- Items in Cormorant 400 at 30px, one per line: The Houses, La Maison, Carnet, Enquire.
- Then a hairline, then in `small`: `Antibes · Saint-Tropez`, `By appointment`.
- The rest of the page dims to `rgba(42,38,34,.25)`. Close is a hairline X.

Footer (linen):
1. Wordmark at 16px, then the line `Houses on the Côte d'Azur, shown by appointment.`
2. Three short columns:
   - **Houses:** Bord de mer · Collines
   - **Maison:** La Maison · Carnet · Enquire
   - **Offices:** Antibes · Saint-Tropez · By appointment only
3. A hairline, then the small line: `© 2026 Aube'Mar. A case study by ClearScaler. The houses shown are listed by third parties; see Credits.` Credits is linked.

There are no social icons, no newsletter, no street addresses and no phone numbers. The fictional brand must not carry a reachable number or address that belongs to someone else.

### 5.1 Home `/`

About 120 words of main content.

1. **Hero:** full bleed, `100svh`.
   - Video `sea-surface-warm-dusk.mp4`. Its poster is a graded still taken from the 5s mark.
   - Only the header sits on it. In the bottom-left corner, at the gutter, a `label` in chalk: `CÔTE D'AZUR`. No headline, no button, no scroll cue.
   - Mobile uses the same video with `object-position: 50% 60%`.
2. **Statement:** centred, max 680px.
   - `h2`: **A few houses by the sea, kept quietly.**
   - `lead`: `Between Saint-Tropez and Monaco, we represent a small number of houses each season, chosen for their light, their stillness and the view from the terrace in the morning.`
3. **Featured house:** an Aman feature pair, 915 + 37 + 439 at 1440.
   - Large image: Mas Blanc `01.jpg` at 3:2. Portrait: Mas Blanc `05.jpg` at 4:5.
   - Text below the large image:
     - `label` `MOUGINS`
     - `h3` **Mas Blanc**
     - body `A white house of stone, lime and old wood above a long green pool.`
     - `link` `VIEW THE HOUSE`
4. **Pause:** a 21:9 inset image of `atmosphere/sailboat-beige-sea.jpg`. No caption.
5. **The Houses:** three portraits at 4:5 in a row, 3 × 439.
   - `label` above the row: `THE HOUSES`.
   - Under each image: the place in `label` on the left and the name in `h3` on the left beneath it. No price on Home.
     - Les Pins `03.jpg`, crop focal 50/55, `ÈZE`
     - Le Belvédère `02.jpg`, focal 30/60, `CAP DE NICE`
     - Bastide des Prés `06.jpg`, focal 50/55, `CHÂTEAUNEUF-GRASSE`
   - Centred link below: `ALL HOUSES`.
6. **Linen band, "Light":** three images in a row, equal height, gaps of 37px:
   - `limestone-vault.jpg` at 4:5;
   - `linen-curtain-backlit.jpg` at 3:2;
   - `boat-still-water-dawn.jpg` at 4:5.
   - Under them, centred, a `pull` line: *Light on stone. Linen at the window. The sea, early.*
   - There is no link. This band is the brand, not a product.
7. **La Maison:** image left (`shutter-light-on-wall.jpg` at 4:5, 439 wide), text right, vertically centred.
   - `label` `LA MAISON`
   - `h2` **Discretion, as a matter of course.**
   - body `Some of our houses are never shown here. They are offered privately, to a few, as they always have been.`
   - `link` `ABOUT THE HOUSE`
8. **Close:** centred.
   - `h2` *Request the particulars.* (the italic style)
   - Below it, the `link` `ENQUIRE`.
9. Footer.

### 5.2 The Houses `/estates`

This follows Aman's residences index.

1. `display` **The Houses**, left aligned. Not a hero image: the first image appears 160px further down.
2. Two columns:
   - Left: `label` `NINE HOUSES`.
   - Right: `lead` `On the water, and in the hills behind it. Each one visited, each one known.`
3. Filter line: a hairline, then on the right three `nav` items, `ALL · BORD DE MER · COLLINES`. The active item is ink with a 1px underline; the others are umber. Filtering is client-side, the URL becomes `?view=collines`, and there is no animation beyond a 300ms opacity fade.
   - Bord de mer: Les Pins, Le Belvédère, Maison Édouard, Villa Cap Fleuri, Villa Blanche.
   - Collines: Mas Blanc, Maison des Collines, Domaine des Vignes, Bastide des Prés.
4. **Zigzag rows**, one per house, alternating sides.
   - The image is 3:2, 894 wide at 1440. The text column is 469 wide, top aligned.
   - The text column, in order:
     - place in `label`;
     - name in `h3`;
     - the `short` sentence in body;
     - then, pinned to the bottom of the row above a hairline, the spec line on the left and `VIEW THE HOUSE` on the right.
   - Spec line format: `{beds} BEDROOMS · {living} M² · {price}`. Price is `€9,900,000`, or `PRICE ON REQUEST` when the asking price is €20M or more.
   - Row order, alternating sea and hills: Mas Blanc, Les Pins, Maison des Collines, Le Belvédère, Domaine des Vignes, Maison Édouard, Bastide des Prés, Villa Blanche, Villa Cap Fleuri.
5. Close: centred `small` line `Other houses are offered privately.` and the link `ENQUIRE`.

### 5.3 A House `/estates/[slug]`

The order follows Aman's carousel rhythm: wide, words, pan, detail, life, texture, close. The facts come after the pictures.

1. **Hero:** inset at 1440 (edge to edge on mobile).
   - 16:9 desktop. On mobile, a separate 4:5 crop driven by the `focal` value in the data, set as `object-position`, not squashed.
   - No text on the photo.
2. **Intro:** centred, max 680.
   - `label`: `{town}, {area short}`, for example `ÈZE, BORD DE MER`.
   - `h1`: the name.
   - `lead`: the `short` sentence.
   - The spec line in `spec`.
   - The `link` `ARRANGE A VIEWING`, which anchors to the form.
3. **Wide image 2** from the gallery list at 3:2, then the description: the `long` text in body, max 60ch, centred column.
4. **Pair:** two portraits at 4:5, side by side, 671 + 49 + 671.
5. **Inset detail:** one 4:5 image, 439 wide, floating on paper with at least 8vw of space either side. This is Aman's print-on-paper device.
6. **Wide image** at 3:2, then a linen band containing **Particulars**.
   - Laid out as a two-column definition list in `small` with umber terms, ink values and hairline rows.
   - The rows:
     - `Reference`: our own reference, for example `AM-0412`
     - `Type`
     - `Living area`: `400 m²`
     - `Land`: `1,300 m²`, or "None" for an apartment
     - `Bedrooms`
     - `Bathrooms` (left out when null)
     - `Built` (left out when null)
     - `Outlook`: "Sea" or "Hills and garden"
     - `Price`: `€9,900,000`, or "On request"
     - `Fees`: "Payable by the seller"
     - `Energy performance`: "Available on request"
   - **Never invent a DPE letter, a lot count or service charges.** The sources do not give them, and a made-up rating would be a false record.
   - Below the list, in `small`: `Features` as one sentence built from the `features` array, joined with commas and "and". No bullets.
7. **Remaining gallery:**
   - Alternate a full-width 3:2 image with a 4:5 pair.
   - Never two aerials in a row and never two details in a row.
   - At most one bathroom, and only deep in the gallery.
8. **Enquiry**, on a chalk panel inset in the page.
   - `h2` *Arrange a private viewing.*
   - Fields (labels in `small` above each field; underline-only inputs with a 1px stone line that turns ink on focus):
     - First name
     - Last name
     - Email
     - Telephone
     - Country of residence
     - Preferred dates (optional)
     - Message (optional)
   - Checkbox: `I agree to be contacted about this enquiry.`
   - Small line: `Your enquiry is held in confidence.`
   - Button: solid ink, paper text, square corners, 160 × 44, label `SEND`.
   - Success state replaces the form: `Thank you. A member of the house will write to you shortly.`
9. **Next house:** a full-width 21:9 image of the next house's hero with no overlay. Under it, on the left, `label` `NEXT` and the name in `h3`. The whole block is the link, and the order wraps from the last house to the first.

### 5.4 La Maison `/maison`

1. `display` **La Maison**
2. Two-column intro:
   - Left: `label` `ANTIBES · SAINT-TROPEZ`.
   - Right: `lead` `Aube'Mar is a small house of advisers on the Côte d'Azur. We represent a few houses at a time, and we know each one as a guest would: in the morning, in the heat of the afternoon, and after dark.`
3. Inset 21:9 image: `atmosphere/terrace-sea-pale-morning.jpg`, focal 50/70.
4. **Three short blocks**, side by side on desktop and stacked on mobile. Each is an `h3` plus one body sentence. No icons, no numbers, no cards.
   - **Few houses.** `We take on only the houses we would choose ourselves, and never more than we can know well.`
   - **Private by default.** `Many of our houses are never published. Viewings are arranged quietly, at the owner's pace and yours.`
   - **In person.** `You will deal with one adviser from the first visit to the notary, in English, French or Italian.`
5. A pair of portraits: `olive-branch-white-wall.jpg` and `stone-pine-solitary.jpg`, both at 4:5.
6. Centred `h2` **Offices.** with a `small` line beneath: `Antibes and Saint-Tropez. By appointment only.` No addresses (see footer note).
7. Close: *Request the particulars.* and the link `ENQUIRE`.

### 5.5 Carnet `/carnet` and `/carnet/[slug]`

Optional to build last, but it is where the atmosphere photos earn their place. It has 3 entries.

- **Index:**
  - `display` **Carnet**, then `lead` `Notes on the coast, in pictures.`
  - Then a 2-column grid of 1:1 squares. Under each: `label` `{SEASON}`, `h3` title and a one-sentence standfirst.
- **Article:**
  - The `display` title on the left.
  - Images dominate: full-width 3:2 images and 4:5 diptychs.
  - The body text sits in the right half of the page only, Aman's journal layout, with one `pull` line.
  - The final link goes to a related house.

The entries (body copy is final):

1. **Light on Stone** (`EARLY AUTUMN`). Standfirst: `How the limestone of the coast holds the day.`
   - Images: `limestone-vault`, `limestone-arch-detail`, `shutter-light-on-wall`, `leaf-shadow-wall`, `pale-shutters-facade`.
   - Body: `On this coast the houses are built from the hills behind them. Pale limestone, lime wash, old terracotta. In the morning the walls are cool and almost white. By late afternoon they have taken on the colour of bread, and they give the warmth back long after the sun has gone behind Cap Ferrat. Shutters stay half closed through the heat. A line of light moves across the floor, and the house keeps time by it.`
   - Pull: *A line of light moves across the floor.*
   - Final link: Mas Blanc.
2. **The Long Afternoon** (`LATE SUMMER`). Standfirst: `Lunch that becomes dinner, under the pines.`
   - Images: `loggia-terrace-sea`, `olive-grove-table`, `pergola-long-table`, `linen-panels-leaf-shadow`, `umbrella-pines-hillside-villa`.
   - Body: `The table is laid in the shade before anyone is hungry. Bread, tomatoes, a bottle from the hills above Ramatuelle. Nobody looks at the time. The cicadas stop, start again, stop. Someone goes down to swim and comes back with wet hair. The light turns gold, then pink, and the candles are lit without anyone deciding that the afternoon is over.`
   - Pull: *Nobody looks at the time.*
   - Final link: Domaine des Vignes.
3. **The Sea, Early** (`ALL YEAR`). Standfirst: `The hour before the coast wakes up.`
   - Images: `boat-still-water-dawn`, `sailboat-beige-sea`, `white-boat-still-water`, `cap-ferrat-lighthouse`, `wooden-boat-still-water`.
   - Body: `Before seven the water is flat and pale, and the boats in the bay have not yet moved. From a terrace above the sea you can hear a single engine far out, and nothing else. This is the hour we show our houses in, when possible. Everything a house is, it is at this hour.`
   - Pull: *Everything a house is, it is at this hour.*
   - Final link: Le Belvédère.

`pergola-long-table` and `olive-grove-table` are not on the Riviera, so they appear here with no place caption, as research advised.

### 5.6 Enquire `/enquire`

1. `h1` **Enquire**
2. `lead` `Write to us about a house, or about the kind of house you are looking for. A member of the house will reply personally.`
3. The form from 5.3, with one more field, `House` (select: the nine names, then `A house not shown here`). Preselect it from `?house=slug`.
4. A pair of portraits under the form: `linen-curtain-backlit.jpg` and `olive-branch-white-wall.jpg`.

Form behaviour:
- No backend in the case study.
- The client validates the fields, then shows the success state.
- Nothing is stored or sent, and no email is fired.

### 5.7 Credits `/credits` (linked from the footer only)

- `h1` **Credits**
- Intro `small`: `Aube'Mar is a fictional house created by ClearScaler as a case study in quiet luxury real estate design. It does not trade. The houses shown are real properties listed for sale by the agencies below. Their names and descriptions have been rewritten, and every photograph remains the property of the listing agency.`
- **Houses table:** our name · town · listing agency · agency reference · a link to the source listing. The agency reference is the `ref` field, with any co-listing reference too.
- **Atmosphere photography:** file · photographer · Unsplash link. Generated from `data/atmosphere.json`.
- **Film:** the four Pexels clips with photographer and link. Generated from `data/video.json`.
- **Type:** Cormorant Garamond and Jost, both from Google Fonts under the SIL Open Font License.
- **Made by:** ClearScaler, linking to clearscaler.com.

---

## 6. Photo direction

### 6.1 The grade (one pass, baked at build)

Script `scripts/grade.mjs` (uses sharp):
- It reads `source/listings/<slug>/NN.jpg` and `source/atmosphere/*.jpg`.
- It writes `public/estates/<slug>/NN.jpg` and `public/atmosphere/*.jpg`, at 2400px long edge, JPEG quality 84 and mozjpeg on.
- next/image then serves AVIF and WebP.
- **Move the raw originals out of `public/`.** They come to about 120 MB and must not be deployed.

The agency photos are the problem. They are midday, HDR-leaning, with cyan pools and saturated skies. The atmosphere set is already calm. So the grade has three strengths, and the strength is stored per image in the data:

| Strength | Settings | Applies to |
|---|---|---|
| `soft` | `modulate({ saturation: .9, brightness: 1.02 })`, `linear(.95, 8)` | All atmosphere photos except the three listed under `standard` |
| `standard` | `modulate({ saturation: .78, brightness: 1.03, hue: -2 })`, `linear(.9, 16)`, `recomb([[1.03,.02,-.01],[.01,.99,0],[-.02,.01,.93]])`, `gamma(1.04)` | Default for all listing photos. Also `pines-over-cove`, `villefranche-bay-dusk` and `olive-branch-dusk` |
| `strong` | `modulate({ saturation: .68, brightness: 1.04, hue: -4 })`, `linear(.86, 22)`, the same recomb with the blue row at `.9`, `gamma(1.06)` | Cyan pools and electric skies: Belvédère 02, 04, 05; Maison Édouard 02, 08, 12; Villa Blanche 05; Les Pins 11; Villa Cap Fleuri 03; Bastide des Prés 01, 11; Maison des Collines 01 |

- Sharpening: `sharpen({ sigma: .4 })` at most. Agency files are already over-sharpened.
- **Acceptance test:** put the graded `les-pins/03`, `belvedere/01` and `mas-blanc/01` next to `atmosphere/sailboat-beige-sea` and `terrace-sea-pale-morning` on a contact sheet. They must read as one shoot. Tune `standard` until they do, and check by eye before building pages.
- CSS fallback only for anything not baked: `filter: saturate(.86) contrast(.93) brightness(1.02) sepia(.05)`.
- Film grain: only on the home hero video, as a 3% multiply PNG tile. Never on stills.
- No borders, shadows or rounded corners on any photograph. Every image box has a `--sand` background so loading looks like paper.

### 6.2 Data per image

`galleries.ts` keyed by slug. Each entry looks like this:

```ts
{ src: "/estates/les-pins-eze/03.jpg", alt: "Indoor pool between oak louvres, pines beyond", role: "hero" | "wide" | "portrait" | "detail" | "aerial",
  focal: [50, 55], mobileFocal?: [45, 60], grade: "standard" | "strong", tv?: false }
```

- `focal` drives `object-position` on every crop.
- `alt` text is written for every image, briefly and plainly, without adjectives like "stunning".

### 6.3 Per house: hero, sequence, cuts

The sequence lists the gallery order after the hero. Anything not listed is not used.

| House | Hero | Sequence | Cut and why |
|---|---|---|---|
| **Mas Blanc**, Mougins | 01 (reflecting pool to white house, empty loungers) | 03 wide · 05+07 pair (arched-window bedroom, linen pergola) · 04 detail crop on beams and timber, 4:5 focal 40/30 · 02 aerial close · 08 last (bathroom, the one allowed) | 06: the kitchen bar stools read as a rental |
| **Les Pins**, Èze | 03 (pool between louvres, pines reflected; the most Aman frame in the whole set) | 01 wide long view · 04+05 pair · 09 detail (travertine and black bath, 4:5 focal 45/60) · 06 cropped 4:5 at focal 22/55 to keep the TV out · 11 aerial (strong grade) close | 02: the red roof next door. 07, 08: TVs on stands that no crop can remove. 10: duplicate aerial |
| **Maison des Collines**, Ramatuelle | 05 (pale room open to vines) | 01 wide (strong grade) · 06+07 pair · 04 wide · 09 detail of the facade and pool at 4:5, focal 30/50 · 10 close (misty pines to the sea; best closing frame) | 02, 03: saturated lawn and pool. 08: TV |
| **Le Belvédère**, Cap de Nice | 01 (deck, one lounger, the horizon) | 06 wide through leaves · 02+04 pair · 05 wide · 08 detail (linen bed, window to rock, 4:5 focal 40/50) · 07 close | 03: green poufs and awning distortion. 09: patterned cushion and a dark sofa |
| **Domaine des Vignes**, Saint-Tropez | 02 (umbrella pines over the lawn) | 05 wide · 06+07 pair (white walls, old beams, stone floor) · 03 wide · 01 wide pool · 04 close | 08: ornate mirror and green throw. 09: bathroom not needed |
| **Maison Édouard**, Beaulieu | 02 (infinity edge, one olive tree, the sea) | 01 wide facade · 04+05 pair (white salons) · 07 detail (winter garden, 4:5 focal 55/50) · 11 wide · 12 close | 03: blue glass object and wicker. 06, 10: TVs. 08: duplicate pool. 09: wicker set on lawn |
| **Bastide des Prés**, Châteauneuf-Grasse | 11 (house beyond the long pond, plane trees) | 06 portrait (frontal stone door) · 03+04 pair (linen interiors) · 07 wide (allée) · 08 detail (stone basin, 4:5) · 02 portrait · 10 wide (table under plane tree) · 12 aerial close | 01: duplicate of 11. 05: orange-backed niches. 09: cyan pool behind arches |
| **Villa Blanche**, Cap d'Antibes | 05 (symmetric cream facade; crop the pool to the bottom 12% of the frame) | 01 aerial with sea haze · 10 portrait (frontal entrance stair, 4:5 focal 50/45) · 09 detail (old-money bedroom, the one gilt frame allowed) · 04 close | 02, 03, 06: thatched paillote, rattan and cyan pool. 07: the stone wall reads as a theme park. 08: busy gilt salon |
| **Villa Cap Fleuri**, Cap-d'Ail | 01 (frontal white columns and stair; perfect symmetry) | 03 wide sea (strong grade) · 07+06 pair (loggia; 06 at 4:5 focal 25/50 keeps the red cushions mostly out of frame) · 11 wide · 08 close | 02: red cushions in close-up. 05: tiled wall and kidney pool. 09, 12: cyan cove and HDR. 10: red curtains. 04: magenta flowers |

Index cards and home cards use the hero, except where a portrait is needed: Les Pins 03, Le Belvédère 02 and Bastide des Prés 06 (section 5.1).

### 6.4 Atmosphere placement

| File | Where |
|---|---|
| `sailboat-beige-sea` | Home pause (21:9), Carnet 3 |
| `limestone-vault`, `boat-still-water-dawn`, `linen-curtain-backlit` | Home linen band. Also in Carnet 1 and 3, and on Enquire |
| `shutter-light-on-wall` | Home La Maison teaser, Carnet 1 |
| `terrace-sea-pale-morning` | La Maison 21:9 (focal 50/70). The **gate page** background at 40% opacity under chalk |
| `olive-branch-white-wall`, `stone-pine-solitary` | La Maison pair. Enquire pair |
| `leaf-shadow-wall`, `limestone-arch-detail`, `pale-shutters-facade` | Carnet 1 |
| `loggia-terrace-sea`, `olive-grove-table`, `pergola-long-table`, `linen-panels-leaf-shadow`, `umbrella-pines-hillside-villa` | Carnet 2 |
| `white-boat-still-water`, `wooden-boat-still-water`, `cap-ferrat-lighthouse` | Carnet 3 |
| `sheer-curtain-window` | 404 page, with the line `This page is not here. The houses are.` and a link `THE HOUSES` |
| Not used | `cap-coastline-morning` (beach umbrellas and bright colour), `eze-view-cap-ferrat` (busy roofs), `villefranche-bay-dusk` (postcard colour), `pines-over-cove` (turquoise), `olive-branch-dusk` (sunset cliché), `cypress-garrigue`, `stone-stair-village` (Matera, not Riviera), `pine-trunk-coastal-path`, `white-stair-vine` |

### 6.5 Video

- **Home hero:** `sea-surface-warm-dusk.mp4`, the beige and silver sea surface. It is the only moving image on the site.
  - Poster: a graded still taken at 5s.
  - Make a 720p MP4 for phones (about 3 MB) and keep the 1080p version for desktop.
- `sea-pale-horizon.mp4` is the reserve, in case the dusk loop reads too dark on a dim phone.
- `sea-overcast-calm` and `curtain-white-wind-vertical` are not used. One film is calmer than two.
- **No Kling-generated pine clip** for v1. An AI clip risks the uncanny look, and the brief is stillness.

---

## 7. Motion rules

| Element | Rule |
|---|---|
| Hero video | Poster first, as the LCP image, with no fade on it. The video loads after `requestIdleCallback` (the get-work-abroad `HeroVideo` port) and cross-fades over the poster in 1600ms. Skipped for reduced motion, Save-Data, or a 2G or 3G connection. No zoom. |
| Still images | Fade in on load, `opacity 0 → 1` over 600ms, `cubic-bezier(.4,0,.2,1)`. **No drift, no Ken Burns, no hover zoom, no parallax.** Aman shows stills still. |
| Below-the-fold reveals | Images only, opacity only, 900ms, fired once by IntersectionObserver with `rootMargin: 0px 0px -10% 0px`. **Text never animates.** Nothing above the fold is ever hidden. Content is hidden only under `.js .reveal`, so it shows without JS. |
| Header | Height and background change over 400ms. The logo cross-fade is 500ms. It never slides away. |
| Menu | Panel `opacity` + `translateX(-16px → 0)` over 400ms; the backdrop fades over 300ms. |
| Links | The underline colour moves from stone to ink over 300ms. No arrows that slide, no letter-spacing changes. |
| Buttons | The solid button goes from ink to `#3A352F` over 300ms. That is all. |
| Filter on The Houses | Rows fade out and in over 300ms. No reordering animation. |
| Page navigation | No page transitions. Scroll goes to the top. Use `data-scroll-behavior="smooth"` on `<html>` for in-page anchors only. |
| Reduced motion | Everything above becomes instant, and the video becomes its poster. |
| Banned | Smooth-scroll libraries (Lenis and similar), scroll-jacking, marquees, counters, typewriter text, cursor followers, sticky stacking cards, autoplay sliders. |

---

## 8. Listings: keep 9, drop 5

The quality bar: the hero must hold full screen after grading, and at least 6 frames must survive the reject list from the Aman photo rulebook (no HDR, cyan pools, TVs, wicker sets, loud colour or wide-angle distortion).

**Keep (9)**

| Rank | House | Town | Price shown | Why |
|---|---|---|---|---|
| 1 | Mas Blanc | Mougins | €5,900,000 | The best set by far: lime, raw timber, linen and a reflecting pool. **The featured house on Home.** |
| 2 | Les Pins | Èze | €9,900,000 | Contemporary stone, oak and louvres. Its frame 03 is the single most Aman image across all 14 listings. |
| 3 | Maison des Collines | Ramatuelle | €14,500,000 | Low pale architecture with pale interiors. Its frame 10 is the best closing image. |
| 4 | Le Belvédère | Nice, Cap de Nice | €13,500,000 | Deck, horizon, empty lounger. The only apartment kept, and it earns its place. |
| 5 | Domaine des Vignes | Saint-Tropez | Price on request | The best interiors in the set. Umbrella pines. |
| 6 | Maison Édouard | Beaulieu-sur-Mer | €15,000,000 | Belle Époque proportions, white salons, a winter garden. |
| 7 | Bastide des Prés | Châteauneuf-Grasse | €3,800,000 | The calmest stone and linen. It sits below the €4M floor, but keep it for range. |
| 8 | Villa Blanche | Cap d'Antibes | €19,000,000 | The old-money facade. Use a thin gallery of 5 frames. |
| 9 | Villa Cap Fleuri | Cap-d'Ail | €12,700,000 | Its frontal columned facade is extraordinary. The copy already says it needs restoring. |

**Drop (5)**
- **Domaine des Cyprès**, Saint-Jean-Cap-Ferrat, €49M. Orange stucco, HDR skies, a mini golf in the aerial, and hotel-like interiors. Painful to lose Cap Ferrat, but the photos would undo the brand.
- **Bastide de la Rade**, Villefranche. Strong HDR, cyan pools, turquoise sofas and a pink bedroom. Frames 02 and 03 are the best bay views in the set, but you cannot build a house page on two frames.
- **Villa Lérins**, Cannes. Palms, wicker, terracotta, a kidney pool and HDR. It reads as 2008.
- **Bastide du Ciel**, Gassin. Ochre-yellow walls, dated interiors, "to renovate", and HDR.
- **L'Attique**, Saint-Tropez. An apartment in a residence, with LED cove ceilings, a kitchen shot, a communal pool and a lounge-like indoor pool. Developer stock, not old money.

Data changes when merging into `src/data/estates.ts`:
- Our own references, `AM-0101` to `AM-0109`. The agency `ref` and `source_url` are kept only for Credits.
- A `region` field: `"mer"` or `"collines"`.
- `priceOnRequest: true` for asking prices of €20M or more.
- `outlook`: "Sea" or "Hills and garden".
- Gallery per section 6.3.
- The house count, "NINE HOUSES", comes from the data, not a hard-coded string.

Optional before build: one search of the Sotheby's sitemap for a calm Cap Ferrat or Villefranche house (pale stone, no HDR, at least 6 usable frames). Add it only if it beats Villa Cap Fleuri on the same bar. Do not lower the bar to get the address.

---

## 9. What makes it look cheap (banned)

Layout and components
- Stat cards and counters ("30 years · 400 villas"), star ratings, testimonials, award badges, "As seen in" logo rows.
- Floating badges or overlays on photos: "Exclusive", "New", "Sold", price tags, heart or save icons.
- A search bar or filter panel over the hero; map widgets; result counts; pagination.
- Rounded corners, drop shadows, cards that lift on hover, glassmorphism, gradient washes, pill buttons, icon rows, icon grids, chevron-heavy UI.
- Carousels with dots or arrows, autoplay sliders, and more than one image moving at once.
- WhatsApp or chat bubbles, cookie walls bigger than a single line, newsletter pop-ups, sticky "Book a call" bars.
- More than one CTA per block; any CTA louder than an underlined text link (the one solid button is the form's Send).

Type and colour
- Playfair, Fraunces, script fonts, Cinzel, bold weights, all-caps serif headlines, gold or bronze gradients, ornamental dividers (✦, gold rules), any accent colour, pure black, pure white.
- Headline sizes over 56px. Text on photographs, except the single "CÔTE D'AZUR" label on the hero.

Words
- Em dashes and en dashes, anywhere.
- Exclamation marks, "stunning", "breathtaking", "exclusive opportunity", "luxury living", "dream home", "don't miss", "unparalleled", emoji, superlatives about ourselves, and "you" commands in headlines.
- Prices in large type; prices on Home.
- Invented legal data: DPE letters, CCI card numbers, guarantee amounts. Use "Available on request" or leave the field out.

Photography
- HDR skies, cyan pools left ungraded, TVs, cars, people facing the camera, watermarks, wide-angle distortion, kitchens or bathrooms as hero images, blazing twilight shots, two aerials in a row.

---

## 10. Technical plan

Stack
- Next **16.2.11**, React 19.2.4, Tailwind 4 (CSS-first, `@theme inline` mapping the tokens in section 3), TypeScript 5.
- `src/` layout. Copy `AGENTS.md` and `CLAUDE.md` (`@AGENTS.md`) from `~/structured-talent-demo`, and read `node_modules/next/dist/docs/` before coding: Next 16 has breaking changes.
- Dev script `next dev -p 3430`.
- Repo `/Users/magnusmb/luxury.estates.demo`, pushed to GitHub `magnus-ClearScaler/luxury.estates.demo`.

Routes (all static; `generateStaticParams` for both dynamic routes)
```
src/app/layout.tsx            fonts, metadata (title template "%s · Aube'Mar", robots noindex), skip link
src/app/page.tsx              Home
src/app/estates/page.tsx      The Houses (filter is a small client island)
src/app/estates/[slug]/page.tsx   a House (await params; notFound(); generateMetadata with hero OG)
src/app/maison/page.tsx
src/app/carnet/page.tsx, src/app/carnet/[slug]/page.tsx
src/app/enquire/page.tsx      (client form island, no backend)
src/app/credits/page.tsx
src/app/not-found.tsx
src/app/opengraph-image.tsx   hero still + wordmark; Cormorant TTF fetched at build (port from structured-talent)
src/app/icon.png, apple-icon.png   A’M monogram
src/app/robots.ts             disallow all
src/proxy.ts                  password gate
```

Data
- `src/data/estates.ts`: the 9 curated houses (section 8) with typed fields.
- `src/data/galleries.ts`: section 6.2.
- `src/data/carnet.ts`: the 3 essays.
- `src/data/credits.ts`: generated from `data/atmosphere.json` and `data/video.json`, plus agency rows taken from the estates data.
- `src/lib/site.ts`: name, nav, offices.
- Copy lives only in these files. A build-time check (`scripts/check-copy.mjs`) fails the build if `—` or `–` appears in any of `src/data`, `src/lib` or `src/app`.

Components
- From fotogenic: `Header`, minus phone and CTA, plus the logo cross-fade from Omnimundi and `inert` on the closed drawer from GWA.
- `HeroVideo`: a get-work-abroad port; set `preload` on the poster image, not the deprecated `priority`.
- `InsetImage` and `FeaturePair` (915 + 439 ratio via a CSS grid of `2.085fr 1fr`).
- `HouseRow` (the zigzag), `Pair`, `Detail` (floating 4:5), `Particulars` (a `dl`).
- `EnquiryForm`, with underline fields from fotogenic.
- `Reveal` (GWA, images only, opacity only).
- `Footer`.
- No UI library. No icon library: the only glyphs are the two-line menu bars and the X, both CSS hairlines.

Images (`next.config.ts`)
```ts
images: { formats: ["image/avif","image/webp"], qualities: [75, 85, 90],
          deviceSizes: [640, 828, 1080, 1440, 1920, 2400], minimumCacheTTL: 31536000 },
async headers() { return [
  { source: "/video/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] } ]; }
```
- Quality 90 on heroes and 85 on everything else. The `qualities` list is required in Next 16; without it, fotogenic's quality settings were silently ignored.
- Honest `sizes` per layout:
  - `100vw` on heroes;
  - `(min-width:1024px) 62vw, 100vw` for the large half of the feature pair;
  - `(min-width:1024px) 30vw, 100vw` for the portrait.
- Eager loading only for the hero. Every image box has a sand background and a fixed aspect ratio.

Password gate (`src/proxy.ts`)
- Port `~/structured-talent-demo/middleware.ts`. Rename the file to `proxy.ts` and the export to `proxy`, following the Next 16 upgrade guide.
- Password `120226`, cookie `demo-auth`, 30 days, httpOnly, secure.
- Matcher: `['/((?!_next/static|_next/image|opengraph-image|icon|apple-icon|favicon\\.ico|.*\\..*).*)']`. Link previews stay open; nothing else is public.
- Restyle the gate page:
  - chalk ground under a 40% `terrace-sea-pale-morning`;
  - the wordmark `AUBE’MAR` in Cormorant 500 with 0.34em tracking;
  - a line in Jost caps: `PRIVATE PREVIEW`;
  - an underline-only password field and an ink outline button labelled `ENTER`;
  - error text `Incorrect password.`
- The gate's inline CSS must not use the browser's default black box from the earlier demos.
- **Gate it.** Recommended, even though Omnimundi and Get Work Abroad are public, because this site reuses third-party agency photography. The gate, noindex and the Credits page together keep it a private case study. Revisit only if Magnus wants it as a public portfolio piece, and then swap the agency photos first.
- The secure cookie does not stick on localhost, so test the gate on a Vercel preview.

Noindex, three layers
1. `metadata.robots = { index: false, follow: false }`.
2. `robots.ts` disallows `/`.
3. The `X-Robots-Tag` header.

No sitemap.

Performance budget
- LCP under 2.0s on 4G for Home, using the poster image.
- At most about 350 KB of JS on Home.
- Total `public/` under 60 MB after the grade script.

Deploy
- Run `vercel whoami` and stop unless it says the `magnus-clearscaler` account.
- Project name **`aubemar`** (fallback `aubemar-estates`). Deploy with `vercel --yes --prod` from the repo root; CLI only, with no Git integration and no `vercel git connect`.
- Then:
  - `vercel alias set <deployment>.vercel.app aubemar.vercel.app`;
  - turn off Vercel Authentication (`ssoProtection: null`).
- Commit with the Xcode git path on `PATH` and this identity:
  ```
  git -c user.email=magnus@clearscaler.com -c user.name="Magnus Motzfeldt-Berge" commit ...
  ```
  Never use the `clearcruit` identity.

Build order
1. Grade script, then the contact-sheet acceptance test (6.1).
2. Data files.
3. Tokens and type.
4. Header, footer and gate.
5. Home.
6. Houses index.
7. House detail.
8. Enquire.
9. La Maison.
10. Credits.
11. Carnet.
12. OG image and icons.
13. Copy check, Lighthouse, mobile at 390px, then deploy a preview.

---

## Open points for the merge with the other boss

1. **Accent colour:** I say none. The Villa Alba brief had bronze. If kept, use it only for focus rings.
2. **Typeface:** Cormorant + Jost (my choice) against Newsreader + Figtree (the aman-web proposal). Mine keeps the owner-approved serif and adds Riviera period character. Newsreader is the safer choice for reading.
3. **Prices:** shown on the index and detail pages, with "Price on request" at €20M and above. Aman shows none and Montevie shows all. A credible Riviera case study needs them, but quietly.
4. **Hero:** a full-bleed video on Home, with everything after it inset. Aman insets even the hero. I break that once, for the first impression.
5. **Carnet:** in scope for v1 but built last. It is cheap, because the copy and images are already chosen.
6. **Cap Ferrat:** dropped on photo quality, and it can only return through a better listing (section 8, last paragraph).
