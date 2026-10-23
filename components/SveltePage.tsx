import { render } from "svelte/server";
import SveltePageClient from "@/components/SveltePageClient";
import { pages, type PageName } from "$lib/pages";

export default async function SveltePage({ name }: { name: PageName }) {
  const { default: Body } = await pages[name]();
  const { head, body } = render(Body);
  return <SveltePageClient name={name} head={head} body={body} />;
}
