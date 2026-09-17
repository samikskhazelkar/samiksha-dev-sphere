import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Work", "projects"],
  ["Services", "services"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "home";
      for (const [, id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-display text-lg tracking-tight">
          Samiksha<span className="text-hero-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.slice(1).map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "relative font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground",
                  active === id && "text-foreground",
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-hero-accent transition-transform duration-500",
                    active === id && "scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden border-b border-hero-accent pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-hero-accent lg:inline-block"
        >
          Let&apos;s work together
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 text-foreground lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map(([label, id], i) => (
              <li key={id} className="animate-fade-in" style={{ animationDelay: `${i * 45}ms` }}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-2 font-display text-4xl text-foreground"
                >
                  <span className="font-mono text-[10px] text-hero-accent">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-10 inline-block self-start border-b border-hero-accent pb-1 font-mono text-xs uppercase tracking-[0.22em] text-hero-accent"
          >
            Let&apos;s work together
          </a>
        </div>
      ) : null}
    </header>
  );
}
