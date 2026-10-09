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
 *         assets/originals/video/sea-pale-horizon.mp4 (poster frame, via ffmpeg)
 * Writes  public/estates/<slug>/NN.jpg       only the frames in brief 7.1
 *         public/atmosphere/<name>.jpg        only the slots in brief 7.2
 *         public/video/sea-pale-horizon-poster.jpg   graded by FILM_VF (round 3)
 *         public/grain.png                    256px monochrome noise tile
 *
 * Every image: rotate, fit inside 2400 x 2400 (2400px long edge, never
 * enlarged), then in this order modulate, linear, recomb, gamma, the cyan
 * pass and the sky pass (round 2), sharpen ({ sigma: .4 }), JPEG q84
 * mozjpeg. Gamma is an output gamma, x ^ (1/g), which lifts the mid tones.
 * Round 2 applies it as a lookup table on raw pixels: sharp's `gamma(1, g)`
 * only lifts when a sharpen follows in the same pipeline, and darkens (by
 * about a fifth at 1.04) when the pixels are taken out raw for the new passes.
 *
 * FINAL PRESETS (round 2, 2026-10-09; docs/qa/r2/sheet-*.jpg)
 *
 *   preset    modulate                    linear     recomb rows R / G / B                                gamma  cyan
 *   soft      sat .90 bri 1.02            .95, 8     none                                                 1.00   no
 *   standard  sat .62 bri 1.02 hue -2     .89, 18    [.97,.08,.04]  [.01,.98,.01]  [.05,.11,.78]          1.04   yes
 *   garden    sat .52 bri 1.02 hue -2     .89, 18    [.97,.08,.04]  [.02,.94,.02]  [.05,.11,.78]          1.04   yes
 *   strong    sat .50 bri 1.01 hue -4     .86, 22    [.95,.10,.05]  [.02,.96,.02]  [.07,.14,.70]          1.05   yes
 *   warm      sat .48 bri 1.02            .90, 16    [.98,.06,.02]  [.02,.94,.02]  [.05,.11,.78]          1.04   yes
 *   interior  sat .70 bri 1.05            .95, 14    [.995,.035,0]  [.01,.98,.01]  [.02,.06,.90]          1.10   yes
 *
 * Round 3 changes (per image, in src/data): `patches` retouch (median heal
 * or clone) for the Les Pins contrails, pole and crane; `tune.sharpen` 0 and
 * `tune.pink` (a magenta and maroon pass) for the Bastide garden frames;
 * centre extracts for the wide-angle interiors. The film poster takes the
 * film's own ffmpeg grade (FILM_VF) through the identity `film` preset.
 *
 * Round 2 changes:
 * - interior (every interior frame): the standard / strong red rows sum to
 *   1.09 / 1.10 and their blue rows to .94 / .91, so white walls went salmon
 *   (R minus B about 31 on Les Pins 04). Rows near 1.0 and a gamma lift put
 *   the brighter neutral tones (the 75th to 92nd percentile) at about
 *   #E8E2DB to #EFE8E1 with R minus B between 7 and 14 on all sixteen
 *   interiors; per-house red or blue rows in estates.ts even out the warmer
 *   (Vignes, Mas Blanc, Bastide) and cooler (Collines) originals. The bosses
 *   proposed .68 / .93,10 / gamma 1.02 (Opus) and .72 / .91,14 (Fable); both
 *   left the walls near #BDB9B5, grey rather than cream, hence the lift.
 * - warm: saturation .55 to .48 and the green row to .94, as `garden`.
 * - cyan pass (`cyanPass`, all listing presets): pixels of hue 160 to 200
 *   keep 15% of their saturation and are pulled to 150; feathered from 125
 *   (the mint the recomb leaves in a pool) and to 215, with the hue pull
 *   held inside 150 to 205 so a blue sky is only desaturated, never turned
 *   cyan. Opus asked for 35%; at 35% and at 20% the Belvedere pools still
 *   read mint. Belvedere 05 pool: #30ABB8 original, #9CA39E graded.
 * - sky pass (`tune.sky`, every hero): below. Target SKY_TARGET #D8D4CB.
 *
 * Sky, mean RGB of the top 12% of each hero (mask weighted, so pine canopy
 * and roofs count for little), after the colour grade and after the sky pass:
 *   villa-cap-fleuri/01                185,187,192  ->  215,211,203
 *   les-pins-eze/01                    150,156,155  ->  215,212,202
 *   maison-edouard-beaulieu/02         170,175,179  ->  215,211,202
 *   le-belvedere-nice/01               204,195,186  ->  214,211,203
 *   villa-blanche-cap-dantibes/05      158,160,164  ->  199,196,191  (strength .75)
 *   mas-blanc-mougins/01               188,174,156  ->  205,201,192
 *   bastide-des-pres-chateauneuf/11    171,169,171  ->  213,209,200
 *   domaine-des-vignes-saint-tropez/01 156,160,174  ->  215,211,202
 *   maison-des-collines-ramatuelle/01  229,222,212  ->  216,212,203
 *   les-pins-eze/11 (closing wide)     201,198,191  ->  216,212,203
 *   villa-blanche-cap-dantibes/07      149,147,153  ->  185,182,179  (round 3, strength .6, diptych with 10)
 * Villa Blanche runs at .75 so its cream facade, inside the mask, is not
 * lifted with the sky; Mas Blanc's sky is mostly pine canopy, so its mask
 * carries less weight.
 *
 * Per-image options live with the image in src/data (estates.ts, atmosphere.ts):
 *   extract  [left, top, width, height] as fractions of the source, cut before
 *            the resize (details that are whole rooms, a neighbour's house,
 *            a band of HDR cloud, the vault's rubble floor).
 *   tune     { hue, saturation, brightness, red, green, blue, linear, sky,
 *            cyan } replacing the preset's values for that image (the blue
 *            sky originals that went lilac take hue +3 and a red row of
 *            [.99,.06,.01]; the stone pine's white sky is held near chalk).
 *   quality  JPEG quality for an atmosphere file (the sailboat is q88).
 * The film poster is graded by FILM_VF, the film's own ffmpeg grade, with
 * sharpen sigma .5 at q90 (round 3; see `poster()`).
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
 *   blue sky). Round 1 took it from .68 to .55 and gave it the standard blue
 *   row, so its skies and lawns read with the rest of the index.
 * - garden: Domaine des Vignes lawns stayed the most saturated green under
 *   standard; garden is standard at .52 with a lower green row.
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
    cyan: true,
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
    cyan: true,
  },
  garden: {
    modulate: { saturation: 0.52, brightness: 1.02, hue: -2 },
    linear: [0.89, 18],
    recomb: [
      [0.97, 0.08, 0.04],
      [0.02, 0.94, 0.02],
      [0.05, 0.11, 0.78],
    ],
    gamma: 1.04,
    cyan: true,
  },
  warm: {
    modulate: { saturation: 0.48, brightness: 1.02 },
    linear: [0.9, 16],
    recomb: [
      [0.98, 0.06, 0.02],
      [0.02, 0.94, 0.02],
      [0.05, 0.11, 0.78],
    ],
    gamma: 1.04,
    cyan: true,
  },
  interior: {
    modulate: { saturation: 0.7, brightness: 1.05 },
    linear: [0.95, 14],
    recomb: [
      [0.995, 0.035, 0.0],
      [0.01, 0.98, 0.01],
      [0.02, 0.06, 0.9],
    ],
    gamma: 1.1,
    cyan: true,
  },
};

