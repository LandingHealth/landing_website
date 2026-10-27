"use client";

import { useEffect, useRef, useState } from "react";

const icon = "absolute top-1.5 size-15 stroke-gray-900";
const redBeforeLockMs = 400;

export default function EncryptionLock() {
  const ref = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let timeout: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timeout = setTimeout(() => setLocked(true), redBeforeLockMs);
        observer.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-locked={locked || undefined}
      className="relative h-18 w-36 rounded-full bg-rose-400 shadow-md transition-colors duration-300 after:absolute after:left-1.5 after:top-1.5 after:size-15 after:rounded-full after:bg-gray-50 after:transition-transform after:duration-300 after:content-[''] data-locked:bg-emerald-500 data-locked:after:translate-x-18 motion-reduce:transition-none motion-reduce:after:transition-none"
    >
      <svg className={`${icon} left-19.5`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z" />
      </svg>
      <svg className={`${icon} left-1.5`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
