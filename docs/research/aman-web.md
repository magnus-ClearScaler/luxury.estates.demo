# aman.com: reverse-engineered design spec

Captured 2026-10-09 from live pages using a private headless Chrome (CDP) at 1440x900 and 390x844, reading computed styles, not guessing. Pages studied:

- Home: https://www.aman.com/
- Destination: https://www.aman.com/resorts/aman-le-melezin (Courchevel, the nearest French reference)
- Residences index: https://www.aman.com/residences
- Residence detail: https://www.aman.com/resorts/amanjena/residences
- Journal: https://www.aman.com/stories and https://www.aman.com/stories/a-world-by-the-water

Screenshots: `docs/research/shots/aman-*.png` (listed at the end).
Reference only. We do not reuse Aman photography, logo or copy.

---

## 1. The idea in one paragraph

Aman's site is a warm paper page with photographs laid on it. Everything that is not a photograph is quiet: one dark warm grey for text, no colour accents, no icons beyond hairline glyphs, no rounded corners, no shadows, no gradients, no badges. Hierarchy comes from a book serif at modest sizes, a tiny tracked uppercase sans eyebrow, and very generous vertical space. The page never shouts; the image does the selling and the words only label it.

---

## 2. Colour (exact computed values)

| Role | Hex | rgb | Where |
|---|---|---|---|
| Page paper | `#F3EEE7` | 243,238,231 | body background on home, destination, journal |
| Deeper sand band | `#E6E2DB` | 230,226,219 | the Residences band on home; whole background of property residence pages |
| Light panel | `#FDFAF6` | 253,250,246 | menu right panel, map surrounds |
| Footer / form panel | `#FFFFFF` | 255,255,255 | footer and the enquiry form block |
| Ink (text, solid button) | `#313131` | 49,49,49 | 90% of all text; "Reserve"/"Enquire" fill |
| Secondary ink | `#585858` | 88,88,88 | footer lists, subdued copy |
| Footer button fill | `#404040` | 64,64,64 | "Sign Up" |
| Outline button border | `#AAA6A3` | 170,166,163 | "Discover more" boxed variant, "Contact Us" |
| Hairline rule | `#DAD9D6` | 218,217,214 | dividers above card CTAs, filter rule |
| Input border / placeholder | `#82847F` | 130,132,127 | form fields |
| Reversed text | `#F3EEE7` | | text on dark buttons is the paper colour, not white |

Rules: no accent colour exists. Links are ink + underline. Black `#000` appears only in inputs/icons. The only "colour" on the page is in the photographs. Body text is never pure black and the page is never pure white (white is reserved for footer and form, which reads as a slightly cooler "stationery" layer).

---

## 3. Typography

Root font-size is **14px** (`:root { font-size: 14px }`), antialiased. Everything below is computed px.

Families actually rendered:
- **Lyon Display Web** (Commercial Type), weight 300/400: body copy.
- **Lyon Text Web**, 400: all headings.
- **WhitneySSm** (Hoefler), 400: UI, nav, eyebrows, buttons, footer lists, form labels.
(Also loaded but unused on these pages: Calligraph810, Classic Roman, Beausite, Suisse BP, Janu Sans; Noto Serif JP/SC for Asian locales.)