/** Identity, for the film poster: graded in ffmpeg by FILM_VF already. */
PRESETS.film = {
  modulate: { saturation: 1, brightness: 1 },
  linear: [1, 0],
  recomb: null,
  gamma: 1,
};

/** The one sky every hero is pulled to (round 2): a warm grey, #D8D4CB. */
export const SKY_TARGET = [0xd8, 0xd4, 0xcb];

const LONG_EDGE = 2400;

async function raw(pipeline) {
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

function fromRaw({ data, info }) {
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
}

/** Preset values with a per-image `tune` applied over them. */
function tuned(p, tune = {}) {
  const modulate = { ...p.modulate };
  if (tune.hue != null) modulate.hue = tune.hue;
  if (tune.saturation != null) modulate.saturation = tune.saturation;
  if (tune.brightness != null) modulate.brightness = tune.brightness;
  const linear = tune.linear ?? p.linear;
  let recomb = p.recomb;
  if (tune.red || tune.green || tune.blue) {
    const base = recomb ?? [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    recomb = [tune.red ?? base[0], tune.green ?? base[1], tune.blue ?? base[2]].map((r) => [...r]);
  }
  const cyan = tune.cyan ?? p.cyan ?? false;
  const sky = tune.sky === true ? 1 : typeof tune.sky === "number" ? tune.sky : 0;
  const pink = tune.pink ?? 0;
  return { ...p, modulate, linear, recomb, cyan, sky, pink };
}

/** Output gamma, x ^ (1/g), in place. */
function gammaPass({ data }, g) {
  const lut = new Uint8Array(256);
  for (let v = 0; v < 256; v++) lut[v] = Math.round(255 * Math.pow(v / 255, 1 / g));
  for (let i = 0; i < data.length; i++) data[i] = lut[data[i]];
}

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Hue-selective cyan pass (round 2, banned list: cyan pools). Pixels with a
 * hue of 160 to 200 degrees and a saturation above about .10 keep 15% of
 * their saturation and have their hue pulled to 150 (a grey green). Opus
 * asked for 35%; at 35% and 20% the Belvedere pools still read mint on
 * paper. The edges are feathered (125 to 140 degrees, which also takes the mint the
 * recomb leaves in a pool, and 200 to 215 degrees; saturation .04 to
 * .10, so pale aqua window skies are caught too) so no band appears where a pool meets its coping. Value is kept.
 */
function cyanPass({ data, info }) {
  const n = info.width * info.height;
  const c = info.channels;
  for (let i = 0; i < n; i++) {
    const o = i * c;
    const r = data[o] / 255, g = data[o + 1] / 255, b = data[o + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    if (max === 0 || d === 0) continue;
    const s = d / max;
    let h;
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
    if (h < 0) h += 360;
    const sat = smooth(0.04, 0.1, s);
    const w = Math.min(smooth(125, 140, h), 1 - smooth(200, 215, h)) * sat;
    if (w <= 0) continue;
    // The hue pull stays inside 160 to 200 degrees, so a blue sky in the
    // feathered edge is only desaturated, never turned towards cyan.
    const pull = Math.min(smooth(150, 160, h), 1 - smooth(195, 205, h)) * sat;
    const s2 = s * (1 - w * 0.85);
    const h2 = h + pull * (150 - h);
    // HSV back to RGB at the same value.
    const v = max;
    const C = v * s2;
    const hp = h2 / 60;
    const X = C * (1 - Math.abs((hp % 2) - 1));
    let rr = 0, gg = 0, bb = 0;
    if (hp < 1) [rr, gg, bb] = [C, X, 0];
    else if (hp < 2) [rr, gg, bb] = [X, C, 0];
    else if (hp < 3) [rr, gg, bb] = [0, C, X];
    else if (hp < 4) [rr, gg, bb] = [0, X, C];
    else if (hp < 5) [rr, gg, bb] = [X, 0, C];
    else [rr, gg, bb] = [C, 0, X];
    const m = v - C;
    data[o] = Math.round((rr + m) * 255);
    data[o + 1] = Math.round((gg + m) * 255);
    data[o + 2] = Math.round((bb + m) * 255);
  }
}

/**
 * Round 3 pink pass (`tune.pink`, strength 0 to 1): pixels of hue 300 to 360
 * and 0 to 15 degrees (magenta, pink, the copper beech's maroon) lose up to
 * `strength` of their saturation and are pulled towards 20 degrees, a dusty
 * rose. Feathered at both ends so skin of stone and terracotta are left alone.
 */
function pinkPass({ data, info }, strength) {
  const n = info.width * info.height;
  const c = info.channels;
  for (let i = 0; i < n; i++) {
    const o = i * c;
    const r = data[o] / 255, g = data[o + 1] / 255, b = data[o + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    if (max === 0 || d === 0) continue;
    const s = d / max;
    let h;
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
    if (h < 0) h += 360;
    // Distance into the pink band, measured around 0 degrees.
    const hh = h > 180 ? h - 360 : h; // -180..180, pink is -60..15
    const w = Math.min(smooth(-70, -55, hh), 1 - smooth(10, 22, hh)) * smooth(0.12, 0.25, s) * strength;
    if (w <= 0) continue;
    const s2 = s * (1 - w * 0.8);
    let h2 = hh + w * (20 - hh) * 0.6;
    if (h2 < 0) h2 += 360;
    const v = max;
    const C = v * s2;
    const hp = h2 / 60;
    const X = C * (1 - Math.abs((hp % 2) - 1));
    let rr = 0, gg = 0, bb = 0;
    if (hp < 1) [rr, gg, bb] = [C, X, 0];
    else if (hp < 2) [rr, gg, bb] = [X, C, 0];
    else if (hp < 3) [rr, gg, bb] = [0, C, X];
    else if (hp < 4) [rr, gg, bb] = [0, X, C];
    else if (hp < 5) [rr, gg, bb] = [X, 0, C];
    else [rr, gg, bb] = [C, 0, X];
    const m = v - C;
    data[o] = Math.round((rr + m) * 255);
    data[o + 1] = Math.round((gg + m) * 255);
    data[o + 2] = Math.round((bb + m) * 255);
  }
}

/** Sky mask weight at row y, luminance l (0..1): the upper frame, bright pixels only. */
function skyWeight(y, h, l) {
  return (1 - smooth(0.25, 0.5, y / h)) * smooth(0.42, 0.66, l);
}

/**
 * Mean RGB of the top 12% of a raw image, weighted by the sky mask (pine
 * canopy and roofs count for little). Exported for the QA sampler.
 */
export function skyMean({ data, info }) {
  const c = info.channels;
  const rows = Math.round(info.height * 0.12);
  const sum = [0, 0, 0];
  let wsum = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < info.width; x++) {
      const o = (y * info.width + x) * c;
      const l = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
      const w = skyWeight(y, info.height, l);
      sum[0] += w * data[o];
      sum[1] += w * data[o + 1];
      sum[2] += w * data[o + 2];
      wsum += w;
    }
  }
  return wsum > 0 ? sum.map((v) => v / wsum) : null;
}

/**
 * Graduated sky pass (round 2). Inside the sky mask the chroma is halved,
 * then every masked pixel takes the offset that moves the top 12% mean onto
 * SKY_TARGET, scaled by the mask and `strength`. Cloud texture is kept; the
 * mask fades out between 25% and 50% of the height and on darker pixels, so
 * the sea, the pines and the house below are untouched.
 */
function skyPass(img, strength) {
  const { data, info } = img;
  const c = info.channels;
  const w = info.width, h = info.height;
  const graded = skyMean(img);
  const masks = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x, o = i * c;
      const l = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
      const m = skyWeight(y, h, l) * strength;
      masks[i] = m;
      if (m <= 0) continue;
      const lum = l * 255;
      const k = 1 - m * 0.5;
      for (let ch = 0; ch < 3; ch++) data[o + ch] = Math.round(lum + (data[o + ch] - lum) * k);
    }
  }
  const before = skyMean(img);
  if (!before) return null;
  // The measured mean is mask weighted, so a full offset on a part-weighted
  // pixel would fall short: scale by sum(m) / sum(m^2) over the top 12%
  // (capped at 2) so the mean lands on the target.
  let s1 = 0, s2 = 0;
  for (let i = 0; i < w * Math.round(h * 0.12); i++) {
    const m = masks[i] / (strength || 1);
    s1 += m;
    s2 += m * m;
  }
  const k = s2 > 0 ? Math.min(2, s1 / s2) : 1;
  const off = SKY_TARGET.map((t, ch) => (t - before[ch]) * k);
  for (let i = 0; i < w * h; i++) {
    const m = masks[i];
    if (m <= 0) continue;
    const o = i * c;
    for (let ch = 0; ch < 3; ch++) data[o + ch] = Math.max(0, Math.min(255, Math.round(data[o + ch] + off[ch] * m)));
  }
  return { before: graded, after: skyMean(img) };
}

