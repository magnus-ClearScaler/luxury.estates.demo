# Craft mined from prior sites, for the Cote d'Azur luxury estates demo

Scope: what to port from the owner's earlier builds into a Next.js 16 + Tailwind 4 site. Sources were read in full, not summarised from memory, except where noted.

## 0. Source inventory (what actually exists)

| Site | Where the source is | Stack | Relevance |
| --- | --- | --- | --- |
| Montmar "Villa Alba, one property, three films" | **Gone.** `~/Desktop/MontmarEstates/` no longer exists on disk and is not on GitHub. Only the memory note survives (`~/.claude/projects/-Users-magnusmb/memory/project_montmar_villa_alba.md`). The three films still exist in `~/Documents/Palmier Pro/Montmar Estates.palmier/` (`exports/01-create-the-dream.mp4` etc., plus 10 AI motion clips `media/gen-*.mp4`, 1920x1080, 24 fps, ~6 s) | Vite + React + Tailwind 4 | Highest, but only the recorded decisions can be ported |
| Montmar proposal (ClearScaler to Montmar) | GitHub `magnus-ClearScaler/MontmarEstates` (cloned to scratchpad) | Vite + TanStack Router + Tailwind 4 | Low. Outfit 800 + DM Mono + red accent, rounded cards. A pitch doc, not a luxury site |
| Omnimundi | `~/omnimundi-demo` (canonical, has `.vercel/`); `~/Omnimundi.Demo` is an older copy (different globals.css, page.tsx, Header) | Next 16.2.6, React 19.2, Tailwind 4 | **High.** Closest working Next 16 code: full-bleed photo hero, drift, transparent-to-solid header, sharp corners, hairlines, paper/stone/sand palette |
| Get Work Abroad | `~/get-work-abroad` | Next 16.2.11 | High for engineering: hero video loader, image config, scrims, LCP-safe reveal. Low for aesthetic (rounded pills, shadows, bright sea/sun) |
| ClearScaler.com | `~/Clearscaler Website/clearscalerFinal` (not `~/Desktop/...`) | Vite SSR + prerender scripts, Manrope, shadcn | Low. SaaS agency look. Only the type floor and contrast discipline are worth taking |
| Marzelle Sweets | Live site is a Shopify Liquid theme "Marzelle Classic" (`marzellesweets.com/cdn/shop/t/5/assets/marzelle.css`). GitHub `MarzelleSweets` is an older Hydrogen build | Shopify theme | Medium: its live CSS has the cleanest token system of all (fluid gutters, section pad, one ease, `.js .reveal` progressive enhancement) |

## 1. Recorded Villa Alba decisions (the owner already approved these for an Aman look)

From the memory note, these are the closest thing to an approved brief for this project:
- Slow, meditative, nature-led, almost no text.
- **Single serif display (Cormorant Garamond) + Inter for letter-spaced uppercase labels.** This overrides the general "single sans, no serif display" rule for this vertical: that rule came from trades and clinic demos. Playfair and Fraunces stay banned (Marzelle uses Playfair; it reads as template on anything but confectionery).
- Warm stone / sand / off-white / charcoal palette, **one restrained bronze accent**.
- Warm desaturated photo grade done in CSS (`.graded`), so mixed-source photography looks like one shoot.
- Slow scroll-reveal fades.
- Closing card typography in the films: "Villa Alba / by MÓNTMAR Estates" set in Didot. Wordmark spacing with accented capitals worked.

Reconstruction of `.graded` (original file lost, values to tune by eye on the scraped photos):

```css
.graded { filter: saturate(0.82) contrast(0.96) brightness(1.02) sepia(0.06); }
```

Keep it on every listing photo so third-party agency images (different cameras, HDR, blue skies) read as one house style. This is the single most important trick for a site built from scraped listings.

## 2. Tokens to start from

Palette. Merge of Omnimundi `paper/stone/sand`, Marzelle `bg/bg-alt/line`, and the Villa Alba brief. Proposed, not final:

