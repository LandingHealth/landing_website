"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-sm text-[15px] text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span aria-live="polite">{copied ? "Link copied" : "Share this page"}</span>
      <Icon name="link" className="size-4" />
    </button>
  );
}
