import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Store, ShieldCheck, ExternalLink, Github, X } from "lucide-react";
import { SectionBackdrop, SectionHeader } from "./SkillsUniverse";

type Project = {
  id: string;
  name: string;
  tagline: string;
  hue: number;
  icon: typeof Heart;
  overview: string;
  features: string[];
  stack: string[];
  challenges: string;
  demo?: string;
  github?: string;
};

const projects: Project[] = [
  {
    id: "naaricare",
    name: "NaariCare",
    tagline: "Healthcare planet for women's wellness",
    hue: 340,
    icon: Heart,
    overview:
      "A caring healthcare platform focused on women's wellbeing, cycle tracking, and access to trusted medical guidance.",
    features: [
      "Personalized cycle & symptom tracking",
      "Encrypted health records",
      "Doctor discovery & appointments",
      "Educational resource library",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind", "JWT"],
    challenges:
      "Designing an empathetic UI while handling sensitive medical data with strict privacy controls.",
    demo: "https://naari-care-rho.vercel.app/",
    github: "https://github.com/nprathamesh519",
  },
  {
    id: "dukaansathi",
    name: "DukaanSathi",
    tagline: "Futuristic marketplace command center",
    hue: 220,
    icon: Store,
    overview:
      "An all-in-one shopkeeper toolkit for inventory, POS, analytics and delivery — a marketplace city for small businesses.",
    features: [
      "Real-time inventory & POS",
      "Sales & revenue analytics",
      "Order & delivery dashboard",
      "Multi-outlet management",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Recharts", "Node.js"],
    challenges:
      "Keeping the dashboard blazing fast with real-time data across many concurrent shop terminals.",
    demo: "https://dukaansathi-9qxt.onrender.com/",
    github: "https://github.com/nprathamesh519",
  },
  {
    id: "warranty",
    name: "Warranty App",
    tagline: "Vault world for receipts & warranties",
    hue: 200,
    icon: ShieldCheck,
    overview:
      "A digital vault that stores receipts, tracks warranty periods, and alerts you before coverage expires.",
    features: [
      "OCR receipt capture",
      "Warranty countdown timers",
      "Smart expiry notifications",
      "Category-based archives",
    ],
    stack: ["React", "Node.js", "MongoDB", "Cloud Storage"],
    challenges:
      "Building a reliable OCR + reminder pipeline that works across messy real-world receipt formats.",
    demo: "https://warrentyapp.vercel.app/",
    github: "https://github.com/nprathamesh519",
  },
];

export function ProjectWorlds() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen w-full overflow-hidden py-24">
      <SectionBackdrop />
      <SectionHeader eyebrow="SECTOR 03" title="Project Worlds" subtitle="Each project is a destination. Click a planet to enter." />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        {projects.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              onClick={() => setOpen(p)}
              className="glass-panel group relative flex flex-col items-center gap-6 rounded-3xl p-8 text-left transition-shadow hover:shadow-[0_0_60px_var(--hologram-glow)]"
            >
              {/* orbit ring */}
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed animate-[spin-slow_18s_linear_infinite]" style={{ borderColor: `oklch(0.7 0.2 ${p.hue} / 0.4)` }} />
                <div className="absolute inset-3 rounded-full border animate-[spin-reverse_24s_linear_infinite]" style={{ borderColor: `oklch(0.6 0.22 ${(p.hue + 40) % 360} / 0.35)` }} />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-28 w-28 items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, oklch(0.85 0.18 ${p.hue}), oklch(0.35 0.22 ${p.hue}) 60%, oklch(0.1 0.08 ${p.hue}))`,
                    boxShadow: `0 0 40px oklch(0.6 0.22 ${p.hue} / 0.7), inset -12px -12px 30px oklch(0.05 0 0 / 0.6)`,
                  }}
                >
                  <Icon className="h-10 w-10 text-white/95" strokeWidth={1.4} />
                </motion.div>
                {/* orbiting moon */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: `oklch(0.9 0.15 ${p.hue})`, boxShadow: `0 0 10px oklch(0.75 0.22 ${p.hue})` }} />
                </motion.div>
              </div>

              <div className="text-center">
                <div className="mb-1 font-mono text-[10px] tracking-[0.3em]" style={{ color: `oklch(0.8 0.15 ${p.hue})` }}>
                  PROJECT / {p.id.toUpperCase()}
                </div>
                <h3 className="text-2xl font-black text-hologram" style={{ fontFamily: "var(--font-display)" }}>
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              </div>

              <span
                className="font-mono text-[10px] tracking-[0.3em] transition group-hover:brightness-125"
                style={{ color: "oklch(0.85 0.15 220)" }}
              >
                ENTER PLANET →
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Modal */}
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass-panel scanline relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8"
        style={{ boxShadow: `0 0 80px oklch(0.6 0.24 ${project.hue} / 0.5)` }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" style={{ color: "oklch(0.9 0.1 220)" }} />
        </button>

        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, oklch(0.85 0.18 ${project.hue}), oklch(0.3 0.22 ${project.hue}))`,
              boxShadow: `0 0 30px oklch(0.6 0.24 ${project.hue} / 0.7)`,
            }}
          >
            <Icon className="h-7 w-7 text-white" strokeWidth={1.4} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-hologram" style={{ fontFamily: "var(--font-display)" }}>
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
          </div>
        </div>

        <Field label="OVERVIEW">{project.overview}</Field>
        <Field label="FEATURES">
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: `oklch(0.8 0.2 ${project.hue})`, boxShadow: `0 0 6px oklch(0.7 0.22 ${project.hue})` }} />
                <span style={{ color: "oklch(0.9 0.03 230)" }}>{f}</span>
              </li>
            ))}
          </ul>
        </Field>
        <Field label="TECH STACK">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="glass-panel rounded-full px-3 py-1 font-mono text-xs" style={{ color: "oklch(0.9 0.1 220)" }}>
                {t}
              </span>
            ))}
          </div>
        </Field>
        <Field label="CHALLENGES">{project.challenges}</Field>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-cosmic inline-flex items-center gap-2 text-sm">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-cosmic inline-flex items-center gap-2 text-sm">
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-2 font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.75 0.15 220)" }}>
        {label}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: "oklch(0.9 0.03 230)" }}>
        {children}
      </div>
    </div>
  );
}