```css
@theme {
  --color-chalk:  #FBF9F5; /* page, near white, warm */
  --color-linen:  #F4EFE7; /* alternate section */
  --color-sand:   #E6DDCF; /* hairlines, image placeholders */
  --color-stone:  #B9AD9B; /* muted labels on light */
  --color-umber:  #6B6157; /* body copy (Marzelle --muted-fg) */
  --color-ink:    #24201B; /* headings, never pure black */
  --color-bronze: #8C6D3F; /* the one accent: hover, active rule, focus (Marzelle --gold) */
}
```

Rules carried over: body text is warm grey on chalk, never `#000` on `#fff`. Accent appears on hover underlines and focus only, never as a fill block. Omnimundi's dark navy footer is the wrong move here: keep the footer in linen or chalk, or at most a warm charcoal.

Spacing and layout (Marzelle live CSS, the best system found):

```css
--page: 1360px;                         /* Omnimundi and Marzelle both landed on 1360 */
--gutter: clamp(20px, 4vw, 56px);
--section-pad: clamp(80px, 9vw, 144px); /* push to clamp(96px, 12vw, 200px) for this site */
--col-gap: clamp(24px, 2.6vw, 40px);
--header-h: 80px; --header-h-scrolled: 64px;
--radius: 0;
--ease: cubic-bezier(.2, .7, .1, 1);    /* Marzelle; Omnimundi used (0.16, 1, 0.3, 1). Pick one for the whole site */
```

Type scale (Omnimundi and Marzelle values, adjusted for a light serif):
- Hero h1: Omnimundi `text-[2.9rem] md:text-7xl lg:text-[5.2rem]`, `font-light leading-[1.03] tracking-[-0.025em]`, `text-wrap: balance`. For Cormorant use weight 300 to 400, size up about 15 percent (serif x-height is smaller), tracking about -0.01em.
- h2: `text-[2.1rem] md:text-[3.1rem] font-light leading-[1.12] tracking-[-0.02em]`.
- Marzelle fluid alternatives: h1 `clamp(36px,4vw,56px)/1.08`, h2 `clamp(30px,3.2vw,44px)/1.12`, h3 `clamp(22px,2vw,24px)/1.25`.
- Label / eyebrow: `0.6875rem` (11px), uppercase, weight 500, tracking `0.22em` (Omnimundi `.label`) to `0.28em` (Marzelle `.eyebrow`). Use sparingly: one label per section at most.
- Body: 16 to 17px, line-height 1.7, max 52ch (Marzelle `.lede`).
- Floor: nothing a user must read below 12px (ClearScaler `--fs-micro: 0.75rem`, applied at every viewport).
- Fonts via `next/font/google` with a CSS variable (Omnimundi pattern): `Cormorant_Garamond({ variable: "--font-serif", weight: ["300","400","500"], style: ["normal","italic"] })` plus `Inter({ variable: "--font-sans" })`. Set `font-synthesis-weight: none` on body (Omnimundi) so missing weights are not faux-bolded.

## 3. Components and techniques worth porting

### 3.1 Full-bleed photo hero with slow drift (Omnimundi `app/page.tsx`, `globals.css`)

```css
@keyframes drift { from { transform: scale(1.05) } to { transform: scale(1.13) } }
.drift { animation: drift 30s ease-out forwards; }
@media (prefers-reduced-motion: reduce) { .drift { animation: none; transform: scale(1.05) } }
```

```tsx
<section className="relative flex min-h-[100svh] items-end overflow-hidden">
  <Image src="/estates/x/01.jpg" alt="..." fill preload sizes="100vw" className="drift graded object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
  {/* type sits bottom-left, small */}
</section>
```

Notes: Next 16 uses `preload` on `next/image` (Omnimundi); Get Work Abroad still uses the deprecated `priority`. Use `min-h-[100svh]`, not `100vh`, for iOS. Make the drift slower and smaller for this site (40 to 60 s, 1.02 to 1.08): Aman's motion is almost imperceptible. Use a light scrim only at the foot; Get Work Abroad's heavy navy scrims (`.scrim-hero` up to 0.90 alpha) would kill a white-and-sand site.

### 3.2 Hero video, poster first (Get Work Abroad `components/home/HeroVideo.tsx`)

