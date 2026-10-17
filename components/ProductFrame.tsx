export default function ProductFrame({
  label,
  caption,
  children,
}: {
  label: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure data-reveal>
      <div className="overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_12px_40px_rgba(11,14,50,0.06)]">
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate">{label}</span>
        </div>
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-current opacity-70">{caption}</figcaption>
      )}
    </figure>
  );
}
