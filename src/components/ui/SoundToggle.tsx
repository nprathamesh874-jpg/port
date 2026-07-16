import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Sound toggle placeholder — ambient audio can be wired to a src later.
 * Persists preference in localStorage.
 */
export function SoundToggle() {
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("pn-sound") === "1";
  });

  const toggle = () => {
    setOn((v) => {
      const next = !v;
      try {
        localStorage.setItem("pn-sound", next ? "1" : "0");
      } catch {
        /* noop */
      }
      return next;
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onClick={toggle}
      className="glass-panel fixed right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full transition hover:brightness-125"
      aria-label={on ? "Mute ambient sound" : "Enable ambient sound"}
      aria-pressed={on}
    >
      {on ? (
        <Volume2 className="h-4 w-4" style={{ color: "oklch(0.9 0.15 220)", filter: "drop-shadow(0 0 6px oklch(0.75 0.22 230))" }} />
      ) : (
        <VolumeX className="h-4 w-4" style={{ color: "oklch(0.75 0.06 230)" }} />
      )}
    </motion.button>
  );
}
