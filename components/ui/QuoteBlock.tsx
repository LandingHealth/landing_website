export default function QuoteBlock({
  quote,
  role,
  org,
  className = "",
}: {
  quote: string;
  role: string;
  org?: string;
  className?: string;
}) {
  return (
    <figure className={`max-w-xl px-3 ${className}`}>
      <blockquote className="text-base leading-[1.25] text-pretty">“{quote}”</blockquote>
      <figcaption className="mt-5 text-base leading-[1.5]">
        <span className="block text-blue">{role}</span>
        {org && <span className="block text-mute">{org}</span>}
      </figcaption>
    </figure>
  );
}
