# West Riviera listings (case study set)

Data: `data/listings-west.json` (7 entries). Photos: `public/listings/<slug>/NN.jpg`, hero first, all real JPEG, 1919 to 2278 px wide, 8 to 10 per listing, ~47 MB total. Collected 2026-10-09.

| Slug | Town | Price | Source | Ref | Photos |
|---|---|---|---|---|---|
| domaine-des-vignes-saint-tropez | Saint-Tropez (La Moutte) | €25,000,000 | Michaël Zingraf (also Sotheby's CA9-1121) | MZIST1709 | 9 |
| mas-blanc-mougins | Mougins | €5,900,000 | Michaël Zingraf | MZIMO2530 | 8 |
| maison-des-collines-ramatuelle | Ramatuelle | €14,500,000 | Côte d'Azur Sotheby's (also Zingraf MZIST1810) | CA9-1113 | 10 |
| bastide-du-ciel-gassin | Gassin | €5,800,000 | Côte d'Azur Sotheby's | CA9-1088 | 10 |
| villa-blanche-cap-dantibes | Cap d'Antibes (Domaine de la Garoupe) | €19,000,000 | Côte d'Azur Sotheby's (also Zingraf MZICP833) | CA6-2630 | 10 |
| villa-lerins-cannes | Cannes (La Californie) | €25,000,000 | Côte d'Azur Sotheby's | CA6-1909 | 9 |
| lattique-saint-tropez | Saint-Tropez (penthouse) | €4,500,000 | Côte d'Azur Sotheby's (also Zingraf MZIST1975) | CA9-1138 | 9 |

## Sourcing findings
- Michaël Zingraf (michaelzingraf.com): server rendered, clean JSON-LD (RealEstateListing + Offer + SingleFamilyResidence with price, beds, m2, land, image list). Full images at `michaelzingraf.pro/storage/properties/full/<id>.webp`, 1920 px. **Cannes, Cap d'Antibes and Palm Beach office photos carry a visible "MICHAËL ZINGRAF CHRISTIE'S" watermark**; Saint-Tropez and Mougins office photos are clean. Only clean ones used.
- Côte d'Azur Sotheby's (sothebysrealty-france.com): server rendered, sitemaps list every ref (`sitemap_*_en.xml`). Full images at `/datas/biens/images/<id>/<id>_NN-<date>.jpg`, unwatermarked, 1920 to 2278 px. Best clean source for Cannes and Cap d'Antibes. Many listings are co-listed with Zingraf under different refs.
- Barnes (barnes-international.com, FR pages): server rendered, 1920 px originals, but **every photo has a centred "B" watermark**. Not used.
- John Taylor: listings loaded by JS (no server HTML). Lux-Residence and JamesEdition return 403 to curl. Belles Demeures and Daniel Féau did not resolve via curl. Knight Frank not explored further.

## Fact notes and caveats
- Domaine des Vignes: Zingraf gives no living area; 412 m2 comes from the Sotheby's co-listing of the same La Moutte estate (240 m2 + 172 m2 houses). Baths = 7 from Zingraf text (1 bathroom + 6 shower rooms).
- Maison des Collines: Sotheby's spec field says 510 m2, the body text says "more than 630 sqm". JSON uses 510.
- Villa Lérins: 925 m2 is total built area (main villa about 565 m2 plus pool house, guest house, caretaker flat).
- Villa Blanche: source view field says "on park", so `sea_view` false even though one upper photo shows the sea. Bastide du Ciel is sold "to renovate".
- L'Attique: 130 m2 penthouse, renovated 2024, sold furnished. Source does not state sea view; one photo shows the gulf. Interiors include bold blue art; those frames were left out.
- `year_built` is null for all seven: no source states it.
- Photo curation rejected: watermarked frames, garish teal and red furniture, gyms, saunas, wine cellars, dusk HDR shots and the renderings (MZIST1727 Escalet and the MZIIN1291 Croisette penthouse are mostly CGI).
- Titles are our own names. Short and long copy is rewritten, with no em or en dashes. Hyphens appear only inside place names.

## Runners up (clean photos, if a swap is needed)
MZIST1846 / CA9-1010 Ramatuelle €19.5M (umbrella pine over the sea), MZIST1813 Saint-Tropez €12.7M, MZIMO2635 Mougins €6.5M, MZIMO3028 near Mougins €5.95M, CA9-1007 Saint-Tropez €15.6M, CA6-2831 Cap d'Antibes €9.95M.