/**
 * Round 3 retouch. Each patch covers a blemish (`to`, `[left, top, width,
 * height]` as fractions of the oriented source) with a feathered edge so no
 * seam shows. With `from` (a top left corner) it copies that clean area of the
 * source over the blemish; without it, it lays a median-filtered copy of the
 * source over it, which takes out a thin line (a contrail, a crane jib, a
 * wire) and keeps the smooth sky around it. Runs before `extract`.
 */
async function retouch(r, patches) {
  const { data, info } = r;
  const { width: W, height: H, channels: c } = info;
  const src = Buffer.from(data);
  let healed = null;
  if (patches.some((p) => !p.from)) {
    healed = (await raw(fromRaw({ data: src, info }).median(35))).data;
  }
  for (const { from, to } of patches) {
    const dx = Math.round(to[0] * W), dy = Math.round(to[1] * H);
    const pw = Math.round(to[2] * W), ph = Math.round(to[3] * H);
    const sx = from ? Math.round(from[0] * W) : dx, sy = from ? Math.round(from[1] * H) : dy;
    const pool = from ? src : healed;
    const f = Math.max(2, Math.round(Math.min(pw, ph) * 0.25));
    for (let y = 0; y < ph; y++) {
      for (let x = 0; x < pw; x++) {
        const tx = dx + x, ty = dy + y, fx = sx + x, fy = sy + y;
        if (tx < 0 || ty < 0 || tx >= W || ty >= H || fx < 0 || fy < 0 || fx >= W || fy >= H) continue;
        const edge = Math.min(x, y, pw - 1 - x, ph - 1 - y);
        const a = smooth(0, f, edge);
        const o = (ty * W + tx) * c, so = (fy * W + fx) * c;
        for (let ch = 0; ch < 3; ch++) data[o + ch] = Math.round(data[o + ch] * (1 - a) + pool[so + ch] * a);
      }
    }
  }
}

