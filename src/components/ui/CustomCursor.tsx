import { useEffect, useRef, useState } from "react";

/**
 * Custom glowing cursor with a soft particle trail.
 * Hidden on touch devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(canHover);
    if (!canHover) {
      document.body.style.cursor = "auto";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => ringRef.current?.classList.add("cursor-active");
    const onUp = () => ringRef.current?.classList.remove("cursor-active");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }
        .cursor-dot {
          width: 8px; height: 8px;
          margin: -4px 0 0 -4px;
          border-radius: 999px;
          background: oklch(0.95 0.05 220);
          box-shadow: 0 0 12px oklch(0.75 0.22 230 / 0.9),
                      0 0 24px oklch(0.7 0.24 260 / 0.6);
          mix-blend-mode: screen;
        }
        .cursor-ring {
          width: 36px; height: 36px;
          margin: -18px 0 0 -18px;
          border-radius: 999px;
          border: 1px solid oklch(0.75 0.18 230 / 0.55);
          box-shadow: 0 0 20px oklch(0.7 0.22 240 / 0.35);
          transition: width .18s ease, height .18s ease, margin .18s ease, border-color .18s ease;
        }
        .cursor-ring.cursor-active {
          width: 22px; height: 22px; margin: -11px 0 0 -11px;
          border-color: oklch(0.9 0.15 220);
        }
      `}</style>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
