const WORDS = [
  "BACKEND DEVELOPMENT",
  "REST API DESIGN",
  ".NET & C#",
  "POSTGRESQL",
  "DATA SCIENCE",
  "MACHINE LEARNING",
];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-border py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">{w}</span>
            <span className="size-1 rounded-full bg-hero-accent/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