/**
 * An oriented sharp pipeline, retouched by `patches` and cut to `extract`
 * (fractions of the source) when given.
 */
async function source(input, extract, patches) {
  let img = sharp(input).rotate();
  if (patches?.length) {
    const r = await raw(img.removeAlpha().toColourspace("srgb"));
    await retouch(r, patches);
    img = fromRaw(r);
  }
  if (!extract) return img;
  const meta = await sharp(input).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;
  const [l, t, ew, eh] = extract;
  const left = Math.round(l * w);
  const top = Math.round(t * h);
  return img.extract({
    left,
    top,
    width: Math.min(Math.round(ew * w), w - left),
    height: Math.min(Math.round(eh * h), h - top),
  });
}

/**
 * Grade one file to a JPEG at `out`. Exported for scripts/contact-sheet.mjs.
 * `opts`: { extract, tune, sharpen = .4, quality = 84 }.
 */
export async function gradeFile(input, out, presetName, opts = {}) {
  const base = PRESETS[presetName];
  if (!base) throw new Error(`Unknown preset ${presetName}`);
  const p = tuned(base, opts.tune);

  // Pass 1: orient, cut, size, modulate (sharp runs modulate after resize).
  let img = await raw(
    (await source(input, opts.extract, opts.patches))
      .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
      .removeAlpha()
      .toColourspace("srgb")
      .modulate(p.modulate),
  );
  // Pass 2: linear on its own (sharp would otherwise run it last).
  img = await raw(fromRaw(img).linear(p.linear[0], p.linear[1]));
  // Pass 3: recomb.
  let last = fromRaw(img);
  if (p.recomb) last = last.recomb(p.recomb);
  // Pass 4: output gamma as a lookup table on raw pixels (x ^ (1/g), the
  // same lift sharp's `gamma(1, g)` gives when a sharpen follows it; without
  // one, sharp darkens instead, so it is no longer left to sharp), then the
  // round 2 cyan pass and sky pass.
  let sky = null;
  if (p.gamma !== 1 || p.cyan || p.sky > 0 || p.pink > 0) {
    img = await raw(last);
    if (p.gamma !== 1) gammaPass(img, p.gamma);
    if (p.cyan) cyanPass(img);
    if (p.pink > 0) pinkPass(img, p.pink);
    if (p.sky > 0) sky = skyPass(img, p.sky);
    last = fromRaw(img);
  }
  // Round 3: `tune.sharpen` 0 leaves an image unsharpened (the Bastide
  // garden frames, whose HDR foliage already carries halos).
  const sigma = opts.tune?.sharpen ?? opts.sharpen ?? 0.4;
  if (sigma > 0) last = last.sharpen({ sigma });

  mkdirSync(dirname(out), { recursive: true });
  await last.jpeg({ quality: opts.quality ?? 84, mozjpeg: true }).toFile(out);
  return { sky };
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
        opts: { extract: ph.extract, tune: ph.tune, patches: ph.patches },
      });
    }
  }
  for (const a of deployedAtmosphere) {
    list.push({
      key: a.name,
      input: join(ORIG, "atmosphere", `${a.name}.jpg`),
      out: join(PUB, "atmosphere", `${a.name}.jpg`),
      preset: a.grade,
      opts: { extract: a.extract, tune: a.tune, quality: a.quality },
    });
  }
  return list;
}

