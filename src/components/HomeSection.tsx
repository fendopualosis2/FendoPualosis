import { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data";

export function HomeSection() {
  const [hoveredRole, setHoveredRole] = useState<number | null>(null);

  // Position roles in a staggered layout, pushed very far out to edge
  const rolePositions = [
    { left: "0%", top: "15%" },
    { right: "0%", top: "15%" },
    { left: "5%", top: "50%" },
    { right: "5%", top: "50%" },
    { left: "0%", top: "85%" },
    { right: "0%", top: "85%" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full max-w-7xl h-full min-h-[600px] flex items-center justify-center mt-12 px-4">
        {/* Central Character */}
        <motion.div
          className="relative z-10 w-[36rem] h-[48rem] flex flex-col items-center justify-center pointer-events-none"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ambient glow behind character */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full scale-150" />

          <motion.div
            className="font-pixel text-2xl text-white mb-4 tracking-widest bg-black/50 px-6 py-2 rounded-md border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20"
            style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.9)" }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Fendo_Pualosis
          </motion.div>

          <img
            src={PORTFOLIO_DATA.images.character}
            alt="Character"
            className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          />
        </motion.div>

        {/* Floating Roles */}
        {PORTFOLIO_DATA.roles.map((role, i) => {
          const pos = rolePositions[i % rolePositions.length];
          const isHovered = hoveredRole === i;

          return (
            <motion.div
              key={role.title}
              className={`absolute cursor-pointer glass-panel px-6 py-4 rounded-xl ${role.color} flex items-center justify-center hidden md:flex`}
              style={{ ...pos }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.15 : 1,
                y: [-3, 3, -3],
                zIndex: isHovered ? 20 : 5,
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 + i * 0.1 },
                scale: { duration: 0.2 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                },
              }}
              onHoverStart={() => setHoveredRole(i)}
              onHoverEnd={() => setHoveredRole(null)}
            >
              <span className="font-pixel text-xl tracking-wider minecraft-shadow px-2">
                {role.title}
              </span>
            </motion.div>
          );
        })}

        {/* Mobile Floating Roles (Stacked at bottom) */}
        <div className="absolute bottom-24 w-full flex md:hidden flex-wrap justify-center gap-3 px-4 z-20">
          {PORTFOLIO_DATA.roles.map((role, i) => (
            <div
              key={`mobile-${role.title}`}
              className={`px-4 py-2 rounded-lg text-sm font-pixel ${role.color} bg-black/60 border border-white/20`}
            >
              {role.title}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-pixel text-sm uppercase tracking-widest text-white">
          Scroll
        </span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
}
