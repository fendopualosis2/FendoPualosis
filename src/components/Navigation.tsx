import { motion } from "motion/react";
import { cn } from "../utils";

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { label: "HOME", index: 0 },
    { label: "SKILLS", index: 1 },
    { label: "WORK", index: 2 },
    { label: "CONTACT", index: 3 },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel-light rounded-full px-6 py-3 flex items-center gap-4 md:gap-8"
    >
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavigate(item.index)}
          className={cn(
            "font-pixel text-sm md:text-xl tracking-wider transition-all duration-300 relative",
            activeSection === item.index
              ? "text-white text-glow scale-110"
              : "text-white/60 hover:text-white/90 hover:scale-105",
          )}
        >
          {item.label}
          {activeSection === item.index && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
            />
          )}
        </button>
      ))}
    </motion.nav>
  );
}
