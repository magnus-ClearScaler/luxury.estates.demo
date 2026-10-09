#!/usr/bin/env node
/**
 * Grade acceptance test (brief section 8). Builds, from the files in public/
 * (run scripts/grade.mjs first):
 *   docs/qa/grade-contact-sheet.jpg   the nine heroes, then the two reference
 *                                     atmosphere frames, on paper
 *   docs/qa/grade-before-after.jpg    originals above, graded below
 *   docs/qa/r2/sheet-heroes.jpg       round 2: the nine heroes in index order,
 *                                     one strip, as they stack on /estates
 *   docs/qa/r2/sheet-interiors.jpg    round 2: every interior frame beside a
 *                                     paper swatch (#F6F2EB)
 *   docs/qa/r2/sheet-pools.jpg        round 2: every frame with a pool
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { estates } from "../src/data/estates.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PAPER = { r: 0xf6, g: 0xf2, b: 0xeb };
const GAP = 24;

const heroes = estates
  .filter((e) => e.published)
  .map((e) => {
    const h = e.gallery.find((p) => p.frame === "hero");
    return [`estates/${e.slug}/${h.file}.jpg`, `listings/${e.sourceSlug}/${h.file}.jpg`];
  });
const refs = [
  ["atmosphere/sailboat-beige-sea.jpg", "atmosphere/sailboat-beige-sea.jpg"],
  ["atmosphere/terrace-sea-pale-morning.jpg", "atmosphere/terrace-sea-pale-morning.jpg"],
];

const interiors = estates
  .filter((e) => e.published)
  .flatMap((e) => e.gallery.filter((p) => p.grade === "interior").map((p) => `estates/${e.slug}/${p.file}.jpg`));

const pools = [
  "estates/le-belvedere-nice/01.jpg",
  "estates/le-belvedere-nice/02.jpg",
  "estates/le-belvedere-nice/05.jpg",
  "estates/le-belvedere-nice/07.jpg",
  "estates/villa-blanche-cap-dantibes/05.jpg",
  "estates/maison-edouard-beaulieu/02.jpg",
  "estates/maison-edouard-beaulieu/11.jpg",
  "estates/maison-edouard-beaulieu/12.jpg",
  "estates/mas-blanc-mougins/01.jpg",
  "estates/mas-blanc-mougins/02.jpg",
  "estates/les-pins-eze/03.jpg",
  "estates/domaine-des-vignes-saint-tropez/01.jpg",
  "estates/maison-des-collines-ramatuelle/01.jpg",
];

async function tile(path, H) {
  const buf = await sharp(path).rotate().resize({ height: H }).jpeg({ quality: 90 }).toBuffer();
  const { width } = await sharp(buf).metadata();
  return { buf, width };
}

async function swatch(H) {
  const width = Math.round(H * 0.5);
  const buf = await sharp({ create: { width, height: H, channels: 3, background: PAPER } })
    .composite([
      {
        input: Buffer.from(`<svg width="${width}" height="${H}"><rect x=".5" y=".5" width="${width - 1}" height="${H - 1}" fill="none" stroke="#DCD4C7"/></svg>`),
      },
    ])
    .jpeg({ quality: 90 })
    .toBuffer();
  return { buf, width };
}

/** Rows of tiles on paper; each row is an array of paths (or "swatch"). */
async function sheet(rows, out, H = 520) {
  const built = [];
  for (const r of rows) built.push(await Promise.all(r.map((p) => (p === "swatch" ? swatch(H) : tile(p, H)))));
  const width = Math.max(...built.map((r) => r.reduce((a, t) => a + t.width, 0) + GAP * (r.length + 1)));
  const height = built.length * H + GAP * (built.length + 1);
  const composites = [];
  built.forEach((r, ri) => {
    let x = GAP;
    for (const t of r) {
      composites.push({ input: t.buf, left: x, top: GAP + ri * (H + GAP) });
      x += t.width + GAP;
    }
  });
  mkdirSync(dirname(out), { recursive: true });
  await sharp({ create: { width, height, channels: 3, background: PAPER } })
    .composite(composites)
    .jpeg({ quality: 86 })
    .toFile(out);
}

const pub = (p) => join(ROOT, "public", p);
const orig = (p) => join(ROOT, "assets/originals", p);
const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

const graded = [...heroes, ...refs].map(([g]) => pub(g));
const originals = [...heroes, ...refs].map(([, o]) => orig(o));

await sheet(chunk(graded, 4), join(ROOT, "docs/qa/grade-contact-sheet.jpg"));
await sheet(
  [originals.slice(0, 6), graded.slice(0, 6), originals.slice(6), graded.slice(6)],
  join(ROOT, "docs/qa/grade-before-after.jpg"),
);
// One column, as the heroes stack on /estates, with the sailboat as the sky reference.
await sheet(
  [...chunk(heroes.map(([g]) => pub(g)), 3), [pub(refs[0][0]), pub(refs[1][0])]],
  join(ROOT, "docs/qa/r2/sheet-heroes.jpg"),
  360,
);
await sheet(
  chunk(["swatch", ...interiors.map(pub)], 6),
  join(ROOT, "docs/qa/r2/sheet-interiors.jpg"),
  300,
);
await sheet(chunk(pools.map(pub), 5), join(ROOT, "docs/qa/r2/sheet-pools.jpg"), 300);
console.log("contact sheets written to docs/qa/ and docs/qa/r2/");
