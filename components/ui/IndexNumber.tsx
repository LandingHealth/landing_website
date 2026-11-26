export default function IndexNumber({ index, onDark = false }: { index: number; onDark?: boolean }) {
  return (
    <span aria-hidden className={`font-mono text-base ${onDark ? "text-white/80" : "text-blue"}`}>
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}
