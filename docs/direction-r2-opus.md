# Owner round 2: house-led Home, house-led index (Opus direction)

2026-10-09. Written for the builders. It is binding where it speaks and overrides BRIEF.md sections 6.1, 6.2, 7 and 7.1 where they conflict. Everything the owner already likes stays as it is: the paper, the palette, Newsreader and Jost, inset prints, square corners, the spacing from round 1, the hero film, and the copy voice. No em or en dashes anywhere in `src/` or `data/`.

## 0. What the owner said, and the rule it becomes

Magnus: the best houses are not on the first page; the first two houses on Home are not the best villas; Les Pins has few beautiful pictures of the house; Maison Édouard has an insane view but not enough photos of the house; link the front page to the best pictures of the houses; add more houses from online.

He is right on every count. Today's Home stills are Les Pins 01 (pines over the sea, no house), Villa Blanche 10 (a front door), Maison Édouard 02 (a pool and the sea, no house), Le Belvédère 01 (a deck, no house) and the sailboat. Only Mas Blanc 01 and Bastide des Prés 02 show a house. The first two houses in the index, Villa Cap Fleuri and Les Pins, rank 10th and 13th of 14 for house photography.

The rule from now on: **every still on Home is a whole house in its setting**, seen from outside, and every house that is published opens on the house itself. Views, rooms and details come after the house, never before it.

I looked at every frame of the 8 new folders on the contact sheets and rendered the candidate crops at their real slot ratios (scratchpad `r2dir/a.jpg` to `e.jpg`) before deciding. Where my call differs from `docs/research/photo-scores.md`, the reason is given.

## 1. The published set: eleven houses, in order of beauty

/estates becomes one sequence ordered by how beautiful the house is. **The two region groups (`Bord de mer`, `Collines`) and their h2 headings are removed from /estates**: grouping would put a weaker house above a stronger one, which is the owner's complaint. The region stays in data and still appears in the estate page eyebrow (`RAMATUELLE, BORD DE MER`). The zigzag rows, their sizes and the text column are unchanged.

References are renumbered in index order (brief 7: "our references run in index order").

| Ref | Slug | Name | Town | Region | Status | Why it sits here |
|---|---|---|---|---|---|---|
| AM-0101 | `mas-blanc-mougins` | Mas Blanc | Mougins | collines | published | The single best house photograph in all 22 folders (01). |
| AM-0102 | `bastide-des-oliviers-vence` | Bastide des Oliviers | Vence | collines | **new** | The 1751 bastide under ivy among old olives; the most romantic house in either batch. |
| AM-0103 | `les-arcades-ramatuelle` | Les Arcades | Ramatuelle | mer | **new** | White house, ivy, cypress, umbrella pines, the sea; the softest colour of the new batch. |
| AM-0104 | `villa-blanche-cap-dantibes` | Villa Blanche | Cap d'Antibes | mer | published | The archetypal Belle Époque villa in the pines, once it opens on 02. |
| AM-0105 | `villa-camille-roquebrune` | Villa Camille | Roquebrune-Cap-Martin | mer | **new** | Belle Époque villa of 1891 framed by olive and bougainvillea. |
| AM-0106 | `maison-du-chemin-saint-tropez` | Maison du Chemin | Saint-Tropez | collines | **new** | Seven true exteriors; calm facades behind old trees. New build, so below the old houses. |
| AM-0107 | `le-mas-rose-ramatuelle` | Le Mas Rose | Ramatuelle | collines | **new** | Rose house, sage shutters, a green (not cyan) pool; the most domestic and quiet. |
| AM-0108 | `bastide-du-ciel-gassin` | Bastide du Ciel | Gassin | collines | **published from held** | 02 is one of the five best frames in the whole set. |
| AM-0109 | `domaine-des-vignes-saint-tropez` | Domaine des Vignes | Saint-Tropez | collines | published | Calmest colour, but the house is small in every frame. |
| AM-0110 | `bastide-des-pres-chateauneuf` | Bastide des Prés | Châteauneuf-Grasse | collines | published | Lovely compositions, AI-textured at 100%; card size only, never Home. |
| AM-0111 | `maison-edouard-beaulieu` | Maison Édouard | Beaulieu-sur-Mer | mer | published, demoted | Kept for the view the owner likes, last, and now opening on its one house frame (01). First to cut if the owner wants ten. |

**Held** (`published: false`, `reference: null`; their gallery entries stay in `estates.ts` so nothing is lost; `grade.mjs` already skips unpublished houses, so their graded files and routes disappear):