| Token | Family | Size / line-height | Tracking | Case | Use |
|---|---|---|---|---|---|
| display | Lyon Text | 72 / 80 | 1px | Sentence | H1 on Residences index and story articles, left aligned |
| h2 | Lyon Text | 31.08 / 45.07 | 0.5px | Title | section heads ("Seasonal Experiences", "Destinations", property name) |
| h2-small | Lyon Text | 24.1 / 35 | 0.5px | Title | footer heads, mobile section heads |
| h3 | Lyon Text | 19.6 / 28.4 | 0.98px (0.05em) | Title | card titles, residence names |
| quote | Lyon Display | 32 / 40 | 1px | | pull quotes in stories |
| lead | Lyon Display | 15 / 21.75 | 0.8px | | intro paragraphs, article body (15/22) |
| body | Lyon Display | 14 / 20.3 | 0.8px | | card descriptions, intros |
| eyebrow | Whitney | 10.1 / 14.7 | 2px (0.2em) | UPPERCASE | "NOW OPEN", "COURCHEVEL 1850, FRANCE", "MEDITATION / APRIL 2024" |
| link | Whitney | 13 / 18.85 | 0.42 to 0.8px | Sentence | "Discover more", "Make an enquiry" |
| nav | Whitney | 14 / 20.3 | 0.7px | Sentence | Menu, English, Reserve |
| subnav | Whitney | 12.6 / 18.3 | 0.8px | Sentence | property sub-navigation |
| subnav-home | Lyon Text | 16.8 | 4px | UPPERCASE | property name in subnav ("AMANJENA") |
| menu-xl | Whitney | 24 | normal | Sentence | items in the open menu drawer |
| label | Whitney | 12 | 0.8px | Sentence | form labels |
| input | Lyon Display | 16 | normal | | field text (16px avoids iOS zoom) |
| footer-list | Whitney | 13 / 18.8 | 0.3px | | |

Observations:
- Headings are **small** for a luxury brand. The biggest heading on the homepage is 31px. The 72px display size appears only once per page and only on index/article pages.
- Weight never goes above 400 (one bold sentence for an operational notice). No italics in UI.
- All body copy is serif. The sans is for wayfinding only. This inversion (serif body, sans UI) is the core of the voice.
- Tracking is slightly positive everywhere (0.5 to 1px) which makes the serif feel airy and expensive.
- Measure: body paragraphs sit in 439px or 680px columns, about 65 to 95 characters.

Open-licence stand-ins for our build (Lyon and Whitney are commercial):
- Serif: **Newsreader** (opsz, weights 300 to 400) or **Source Serif 4** (Display optical size). Second choice: **Cormorant Garamond** is too calligraphic; avoid. EB Garamond is acceptable but busier.
- Sans: **Inter** is too techy at small sizes. Prefer **Figtree** or **Instrument Sans** at 400, or **Hanken Grotesk**. Whitney's humanist, slightly narrow feel is closest to **Figtree**.

---

## 4. Grid, margins, rhythm

- Max container **1440px** with **24.5px** side gutters (content width 1391px). Images go to the gutter, never to the window edge on desktop. This inset frame is a signature: the photograph sits on paper like a print.
- On mobile (390px) the hero video goes **edge to edge**; everything else keeps ~25px gutters.
- Column gap **~37px** for card rows, **49px** (`--bn-col-gap`) for two-column text/article layouts.
- Common layouts at 1440:
  - Hero: 1 x 1391 wide, 16:9 (1391 x 784).
  - Feature pair: **915 + 37 + 439** (wide landscape card 1.61:1 + slim portrait card 0.76:1). Both images share the same height (~570px). Used for "Explore the World / Now open" and "Own a Private Piece / Featured residence".
  - Three-up: 3 x 439 portrait (0.76:1, 439 x 577).
  - Intro left + carousel right: text column ~440px, then 326px square cards scrolling, the last one bleeding off the right edge at reduced opacity.
  - Residences index: alternating zigzag, image **894 x 552 (1.62:1)** + text column 469px, text top aligned, CTA pinned to the bottom of the row above a hairline.
  - Centred text block: **680px** wide (x = 380) for property intros.
  - Article: H1 left, then full-width images (1391 x 860, 1.62:1) and diptychs (2 x 671 x 883, 0.76:1). Body text sits in the **right half** only (x = 744), leaving the left half empty. Very editorial.
- Header: **88px** tall, sticky; compacts to **56px** (`--header-menu-scrolled: 4rem`) on scroll, background stays paper, no shadow, no border.
- Property pages add a second sticky bar (48px) for sub-navigation with a 1px hairline under it.

