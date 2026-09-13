import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { HomeSection } from "./components/HomeSection";
import { SkillsSection } from "./components/SkillsSection";
import { WorkSection } from "./components/WorkSection";
import { ContactSection } from "./components/ContactSection";
import { PageTransition } from "./components/PageTransition";
import { TransitionOverlay } from "./components/TransitionOverlay";
import { ParallaxBackground } from "./components/ParallaxBackground";

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");

  // Use IntersectionObserver to update active nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "home") setActiveSection(0);
            if (id === "skills") setActiveSection(1);
            if (id === "work") setActiveSection(2);
            if (id === "contact") setActiveSection(3);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (index: number) => {
    if (activeSection === index || isTransitioning) return;

    setTransitionDirection(index > activeSection ? "forward" : "backward");
    setIsTransitioning(true);

    // Jump scroll midpoint
    setTimeout(() => {
      const sections = ["home", "skills", "work", "contact"];
      const el = document.getElementById(sections[index]);
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: "instant" });
      }
    }, 400);

    // Finish transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handleBackToHome = () => {
    handleNavClick(0);
  };

  return (
    <>
      <TransitionOverlay
        isTransitioning={isTransitioning}
        direction={transitionDirection}
      />

      <Navigation activeSection={activeSection} onNavigate={handleNavClick} />

      <motion.main
        className="relative w-full text-white selection:bg-white/30 bg-[#0a0a0a]"
        animate={{
          scale: isTransitioning ? 0.95 : 1,
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Home Section */}
        <section
          id="home"
          className="relative w-full min-h-screen overflow-hidden"
        >
          <ParallaxBackground
            src="/assets/technohouse1.jpeg"
            overlayClass="bg-black/30"
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          <PageTransition>
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center pt-20">
              <HomeSection />
            </div>
          </PageTransition>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="relative w-full min-h-screen overflow-hidden"
        >
          <ParallaxBackground
            src="/assets/technohouse2.jpeg"
            overlayClass="bg-black/40"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
          <PageTransition>
            <div className="relative z-10 w-full min-h-screen pt-24 pb-12">
              <SkillsSection />
            </div>
          </PageTransition>
        </section>

        {/* Work Section (Basement) */}
        <section
          id="work"
          className="relative w-full min-h-screen overflow-hidden"
        >
          <ParallaxBackground
            src="/assets/basemnt.jpeg"
            overlayClass="bg-black/40"
          />
          <PageTransition>
            <div className="relative z-10 w-full min-h-screen pt-24 pb-12 flex flex-col items-center">
              <WorkSection />
            </div>
          </PageTransition>
        </section>

        {/* Contact Section (Cave) */}
        <section
          id="contact"
          className="relative w-full min-h-screen overflow-hidden"
        >
          <ParallaxBackground
            src="/assets/cavee.jpeg"
            overlayClass="bg-black/50"
          />
          <div className="absolute top-0 w-full h-32 bg-green-900/20 blur-xl pointer-events-none" />
          <div className="absolute bottom-0 w-full h-1/4 bg-teal-900/20 blur-3xl pointer-events-none" />
          <PageTransition>
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
              <ContactSection onBackToHome={handleBackToHome} />
            </div>
          </PageTransition>
        </section>
      </motion.main>
    </>
  );
}