/**
 * The hero film's grade (round 3), shared with scripts/encode-video.sh, which
 * reads it from here so the poster and the film cannot drift apart. The clip
 * (Pexels 4279371, 2560 x 1440) is an aerial over a teal sea under a white
 * sky. Saturation goes to .08, then per-channel curves split-tone it: the
 * water to a cool silver (#7C8082 to #A8AAA9 from the shallows to the
 * horizon) and the sky to a warm grey (#DAD4C8, near SKY_TARGET), so it sits
 * with the sailboat and the paper. Contrast is held low, as dawn light.
 */
export const FILM_NAME = "sea-pale-horizon";
export const FILM_VF = [
  "hue=s=0.08",
  "curves=" +
    "r='0/0.12 0.333/0.486 0.475/0.58 0.604/0.659 0.8/0.812 0.875/0.855 1/0.93':" +
    "g='0/0.13 0.333/0.502 0.475/0.593 0.604/0.667 0.8/0.792 0.875/0.831 1/0.91':" +
    "b='0/0.14 0.333/0.51 0.475/0.596 0.604/0.663 0.8/0.753 0.875/0.784 1/0.87'",
].join(",");

/**
 * Poster (round 3): the first frame the loop plays (1 s into the source, as
 * the encode trims the first second for the loop dissolve), from the full
 * 2560 x 1440 source through FILM_VF, then 2400px wide, sharpen .5, q90.
 * No photo preset on top: the film's own grade is the grade.
 */
async function poster() {
  const film = join(ORIG, "video", `${FILM_NAME}.mp4`);
  const frame = join(tmpdir(), "aubemar-poster-frame.png");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1", "-i", film, "-vf", FILM_VF, "-frames:v", "1", frame]);
  await gradeFile(frame, join(PUB, "video", `${FILM_NAME}-poster.jpg`), "film", {
    sharpen: 0.5,
    quality: 90,
  });
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
  const rgb = (v) => v.map((x) => Math.round(x)).join(",");
  for (const j of list) {
    const { sky } = await gradeFile(j.input, j.out, j.preset, j.opts);
    if (sky) console.log(`sky ${j.out.slice(PUB.length + 1)}  top 12% ${rgb(sky.before)} -> ${rgb(sky.after)}`);
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