Vertical rhythm (desktop, measured):
- Header to hero image: 65px.
- Image to eyebrow: ~24px. Eyebrow to title: ~30px baseline gap. Title to paragraph: ~12px. Paragraph to link: ~45 to 60px.
- Between sections: **110 to 160px**. Bands (deeper sand) have padding **83px top / 80px bottom**.
- Footer starts after ~70px of empty paper.
Rule of thumb for our build: base unit 8px; section spacing 128 to 160px desktop, 80 to 96px mobile. When unsure, add space.

---

## 5. Words: how little, and the voice

Homepage main content (excluding footer) is about **250 words** across 11 cards. Total page including the giant footer destination list is 657 words; the footer accounts for over half of it.

Per element:
- Eyebrow: 1 to 3 words ("NOW OPEN", "AMAN RESIDENCES", "FEATURED RESIDENCE").
- Card title: 2 to 6 words ("Rituals of Joy", "To the Wilds", "Own a Private Piece of Aman").
- Card description: **one sentence, 10 to 27 words**. Never two paragraphs on a card. The hero card has no description at all.
- Section intro: one sentence, ~20 words.
- CTA: always "Discover more" (sometimes "Shop now", "Make an enquiry", "Book now"). Never an arrow, never an exclamation.

Sentence shapes (paraphrased patterns, not to be copied):
- Place + atmosphere: "Set amid [landscape], [place] emerges where [three nouns] converge."
- Ownership as belonging, not acquisition: "Impeccable homes for a select few." "Permanent immersion into the ... lifestyle." Price and square metres never appear on index pages.
- Triplets of nouns: "profound privacy, generous space and unrivalled access", "forest and island, mountain and clifftop, ocean and sky".
- Verbs are slow: rests, emerges, unfolds, invites, discover. Adjectives are restrained: secluded, serene, sweeping, timeless.
- No numbers in headlines. Facts (36 hotels, 21 countries) are tucked mid-sentence.
- Titles are sentence case and often poetic rather than descriptive ("Where mountains meet", "A world by the water", "The city after blossoms").

Note: Aman itself uses spaced en dashes in body copy. Our copy rule bans em and en dashes; use commas, full stops or "and" instead.

---

## 6. Images

- Aspect ratios in use (desktop): **16:9** video hero; **1.61:1** landscape (915x570, 894x552, 1391x860); **0.76:1** portrait (439x577, 671x883); **1:1** squares (326, 539, 672). Mixed ratios in a carousel on destination pages (260x260, 260x160, 260x342) create a gentle "contact sheet" rhythm with tops staggered and centres aligned.
- `object-fit: fill`/cover, **no border radius anywhere**, no captions on images, no overlays, no text on photos. Text always sits below or beside the image on paper.
- Grade: warm, low-contrast, sun-low light (golden hour or dusk), muted saturation, lifted shadows, honey/stone/terracotta tones; architecture shot symmetrically and frontally; frequent empty interiors with one object (vase, bowl). Many images include a lone figure seen from behind or in motion blur, never posing at camera. The journal mixes **black and white** with soft colour within one story.
- Rendered residences (CGI) are graded identically to photography: dusk, warm interior light, calm water.
- Load behaviour: images arrive at `opacity: 0` and fade in with `transition: opacity .5s ease-in-out` (b-lazy). Before load, a pale placeholder of the image at very low contrast is shown (visible on /stories), so the page never flashes white.
- No zoom on hover. No parallax. No Ken Burns.

---

## 7. Motion

