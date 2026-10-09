# Craft sweep of the owner's demo sites

Scope: 22 folders in `~` (21 Next.js demos plus `gohere-nordic-landing`, a static HTML build). Also checked `get-work-abroad` and `omnimundi-demo` because they hold the best motion and video code. Read: package.json, layout, globals.css, next.config, middleware, the hero, gallery and header components.

---

## 1. Standard stack

| Item | Value | Notes |
|---|---|---|
| next | `16.2.6` (19 demos), `16.2.11` (structured-talent, get-work-abroad) | Use **16.2.11** (newest in use) |
| react / react-dom | `19.2.4` | identical everywhere |
| tailwindcss + @tailwindcss/postcss | `^4` | CSS-first config, `@import "tailwindcss";` + `@theme` |
| typescript | `^5` | |
| eslint / eslint-config-next | `^9` / matches next | `next lint` is gone in 16, run `eslint` |
| Extra deps | none in most demos | structured-talent: `geist`; GWA: `@vercel/analytics`, `@vercel/speed-insights` |
| Outlier | `strakstjenester-website` is Next `^15.5.20`, React 19.1.1, `sharp`, `resend` | don't copy from it |

Layout: two conventions coexist, root `app/` + `components/` + `lib/` (klokken, coluccis, hos) or `src/app` + `src/components` + `src/lib` (fotogenic, premier, leon). Both use the `@/` alias. **Recommend `src/`** (fotogenic/premier/leon, the most refined ones).

Every Next 16 demo has `AGENTS.md` (pulled in by `CLAUDE.md` as `@AGENTS.md`):
```
# This is NOT the Next.js you know
This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
```
Copy that pair into the new repo.

Content lives in a typed data file (`src/lib/site.ts`: `site`, `navLinks`, collections typed `as const`). Fotogenic splits big image lists into `src/lib/galleries.ts` keyed by slug. Use the same pattern for `listings.ts` (property records) and `galleries.ts` (image arrays per property).

---

## 2. Shared password gate (pw `120226`)

Byte-identical in 19 repos (md5 `2c6355e4…`): e.g. `~/fotogenic-of-scotland-demo/src/middleware.ts`, `~/coluccis-jewelers-demo/middleware.ts`. `~/structured-talent-demo/middleware.ts` is the one improved variant: it leaves `opengraph-image` open so link previews still render in WhatsApp/iMessage. **Port the structured-talent variant.** (Memory calls it "Basic Auth", but it is really a cookie form gate, not HTTP Basic.)