- `les-pins-eze` (score 2): no exterior of the house at all.
- `le-belvedere-nice` (3): a penthouse; no villa in any frame.
- `villa-cap-fleuri` (5): tired facade, heavy HDR, no frame of the house in its setting.
- `maison-des-collines-ramatuelle` (6): contemporary, lawn-heavy; the peninsula is already well represented by five stronger houses. (A change from photo-scores.md, which left it published. Ramatuelle, Gassin and Saint-Tropez would otherwise be six of twelve.)
- Not published from the new batch: `la-pinede-ramatuelle` (heaviest HDR, 1990s kidney pool with waterfall), `maison-du-cap-roquebrune` (built-up neighbours, artificial lawn), `la-pergola-beaulieu` (no frame shows the whole house; the Maison Édouard problem again). Add them to `own` as held with empty galleries, like the existing held houses.
- Still held: `domaine-des-cypres-cap-ferrat`, `bastide-de-la-rade-villefranche`, `villa-lerins-cannes`, `lattique-saint-tropez`.

Prices: Bastide des Oliviers (€3,300,000) is below the €4M floor; it stays on the Bastide des Prés reasoning (photography first). Villa Camille (€29,500,000) is above €20M, so it reads `Price on request` / `On request`; Les Arcades (€19,500,000) shows its figure.

## 2. Data wiring for the new houses

- `src/data/estates.ts` imports `data/listings-new-east.json` and `data/listings-new-west.json` alongside the two existing files (same `with { type: "json" }` attribute). Bastide du Ciel is already in `listings-east.json` or `listings-west.json`.
- `type`, `short`, `long`, `features`, `source_url`, `source_agency`, `ref`, beds, baths, areas, year and price come unchanged from the JSON. Do not invent a bathroom count for Maison du Cap (held anyway).
- Per-house fields we own:

| Slug | region | outlook | builtApprox |
|---|---|---|---|
| `bastide-des-oliviers-vence` | collines | `Garden and countryside` (the listing says countryside view) | false (1751) |
| `les-arcades-ramatuelle` | mer | `Sea` | false |
| `villa-camille-roquebrune` | mer | `Sea` | false (1891) |
| `maison-du-chemin-saint-tropez` | collines | `Garden` | false |
| `le-mas-rose-ramatuelle` | collines | `Garden and vineyards` | false |
| `bastide-du-ciel-gassin` | collines | `Hills and sea` | false |

- Remove `indexFrame` from Le Belvédère (held). No published house needs an `indexFrame` now, because every hero is a house.
- `src/lib/estates.ts`: `groups()` is no longer used by /estates; render `published()` in order. Keep `regionLabel` for the estate eyebrow.

## 3. Copy changes (existing voice, no dashes)

| Where | Was | Now |
|---|---|---|
| `copy.estates.intro` | `{N} houses between Cap-d'Ail and Ramatuelle.` | `{N} houses between Roquebrune and the Saint-Tropez peninsula.` |
| `copy.house.blocks[0].body` | `{N} at present, between Cap-d'Ail and Ramatuelle. We would rather know each one well than list many.` | `{N} at present, between Roquebrune and the Saint-Tropez peninsula. We would rather know each one well than list many.` |
| /estates nowrap helper | keeps `Cap-d'Ail` on one line | keeps `Saint-Tropez` on one line |

Why: Cap-d'Ail is no longer an end of the range. Villa Camille in Roquebrune is the eastern end, and Gassin and Ramatuelle are both on the Saint-Tropez peninsula, so "the Saint-Tropez peninsula" stays true whichever of them is furthest west. `{N}` stays data-driven (`Eleven`).

The footer and the enquiry form's house select already read `published()`, so they pick up the new eleven in order. The footer `ESTATES` column grows from 9 to 11 lines, which is fine.

## 4. Home: every still is a house

Seven stills, seven different houses, all exteriors, the best seven houses. The hero film, the intro line, the statement sentence, the band text and the structure all stay. The sailboat comes off Home.

