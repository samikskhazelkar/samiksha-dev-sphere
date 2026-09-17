import { useEffect, useRef, useState } from "react";

/** Minimal desktop cursor: dot + expanding ring with contextual labels. */
export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor],a,button");
      if (!el) {
        setActive(false);
        setLabel("");
        return;
      }
      setActive(true);
      setLabel(el.dataset["cursor"] ?? "");
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-hero-accent" />
      <div
        ref={ring}
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-hero-accent/60 transition-[width,height,background-color] duration-300"
        style={{
          width: active ? (label ? 86 : 52) : 30,
          height: active ? (label ? 86 : 52) : 30,
          backgroundColor: label ? "oklch(0.82 0.13 78 / 0.12)" : "transparent",
        }}
      >
        {label ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-accent">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
