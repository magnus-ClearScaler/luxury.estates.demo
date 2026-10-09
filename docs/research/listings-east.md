# East Riviera listings: sourcing notes

Collected 2026-10-09. Data file: `data/listings-east.json` (7 listings). Photos: `public/listings/<slug>/01.jpg ...` (hero first), 9 to 12 per listing, all real JPEGs 1920 to 2278 px wide, about 35 MB total.

## Source decision

Checked agency by agency for the photography itself, not just access:

| Source | curl access | Watermark | Max size |
|---|---|---|---|
| Côte d'Azur Sotheby's (cotedazur-sothebysrealty.com) | yes | **none** | 1920 to 2278 px |
| Michaël Zingraf / Christie's | yes | MZ logo, centre, semi-transparent | 1920 webp |
| John Taylor | yes | large "JOHN TAYLOR" wordmark, centre, on every size (ori100, 1920x1080) | 1920 |
| Barnes | yes | large round "B" seal, centre | 1920 |
| Knight Frank, Savills | partial | not checked further | |
| JamesEdition, Lux-Residence | 403 | | |
| Belles Demeures, sothebysrealty.com | blocked / 202 empty | | |

All 7 chosen listings come from **Côte d'Azur Sotheby's** because it is the only source with clean, unwatermarked, high-resolution photos. Gallery URL pattern: `/datas/biens/images/<id>/<id>_NN-<date>.jpg`. The full listing inventory is in their `sitemap_N_en.xml` files.

## The seven

| Slug | Our name | Town | Type | Price | Ref |
|---|---|---|---|---|---|
| domaine-des-cypres-cap-ferrat | Domaine des Cyprès | Saint-Jean-Cap-Ferrat | Estate, two villas | €49.0M | CA8-677 ("La Phoenicienne") |
| bastide-de-la-rade-villefranche | Bastide de la Rade | Villefranche-sur-Mer | Stone bastide with tower | €15.5M | CA8-599 |
| maison-edouard-beaulieu | Maison Édouard | Beaulieu-sur-Mer | Belle Époque villa, c.1900 | €15.0M | CA8-684 |
| belvedere-cap-de-nice | Le Belvédère | Nice (Cap de Nice / Mont Boron) | Penthouse duplex | €13.5M | CA8-662 |
| villa-cap-fleuri-cap-dail | Villa Cap Fleuri | Cap-d'Ail | Waterfront villa, c.1900, to restore | €12.7M | CA7-926 |
| les-pins-eze-bord-de-mer | Les Pins | Èze | Contemporary villa, 2025 | €9.9M | CA7-1154 |
| bastide-des-pres-chateauneuf | Bastide des Prés | Châteauneuf-Grasse | Stone country bastide, 1850 | €3.8M | CA15-109 |

## Facts to know

- **Bastide des Prés** is €3.8M, just under the €4M floor. It was kept because it has the calmest stone and linen photography in the set. Its grounds are **meadow, plane trees, cypress and poplars, not olive groves**. The copy does not claim olives. Living area is 344 m² in the listing data, but the description says "over 430 sqm" for the main house. The JSON uses 344.
- **Villa Cap Fleuri** is sold as needing complete renovation. The copy says so. Its interiors are dated, so the gallery leans on the exterior, loggia and sea.
- **Domaine des Cyprès** has busy, colourful interiors. Only exteriors, aerials, the dining room with its view, and two quiet bedrooms were kept.
- **Le Belvédère** has strong art and colour in its living room. The gallery leads with the wooden deck and the sea.
- `baths` is null where the source gives no bathroom count (CA8-677, CA8-684). `year_built` is null where none is given.
- The Beaulieu text on the Sotheby's English page is in French. The facts were taken from it as written.
- All `long` copy is our own rewrite, 60 to 90 words, with no em or en dashes (checked by script). `short` is 20 words or fewer.

## Photo selection rules applied

Kept: stone, pale facades, pines and cypress, open sea, linen bedrooms, quiet terraces. Dropped: kitchens, gyms, saunas, wine walls, billiards, home cinemas, fish-eye stairwells, red or saturated rooms, and crowded marina shots.

## Reserves if one needs swapping (Sotheby's, unwatermarked)

- CA8-675 Cap-d'Ail Belle Époque hôtel particulier, €19.99M, newly renovated with white interiors. Exteriors are slightly HDR.
- CA7-458 Saint-Jean-Cap-Ferrat villa, €22.5M. Strongly HDR, only usable for aerials.
- CA8-687 Saint-Paul-de-Vence architect house, €12M. Partly under works.
- CA8-694 Saint-Jean-Cap-Ferrat duplex, €10M. These are CGI renders of a new development, so don't use them as real photos.
- CA8-629 Saint-Jean-Cap-Ferrat Provençal house, €15.8M. Rejected as heavy HDR with yellow interiors.

Watermarked but notable, if a clean copy turns up: John Taylor V1605SJ "La Ligne Droite", Saint-Jean-Cap-Ferrat, 1931, a listed historic monument, €15.5M (only 4 photos). Zingraf MZINC572 / John Taylor V2046SJ Nice historic villa on 6 ha with painted interiors, €11.75M.

## Caveat

These are third-party agency photos used for a non-commercial case study. Credit the source agency, or swap the images before any public or commercial use.
