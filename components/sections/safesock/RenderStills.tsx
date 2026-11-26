import Image from "next/image";
import type { Beat } from "@/lib/safesock";
import { container, type } from "@/lib/site";

// Shown instead of the scroll-scrubbed render under reduced motion, and without JavaScript through the page's noscript rule.
export default function RenderStills({ beats }: { beats: readonly Beat[] }) {
  return (
    <div data-safesock-stills className={`${container} hidden py-16 motion-reduce:block lg:py-20`}>
      <h2 className="sr-only">The design, step by step</h2>
      <ol className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {beats.map(({ id, title, body, still }) => (
          <li key={id}>
            <figure>
              <Image
                src={still.src}
                alt={still.alt}
                width={still.width}
                height={still.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full rounded-3xl"
              />
              <figcaption className="mt-5">
                <h3 className={type.h3}>{title}</h3>
                <p className={`${type.body} mt-2`}>{body}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <p className={`${type.label} mt-10 text-mute`}>Concept renders</p>
    </div>
  );
}
