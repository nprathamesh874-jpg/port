import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  strength?: number;
};

/**
 * Magnetic button with ripple, light-sweep, glow, and soft tilt.
 */
export function MagneticButton({ children, onClick, className, icon, strength = 24 }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18 });
  const sy = useSpring(my, { stiffness: 220, damping: 18 });
  const rotX = useTransform(sy, [-strength, strength], [6, -6]);
  const rotY = useTransform(sx, [-strength, strength], [-6, 6]);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = e.clientX - (r.left + r.width / 2);
    const ny = e.clientY - (r.top + r.height / 2);
    mx.set(Math.max(-strength, Math.min(strength, (nx / r.width) * strength * 2)));
    my.set(Math.max(-strength, Math.min(strength, (ny / r.height) * strength * 2)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const ripple = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(r.width, r.height) * 1.2;
    span.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;width:${size}px;height:${size}px;border-radius:999px;background:radial-gradient(circle,oklch(0.9 0.18 220/0.55),transparent 60%);pointer-events:none;transform:scale(0);animation:ripple 700ms ease-out forwards;mix-blend-mode:screen;`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 720);
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={ripple}
      style={{ x: sx, y: sy, rotateX: rotX, rotateY: rotY, transformPerspective: 600 }}
      whileHover={{ boxShadow: "0 0 40px oklch(0.72 0.24 240 / 0.7), inset 0 1px 0 oklch(0.95 0.08 230 / 0.35)" }}
      className={cn("btn-cosmic group relative", className)}
    >
      <style>{`@keyframes ripple{to{transform:scale(1);opacity:0}}`}</style>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-y-2 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 blur-sm transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}
