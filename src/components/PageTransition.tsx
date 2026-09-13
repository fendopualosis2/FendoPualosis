import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ReactNode, useRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"],
  });

  // Apply a spring to the scroll progress for smooth, cinematic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Opacity: smooth fade in/out as it enters/leaves
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Scale: extremely subtle, premium zoom from 0.98 to 1
  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.98, 1, 1, 0.98],
  );

  // Parallax / depth movement: very gentle y-axis shift
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [15, 0, 0, -15]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="w-full h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}
