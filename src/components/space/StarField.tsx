import { useEffect, useRef } from "react";

type Props = {
  density?: number;
  className?: string;
  parallax?: { x: number; y: number };
};

/**
 * Animated starfield with drifting particles, twinkle, and gentle camera drift.
 * Runs on a single canvas for performance.
 */
export function StarField({ density = 1, className, parallax }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (parallax) parallaxRef.current = parallax;
  }, [parallax]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    type Star = { x: number; y: number; z: number; r: number; tw: number; tp: number };
    let stars: Star[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 3500) * density;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.4 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tp: Math.random() * 0.02 + 0.005,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      for (const s of stars) {
        if (!reduce) {
          s.tw += s.tp * dt;
          s.x -= 0.005 * dt * s.z;
          if (s.x < -2) s.x = w + 2;
        }
        const alpha = 0.55 + Math.sin(s.tw) * 0.35;
        const dx = s.x + px * s.z * 18;
        const dy = s.y + py * s.z * 18;
        const size = s.r * (0.6 + s.z);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${210 + Math.floor(s.z * 40)}, ${220 + Math.floor(s.z * 30)}, 255, ${alpha})`;
        ctx.arc(dx, dy, size, 0, Math.PI * 2);
        ctx.fill();

        if (s.z > 0.75) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(180, 210, 255, ${alpha * 0.15})`;
          ctx.arc(dx, dy, size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
