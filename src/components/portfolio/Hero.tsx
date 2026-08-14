import { useEffect, useState } from "react";
import { ArrowDown, Download, Mail, Github, Linkedin, Sparkles } from "lucide-react";
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
    <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-20 pt-28 sm:px-8">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open to opportunities · Nagpur, India
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Samiksha Sunil <span className="text-gradient">Zelkar</span>
          </h1>

          <p className="mt-5 font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-foreground">{typed}</span>
            <span className="caret ml-0.5 text-primary">_</span>
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Backend developer building RESTful APIs with C#, ASP.NET Core and PostgreSQL, with growing expertise in
            Python, data science and machine learning. Around 6–7 months of professional experience as a Software
            Developer Trainee, currently a Tech Operator Executive.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["C# / .NET", "ASP.NET Core", "PostgreSQL", "Python", "Machine Learning"].map((t) => (
              <span
                key={t}
                className="glass rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--glow-primary)]"
            >
              View My Work <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/resume.txt"
              download="Samiksha-Zelkar-Resume.txt"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
            >
              <Download className="size-4" /> Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Mail className="size-4" /> Contact
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-8 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <div className="float-slow relative">
            <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-[var(--glow-primary)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
              <img
                src={profile.url}
                alt="Portrait of Samiksha Sunil Zelkar"
                width={928}
                height={1200}
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-top"
              />
            </div>

            <div className="glass absolute -bottom-5 -left-4 z-20 flex items-center gap-2 rounded-2xl px-4 py-3 sm:-left-8">
              <Sparkles className="size-4 text-primary" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">6+ months</p>
                <p className="font-mono text-[11px] text-muted-foreground">professional experience</p>
              </div>
            </div>

            <div className="glass absolute -right-3 top-8 z-20 rounded-2xl px-4 py-3 sm:-right-6">
              <p className="text-sm font-semibold text-gradient">Backend</p>
              <p className="font-mono text-[11px] text-muted-foreground">APIs &amp; Data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
