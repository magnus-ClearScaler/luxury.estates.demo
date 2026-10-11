#!/bin/sh
# Splits the two web fonts into a small first file and a rest-of-latin file,
# the way Google Fonts splits by unicode-range, so the first screen downloads
# only the glyphs the site sets (PSI pass 1). Rendering is unchanged: the
# outlines, both axes of Newsreader (weight 300 to 400, optical size whole)
# and Jost's 300 to 400 range are kept; a character outside the first file
# (typed into the form, say) loads the second file and renders as before.
#
# Sources: src/fonts/newsreader-latin-300-400.woff2 (see layout.tsx) and
# src/fonts/jost-latin.woff2 (the latin file next/font/google served).
# Needs fontTools with brotli: pip install fonttools brotli
# Every OpenType feature is kept (`--layout-features=*`): the small type sets
# tabular figures (tnum). Bump V when the output changes so the immutable
# cache is never stale.
set -e
cd "$(dirname "$0")/.."
V=2
OUT=public/fonts
TMP=$(mktemp -d)
# ASCII, the French letters, and the marks the copy sets.
FIRST="U+0020-007E,U+00A0,U+00A9,U+00B2,U+00B7,U+00C0,U+00C2,U+00C7-00CB,U+00CE-00CF,U+00D4,U+00D9,U+00DB,U+00E0,U+00E2,U+00E7-00EB,U+00EE-00EF,U+00F4,U+00F6,U+00F9,U+00FB-00FC,U+2018-2019,U+201C-201D,U+2026,U+20AC"
# The rest of Google's latin range.
REST="U+0000-001F,U+007F-009F,U+00A1-00A8,U+00AA-00B1,U+00B3-00B6,U+00B8-00BF,U+00C1,U+00C3-00C6,U+00CC-00CD,U+00D0-00D3,U+00D5-00D8,U+00DA,U+00DC-00DF,U+00E1,U+00E3-00E6,U+00EC-00ED,U+00F0-00F3,U+00F5,U+00F7-00F8,U+00FA,U+00FD-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-2017,U+201A-201B,U+201E-2025,U+2027-206F,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

python3 -m fontTools.varLib.instancer src/fonts/jost-latin.woff2 wght=300:400 -o "$TMP/jost.ttf" >/dev/null

sub() { python3 -m fontTools.subset "$1" --unicodes="$2" --layout-features="*" --flavor=woff2 --output-file="$3"; }
sub src/fonts/newsreader-latin-300-400.woff2 "$FIRST" "$OUT/newsreader-a.v$V.woff2"
sub src/fonts/newsreader-latin-300-400.woff2 "$REST" "$OUT/newsreader-b.v$V.woff2"
sub "$TMP/jost.ttf" "$FIRST" "$OUT/jost-a.v$V.woff2"
sub "$TMP/jost.ttf" "$REST" "$OUT/jost-b.v$V.woff2"
rm -r "$TMP"
ls -l "$OUT"
