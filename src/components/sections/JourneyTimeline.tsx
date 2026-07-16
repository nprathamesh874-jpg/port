import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionBackdrop, SectionHeader } from "./SkillsUniverse";

const milestones = [
  { year: "2022", title: "Started Engineering", body: "Began the Computer Engineering journey — foundations in DSA, C++, and systems thinking." },
  { year: "2023", title: "Discovered Web Dev", body: "Fell in love with the modern web — React, JavaScript, and building for the browser." },
  { year: "2024", title: "Major Projects", body: "Shipped NaariCare, DukaanSathi and the Warranty app end-to-end across the stack." },
  { year: "2025", title: "Professional Growth", body: "Deep dives into TypeScript, Node.js, system design and production-grade architecture." },
  { year: "2026", title: "Graduation", body: "Graduating with a portfolio, real-world builds, and eyes on the next orbit." },
];

export function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shipY = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);

  return (
    <section id="timeline" className="relative w-full overflow-hidden py-24">
      <SectionBackdrop />
      <SectionHeader eyebrow="SECTOR 04" title="Journey Wormhole" subtitle="Scroll through the years — a spaceship follows your path." />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-6">
        {/* wormhole tunnel */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.5 0.24 260 / 0.6), transparent 65%)",
            filter: "blur(20px)",
          }}
        />
        {/* central line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2" style={{ background: "linear-gradient(180deg, transparent, oklch(0.75 0.22 230 / 0.7), oklch(0.65 0.24 300 / 0.7), transparent)", boxShadow: "0 0 20px oklch(0.72 0.22 230 / 0.6)" }} />

        {/* progress ship */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{ top: shipY }}
        >
          <div className="relative -translate-y-1/2">
            <div className="h-4 w-4 rounded-full" style={{ background: "oklch(0.95 0.05 220)", boxShadow: "0 0 20px 6px oklch(0.72 0.22 230)" }} />
            <div className="absolute left-1/2 top-full h-16 w-[2px] -translate-x-1/2" style={{ background: "linear-gradient(180deg, oklch(0.9 0.15 220), transparent)" }} />
          </div>
        </motion.div>

        <div className="relative flex flex-col gap-24 py-16">
          {milestones.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: left ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative flex ${left ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-full max-w-sm ${left ? "pr-10 text-right" : "pl-10 text-left"}`}>
                  <div className="glass-panel scanline rounded-2xl p-6">
                    <div className="mb-2 font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.8 0.15 220)" }}>
                      YEAR / {m.year}
                    </div>
                    <h3 className="text-2xl font-black text-hologram" style={{ fontFamily: "var(--font-display)" }}>
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
                  </div>
                </div>
                {/* milestone node */}
                <span
                  className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "oklch(0.9 0.15 220)",
                    boxShadow: "0 0 20px oklch(0.72 0.22 230), 0 0 40px oklch(0.6 0.24 280 / 0.5)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
