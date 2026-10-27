"use client";

import { useEffect, useState } from "react";

// Matches the 400ms in --animate-rotate-in and --animate-rotate-out in globals.css.
const characterDuration = 400;
const characterStagger = 15;

const animationClass = { in: "motion-safe:animate-rotate-in", out: "motion-safe:animate-rotate-out" } as const;

function Characters({ text, animation, delay = 0 }: { text: string; animation?: "in" | "out"; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`col-start-1 row-start-1 whitespace-pre ${animation === "out" ? "motion-reduce:hidden" : ""}`}
    >
      {Array.from(text, (character, i) => (
        <span
          key={i}
          className={`inline-block ${animation ? animationClass[animation] : ""}`}
          style={animation && { animationDelay: `${delay + i * characterStagger}ms` }}
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export default function TextRotate({ texts, interval = 3000 }: { texts: ReadonlyArray<string>; interval?: number }) {
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTurn((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [interval]);

  const current = texts[turn % texts.length];
  const previous = turn > 0 ? texts[(turn - 1) % texts.length] : undefined;
  // The ease-out curve has all but finished halfway through, so the next text starts then.
  const exitTime = previous ? (previous.length - 1) * characterStagger + characterDuration / 2 : 0;

  return (
    <>
      <span className="sr-only">{new Intl.ListFormat("en", { type: "conjunction" }).format(texts)}</span>
      <span className="inline-grid overflow-hidden align-bottom">
        {texts.map((text) => (
          <span key={text} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre">
            {text}
          </span>
        ))}
        {previous && <Characters key={`out-${turn}`} text={previous} animation="out" />}
        <Characters key={`in-${turn}`} text={current} animation={previous === undefined ? undefined : "in"} delay={exitTime} />
      </span>
    </>
  );
}
