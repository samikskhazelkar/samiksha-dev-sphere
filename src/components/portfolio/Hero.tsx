import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import profile from "@/assets/samiksha.png.asset.json";

const ROLES = [
  "Software Developer",
  "Backend Developer",
  ".NET Developer",
  "Data Science & ML Enthusiast",
];

function useTyping() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(ROLES[0]!);
      return;
    }
    const full = ROLES[i % ROLES.length]!;
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 200 : deleting ? 35 : 70;

    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (empty) {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return text;
}

export function Hero() {
  const typed = useTyping();

  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-8">
      <div className="hero-panel animate-fade-in relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-hero-on-panel shadow-[0_40px_120px_-40px_oklch(0.48_0.22_285/0.7)] sm:px-12 sm:py-16">
        {/* decorative accents */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[18%] top-16 size-72 rounded-full bg-hero-accent/90 blur-[2px] sm:size-80" />
          <div className="absolute right-[6%] top-1/2 size-28 rounded-full bg-hero-accent/80" />
          <div className="absolute -left-16 -top-16 size-64 rounded-full border border-hero-on-panel/15" />
          <div className="absolute bottom-8 left-10 size-40 rounded-full border border-hero-on-panel/10" />
          <div className="absolute left-6 top-24 flex flex-col gap-3 sm:left-8">
            {[0, 1, 2, 3, 4].map((d) => (
              <span key={d} className="size-1.5 rounded-full bg-hero-on-panel/60" />
            ))}
          </div>
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="pl-4 sm:pl-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-hero-on-panel/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-hero-accent opacity-80" />
                <span className="relative inline-flex size-2 rounded-full bg-hero-accent" />
              </span>
              Open to opportunities · Nagpur, India
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Hello, I&apos;m
              <br />
              Samiksha Zelkar An
              <br />
              <span className="text-hero-accent">Backend Developer</span>
            </h1>

            <p className="mt-5 font-mono text-sm text-hero-on-panel/80 sm:text-base">
              {typed}
              <span className="caret ml-0.5 text-hero-accent">_</span>
            </p>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-hero-on-panel/75 sm:text-base">
              I build RESTful APIs with C#, ASP.NET Core and PostgreSQL, and explore data science and machine learning
              with Python — turning backend logic and data into products that work.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-hero-accent px-7 py-3.5 text-sm font-semibold text-hero-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Get Started <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/resume.txt"
                download="Samiksha-Zelkar-Resume.txt"
                className="inline-flex items-center gap-2 rounded-full border border-hero-on-panel/35 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-hero-on-panel/10"
              >
                <Download className="size-4" /> Download CV
              </a>
              <div className="flex items-center gap-2">
                {[
                  { href: "https://github.com/", label: "GitHub", Icon: Github },
                  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: Linkedin },
                  { href: "#contact", label: "Contact", Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full bg-hero-on-panel/15 transition-colors hover:bg-hero-on-panel/25"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative flex items-center justify-center">
              {/* yellow halo rings */}
              <div className="absolute inset-0 rounded-full bg-hero-accent/20 blur-2xl" />
              <div className="absolute -inset-3 rounded-full border-2 border-hero-accent/40" />
              <div className="absolute -inset-6 rounded-full border border-dashed border-hero-on-panel/20" />

              {/* circular mask portrait */}
              <div className="relative z-10 aspect-square w-full max-w-[20rem] overflow-hidden rounded-full border-4 border-hero-accent bg-hero-panel shadow-2xl">
                <img
                  src={profile.url}
                  alt="Portrait of Samiksha Sunil Zelkar"
                  width={423}
                  height={800}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="absolute -left-2 top-8 z-20 flex items-center gap-3 rounded-2xl bg-background/95 px-4 py-3 shadow-lg sm:-left-8">
                <span className="text-2xl font-semibold text-hero-panel">6+</span>
                <span className="text-[11px] font-medium leading-tight text-muted-foreground">
                  Months
                  <br />
                  Experience
                </span>
              </div>

              <div className="absolute -right-1 bottom-10 z-20 rounded-2xl bg-background/95 px-4 py-3 shadow-lg sm:-right-6">
                <p className="text-sm font-semibold text-foreground">APIs &amp; Data</p>
                <p className="font-mono text-[11px] text-muted-foreground">C# · .NET · Python</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
