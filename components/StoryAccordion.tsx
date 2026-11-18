"use client";

import { Accordion } from "@heroui/react";
import Icon from "@/components/Icon";

export type StoryItem = { title: string; paragraphs: readonly string[] };

export default function StoryAccordion({ items }: { items: readonly [StoryItem, ...StoryItem[]] }) {
  return (
    <Accordion
      defaultExpandedKeys={[items[0].title]}
      className="mt-12 max-w-xl border-t border-black lg:mt-20"
    >
      {items.map(({ title, paragraphs }) => (
        <Accordion.Item key={title} id={title} className="[--separator:rgb(0_0_0/0.15)]">
          <Accordion.Heading>
            <Accordion.Trigger className="group px-0 py-6 text-xl hover:bg-transparent!">
              {title}
              <Icon
                name="plus"
                className="size-5 shrink-0 transition-transform duration-300 ease-out-soft group-aria-expanded:rotate-45 motion-reduce:transition-none"
              />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="max-w-lg space-y-4 px-0 pb-8 text-[15px] leading-[1.6] text-black">
              {paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
