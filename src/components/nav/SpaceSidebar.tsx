import { motion } from "framer-motion";
import { Home, User, Sparkles, Rocket, Clock, Mail, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings2 },
];

export function SpaceSidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-panel fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-2xl p-2 sm:flex"
      aria-label="Primary navigation"
    >
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onNavigate(it.id)}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition"
            aria-label={it.label}
            aria-current={isActive ? "page" : undefined}
            style={{
              background: isActive
                ? "linear-gradient(135deg, oklch(0.35 0.15 250 / 0.55), oklch(0.25 0.18 300 / 0.5))"
                : "transparent",
              boxShadow: isActive
                ? "0 0 24px oklch(0.72 0.22 230 / 0.5), inset 0 0 12px oklch(0.75 0.22 230 / 0.3)"
                : "none",
            }}
          >
            <Icon
              className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
              style={{
                color: isActive ? "oklch(0.95 0.12 220)" : "oklch(0.75 0.08 230 / 0.8)",
                filter: isActive ? "drop-shadow(0 0 8px oklch(0.75 0.22 230))" : undefined,
              }}
            />
            <span
              className="glass-panel pointer-events-none absolute left-14 whitespace-nowrap rounded-md px-3 py-1 font-mono text-[10px] tracking-[0.2em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ color: "oklch(0.9 0.12 220)" }}
            >
              {it.label.toUpperCase()}
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute -left-1 h-6 w-[3px] rounded-full"
                style={{
                  background: "oklch(0.85 0.2 220)",
                  boxShadow: "0 0 10px oklch(0.75 0.22 230)",
                }}
              />
            )}
          </button>
        );
      })}
    </motion.aside>
  );
}