| Slot | Ratio at 1440 | House and frame | Focal (desktop / mobile) | Notes |
|---|---|---|---|---|
| Feature pair, wide | 1.6065 | **Mas Blanc 01** | 50/55 | The pool reflection must stay in frame: never crop it from the bottom. |
| Feature pair, portrait | 0.7705 | **Villa Camille 02** | 45/50 | Native portrait; the olive branch at the top and the bougainvillea at the right edge are the point of the frame. Keep both. |
| Statement image | 21:9 (mobile `wide`) | **Bastide des Oliviers 01** | 50/35 (mobile 62/50) | Replaces `sailboat-beige-sea`. The whole ivy facade, the old olives, the lawn and the hills; the 21:9 crop removes surplus lawn. Rendered and checked. |
| Estates row, card 1 | 0.76 | **Les Arcades 02** | 50/50 | Straight up the axis: the path, the hedges, the cypresses and the arched ivy door, perfectly centred. |
| Estates row, card 2 | 0.76 | **Villa Blanche 03** | 58/42 | The lantern tower and the balconies. Focal 58 keeps the thatched pool bar out on the left; the pool corner bottom left takes the cyan pass. |
| Estates row, card 3 | 0.76 | **Le Mas Rose 01** | 47/50 | The rose house, sage shutters and green pool under the pines. |
| Linen band | 1.62 | **Maison du Chemin 02** | 50/50 | The facade behind the old tree, arched steel windows, agapanthus. Dappled light that suits "In person, before ten". |

Card copy (`copy.home`):

- `featureWide`: estate `mas-blanc-mougins`, file `01`, focal `[50, 55]`. Eyebrow `MOUGINS`. Title `Mas Blanc`. Body `A white house of stone, lime and old wood above a long green pool.` Link `VIEW THE HOUSE` → `/estates/mas-blanc-mougins`.
- `featurePortrait`: **this becomes a house card, not The House card.** Estate `villa-camille-roquebrune`, file `02`, focal `[45, 50]`. Eyebrow `ROQUEBRUNE-CAP-MARTIN`. Title `Villa Camille`. Body `A Belle Époque villa of 1891 among olives and bougainvillea, above the sea.` Link `VIEW THE HOUSE` → `/estates/villa-camille-roquebrune`. ("Held quietly" goes: putting a villa photograph above a line about the agency is what made the old Home feel unlinked from the houses. The House is still in the menu and the footer.)
- `statement` text unchanged. The image becomes an estate photograph: add a `statementImage: { estate: "bastide-des-oliviers-vence", file: "01", focal: [50, 35] }` slot in `copy.home`, render it with `housePhoto()` in `src/app/page.tsx`, `ratio="pano"`, `mobileRatio="wide"`, mobile focal 62/50 (pass a separate mobile focal if `Frame` supports one; otherwise 55/40 serves both).
- `estatesRow.cards`, in this order (two Ramatuelle cards never side by side):
  1. `{ slug: "les-arcades-ramatuelle", file: "02", focal: [50, 50], name: "Les Arcades", town: "RAMATUELLE" }`
  2. `{ slug: "villa-blanche-cap-dantibes", file: "03", focal: [58, 42], name: "Villa Blanche", town: "CAP D'ANTIBES" }`
  3. `{ slug: "le-mas-rose-ramatuelle", file: "01", focal: [47, 50], name: "Le Mas Rose", town: "RAMATUELLE" }`
- `band`: estate `maison-du-chemin-saint-tropez`, file `02`, focal `[50, 50]`. Text unchanged (`VIEWINGS`, `In person, before ten.`, body, `ARRANGE A VIEWING`).

`housePhoto()` throws if a file is not in a published gallery. Villa Blanche 03 is now in its gallery (section 5), so all seven resolve.

Word count: the portrait card loses about 6 words and the wide card about 3, so Home stays under 120. Re-run `scripts/check-copy.mjs`.

OG image (`src/app/opengraph-image.tsx`): switch from the sailboat to the graded Mas Blanc 01 (`/estates/mas-blanc-mougins/01.jpg`), same layout. A shared link should show a house too. `sailboat-beige-sea` is then no longer deployed: drop it from the atmosphere grade list and from the colophon atmosphere table if that table lists only deployed files.

## 5. Galleries

Frames as in brief 7.1: `wide` 1.62, `portrait` 0.76 (always in consecutive pairs, rendered as a diptych), `detail` 4:5. No two aerials in a row, no two details in a row, no kitchen or bathroom first or second. Every hero takes `tune: SKY` (the graduated sky pass), and every listing preset runs the cyan pass, which is how the pools in Oliviers 02, Arcades 06, Camille 03 and Blanche 02 and 03 must come out grey green. `extract` is `[left, top, width, height]` as fractions of the source. Values marked "check" are my estimate from the sheets: confirm them on the `scripts/contact-sheet.mjs` output and adjust by eye. Do not change the frame choice.

### 5.1 New houses

