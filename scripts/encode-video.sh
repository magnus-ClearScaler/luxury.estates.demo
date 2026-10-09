#!/usr/bin/env bash
# Hero film (brief 7.3). Run once locally; the outputs in public/video are
# committed, this is not a build step.
#
#   assets/originals/video/sea-surface-warm-dusk.mp4 (1920x1080, 24 fps, 30.125 s)
#   -> public/video/sea-surface-warm-dusk-1080.mp4   H.264 CRF 24
#      public/video/sea-surface-warm-dusk-720.mp4    H.264 CRF 26 (under 768px)
#      public/video/sea-surface-warm-dusk-1080.webm  VP9 CRF 34
#      public/video/sea-surface-warm-dusk-720.webm   VP9 CRF 36
#
# The loop join is dissolved over 1 s: the first second of the clip is faded
# in over the last second of the rest, so the file ends on the frame it starts
# from (29.125 s). Audio stripped. The film gets the same light touch as the
# `soft` photo preset (saturation .9, values x .969 + 8) so the poster, which
# scripts/grade.mjs grades `soft`, does not shift when the video fades in.
# The poster itself is made by scripts/grade.mjs (ffmpeg -ss 2 -frames:v 1).
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
ffmpeg -y -loglevel error -i "$SRC" -filter_complex "$LOOP" -an -c:v libx264 -preset slow -crf 8 "$MASTER"

ffmpeg -y -loglevel error -i "$MASTER" -an -c:v libx264 -preset slow -crf 24 -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME-1080.mp4"
ffmpeg -y -loglevel error -i "$MASTER" -an -vf "scale=-2:720:flags=lanczos" -c:v libx264 -preset slow -crf 26 -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME-720.mp4"
ffmpeg -y -loglevel error -i "$MASTER" -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/$NAME-1080.webm"
ffmpeg -y -loglevel error -i "$MASTER" -an -vf "scale=-2:720:flags=lanczos" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/$NAME-720.webm"

ls -la "$OUT"
