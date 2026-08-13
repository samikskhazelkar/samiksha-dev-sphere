import { useEffect, useState } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import profile from "@/assets/profile.jpg";

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
      setText(ROLES[0]);
      return;
    }
    const full = ROLES[i % ROLES.length];
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
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Nagpur, India</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Samiksha Sunil <span className="text-gradient">Zelkar</span>
          </h1>
          <p className="mt-5 font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-foreground">{typed}</span>
            <span className="caret ml-0.5 text-primary">_</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Software Developer | Backend Developer | Data Science &amp; ML Enthusiast
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            An intermediate-level Python/data science practitioner and backend developer with experience building
            RESTful APIs, working with .NET technologies and PostgreSQL, and developing machine-learning solutions.
            Around 6–7 months of professional experience as a Software Developer Trainee, currently working as a Tech
            Operator Executive.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--glow-primary)]"
            >
              View My Work <ArrowDown className="size-4" />
            </a>
            <a
              href="/resume.txt"
              download="Samiksha-Zelkar-Resume.txt"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
            >
              <Download className="size-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Mail className="size-4" /> Contact Me
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-6 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <div className="float-slow relative">
            <div className="rounded-[2rem] border border-primary/30 p-2 shadow-[var(--glow-primary)]">
              <img
                src={profile}
                alt="Portrait of Samiksha Sunil Zelkar"
                width={816}
                height={816}
                className="aspect-square w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