Port nearly verbatim if a film is used (the Villa Alba Palmier clips prove the format; new Riviera clips could be cut the same way):
- Poster `<Image fill preload sizes="100vw">` is the LCP element and stays if video never loads.
- Video sources are attached only after `requestIdleCallback` (timeout 2500 ms, fallback 1200 ms), so they never compete with LCP.
- Tiered sources: 720p on `< 768px`, 1080p above; WebM VP9 first, MP4 H.264 fallback.
- Skips entirely on `prefers-reduced-motion`, `saveData`, or 2g/3g `effectiveType`.
- `autoPlay muted loop playsInline preload="none" aria-hidden tabIndex={-1}`; if `play()` rejects, retry once on first pointerdown/touchstart/keydown/scroll.
- `next.config.ts` header: `/video/:path*` gets `Cache-Control: public, max-age=31536000, immutable`.

### 3.3 Reveal on scroll

Best combination of the four implementations seen:
- Omnimundi `components/Reveal.tsx`: client component, `IntersectionObserver` with `rootMargin "0px 0px -12% 0px"`, `threshold 0.05`, disconnects after first show, `data-shown` attribute, optional `delay` as inline `transitionDelay`, `as` prop to keep semantic tags.
- CSS: `opacity 0; translateY(18px)`, 900 ms on the site ease. For this site go quieter: 12px rise (Marzelle), 1100 to 1400 ms, opacity leading.
- Marzelle progressive enhancement: hide only under `.js .reveal`, set `document.documentElement.classList.add('js')` in an inline head script. Without JS, nothing is stuck invisible.
- Get Work Abroad rule, keep it: **never put a reveal on anything above the fold**; an element at opacity 0 is not contentful and delays LCP by the full duration.
- Stagger via `data-delay` steps of 80 ms (Marzelle), no more than three steps.
- Reduced motion: force `.reveal { opacity: 1 !important; transform: none !important }`.

### 3.4 Header: transparent over photo, solid on scroll

Omnimundi `components/Header.tsx` is the template:
- `fixed inset-x-0 top-0 z-50`, `scrolled = window.scrollY > 40` with a passive listener.
- Solid state: `bg-paper/95 backdrop-blur-sm border-b border-sand`; transparent state: `border-transparent`, text in stone.
- **Two logo files stacked and cross-faded** (`opacity` 500 ms) instead of swapping `src`, so there is no flash.
- Active link: 1px underline scaled from `scale-x-0` to `scale-x-100`, `origin-left`, 500 ms.
- Mobile: two 1px lines that rotate into an X; drawer animates `max-height`; body scroll locked while open; drawer closes on route change.
- Get Work Abroad refinement worth taking: `const open = openedOn === pathname` closes the drawer on any navigation without an effect, and `inert` on the closed drawer removes it from tab order.
- Marzelle refinement: height shrinks 80 to 64px on scroll, and the frosted layer is a `::before` with its own opacity transition, so the blur fades rather than snapping.

