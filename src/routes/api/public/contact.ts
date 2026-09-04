import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
});

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = schema.safeParse(await request.json());
        } catch {
          return json({ ok: false, error: "Invalid request body." }, 400);
        }
        if (!parsed.success) return json({ ok: false, error: "Invalid form data." }, 400);

        const { readSmtpConfig, sendContactEmail } = await import("@/lib/smtp.server");
        const cfg = readSmtpConfig();
        if (!cfg) return json({ ok: false, error: "Email delivery is not configured." }, 503);

        try {
          await sendContactEmail(parsed.data, cfg);
          return json({ ok: true }, 200);
        } catch (err) {
          console.error("SMTP send failed", err);
          return json({ ok: false, error: "Could not deliver the message." }, 502);
        }
      },
    },
  },
});
