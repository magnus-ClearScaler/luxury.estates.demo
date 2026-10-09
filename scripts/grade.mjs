#!/usr/bin/env node
/**
 * Aube'Mar grade (brief section 8). A local script, not a build step: its
 * outputs in public/ are committed so Vercel builds stay fast.
 *
 *   node scripts/grade.mjs            grade everything listed in src/data
 *   node scripts/grade.mjs --only les-pins-eze,sailboat-beige-sea
 *
 * Reads   assets/originals/listings/<source slug>/NN.jpg
 *         assets/originals/atmosphere/<name>.jpg
 *         assets/originals/video/sea-surface-warm-dusk.mp4 (poster frame, via ffmpeg)
 * Writes  public/estates/<slug>/NN.jpg       only the frames in brief 7.1
 *         public/atmosphere/<name>.jpg        only the slots in brief 7.2
 *         public/video/sea-surface-warm-dusk-poster.jpg   graded `soft`
 *         public/grain.png                    256px monochrome noise tile
 *
 * Every image: rotate, fit inside 2400 x 2400 (2400px long edge, never
 * enlarged), then in this order modulate, linear, recomb, gamma, sharpen
 * ({ sigma: .4 }), JPEG q84 mozjpeg. Gamma is applied as sharp's output gamma
 * (`gamma(1, g)`: x ^ (1/g), lifts the mid tones); a plain `gamma(g)` would
 * cancel itself out around the resize.
 *
 * FINAL PRESETS (tuned against docs/qa/grade-contact-sheet.jpg, 2026-10-09)
 *
 *   preset    modulate                    linear     recomb rows R / G / B                                gamma
 *   soft      sat .90 bri 1.02            .95, 8     none                                                 1.00
 *   standard  sat .62 bri 1.02 hue -2     .89, 18    [.97,.08,.04]  [.01,.98,.01]  [.05,.11,.78]          1.04
 *   strong    sat .50 bri 1.01 hue -4     .86, 22    [.95,.10,.05]  [.02,.96,.02]  [.07,.14,.70]          1.05
 *   warm      sat .68 bri 1.02            .90, 16    [.98,.06,.02]  [.01,.97,.01]  [.04,.09,.82]          1.04
 *
 * Brief starting values: standard sat .78 bri 1.03 linear .9,16 recomb
 * [1.03,.02,-.01] [.01,.99,0] [-.02,.01,.93]; strong sat .68 bri 1.04 linear
 * .86,22 blue row [-.02,.01,.90] gamma 1.06; warm sat .88 bri 1.03 linear
 * .92,14 no recomb. Why they moved, from the contact sheets:
 * - With the brief's numbers the agency skies stayed blue and the pools
 *   (Villa Blanche 05, Le Belvedere 01, Maison Edouard 02) stayed cyan beside
 *   the beige, pink and silver atmosphere frames. Taking blue out alone left
 *   them teal. The recomb now feeds green and blue into red and red and green
 *   into blue, which pulls cyan towards a grey green and warms the whites.
 * - Saturation down (.62 standard, .50 strong) to the paper-print level of
 *   the atmosphere set; brightness eased to 1.02 / 1.01 because the warmer red
 *   row already lifts the facades.
 * - strong gamma 1.05 (from 1.06): 1.06 went milky with the warmer recomb.
 * - warm: Bastide des Pres was the greenest house on the sheet (bright lawn,
 *   blue sky); saturation .68 and a gentle cyan pull bring it into the set
 *   while it stays the warmest.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { estates } from "../src/data/estates.ts";
import { deployedAtmosphere } from "../src/data/atmosphere.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIG = join(ROOT, "assets/originals");
const PUB = join(ROOT, "public");

/** Preset values; keep in step with the FINAL PRESETS table in the header. */
export const PRESETS = {
  soft: {
    modulate: { saturation: 0.9, brightness: 1.02 },
    linear: [0.95, 8],
    recomb: null,
    gamma: 1.0,
  },
  standard: {
    modulate: { saturation: 0.62, brightness: 1.02, hue: -2 },
    linear: [0.89, 18],
    recomb: [
      [0.97, 0.08, 0.04],
      [0.01, 0.98, 0.01],
      [0.05, 0.11, 0.78],
    ],
    gamma: 1.04,
  },
  strong: {
    modulate: { saturation: 0.5, brightness: 1.01, hue: -4 },
    linear: [0.86, 22],
    recomb: [
      [0.95, 0.1, 0.05],
      [0.02, 0.96, 0.02],
      [0.07, 0.14, 0.7],
    ],
    gamma: 1.05,
  },
  warm: {
    modulate: { saturation: 0.68, brightness: 1.02 },
    linear: [0.9, 16],
    recomb: [
      [0.98, 0.06, 0.02],
      [0.01, 0.97, 0.01],
      [0.04, 0.09, 0.82],
    ],
    gamma: 1.04,
  },
};

