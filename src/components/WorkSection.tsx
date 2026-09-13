import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_DATA } from "../data";
import { GlassModal } from "./ui/GlassModal";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "../utils";

function YoutubeModal() {
  const videos = PORTFOLIO_DATA.work.videos;
  const loading = false;
  const error = null;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (videos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const prev = () => {
    if (videos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden relative">
      <h2 className="font-pixel text-4xl mb-8 text-white text-glow text-center">
        YOUTUBER
      </h2>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-white border-r-white border-b-white/20 border-l-white/20 rounded-full animate-spin mb-4" />
          <p className="font-pixel text-white/50">Loading channel data...</p>
        </div>
      ) : error || videos.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/40 rounded-2xl border border-red-500/20 max-w-lg mx-auto">
          <p className="font-sans text-red-400 text-lg mb-2">
            Error loading videos
          </p>
          <p className="font-pixel text-white/70 leading-relaxed">
            {error || "No videos found."}
          </p>
        </div>
      ) : (
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1, zIndex: 10 }}
              exit={{ opacity: 0, x: -100, scale: 0.9, zIndex: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group cursor-pointer bg-zinc-900"
              onClick={() =>
                window.open(
                  videos[currentIndex].url ||
                    `https://www.youtube.com/@FendoPualosis`,
                  "_blank",
                )
              }
            >
              <img
                src={videos[currentIndex].thumbnail}
                alt={videos[currentIndex].title}
                className="w-full h-full object-contain bg-black transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100">
                <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-10 h-10 text-white ml-2" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="font-sans text-3xl font-bold text-white mb-2">
                  {videos[currentIndex].title}
                </h3>
                <p className="font-pixel text-sm text-white/50">
                  {videos[currentIndex].channelTitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {videos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute -left-6 md:-left-12 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute -right-6 md:-right-12 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function EventsModal() {
  const { events } = PORTFOLIO_DATA.work;
  const { images } = PORTFOLIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  const getEventImage = (id: string) => {
    if (id === "mun") return images.wojak;
    if (id === "hackathon") return images.hacker;
    return images.townHall;
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 gap-8">
      <div className="flex-1 max-w-xl">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={getEventImage(events[currentIndex].id)}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="absolute inset-0 w-full h-full object-contain bg-black/40"
            />
          </AnimatePresence>
        </div>
      </div>
      <div className="flex-1 flex flex-col max-w-md">
        <h2 className="font-pixel text-4xl mb-8 text-white text-glow">
          EVENTS
        </h2>
        <div className="flex flex-col gap-4">
          {events.map((ev, i) => (
            <button
              key={ev.id}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "text-left p-6 rounded-xl transition-all duration-300 border",
                currentIndex === i
                  ? "bg-white/10 border-white/30 backdrop-blur-md"
                  : "bg-transparent border-transparent text-white/50 hover:text-white/80 hover:bg-white/5",
              )}
            >
              <h3 className="font-pixel text-2xl mb-2">{ev.title}</h3>
              <AnimatePresence>
                {currentIndex === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="font-sans text-sm leading-relaxed overflow-hidden"
                  >
                    {ev.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NGOModal() {
  const { images, work } = PORTFOLIO_DATA;
  return (
    <div className="w-full h-full flex flex-col p-12 items-center justify-center text-center max-w-3xl mx-auto">
      <h2 className="font-pixel text-5xl mb-12 text-teal-300 text-glow">
        NGOs & NON-PROFITS
      </h2>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(20,184,166,0.2)] mb-8"
      >
        <img
          src={images.mrBeast}
          alt="NGO"
          className="w-full h-full object-contain bg-black/40"
        />
      </motion.div>
      <p className="font-sans text-xl leading-relaxed text-slate-300">
        {work.ngo.description}
      </p>
    </div>
  );
}

export function WorkSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Custom painting frame style
  const PaintingFrame = ({ children, title, onClick, layoutId }: any) => (
    <motion.div
      layoutId={`painting-${layoutId}`}
      className="relative cursor-pointer group w-64 md:w-80 aspect-[4/3] z-10 mx-4 shadow-[10px_20px_30px_rgba(0,0,0,0.8)]"
      onClick={onClick}
      whileHover={{ scale: 1.05, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Minecraft-style wood frame */}
      <div className="absolute inset-0 bg-[#3a2618] p-3 border-b-8 border-r-8 border-[#1a110a] border-t-8 border-l-8 border-[#4a3424]">
        <div className="w-full h-full bg-zinc-900 overflow-hidden relative flex items-center justify-center border-4 border-black/50">
          {children}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute bottom-4 left-0 w-full text-center">
            <span className="font-pixel text-xl text-white bg-black/80 px-4 py-1.5 rounded-sm minecraft-shadow group-hover:text-amber-300 transition-colors">
              {title}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl px-4 flex flex-col lg:flex-row items-center justify-center mt-12 gap-8 lg:gap-12 perspective-[1000px]">
        <PaintingFrame
          title="EVENTS"
          layoutId="events"
          onClick={() => setActiveModal("events")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center opacity-80">
            <span className="font-pixel text-6xl opacity-30">🎭</span>
          </div>
        </PaintingFrame>

        <PaintingFrame
          title="YOUTUBER"
          layoutId="youtube"
          onClick={() => setActiveModal("youtube")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-black flex items-center justify-center opacity-80">
            <Play className="w-24 h-24 text-red-500 opacity-80" />
          </div>
        </PaintingFrame>

        <PaintingFrame
          title="NGOs"
          layoutId="ngo"
          onClick={() => setActiveModal("ngo")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center opacity-80">
            <span className="font-pixel text-6xl opacity-30">🌍</span>
          </div>
        </PaintingFrame>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setActiveModal(null)}
            />
            <motion.div
              layoutId={`painting-${activeModal}`}
              className="relative w-full max-w-5xl aspect-video bg-black/80 rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden glass-panel"
            >
              {activeModal === "youtube" && <YoutubeModal />}
              {activeModal === "events" && <EventsModal />}
              {activeModal === "ngo" && <NGOModal />}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
