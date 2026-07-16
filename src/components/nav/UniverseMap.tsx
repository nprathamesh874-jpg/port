import { motion } from "framer-motion";

const planets = [
  { id: "home", label: "Home", angle: 0, r: 0, hue: 220, size: 8 },
  { id: "about", label: "About", angle: 60, r: 42, hue: 200, size: 6 },
  { id: "skills", label: "Skills", angle: 130, r: 42, hue: 260, size: 7 },
  { id: "projects", label: "Projects", angle: 210, r: 42, hue: 320, size: 8 },
  { id: "timeline", label: "Timeline", angle: 280, r: 42, hue: 180, size: 6 },
  { id: "contact", label: "Contact", angle: 340, r: 42, hue: 340, size: 7 },
];

export function UniverseMap({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="glass-panel fixed bottom-4 left-4 z-40 hidden h-40 w-40 rounded-2xl p-3 lg:block"
      aria-label="Universe map"
    >
      <div className="mb-1 flex items-center justify-between font-mono text-[9px] tracking-[0.2em]" style={{ color: "oklch(0.8 0.12 220)" }}>
        <span>UNIVERSE MAP</span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      </div>
      <div className="relative h-[120px] w-full overflow-hidden rounded-lg" style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.12 0.08 270), oklch(0.04 0.02 265))" }}>
        {/* stars */}
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random(),
              height: 1 + Math.random(),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.6,
            }}
          />
        ))}
        {/* orbit rings */}
        <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed" style={{ borderColor: "oklch(0.7 0.15 230 / 0.25)" }} />
        {/* central sun */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "oklch(0.9 0.18 220)", boxShadow: "0 0 12px oklch(0.75 0.22 230)" }} />
        {/* planets */}
        {planets.slice(1).map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const cx = 50 + Math.cos(rad) * (p.r * 0.85);
          const cy = 50 + Math.sin(rad) * (p.r * 0.85);
          const isActive = active === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-150"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                width: p.size,
                height: p.size,
                background: `oklch(0.7 0.2 ${p.hue})`,
                boxShadow: isActive
                  ? `0 0 16px oklch(0.75 0.24 ${p.hue}), 0 0 4px white`
                  : `0 0 8px oklch(0.6 0.2 ${p.hue} / 0.7)`,
                border: isActive ? "1px solid white" : undefined,
              }}
              aria-label={p.label}
            >
              <span
                className="glass-panel pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[8px] tracking-widest opacity-0 transition group-hover:opacity-100"
                style={{ color: "oklch(0.9 0.12 220)" }}
              >
                {p.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
