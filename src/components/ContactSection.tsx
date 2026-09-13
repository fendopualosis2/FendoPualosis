import { motion } from "motion/react";
import { Play, Camera, Mail, ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";

interface ContactSectionProps {
  onBackToHome: () => void;
}

export function ContactSection({ onBackToHome }: ContactSectionProps) {
  const { socials } = PORTFOLIO_DATA;

  const links = [
    {
      name: "YOUTUBE",
      icon: Play,
      url: socials.youtube,
      display: "youtube.com/@FendoPualosis",
      color:
        "text-red-400 hover:text-red-300 hover:shadow-[0_0_15px_rgba(248,113,113,0.5)]",
    },
    {
      name: "INSTAGRAM",
      icon: Camera,
      url: socials.instagram,
      display: "@fendopualosis",
      color:
        "text-pink-400 hover:text-pink-300 hover:shadow-[0_0_15px_rgba(244,114,182,0.5)]",
    },
    {
      name: "EMAIL",
      icon: Mail,
      url: socials.email,
      display: "fendopualosis@gmail.com",
      color:
        "text-blue-400 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]",
    },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-4 glass-panel-light p-8 rounded-2xl border-white/10 transition-all duration-300 ${link.color} bg-black/40`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: Math.sin(i * 2) * 10, // Gentle organic floating
              }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{
                opacity: { delay: i * 0.2 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.1, y: -10 }}
            >
              <Icon className="w-12 h-12" />
              <span className="font-pixel text-xl tracking-widest">
                {link.name}
              </span>
              <span className="font-sans text-sm opacity-80 text-white truncate max-w-[200px]">
                {link.display}
              </span>
            </motion.a>
          );
        })}
      </div>

      <motion.button
        onClick={onBackToHome}
        className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-4 rounded-full border border-white/20 group-hover:border-white/50 bg-white/5 backdrop-blur-sm transition-colors">
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </div>
        <span className="font-pixel tracking-widest">BACK TO HOME</span>
      </motion.button>
    </div>
  );
}
