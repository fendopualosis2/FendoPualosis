import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

interface ParallaxBackgroundProps {
  src: string;
  overlayClass?: string;
}

export function ParallaxBackground({
  src,
  overlayClass = "bg-black/30",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apply a spring to the scroll progress for smooth, cinematic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // The background image moves slower than the scroll, creating subtle depth
  const y = useTransform(smoothProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${src})`, y }}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
