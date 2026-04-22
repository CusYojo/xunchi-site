#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/assets/img/products"
OUT_DIR="$ROOT_DIR/assets/img/product-thumbs"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Source directory not found: $SRC_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

find "$SRC_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) | while IFS= read -r src; do
  rel="${src#"$SRC_DIR"/}"
  out="$OUT_DIR/${rel%.*}.jpg"
  mkdir -p "$(dirname "$out")"
  sips -s format jpeg -s formatOptions 45 -Z 480 "$src" --out "$out" >/dev/null
done

echo "Generated thumbnails in $OUT_DIR"
