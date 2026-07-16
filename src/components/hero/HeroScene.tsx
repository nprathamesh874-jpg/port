import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Compass, Download, Mail, User } from "lucide-react";
import { StarField } from "@/components/space/StarField";
import { MagneticButton } from "@/components/ui/MagneticButton";

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Computer Engineering Student",
  "Problem Solver",
];

function RoleTypewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i];
    const speed = deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setI((v) => (v + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-mono text-lg tracking-widest sm:text-xl md:text-2xl" style={{ color: "oklch(0.85 0.15 220)" }}>
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse align-middle bg-current" />
    </span>
  );
}

function HoloPlatform() {
  return (
    <div className="relative flex h-[420px] w-[420px] items-center justify-center sm:h-[520px] sm:w-[520px]">
      {/* Volumetric light beams */}
      <div
        className="absolute inset-x-1/2 top-0 h-full w-64 -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.75 0.22 230 / 0.7), transparent 70%)",
        }}
      />
      {/* Base ellipse */}
      <div
        className="absolute bottom-6 left-1/2 h-16 w-[85%] -translate-x-1/2 rounded-[100%] opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.75 0.22 230 / 0.55), transparent 65%)",
          filter: "blur(2px)",
        }}
      />
      {/* Ground ring */}
      <div
        className="absolute bottom-10 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[100%] border"
        style={{
          borderColor: "oklch(0.75 0.2 230 / 0.7)",
          boxShadow: "0 0 40px oklch(0.72 0.22 230 / 0.6), inset 0 0 20px oklch(0.72 0.22 230 / 0.5)",
        }}
      />

      {/* Rotating rings */}
      <div className="absolute inset-8 rounded-full border" style={{ borderColor: "oklch(0.75 0.2 230 / 0.35)", animation: "spin-slow 22s linear infinite" }}>
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-hologram shadow-[0_0_18px_var(--hologram-glow)]" style={{ background: "oklch(0.9 0.2 220)" }} />
      </div>
      <div className="absolute inset-16 rounded-full border" style={{ borderColor: "oklch(0.7 0.24 300 / 0.35)", animation: "spin-reverse 30s linear infinite" }}>
        <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full" style={{ background: "oklch(0.75 0.25 320)", boxShadow: "0 0 16px oklch(0.7 0.24 300)" }} />
      </div>
      <div className="absolute inset-24 rounded-full border-2 border-dashed" style={{ borderColor: "oklch(0.8 0.18 210 / 0.45)", animation: "spin-slow 40s linear infinite" }} />

      {/* Holographic photo disc */}
      <motion.div
        className="scanline relative h-56 w-56 rounded-full sm:h-64 sm:w-64"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, oklch(0.35 0.15 250 / 0.85), oklch(0.15 0.08 280 / 0.6))",
          border: "1px solid oklch(0.75 0.2 230 / 0.6)",
          boxShadow: "var(--shadow-glow-strong)",
          animation: "hologram-flicker 4s ease-in-out infinite",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="h-24 w-24" style={{ color: "oklch(0.9 0.12 220)", filter: "drop-shadow(0 0 12px oklch(0.75 0.22 230))" }} strokeWidth={1.2} />
        </div>
        {/* Corner brackets */}
        {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((c, i) => (
          <span key={i} className={`absolute h-4 w-4 ${c}`} style={{ borderColor: "oklch(0.9 0.15 220)" }} />
        ))}
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            background: "oklch(0.9 0.15 220)",
            boxShadow: "0 0 8px oklch(0.75 0.22 230)",
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

function Spaceship() {
  return (
    <motion.div
      className="pointer-events-none absolute top-1/3 left-0 z-[5]"
      style={{ animation: "ship-fly 36s linear infinite" }}
      aria-hidden
    >
      <div className="relative">
        <div
          className="h-2 w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.9 0.2 220 / 0.9))",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute -right-2 top-1/2 h-4 w-8 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, oklch(0.95 0.05 220), oklch(0.4 0.1 260))",
            boxShadow: "0 0 20px oklch(0.75 0.22 230 / 0.8)",
          }}
        />
      </div>
    </motion.div>
  );
}

function Planet({ size, top, left, hue, duration }: { size: number; top: string; left: string; hue: number; duration: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full opacity-70"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle at 30% 30%, oklch(0.75 0.2 ${hue}), oklch(0.25 0.15 ${hue}) 70%, oklch(0.08 0.05 ${hue}))`,
        boxShadow: `0 0 60px oklch(0.5 0.2 ${hue} / 0.5), inset -20px -20px 40px oklch(0.05 0.02 265 / 0.7)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function HeroScene() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = sx.on("change", (v) => setParallax((p) => ({ ...p, x: v })));
    const unsubY = sy.on("change", (v) => setParallax((p) => ({ ...p, y: v })));
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      unsubX();
      unsubY();
    };
  }, [mx, my, sx, sy]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, oklch(0.12 0.06 275) 0%, oklch(0.04 0.02 265) 60%, oklch(0.02 0.01 265) 100%)" }}
    >
      {/* Nebula backdrop */}
      <div className="absolute inset-0 opacity-80" style={{ background: "var(--gradient-nebula)" }} aria-hidden />

      {/* Star field with parallax */}
      <div className="absolute inset-0">
        <StarField className="h-full w-full" density={1.3} parallax={parallax} />
      </div>

      {/* Planets */}
      <Planet size={180} top="8%" left="6%" hue={260} duration={90} />
      <Planet size={90} top="70%" left="82%" hue={320} duration={70} />
      <Planet size={50} top="25%" left="88%" hue={200} duration={50} />

      {/* Asteroids */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6 + Math.random() * 10,
            height: 6 + Math.random() * 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: "oklch(0.4 0.03 265)",
            boxShadow: "inset -2px -2px 4px oklch(0.05 0 0)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Shooting stars */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-[2px] w-40 rounded-full"
          style={{
            top: `${10 + i * 20}%`,
            left: "-10%",
            background: "linear-gradient(90deg, transparent, oklch(0.95 0.05 220), transparent)",
            filter: "drop-shadow(0 0 6px oklch(0.85 0.2 220))",
            animation: `shooting-star ${8 + i * 4}s ease-in ${i * 5}s infinite`,
          }}
        />
      ))}

      <Spaceship />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <motion.div
          className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <HoloPlatform />
          </motion.div>

          <div className="max-w-xl text-center lg:text-left">
            <motion.div
              className="mb-3 font-mono text-xs tracking-[0.4em]"
              style={{ color: "oklch(0.8 0.15 220)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              — WELCOME TO THE UNIVERSE —
            </motion.div>

            <h1
              className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["Prathamesh", "Nalawade"].map((w, wi) => (
                <motion.span
                  key={w}
                  className="text-hologram mr-3 inline-block"
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.4 + wi * 0.25, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <div className="mt-5 h-8">
              <RoleTypewriter />
            </div>

            <motion.p
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              I build immersive digital experiences with modern web technologies.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <MagneticButton
                icon={<Rocket className="h-4 w-4" />}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                Launch Projects
              </MagneticButton>
              <MagneticButton
                icon={<Compass className="h-4 w-4" />}
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Universe
              </MagneticButton>
              <MagneticButton
                icon={<Download className="h-4 w-4" />}
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download Resume
              </MagneticButton>
              <MagneticButton
                icon={<Mail className="h-4 w-4" />}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em]"
          style={{ color: "oklch(0.75 0.12 220 / 0.7)" }}
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          SCROLL TO CONTINUE ↓
        </motion.div>
      </div>
    </section>
  );
}
