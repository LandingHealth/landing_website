// Ported from Uiverse.io by ClawHack1 (MIT).
const colors = ["#007aff", "#ff2d55", "#34c759", "#ff9500"] as const;
const stagger = 250;

export default function LoadingDots() {
  return (
    <div aria-hidden="true" className="flex gap-4">
      {colors.map((color, i) => (
        <span
          key={color}
          className="size-7 rounded-full motion-safe:animate-loading-dot"
          style={{ backgroundColor: color, animationDelay: `${i * stagger}ms` }}
        />
      ))}
    </div>
  );
}
