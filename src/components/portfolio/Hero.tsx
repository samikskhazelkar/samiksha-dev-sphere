import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import profile from "@/assets/samiksha.png.asset.json";
import resume from "@/assets/samiksha_zelkar.pdf.asset.json";

/** 0 → 1 progress across the hero's scroll distance. */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setP(Math.min(1, Math.max(0, -rect.top / distance)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return p;
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useScrollProgress(ref);

  const scale = 1 + p * 0.06;
  const lift = p * -60;
  const textFade = Math.max(0, 1 - p * 2.2);

  return (
    <section id="home" ref={ref} className="relative h-[220vh] scroll-mt-0">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* portrait */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
          <div
            className="relative h-[78vh] w-auto will-change-transform"
            style={{ transform: `translate3d(0, ${lift}px, 0) scale(${scale})` }}
          >
            <img
              src={profile.url}
              alt="Portrait of Samiksha Sunil Zelkar"
              width={423}
              height={800}
              className="h-full w-auto object-contain object-bottom"
              style={{
                maskImage: "linear-gradient(to bottom, black 72%, transparent 99%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 99%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `oklch(0.14 0.006 285 / ${p * 0.55})` }}
            />
          </div>
        </div>

        {/* halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-accent/10 blur-[150px]"
        />

        {/* typography around the subject */}
        <div
          className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 pb-24 pt-28 sm:px-8"
          style={{ opacity: textFade }}
        >
          <div className="animate-fade-in max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-hero-accent">
              Backend &amp; Data Developer
            </p>
            <h1 className="mt-5 text-4xl leading-[1.04] sm:text-6xl">
              Building software
              <br />
              people rely on.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Samiksha Sunil Zelkar — backend developer working in C#, ASP.NET Core and PostgreSQL, with applied
              machine learning in Python.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                data-cursor="View"
                className="group inline-flex items-center gap-2 border-b border-hero-accent pb-1 text-sm uppercase tracking-[0.18em] text-hero-accent"
              >
                View my work
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Let&apos;s work together
              </a>
            </div>

            <div className="flex items-center gap-5 text-muted-foreground">
              <a
                href={resume.url}
                download="Samiksha-Zelkar-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-colors hover:text-foreground"
              >
                <Download className="size-4" /> CV
              </a>
              <a
                href="https://github.com/samikskhazelkar"
                target="_blank"
                rel="noreferrer"
                onClick={openExternal("https://github.com/samikskhazelkar")}
                aria-label="GitHub"
                className="transition-colors hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/samikshazelkar/"
                target="_blank"
                rel="noreferrer"
                onClick={openExternal("https://www.linkedin.com/in/samikshazelkar/")}
                aria-label="LinkedIn"
                className="transition-colors hover:text-foreground"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - p * 5) }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Scroll to explore
          </span>
          <ArrowDown className="scroll-hint size-4 text-hero-accent" />
        </div>
      </div>
    </section>
  );
}