Everything is short and soft. Measured transitions:
- Images: `opacity 0.5s ease-in-out` on load.
- Links and buttons: `color .4s, background-color .4s, border-color .4s`.
- Carousel slides: `opacity .2s .3s` (fade after a short delay; off-screen slides sit at reduced opacity).
- Menu drawer: `slide-fade-in-left 0.4s ease both`; overlay `fade-in .3s ease`; toggles `visibility 0s .4s, opacity .4s linear`.
- Header compaction: height change on scroll, no slide-away.
- Hero: muted autoplaying Vimeo film (16:9) with minimal controls, slow handheld or gliding camera, soft focus.
There is **no scroll-triggered reveal animation** on text. Calm comes from stillness. For our build: fade images in on load (400 to 600ms, ease-in-out), never animate text position, honour `prefers-reduced-motion`.

---

## 8. Navigation

Desktop header (88px, paper background, sticky):
- Left: hamburger icon (three hairlines) + the word "Menu" (Whitney 14) + a hairline search glyph.
- Centre: the wordmark, ~150px wide, thin geometric caps with a macron. No tagline.
- Right: language selector ("English" with a 1px underline, 88px wide) and one solid button ("Reserve" on hotel pages, "Enquire" on residences): 140 x 42, fill `#313131`, text `#F3EEE7`, padding 10/15, 0 radius.
- No visible top-level links. Everything lives in the drawer.

Drawer (click "Menu"):
- White left panel (~700px) with the logo and 9 items in Whitney **24px**: Destinations >, Experiences >, Exclusive Offers, Residences, Contact us, then a gap, then sub-brands. Chevrons only on items with children.
- Right panel `#FDFAF6` with a small serif prompt ("Discover Aman in...") and three full-width outline buttons (regions). The remaining page behind is dimmed.
- Close is a single hairline X.

Property pages: a second centred sub-nav (Whitney 12.6, tracked 0.8) with the property name in tracked serif caps and a chevron, e.g. "AMANJENA >  Gallery  Accommodation  ...  Residences  Getting Here  Contact Us". Active item underlined with a 1px line.

Mobile: header is hamburger left, logo centre, search right; the primary CTA becomes a **fixed bottom bar** (full-width minus 15px, 50px high, `#313131`, "Reserve").

---

## 9. CTAs

Three kinds only, all square-cornered:
1. **Solid**: header button (140x42) and footer "Sign Up" (311x35, `#404040`). Text in paper colour.
2. **Text link with underline**: "Discover more" in Whitney 13, ink colour, `text-decoration: underline` with an offset that puts the line ~8px below the baseline, hit area 47px tall. This is the default CTA on cards.
3. **Outline**: "Discover more" on the residences index and "Contact Us" in the footer: 1px `#AAA6A3` border, padding 7.8 x 35px, 36px high, transparent fill.
Never more than one CTA per card. No arrows, no icons in buttons.

---

## 10. How residences (real estate) are presented

This is the most relevant part for us.

**Residences index** (/residences):
1. Display H1 "Aman Residences" (72px, left). 
2. Two columns: left a 6-word tagline, right a 3-sentence paragraph (15px). 
3. A single centred text link "Make an enquiry" (anchor to the form). 
4. Centred H2 "Destinations" and a hairline with a right-aligned "FILTER BY  - ANY -" dropdown in tracked caps. 
5. A long **zigzag list** of ~25 properties: image 894x552 alternating left/right, text column with H3 name (19.6px), eyebrow location ("TEXAS HILL COUNTY, UNITED STATES"), one paragraph of 25 to 50 words, then at the bottom of the row a hairline and an outline "Discover more" button. About 635px per row.
6. No prices, no bedrooms, no square metres, no map, no "sold" badges, no pagination. 18,000px of quiet scrolling.

**Residence detail** (/resorts/amanjena/residences): background shifts to deeper sand `#E6E2DB`.
1. Centred eyebrow location in serif caps, H2 name, 3-line centred intro (680px).
2. Full-width image 1391x860.
3. Centred design paragraph (architecture, materials: lime-washed oak, stone, patinated bronze, travertine).
4. Image left (912x563) + right column of three short titled blocks: "Your Sanctuary in ...", "Immersion into the ... Lifestyle", "Uninterrupted Views". Each 40 to 80 words.
5. "Make an enquiry" H2 then the form on a white panel.
6. "Aman Residences" carousel of other residences (3 x 539 squares, centred titles and one-line descriptions).
7. Property footer strip: name in tracked caps, address, phone, email, "Get directions".
Specification facts (villa types: "Two- to Five-Bedroom Villa") appear inside prose, never as a spec table.

