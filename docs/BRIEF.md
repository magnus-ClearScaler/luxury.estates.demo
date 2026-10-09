# Aube'Mar: build brief

Final, merged brief from both bosses (decision log: `docs/research/conductor-decisions.md`). Builders implement this file as written. Where this file is silent, choose the quieter option. Nothing in this file uses an em dash or an en dash, and nothing you write may either.

Repo: `/Users/magnusmb/luxury.estates.demo`. Dev port 3430. Vercel project `aubemar-demo` on the `magnus-clearscaler` account.


## Owner feedback, round 2 (villas first)

Magnus, 2026-10-09, after the second look: "The best houses are not on the first page. The best pictures are the beautiful pictures of the villas. The first two houses on the home page are not the best villas. Les Pins does not have many beautiful pictures of the house. Maison Edouard has an insane view but not enough photos of the house. Link the front page to the best pictures of the houses, and add some more houses from online."

This section is the merge of `docs/direction-r2-opus.md` and `docs/direction-r2-fable.md` by the conductor. It is binding and overrides sections 6.1, 6.2, 7, 7.1, 7.2 and the round 1 section below wherever they conflict. Where the two bosses disagreed, the choice that puts the most beautiful villas first won; the reasons are given inline. Every contested crop was rendered at its real slot ratio before deciding (scratchpad `r2merge/home.jpg`, `heroes.jpg`). Everything the owner already likes stays exactly as it is: the paper, the palette, Newsreader and Jost, the inset prints, square corners, the round 1 spacing, the hero film, the copy voice. No em or en dashes in `src/` or `data/`, and none in this section.

### R2.0 The rule

Every still on Home is a photograph of a house, whole, seen from outside, in its setting: the facade in its garden, among pines, olives or cypress, the pool in front of the house, a terrace with the house behind. A view without the house is secondary everywhere and never on Home. Every published house opens on the house itself, and views, rooms and details come after it. A house without a strong frame of the house is not on Home; it sits at the foot of the index or is held.

Why the old Home failed the rule: Les Pins 01 (pines, no house), Villa Blanche 10 (a front door), Maison Édouard 02 (pool and sea, no house), Le Belvédère 01 (a deck). The first two houses in the index, Villa Cap Fleuri and Les Pins, ranked 10th and 13th of 14 for house photography (`docs/research/photo-scores.md`).

### R2.1 The published set: eleven houses, in order of beauty

/estates is one sequence, ordered by how beautiful the house is in its best frame. **The two region groups (`Bord de mer`, `Collines`) and their h2 headings are removed from /estates** (`groups()` is no longer used there; render `published()` in order). The region moves into each row's eyebrow, which becomes `placeLine(e)` set in caps (`MOUGINS, COLLINES`, `RAMATUELLE, BORD DE MER`), the same string the estate page intro already uses. The zigzag rows, their sizes, the text column and the alternation (`flip` by index across the whole page, `eager` on the first row) are unchanged. References renumber in this order.

| # | Ref | Slug | Name | Town | Region | Status | Why here |
|---|---|---|---|---|---|---|---|
| 1 | AM-0101 | `mas-blanc-mougins` | Mas Blanc | Mougins | collines | kept | 01 is the best house photograph we own: the pool reflecting the house, steps through lavender and cypress. |
| 2 | AM-0102 | `bastide-des-oliviers-vence` | Bastide des Oliviers | Vence | collines | NEW | The 1751 bastide across its lawn under ivy, old olives either side; the most romantic frame in either batch. |
| 3 | AM-0103 | `les-arcades-ramatuelle` | Les Arcades | Ramatuelle | mer | NEW | The axial path between cypresses to the ivy facade; the softest colour of the new batch. |
| 4 | AM-0104 | `villa-blanche-cap-dantibes` | Villa Blanche | Cap d'Antibes | mer | kept | The archetypal Belle Époque villa among umbrella pines, pool in front, once it opens on 02. |
| 5 | AM-0105 | `villa-camille-roquebrune` | Villa Camille | Roquebrune-Cap-Martin | mer | NEW | A real 1891 villa framed by olive and bougainvillea above the sea; the grandest house in the set. |
| 6 | AM-0106 | `maison-du-chemin-saint-tropez` | Maison du Chemin | Saint-Tropez | collines | NEW | Seven true exteriors, calm facades behind old trees. New build, so below the old houses. |
| 7 | AM-0107 | `bastide-du-ciel-gassin` | Bastide du Ciel | Gassin | collines | was held, PUBLISH | 02, the ochre bastide between a cypress and a pine with the gulf behind, is one of the five best frames across all 22 folders. Above Le Mas Rose because its best frame is stronger (both bosses said so; Opus ranked it lower for its HDR, which the grade absorbs). |
| 8 | AM-0108 | `le-mas-rose-ramatuelle` | Le Mas Rose | Ramatuelle | collines | NEW | The rose house with sage shutters behind a green tiled pool; the quietest, most domestic house of the new batch. |
| 9 | AM-0109 | `bastide-des-pres-chateauneuf` | Bastide des Prés | Châteauneuf-Grasse | collines | kept | Lovely compositions (11, 01, 02) and a hero that shows the house; AI smoothed texture at 100%, so card and hero size only, never Home. |
| 10 | AM-0110 | `domaine-des-vignes-saint-tropez` | Domaine des Vignes | Saint-Tropez | collines | kept | The calmest colour of all, but the house sits small and far back in every frame. |
| 11 | AM-0111 | `maison-edouard-beaulieu` | Maison Édouard | Beaulieu-sur-Mer | mer | kept, demoted | One real house frame (01), now the hero. Last, for the view the owner called insane. Never on Home. First to cut if the owner wants ten. |

Home shows houses 1 to 7, in that order, one still each (R2.4).

**Held** (`published: false`, `reference: null`; the `own` entries, galleries and tunes stay in `estates.ts` so nothing is lost; `grade.mjs` already skips unpublished houses, so their graded folders go: delete `public/estates/{les-pins-eze,le-belvedere-nice,villa-cap-fleuri,maison-des-collines-ramatuelle}`):

- `les-pins-eze` (score 2): no exterior of the house exists.
- `le-belvedere-nice` (3): a penthouse; no villa in any frame. Remove its `indexFrame`; no published house needs one now, because every hero is a house.
- `villa-cap-fleuri` (5): tired frontal facade, crazy paving, a neighbour in frame, heavy HDR.
- `maison-des-collines-ramatuelle` (6): contemporary, lawn heavy; the peninsula already has five stronger houses.
- New, not published, added to `own` as held with empty galleries: `la-pinede-ramatuelle` (first reserve: a lovely stone house under wisteria, but the heaviest HDR of the new batch and a 1990s kidney pool with a waterfall), `maison-du-cap-roquebrune` (contemporary, built up neighbours, artificial lawn), `la-pergola-beaulieu` (no frame shows the whole house; the Maison Édouard problem without the view).
- Still held: `domaine-des-cypres-cap-ferrat`, `bastide-de-la-rade-villefranche` (second reserve: a stone bastide with a tower over the rade, but the most HDR heavy set we have; Fable proposed publishing it twelfth, Opus held it; held, because the owner asked for calm house photography and Rade needs the firmest grade on the site to sit beside Mas Blanc), `villa-lerins-cannes`, `lattique-saint-tropez`.

If the owner wants twelve: Bastide de la Rade first, La Pinède second, each with the firm grade from Fable's direction file section 3. If he wants ten: drop Maison Édouard.

Prices: Bastide des Oliviers (€3,300,000) and Bastide des Prés (€3,800,000) sit under the €4M floor from the research and stay for their photography. Villa Camille (€29,500,000) is at or above €20M, so it reads `Price on request` on the index and `On request` in Particulars; Les Arcades (€19,500,000) shows its figure.

### R2.2 Data for the new houses

- `src/data/estates.ts` imports `data/listings-new-east.json` and `data/listings-new-west.json` into `sources` alongside the two existing files (same `with { type: "json" }` attribute). Bastide du Ciel is already in `listings-west.json`.
- `type`, `short`, `long`, `features`, `source_url`, `source_agency`, `ref`, beds, baths, areas, year and price come unchanged from the JSON. Never invent a bathroom count (Maison du Cap has none; it is held anyway) or a year (Le Mas Rose and Bastide du Ciel have none; the `Built` row is omitted).
- Fields we own:

