import { type } from "@/lib/site";

export default function InDevelopment() {
  return <span className={`${type.label} shrink-0 rounded-[4px] bg-blue/10 px-1.5 py-0.5 text-blue`}>In development</span>;
}
