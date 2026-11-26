#!/bin/sh
set -eu
cd "$(dirname "$0")"
# Git Bash on Windows needs native paths for Chrome; elsewhere pwd is already native.
native() { if command -v cygpath >/dev/null 2>&1; then cygpath -m "$1"; else printf '%s' "$1"; fi; }
if [ -z "${CHROME:-}" ]; then
  for candidate in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/c/Program Files/Google/Chrome/Application/chrome.exe"; do
    if [ -x "$candidate" ]; then CHROME="$candidate"; break; fi
  done
fi
chrome="${CHROME:?set CHROME to a Chrome binary}"
dir="$(native "$PWD")"
profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT
case "$dir" in /*) page="file://$dir/clinic-flyer.html" ;; *) page="file:///$dir/clinic-flyer.html" ;; esac
"$chrome" --headless=new --disable-gpu --user-data-dir="$(native "$profile")" --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$dir/../public/landing-clinic-flyer.pdf" "$page"
"$chrome" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$(native "$profile")" --force-device-scale-factor=2 \
  --window-size=816,1056 --virtual-time-budget=8000 --screenshot="$dir/../public/landing-clinic-flyer.png" "$page"
