#!/usr/bin/env node
/**
 * Fails (exit 1) on any en dash (U+2013) or em dash (U+2014) in src/ or data/
 * (brief 11.2, 11.9.1). Runs on `prebuild`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["src", "data"];
const TEXT = /\.(tsx?|jsx?|mjs|cjs|css|json|md|txt|svg|html)$/i;
const DASH = /[–—]/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (TEXT.test(name)) yield p;
  }
}

const hits = [];
for (const d of DIRS) {
  for (const file of walk(join(ROOT, d))) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (DASH.test(line)) hits.push(`${relative(ROOT, file)}:${i + 1}: ${line.trim().slice(0, 120)}`);
      });
  }
}

if (hits.length) {
  console.error(`check-copy: ${hits.length} line(s) with an en or em dash:\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("check-copy: no en or em dashes in src/ or data/");