**Enquiry flow**: single-step inline form, no modal, no multi-step wizard.
Fields: First name*, Last name*, Email*, Phone (country flag prefix)*, Country of Residence* (select), Project Name* (select), Where did you hear about us* (select), consent checkbox, a confidentiality disclaimer paragraph, CAPTCHA, then a solid black "Send" button (~100px).
Field styling: label Whitney 12 / 0.8 tracked above the field; input 36px high, 1px `#82847F` border, white fill, 0 radius, 8px padding, Lyon 16px text. Form sits in a white band spanning the page with the fields ~1195px wide (we would narrow to 560 to 680px).

**Homepage treatment**: one sand band (`#E6E2DB`, padding 83/80) with the 915+439 pair: "AMAN RESIDENCES / Own a Private Piece of Aman" and "FEATURED RESIDENCE / Aman Residences, [name]". Ownership is framed as membership of a world, not a transaction.

---

## 11. Destination page pattern (Aman Le Mélézin)

1. Header + property sub-nav.
2. Hero film 16:9 inset.
3. Centred: eyebrow "COURCHEVEL 1850, FRANCE", H1 31px, a 4-line centred paragraph (680px), one bold operational line.
4. "Contact sheet" carousel of ~30 small images with mixed ratios, centred vertically, edge images faded, with a thin progress line below (a 590px hairline with a short darker segment) instead of dots.
5. Big single feature (accommodation) 1391 wide with eyebrow, H3, one sentence, two text links ("View all Accommodation", "Book now").
6. 3-up cards (Dining / Wellness / Experience) then a 2-up (915 + 439).
7. "Getting here": centred paragraph, a desaturated beige custom map (no Google colours), address line.
8. A history block: image left, "Aman Le Mélézin in Courchevel 1850" with two long paragraphs.
9. "Nearby resorts" carousel, centred titles under square-ish images.
10. Property footer strip, then global footer.

---

## 12. Journal (Stories)

- Index: centred H2 "Stories", then a strict **2-column grid of 672px squares**, each with eyebrow "SERIES | MONTH YEAR", H3 title, one-sentence standfirst. No categories bar, no search, no author avatars.
- Article: H1 72px left aligned, image sequence dominating (10+ full-width 1.62:1 images, portrait diptychs), body in 15/22 Lyon set only in the right half column, a few pull quotes at 32px, photographer credit line, a single "Discover [property]" link at the end. Roughly 750 words to 12,700px of page: about 17px of scroll per word.

---

## 13. Footer

White `#FFFFFF`, 958px tall at desktop.
1. Row: "Get inspired" (24px serif) + one sentence + full-width dark "Sign Up" button.
2. "More information" list (Whitney 13, `#585858`) and a four-column "Destinations" index of every property, grouped by region with small black subheads.
3. Small outline "Contact Us".
4. Bottom bar: wordmark left, "Follow us on:" with monochrome social glyphs, copyright right.
No newsletter pop-up, no chat bubble (cookie banner only).

---

## 14. What makes it feel calm (checklist we can test our build against)

1. One text colour, one paper colour, one deeper sand for a single band. No accent.
2. Serif for reading, sans only for wayfinding. Max heading size on the home page about 31px.
3. Every photograph inset on paper with the same 24 to 25px margin, square corners, no overlay text.
4. One sentence per card. One CTA per card, and it is an underlined text link.
5. Sections separated by 110 to 160px of empty paper, not by lines or boxes.
6. Navigation hidden behind "Menu". One button in the header.
7. Motion limited to opacity fades of 0.4 to 0.5s. No scroll-jacking, no reveals, no parallax.
8. Real estate shown as places to belong: location eyebrow, poetic title, a paragraph, "Discover more". Numbers live on the detail page inside prose or not at all.
9. Images: warm golden-hour grade, symmetric architecture, empty rooms, figures from behind, a little motion blur, occasional black and white.
10. Footer is the only dense area of the site.

