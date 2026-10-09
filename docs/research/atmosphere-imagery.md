# Atmosphere imagery (non-property)

Manifest: `data/atmosphere.json` (30 entries: file, subject, mood, orientation, width, height, credit, photographer, photographer_url, source_url, licence).
Files: `public/atmosphere/*.jpg`, all 2560px wide (portraits up to 3840 tall), q85, about 39MB total. Run through next/image; do not ship the originals raw.
Videos: `public/video/*.mp4` plus manifest `data/video.json`. All are H.264 CRF 24, yuv420p, audio removed, faststart on, and each is under 15MB.

## Source and licence
- Every photo comes from Unsplash under the Unsplash License (free commercial use, attribution not required). Unsplash+ and premium images were filtered out at search time.
- Every video comes from Pexels under the Pexels License (free use, attribution not required).
- Credits are recorded anyway. A quiet "Photography credits" line in the footer or colophon fits the brand.
- Pexels photo search and the Unsplash napi both reject plain curl because of bot challenges. Search ran through the logged-in Chrome session, and the files were then fetched from the public CDNs (images.unsplash.com, videos.pexels.com).

## Selection rules applied
- Muted, warm, airy. The candidate pool was filtered by Unsplash average colour (saturation < 0.45, lightness > 0.3) and then curated by eye from contact sheets.
- No faces toward camera. No crowds, no beach-tourist colour, no lavender-field cliche, no Santorini blue domes.
- Subjects hit the brief: terrace sea, umbrella pines, limestone, linen in wind, olive grove, stone stairs, shutters in pale light, Cap Ferrat coast, wooden boat on still water, cypress, long table under a pergola, Villefranche at dusk.

## Suggested roles
| Role | Files |
|---|---|
| Hero / full-bleed opener | sailboat-beige-sea, terrace-sea-pale-morning (portrait / mobile), boat-still-water-dawn (portrait), eze-view-cap-ferrat |
| Place / "The Riviera" chapter | villefranche-bay-dusk, eze-view-cap-ferrat, cap-ferrat-lighthouse, cap-coastline-morning, umbrella-pines-hillside-villa, stone-arch-sea-view |
| Texture interludes (between listings) | limestone-vault, limestone-arch-detail, shutter-light-on-wall, leaf-shadow-wall, linen-curtain-backlit, linen-panels-leaf-shadow, sheer-curtain-window |
| Living / art de vivre | pergola-long-table, olive-grove-table, loggia-terrace-sea, white-stair-vine |
| Nature punctuation | stone-pine-solitary, olive-branch-white-wall, olive-branch-dusk, cypress-garrigue, pine-trunk-coastal-path |
| Water / stillness | white-boat-still-water, wooden-boat-still-water, boat-still-water-dawn |

The calmest set, closest to Aman's grade: sailboat-beige-sea, terrace-sea-pale-morning, boat-still-water-dawn, limestone-vault, shutter-light-on-wall, leaf-shadow-wall, olive-branch-white-wall, stone-pine-solitary, linen-curtain-backlit.

## Caveats
- Locations are taken from search context and the visible content, not from verified EXIF. Treat these as plausible but unverified: eze-view-cap-ferrat (Eze village looking toward Cap Ferrat), cap-ferrat-lighthouse, villefranche-bay-dusk, cap-coastline-morning (likely Cap d'Antibes), stone-arch-sea-view (Eze). Name them loosely on the site ("The coast, early") and do not caption them as specific addresses.
- pergola-long-table, stone-stair-village (Matera-like) and cypress-garrigue are not on the Riviera. Use them only as uncaptioned mood.
- Images that run warmer or more saturated: pines-over-cove (bright turquoise), villefranche-bay-dusk (golden), olive-branch-dusk. Apply the site's grade, for example a slight desaturate plus a warm overlay of `rgba(240,232,220,.08)`, so they sit with the rest.
- The house aesthetic rule (no em or en dashes) applies to captions. The subject strings in the JSON follow it.

## Video
| File | Source | Notes |
|---|---|---|
| sea-surface-warm-dusk.mp4 | Pexels 33251147, Mario Krimer, "Tranquil ocean waves at sunset", 30s, 1920x1080 24fps | Best hero loop: close, slow sea surface with beige and silver light. The original was 18MB; re-encoded with audio removed to 12MB. |
| sea-pale-horizon.mp4 | Pexels 4279371, Luis Adolfo Burgos, "Drone shot of a peaceful ocean", 15.5s, 2560 UHD source downscaled to 1920x1080, 11MB | Pale, misty, near-monochrome horizon. A good second option. |
| sea-overcast-calm.mp4 | Pexels 34727351, Marianna Sigov, "Calm sea under overcast sky", 22s, 1920x1080 30fps | Grey-white minimal horizon. The coolest of the set. |
| curtain-white-wind-vertical.mp4 | Pexels 7945783, Hanna Pad (@anna-nekrashevich), "Video of moving white curtain", 12s, 1080x2048 30fps | Portrait. Use it as a mobile hero or an interior interlude. |

Source pages: https://www.pexels.com/video/33251147/ , https://www.pexels.com/video/4279371/ , https://www.pexels.com/video/34727351/ , https://www.pexels.com/video/7945783/
No usable free umbrella-pine loop came up: Pexels pine results were dark forest or blue-sky tilts. To get one, generate it with image-to-video from stone-pine-solitary.jpg (Kling MCP is available) or shoot it.
Hero implementation: `<video autoplay muted loop playsinline preload="metadata" poster=...>`, with a still poster taken from the first frame, a 1.5 to 2s opacity fade-in, and `prefers-reduced-motion` falling back to the poster.
