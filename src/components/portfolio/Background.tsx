export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="absolute -left-40 top-[-10%] size-[34rem] rounded-full bg-hero-panel/50 blur-[160px]" />
      <div className="absolute -right-48 top-1/2 size-[30rem] rounded-full bg-hero-accent/5 blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.1_0.006_285/0.75))]" />
    </div>
  );
}
