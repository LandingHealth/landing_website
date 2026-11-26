import type { CSSProperties } from "react";
import IndexNumber from "@/components/ui/IndexNumber";
import { type } from "@/lib/site";

const revealAttribute = { fade: "", line: "line" } as const;

export default function NumberedRows({
  items,
  heading: Heading = "h3",
  reveal,
  className = "",
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
  heading?: "h2" | "h3";
  reveal?: keyof typeof revealAttribute;
  className?: string;
}) {
  return (
    <ol className={`grid gap-x-10 md:grid-cols-3 ${className}`}>
      {items.map(({ title, body }, index) => (
        <li
          key={title}
          data-reveal={reveal && revealAttribute[reveal]}
          style={reveal && ({ "--reveal-i": index } as CSSProperties)}
          className="border-t border-hair pt-6 pb-8 text-center"
        >
          <IndexNumber index={index} />
          <Heading className={`${type.h3} mt-3`}>{title}</Heading>
          <p className={`${type.body} mx-auto mt-3`}>{body}</p>
        </li>
      ))}
    </ol>
  );
}