**Bastide des Oliviers** (default `garden`; sources are 1800px wide)
1. hero `01` garden, focal 60/50 (mobile 4:5 at 66/50 was rendered and holds the whole facade), SKY. Alt "The bastide across its lawn, among old olives"
2. `02` wide, garden, focal 50/60, alt "The long pool before the pool house and the bastide" (the cyan pool must read grey green; if the pass leaves it bright, add `tune: { saturation: 0.42 }`)
3. `03` portrait, garden, focal 40/50, alt "Vine pergola along the house"
4. `05` portrait, garden, focal 45/50, alt "The garden through an open shutter"
5. `08` detail, interior, focal 55/45, `tune: { pink: 0.6 }` for the pink flowers, alt "Arched windows in the vaulted salon"
6. `07` wide, garden, focal 50/50, alt "The bastide and its pool from above"
Dropped: 04 (teal cushions), 06 (black tulip chairs under a chandelier).

**Les Arcades** (default `standard`)
1. hero `01` standard, `extract: [0, 0.14, 1, 0.74]` (removes the empty upper sky and, below 88%, the car court and the solar panels; check that neither shows), focal 50/40, SKY. Alt "The white house among olives and cypress, the sea beyond"
2. `02` wide, standard, focal 50/35, alt "Cypress path to the ivy door"
3. `07` portrait, standard, focal 35/50, alt "Arched loggias above the yuccas"
4. `08` portrait, strong, focal 40/50, alt "Pergola table facing the sea"
5. `06` detail, strong, focal 35/50, alt "A single umbrella pine over the pool and the sea"
6. `03` wide, garden, focal 50/55, alt "The house among the umbrella pines"
Dropped: 04 (contrails, and it repeats 08), 05 (palms cut the frame), 09 (pink eye artwork).

