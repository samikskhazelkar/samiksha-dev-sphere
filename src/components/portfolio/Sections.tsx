import { useState } from "react";
import {
  Brain,
  Briefcase,
  Database,
  GraduationCap,
  Layers,
  LineChart,
  Music,
  Palette,
  PenTool,
  BookOpen,
  Server,
  Sparkles,
} from "lucide-react";
import { Chip, Counter, Reveal, Section } from "./primitives";

/* ---------------- About ---------------- */

const FOCUS = [
  "Backend development",
  "RESTful API development",
  ".NET development",
  "Database development",
  "Data science",
  "Machine learning",
  "Predictive modelling",
  "Data analysis",
];

const BEYOND = [
  { icon: Palette, label: "Painting" },
  { icon: PenTool, label: "Drawing" },
  { icon: Music, label: "Music" },
  { icon: BookOpen, label: "Reading" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Technology and data, applied to real problems"
      subtitle="I'm passionate about using technology and data to solve practical problems — building dependable backend services and data-driven solutions that improve the efficiency, accuracy, and usefulness of internal data-processing systems."
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="glass rounded-3xl p-7">
          <h3 className="text-lg font-semibold">Professional focus</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Sparkles className="size-4 shrink-0 text-hero-accent" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="glass glow-hover rounded-3xl p-7">
          <h3 className="text-lg font-semibold">Beyond coding</h3>
          <p className="mt-2 text-sm text-muted-foreground">Things that keep me curious away from the keyboard.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {BEYOND.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex items-center gap-3 rounded-2xl border border-border p-4 text-sm transition-colors hover:border-primary/50"
              >
                <Icon className="size-4 text-primary transition-transform group-hover:scale-110" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Skills ---------------- */

const SKILLS: { title: string; icon: typeof Server; items: string[] }[] = [
  { title: "Programming Languages", icon: Layers, items: ["C#", "SQL", "Python"] },
  {
    title: "Frameworks & Technologies",
    icon: Server,
    items: [".NET Core", ".NET Framework", "ASP.NET Core Web API"],
  },
  { title: "Database", icon: Database, items: ["PostgreSQL"] },
  {
    title: "Tools",
    icon: Sparkles,
    items: ["Postman", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
  },
  {
    title: "Backend & Software Concepts",
    icon: Layers,
    items: [
      "RESTful API Development",
      "Backend Architecture",
      "CRUD Operations",
      "Authentication & Authorization",
      "Error Handling",
      "Debugging",
      "Performance Optimization",
      "Layered Architecture",
      "Data Processing",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    icon: Brain,
    items: [
      "Data Preprocessing",
      "Exploratory Data Analysis",
      "Regression Models",
      "Predictive Modelling",
      "Classification",
      "Data Mining",
      "Data Visualization",
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Skills & expertise"
      subtitle="A working toolkit across backend engineering and applied data science."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {SKILLS.map((group, i) => (
          <Reveal key={group.title} delay={i * 80} className="glass glow-hover rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-hero-panel text-hero-on-panel shadow-[0_10px_25px_-12px_oklch(0.48_0.22_285/0.9)]">
                <group.icon className="size-4" />
              </span>
              <h3 className="text-base font-semibold">{group.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Experience ---------------- */

const EXPERIENCE = [
  {
    role: "Tech Operator Executive",
    org: "Current role",
    period: "Present",
    points: ["Currently working as a Tech Operator Executive."],
  },
  {
    role: "Software Developer Trainee",
    org: "Promarc Software Pvt. Ltd.",
    period: "September 2025 – March 2026",
    points: [
      "Developed backend applications using C# and ASP.NET Core Web API.",
      "Worked with .NET Core and .NET Framework.",
      "Designed and implemented RESTful APIs.",
      "Worked with PostgreSQL databases.",
      "Implemented CRUD functionality.",
      "Used Postman for API testing and validation.",
      "Worked with authentication and authorization.",
      "Performed debugging and error handling.",
      "Contributed to backend architecture and performance optimization.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Work experience">
      <div className="relative border-l border-border pl-6 sm:pl-10">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.role} delay={i * 100} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[1.9rem] top-2 size-3 rounded-full bg-hero-accent shadow-[0_0_0_5px_oklch(0.82_0.16_82/0.18)] sm:-left-[2.9rem]" />
            <div className="glass glow-hover rounded-3xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <span className="rounded-full bg-hero-accent/15 px-3 py-1 font-mono text-xs text-hero-accent">{e.period}</span>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="size-4" /> {e.org}
              </p>
              <ul className="mt-4 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-hero-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */

const PROJECTS = [
  {
    title: "Heart Disease Analysis",
    kind: "Machine Learning",
    icon: LineChart,
    summary:
      "A heart disease classification project using Python, Pandas, and Scikit-learn, built on a preprocessed dataset and thorough exploratory analysis.",
    details:
      "The dataset was preprocessed and analysed through exploratory data analysis. Matplotlib and Seaborn were used to create histograms, box plots, and correlation matrices to identify trends, relationships, and outliers. These insights supported the development of a classification model for detecting the presence of heart disease.",
    tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "Machine Learning"],
  },
  {
    title: "Diabetes Prediction Using Machine Learning",
    kind: "Predictive Modelling",
    icon: Brain,
    summary:
      "A predictive modelling project on the Pima Indians Diabetes dataset, from data cleaning through feature analysis.",
    details:
      "The data was cleaned and preprocessed using NumPy and Pandas, including handling missing values and preparing features. Exploratory analysis using Matplotlib and Seaborn helped identify distributions, outliers, and feature correlations before developing the predictive solution.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Machine Learning"],
  },
  {
    title: "Backend API Development",
    kind: "Backend Engineering",
    icon: Server,
    summary:
      "A secure backend API built with ASP.NET Core Web API and C#, using a layered architecture over PostgreSQL.",
    details:
      "The system includes CRUD operations with PostgreSQL, layered Controller-Service-Repository architecture, authentication and authorization, API testing through Postman, error handling, debugging, and performance optimization.",
    tags: ["C#", "ASP.NET Core Web API", ".NET", "PostgreSQL", "Postman", "REST API"],
  },
];

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      subtitle="Three projects spanning applied machine learning and production-style backend engineering."
    >
      <div className="grid gap-6">
        {PROJECTS.map((p, i) => {
          const expanded = open === p.title;
          return (
            <Reveal key={p.title} delay={i * 90} className="glass glow-hover overflow-hidden rounded-3xl">
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr]">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-border bg-secondary/40 md:aspect-auto">
                  <div className="absolute inset-0 grid-bg opacity-70" />
                  <p.icon className="relative size-12 text-hero-accent transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-hero-accent">{p.kind}</p>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>

                  <div
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{p.details}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : p.title)}
                      aria-expanded={expanded}
                      className="rounded-full bg-hero-accent px-5 py-2.5 text-sm font-semibold text-hero-accent-foreground transition-transform hover:-translate-y-0.5"
                    >
                      {expanded ? "Hide Details" : "View Details"}
                    </button>
                    <a
                      href="https://github.com/samikskhazelkar"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- Services ---------------- */

const SERVICES = [
  {
    icon: Server,
    title: "REST API Development",
    body: "Design and develop secure, scalable RESTful APIs using ASP.NET Core Web API and C#, including CRUD operations, authentication, authorization, validation, error handling, and API testing.",
  },
  {
    icon: Layers,
    title: ".NET Development",
    body: "Develop maintainable backend applications using .NET Core, .NET Framework, ASP.NET Core Web API, and C# with a focus on clean architecture, debugging, reliability, and performance.",
  },
  {
    icon: Database,
    title: "Database Development",
    body: "Work with PostgreSQL to design and manage backend data solutions, implement CRUD functionality, connect databases with APIs, and support reliable data processing.",
  },
];

export function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I can do">
      <div className="grid gap-5 md:grid-cols-3">
        {SERVICES.map((s, i) => {
          const featured = i === 1;
          return (
            <Reveal
              key={s.title}
              delay={i * 100}
              className={cn(
                "glow-hover group rounded-3xl p-7",
                featured ? "hero-panel text-hero-on-panel" : "glass",
              )}
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl transition-transform group-hover:-translate-y-1",
                  featured
                    ? "bg-hero-accent text-hero-accent-foreground"
                    : "bg-hero-panel text-hero-on-panel group-hover:bg-hero-accent group-hover:text-hero-accent-foreground",
                )}
              >
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", featured ? "text-hero-on-panel/80" : "text-muted-foreground")}>
                {s.body}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- Education ---------------- */

const LEARNING = [
  "Full Stack Data Science & Generative AI",
  "Introduction to API",
  "Build ASP.NET Core Web API – Scratch to Finish (.NET 8 API)",
];

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & learning">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="glass glow-hover rounded-3xl p-7">
          <span className="grid size-12 place-items-center rounded-2xl bg-hero-accent text-hero-accent-foreground">
            <GraduationCap className="size-5" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Bachelor of Engineering — Computer Science Engineering</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Dr. Rajendra Gode Institute of Technology &amp; Research, Amravati
          </p>
          <p className="mt-2 inline-block rounded-full bg-hero-accent/15 px-3 py-1 font-mono text-xs text-hero-accent">2021 – 2024</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>Computer Science</Chip>
            <Chip>Machine Learning</Chip>
          </div>
        </Reveal>

        <Reveal delay={120} className="glass glow-hover rounded-3xl p-7">
          <h3 className="text-lg font-semibold">Additional learning</h3>
          <ul className="mt-5 space-y-3">
            {LEARNING.map((l) => (
              <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-hero-accent" />
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Stats ---------------- */

const STATS = [
  { value: 7, suffix: "", label: "Months professional experience" },
  { value: 3, suffix: "", label: "Featured projects" },
  { value: 3, suffix: "", label: "Core professional services" },
  { value: 2024, suffix: "", label: "Engineering graduation" },
];

export function Stats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
      <Reveal className="hero-panel grid gap-8 rounded-[2rem] p-8 text-hero-on-panel sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <span className="font-display text-4xl font-semibold text-hero-accent sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <p className="mt-2 text-sm text-hero-on-panel/75">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