For this site: centred wordmark with a 3-column grid (`grid-template-columns: 1fr auto 1fr`, Marzelle), four links at most, and no filled CTA button in the header (Omnimundi's "Boka ett möte" pill is too salesy here). A text link "Enquire" at most.

### 3.5 Editorial interstitial image

Omnimundi's `<Reveal className="relative h-[60svh] md:h-[78svh] w-full overflow-hidden">` full-width photo with one line of light type at bottom-left is the right rhythm: copy block, full-bleed image, copy block. For this site make most of them captionless.

### 3.6 Footer

Omnimundi footer structure is solid: `grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]`, `.label` column heads at 50 percent opacity, 15px links, bottom rule `border-t` at 15 percent opacity, copyright line at 13px. Change for this site: light ground (linen), fewer columns (wordmark, offices, enquiries), no tagline in an accent colour, no LinkedIn-style link lists. ClearScaler's Montmar footer (mono 12px uppercase, 0.16em tracking) is a good model for the bottom line.

### 3.7 Content as data

Omnimundi keeps everything in `lib/site.ts` (`site`, `nav`, `pillars`, `destinations`); pages only map over it. Do the same with `lib/estates.ts` (slug, name, commune, price, beds, baths, m2, plot, photos[], source agency, source URL). This keeps scraped listing facts in one auditable file.

### 3.8 Photo handling

- Download listing photos into `public/estates/<slug>/NN.jpg` rather than hot-linking; agency CDNs block hotlinks and change URLs. Omnimundi kept 2400px wide JPEGs at 250 to 600 KB and let `next/image` do the rest.
- Keep a credits table like Omnimundi `KREDITERINGAR.md` (file, subject, source, ID). Here: file, property, source agency, listing URL, date taken. Needed because the photos are third party.
- `next.config.ts` (Get Work Abroad): `images.formats: ["image/avif","image/webp"]`, `deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920]`, `minimumCacheTTL: 31536000`. Add `remotePatterns` only if some images must stay remote (Burkhardt pattern).
- `sizes` must be honest: `100vw` for full bleed, `(min-width: 1024px) 50vw, 100vw` for split layouts.
- Image placeholders in `--color-sand`, not grey, so loading looks like paper.

### 3.9 Metadata

- Omnimundi `app/opengraph-image.tsx` with `next/og` `ImageResponse` (1200x630): plain wordmark, one line, set in brand colours. Use a property photo as background instead of a flat colour.
- App-router icon convention (`app/icon.png`, `app/apple-icon.png`), no manual `icons` block (Get Work Abroad comment explains why: content-hashed URLs).
- JSON-LD in layout (Omnimundi uses `ProfessionalService`); here use `RealEstateAgent`, with fictional details only.
- `robots.ts` and `sitemap.ts` exist in both Next sites; for a gated demo, `robots` should disallow all.

## 4. Password gate (Next 16 file, ported)

The 18 outreach demos use this exact file (`~/leonandcompany-clearscaler-demo/middleware.ts`), password `120226`, cookie `demo-auth`, 30 days. Next 16 warns that `middleware` is deprecated in favour of `proxy`, so port it as `proxy.ts` at repo root with the export renamed, and restyle the gate to the new palette:

```ts
// proxy.ts
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
<title>Private preview</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Inter",system-ui,sans-serif;background:#FBF9F5;color:#24201B;min-height:100vh;display:grid;place-items:center;padding:1.5rem}
  form{width:100%;max-width:340px}
  label{display:block;font-size:.6875rem;letter-spacing:.24em;text-transform:uppercase;color:#6B6157;margin-bottom:.9rem}
  input{width:100%;padding:.85rem 0;background:transparent;border:0;border-bottom:1px solid #B9AD9B;color:#24201B;font-size:1rem;font-family:inherit;border-radius:0}
  input:focus{outline:none;border-bottom-color:#8C6D3F}
  button{width:100%;margin-top:1.5rem;padding:.9rem;background:transparent;color:#24201B;border:1px solid #24201B;font-size:.75rem;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;font-family:inherit}
  button:hover{background:#24201B;color:#FBF9F5}
  .err{color:#8C3F2F;font-size:.85rem;margin-top:.9rem;min-height:1.2em}
</style>
</head>
<body>
<form method="POST">
  <label for="p">Password</label>
  <input id="p" name="p" type="password" autofocus required>
  <button type="submit">Enter</button>
  <div class="err">${error ? 'Incorrect password.' : ''}</div>
</form>
</body>
</html>`;
  return new NextResponse(body, {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function proxy(req: NextRequest) {
  if (req.cookies.get(COOKIE)?.value === PASSWORD) return NextResponse.next();
  if (req.method === 'POST') {
    const form = await req.formData();
    if (form.get('p') === PASSWORD) {
      const url = new URL(req.nextUrl.pathname + req.nextUrl.search, req.url);
      const res = NextResponse.redirect(url, 303);
      res.cookies.set(COOKIE, PASSWORD, {
        path: '/', httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    }
    return gate(true);
  }
  return gate(false);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};
```

Caveats: the matcher skips any path with a dot, so `/estates/x/01.jpg` and `/opengraph-image` assets are public (fine, and needed for link previews; `/opengraph-image` has no dot, so it is gated, which breaks WhatsApp previews. Add `opengraph-image` to the negative lookahead). `secure: true` means the cookie will not stick on `http://localhost`; test the gate on a Vercel preview. Decide with the conductors whether this demo is gated at all: it is a public case study, unlike the prospect demos. Omnimundi and Get Work Abroad are not gated.

## 5. Vercel and git pattern

- Account: Vercel `magnus-clearscaler` Hobby (team id `team_7g7UBIYZk8JDX6nEHExOCijM`, per `.vercel/project.json` in both Omnimundi and Get Work Abroad). Run `vercel whoami` first; stop if it says `cleargroup-magnus`.
- Commits: `git -c user.email=magnus@clearscaler.com -c user.name="Magnus Motzfeldt-Berge" commit ...`. On this Mac `git` may hit the Xcode licence gate; prepend `PATH=/Applications/Xcode.app/Contents/Developer/usr/bin:$PATH`. Push over HTTPS via `gh` (`~/.local/bin/gh`, authed as `magnus-ClearScaler`).
- Deploy: CLI `vercel --yes --prod` from the repo root. Most demos have no Git integration because the Vercel GitHub App is tied to the dead account; Omnimundi is the exception (pushes to `main` deploy). Do not run `vercel git connect` or re-enable Actions without asking.
- After the first prod deploy: `vercel alias set <deploy>.vercel.app <project>.vercel.app` to claim the bare URL, and turn off Vercel Authentication (`ssoProtection: null` via PATCH `/v9/projects/<name>`), or anonymous visitors get 401.
- Dev port: 3430 is next free (3400 GWA, 3410 Omnimundi, 3420 Structured Talent). Set it in `package.json` scripts like Omnimundi (`next dev -p 3430`).
- Next 16 has breaking changes. Both Next repos carry `AGENTS.md` telling agents to read `node_modules/next/dist/docs/` before coding. Copy that file and `CLAUDE.md` (`@AGENTS.md`) into this repo.
- Add `@vercel/analytics` and `@vercel/speed-insights` only if wanted (GWA has both); they cost nothing on Hobby.

## 6. What worked (keep)

1. Photo does the emotional work; type is small and sits at the foot of the image (Omnimundi hero, GWA `.scrim-hero` reasoning: dark at the foot, clear through the top half).
2. Sharp corners and 1px hairlines everywhere (Omnimundi, Marzelle `--radius: 0`).
3. One ease curve and long durations (700 to 900 ms) site-wide. Nothing bounces.
4. Underline links with an arrow that moves 4px on hover (`group-hover:translate-x-1`) instead of buttons.
5. Content in one data file, layout never edited to change copy.
6. Performance discipline from GWA: AVIF, poster-first video, nothing hidden above the fold.
7. Credits file for every third-party photo.

## 7. What to avoid (seen in these repos, wrong for this site)

- Montmar proposal: Outfit 800 headlines, DM Mono labels, red accent, `rounded-2xl` card grid with `gap-px` borders, day/night toggle pill. Reads as an agency deck.
- GWA: rounded-full pills, `--shadow-card` / `--shadow-lift` drop shadows, live pulsing dots, marquee, text-shadow on hero type, two-tone headline with a coloured second half, WhatsApp button in the header.
- Omnimundi: speech-bubble component, filled clay CTA, navy footer, gold tagline. Fine for a DMC, too warm and busy here.
- Marzelle: Playfair Display, gold gradient divider (`.gold-divider`), `hover-lift` translate on cards, announcement bar.
- ClearScaler: shadcn component sprawl (40+ Radix packages), oklch colours that clip outside sRGB (their own comment warns about it), stat tiles, phone mockups.
- Generic: stat cards ("40 years, 300 villas"), star ratings, floating badges, "Book a call" urgency, icon grids, gradient washes, emoji, em or en dashes in any copy (note Marzelle's live copy uses "No. 01 — Fruit Lovers" and "Dallas–Fort Worth"; do not copy that habit).
- Scroll-jacking or Lenis-style smooth scroll libraries: none of the approved sites use them, and they fight native momentum on iOS. Native scroll plus CSS `scroll-behavior: smooth` is enough.
