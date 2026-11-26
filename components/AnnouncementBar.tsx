import Link from "next/link";
import { announcement, container } from "@/lib/site";

export default function AnnouncementBar() {
  if (!announcement) return null;
  const { text, shortText, href, action } = announcement;

  return (
    <div className="bg-blue text-white">
      <p className={`${container} flex h-10 items-center justify-center gap-3 text-sm`}>
        <span className="sm:hidden">{shortText}</span>
        <span className="hidden min-w-0 truncate sm:inline">{text}</span>
        <Link
          href={href}
          className="shrink-0 rounded-sm font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {action} →
        </Link>
      </p>
    </div>
  );
}