```ts
import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = '120226';
const COOKIE = 'demo-auth';

function gate(error: boolean) {
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Preview</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Inter",system-ui,sans-serif;background:#0a0a0a;color:#fafafa;min-height:100vh;display:grid;place-items:center;padding:1.5rem}
  form{width:100%;max-width:340px}
  label{display:block;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:.75rem}
  input{width:100%;padding:.85rem 1rem;background:#0a0a0a;border:1px solid #2a2a2a;color:#fafafa;font-size:1rem;font-family:inherit}
  input:focus{outline:none;border-color:#fafafa}
  button{width:100%;margin-top:.75rem;padding:.85rem;background:#fafafa;color:#0a0a0a;border:0;font-weight:500;font-size:.95rem;cursor:pointer;font-family:inherit}
  .err{color:#ff7b7b;font-size:.85rem;margin-top:.75rem;min-height:1.2em}
</style>
</head>
<body>
<form method="POST">
  <label for="p">Password</label>
  <input id="p" name="p" type="password" autofocus required>
  <button type="submit">Continue</button>
  <div class="err">${error ? 'Incorrect password.' : ''}</div>
</form>
</body>
</html>`;
  return new NextResponse(body, {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function middleware(req: NextRequest) {
  if (req.cookies.get(COOKIE)?.value === PASSWORD) {
    return NextResponse.next();
  }
  if (req.method === 'POST') {
    const form = await req.formData();
    if (form.get('p') === PASSWORD) {
      const url = new URL(req.nextUrl.pathname + req.nextUrl.search, req.url);
      const res = NextResponse.redirect(url, 303);
      res.cookies.set(COOKIE, PASSWORD, {
        path: '/', httpOnly: true, sameSite: 'lax', secure: true,
        maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    }
    return gate(true);
  }
  return gate(false);
}

export const config = {
  /* opengraph-image is left open so link previews still render when the
     gated demo URL is shared in a message. */
  matcher: ['/((?!_next/static|_next/image|opengraph-image|favicon\\.ico|.*\\..*).*)'],
};
```

Port notes:
- **Next 16 deprecates `middleware.ts`.** Upgrade guide (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` §"middleware to proxy"): rename the file to `proxy.ts` and the export to `export async function proxy(req)`. The proxy runs on nodejs, and nothing in this gate needs edge. All existing demos still use the deprecated name; do it properly in the new repo.
- Re-theme the gate page for the brand: off-white `#f7f4ee` background, ink text, serif label. It is the first thing a prospect sees, and every demo so far shows a black box.
- `burkhardt-demo` has the file at both `middleware.ts` and `src/middleware.ts` (a leftover). Keep exactly one.
- `.*\\..*` excludes every path with a dot, so `/images/*.jpg` in `public/` is never gated. That is fine for this use.

---

## 3. Image handling

### Configs seen
- Most demos: empty `next.config.ts`, local JPGs in `public/`.
- Remote: `images.remotePatterns` for `images.unsplash.com` plus the client's own host (fotogenic: `fotogenicofscotland.co.uk`, central-auto: `centralautobody.net`, burkhardt: `cdn.prod.website-files.com`, roots: `static.wixstatic.com` with `pathname: "/media/**"`).
- Best config is `~/get-work-abroad/next.config.ts`:
```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  minimumCacheTTL: 60 * 60 * 24 * 365,
},
async headers() {
  return [{ source: "/video/:path*",
    headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
},
```

### Bug to avoid (found in fotogenic)
Fotogenic passes `quality={92}`, `{90}`, `{80}`, `{78}` with no `images.qualities` config. In Next 16, `qualities` defaults to `[75]` and is required for anything else (`image.md` §qualities), so every one of those values was ignored. Only `roots-fitness-clearscaler` gets this right (`qualities: [60, 75, 85]`). For a photo-first luxury site, declare:
```ts
images: {
  formats: ["image/avif", "image/webp"],
  qualities: [70, 80, 90],
  deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
  minimumCacheTTL: 31536000,
  remotePatterns: [ /* listing CDNs only if we hotlink; prefer local */ ],
},
```
Use `quality={90}` on full-bleed heroes and 80 on grids.

### Sourcing pattern
Fotogenic hotlinks hundreds of WordPress upload URLs from the real site (`src/lib/galleries.ts`). That is fast to build but fragile, and it ties the demo to the third-party host. Coluccis, premier and klokken download into `public/images|gallery|photos/` (150 to 900 KB JPGs, no preprocessing). **For the estates site, download the listing photos into `public/estates/<slug>/NN.jpg`.** next/image then handles AVIF/WebP and sizing. Pre-resize originals to max 2560px long edge so the repo stays small (klokken's public dir is 9.2 MB for 4 photos plus a menu).

### `sizes` discipline (fotogenic does it best)
- Full-bleed: `fill priority sizes="100vw"`
- 3-up grid: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"`, `loading={idx < 3 ? "eager" : "lazy"}`
- Gallery: `sizes="(max-width: 768px) 50vw, 360px"`
- Always wrap images in an aspect-ratio box (`relative aspect-[2/3]` etc.) with a placeholder background colour so nothing shifts during load.

---

## 4. Best photo-led hero and gallery patterns

Ranking for this brief: **fotogenic > premier > GWA (video) > coluccis > klokken**. Klokken and coluccis are the weakest references for "quiet": klokken has rounded-full wine pill CTAs, `rounded-[28px]` cards and a hero paragraph plus icon row; coluccis has Playfair plus a script font, a four-cell stat strip ("Established 1959 / Daily / Always / Authorized") and a floating award badge in the hero. Those are the exact patterns the owner's feedback rejects. Take nothing from their layouts.

### 4a. Fotogenic full-bleed hero (`~/fotogenic-of-scotland-demo/src/components/Hero.tsx`)
`h-[100svh] min-h-[640px]`, image `fill priority sizes="100vw" object-cover slow-zoom`, a soft vertical scrim `bg-gradient-to-b from-ink/25 via-transparent to-ink/55`, type anchored bottom-left (`flex items-end pb-20 lg:pb-28`), a tiny tracked eyebrow, a light-weight serif display line and a single underline text link. **The base for the estates hero.** For the estates version: cut the copy to one line or none, make the eyebrow a place name ("Cap Ferrat"), and use a scrim of 15 to 35% at most so the image stays bright and airy.

### 4b. Fotogenic image band (`IntroStatement.tsx`)
A large centred serif sentence, then a `aspect-[16/9] lg:aspect-[21/9]` wide image in a `max-w-[1400px]` container. This is the Aman rhythm: one sentence, one landscape, lots of air (`py-28 lg:py-40`). Reuse it as the main "pause" section.

### 4c. Fotogenic collection grid (`FeaturedGallery.tsx`)
A 1/2/3-column grid of portrait `aspect-[2/3]` cards. Under each card, the title in serif on the left and the location in tiny tracked caps on the right (`flex items-baseline justify-between`). No card chrome, no borders, no buttons. **This becomes the listings index card**: villa name left; commune and price (e.g. "Saint-Jean-Cap-Ferrat · €18,500,000" or "Price on request") right.

### 4d. Fotogenic rhythmic gallery (`WeddingGallery.tsx`)
A cycling aspect array gives editorial variety without a masonry library:
```tsx
const aspects = ["aspect-[3/2]","aspect-[2/3]","aspect-[4/5]","aspect-[3/2]","aspect-[5/4]","aspect-[2/3]"];
// grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5, each cell `image-frame ${aspect} relative` + <Image fill>
```
Use it on the property detail page. For more calm, try a 1-up / 2-up alternating sequence (full-width landscape, then two portraits side by side).

### 4e. Fotogenic detail route (`src/app/weddings/[slug]/page.tsx`)
`generateStaticParams` from the data file, `generateMetadata` with `params: Promise<Params>` (await it, Next 16), OG image from the record's hero, `notFound()`, and a "next" link that wraps around (`(idx + 1) % length`). The property page should follow this exactly.

### 4f. Premier `PageHero` (`~/premier-photography-demo/src/components/page-hero.tsx`)
A reusable inner-page hero with `height: "default" | "tall" | "compact"` (`min-h-[58vh] md:min-h-[72vh]` etc.) and `align`. A good API to port for the inner pages (Maison, Journal, Contact).

### 4g. GWA background video hero (`~/get-work-abroad/components/home/HeroVideo.tsx`)
The most robust hero code in the portfolio:
- Poster through next/image `priority` is the LCP, and it stays visible if the video never loads.
- The video `preload="none"` is fetched only after `requestIdleCallback` (2.5 s timeout).
- 720p on mobile, 1080p on desktop; WebM (VP9) first, then MP4.
- Skipped under `prefers-reduced-motion`, `saveData`, and 2g/3g.
- If autoplay is refused, it retries on the first pointerdown/touchstart/keydown/scroll.
- Files live in `public/video/` with immutable cache headers (section 3).
Port this as-is for an optional slow coastline or terrace clip in the Aman manner. `Hero.tsx` pulls the section under the transparent header with `-mt-[4.5rem]`.

### 4h. Scroll reveal (`~/get-work-abroad/components/Reveal.tsx`, same in omnimundi)
IntersectionObserver, one-shot, 14px rise, 700ms `cubic-bezier(0.16,1,0.3,1)`, `rootMargin: "0px 0px -12% 0px"`, used below the fold only (so the LCP is never held at opacity 0). Under reduced motion, CSS forces `.reveal{opacity:1!important;transform:none!important}`. **Port verbatim.** For Aman-like calm, slow it to 1000 to 1200ms and drop the rise to 8px.

---

## 5. Motion and micro-detail CSS worth porting (from fotogenic `src/app/globals.css`)

```css
@keyframes slowZoom { from { transform: scale(1.02); } to { transform: scale(1.08); } }
.slow-zoom { animation: slowZoom 18s ease-out forwards; }

@keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
.fade-up { animation: fadeUp .9s cubic-bezier(0.2,0.7,0.1,1) both; }
.fade-up-1{animation-delay:.1s} .fade-up-2{animation-delay:.25s} .fade-up-3{animation-delay:.4s}

.image-frame { position:relative; overflow:hidden; background:var(--brand-cream-deep); }
.image-frame img { transition: transform 1.4s cubic-bezier(0.2,0.7,0.1,1); }
.image-frame:hover img { transform: scale(1.05); }   /* use 1.02 to 1.03 for estates */

.eyebrow { text-transform:uppercase; letter-spacing:.34em; font-size:.7rem; font-weight:500; }

.link-arrow { display:inline-flex; align-items:center; gap:.55rem; font-size:.72rem;
  letter-spacing:.28em; text-transform:uppercase; padding-bottom:.25rem;
  border-bottom:1px solid var(--accent); transition: gap .3s ease; }
.link-arrow:hover { gap:.85rem; }

.input-field { width:100%; background:transparent; border:none; border-bottom:1px solid var(--line);
  padding:.85rem 0; }            /* underline-only form fields: right for a quiet enquiry form */
.input-field:focus { outline:none; border-color:var(--accent); }
```
From premier `globals.css`: a global `@media (prefers-reduced-motion: reduce)` kill-switch and an accent `*:focus-visible` ring (`outline: 2px solid var(--brand-gold); outline-offset: 3px`).

Leave out: fotogenic `.tag-pill` (rounded-full), `.divider-mark` (✦ glyph), `.bg-pattern-paper` dot texture, the `.btn-*` hover that widens letter-spacing (a fussy effect), and coluccis `.luxe-divider` / `.diamond-mark` gold gradients. These read as "template luxury".

### Header pattern (fotogenic `src/components/Header.tsx`)
Client component. `scrollY > 24` flips the header from `bg-transparent` to `bg-cream/95 backdrop-blur-md border-b`. Height 78px. Nav in `text-[0.72rem] uppercase tracking-[0.28em]`. Mobile menu is a two-line hamburger that morphs into an X (`h-px` bars, `translate-y-[6px] rotate-45`); the panel lists links in the large display serif and closes on route change (`useEffect(() => setOpen(false), [pathname])`). For the estates site: drop the phone number and "Enquire" button from the bar (Aman shows only the wordmark, a menu and one quiet "Reserve"-style text link), and combine it with GWA's `-mt-[header]` so the header sits transparent over the hero.

---

## 6. Font loading

All demos use `next/font/google` with CSS variables applied on `<html>`, and Tailwind v4 tokens map them:
```tsx
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"],
  weight: ["300","400","500","600","700"], style: ["normal","italic"], display: "swap" });
<html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
```
```css
@theme inline { --font-display: var(--font-cormorant), "Iowan Old Style", Georgia, serif; }
```
Fonts in use: Inter (most), Fraunces (klokken, burkhardt, uttke, central-auto, roots, leon), Cormorant Garamond (fotogenic, premier, coluccis), EB Garamond (hos), Italiana (fotogenic script), Playfair + Pinyon Script (coluccis), Cinzel/Montserrat (leon), Lora/Lato (battrick), Manrope (sorosen, straks), Geist via the `geist` package (structured-talent). No `next/font/local` anywhere. `gohere-nordic-landing/fonts/` is the only self-hosted set.

Recommendation for the estates site, following the owner's feedback (single sans, no Fraunces/Playfair display pairs): one restrained typeface family carries everything, or one quiet serif used sparingly for the wordmark and a few headings. Aman uses a light, widely tracked sans/serif system with tiny caps. Candidates: Cormorant Garamond at weight 300 for rare display lines plus a neutral sans (Inter at 300/400 or Jost) for UI caps. Load weights 300/400 only; each extra weight adds a request. If a self-hosted face is chosen later, use `next/font/local`; satori OG images need ttf/otf, not woff2 (see 7).

---

## 7. Other reusable pieces

- **OG image with brand font**: `~/structured-talent-demo/app/opengraph-image.tsx`. `ImageResponse` from `next/og`, fetches Newsreader TTF from Google Fonts CSS at build time (Satori cannot read woff2; Google serves ttf when the request has no modern User-Agent), and falls back gracefully. Port it with the brand serif and a hero photo as background. The gate's matcher already exempts `opengraph-image`.
- **robots.ts / sitemap.ts**: `~/structured-talent-demo/app/robots.ts`, `sitemap.ts` (`MetadataRoute`). Since the demo is gated, make robots `disallow: "/"`, or skip both.
- **Metadata template**: fotogenic/premier `title: { default, template: "%s · Brand" }` with `metadataBase` set to the vercel.app URL.
- **Skip link**: structured-talent layout has an `sr-only focus:not-sr-only` skip-to-main link.
- **`data-scroll-behavior="smooth"` on `<html>`** (klokken, structured-talent): the Next 16 way to keep smooth scroll without breaking route-change scroll resets. Prefer it over `html { scroll-behavior: smooth }` (which fotogenic/premier use).
- **Palette scaffolding**: fotogenic's two-layer tokens (`:root --brand-*`, then `@theme inline --color-*`) are cleanest. Fotogenic cream `#f6f1e9` / paper `#faf6ef` / cream-deep `#ece4d6` / line `#d8cdbb` / ink `#1a1612` / mute `#6b5f54` is already close to the estates palette. Shift it lighter and cooler-neutral (e.g. paper `#fbfaf7`, linen `#f3efe7`, sand `#e7dfd2`, stone `#bfb4a3`, taupe `#8a7f72`, ink `#2a2622`). Drop the burnish/heather/sage accents.
- **Static build variant**: `~/gohere-nordic-landing/src/build.py` + `template.html` emits linked, inlined and fragment builds with webp assets. Only relevant if a single-file pitch HTML of the estates site is ever needed.

---

## 8. Deploy conventions (from memory, confirmed by repo layout)

- Vercel team `magnus-clearscaler` (Hobby), GitHub `magnus-ClearScaler`. Commit with `git -c user.email=magnus@clearscaler.com -c user.name="Magnus Motzfeldt-Berge"`.
- Most demos are CLI-deploy only (`vercel --prod`), then `vercel alias set` to claim the bare `<project>.vercel.app`. Share that bare URL.
- Dev ports go up in steps of 10; the last used was 3420 (structured-talent). **Take 3430.**

---

## 9. Port checklist for the estates repo

1. `create-next-app` on next 16.2.11 / react 19.2.4 / tailwind 4 with `src/`; copy `AGENTS.md` and `CLAUDE.md`.
2. `src/proxy.ts`: the structured-talent gate, renamed to proxy, gate page re-themed.
3. `next.config.ts`: AVIF/WebP, explicit `qualities`, `deviceSizes` to 2560, one-year TTL, `/video` immutable headers.
4. `src/lib/site.ts`, `src/lib/listings.ts`, `src/lib/galleries.ts` (typed `as const`).
5. Components: `Header` (fotogenic, minus phone/CTA, transparent over hero), `Hero` (fotogenic plus optional GWA `HeroVideo`), `PageHero` (premier API), `ImageBand` (fotogenic IntroStatement), `EstateGrid` (fotogenic FeaturedGallery), `EstateGallery` (rhythmic aspects), `Reveal` (GWA), `Footer`.
6. Route `src/app/estates/[slug]/page.tsx` cloned from the fotogenic wedding detail route.
7. `opengraph-image.tsx` from structured-talent.
8. Do not port: stat strips, award badges, pill buttons, rounded cards, script fonts, gold gradient dividers, icon rows in heroes.