const LONG_EDGE = 2400;

async function raw(pipeline) {
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

function fromRaw({ data, info }) {
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
}

/** Grade one file to a JPEG at `out`. Exported for scripts/contact-sheet.mjs. */
export async function gradeFile(input, out, presetName) {
  const p = PRESETS[presetName];
  if (!p) throw new Error(`Unknown preset ${presetName}`);

  // Pass 1: orient, size, modulate (sharp runs modulate after resize).
  let img = await raw(
    sharp(input)
      .rotate()
      .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
      .removeAlpha()
      .toColourspace("srgb")
      .modulate(p.modulate),
  );
  // Pass 2: linear on its own (sharp would otherwise run it last).
  img = await raw(fromRaw(img).linear(p.linear[0], p.linear[1]));
  // Pass 3: recomb, output gamma, sharpen.
  let last = fromRaw(img);
  if (p.recomb) last = last.recomb(p.recomb);
  if (p.gamma > 1) last = last.gamma(1, p.gamma);
  last = last.sharpen({ sigma: 0.4 });

  mkdirSync(dirname(out), { recursive: true });
  await last.jpeg({ quality: 84, mozjpeg: true }).toFile(out);
}

function jobs() {
  const list = [];
  for (const e of estates) {
    if (!e.published) continue;
    for (const ph of e.gallery) {
      list.push({
        key: e.slug,
        input: join(ORIG, "listings", e.sourceSlug, `${ph.file}.jpg`),
        out: join(PUB, "estates", e.slug, `${ph.file}.jpg`),
        preset: ph.grade,
      });
    }
  }
  for (const a of deployedAtmosphere) {
    list.push({
      key: a.name,
      input: join(ORIG, "atmosphere", `${a.name}.jpg`),
      out: join(PUB, "atmosphere", `${a.name}.jpg`),
      preset: a.grade,
    });
  }
  return list;
}

async function poster() {
  const film = join(ORIG, "video", "sea-surface-warm-dusk.mp4");
  const frame = join(tmpdir(), "aubemar-poster-frame.png");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "2", "-i", film, "-frames:v", "1", frame]);
  await gradeFile(frame, join(PUB, "video", "sea-surface-warm-dusk-poster.jpg"), "soft");
  rmSync(frame, { force: true });
}

async function grain() {
  // Deterministic monochrome noise (mulberry32), mid grey, full opacity: the
  // 3.5% strength is set in CSS on the hero film only.
  const size = 256;
  const buf = Buffer.alloc(size * size);
  let s = 0x41_75_62_65;
  for (let i = 0; i < buf.length; i++) {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    buf[i] = Math.round(r * 255);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(join(PUB, "grain.png"));
}

async function main() {
  const onlyArg = process.argv.indexOf("--only");
  const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(",")) : null;

  const list = jobs().filter((j) => !only || only.has(j.key));
  let missing = 0;
  for (const j of list) {
    if (!existsSync(j.input)) {
      console.error(`missing ${j.input}`);
      missing++;
    }
  }
  if (missing) process.exit(1);

  // Clean only on a full run, so --only never deletes other output.
  if (!only) {
    rmSync(join(PUB, "estates"), { recursive: true, force: true });
    rmSync(join(PUB, "atmosphere"), { recursive: true, force: true });
  }

  let bytes = 0;
  for (const j of list) {
    await gradeFile(j.input, j.out, j.preset);
    bytes += statSync(j.out).size;
  }
  if (!only || only.has("poster")) await poster();
  if (!only) await grain();
  console.log(`graded ${list.length} images, ${(bytes / 1e6).toFixed(1)} MB`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
