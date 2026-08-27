import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, Section } from "./primitives";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = "service_axw1vt3";
const EMAILJS_TEMPLATE_ID = "template_4xefvpz";
const EMAILJS_PUBLIC_KEY = "ppFrBeNpz8aKUfvOXMIWD";

const DETAILS = [
  { icon: Mail, label: "samikshazelkar1999@gmail.com", href: "mailto:samikshazelkar1999@gmail.com" },
  { icon: Phone, label: "+91-9067191533", href: "tel:+919067191533" },
  { icon: MapPin, label: "Nagpur, Maharashtra", href: null },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/samikskhazelkar" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/samiksha-zelkar-1235652bb/" },
];

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (get("name").length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (get("subject").length < 3) next.subject = "Please add a subject.";
    if (get("message").length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      setSent(false);
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const body = `${get("message")}\n\n— ${get("name")} (${get("email")})`;
    window.location.href = `mailto:samikshazelkar1999@gmail.com?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
    form.reset();
  }

  const field =
    "w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/70";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Meaningful Together."
      subtitle="Open to backend, .NET, and data-focused opportunities and collaborations."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="glass rounded-3xl p-7">
          <ul className="space-y-4">
            {DETAILS.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-hero-panel text-hero-on-panel">
                  <Icon className="size-4" />
                </span>
                {href ? (
                  <a href={href} className="break-all transition-colors hover:text-foreground">
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-2xl border border-border text-muted-foreground transition-all hover:border-primary/60 hover:text-foreground hover:shadow-[var(--glow-primary)]"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="glass rounded-3xl p-7">
          <form onSubmit={onSubmit} noValidate className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={field}
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p id="name-error" className="mt-1.5 text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={field}
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1.5 text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-xs text-muted-foreground">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={field}
                placeholder="What's this about?"
              />
              {errors.subject ? (
                <p id="subject-error" className="mt-1.5 text-xs text-destructive">
                  {errors.subject}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={field}
                placeholder="Tell me a bit more…"
              />
              {errors.message ? (
                <p id="message-error" className="mt-1.5 text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-hero-accent px-6 py-3 text-sm font-semibold text-hero-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Send Message
            </button>

            <p aria-live="polite" className="min-h-5 text-xs text-hero-accent">
              {sent ? "Thanks! Your email draft is ready — send it and I'll reply soon." : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-semibold">Samiksha Sunil Zelkar</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Software Developer | Backend Developer | Data Science &amp; ML Enthusiast
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Samiksha Sunil Zelkar. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <a
            href="mailto:samikshazelkar1999@gmail.com"
            aria-label="Email"
            className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-xl bg-hero-accent text-hero-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
