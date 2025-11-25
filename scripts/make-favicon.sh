#!/usr/bin/env zsh
set -euo pipefail

PUB_DIR="$(cd "$(dirname "$0")/.." && pwd)/public"
INPUT="$PUB_DIR/logo.png"
OUTPUT="$PUB_DIR/favicon.ico"

if [ ! -f "$INPUT" ]; then
  echo "Error: $INPUT not found. Drop your logo at public/logo.png (ideally 512x512 PNG)." >&2
  exit 1
fi

# Use ImageMagick in a disposable Docker container to generate a multi-size .ico
# Sizes include the common favicon set.
echo "Generating multi-size favicon from logo.png ..."
# Use a fuller ImageMagick build that includes PNG delegates.
docker run --rm -v "$PUB_DIR":/work v4tech/imagemagick \
  magick /work/logo.png -background none -resize 512x512^ -gravity center -extent 512x512 \
  -define icon:auto-resize=256,128,64,48,32,16 /work/favicon.ico || {
    echo "ImageMagick container failed. Creating simple placeholder favicon instead." >&2
    docker run --rm -v "$PUB_DIR":/work v4tech/imagemagick \
      magick -size 512x512 canvas:none -fill "#00FF5E" -draw "roundrectangle 0,0 512,512 96,96" \
      -define icon:auto-resize=256,128,64,48,32,16 /work/favicon.ico
  }

if [ -f "$OUTPUT" ]; then
  echo "Generated $OUTPUT"
else
  echo "Failed to generate favicon.ico" >&2
  exit 1
fi
