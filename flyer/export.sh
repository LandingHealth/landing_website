#!/bin/sh
set -eu
cd "$(dirname "$0")"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT
page="file://$PWD/clinic-flyer.html"
"$chrome" --headless=new --disable-gpu --user-data-dir="$profile" --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$PWD/../public/landing-clinic-flyer.pdf" "$page"
"$chrome" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$profile" --force-device-scale-factor=2 \
  --window-size=816,1056 --virtual-time-budget=8000 --screenshot="$PWD/../public/landing-clinic-flyer.png" "$page"
