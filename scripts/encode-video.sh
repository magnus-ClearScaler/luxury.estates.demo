#!/usr/bin/env bash
# Hero film (brief 7.3, owner round 1, bosses round 3). Run once locally; the
# outputs in public/video are committed, this is not a build step.
#
#   assets/originals/video/sea-pale-horizon.mp4
#     Round 3 (2026-10-09): Pexels 4279371, Luis Adolfo Burgos, the top
#     rendition Pexels serves for it (4279371-uhd_3840_2160_30fps.mp4 by
#     name, 2560 x 1440 in fact, 29.97 fps, 15.5 s, about 13.7 Mbps, 27 MB).
#     It replaces sea-surface-warm-dusk (Pexels 33251147), the owner's one
#     open ask from round 1: that clip is a macro of the sea surface with a
#     shallow depth of field, only a mid band in focus, and Pexels has no
#     rendition of it above 1920 x 1080 (/download/video/33251147/ redirects
#     to the 1080p file; the 2560 and 3840 names return 403), so no encode
#     could make it crisp at 1440. The aerial is sharp edge to edge. Its sea
#     is teal, so it is graded hard (FILM_VF in scripts/grade.mjs: near
#     monochrome, silver water, warm grey sky). The warm-dusk original stays
#     in assets/originals/video, not deployed.
#
#   -> public/video/sea-pale-horizon-1080.mp4   H.264 CRF 24 (brief 7.3), slow, tune film
#      public/video/sea-pale-horizon-720.mp4    H.264 CRF 26 (under 768px)
#      public/video/sea-pale-horizon-1080.webm  VP9 CRF 33
#      public/video/sea-pale-horizon-720.webm   VP9 CRF 37
#      public/video/sea-pale-horizon-poster.jpg via scripts/grade.mjs, 2400px
#
# Both sizes are downscaled (lanczos) from the 2560 x 1440 master, which is
# what makes the 1080p file crisp. The loop join is dissolved over 1 s: the
# first second of the clip is faded in over the last second of the rest, so
# the file ends on the frame it starts from. Audio stripped.
set -euo pipefail
cd "$(dirname "$0")/.."

NAME=$(node --no-warnings -e 'import("./scripts/grade.mjs").then((m) => console.log(m.FILM_NAME))')
GRADE=$(node --no-warnings -e 'import("./scripts/grade.mjs").then((m) => console.log(m.FILM_VF))')
SRC=assets/originals/video/$NAME.mp4
OUT=public/video
mkdir -p "$OUT"

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
OFFSET=$(awk -v d="$DUR" 'BEGIN { printf "%.3f", d - 2 }')

LOOP="[0:v]${GRADE},split[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[body];[b]trim=end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=${OFFSET},format=yuv420p"

MASTER=$(mktemp -t aubemar-film).mkv
trap 'rm -f "$MASTER"' EXIT
ffmpeg -y -loglevel error -i "$SRC" -filter_complex "$LOOP" -an -c:v libx264 -preset slow -crf 6 "$MASTER"

X264=(-an -c:v libx264 -preset slow -tune film -profile:v high -pix_fmt yuv420p -movflags +faststart)
VP9=(-an -c:v libvpx-vp9 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p)
S1080="scale=-2:1080:flags=lanczos"
S720="scale=-2:720:flags=lanczos"

ffmpeg -y -loglevel error -i "$MASTER" -vf "$S1080" "${X264[@]}" -crf 24 "$OUT/$NAME-1080.mp4"
ffmpeg -y -loglevel error -i "$MASTER" -vf "$S720" "${X264[@]}" -crf 26 "$OUT/$NAME-720.mp4"
ffmpeg -y -loglevel error -i "$MASTER" -vf "$S1080" "${VP9[@]}" -crf 33 "$OUT/$NAME-1080.webm"
ffmpeg -y -loglevel error -i "$MASTER" -vf "$S720" "${VP9[@]}" -crf 37 "$OUT/$NAME-720.webm"

# Poster: the loop's first frame at full size, graded by FILM_VF, 2400px, q90.
node --no-warnings scripts/grade.mjs --only poster

ls -la "$OUT"
