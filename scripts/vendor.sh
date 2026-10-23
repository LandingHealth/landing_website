#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
dir=src/lib/vendor/magic
items=${*:-$(ls "$dir")}
backup=$(mktemp -d)
cp package.json "$backup"
# The CLI rewrites dependency ranges. Pins are ours.
trap 'cp "$backup/package.json" .; rm -rf "$backup"' EXIT
set --
for item in $items; do
  rm -rf "${dir:?}/$item"
  set -- "$@" "https://sv-animations.vercel.app/r/$item.json"
done
pnpm dlx shadcn-svelte@1.7.0 add "$@" --yes --no-deps-install
