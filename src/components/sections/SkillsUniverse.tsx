import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Server, Database, Cloud, Brain } from "lucide-react";

type Skill = { name: string; level: number };
type Planet = {
  id: string;
  label: string;
  hue: number;
  icon: typeof Code2;
  skills: Skill[];
  angle: number;
};

const planets: Planet[] = [
  {
    id: "frontend",
    label: "Frontend",
    hue: 220,
    icon: Code2,
    angle: 0,
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 94 },
      { name: "JavaScript", level: 95 },
      { name: "HTML / CSS", level: 96 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    hue: 280,
    icon: Server,
    angle: 72,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 86 },
      { name: "NestJS", level: 72 },
      { name: "REST APIs", level: 90 },
      { name: "Authentication", level: 84 },
      { name: "JWT", level: 82 },
    ],
  },
  {
    id: "database",
    label: "Database",
    hue: 330,
    icon: Database,
    angle: 144,
    skills: [
      { name: "PostgreSQL", level: 84 },
      { name: "MySQL", level: 80 },
      { name: "Supabase", level: 88 },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    hue: 180,
    icon: Cloud,
    angle: 216,
    skills: [
      { name: "GitHub", level: 92 },
      { name: "Vercel", level: 88 },
      { name: "Render", level: 78 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    hue: 40,
    icon: Brain,
    angle: 288,
    skills: [
      { name: "AWS", level: 55 },
      { name: "AI / ML", level: 60 },
      { name: "System Design", level: 65 },
      { name: "Microservices", level: 58 },
    ],
  },
];

export function SkillsUniverse() {
  const [active, setActive] = useState<Planet>(planets[0]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="skills" ref={ref} className="relative min-h-screen w-full overflow-hidden py-24">
      <SectionBackdrop />
      <SectionHeader eyebrow="SECTOR 02" title="Skills Universe" subtitle="Orbiting technologies across five specialized planets." />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Orbit map */}
        <div className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center sm:h-[500px] sm:w-[500px]">
          {/* central galaxy */}
          <motion.div
            className="absolute h-24 w-24 rounded-full"
            style={{
              background: "radial-gradient(circle at 40% 40%, oklch(0.95 0.15 220), oklch(0.5 0.24 280) 60%, oklch(0.15 0.1 265))",
              boxShadow: "0 0 60px oklch(0.72 0.22 230 / 0.7)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          {/* orbits */}
          {[190, 230].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-dashed"
              style={{
                width: r,
                height: r,
                borderColor: `oklch(0.7 0.15 230 / 0.${3 - i})`,
              }}
            />
          ))}
          {/* orbiting planets */}
          <motion.div
            className="absolute h-full w-full"
            animate={inView ? { rotate: 360 } : undefined}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {planets.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const R = 210;
              const x = Math.cos(rad) * R;
              const y = Math.sin(rad) * R;
              const isActive = active.id === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  aria-label={p.label}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, oklch(0.85 0.18 ${p.hue}), oklch(0.35 0.2 ${p.hue}) 65%, oklch(0.1 0.08 ${p.hue}))`,
                      boxShadow: isActive
                        ? `0 0 40px oklch(0.7 0.24 ${p.hue}), 0 0 10px white`
                        : `0 0 20px oklch(0.55 0.2 ${p.hue} / 0.6)`,
                      border: isActive ? "1px solid white" : "1px solid transparent",
                    }}
                  >
                    <Icon className="h-7 w-7 text-white/90" strokeWidth={1.5} style={{ filter: "drop-shadow(0 0 6px oklch(0.9 0.15 220))" }} />
                  </motion.div>
                  <div
                    className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: isActive ? "oklch(0.95 0.15 220)" : "oklch(0.75 0.08 230 / 0.7)" }}
                  >
                    {p.label.toUpperCase()}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Skill panel */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel scanline relative flex flex-col rounded-3xl p-6 sm:p-8"
        >
          <div className="mb-1 font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.8 0.15 220)" }}>
            PLANET // {active.label.toUpperCase()}
          </div>
          <h3 className="mb-6 text-3xl font-black text-hologram" style={{ fontFamily: "var(--font-display)" }}>
            {active.label}
          </h3>
          <div className="flex flex-col gap-4">
            {active.skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="mb-1.5 flex justify-between font-mono text-xs">
                  <span style={{ color: "oklch(0.92 0.05 230)" }}>{s.name}</span>
                  <span style={{ color: `oklch(0.8 0.15 ${active.hue})` }}>{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "oklch(0.2 0.06 265 / 0.6)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, oklch(0.7 0.22 ${active.hue}), oklch(0.85 0.18 ${(active.hue + 40) % 360}))`,
                      boxShadow: `0 0 10px oklch(0.7 0.22 ${active.hue})`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--gradient-nebula)" }} aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 1.5,
              height: 1 + Math.random() * 1.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.6,
              boxShadow: "0 0 4px oklch(0.9 0.1 220)",
            }}
          />
        ))}
      </div>
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7 }}
      className="relative z-10 mx-auto mb-16 max-w-3xl px-6 text-center"
    >
      <div className="mb-3 font-mono text-xs tracking-[0.4em]" style={{ color: "oklch(0.8 0.15 220)" }}>
        — {eyebrow} —
      </div>
      <h2 className="text-hologram text-4xl font-black leading-tight sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