| Slug | region | outlook | builtApprox |
|---|---|---|---|
| `bastide-des-oliviers-vence` | collines | `Garden and hills` | false (1751) |
| `les-arcades-ramatuelle` | mer | `Sea and pines` | false (2002) |
| `villa-camille-roquebrune` | mer | `Sea and Monaco` (the listing's own claim: unobstructed view over the sea and Monaco) | false (1891) |
| `maison-du-chemin-saint-tropez` | collines | `Garden` | false (2024) |
| `bastide-du-ciel-gassin` | collines | `Hills and sea` | false (no year) |
| `le-mas-rose-ramatuelle` | collines | `Garden and pines` | false (no year) |

- The seven `own` entries (six published, plus the three new held) go in index order; `own` then holds 22 houses.
- `src/lib/estates.ts`: `groups()` is no longer used by /estates; keep `regionLabel` and `placeLine` for the eyebrows. `countWord` already covers eleven.
- The colophon estates table is generated from data, so the six new rows, their source links, the two Sotheby's domains and the Zingraf co-listing note on Les Arcades appear on their own; check they render in `Listed by`.

### R2.3 Copy changes (existing voice, no dashes)

| Where | Was | Now |
|---|---|---|
| `copy.estates.intro` | `{N} houses between Cap-d'Ail and Ramatuelle.` | `{N} houses between Roquebrune and the Saint-Tropez peninsula.` |
| `copy.house.blocks[0].body` | `{N} at present, between Cap-d'Ail and Ramatuelle. We would rather know each one well than list many.` | `{N} at present, between Roquebrune and the Saint-Tropez peninsula. We would rather know each one well than list many.` |
| `keepPlaceNames` in `estates/page.tsx` | holds `Cap-d'Ail` on one line | holds `Saint-Tropez` on one line |
| Section 0 of this brief | `Nine houses between Cap-d'Ail and Ramatuelle` | `Eleven houses between Roquebrune and the Saint-Tropez peninsula` |

Why "Roquebrune" and not "Cap Martin": Villa Camille's listing places it between Monaco and Cap Martin, so the cape is not the eastern end; the commune is. Why "the Saint-Tropez peninsula": Gassin, Ramatuelle and Saint-Tropez are all on it, so the phrase stays true whichever of them is furthest west. `{N}` stays data driven (`Eleven`).

The footer `ESTATES` column and the enquiry form's house select read `published()`, so they pick up the eleven in order on their own (the footer column grows from 9 to 11 lines, which is fine).

### R2.4 Home: seven stills, seven houses, every one an exterior

The structure does not change: film, intro line, feature pair, statement with its 21:9, estates row, linen band. Only the photographs and the feature copy change. The sailboat comes off Home: both bosses agreed every feature must be a house; Fable would have kept the sailboat in the statement slot as the brand image, Opus replaced it with Bastide des Oliviers 01. Rendered at 21:9, Oliviers 01 is the best crop of that photograph (the whole ivy facade, the old olives and the hills, with the surplus lawn gone), so it takes the slot. Home then shows the seven best houses in index order, which is the owner's sentence made literal.

| Slot | Ratio at 1440 | House and file | Focal | What is in frame |
|---|---|---|---|---|
| Feature pair, wide | 1.6065 (570px tall) | **Mas Blanc 01** | 50/55 | The white mas above its reflecting pool, steps through lavender and cypress. The pool reflection must stay in frame: never crop from the bottom. |
| Feature pair, portrait | 0.76 | **Villa Camille 02** | 50/50 | The full 1891 facade with balustraded steps, the olive branch above, bougainvillea at the right edge, sea at right. Native 1750x1864; the crop takes 1417px of width centred and keeps all of the height. |
| Statement image | 21:9 (mobile `wide`) | **Bastide des Oliviers 01** | 50/35 | The whole bastide under ivy, old olives either side, the lawn and the hills. Rendered and checked at 21:9 and at 1.62. |
| Estates row, card 1 | 0.76 | **Les Arcades 02** | 50/50 | Straight up the axis: the path, the hedges, the cypresses and the arched ivy door, centred. |
| Estates row, card 2 | 0.76 | **Villa Blanche 02** (fix pass; was 03) | 52/50 | The colonnade, the iron balconies and the pool; 03 was darker, seen from a drone, and a palm hid the porch. |
| Estates row, card 3 | 0.76 | **Bastide du Ciel 02** | 72/50 | The ochre bastide and the cypress, the gulf of Saint-Tropez behind; the house is in the right half, so the crop sits right. Chosen over Le Mas Rose 01, where the house sits small behind loungers. |
| Linen band | 1.62 | **Maison du Chemin 02** | 50/50 | The facade in its garden behind the old tree, arched steel windows, agapanthus; dappled light that suits "In person, before ten". |

Three colours across the row (white and ivy, cream Belle Époque, ochre bastide) from three parts of the coast; two Ramatuelle houses are never side by side.

`copy.home` (replaces the four slot objects; `housePhoto()` in `src/app/page.tsx` resolves every one, and throws if a file is not in a published gallery):

```
featureWide
  estate   mas-blanc-mougins, file 01, focal [50, 55]
  eyebrow  MOUGINS
  title    Mas Blanc
  body     A white house of stone, lime and old wood above a long green pool.
  link     VIEW THE HOUSE → /estates/mas-blanc-mougins

featurePortrait   (a house card now, not The House card)
  estate   villa-camille-roquebrune, file 02, focal [50, 50]
  eyebrow  ROQUEBRUNE-CAP-MARTIN
  title    Villa Camille
  body     A Belle Époque villa of 1891, pale stone and balustrades above an open sea.
  link     VIEW THE HOUSE → /estates/villa-camille-roquebrune

statement   text unchanged
statementImage   (new slot, rendered with housePhoto(), ratio "pano", mobileRatio "wide")
  estate   bastide-des-oliviers-vence, file 01, focal [50, 35]

estatesRow
  eyebrow  ESTATES
  cards
    les-arcades-ramatuelle      02  [50, 50]  Les Arcades      RAMATUELLE
    villa-blanche-cap-dantibes  03  [58, 42]  Villa Blanche    CAP D'ANTIBES
    bastide-du-ciel-gassin      02  [72, 50]  Bastide du Ciel  GASSIN
  link     ALL THE HOUSES → /estates

band
  estate   maison-du-chemin-saint-tropez, file 02, focal [50, 50]
  eyebrow  VIEWINGS
  title    In person, before ten.
  body     Viewings are private and held in the morning, when the light is level and the roads are empty.
  link     ARRANGE A VIEWING → /enquire
```

The portrait feature was `THE HOUSE / Held quietly / ABOUT THE HOUSE` over a front door. It becomes a house, because a villa photograph captioned "about the house" is what made the old Home feel unlinked from the houses. The House is still reached from the menu and the footer. Both feature bodies are the source `short` sentences, trimmed, so they stay true to the listings. The swap is a few words shorter than today's 116, so Home stays under 120; re-run `scripts/check-copy.mjs`.

`src/app/page.tsx`: the statement `Frame` reads `housePhoto(h.statementImage)` instead of `atmosphere.homeStatement`. `src/app/opengraph-image.tsx`: the inset photograph becomes the graded Mas Blanc 01 (`public/estates/mas-blanc-mougins/01.jpg`), same layout, so a shared link shows a house. `sailboat-beige-sea` is then no longer deployed: remove `homeStatement` from `src/data/atmosphere.ts` and from `AtmosphereSlot`, so the grade list and the colophon atmosphere table (which lists only files in `public/atmosphere`) drop it on their own. The file stays in `assets/originals` for the phase 2 journal.

### R2.5 Galleries

Format as in 7.1: hero first, then the sequence; each entry carries its own `frame`; portraits only in consecutive pairs (rendered as a diptych); `detail` is 4:5; `focal` is `[x%, y%]`; `extract` is `[left, top, width, height]` as fractions of the source, cut before the resize. Presets are the grade script's final set (`soft`, `standard`, `garden`, `strong`, `warm`, `interior`). `SKY` (the graduated sky pass) on every hero and on every deep blue exterior noted below; the cyan pass runs on every listing preset, which is how the pools in Oliviers 02, Arcades 06, Camille 03 and Blanche 02 and 03 must come out grey green (if a pool stays bright, add `tune: { saturation: 0.42 }` to that frame, not the preset). No two aerials in a row, no two details in a row, no kitchen or bathroom first or second, no television, no car, no person. Values marked "check" are estimates from the contact sheets: confirm them on `scripts/contact-sheet.mjs` and adjust by eye; do not change the frame choice.

One focal serves desktop and mobile (`Frame` has no mobile focal), so hero focals below were chosen to hold at 1.62 and at 4:5.

#### R2.5.1 New houses

**Bastide des Oliviers** (default `garden`; sources 1800px wide, served at 1800)
1. hero `01`, garden, focal 65/50, SKY. Alt "The bastide across its lawn, among old olives". At 1.62 the crop loses 9% of width, split 65/35 so the olives at left give way first; at 4:5 the 65 keeps the whole facade (rendered and checked at 66/50).
2. `02` wide, garden, focal 50/60, SKY (deep sky; the long pool must read grey green). Alt "The long pool, the pool house and the bastide"
3. `03` portrait, garden, focal 40/50. Alt "Vine pergola along the house"
4. `05` portrait, garden, focal 45/50, `extract: [0.1, 0, 0.8, 0.86]` (loses the sill and its debris at the bottom). Alt "The garden through an open shutter"
5. `08` detail, interior, focal 55/45, `tune: { pink: 0.6 }` (the pink flowers). The 4:5 crop at 55 keeps the two arched windows and leaves the lamp at left and the red objects at right outside; check. Alt "Arched windows in the vaulted salon"
6. `07` wide, garden, focal 50/50. Alt "The bastide and its pool from above"
Dropped: 04 (teal cushions, turquoise table, umbrellas), 06 (black pedestal chairs under a chandelier).

**Les Arcades** (default `standard`; the hero is slightly soft at 100%, so it takes `sharpen: 0.6`)
1. hero `02`, standard, focal 50/45, SKY, `tune: { sharpen: 0.6 }`. Alt "The path between cypresses to the ivy covered door". (Opus had 01 here with an extract; at 1.62 that extract cuts both wings, and 02 is the stronger frame. The Home card and the hero are the same photograph, as for Mas Blanc.)
2. `01` wide, standard, `extract: [0, 0.14, 1, 0.74]` (removes the empty upper sky and, below 88%, the car court and the solar panels; rendered and checked), focal 50/40, SKY. Alt "The white house among olives and pines, the sea beyond"
3. `07` portrait, standard, focal 45/50. Alt "Arched loggias above the yuccas"
4. `08` portrait, strong, focal 40/50. Alt "Pergola table facing the sea"
5. `06` detail, strong, focal 25/50 (the pine's crown sits left of centre; check that the whole crown is in). Alt "A single umbrella pine over the pool and the sea"
6. `03` wide, garden, focal 50/55. Alt "The house among the umbrella pines"
Dropped: 04 (a contrail, and it repeats 08), 05 (palm trunks cut the frame), 09 (printed eyes on the bedroom wall).

**Villa Camille** (default `strong`; the deep Riviera blue is this house's weakness, so SKY runs at full strength on every exterior)
1. hero `02`, strong, focal 50/52, SKY. Rendered at 1.62: chimneys to the foot of the stair, olive and bougainvillea at the edges, the sea at right; native portrait, so 4:5 is almost the whole frame. Alt "The villa among olives and bougainvillea, the sea at right"
2. `01` wide, strong, `extract: [0.1, 0.08, 0.9, 0.92]` (shrinks the palm frond at top left; rendered, a sliver remains; widen the top cut to 0.1 if it shows), focal 50/60, SKY. Alt "The forecourt facade and its curved stair"
3. `07` portrait, strong, focal 35/60, `tune: { pink: 0.6 }` (the red jug). Alt "Balustraded terrace over the open sea"
4. `03` portrait, strong, focal 62/40, SKY (keeps the diving board out on the left; the cyan pool takes the pass). Alt "The villa above its pool terrace"
5. `08` detail, strong, `extract: [0, 0.12, 0.5, 0.88]` (the bay, the cape with its small white villa and a yacht; the towers of Monaco fall outside), focal 50/50, SKY. Alt "The bay below the house"
6. `06` wide, strong, focal 50/60, SKY. Alt "The villa above Monaco and the coast" (the listing's own claim is the view over Monaco; this frame is that claim, and the owner likes a view after the house)
Dropped: 04 (the built up slope and neighbours), 05 (green wicker and the skyline), 09 and 10 (dated interiors with chandeliers and heavy drapes). No interior in this sequence; nothing in the brief requires one.

**Maison du Chemin** (default `garden`; the greens are lifted in every exterior)
1. hero `06`, garden, `extract: [0, 0.08, 0.74, 0.92]` (loses the loungers at right and the wire across the top; rendered and checked), focal 40/40, SKY. Alt "The second house across its lawn and pool, under old oaks". (Fable's hero; Opus had 02, which is a facade behind a tree, not the whole house. 02 is the Home band instead, so the house is seen twice.)
2. `02` wide, garden, focal 50/50. Alt "The facade behind an old tree, arched windows and agapanthus"
3. `04` portrait, garden, focal 30/50. Alt "Balcony and loggia under the vine"
4. `07` portrait, garden, focal 35/50. Alt "Table under the wisteria, the pool beyond"
5. `08` detail, interior, focal 45/50 (the stone stair and its iron rail only; the kitchen at left and the orange chair at right stay out; check). Alt "Stone stair and iron rail"
6. `05` wide, garden, `extract: [0.15, 0, 0.85, 1]` (drops the loungers at the left), focal 50/50. Alt "The long pool before the main house"
Dropped: 01 and 03 (wide angle, umbrellas and loungers fill the left third), 09 (bedroom with a thermostat and switches in frame), 10 (top down drone).

**Bastide du Ciel** (default `warm` for the ochre render, with the flat HDR treatment on every frame: `CIEL: Tune = { saturation: 0.42, linear: [0.88, 18], hue: 4, sharpen: 0 }`, adjusted on the sheet; the Bastide des Prés garden treatment is the model)
1. hero `02`, warm, focal 55/55, `{ ...CIEL, ...SKY }`. Alt "The ochre bastide between a cypress and a pine, the gulf beyond"
2. `03` wide, warm, focal 50/50. Alt "Vine pergola along the house"
3. `04` portrait, warm, focal 70/50. Alt "Shuttered courtyard"
4. `05` portrait, warm, focal 65/50. Alt "The glass veranda"
5. `01` wide, warm, focal 50/50, SKY. Alt "The house under a great umbrella pine"
6. `06` wide, warm, focal 50/50. Alt "The pool below the cypress"
7. `09` wide, strong, focal 50/50, SKY. Alt "The hills to the Gulf of Saint-Tropez" (a view, last, after six frames of the house)
Dropped: 07 and 08 (dated interiors; 08 has a television), 10 (loungers on gravel).

**Le Mas Rose** (default `standard`; already natural, so grade lightly; 04 `garden` for its lush greens)
1. hero `01`, standard, focal 50/50, SKY. Alt "The rose house above its green pool, among pines and cypress"
2. `04` wide, garden, focal 50/55, SKY. Alt "The house in the pines, the sea beyond"
3. `03` portrait, standard, focal 45/50. Alt "Under the reed pergola"
4. `07` portrait, interior, focal 20/50 (the French windows and the open door; the bed and its red crab cushions stay out; check). Alt "French windows open to the vines"
5. `05` detail, standard, focal 40/40. Alt "Two cypresses over the pool"
6. `06` wide, standard, focal 50/50. Alt "The long table under the pergola"
Dropped: 02 (repeats the hero, wide angle), 08 (loud blue rug, orange vases), 09 (feather wall hangings).

#### R2.5.2 Existing houses: new heroes where a better exterior exists

**Villa Blanche**: the hero moves from 05 (frontal colonnade) to **02** (the whole villa in the pines, pool in front).
1. hero `02`, strong, `extract: [0.16, 0.06, 0.84, 0.8]` (cuts the thatched pool bar off the left edge; rendered and checked, the extract is already close to 1.62), focal 50/50, `tune: { sky: 0.75 }` (as today's hero, so the cream facade is not lifted with the sky). Alt "The villa among the stone pines, its pool in front"
2. `01` wide, strong, focal 50/40. Alt "The villa among the pines from above"
3. `03` portrait, strong, focal 58/42. Alt "The lantern tower and balconies"
4. `10` portrait, strong, focal 50/45. Alt "Entrance stair under plane trees"
5. `05` wide, strong, today's `extract: [0.05, 0, 0.95, 0.9]` and `tune: { sky: 0.75 }`, focal 50/0. Alt "Cream Belle Époque facade"
6. `07` detail, strong, today's tune, focal 40/50. Alt "Stone wall beneath a single pine"
7. `04` wide, strong, focal 50/50. Alt "The sea through stone pines"

**Maison Édouard**: the hero moves from 02 (pool and sea) to **01** (the villa).
1. hero `01`, strong, `extract: [0.08, 0.14, 0.66, 0.62]`, focal 50/50, `tune: { ...NEUTRAL_SKY, ...SKY }`. Rendered: the villa with the larger cream house up the hill cut to a sliver at the top right corner and the neighbours' roofs at the far left; that is the honest frame of a town villa. The served file is about 1267px wide, so the hero upscales a little at 1440; widen the extract only if the cream house stays a sliver. Alt "The villa on the hillside above its pool"
2. `02` wide, strong, focal 62/50, `tune: NEUTRAL_SKY`. Alt "Olive tree beside an infinity pool and the sea" (the owner's view, now second)
3. `07` portrait, interior, as today
4. `12` portrait, strong, as today
5. `04` detail, interior, as today
6. `11` wide, strong, as today

**Mas Blanc**: hero `01` stays. The drone comes forward so the house is seen twice before the rooms, and the page no longer ends on a detail.
1. hero `01`, standard, focal 50/55, SKY (as today)
2. `02` wide, strong, today's `extract: [0, 0.22, 1, 0.78]`, focal 50/50. Alt "The pool from above"
3. `07` portrait, standard, as today
4. `05` portrait, interior, as today
5. `04` detail, interior, as today
6. `03` wide, interior, `extract: [0, 0, 0.7, 1]` (the dining room without the kitchen in its right third), focal 50/50, tune as Mas Blanc's other interiors (`blue: [0.02, 0.06, 0.925]`). Alt "Dining room open to the garden"

**Domaine des Vignes**: hero `01` stays. `04` (the drone of the main house, pool house and plunge pool under the pines) comes back as the second frame: it shows more house than any other frame of this set.
1. hero `01`, garden, as today
2. `04` wide, garden, focal 50/50, SKY. Alt "The house and pool house among the pines"
3. `05` wide, interior, as today
4. `06` portrait, interior, as today
5. `07` portrait, interior, as today
6. `03` wide, garden, as today

**Bastide des Prés**: unchanged (hero `11`). Its hero is served at up to about 1400px from a 1920 source, downscaled, within the "card size, not full bleed" caveat. Never on Home.

### R2.6 Grade summary for the new and changed frames

| House | Exterior default | Interiors | Sky pass | Per image |
|---|---|---|---|---|
| Bastide des Oliviers | `garden` | `interior` | hero, 02 | 05 extract; 08 pink .6 |
| Les Arcades | `standard` | none | hero, 01 | hero sharpen .6; 01 extract; 08, 06 `strong`; 03 `garden` |
| Villa Camille | `strong` | none | every exterior (hero, 01, 03, 06, 08) | 01, 08 extracts; 07 pink .6 |
| Maison du Chemin | `garden` | `interior` | hero | hero, 05 extracts |
| Bastide du Ciel | `warm` + CIEL on every frame | none | hero, 01, 09 | 09 `strong` |
| Le Mas Rose | `standard` | `interior` | hero, 04 | 04 `garden` |
| Villa Blanche (new hero 02, new 03) | `strong` | | hero sky .75 | hero extract |
| Maison Édouard (new hero 01) | `strong` | | NEUTRAL_SKY + SKY | hero extract |
| Mas Blanc 03 | | `interior` | | extract |
| Domaine des Vignes 04 | `garden` | | yes | |

Acceptance before any page is rebuilt (section 8, extended): one contact sheet of the eleven graded heroes in index order, and a second of the seven Home stills in page order, both with Mas Blanc 01 as the reference. Both must read as one shoot at one hour: every sky on the one warm grey, every pool green grey (not cyan), and the Oliviers, Ciel and Chemin lawns no greener than Domaine des Vignes. The known risks are the Villa Camille skies, the Oliviers pool (02) and the Bastide du Ciel HDR. If one frame stands out, tune that frame, not the preset.

### R2.6.1 Fix pass 1 (bosses' review of v2r0)

Galleries now run, where they changed (hero first):
- Bastide des Oliviers: 01, 07, 03 + 05, 08, 02. 07 takes saturation .32; 02 takes `extract: [0, 0, 1, 0.8]` and saturation .7.
- Les Arcades: 02, 03, 07 + 08, 06, 01. 01 takes `extract: [0.1, 0.14, 0.9, 0.74]` (a red car at the left edge).
- Villa Blanche: 02, 03 + 10, 05, 01, 07, 04. Home card 2 is Villa Blanche 02 at 52/50.
- Villa Camille: 02, 07 + 03, 08, 01. 06 is dropped (cars on the coast road and in a car park in every crop that keeps the villa). Every exterior takes NEUTRAL_SKY with SKY; 02 and 01 also lower the sky mask's luminance ramp (`skyLum`), so the slate sky is pulled to the warm grey. 01 takes `extract: [0.1, 0.18, 0.9, 0.82]`.
- Maison du Chemin: hero 06 `extract: [0, 0.08, 0.7, 0.68]`, focal 40/45; 05 `extract: [0.37, 0, 0.63, 1]`.
- Bastide du Ciel: CIEL is saturation .55, linear .95/8; hero 02 takes `extract: [0, 0, 1, 0.94]`.
- Le Mas Rose: 01, 03 + 07, 04, 05, 06.
- Maison Edouard: 02 takes saturation .42. Hero 01 unchanged: no extract makes the neighbour a sliver and keeps the right wing; first to cut, as R2.1 says.

### R2.6.2 Fix pass 2 (bosses' review of v2r1)

Binding over R2.4, R2.5 and R2.6.1 where they conflict.

- QA: `scripts/grade.mjs` now clears `.next/dev/cache/images` after every run. The dev image optimiser keys by url, width, quality and format and never revalidates on mtime, so the v2r1 captures showed ten frames in an old grade.
- Home: the film is `clamp(360px, 52vh, 480px)` tall on desktop (was about 600 at 1440 x 900) and square on phones (was 4:5). The Mas Blanc feature stacks at 5:4 on phones (was 1.62). Section spacing is unchanged.
- Home focals: statement Oliviers 01 at 65/40; Les Arcades 02 at 64/50 (the crop starts on the ivy and hedge, not on the neighbouring pavilion's arch; the cypress is the right edge); Villa Blanche 02 at 55/50; Bastide du Ciel 02 at 72/44.
- Grade: a local pool pass (`tune.pool`, a box where the cyan pass reaches deep blue, keeps 10% saturation and lifts the value a little) replaces the global saturation cuts. Villa Blanche 02 and 03 run on `standard` with cooler red and blue rows and the pool pass (no saturation .32). Bastide du Ciel runs on `standard` with CIEL at saturation .58, linear .95/6 and red `[.96, .07, .03]`, matched to Le Mas Rose 01. Oliviers 01 takes sharpen 0 and cooler rows. Villa Camille 02 takes a lower red row, no hue shift, brightness .97 and the sky pass at .9.
- Galleries (hero first):
  - Bastide des Oliviers: 01, 02, 03 + 05, 08 (07, the top down drone, dropped; 08 at 65/45).
  - Villa Blanche: 02, 03 + 10, 01, 07, 04 (05 dropped: the colonnade again). Hero 02 `extract: [0.16, 0.14, 0.75, 0.78]`, focal 50/60: the pool and the pines stay, the thatched bar goes, a small piece of the frond remains at top right because the porch's last column sits at .904.
  - Villa Camille: 02, 07 + 03, 04, 01. The detail is now the villa (04, cut to the house, its tower and terrace; a parked car behind the tower roof is cloned out), not the bay (08).
  - Maison du Chemin: 06, 04 + 07, 08, 02 (05 dropped: darker grade and a garden hose; 08 at 28/50).
  - Bastide du Ciel: 02, 03, 04 + 05, 01, 09 (06 dropped). Hero `extract: [0, 0.1, 1, 0.84]`, focal 55/50 (the mottled band at the top of the drone sky goes).
  - Domaine des Vignes: hero `extract: [0, 0, 1, 0.9]`, focal 50/30, pool pass.
  - Maison Édouard stays published and last, and is never on Home. The tight hero is replaced by the honest frame of the whole villa: `extract: [0.2, 0.22, 0.8, 0.66]`, focal 35/50 (the winter garden, garden and pool, the neighbour's lower floors behind). 08 (the corner of the villa and the winter garden over the pool) is added second, for the owner's "not enough photos of the house"; the view (02) closes the page: 01, 08, 07 + 12, 04, 11, 02. Still the first cut if the owner wants ten.
- QA in `docs/qa/v2r2/`: `sheet-heroes.jpg`, `sheet-home.jpg`, `sheet-ciel.jpg`, and every route at 1440 full, 1440 fold and 390 full.

### R2.7 Checks before calling it done

1. Home at 1440 and 390: seven stills, seven houses, every one a house exterior; no atmosphere photograph anywhere on Home; the OG image shows Mas Blanc.
2. /estates: eleven rows in the order of R2.1, no group headings, every row eyebrow `TOWN, REGION`, every row image a house.
3. Every estate page opens on the house; portraits only in pairs; no two aerials or two details in a row; 5 to 9 frames each, every one with focal and alt.
4. Particulars show the new AM numbers; Villa Camille reads `On request`; no `Built` row for Le Mas Rose or Bastide du Ciel.
5. `grep -rP '[\x{2013}\x{2014}]' src data docs/BRIEF.md` returns nothing; `scripts/check-copy.mjs` passes; Home is still under 120 words.
6. `npm run build` passes (`housePhoto()` throws on any Home slot missing from a published gallery); `/estates/<slug>` returns 200 for all eleven and 404 for the held slugs; the enquiry select lists eleven names plus `A house not shown here`; the colophon has a row for every folder in `public/estates` and every file in `public/atmosphere`; `public/` stays under 60 MB.
7. LCP is still the film poster; zero CLS.
8. Screenshots of Home, /estates and all eleven estate pages at 1440 and 390 go into `docs/qa/r4/`, with the hero sheet and the Home sheet from R2.6 beside them.
9. Nothing is pushed or deployed until the owner approves.

---


## Owner feedback, round 1 (Magnus, 2026-10-09). Overrides the sections below where they conflict.

Magnus viewed the first draft: "the feel is very luxurious, I like it". Keep the overall feel. Three changes:

1. **Home must show the villas.** Today the home page leans on atmosphere photos (sea, shutters, leaf shadow). Swap so the home page photography is mainly the houses themselves: a terrace, a facade among the pines, a pool above the sea, from the 9 published estates (graded). Keep at most one atmosphere image on Home, and none in the feature slots. Choose the calmest, widest house frames.
2. **Hero film is shorter.** Reduce the inset hero film on desktop from a full 16:9 to about 72vh tall (min 520px, max 760px), object-fit cover, still inset in the gutter. On mobile keep 4:5.
3. **Tighter vertical rhythm because the hero carries the drama.** Section spacing goes from clamp(80px, 10vw, 160px) to clamp(56px, 7vw, 112px). Linen bands go from 80px to 64px padding. The space between the hero and the first statement becomes about 96px on desktop. Keep it calm and generous, but no section should feel like an empty screen.

Also: the hero poster and film look soft. Re-encode from the highest-resolution source available (or pick a sharper free-licence clip), so the frame is crisp at 1440 width.

---

## 0. The site in one paragraph

A sheet of warm paper with photographs laid on it, at seven in the morning on the Côte d'Azur. One book serif for reading, one geometric sans for wayfinding and the wordmark, no accent colour, nothing moves on scroll, no hover zoom, square corners everywhere, every photograph inset on the paper like a print. Eleven houses between Roquebrune and the Saint-Tropez peninsula, each introduced by a place, a name, one sentence and a quiet line of particulars. Six routes. The home page carries 116 words of main content. The name is Aube'Mar.

---

## 1. Name and wordmark

- Name: **Aube'Mar**. French *aube* (dawn) and Occitan *mar* (sea). Said ohb-MAR.
- In data and code the apostrophe is straight (`Aube'Mar`, slug `aubemar`). When rendered it is always U+2019: `Aube’Mar`.
- Wordmark: live text, `AUBE’MAR`, **Jost 300**, uppercase, `letter-spacing: 0.34em`, colour ink. Wrap the apostrophe in `<span class="apos">’</span>` with `margin: 0 -0.2em; letter-spacing: 0` so it sits tight between E and M.
- Sizes: header 17px (15px compact, 15px mobile), footer 22px, gate page 24px, OG image 56px.
- The wordmark is never set over a photograph (see 5.1).
- Favicon `src/app/icon.png` (512) and `src/app/apple-icon.png` (180): `A’M` in Jost 400, ink on paper, no circle, no frame.
- Never: a symbol, monogram lock-up, tagline, macron, rule, crest, wave, gold, bold, serif setting of the name.
- Page title template `%s · Aube’Mar`, default `Aube’Mar`. Meta description: `A few houses on the Côte d'Azur, shown by appointment.`

Status: aubemar.com, .fr, .estate were unregistered on 2026-10-09. Nothing bought. A manual TMview and INPI search (classes 36 and 43) and an Instagram handle check are still owed before any public use. Reserve name: Mont'Avisio.

---

## 2. Brand idea

Aube'Mar sells the first hour of the day on the Côte d'Azur, and the nine houses that have it. Morning light in the grade, empty terraces instead of people, viewings before ten, copy that names the hour rather than the features, a site that never raises its voice.

---

## 3. Tokens

```css
:root {
  --chalk: #FBF9F5;  /* header once scrolled, menu drawer, enquiry panel, gate page */
  --paper: #F6F2EB;  /* page ground on every page; reversed text on the solid button */
  --linen: #EDE6DA;  /* the one deeper band per page, and the footer */
  --sand:  #E2D8C9;  /* image placeholders, ::selection */
  --hair:  #DCD4C7;  /* 1px rules */
  --stone: #B8AD9C;  /* input borders, outline rules; never text */
  --taupe: #8C8273;  /* credit lines and eyebrows at 11px caps only */
  --umber: #6B6258;  /* secondary text, spec lines, labels (5.4:1 on paper) */
  --ink:   #2A2622;  /* primary text, solid button fill, focus ring */
}
```

Rules:
- `#FFFFFF` and `#000000` appear nowhere. Text on the solid button is `--paper`.
- No accent colour. No gradients, no scrims.
- Focus ring: `outline: 1px solid var(--ink); outline-offset: 3px`.
- `::selection { background: var(--sand); color: var(--ink) }`.
- Tailwind 4: declare these on `:root`, then map them in `@theme inline` as `--color-chalk` etc.

---

## 4. Type

Two families via `next/font/google`, variables on `<html>`:

```ts
Newsreader({ subsets: ["latin"], style: ["normal","italic"], axes: ["opsz"], variable: "--font-serif", display: "swap" })  // variable font: no `weight` key, or next/font throws "Axes can only be defined for variable fonts when the weight property is nonexistent"
Jost({ subsets: ["latin"], weight: ["300","400"], variable: "--font-sans", display: "swap" })
```

Root 16px. `font-synthesis-weight: none`. Weight never exceeds 400. `text-wrap: balance` on headings, `text-wrap: pretty` on body.

| Token | Face | Desktop size/line | Mobile | Tracking | Case | Where |
|---|---|---|---|---|---|---|
| display | Newsreader 300 | 44/48 | 32/38 | 0 | sentence | H1 on Estates, estate name, The House, Enquire, Colophon |
| h2 | Newsreader 400 | 28/36 | 24/32 | 0.01em | sentence | section heads, feature titles, group headings |
| h3 | Newsreader 400 | 20/28 | 20/28 | 0.02em | sentence | card titles, row names |
| statement | Newsreader 300 | 30/40 | 24/34 | 0 | sentence | the one home page statement; one italic word allowed |
| lead | Newsreader 400 | 19/30 | 18/28 | 0.01em | | intros, centred, max 640px |
| body | Newsreader 400 | 17/28 | 17/28 | 0.01em | | prose, max 60ch |
| small | Newsreader 400 | 15/24 | 15/24 | 0.01em | | spec lines, prices, particulars, credits; `font-variant-numeric: lining-nums tabular-nums` |
| eyebrow | Jost 400 | 11/16 | 11/16 | 0.22em | UPPER | one per section at most; place names |
| nav | Jost 400 | 12/16 | 12/16 | 0.14em | UPPER | Menu, Enquire, footer heads |
| link | Jost 400 | 12/16 | 12/16 | 0.16em | UPPER | text CTAs; 1px underline 6px below baseline |
| label | Jost 400 | 11/16 | 11/16 | 0.12em | sentence | form labels |
| input | Newsreader 400 | 17 | 17 | 0 | | field text (at least 16px, no iOS zoom) |
| wordmark | Jost 300 | 17 | 15 | 0.34em | UPPER | |

Nothing a person must read is below 15px except eyebrows, labels and links. Headings on Home never exceed 30px. Prices never appear in a heading.

---

## 5. Layout system

- Container 1440px, gutter `clamp(16px, 1.7vw, 24px)`. On desktop every photograph stops at the gutter. On mobile only the home hero is edge to edge.
- Section spacing `clamp(80px, 10vw, 160px)`. Linen bands: 80px padding top and bottom.
- Inside a card: image to eyebrow 24px, eyebrow to title 20px, title to sentence 12px, sentence to link 40px.
- Column gap 37px for image rows, 48px for two-column text.
- Base unit 8px. Square corners. No shadows. No borders on images.
- Every image sits in a box with a fixed `aspect-ratio` and `background: var(--sand)`.
- Ratios: wide `1.62 / 1`, portrait `0.76 / 1`, pano `21 / 9`, detail `4 / 5`, hero film `16 / 9` desktop and `4 / 5` mobile.

### 5.1 Header

- 88px, sticky, compacts to 64px after 40px of scroll (height transition 400ms). No shadow. A 1px `--hair` bottom rule appears only when compact.
- Grid `1fr auto 1fr`. Left: two 1px hairlines (18px wide, 6px apart) and the word `MENU` in nav style. Centre: wordmark. Right: `ENQUIRE` in link style (underline on hover only).
- The header never sits over a photograph, on any page or breakpoint (the home hero is inset below it on desktop and starts below it on mobile). Ink text always. Before scroll the background is transparent on paper; once compact it is `--chalk` with the hairline. No colour swap, no cross-fade.
- Mobile: `MENU` left, wordmark centre, nothing right. No fixed bottom bar.

### 5.2 Menu drawer

- Chalk panel from the left, 480px (full width under 768px), `opacity 0 → 1` and `translateX(-16px → 0)` over 400ms; backdrop `rgba(42,38,34,.25)` fades 300ms.
- Items in Newsreader 400 at 26px, one per line: `Estates`, `The House`, `Enquire`.
- A hairline, then small: `Saint-Jean-Cap-Ferrat, by appointment.`
- Close: a hairline X, top right. Closes on route change (`open = openedOn === pathname`), Escape, backdrop click. Body scroll locked while open. `inert` on the closed panel.

### 5.3 Footer (linen)

Grid `1.4fr 1fr 1fr` on desktop, stacked on mobile.
- Column 1: wordmark 22px, then small `Houses on the Côte d'Azur, shown by appointment.`
- Column 2: eyebrow `ESTATES`, then the nine names in small, each a link.
- Column 3: eyebrow `HOUSE`, links `The House`, `Enquire`, `Colophon`.
- Bottom hairline, then Jost 12 at 0.02em sentence case: `© 2026 Aube’Mar. A case study by ClearScaler. The houses shown are listed by third parties; sources in the colophon.` with Colophon linked.
- No social glyphs, newsletter, phone, email or street address.

### 5.4 CTAs

Three kinds only: the underlined text link (default everywhere), the solid button (`Send` only: ink fill, paper text, 140 x 42, Jost 12 at 0.18em caps), and the gate's `Enter` (1px ink outline, same size). Never two CTAs in one block. No arrows, no icons.

---

## 6. Pages and copy

Routes:

```
/                 Home
/estates          Estates
/estates/[slug]   Estate (9 published)
/house            The House
/enquire          Enquire
/enquire/sent     Confirmation
/colophon         Colophon
not-found         404
```

All copy below is final and lives in `src/lib/copy.ts` and `src/data/*.ts`, never inline in components.

### 6.1 Home `/`

1. **Hero film.** `HeroFilm` component (section 9). Desktop: inset at the gutter, 16:9, 65px below the header. Mobile: edge to edge directly below the header, 4:5, `object-position: 50% 60%`. Poster `public/video/sea-surface-warm-dusk-poster.jpg`. Nothing written on it.
2. **Under the hero** (left aligned, 640px, 64px below the film):
   - eyebrow `CÔTE D'AZUR`
   - h2 `Houses between the hills and the sea.`
   - link `THE ESTATES` → `/estates`
3. **Feature pair** (grid `2.085fr 1fr`, gap 37px, both images 570px tall at 1440):
   - Left, wide: `/estates/les-pins-eze/01.jpg`, focal 50/40. Below: eyebrow `ÈZE BORD DE MER`, h3 `Les Pins`, body `A new house of stone and pale oak among old umbrella pines, above the sea.`, link `VIEW THE HOUSE` → `/estates/les-pins-eze`.
   - Right, portrait: `/atmosphere/pale-shutters-facade.jpg` (native portrait), focal 50/40. Below: eyebrow `THE HOUSE`, h3 `Held quietly`, body `A small number of houses each year, each shown at the hour it is at its best.`, link `ABOUT THE HOUSE` → `/house`.
4. **Statement**, centred, 680px: `The coast is loudest in August and quietest at seven in the morning. We prefer it then.` Then a 21:9 inset image `/atmosphere/sailboat-beige-sea.jpg`, focal 50/55 (keeps the horizon and the sail near the lower third; 50/35 drops them to the bottom edge).
5. **Estates row**: eyebrow `ESTATES` above three portraits (0.76:1, gap 37px). Each card is one link: image, then name in h3 on the left and the town in eyebrow style on the right of the same line.
   - `/estates/mas-blanc-mougins/01.jpg`, focal 50/55, `Mas Blanc`, `MOUGINS`
   - `/estates/maison-edouard-beaulieu/02.jpg`, focal 62/50, `Maison Édouard`, `BEAULIEU-SUR-MER`
   - `/estates/bastide-des-pres-chateauneuf/06.jpg`, focal 50/50, `Bastide des Prés`, `CHÂTEAUNEUF-GRASSE`
   - Below the row, right aligned link `ALL THE HOUSES` → `/estates`.
6. **Linen band**: image left (wide, `/atmosphere/leaf-shadow-wall.jpg`, native landscape, focal 50/50), text right in a 469px column, vertically centred:
   - eyebrow `VIEWINGS`
   - h2 `In person, before ten.`
   - body `Viewings are private and held in the morning, when the light is level and the roads are empty.`
   - link `ARRANGE A VIEWING` → `/enquire`
7. Footer.

### 6.2 Estates `/estates`

1. display `Estates`, left aligned. No hero image.
2. Two columns, gap 48px. Left, h2 at weight 300: `Eleven houses between Roquebrune and the Saint-Tropez peninsula.` (the number word comes from the data count). Right, lead: `Each is held on a private basis and shown by appointment. Prices are given where the seller allows; the others are available on request.`
3. Centred link `MAKE AN ENQUIRY` → `/enquire`.
4. Two groups, each with an h2 and a hairline beneath. No filter, no sort, no map, no count.
   - `Bord de mer`: Villa Cap Fleuri, Les Pins, Maison Édouard, Le Belvédère, Villa Blanche.
   - `Collines`: Mas Blanc, Bastide des Prés, Domaine des Vignes, Maison des Collines.
5. **Zigzag rows** (`EstateRow`): image 894 x 552 alternating left and right across the whole page (not per group), text column 469px top aligned, row min-height 635px desktop, stacked on mobile with the image first. The text column:
   - eyebrow: town in caps, for example `VILLEFRANCHE-SUR-MER`
   - h3: name
   - body: the `short` sentence
   - small: `{beds} bedrooms · {living} m² · {land} m² of land` (omit the land part when null) and on the next line `{price}` as `€9,900,000` or `Price on request`
   - pinned to the row bottom above a hairline: link `VIEW THE HOUSE`
6. Centred small `Other houses are offered privately.` and link `ENQUIRE`.
7. Footer.

### 6.3 Estate `/estates/[slug]`

No sub-nav, no tabs, no lightbox, no carousel, no map, no agent card, no similar properties grid.

1. **Opening image**: the hero, inset 1.62:1 on desktop, 4:5 on mobile via `object-position` from `focal`. Nothing written on it.
2. **Intro**, centred, 680px: eyebrow `{TOWN}, {REGION}` (for example `ÈZE, BORD DE MER`), display name, lead = `short`, then small spec line and price line as on the index, then link `ARRANGE A VIEWING` anchored to `#enquire`.
3. **Sequence** from `gallery` in order after the hero. Each entry carries its own `frame` exactly as listed in 7.1, never derived from position: `wide` (1.62:1, full container), `portrait` (0.76:1; two consecutive portraits always render side by side as a diptych, gap 37px; 7.1 only ever lists them in pairs), `detail` (4:5, 440px wide, centred, at least 8vw of paper either side). Images fade in on load. No captions.
4. **Prose**: the `long` paragraph in body, set in the right half of the container only (`grid-column: 2 / 3` of a two-column grid), the left half empty.
5. **Particulars** (linen band, h2 `Particulars`, a `dl` in two columns on desktop, terms in label style umber, values in small ink, hairline between rows). Rows, omitting any whose value is null:
   - `Reference` → `AM-0101`
   - `Type`
   - `Living area` → `400 m²`
   - `Land` → `1,300 m²` (omit for apartments)
   - `Bedrooms`
   - `Bathrooms`
   - `Built` → `2025`, or `About 1900` where the source gives c. 1900 (Villa Cap Fleuri, Maison Édouard; `built_approx: true`)
   - `Outlook` → the per-house string in the section 7 table
   - `Price` → `€9,900,000` or `On request`
   Nine rows at most, as decided (conductor decision 24). No `Fees` row (the fee split is not stated in our data) and no `Energy performance` row. Below the list, label `Features`, then each item of the `features` array on its own line in small, as written in data, no bullets, no commas joining them (several items already contain commas). Never invent an energy class, a bathroom count, a fee arrangement or a year.
6. **Enquiry** (`id="enquire"`, chalk panel inset in the page, form 640px wide): h2 `Arrange a viewing`, small `Tell us when you are on the coast. We answer personally.`, then the form from section 6.5 with `House` preselected and the message prefilled `I would like to arrange a viewing of {name}, ref. {reference}.`
7. **Next**: a hairline, then right aligned small `Next, {name}` linking to the next published estate in index order, wrapping at the end.
8. **Credit line**, small in taupe: `Photographs from the listing agency's public listing, shown for study. Sources in the colophon.`
9. Footer.

### 6.4 The House `/house`

1. display `The House`.
2. lead, centred 680px: `Aube’Mar is a small house of estate agents on the Côte d'Azur. We take on a few houses a year and show each one as it is.` (The earlier "most of them never advertised" contradicted the colophon, which says every house is publicly listed.)
3. Wide image `/atmosphere/stone-pine-solitary.jpg` (native landscape), focal 50/40.
4. Image left (portrait 0.76:1, `/atmosphere/limestone-vault.jpg`, native portrait, focal 50/35 so the rubble floor falls out of frame) and three titled blocks on the right (h3 plus body, 24px apart, no icons, no numbers):
   - `A few houses` / `Nine at present, between Cap-d'Ail and Ramatuelle. We would rather know each one well than list many.` (the number word comes from the data count)
   - `Seen early` / `Viewings are private and set for the morning. The coast is at its truest before the day fills.`
   - `Said plainly` / `No superlatives and no figures we cannot stand behind. The particulars are on every page.`
5. Floating detail 4:5: `/atmosphere/shutter-light-on-wall.jpg` (native portrait), focal 50/55.
6. Centred small `Saint-Jean-Cap-Ferrat, by appointment.` then link `ENQUIRE`.
7. Footer.

No portraits, names, founding year, "since", team grid or office photograph.

### 6.5 Enquire `/enquire` and `/enquire/sent`

1. display `Enquire`.
2. lead: `Write to us about a house, or about what you are looking for.`
3. Two columns on desktop (form 640px left, image right): the form, and `/atmosphere/boat-still-water-dawn.jpg` as a portrait (0.76:1) with no caption.

Form (`EnquiryForm`, a client component with a server action):
- Fields in order, label above each: `First name`, `Last name`, `Email`, `Telephone`, `Country of residence`, `House` (select: the nine names in index order, then `A house not shown here`; preselected from `?house=slug`), `Preferred dates` (optional), `Message` (optional, textarea).
- Input: 44px high, 1px `--stone` border turning `--ink` on focus, no fill, square, 12px padding, Newsreader 17. Textarea 5 rows.
- Checkbox (square, 14px, 1px stone border, ink when checked): `You may keep my details to reply to this enquiry.`
- Small below: `Your enquiry is held in confidence.`
- Solid button `SEND`.
- The server action validates (required: first name, last name, email, consent), stores nothing, sends nothing, and redirects to `/enquire/sent`. Wiring Resend later is a one-file change.

`/enquire/sent`: display `Thank you.`, lead `We will write back shortly.`, link `THE ESTATES`, and the image `/atmosphere/linen-curtain-backlit.jpg` wide.

### 6.6 Colophon `/colophon` (linked from the footer only)

1. display `Colophon`.
2. body: `Aube’Mar is a study in how a house of estates on the Côte d'Azur might present itself. It is not a licensed agency, holds no professional card or financial guarantee, and sells nothing. The houses shown are real and are listed by the agencies credited below; the photographs and particulars are drawn from their public listings and remain the property of those agencies. Atmosphere photography and film are from Unsplash and Pexels under their licences.`
3. h2 `Estates`: a table in small with columns `Our name`, `Reference`, `Town`, `Listed by`, `Agency reference`, `Listing`. Generated from `src/data/estates.ts`, published houses only. The `Listing` cell is a link reading `Source`.
4. h2 `Atmosphere`: table `File`, `Photographer`, `Source`, generated from `data/atmosphere.json` (only files that exist in `public/atmosphere` after the grade step) and `data/video.json`.
5. h2 `Type`: `Newsreader and Jost, from Google Fonts under the SIL Open Font License.`
6. Last line, small: `Made by ClearScaler.` with `ClearScaler` linking to `https://clearscaler.com`.

### 6.7 404

`/atmosphere/sheer-curtain-window.jpg` as a portrait, then h2 `This page is not here. The houses are.` and link `THE ESTATES`.

### 6.8 Gate page (served by `src/proxy.ts`)

Chalk ground, `/atmosphere/terrace-sea-pale-morning.jpg` at 40% opacity behind a centred chalk panel 400px wide. In the panel: wordmark at 24px, eyebrow `PRIVATE PREVIEW`, a password input styled as in 6.5, an outline button `ENTER`, and on failure small `Incorrect password.` Inline CSS only, with the two fonts loaded from Google Fonts by `<link>`. No black box.

---

## 7. Listings

Nine published, five held (`published: false`, kept in data and colophon so nothing is lost). Our references run in index order.

| Ref | Slug (new) | Source slug | Name | Town | Region | Price shown | Beds | Baths | Living | Land | Built | Outlook |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AM-0101 | villa-cap-fleuri | villa-cap-fleuri-cap-dail | Villa Cap Fleuri | Cap-d'Ail | mer | €12,700,000 | 7 | 5 | 390 | 1,600 | 1900 | Sea |
| AM-0102 | les-pins-eze | les-pins-eze-bord-de-mer | Les Pins | Èze | mer | €9,900,000 | 5 | 4 | 400 | 1,300 | 2025 | Sea |
| AM-0103 | maison-edouard-beaulieu | maison-edouard-beaulieu | Maison Édouard | Beaulieu-sur-Mer | mer | €15,000,000 | 4 | null | 240 | 530 | 1900 | Sea |
| AM-0104 | le-belvedere-nice | belvedere-cap-de-nice | Le Belvédère | Nice | mer | €13,500,000 | 5 | 5 | 477 | null | null | Sea |
| AM-0105 | villa-blanche-cap-dantibes | villa-blanche-cap-dantibes | Villa Blanche | Cap d'Antibes | mer | €19,000,000 | 7 | 7 | 631 | 2,345 | null | Garden and pines |
| AM-0106 | mas-blanc-mougins | mas-blanc-mougins | Mas Blanc | Mougins | collines | €5,900,000 | 6 | null | 400 | 4,495 | null | Hills and garden |
| AM-0107 | bastide-des-pres-chateauneuf | bastide-des-pres-chateauneuf | Bastide des Prés | Châteauneuf-Grasse | collines | €3,800,000 | 8 | 4 | 344 | 27,900 | 1850 | Meadow and garden |
| AM-0108 | domaine-des-vignes-saint-tropez | domaine-des-vignes-saint-tropez | Domaine des Vignes | Saint-Tropez | collines | Price on request (25,000,000 in data) | 8 | 7 | 412 | 11,479 | null | Garden and vines |
| AM-0109 | maison-des-collines-ramatuelle | maison-des-collines-ramatuelle | Maison des Collines | Ramatuelle | collines | €14,500,000 | 5 | 5 | 510 | 6,630 | null | Sea |

Held: domaine-des-cypres-cap-ferrat, bastide-de-la-rade-villefranche, villa-lerins-cannes, bastide-du-ciel-gassin, lattique-saint-tropez. Their photos are not graded and not deployed.

Rules:
- Price rule: a figure is shown below €20,000,000; at and above it the display is `Price on request` on the index and `On request` in Particulars. The real figure stays in data only (the colophon table has no price column).
- `type`, `short`, `long`, `features`, `source_url`, `source_agency`, `ref` come unchanged from `data/listings-*.json`, with one override: Mas Blanc's features item `Five bedrooms including a master suite with study and dressing room` is shown as `Master suite with study and dressing room`. The Zingraf source itself disagrees (JSON-LD `numberOfBedrooms: 6`, body text "five bedrooms"); we keep 6 from the structured field and drop the count from the feature so the page never contradicts itself. Region label strings: `mer` → `Bord de mer`, `collines` → `Collines`.
- `Outlook` is a per-house string (table above), not derived from `sea_view`: Cap d'Antibes has no hills, so Villa Blanche reads `Garden and pines`.
- Le Belvédère is an apartment: no `Land` row, `Type` reads `Penthouse duplex`.

### 7.1 Gallery per house (hero first, then sequence; everything else unused)

Paths are the served paths after the grade step (`/estates/<new slug>/NN.jpg`); every source file below was confirmed on disk under `public/listings/<source slug>/` on 2026-10-09. `focal` is `[x%, y%]` as CSS `object-position`. The word `wide`, `portrait` or `detail` on each line is that entry's `frame` and is stored in data (see 6.3). Grade preset per image; the house default is listed first.

**Villa Cap Fleuri** (default `standard`)
1. hero `01` focal 50/45, alt "White columned villa with a stone stair, facing the sea"
2. `03` wide, `strong`, focal 50/55, alt "Rocky shore below the garden"
3. `07` portrait, focal 40/50, alt "Villa steps beside the water"
4. `06` portrait, focal 20/50 (keeps the red chairs out), alt "Columned loggia over the bay"
5. `11` detail 4:5, focal 70/35 (shutters, not bougainvillea), alt "White facade and shutters"
6. `08` wide, focal 50/50, alt "Garden path to the rocks"
Dropped: 02, 04, 05, 09, 10, 12.

**Les Pins** (default `standard`; sea frames `strong`)
1. hero `01` `strong`, focal 50/40, alt "Umbrella pines over the sea"
2. `03` wide, focal 50/50, alt "Pool between timber louvres"
3. `06` portrait, focal 60/50, alt "Bedroom opening to pines and sea"
4. `05` portrait, focal 50/50, alt "Living room open to the garden"
5. `09` detail 4:5, focal 45/60, alt "Bath beneath a louvred window"
6. `11` wide, `strong`, focal 50/60, alt "The coast from above"
Dropped: 02, 04, 07, 08, 10.

**Maison Édouard** (default `standard`; 12 `strong`)
1. hero `02` focal 62/50, alt "Olive tree beside an infinity pool and the sea"
2. `01` wide, focal 50/50, alt "The villa on the hillside"
3. `07` portrait, focal 50/50, alt "Winter garden"
4. `12` portrait, `strong`, focal 40/50, alt "Pool and sea from the winter garden"
5. `04` detail 4:5, focal 20/50, alt "Salon window"
6. `11` wide, focal 50/50, alt "Pool along the garden wall"
Dropped: 03, 05, 06, 08, 09, 10.

**Le Belvédère** (default `strong`)
1. hero `01` focal 50/45, alt "Deck, one lounger, the horizon"
2. `06` wide, focal 50/50, alt "Sea through leaves"
3. `02` portrait, focal 50/50, alt "Pool edge and sea"
4. `08` portrait, focal 50/50, alt "Bedroom with a tall window"
5. `05` wide, focal 50/55, alt "Coastline from the terrace"
6. `07` wide, focal 50/50, alt "The residence from the deck"
Dropped: 03, 04, 09.

**Villa Blanche** (default `strong`)
1. hero `05` focal 50/40, alt "Cream Belle Époque facade" (a cyan pool runs along the bottom; `strong` must take it to grey green, check it in the section 8 contact sheet)
2. `01` wide, focal 50/40, alt "The villa among the pines from above"
3. `10` portrait, focal 50/45, alt "Entrance stair under plane trees"
4. `07` portrait, focal 40/50, alt "Stone wall beneath a single pine"
5. `04` wide, focal 50/50, alt "The sea through stone pines"
Dropped: 02, 03, 06, 08, 09 (09 is a gilded bedroom with a chandelier; replaced by 07).

**Mas Blanc** (default `standard`)
1. hero `01` focal 50/55, alt "White house above a reflecting pool"
2. `03` wide, focal 50/50, alt "Dining room open to the garden"
3. `05` portrait, focal 40/50 (crops out the wall TV on the right), alt "Bedroom with an arched window"
4. `07` portrait, focal 50/50, alt "Linen pergola"
5. `04` detail 4:5, focal 40/30, alt "Timber beams"
6. `02` wide, focal 50/50, alt "The pool from above"
Dropped: 06, 08.

**Bastide des Prés** (default `warm`)
1. hero `11` focal 50/50, alt "The farmhouse beyond the pond"
2. `06` wide, focal 50/50, alt "Stone front door"
3. `03` portrait, focal 50/50, alt "Sitting room"
4. `04` portrait, focal 50/50, alt "Bedroom in linen"
5. `08` detail 4:5, focal 50/50, alt "Stone basin"
6. `07` wide, focal 50/50, alt "Allée under the trees"
7. `10` portrait, focal 50/50, alt "Table under the plane tree"
8. `02` portrait, focal 50/50, alt "Shuttered facade"
9. `12` wide, focal 50/50, alt "The estate from above"
Dropped: 01, 05, 09.

**Domaine des Vignes** (default `standard`)
1. hero `02` focal 50/40, alt "Umbrella pines over the lawn"
2. `05` wide, focal 50/50, alt "Sitting room open to the garden"
3. `06` portrait, focal 50/50, alt "Beams and stone floor"
4. `07` portrait, focal 50/50, alt "Bedroom to the garden"
5. `03` wide, focal 50/50, alt "The house among the pines"
6. `01` wide, focal 50/50, alt "The pool"
Dropped: 04 (a second pool frame), 08, 09.

**Maison des Collines** (default `standard`; 01 `strong`)
1. hero `01` `strong` focal 50/50, alt "The house in the hills"
2. `05` wide, focal 50/50, alt "Living room open to the garden"
3. `06` portrait, focal 50/50, alt "Dining room"
4. `07` portrait, focal 75/50 (the bed sits right of centre), alt "Bedroom over the pool"
5. `09` detail 4:5, focal 30/50, alt "Facade and pool"
6. `10` wide, focal 50/40, alt "Pines to the distant sea"
Dropped: 02, 03, 04 (a second living room, which made four interiors in a row), 08.

### 7.2 Atmosphere assignment (graded `soft` unless noted)

| File | Slot |
|---|---|
| `sailboat-beige-sea` | Home 21:9, OG image |
| `pale-shutters-facade` | Home feature pair, portrait (2560 x 3840, native portrait) |
| `leaf-shadow-wall` | Home linen band, wide (2560 x 1709, native landscape) |
| `stone-pine-solitary` | The House wide (2560 x 1707) |
| `limestone-vault` | The House image left, portrait (2560 x 3413) |
| `shutter-light-on-wall` | The House floating detail 4:5 (2560 x 3413) |
| `boat-still-water-dawn` | Enquire portrait |
| `linen-curtain-backlit` | Enquire sent |
| `sheer-curtain-window` | 404 |
| `terrace-sea-pale-morning` | Gate page |
| All others, including `umbrella-pines-hillside-villa` (lilac sky, needs a hue fix) | Not deployed in v1 (reserved for the phase 2 journal, appendix A) |

Every slot now uses its file's native orientation. The merged draft had three mismatches (`shutter-light-on-wall` and `limestone-vault` are portraits set as wides, `stone-pine-solitary` is a landscape set as 4:5 with its canopy cut at both edges), fixed by the reassignment above.

### 7.3 Film

`sea-surface-warm-dusk.mp4` (1920 x 1080, 24 fps, 30.1 s) is the only moving image. Re-encode with ffmpeg: 1080p H.264 CRF 24 and 720p CRF 26 for under 768px, plus WebM VP9 for both; dissolve the loop join over 1 s; strip audio. Poster: `ffmpeg -ss 2 -frames:v 1`, graded like a `soft` photo, saved as `public/video/sea-surface-warm-dusk-poster.jpg`. The other three clips are not deployed.

---

## 8. Grade (one build step)

`scripts/grade.mjs` with `sharp`, run on `prebuild`. Reads `assets/originals/listings/<source slug>/NN.jpg` and `assets/originals/atmosphere/*.jpg`; writes only the files listed in 7.1 and 7.2 to `public/estates/<new slug>/NN.jpg` and `public/atmosphere/*.jpg`, 2400px long edge, JPEG quality 84 with mozjpeg. First move `public/listings` and `public/atmosphere` into `assets/originals/` (git-tracked, about 120 MB, no LFS). `next/image` serves AVIF and WebP from the JPEGs.

Presets (after `.rotate().resize({ width: 2400, withoutEnlargement: true })`):

| Preset | modulate | linear | recomb | gamma |
|---|---|---|---|---|
| `soft` | `{ saturation: .9, brightness: 1.02 }` | `(.95, 8)` | none | 1.0 |
| `standard` | `{ saturation: .78, brightness: 1.03, hue: -2 }` | `(.9, 16)` | `[[1.03,.02,-.01],[.01,.99,0],[-.02,.01,.93]]` | 1.04 |
| `strong` | `{ saturation: .68, brightness: 1.04, hue: -4 }` | `(.86, 22)` | same with blue row `[-.02,.01,.90]` | 1.06 |
| `warm` | `{ saturation: .88, brightness: 1.03 }` | `(.92, 14)` | none | 1.04 |

Then `sharpen({ sigma: .4 })`. A 3.5% monochrome grain tile is overlaid on the hero film only, in CSS, never on stills.

Acceptance test before any page is built: a contact sheet of graded `les-pins-eze/01`, `le-belvedere-nice/01`, `mas-blanc-mougins/01`, `villa-blanche-cap-dantibes/05` beside `sailboat-beige-sea` and `terrace-sea-pale-morning` must read as one shoot. Tune `standard` and `strong` until it does; record the final numbers in the script header.

---

## 9. Motion

- **Nothing moves on scroll.** No `Reveal` component. Text is always rendered at full opacity in place.
- Images: `opacity 0 → 1` over 600ms `ease-in-out` from the sand placeholder, on `onLoad`. That is the only entrance animation.
- Hero film: poster renders first with `fetchPriority="high"` and `preload` (it is the LCP). The video element is attached after `requestIdleCallback` (port `~/get-work-abroad/components/home/HeroVideo.tsx`): `autoPlay muted loop playsInline preload="none"`, 720p under 768px, WebM then MP4, skipped on `prefers-reduced-motion`, `navigator.connection.saveData` or `2g`/`3g`, retried once on first interaction if `play()` rejects. It cross-fades over the poster in 1500ms.
- Links and buttons: `color .4s, background-color .4s, border-color .4s`. Underlines appear on hover only.
- Header compaction 400ms; drawer 400ms; backdrop 300ms.
- Native scroll only; `data-scroll-behavior="smooth"` on `<html>` for anchors.
- Reduced motion: poster instead of film, image fades removed, drawer appears without sliding.

---

## 10. Banned

Any one of these on a page is a reason to reject the page.

Layout: stat cards, counters, "since", testimonials, star ratings, awards, press logos, badges or tags on photos ("Exclusive", "New", "Sold"), price tags, save icons, search or filter panels, maps, currency or unit switches, flags, language bars, pagination, result counts, carousels with dots or arrows, autoplay sliders, lightboxes, tabs, sticky bars, chat bubbles, newsletter pop-ups, cookie banners larger than one line, icon rows, rounded corners, drop shadows, decorative gradients, glassmorphism, pill buttons, arrows in buttons, two CTAs in one block.

Motion: hover zoom, card lift, parallax, Ken Burns, scroll reveals, marquees, pulsing dots, loaders, cursor followers, Lenis or any scroll library, page transitions, animated text.

Type and colour: Playfair, Fraunces, Cormorant, Cinzel, script faces, Inter, bold weights, caps serif headlines, gold or bronze, ornaments, any accent colour, pure black, pure white, headings over 44px anywhere or over 30px on Home, text on photographs.

Words: em dashes, en dashes, exclamation marks, emoji, "stunning", "breathtaking", "exclusive", "luxury living", "dream home", "don't miss", "unparalleled", "book a call", superlatives about ourselves, "you" commands in headings, prices in headings, invented energy classes, card numbers, guarantees, agent names or faces.

Photography: HDR skies, ungraded cyan pools, TVs, cars, people facing the camera, watermarks, wide-angle distortion, kitchens or bathrooms as lead or second images, blazing twilight, two aerials in a row, two details in a row.

---

## 11. Tech plan

### 11.1 Stack
- `create-next-app` with **next 16.2.11, react 19.2.4, tailwind 4** (CSS-first `@theme inline`), TypeScript 5, ESLint 9, `src/` layout, `@/` alias. Copy `AGENTS.md` and a `CLAUDE.md` containing `@AGENTS.md` from `~/get-work-abroad`. Read `node_modules/next/dist/docs/` before coding: Next 16 uses `proxy` not `middleware`, `preload` not `priority`, and `params` is a Promise.
- Dev script `next dev -p 3430`.
- Only extra dependency: `sharp` as a devDependency.

### 11.2 File structure

```
assets/originals/listings/<source slug>/NN.jpg   moved from public/listings, never served
assets/originals/atmosphere/*.jpg                 moved from public/atmosphere
assets/originals/video/*.mp4                      moved from public/video
data/listings-east.json, listings-west.json, atmosphere.json, video.json   unchanged source of truth
scripts/grade.mjs                                 section 8
scripts/encode-video.sh                           section 7.3; run once locally, its outputs in public/video are committed (not a build step)
scripts/check-copy.mjs                            fails the build on U+2013 or U+2014 in src/ and data/
public/estates/<slug>/NN.jpg                      graded, generated
public/atmosphere/*.jpg                           graded, generated
public/video/sea-surface-warm-dusk-{1080,720}.{mp4,webm}, sea-surface-warm-dusk-poster.jpg
public/grain.png                                  256px monochrome noise tile
src/app/layout.tsx                                fonts, metadata, skip link, data-scroll-behavior
src/app/page.tsx
src/app/estates/page.tsx
src/app/estates/[slug]/page.tsx                   generateStaticParams, generateMetadata, notFound
src/app/house/page.tsx
src/app/enquire/page.tsx, src/app/enquire/sent/page.tsx, src/app/enquire/actions.ts
src/app/colophon/page.tsx
src/app/not-found.tsx
src/app/opengraph-image.tsx                       1200 x 630 paper ground, wordmark 56px ink in the top band, sailboat-beige-sea inset below with 40px paper margins, no text on the photograph; Jost TTF fetched at build (port ~/structured-talent-demo/app/opengraph-image.tsx)
src/app/estates/[slug]/opengraph-image.tsx        the estate hero, no text
src/app/icon.png, src/app/apple-icon.png
src/app/robots.ts                                 disallow all; no sitemap
src/app/globals.css                               tokens, @theme inline, type classes, image frame, form, reduced motion
src/proxy.ts                                      password gate (11.4)
src/data/estates.ts                               the 14 houses typed, published flag, refs, region, outlook string, built_approx, features override, gallery per 7.1 as { file, frame, focal, grade, alt }
src/data/atmosphere.ts                            the 7.2 assignments with focal and alt
src/lib/estates.ts                                published(), bySlug(), next(slug), indexOrder, priceDisplay()
src/lib/copy.ts                                   every copy string from section 6
src/lib/site.ts                                   name, nav, office line, metadata base
src/components/Header.tsx                         base: ~/fotogenic-of-scotland-demo/src/components/Header.tsx, minus phone and button
src/components/Drawer.tsx
src/components/Footer.tsx
src/components/HeroFilm.tsx                       port of ~/get-work-abroad/components/home/HeroVideo.tsx
src/components/Frame.tsx                          aspect box, sand background, next/image, fade on load, focal → object-position
src/components/FeaturePair.tsx
src/components/EstateCards.tsx
src/components/Band.tsx                           linen band, image left text right
src/components/EstateRow.tsx                      zigzag row
src/components/Sequence.tsx                       wide / diptych / detail by position
src/components/Particulars.tsx                    dl
src/components/EnquiryForm.tsx                    client island; posts to the server action
src/components/Wordmark.tsx
```

### 11.3 next.config.ts

```ts
images: { formats: ["image/avif", "image/webp"], qualities: [75, 85, 90],
          deviceSizes: [640, 828, 1080, 1440, 1920, 2400], minimumCacheTTL: 31536000 },
async headers() { return [
  { source: "/video/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] } ]; }
```

Quality 90 on heroes, 85 elsewhere (`qualities` must be declared or Next 16 ignores them). `sizes`: `100vw` on heroes and wides, `(min-width:1024px) 66vw, 100vw` for the feature wide, `(min-width:1024px) 30vw, 100vw` for portraits, `(min-width:1024px) 440px, 100vw` for details. Eager loading only for the hero and the first row of each page.

### 11.4 Password gate
- `src/proxy.ts` exporting `proxy`, ported from `~/structured-talent-demo/middleware.ts` (keeps `opengraph-image` open so link previews work). Password `120226`, cookie `demo-auth`, 30 days, httpOnly, `secure` when `NODE_ENV === "production"`, 303 on success, the gate page (6.8) otherwise.
- Matcher: `['/((?!_next/static|_next/image|opengraph-image|icon|apple-icon|favicon\\.ico|.*\\..*).*)']`.
- `DEMO_GATE=off` disables it. Default on.
- Test the gate on a Vercel preview; the secure cookie will not stick on localhost.

### 11.5 Noindex: `metadata.robots = { index: false, follow: false }`, `robots.ts` disallow all, the `X-Robots-Tag` header. No sitemap. No JSON-LD.

### 11.6 Budgets: LCP under 2.0s on 4G on Home via the poster; Home JS under 350 KB; `public/` under 60 MB after the grade step; zero CLS from images.

### 11.7 Deploy
- `vercel whoami` must print the `magnus-clearscaler` account; stop otherwise. Never the `cleargroup-magnus` or `clearcruit` identity.
- `vercel --yes --prod` from the repo root, CLI only, no Git integration. Project `aubemar-demo`. Then `vercel alias set <deployment>.vercel.app aubemar-demo.vercel.app` and set `ssoProtection: null` so the gate, not Vercel, asks for the password.
- Commits: `PATH=/Applications/Xcode.app/Contents/Developer/usr/bin:$PATH git -c user.email=magnus@clearscaler.com -c user.name="Magnus Motzfeldt-Berge" commit ...`, pushed with `gh` as `magnus-ClearScaler` to `luxury.estates.demo`.
- Share the bare `aubemar-demo.vercel.app` URL with the password.

### 11.8 Build order
1. Move originals, write `grade.mjs`, run it, pass the acceptance test in section 8.
2. Encode the film and poster.
3. `src/data/estates.ts`, `atmosphere.ts`, `lib/*`, `copy.ts`.
4. `globals.css` tokens and type classes; `layout.tsx`; fonts.
5. Header, Drawer, Footer, gate.
6. Home.
7. Estates index.
8. Estate detail and Particulars.
9. Enquire, sent, server action.
10. The House.
11. Colophon, 404.
12. OG images, icons.
13. `check-copy.mjs`, home word count (under 120), Lighthouse on a preview, 390px pass, then production deploy and alias.

### 11.9 Checks before the first share
1. `grep -rP '[\x{2013}\x{2014}]' src data docs/BRIEF.md` returns nothing.
2. Rendered Home main content under 120 words.
3. LCP element is the poster image; no CLS.
4. Every published estate has 5 to 9 graded frames, each with a focal point and alt text.
5. The colophon has a row for every house folder in `public/estates` and every file in `public/atmosphere`.
8. No portrait appears without its diptych partner; no atmosphere slot crops against its file's native orientation.
6. The gate page renders in brand colours; `/opengraph-image` loads without the cookie.
7. No element in the banned list is present; no `#fff`, `#000`, `border-radius`, `box-shadow` or `font-weight: 500+` in the CSS.

---

## Appendix A: phase 2, the journal (not built in v1)

Route `/carnet`, three entries, 2-column 1:1 index. Reserved copy and images, final and dash free:

1. **Light on Stone** (`EARLY AUTUMN`). Standfirst: `How the limestone of the coast holds the day.` Images: `limestone-vault`, `limestone-arch-detail`, `shutter-light-on-wall`, `leaf-shadow-wall`, `pale-shutters-facade`. Body: `On this coast the houses are built from the hills behind them. Pale limestone, lime wash, old terracotta. In the morning the walls are cool and almost white. By late afternoon they have taken on the colour of bread, and they give the warmth back long after the sun has gone behind Cap Ferrat. Shutters stay half closed through the heat. A line of light moves across the floor, and the house keeps time by it.` Links to Mas Blanc.
2. **The Long Afternoon** (`LATE SUMMER`). Standfirst: `Lunch that becomes dinner, under the pines.` Images: `loggia-terrace-sea`, `olive-grove-table`, `pergola-long-table`, `linen-panels-leaf-shadow`, `umbrella-pines-hillside-villa`. Body: `The table is laid in the shade before anyone is hungry. Bread, tomatoes, a bottle from the hills above Ramatuelle. Nobody looks at the time. The cicadas stop, start again, stop. Someone goes down to swim and comes back with wet hair. The light turns gold, then pink, and the candles are lit without anyone deciding that the afternoon is over.` Links to Domaine des Vignes.
3. **The Sea, Early** (`ALL YEAR`). Standfirst: `The hour before the coast wakes up.` Images: `boat-still-water-dawn`, `sailboat-beige-sea`, `white-boat-still-water`, `cap-ferrat-lighthouse`, `wooden-boat-still-water`. Body: `Before seven the water is flat and pale, and the boats in the bay have not yet moved. From a terrace above the sea you can hear a single engine far out, and nothing else. This is the hour we show our houses in, when possible. Everything a house is, it is at this hour.` Links to Le Belvédère.

Article layout: display title left, full-width 1.62:1 images and 0.76:1 diptychs, body text in the right half only, one italic pull line per entry. `olive-grove-table` and `pergola-long-table` are not on the Riviera and carry no place caption.

---

## Sign-off (Opus boss, 2026-10-09)

Checked against the research notes, both direction files, the data JSON, the Zingraf source page for Mas Blanc, labelled contact sheets of every referenced frame, three frames of the hero film, and the installed `next/font` validator. Every referenced source image exists on disk (script check, zero missing). `grep -P` for U+2013 and U+2014 on this file returns nothing. Name confirmed: **Aube'Mar**.

Changes made:
1. **Fonts**: the Newsreader call passed `weight` together with `axes`, which `next/font` rejects at build. `weight` removed (variable font).
2. **Header over hero**: the brief asked for a paper wordmark over the hero, but the desktop hero is inset 65px below the header, so the wordmark would have been paper on paper. The header now never sits on a photograph; the scrim gradient, the colour swap and the wordmark cross fade are gone. This also honours the "text on photographs" ban.
3. **Atmosphere orientation**: three slots cropped against the file's native shape. Reassigned: `pale-shutters-facade` to the Home feature portrait, `leaf-shadow-wall` to the linen band, `stone-pine-solitary` to The House wide, `limestone-vault` to The House as a portrait, `shutter-light-on-wall` to The House detail. `umbrella-pines-hillside-villa` (lilac sky) is no longer deployed. Sailboat focal moved to 50/55.
4. **Sequence layout**: the positional rule (item 4 is always a detail) contradicted 7.1 for Le Belvédère, Villa Blanche, Domaine des Vignes and Maison des Collines, and would have left a lone portrait. Each gallery entry now carries an explicit `frame`, portraits always in pairs.
5. **Gallery fixes from the contact sheets**: Villa Blanche 09 (gilded bedroom, chandelier) replaced by 07 (stone wall, single pine). Domaine des Vignes 04 dropped (second pool). Maison des Collines 04 dropped (four interiors in a row). Focal changes to crop out a wall TV (Mas Blanc 05), red chairs (Cap Fleuri 06) and bougainvillea (Cap Fleuri 11), and to keep the bed in frame (Collines 07). Les Pins hero marked `strong`. Two alt texts corrected to what the frame shows (Édouard 12, Belvédère 08).
6. **Facts**: Home copy said Les Pins is "level with the sea"; it sits high above Èze Bord de Mer, now "above the sea". Home h2 said "by the sea" for a set that includes Mougins and Châteauneuf-Grasse; now `Houses between the hills and the sea.` Villa Blanche outlook "Hills and garden" is wrong for Cap d'Antibes; Outlook is now a per-house string. Built for the two c. 1900 villas reads `About 1900`. Mas Blanc's feature line no longer says "five bedrooms" beside a spec line of six.
7. **Invented claims removed**: the `Fees: Payable by the seller` row (not in our data) and the `Energy performance` row, bringing Particulars back to the nine rows of conductor decision 24. "Most of them never advertised" and "no staging" removed from The House, since the colophon says every house is publicly listed and the agency photos are staged.
8. **Colophon**: the price rule said the real figure appears in the colophon table, which has no price column. Now data only.
9. **Features**: joining the array with commas produced run-on lists (several items contain commas). Now one item per line.
10. **Word count**: Home main content counted at 116, under the 120 check. Two body lines tightened.
11. **OG image**: wordmark on paper above an inset photograph, not over it.
12. Small: encoded film outputs are committed rather than built; check 5 reworded to match the colophon tables; check 8 added for diptych pairing and native orientation.

Open risks:
- Trademark (TMview, INPI, classes 36 and 43) and the Instagram handle for AUBEMAR are still unchecked. Nothing is registered.
- The listing photographs belong to Côte d'Azur Sotheby's and Michaël Zingraf. They are credited and the site is gated and noindexed, but they must be swapped before any public or commercial use.
- Agency photography is bright, blue-sky HDR (Les Pins 01, Villa Blanche 05 with its cyan pool, Le Belvédère). If the section 8 contact sheet does not read as one shoot with the atmosphere set, the grade, not the brief, has to absorb it. Do not start page work until it passes.
- Bastide des Prés is priced at €3.8M, below the €4M floor the research set. It stays for its photography.
- `public/estates/<slug>/NN.jpg` shares the `/estates/` prefix with the `/estates/[slug]` route. There is no exact path collision, but if Next complains, move graded listings to `/photos/<slug>/`.
