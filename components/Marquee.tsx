export default function Marquee({
  children,
  className = "",
  repeat = 4,
}: {
  children: React.ReactNode;
  className?: string;
  repeat?: number;
}) {
  return (
    <div className={`group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem] ${className}`}>
      {Array.from({ length: repeat }, (_, index) => (
        <ul
          key={index}
          aria-hidden={index > 0 || undefined}
          className={`flex shrink-0 flex-row justify-around gap-(--gap) motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center${index > 0 ? " motion-reduce:hidden" : ""}`}
        >
          {children}
        </ul>
      ))}
    </div>
  );
}
