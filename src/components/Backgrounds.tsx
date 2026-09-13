import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";

interface BackgroundsProps {
  activeSection: number;
  direction: number; // 1 for down/forward, -1 for up/backward
  isCut?: boolean;
}

export function Backgrounds({ activeSection, direction, isCut }: BackgroundsProps) {
  // We have 4 environments:
  // 0: Home (Cozy Interior)
  // 1: Skills (Snowy Exterior)
  // 2: Work (Basement)
  // 3: Contact (Lush Cave)

  // Variant for cinematic zoom transition
  const variants = {
    enter: (dir: number) => ({
      scale: isCut ? 1 : (dir > 0 ? 1.2 : 0.8),
      opacity: 0,
      filter: isCut ? "blur(0px)" : "blur(10px)",
    }),
    center: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: isCut ? 0.4 : 1.2, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir: number) => ({
      scale: isCut ? 1 : (dir > 0 ? 0.8 : 1.2),
      opacity: 0,
      filter: isCut ? "blur(0px)" : "blur(10px)",
      transition: { duration: isCut ? 0.4 : 1.2, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-[#0a0a0a]">
      <AnimatePresence custom={direction} mode="sync">
        {activeSection === 0 && (
          <motion.div
            key="bg-home"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/technohouse1.jpeg)' }} />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
          </motion.div>
        )}

        {activeSection === 1 && (
          <motion.div
            key="bg-skills"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/technohouse2.jpeg)' }} />
            {/* Fog/Atmosphere */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
            {/* Cinematic lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
          </motion.div>
        )}

        {activeSection === 2 && (
          <motion.div
            key="bg-work"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/basemnt.jpeg)' }} />
            <div className="absolute inset-0 bg-black/50" />
            {/* Blue/Purple accent lighting */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/30 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-900/30 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          </motion.div>
        )}

        {activeSection === 3 && (
          <motion.div
            key="bg-contact"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/cavee.jpeg)' }} />
            <div className="absolute inset-0 bg-black/60" />
            {/* Glowing berries/vines abstraction */}
            <div className="absolute top-0 w-full h-32 bg-green-900/40 blur-xl pointer-events-none" />
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-yellow-400 blur-[2px] pointer-events-none"
                style={{
                  top: `${Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 15px 5px rgba(250, 204, 21, 0.6)',
                  animation: `pulse ${2 + Math.random() * 2}s infinite alternate`
                }}
              />
            ))}
            <div className="absolute bottom-0 w-full h-1/4 bg-teal-900/30 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global CSS for some keyframes if needed */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
