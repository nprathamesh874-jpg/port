import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { IntroSequence } from "@/components/intro/IntroSequence";
import { HeroScene } from "@/components/hero/HeroScene";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SpaceSidebar } from "@/components/nav/SpaceSidebar";
import { UniverseMap } from "@/components/nav/UniverseMap";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { AboutMe } from "@/components/sections/AboutMe";
import { SkillsUniverse } from "@/components/sections/SkillsUniverse";
import { ProjectWorlds } from "@/components/sections/ProjectWorlds";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ContactStation } from "@/components/sections/ContactStation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prathamesh Nalawade — Full Stack Developer" },
      {
        name: "description",
        content:
          "Immersive universe portfolio of Prathamesh Nalawade — full stack developer building cinematic web experiences with React, Node.js and modern tooling.",
      },
      { property: "og:title", content: "Prathamesh Nalawade — Full Stack Developer" },
      {
        property: "og:description",
        content: "Step into an interactive universe portfolio by Prathamesh Nalawade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a1a" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Prathamesh Nalawade",
          jobTitle: "Full Stack Developer",
          description: "Full stack developer & Computer Engineering student.",
          knowsAbout: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js"],
        }),
      },
    ],
  }),
  component: Index,
});

const VISIT_KEY = "pn-portfolio-visited";
const SECTIONS = ["home", "about", "skills", "projects", "timeline", "contact"];

function Index() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [active, setActive] = useState("home");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      setShowIntro(!localStorage.getItem(VISIT_KEY));
    } catch {
      setShowIntro(true);
    }
  }, []);

  const finishIntro = useCallback(() => {
    try {
      localStorage.setItem(VISIT_KEY, "1");
    } catch {
      /* noop */
    }
    setShowIntro(false);
  }, []);

  const goTo = useCallback((id: string) => {
    if (id === "settings") {
      // no settings surface yet — scroll to contact as a graceful fallback
      id = "contact";
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (showIntro) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -30% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [showIntro]);

  if (showIntro === null) return <div className="min-h-screen bg-background" />;

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSequence key="intro" onComplete={finishIntro} onSkip={finishIntro} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <SpaceSidebar active={active} onNavigate={goTo} />
          <UniverseMap active={active} onNavigate={goTo} />
          <SoundToggle />
        </>
      )}

      <main ref={mainRef}>
        <HeroScene />
        <AboutMe />
        <SkillsUniverse />
        <ProjectWorlds />
        <JourneyTimeline />
        <ContactStation />
        <footer className="relative border-t py-8 text-center font-mono text-[10px] tracking-[0.3em]" style={{ borderColor: "oklch(0.7 0.15 230 / 0.2)", color: "oklch(0.7 0.1 220 / 0.7)" }}>
          © 2026 PRATHAMESH NALAWADE · CRAFTED IN THE COSMOS
        </footer>
      </main>
    </>
  );
}