**Villa Camille** (default `strong`; the deep Riviera blue is this house's weakness, so the sky pass runs at full strength on every exterior)
1. hero `02` strong, focal 50/52 (rendered at 1.62: chimneys to the foot of the stair, olive and bougainvillea at the edges, the sea at right), SKY. Alt "The villa among olives and bougainvillea"
2. `01` wide, strong, `extract: [0.1, 0.08, 0.9, 0.92]` (shrinks the palm frond at top left; check), focal 50/60, SKY. Alt "The forecourt facade and its curved stair"
3. `07` portrait, strong, focal 35/60, `tune: { pink: 0.6 }` for the red jug, alt "Balustraded terrace over the open sea"
4. `03` portrait, strong, focal 62/40 (keeps the diving board out on the left), alt "The villa above its pool terrace"
5. `06` wide, strong, focal 50/60, alt "The villa above Monaco and the coast"
Dropped: 04 (shows the built-up slope), 05 and 08 (Monaco towers fill the frame), 09 and 10 (dated interiors with heavy drapes).

**Maison du Chemin** (default `garden`; the greens are lifted in the source)
1. hero `02` garden, focal 50/50, SKY. Alt "The house behind an old tree, with arched windows and agapanthus"
2. `06` wide, garden, `extract: [0, 0.08, 0.74, 0.92]` (loses the loungers at right and the wire across the top; check), focal 40/40, alt "The second house across its lawn and pool"
3. `04` portrait, garden, focal 30/50, alt "Balcony and loggia under the vine"
4. `07` portrait, garden, focal 35/50, alt "Table under the wisteria"
5. `08` detail, interior, focal 45/50 (the stone stair and its iron rail only; the orange chair at right stays out), alt "Stone stair and iron rail"
6. `05` wide, garden, focal 50/50, alt "The long pool before the main house"
Dropped: 01 and 03 (wide-angle), 09 (bedroom with a thermostat and switches in frame), 10 (top-down aerial).

**Le Mas Rose** (default `standard`; already natural, so grade lightly)
1. hero `01` standard, focal 50/50, SKY. Alt "The rose house above its green pool, among pines and cypress"
2. `04` wide, garden, focal 50/60, alt "The house in the pines, the sea beyond"
3. `03` portrait, standard, focal 45/50, alt "Under the reed pergola"
4. `07` portrait, interior, focal 20/50 (window and open door; the red crab cushions stay out), alt "Bedroom open to the vines"
5. `05` detail, standard, focal 40/40, alt "Two cypresses over the pool"
6. `06` wide, standard, focal 50/50, alt "The long table under the pergola"
Dropped: 02 (repeats the hero, wide-angle), 08 (loud blue rug), 09 (feather wall hangings).

**Bastide du Ciel** (default `warm` for the ochre render; its flat HDR takes the Bastide garden treatment: `tune: { saturation: 0.42, linear: [0.88, 18], hue: 4, sharpen: 0 }` on every frame, adjusted on the sheet)
1. hero `02` warm, focal 55/55, SKY. Alt "The ochre bastide between a cypress and a pine, the gulf beyond"
2. `03` wide, warm, focal 50/50, alt "Vine pergola along the house"
3. `04` portrait, warm, focal 70/50, alt "Shuttered courtyard"
4. `05` portrait, warm, focal 65/50, alt "The glass veranda"
5. `01` wide, warm, focal 50/50, alt "The house under a great umbrella pine"
6. `06` wide, warm, focal 50/50, alt "The pool below the house"
7. `09` wide, strong, focal 50/50, alt "The hills to the Gulf of Saint-Tropez"
Dropped: 07 and 08 (dated interiors, and 08 has a television), 10 (loungers on gravel).

### 5.2 Existing houses: new heroes where a better exterior exists

**Villa Blanche**: the hero moves from 05 (frontal colonnade) to **02** (the whole villa in the pines).
1. hero `02` strong, `extract: [0.16, 0.06, 0.84, 0.8]` (cuts the thatched pool bar off the left edge; rendered and checked), focal 50/50 (mobile 45/50), SKY. Alt "The villa among the stone pines, its pool in front"
2. `01` wide, strong, focal 50/40, alt "The villa among the pines from above"
3. `03` portrait, strong, focal 58/42, alt "The lantern tower and balconies"
4. `10` portrait, strong, focal 50/45, alt "Entrance stair under plane trees"
5. `05` wide, strong, keep today's `extract: [0.05, 0, 0.95, 0.9]` and `tune: { sky: 0.75 }`, focal 50/0, alt "Cream Belle Époque facade"
6. `07` detail, strong, keep today's tune, focal 40/50, alt "Stone wall beneath a single pine"
7. `04` wide, strong, focal 50/50, alt "The sea through stone pines"

**Maison Édouard**: the hero moves from 02 (pool and sea) to **01** (the villa).
1. hero `01` strong, `tune: { ...NEUTRAL_SKY, ...SKY }`, with a wider extract than today's so the hero is not upscaled too far: start at `[0.08, 0.14, 0.66, 0.62]` and widen or narrow until the larger cream house up the hill is no more than a sliver at the right edge. Alt "The villa on the hillside above its pool"
2. `02` wide, strong, focal 62/50, `tune: NEUTRAL_SKY`, alt "Olive tree beside an infinity pool and the sea"
3. `07` portrait, interior, as today
4. `12` portrait, strong, as today
5. `04` detail, interior, as today
6. `11` wide, strong, as today

**Unchanged**: Mas Blanc (hero 01), Bastide des Prés (hero 11), Domaine des Vignes (hero 01).

## 6. Grade summary for new frames

| House | Default | Exceptions |
|---|---|---|
| Bastide des Oliviers | `garden` | 08 `interior` + pink .6; all heroes SKY |
| Les Arcades | `standard` | 08, 06 `strong`; 03 `garden` |
| Villa Camille | `strong` | 07 pink .6; 01 also SKY |
| Maison du Chemin | `garden` | 08 `interior` |
| Le Mas Rose | `standard` | 04 `garden`; 07 `interior` |
| Bastide du Ciel | `warm` + flat-HDR tune | 09 `strong` |
| Villa Blanche (new hero 02, new 03) | `strong` | as before |
| Maison Édouard (new hero 01) | `strong` | NEUTRAL_SKY + SKY |

After grading, run `scripts/contact-sheet.mjs` over all eleven heroes and the seven Home frames and check them side by side with Mas Blanc 01 as the reference. Every sky should land on the one warm grey, every pool should read green grey (not cyan), and the Oliviers, Ciel and Chemin lawns should not be greener than Domaine des Vignes. If one frame stands out, tune that frame, not the preset.

## 7. Checks before calling it done

1. Home at 1440 and 390: seven stills, seven houses, every one a house exterior; no atmosphere photograph anywhere on Home.
2. /estates: eleven rows in the order of section 1, no group headings, every row image a house.
3. Every estate page opens on the house; portraits only in pairs; no two aerials or two details in a row.
4. Particulars show the new AM numbers; Villa Camille reads `On request`.
5. `grep -P "[\x{2013}\x{2014}]" -r src data` returns nothing; `scripts/check-copy.mjs` passes; Home is still under 120 words.
6. `npm run build` passes (`housePhoto()` throws on any Home slot missing from a published gallery).
7. Screenshots of Home, /estates and the six new estate pages at 1440 and 390 go into `docs/qa/` for the owner.
8. Nothing is pushed or deployed until the owner approves.
