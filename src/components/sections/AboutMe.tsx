import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Target, Rocket, Code } from "lucide-react";
import { SectionBackdrop, SectionHeader } from "./SkillsUniverse";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="text-hologram text-4xl font-black tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
      {n}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Live Projects", value: 3, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Years Coding", value: 3, suffix: "" },
  { label: "Cups of Coffee", value: 999, suffix: "+" },
];

const info = [
  { icon: GraduationCap, label: "Education", value: "B.E. Computer Engineering (2022 – 2026)" },
  { icon: Target, label: "Focus", value: "Full-stack web, developer experience, product craft" },
  { icon: Code, label: "Stack", value: "React · Next.js · TypeScript · Node.js · Postgres" },
  { icon: Rocket, label: "Currently", value: "Building immersive web experiences" },
];

export function AboutMe() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-24">
      <SectionBackdrop />
      <SectionHeader eyebrow="SECTOR 05" title="Digital Profile" subtitle="A brief transmission from the pilot." />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Rotating globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel relative flex aspect-square items-center justify-center rounded-3xl p-6"
        >
          <div className="relative h-56 w-56">
            {/* globe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.5 0.2 220), oklch(0.2 0.15 265) 65%, oklch(0.05 0.02 265))",
                boxShadow: "0 0 60px oklch(0.6 0.22 240 / 0.6), inset -20px -20px 60px oklch(0.02 0.01 265 / 0.8)",
              }}
            >
              {/* meridians */}
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <span
                  key={deg}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: "oklch(0.8 0.15 220 / 0.15)",
                    transform: `rotateY(${deg}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                />
              ))}
            </motion.div>
            {/* orbit rings */}
            <div className="absolute -inset-6 rounded-full border border-dashed animate-[spin-slow_30s_linear_infinite]" style={{ borderColor: "oklch(0.75 0.15 230 / 0.3)" }}>
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: "oklch(0.9 0.15 220)", boxShadow: "0 0 12px oklch(0.75 0.22 230)" }} />
            </div>
            {/* location pin */}
            <span
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.3em]"
              style={{ color: "oklch(0.95 0.05 220)", textShadow: "0 0 10px oklch(0.75 0.22 230)" }}
            >
              IN · MAHARASHTRA
            </span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-panel scanline flex flex-col gap-6 rounded-3xl p-8"
        >
          <p className="text-base leading-relaxed" style={{ color: "oklch(0.92 0.03 230)" }}>
            I'm <strong className="text-hologram">Prathamesh Nalawade</strong> — a full-stack developer and Computer
            Engineering student who loves turning ideas into fast, delightful web products. I care about
            clean interfaces, thoughtful interactions, and code that scales.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: "oklch(0.15 0.06 275 / 0.4)", border: "1px solid oklch(0.7 0.15 230 / 0.2)" }}>
                <Counter to={s.value} suffix={s.suffix} />
                <div className="mt-1 font-mono text-[10px] tracking-[0.25em]" style={{ color: "oklch(0.75 0.12 220)" }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {info.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-start gap-3 rounded-xl p-3" style={{ background: "oklch(0.12 0.05 270 / 0.35)" }}>
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "oklch(0.3 0.15 250 / 0.6)", boxShadow: "0 0 12px oklch(0.7 0.22 240 / 0.4)" }}>
                    <Icon className="h-4 w-4" style={{ color: "oklch(0.9 0.12 220)" }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "oklch(0.75 0.12 220)" }}>
                      {r.label.toUpperCase()}
                    </div>
                    <div className="text-sm" style={{ color: "oklch(0.92 0.03 230)" }}>{r.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
