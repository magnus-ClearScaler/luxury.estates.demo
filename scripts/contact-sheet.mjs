#!/usr/bin/env node
/**
 * Grade acceptance test (brief section 8). Builds
 *   docs/qa/grade-contact-sheet.jpg   the six graded frames on paper
 *   docs/qa/grade-before-after.jpg    originals above, graded below
 * from the files in public/ (run scripts/grade.mjs first).
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PAPER = { r: 0xf6, g: 0xf2, b: 0xeb };
const H = 520;
const GAP = 24;

const set = [
  ["estates/les-pins-eze/01.jpg", "listings/les-pins-eze-bord-de-mer/01.jpg"],
  ["estates/le-belvedere-nice/01.jpg", "listings/belvedere-cap-de-nice/01.jpg"],
  ["estates/mas-blanc-mougins/01.jpg", "listings/mas-blanc-mougins/01.jpg"],
  ["estates/villa-blanche-cap-dantibes/05.jpg", "listings/villa-blanche-cap-dantibes/05.jpg"],
  ["atmosphere/sailboat-beige-sea.jpg", "atmosphere/sailboat-beige-sea.jpg"],
  ["atmosphere/terrace-sea-pale-morning.jpg", "atmosphere/terrace-sea-pale-morning.jpg"],
];

async function tile(path) {
  const buf = await sharp(path).rotate().resize({ height: H }).jpeg({ quality: 90 }).toBuffer();
  const { width } = await sharp(buf).metadata();
  return { buf, width };
}

async function row(paths) {
  const tiles = await Promise.all(paths.map(tile));
  return tiles;
}

async function sheet(rows, out) {
  const width = Math.max(...rows.map((r) => r.reduce((a, t) => a + t.width, 0) + GAP * (r.length + 1)));
  const height = rows.length * H + GAP * (rows.length + 1);
  const composites = [];
  rows.forEach((r, ri) => {
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

const graded = set.map(([g]) => join(ROOT, "public", g));
const originals = set.map(([, o]) => join(ROOT, "assets/originals", o));

await sheet([await row(graded.slice(0, 4)), await row(graded.slice(4))], join(ROOT, "docs/qa/grade-contact-sheet.jpg"));
await sheet([await row(originals), await row(graded)], join(ROOT, "docs/qa/grade-before-after.jpg"));
console.log("contact sheets written to docs/qa/");
