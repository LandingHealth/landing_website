"use client";

import { useEffect, useRef } from "react";
import type { Beat } from "@/lib/safesock";
import { container, type } from "@/lib/site";

const FADE = 0.18;
const EASE = 0.22;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function beatOpacity(time: number, beat: Beat, first: boolean, last: boolean) {
  const fadeIn = first ? 1 : clamp((time - beat.from) / FADE);
  const fadeOut = last ? 1 : clamp((beat.to - time) / FADE);
  return Math.min(fadeIn, fadeOut);
}

// On desktop the video area is a size container, so the video takes the largest 1600x870 box that fits. Phones crop the sides a little for a larger render.
const feather = "linear-gradient(to right, transparent, black 7%, black 93%, transparent)";
const featherY = "linear-gradient(to bottom, transparent, black 7%, black 93%, transparent)";

export default function ScrubStage({
  src,
  poster,
  duration,
  beats,
}: {
  src: string;
  poster: string;
  duration: number;
  beats: readonly Beat[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const captions = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const trackEl = track.current;
    const stageEl = stage.current;
    const videoEl = video.current;
    if (!trackEl || !stageEl || !videoEl || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    videoEl.preload = "auto";
    videoEl.load();
    // Safari paints a seeked frame only once playback has started, so start and stop it at the first frame.
    videoEl.play().then(() => videoEl.pause(), () => {});

    const stickyTop = parseFloat(getComputedStyle(stageEl).top) || 0;
    let shown = 0;
    let frame = 0;
    let visible = false;

    const render = () => {
      frame = 0;
      const rect = trackEl.getBoundingClientRect();
      const travel = rect.height - stageEl.offsetHeight;
      const progress = travel > 0 ? clamp((stickyTop - rect.top) / travel) : 0;
      const end = (Number.isFinite(videoEl.duration) ? videoEl.duration : duration) - 0.04;
      const target = progress * end;
      shown += (target - shown) * EASE;
      if (Math.abs(target - shown) < 0.002) shown = target;

      if (videoEl.readyState >= 1 && !videoEl.seeking && Math.abs(videoEl.currentTime - shown) > 0.004) {
        videoEl.currentTime = shown;
      }
      bar.current?.style.setProperty("transform", `scaleX(${progress})`);
      beats.forEach((beat, index) => {
        const caption = captions.current[index];
        if (!caption) return;
        const opacity = beatOpacity(shown, beat, index === 0, index === beats.length - 1);
        caption.style.opacity = String(opacity);
        caption.style.transform = `translateY(${(1 - opacity) * 12}px)`;
      });

      if (visible || shown !== target) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(render);
    });
    observer.observe(trackEl);
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    videoEl.addEventListener("loadedmetadata", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      videoEl.removeEventListener("loadedmetadata", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [beats, duration]);

  return (
    <div ref={track} data-safesock-stage className="relative h-[400svh] motion-reduce:hidden">
      <div ref={stage} className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
        <div className="relative flex items-center justify-center lg:min-h-0 lg:flex-1 lg:[container-type:size]">
          <video
            ref={video}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
            className="aspect-[1600/870] w-[min(120vw,calc((100svh-20rem)*1600/870))] max-w-none shrink-0 object-cover lg:w-[min(100cqw,calc(100cqh*1600/870))]"
            style={{
              maskImage: `${feather}, ${featherY}`,
              WebkitMaskImage: `${feather}, ${featherY}`,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <p className={`${type.label} absolute -top-7 left-4 text-mute sm:left-10 lg:top-4 lg:left-20`}>Concept render</p>
        </div>
        <div className={`${container} flex shrink-0 flex-col items-center pt-4 pb-8 text-center lg:pt-2 lg:pb-10`}>
          <span aria-hidden className="block h-0.5 w-32 overflow-hidden rounded-full bg-hair">
            <span ref={bar} className="block h-full origin-left bg-blue" style={{ transform: "scaleX(0)" }} />
          </span>
          <h2 className="sr-only">The design, step by step</h2>
          <ol className="mt-6 grid w-full max-w-2xl">
            {beats.map((beat, index) => (
              <li
                key={beat.id}
                ref={(element) => {
                  captions.current[index] = element;
                }}
                className="[grid-area:1/1]"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <h3 className={type.h2}>{beat.title}</h3>
                <p className={`${type.lead} mx-auto mt-3 max-w-xl text-pretty`}>{beat.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
