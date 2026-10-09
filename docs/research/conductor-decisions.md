# Conductor decisions: merging direction-opus.md and direction-fable.md

Written 2026-10-09 by the Fable boss after re-reading both directions and re-checking every contact sheet (14 listings, 30 atmosphere frames) by eye. Rule applied wherever the two directions disagree: pick the calmer, more restrained, more Aman-true option. The result is `docs/BRIEF.md`.

Agreed without discussion (both directions): name Aube'Mar, U+2019 apostrophe as the only device, no accent colour, no pure black, square corners, images inset on paper, serif for reading and Jost for wayfinding, no Ken Burns, no hover zoom, no parallax, no Lenis, no stat cards, no badges, no map, no prices in headlines, "on request" for the top of the list, no invented DPE or legal data, password gate `120226` via `src/proxy.ts`, noindex in three layers, Next 16.2.11, dev port 3430, Vercel `magnus-clearscaler` CLI deploy, commit identity magnus@clearscaler.com.

| # | Question | Opus | Fable | Decision | Why (one line) |
|---|---|---|---|---|---|
| 1 | Wordmark face | Cormorant 500 caps | Jost 300 caps | **Jost 300 caps, 0.34em** | Aman's mark is a thin geometric sans; serif capitals read as wedding stationery. |
| 2 | Reading face | Cormorant Garamond | Newsreader | **Newsreader** | Lower contrast, book-like, closest free match to Aman's Lyon; Cormorant is calligraphic at size. |
| 3 | Favicon | A’M monogram, no frame | A’ on a paper disc | **A’M, ink on paper, no frame** | One fewer shape. |
| 4 | Pure white | Nowhere | Inside inputs only | **Nowhere** | The page is never white; inputs sit transparent on the chalk panel. |
| 5 | Routes | 7 incl. Carnet | 6, journal deferred | **6 routes, Carnet deferred to phase 2** | Fewer pages, same calm; the three essays are kept ready in the appendix. |
| 6 | Listings kept | 9 | 12 | **9** | Re-checked by eye: Cyprès (terracotta, HDR, mini golf), Rade (cyan pools, pink room), Ciel (ochre, dated) cannot be graded into the set. |
| 7 | Home hero | Full bleed 100svh video | Inset 16:9 on paper | **Inset on paper, 16:9 desktop, 4:5 edge to edge mobile** | Aman insets even the hero; the print on paper is the signature. |
| 8 | Text on hero | "CÔTE D'AZUR" label | Nothing | **Nothing** | Fewer words on photographs. |
| 9 | Mobile film | Same sea loop | Curtain clip | **Same sea loop** | One film on the whole site. |
| 10 | Featured house on Home | Mas Blanc 01 | Les Pins 01 | **Les Pins 01** | The name says sea; the first house shown must show the sea through pines. Mas Blanc leads the three cards instead. |
| 11 | Feature pair right card | Mas Blanc portrait | Atmosphere portrait + "The House" teaser | **leaf-shadow-wall + The House** | Mirrors Aman's "Own a piece / Featured residence" pair exactly. |
| 12 | Index filter | Client-side All/Mer/Collines | None, two groups | **None, two headed groups** | A filter is a control; two serif headings are not. |
| 13 | Index CTA | Underlined text link | Outline button | **Underlined text link** | Quieter; the only solid button on the site is Send. |
| 14 | Spec line | Jost caps | Small serif, lining numerals | **Small serif, two lines** | Fewer capitals; numbers read as prose. |
| 15 | Scroll reveals | Images only, opacity | None | **None** | Stillness is the brand; Aman has no scroll reveals. |
| 16 | Header scrolled | Paper, hairline when compact | Chalk 95% with blur | **Chalk, solid, hairline when compact** | No blur layer to tune. |
| 17 | Menu glyph | Two hairlines | Three hairlines | **Two hairlines** | Fewer lines. |
| 18 | Drawer contents | 4 items + office line | 4 items + estate index | **4 items + one office line** | No second list. |
| 19 | Offices | Antibes · Saint-Tropez | Saint-Jean-Cap-Ferrat | **Saint-Jean-Cap-Ferrat, by appointment** | One address line, no street. |
| 20 | Email on site | None | enquiries@aubemar.com | **None** | The domain is not owned; the form is the only channel. |
| 21 | About page | La Maison /maison | The House /house | **The House /house** | English site, English nav; avoids "The Houses / La Maison" confusion. |
| 22 | Inputs | Underline only | 1px border, white fill | **1px stone border, no fill** | Aman's bordered field without the white. |
| 23 | Credits page | /credits "Credits" | /colophon "Colophon" | **/colophon** | Editorial word, linked from the footer only. |
| 24 | Particulars rows | 11 rows | 10 rows incl. Risks | **9 rows, no Risks, no Mandate** | Shortest honest list. |
| 25 | Next house | 21:9 image block | Text line | **Text line** | No extra photograph after the form. |
| 26 | Price threshold | On request at 20M and above | Above 20M | **At 20M and above** | Same outcome on this set (Domaine des Vignes). |
| 27 | Vercel project | aubemar | aubemar-demo | **aubemar-demo** | Matches every other outreach demo URL. |
| 28 | Gate switch | Always on | `DEMO_GATE=off` env | **Env switch, default on** | Opening it later needs no code change. |

Hero choices re-checked by eye against both directions:
- Les Pins: 01 (pines over sea) over 03 (louvred pool). 03 goes second.
- Maison des Collines: 01 (house small in the long view) over 05. 10 closes.
- Villa Blanche: 05 (frontal facade) over 04 (sea through pines). 04 closes.
- Bastide des Prés: 11 (house beyond the pond) over 10 (table under plane tree). 10 stays in sequence.
- Le Belvédère: 01 (one lounger, horizon). Fable's 05 goes to the sequence.
- Maison Édouard: 02, both agreed. Fable's 04/05 salons dropped except 04 as a cropped detail.
