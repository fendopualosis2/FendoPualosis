import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code,
  Database,
  MonitorPlay,
  Sparkles,
  Wand2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { GlassModal } from "./ui/GlassModal";
import { cn } from "../utils";

// --- Sub-components for Modals ---

function ThumbnailModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = PORTFOLIO_DATA.skills.thumbnails;
  const loading = false;
  const error = null;

  const next = () => {
    if (videos.length > 0)
      setCurrentIndex((prev) => (prev + 1) % videos.length);
  };
  const prev = () => {
    if (videos.length > 0)
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <h2 className="font-pixel text-4xl mb-12 text-white text-glow">
        GRAPHIC DESIGN & THUMBNAILS
      </h2>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-white border-r-white border-b-white/20 border-l-white/20 rounded-full animate-spin mb-4" />
          <p className="font-pixel text-white/50">Loading channel data...</p>
        </div>
      ) : error || videos.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/40 rounded-2xl border border-red-500/20">
          <p className="font-sans text-red-400 text-lg mb-2">
            Error loading thumbnails
          </p>
          <p className="font-pixel text-white/70 max-w-lg leading-relaxed">
            {error || "No videos found."}
          </p>
        </div>
      ) : (
        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence mode="popLayout">
            {videos.map((video, i) => {
              // Calculate relative index for stack effect
              const diff = (i - currentIndex + videos.length) % videos.length;
              // We only want to show front (0) and a couple behind (1, 2)
              // If it's 3 or 4, we treat them as being on the other side.
              const isFront = diff === 0;
              const isBehind1 = diff === 1;
              const isBehind2 = diff === 2;

              if (!isFront && !isBehind1 && !isBehind2) return null;

              const zIndex = isFront ? 30 : isBehind1 ? 20 : 10;
              const yOffset = isFront ? 0 : isBehind1 ? -40 : -80;
              const scale = isFront ? 1 : isBehind1 ? 0.9 : 0.8;
              const opacity = isFront ? 1 : isBehind1 ? 0.6 : 0.3;
              const blur = isFront ? 0 : isBehind1 ? 4 : 8;

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: opacity,
                    scale: scale,
                    y: yOffset,
                    zIndex: zIndex,
                    filter: `blur(${blur}px)`,
                  }}
                  exit={{ opacity: 0, y: -100, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 cursor-pointer"
                  onClick={() => {
                    if (isFront) window.open(video.url, "_blank");
                    else setCurrentIndex(i);
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-contain bg-black"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />

                  {isFront && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
                    >
                      <h3 className="font-sans text-2xl font-bold text-white">
                        {video.title}
                      </h3>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 text-blue-300 hover:text-blue-200 transition-colors"
                      >
                        View Video <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute -left-12 z-40 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={next}
            className="absolute -right-12 z-40 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hidden md:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Dots */}
      {!loading && videos.length > 0 && (
        <div className="flex gap-3 mt-12 z-40">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentIndex === i
                  ? "bg-cyan-400 scale-150 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "bg-white/30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VideoEditingModal() {
  const { videoEditing } = PORTFOLIO_DATA.skills;
  const [activeApp, setActiveApp] = useState(0);
  const apps = [videoEditing.primary, ...videoEditing.secondary];

  return (
    <div className="w-full h-full flex flex-col p-8">
      <h2 className="font-pixel text-4xl mb-4 text-white text-glow text-center">
        VIDEO EDITING
      </h2>
      <p className="text-center text-slate-300 max-w-2xl mx-auto font-sans mb-8">
        {videoEditing.description}
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {apps.map((app, i) => (
          <button
            key={app}
            onClick={() => setActiveApp(i)}
            className={cn(
              "px-6 py-3 rounded-lg font-pixel text-xl transition-all duration-300 backdrop-blur-md border",
              activeApp === i
                ? "bg-purple-500/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white/80",
            )}
          >
            {app}
          </button>
        ))}
      </div>

      <div className="flex-1 rounded-xl bg-zinc-950/80 border-4 border-white/10 flex flex-col overflow-hidden relative shadow-2xl">
        <img
          src={
            activeApp === 0
              ? PORTFOLIO_DATA.images.davinci
              : activeApp === 1
                ? PORTFOLIO_DATA.images.premiere
                : PORTFOLIO_DATA.images.capcut
          }
          className="absolute inset-0 w-full h-full object-contain bg-black/40 opacity-80 mix-blend-screen transition-opacity duration-500"
          alt={apps[activeApp]}
        />
        {/* Window Header */}
        <div className="relative z-10 h-12 border-b border-white/20 bg-zinc-900/90 flex items-center px-4 gap-4 backdrop-blur-md">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="font-pixel text-sm text-white/70">
            {apps[activeApp]} Workspace
          </div>
        </div>

        <div className="relative z-10 flex-1 p-6 flex flex-col justify-end">
          {/* Descriptive qualities overlay */}
          <motion.div
            key={activeApp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-xl border-2 border-white/20 max-w-xl self-end minecraft-shadow"
          >
            <h3 className="font-pixel text-3xl text-white mb-2 text-glow">
              {apps[activeApp]}
            </h3>
            <p className="font-sans text-lg text-slate-200">
              {activeApp === 0
                ? "Professional color grading, cinematic visual workflows, and complex node-based compositing."
                : activeApp === 1
                  ? "Seamless dynamic transitions, robust multitrack syncing, and precise timeline mastery."
                  : "Rapid-paced mobile editing, high-retention effects, and viral content structuring."}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DevModal() {
  const { development } = PORTFOLIO_DATA.skills;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col p-8">
      <h2 className="font-pixel text-4xl mb-8 text-white text-glow text-center">
        DEVELOPMENT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        <div className="col-span-1 flex flex-col gap-4">
          {development.languages.map((lang, i) => (
            <button
              key={lang.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left",
                activeIndex === i
                  ? "bg-emerald-500/20 border-emerald-500/50 text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10",
              )}
            >
              <img
                src={lang.icon}
                alt={lang.name}
                className="w-8 h-8 opacity-80"
              />
              <span className="font-pixel text-xl">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-black/40 rounded-xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={development.languages[activeIndex].icon}
                  alt=""
                  className="w-16 h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
                <h3 className="font-pixel text-3xl text-emerald-300">
                  {development.languages[activeIndex].name}
                </h3>
              </div>
              <p className="font-sans text-lg text-slate-300 leading-relaxed">
                {development.languages[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="bg-black/40 rounded-xl p-6 border border-white/10 mt-auto">
            <h4 className="font-pixel text-xl text-white/50 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" /> DATA STRUCTURES
            </h4>
            <div className="flex flex-wrap gap-2">
              {development.dataStructures.map((ds) => (
                <span
                  key={ds}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-sans text-sm text-slate-300"
                >
                  {ds}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScriptwriterModal() {
  const { images, skills } = PORTFOLIO_DATA;
  return (
    <div className="w-full h-full flex flex-col md:flex-row p-8 items-center gap-12">
      <div className="flex-1">
        <motion.div
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="rounded-xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(225,29,72,0.3)] relative"
        >
          <img
            src={images.blackbeard}
            alt="Writing"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="font-pixel text-5xl mb-6 text-white text-glow">
          SCRIPTWRITING
        </h2>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
          <p className="font-sans text-xl leading-relaxed text-slate-200">
            {skills.scriptwriting.description}
          </p>
          <ul className="mt-6 space-y-2 font-sans text-slate-400">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> YouTube
              Scripts & Hooks
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Video
              Concepts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Narrative
              Structures
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />{" "}
              Storytelling Sequences
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PromptModal() {
  const { promptEngineering } = PORTFOLIO_DATA.skills;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col p-8 items-center">
      <h2 className="font-pixel text-4xl mb-8 text-amber-300 text-glow text-center flex items-center gap-4">
        <Wand2 className="w-8 h-8" /> PROMPT ENGINEERING
      </h2>

      <div className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-10 w-full text-center relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full" />
            <div className="w-24 h-24 mx-auto rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-6 overflow-hidden p-4">
              {promptEngineering.tools[activeIndex].logo.startsWith("http") ? (
                <img
                  src={promptEngineering.tools[activeIndex].logo}
                  alt={promptEngineering.tools[activeIndex].name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <span className="font-pixel text-4xl text-amber-200">
                  {promptEngineering.tools[activeIndex].logo}
                </span>
              )}
            </div>
            <h3 className="font-sans font-bold text-3xl text-white mb-4">
              {promptEngineering.tools[activeIndex].name}
            </h3>
            <p className="font-sans text-xl text-slate-300">
              {promptEngineering.tools[activeIndex].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-12 overflow-x-auto max-w-full pb-4 px-4 snap-x">
          {promptEngineering.tools.map((tool, i) => (
            <button
              key={tool.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "snap-center shrink-0 px-6 py-3 rounded-full font-sans font-medium transition-all duration-300",
                activeIndex === i
                  ? "bg-amber-500 text-zinc-950 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white",
              )}
            >
              {tool.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Skills Component ---

export function SkillsSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const skillCards = [
    {
      id: "thumb",
      label: "THUMBNAIL DESIGN",
      color: "from-cyan-500/20 to-blue-500/5",
      border: "border-cyan-500/30",
      icon: Sparkles,
    },
    {
      id: "video",
      label: "VIDEO EDITING",
      color: "from-purple-500/20 to-fuchsia-500/5",
      border: "border-purple-500/30",
      icon: MonitorPlay,
    },
    {
      id: "dev",
      label: "DEVELOPMENT",
      color: "from-emerald-500/20 to-green-500/5",
      border: "border-emerald-500/30",
      icon: Code,
    },
    {
      id: "script",
      label: "SCRIPTWRITING",
      color: "from-rose-500/20 to-red-500/5",
      border: "border-rose-500/30",
      icon: Code,
    }, // using standard icons for now
    {
      id: "prompt",
      label: "PROMPT ENGINEERING",
      color: "from-amber-500/20 to-orange-500/5",
      border: "border-amber-500/30",
      icon: Wand2,
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-12">
        {skillCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-sm group cursor-pointer"
              onClick={() => setActiveModal(card.id)}
            >
              {/* Stacked effect behind */}
              <div className="absolute inset-0 bg-white/5 rounded-2xl transform translate-y-4 scale-95 border border-white/5 blur-[2px] transition-transform group-hover:translate-y-6 group-hover:scale-90" />
              <div className="absolute inset-0 bg-white/10 rounded-2xl transform translate-y-2 scale-[0.98] border border-white/10 blur-[1px] transition-transform group-hover:translate-y-3 group-hover:scale-95" />

              {/* Front Card */}
              <div
                className={cn(
                  "relative z-10 w-full aspect-[4/3] rounded-2xl border bg-gradient-to-br backdrop-blur-md p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:-translate-y-2",
                  card.color,
                  card.border,
                )}
              >
                <Icon className="w-12 h-12 mb-4 text-white/80" />
                <h3 className="font-pixel text-2xl text-white text-glow leading-tight">
                  {card.label}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <GlassModal
        isOpen={activeModal === "thumb"}
        onClose={() => setActiveModal(null)}
      >
        <ThumbnailModal />
      </GlassModal>
      <GlassModal
        isOpen={activeModal === "video"}
        onClose={() => setActiveModal(null)}
      >
        <VideoEditingModal />
      </GlassModal>
      <GlassModal
        isOpen={activeModal === "dev"}
        onClose={() => setActiveModal(null)}
      >
        <DevModal />
      </GlassModal>
      <GlassModal
        isOpen={activeModal === "script"}
        onClose={() => setActiveModal(null)}
      >
        <ScriptwriterModal />
      </GlassModal>
      <GlassModal
        isOpen={activeModal === "prompt"}
        onClose={() => setActiveModal(null)}
      >
        <PromptModal />
      </GlassModal>
    </div>
  );
}
