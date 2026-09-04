import { connect } from "cloudflare:sockets";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export type MailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function readSmtpConfig(): SmtpConfig | null {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const to = process.env["CONTACT_TO_EMAIL"] ?? user;
  if (!host || !user || !pass || !to) return null;
  return {
    host,
    port: Number(process.env["SMTP_PORT"] ?? 465),
    user,
    pass,
    from: process.env["SMTP_FROM"] ?? user,
    to,
  };
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function b64(input: string) {
  const bytes = encoder.encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function encodeHeader(value: string) {
  return /^[\x20-\x7E]*$/.test(value) ? value : `=?UTF-8?B?${b64(value)}?=`;
}

class SmtpSession {
  private reader: ReadableStreamDefaultReader<Uint8Array>;
  private writer: WritableStreamDefaultWriter<Uint8Array>;
  private buffer = "";

  constructor(socket: { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> }) {
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
  }

  async read(): Promise<string> {
    // A complete SMTP reply ends with "<code><SP>...\r\n" (no hyphen after code).
    for (;;) {
      const lines = this.buffer.split("\r\n").filter(Boolean);
      const last = lines[lines.length - 1];
      if (this.buffer.endsWith("\r\n") && last && last[3] !== "-") {
        const reply = this.buffer;
        this.buffer = "";
        return reply;
      }
      const { value, done } = await this.reader.read();
      if (done) throw new Error("SMTP connection closed unexpectedly");
      this.buffer += decoder.decode(value, { stream: true });
    }
  }

  async command(line: string, expect: string[]): Promise<string> {
    await this.writer.write(encoder.encode(`${line}\r\n`));
    const reply = await this.read();
    if (!expect.some((code) => reply.startsWith(code))) {
      throw new Error(`SMTP error after "${line.split(" ")[0]}": ${reply.trim()}`);
    }
    return reply;
  }

  async close() {
    try {
      await this.writer.close();
    } catch {
      /* ignore */
    }
  }
}

export async function sendContactEmail(input: MailInput, cfg: SmtpConfig): Promise<void> {
  const socket = connect({ hostname: cfg.host, port: cfg.port }, { secureTransport: "on" });
  const session = new SmtpSession(socket as never);

  try {
    const greeting = await session.read();
    if (!greeting.startsWith("220")) throw new Error(`SMTP greeting failed: ${greeting.trim()}`);

    await session.command("EHLO portfolio", ["250"]);
    await session.command("AUTH LOGIN", ["334"]);
    await session.command(b64(cfg.user), ["334"]);
    await session.command(b64(cfg.pass), ["235"]);
    await session.command(`MAIL FROM:<${cfg.from}>`, ["250"]);
    await session.command(`RCPT TO:<${cfg.to}>`, ["250", "251"]);
    await session.command("DATA", ["354"]);

    const body = [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject}`,
      "",
      input.message,
    ].join("\r\n");

    const data = [
      `From: ${encodeHeader(input.name)} <${cfg.from}>`,
      `To: <${cfg.to}>`,
      `Reply-To: <${input.email}>`,
      `Subject: ${encodeHeader(`[Portfolio] ${input.subject}`)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "",
      body.replace(/\r?\n\./g, "\r\n.."),
      ".",
    ].join("\r\n");

    await session.command(data, ["250"]);
    await session.command("QUIT", ["221"]);
  } finally {
    await session.close();
  }
}
