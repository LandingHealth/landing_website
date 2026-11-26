const arcs = [
  "M-40 120 C 180 150, 330 260, 420 420",
  "M-40 230 C 140 220, 290 300, 360 420",
  "M-40 330 C 90 330, 200 370, 260 420",
] as const;

function Side({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 420 420" fill="none" className={`absolute top-0 h-[26rem] w-[26rem] ${className}`}>
      {arcs.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
      ))}
    </svg>
  );
}

export default function HeroArcs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden overflow-hidden text-hair lg:block">
      <div className="relative mx-auto h-[26rem] max-w-[1440px]">
        <Side className="left-0" />
        <Side className="right-0 -scale-x-100" />
      </div>
    </div>
  );
}
