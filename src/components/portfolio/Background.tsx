const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: 1 + (i % 3),
  delay: (i % 7) * 1.2,
  dur: 14 + (i % 5) * 4,
}));

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="absolute -left-40 top-[-10%] size-[38rem] rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute -right-52 top-1/3 size-[34rem] rounded-full bg-accent/15 blur-[150px]" />
      <div className="absolute bottom-[-15%] left-1/3 size-[30rem] rounded-full bg-primary/10 blur-[140px]" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `drift ${p.dur}s linear ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
