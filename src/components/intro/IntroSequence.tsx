import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { StarField } from "@/components/space/StarField";

type Props = {
  onComplete: () => void;
  onSkip: () => void;
};

/**
 * Cinematic intro: black → stars fade in → nebula → constellations draw →
 * typewriter name + role → warp transition.
 */
export function IntroSequence({ onComplete, onSkip }: Props) {
  const [phase, setPhase] = useState<"black" | "space" | "warp">("black");
  const [nameIdx, setNameIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const name = "PRATHAMESH NALAWADE";
  const role = "Full Stack Developer";
  const startedTyping = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("space"), 900);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "space" || startedTyping.current) return;
    startedTyping.current = true;
    const nameStart = setTimeout(() => {
      const iv = setInterval(() => {
        setNameIdx((i) => {
          if (i >= name.length) {
            clearInterval(iv);
            return i;
          }
          return i + 1;
        });
      }, 85);
    }, 1600);
    return () => clearTimeout(nameStart);
  }, [phase]);

  useEffect(() => {
    if (nameIdx < name.length) return;
    const rolePause = setTimeout(() => {
      const iv = setInterval(() => {
        setRoleIdx((i) => {
          if (i >= role.length) {
            clearInterval(iv);
            return i;
          }
          return i + 1;
        });
      }, 55);
    }, 400);
    return () => clearTimeout(rolePause);
  }, [nameIdx]);

  useEffect(() => {
    if (roleIdx < role.length) return;
    const warpDelay = setTimeout(() => setPhase("warp"), 1400);
    return () => clearTimeout(warpDelay);
  }, [roleIdx]);

  useEffect(() => {
    if (phase !== "warp") return;
    const t = setTimeout(onComplete, 1100);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const constellations = useMemo(
    () => [
      [[12, 22], [18, 30], [25, 20], [31, 34], [37, 26]],
      [[62, 18], [68, 26], [74, 20], [80, 32], [86, 22]],
      [[15, 68], [22, 74], [30, 70], [36, 80], [44, 72]],
      [[60, 72], [68, 80], [76, 74], [82, 82]],
    ] as Array<Array<[number, number]>>,
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stars */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "black" ? 0 : 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <StarField className="h-full w-full" density={1.1} />
      </motion.div>

      {/* Nebula */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "var(--gradient-nebula)" }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: phase === "black" ? 0 : 0.85, scale: phase === "black" ? 1.1 : 1 }}
        transition={{ duration: 3.2, ease: "easeOut" }}
      />

      {/* Constellations */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {constellations.map((line, i) => (
          <g key={i}>
            {line.map(([x, y], j) => (
              <motion.circle
                key={j}
                cx={x}
                cy={y}
                r={0.35}
                fill="oklch(0.95 0.05 220)"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "space" ? 1 : 0 }}
                transition={{ delay: 1 + i * 0.2 + j * 0.08, duration: 0.6 }}
              />
            ))}
            <motion.polyline
              points={line.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke="oklch(0.75 0.2 230 / 0.5)"
              strokeWidth={0.12}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: phase === "space" ? 1 : 0, opacity: phase === "space" ? 1 : 0 }}
              transition={{ delay: 1.4 + i * 0.25, duration: 1.6, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 4px oklch(0.75 0.22 230 / 0.8))" }}
            />
          </g>
        ))}
      </svg>

      {/* Typography */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="scanline relative">
          <h1
            className="text-hologram text-4xl font-black tracking-[0.18em] sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                animate={{
                  opacity: i < nameIdx ? 1 : 0,
                  filter: i < nameIdx ? "blur(0px)" : "blur(8px)",
                  y: i < nameIdx ? 0 : 6,
                }}
                transition={{ duration: 0.25 }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mt-6 font-mono text-sm tracking-[0.35em] text-hologram/80 sm:text-base"
          style={{ color: "oklch(0.85 0.15 220)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: nameIdx >= name.length ? 1 : 0 }}
        >
          <span>{role.slice(0, roleIdx).toUpperCase()}</span>
          <motion.span
            className="ml-1 inline-block h-[1em] w-[2px] align-middle bg-current"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Warp overlay */}
      <AnimatePresence>
        {phase === "warp" && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 120 }).map((_, i) => {
              const angle = (i / 120) * Math.PI * 2;
              const dist = 4 + (i % 7);
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[2px] w-24 origin-left bg-gradient-to-r from-white via-sky-300 to-transparent"
                  style={{
                    transform: `rotate(${angle}rad)`,
                    filter: "drop-shadow(0 0 6px oklch(0.85 0.2 220))",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: dist * 8, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, delay: (i % 10) * 0.02, ease: "easeOut" }}
                />
              );
            })}
            <motion.div
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 60, opacity: [1, 1, 0] }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              style={{ boxShadow: "0 0 80px 40px oklch(0.9 0.15 220)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="glass-panel absolute right-5 top-5 z-30 rounded-full px-4 py-2 font-mono text-xs tracking-[0.2em] text-hologram transition hover:brightness-125"
        style={{ color: "oklch(0.9 0.12 220)" }}
      >
        SKIP INTRO →
      </button>
    </motion.div>
  );
}
