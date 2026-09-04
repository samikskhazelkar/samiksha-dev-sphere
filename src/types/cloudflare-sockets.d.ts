declare module "cloudflare:sockets" {
  export interface CloudflareSocket {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<Uint8Array>;
    closed: Promise<void>;
    close(): Promise<void>;
    startTls(): CloudflareSocket;
  }

  export function connect(
    address: { hostname: string; port: number } | string,
    options?: { secureTransport?: "off" | "on" | "starttls"; allowHalfOpen?: boolean },
  ): CloudflareSocket;
}
