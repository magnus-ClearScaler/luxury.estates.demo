#!/usr/bin/env bash
# Hero film (brief 7.3, owner round 1). Run once locally; the outputs in
# public/video are committed, this is not a build step.
#
#   assets/originals/video/sea-surface-warm-dusk.mp4
#     The Pexels original download of 33251147 (14166155_1920_1080_24fps.mp4,
#     1920x1080, 24 fps, 30.125 s, about 4.9 Mbps, 18 MB). Round 1 replaced the
#     earlier 3.3 Mbps copy. Pexels serves no rendition above 1080p for this
#     clip (checked 2026-10-09: /download/video/33251147/ redirects to the
#     1920x1080 file). The softness that remains is the clip's shallow depth
#     of field, not compression.
#     Round 2 (2026-10-09) checked again: the Pexels CDN has only
#     14166155_1920_1080_24fps.mp4 for this clip; the 2560x1440 and 3840x2160
#     names return 403 and /download/video/33251147/ still redirects to the
#     1080p file. So the encodes are unchanged and the desktop film is framed
#     at object-position 50% 30% instead (src/app/globals.css): the inset box
#     is about 2.15:1 and that keeps the horizon and the in-focus middle band
#     of the water, not the blurred foreground. sea-overcast-calm (34727351)
#     was graded as an alternative for the owner to compare
#     (docs/qa/r2/hero-film-options.jpg) but its water stays teal under the
#     warm tune, so it is not deployed.
#     The alternate sea-pale-horizon (4279371) exists at 2560x1440, but it is
#     an aerial over a teal sea and would need a heavy grade to sit with the
#     beige and silver set, so the dusk clip stays.
#
#   -> public/video/sea-surface-warm-dusk-1080.mp4   H.264 CRF 22, slow, tune film
#      public/video/sea-surface-warm-dusk-720.mp4    H.264 CRF 26 (under 768px)
#      public/video/sea-surface-warm-dusk-1080.webm  VP9 CRF 32
#      public/video/sea-surface-warm-dusk-720.webm   VP9 CRF 36
#      public/video/sea-surface-warm-dusk-poster.jpg via scripts/grade.mjs
#
# The loop join is dissolved over 1 s: the first second of the clip is faded
# in over the last second of the rest, so the file ends on the frame it starts
# from (29.125 s). Audio stripped. The film gets the same light touch as the
# `soft` photo preset (saturation .9, values x .969 + 8) so the poster, which
# scripts/grade.mjs grades `soft`, does not shift when the video fades in.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=assets/originals/video/sea-surface-warm-dusk.mp4
OUT=public/video
NAME=sea-surface-warm-dusk
mkdir -p "$OUT"

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
OFFSET=$(awk -v d="$DUR" 'BEGIN { printf "%.3f", d - 2 }')

GRADE="eq=saturation=0.9,lutrgb=r='clip(val*0.969+8,0,255)':g='clip(val*0.969+8,0,255)':b='clip(val*0.969+8,0,255)'"
LOOP="[0:v]${GRADE},split[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[body];[b]trim=end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=${OFFSET},format=yuv420p"

MASTER=$(mktemp -t aubemar-film).mkv
trap 'rm -f "$MASTER"' EXIT
ffmpeg -y -loglevel error -i "$SRC" -filter_complex "$LOOP" -an -c:v libx264 -preset slow -crf 6 "$MASTER"

X264=(-an -c:v libx264 -preset slow -tune film -profile:v high -pix_fmt yuv420p -movflags +faststart)
VP9=(-an -c:v libvpx-vp9 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p)

ffmpeg -y -loglevel error -i "$MASTER" "${X264[@]}" -crf 22 "$OUT/$NAME-1080.mp4"
ffmpeg -y -loglevel error -i "$MASTER" -vf "scale=-2:720:flags=lanczos" "${X264[@]}" -crf 26 "$OUT/$NAME-720.mp4"
ffmpeg -y -loglevel error -i "$MASTER" "${VP9[@]}" -crf 32 "$OUT/$NAME-1080.webm"
ffmpeg -y -loglevel error -i "$MASTER" -vf "scale=-2:720:flags=lanczos" "${VP9[@]}" -crf 36 "$OUT/$NAME-720.webm"

# Poster: a lossless PNG frame at 2 s, graded `soft`, light unsharp, q90.
node --no-warnings scripts/grade.mjs --only poster

ls -la "$OUT"
