"use client";

import { useEffect } from "react";

// A URL hash never reaches the server, so next.config redirects can't forward these old Product anchors.
const moved: Readonly<Record<string, string>> = {
  "#revenue": "/resources/clinic-planning",
  "#security": "/security",
};

export default function MovedSections() {
  useEffect(() => {
    const target = moved[window.location.hash];
    if (target) window.location.replace(target);
  }, []);
  return null;
}