---

## 15. Translation into our build (proposal, Côte d'Azur house)

Tokens (CSS custom properties):

```css
:root{
  --paper:#F4EFE8;      /* Aman #F3EEE7, nudged a hair lighter for Riviera light */
  --sand:#E7E1D7;       /* single deeper band */
  --linen:#FBF8F3;      /* menu panel / alt surface */
  --white:#FFFFFF;      /* footer and enquiry form only */
  --ink:#2F2E2C;        /* warm near-black text and solid buttons */
  --ink-2:#5E5B56;      /* secondary */
  --stone:#ADA79F;      /* outline button border */
  --hair:#DCD7CF;       /* hairlines */
  --field:#8A877F;      /* input borders */
  --gutter:clamp(16px,1.7vw,24.5px);
  --container:1440px;
  --gap:clamp(20px,2.6vw,37px);
  --section:clamp(80px,10vw,160px);
  --ease:cubic-bezier(.4,0,.2,1);
}
html{font-size:14px}
```

Type pairing: Newsreader (or Source Serif 4 Display) 300/400 for headings and body, Figtree 400 for eyebrows, nav, buttons, labels. Scale: 72 / 31 / 24 / 19.6 / 15 / 14, eyebrow 10px tracked 0.2em uppercase.

Page skeleton suggestions:
- Home: header (Menu, wordmark, "Enquire"), 16:9 muted film or still of the coast inset, a two-word title under it with "Discover more"; feature pair 915+439 (a villa on Cap Ferrat + a portrait detail); a "Destinations" carousel of Riviera places (Cap d'Antibes, Saint-Jean-Cap-Ferrat, Èze, Mougins, Saint-Tropez) as squares; one sand band for "Private Residences"; three-up journal; footer.
- Listings index: zigzag rows exactly like /residences with eyebrow location, poetic title, one paragraph. Price shown, if at all, as a single small line ("Price on request" or a figure in Whitney-style tracked caps) and never as a badge.
- Listing detail: deeper sand page, centred intro, full-width image, design paragraph, image + three titled blocks, a quiet facts line in prose, inline enquiry form on white.
- Journal: 2-column squares, articles with right-half text.

Avoid (from Aman's discipline and the owner's feedback): stat counters, star ratings, floating badges, gradient overlays, rounded cards, shadows, icon rows, "Book a call" urgency, more than one CTA per block, centred long paragraphs wider than 680px.

---

## Screenshots

`docs/research/shots/`
- `aman-home-hero.png` header + inset hero film at 1440x900
- `aman-home-full.png` complete homepage (downscaled)
- `aman-home-scrolled-header.png` compact 56px header, card pair, seasonal carousel with faded last card
- `aman-menu-overlay.png` the drawer menu
- `aman-home-mobile.png` 390px: edge-to-edge film, fixed bottom Reserve bar
- `aman-residences-hero.png` residences index: 72px H1, two-column intro, centred enquiry link, filter hairline
- `aman-residences-zigzag-row.png` two zigzag rows with outline CTAs above hairlines
- `aman-residence-detail-hero.png` residence detail on deeper sand with sub-nav
- `aman-residence-enquiry-form.png` image + three blocks, and the enquiry form
- `aman-destination-hero.png` destination page with sub-nav and inset film
- `aman-destination-intro-gallery.png` centred intro + mixed-ratio contact-sheet carousel + progress hairline
- `aman-stories-hero.png` journal index (placeholder fade state visible)
- `aman-story-bw-colour.png`, `aman-story-text-image.png` article image rhythm and right-half text column
