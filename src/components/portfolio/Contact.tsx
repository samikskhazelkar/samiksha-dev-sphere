import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AlertCircle, ArrowUp, CheckCircle2, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, Section } from "./primitives";
import { openExternal } from "@/lib/external-link";

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

export const LINKEDIN_URL = "https://www.linkedin.com/in/samikshazelkar/";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/samikskhazelkar" },
  { icon: Linkedin, label: "LinkedIn", href: LINKEDIN_URL },
];


export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");

    // Primary: deliver through the server-side mailer.
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          subject: get("subject"),
          message: get("message"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      console.error("Server mail failed", res.status, await res.text());
    } catch (serverErr) {
      console.error("Server mail request failed", serverErr);
    }

    // Fallback 1: EmailJS, when configured.
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: get("name"),
          from_name: get("name"),
          email: get("email"),
          reply_to: get("email"),
          subject: get("subject"),
          title: get("subject"),
          message: get("message"),
          time: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
      return;
    } catch (err) {
      console.error("EmailJS send failed", err);
    }

    setStatus("error");
    // Fallback 2: open the visitor's mail app with the message prefilled
    const body = `Name: ${get("name")}\nEmail: ${get("email")}\n\n${get("message")}`;
    window.location.href = `mailto:samikshazelkar1999@gmail.com?subject=${encodeURIComponent(
      get("subject"),
    )}&body=${encodeURIComponent(body)}`;
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

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={openExternal(LINKEDIN_URL)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-hero-accent px-5 py-3 text-sm font-semibold text-hero-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Linkedin className="size-4" />
            Connect on LinkedIn
          </a>

          <div className="mt-4 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={openExternal(href)}
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
              disabled={status === "sending"}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-hero-accent px-6 py-3 text-sm font-semibold text-hero-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            <div aria-live="polite" className="min-h-6">
              {status === "sent" ? (
                <p className="flex items-start gap-2 rounded-2xl border border-hero-accent/40 bg-hero-accent/10 px-4 py-3 text-xs font-medium text-hero-accent">
                  <CheckCircle2 className="mt-px size-4 shrink-0" />
                  <span>
                    Message sent successfully! Thanks for reaching out — I'll reply to your email
                    within 1–2 days.
                  </span>
                </p>
              ) : status === "error" ? (
                <p className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive">
                  <AlertCircle className="mt-px size-4 shrink-0" />
                  <span>
                    Message couldn't be sent right now. Your email app has been opened with the
                    message ready, or write to samikshazelkar1999@gmail.com directly.
                  </span>
                </p>
              ) : null}
            </div>

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

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-hero-accent/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-hero-accent transition-colors hover:bg-hero-accent hover:text-hero-accent-foreground"
          >
            <Linkedin className="size-4" />
            Connect on LinkedIn
          </a>

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
