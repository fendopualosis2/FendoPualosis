import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function TransitionOverlay({ isTransitioning, direction }: { isTransitioning: boolean, direction: 'forward' | 'backward' }) {
  // We want to render a sweeping light block and some particles.
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div 
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center"
        >
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80"
          />
          
          {/* Sweeping Light / Block */}
          <motion.div
            initial={{ x: direction === 'forward' ? '-100%' : '100%', skewX: -20 }}
            animate={{ x: direction === 'forward' ? '100%' : '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-[150%] h-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-md"
          />
          
          {/* Secondary block */}
          <motion.div
            initial={{ x: direction === 'forward' ? '-120%' : '120%', skewX: -10 }}
            animate={{ x: direction === 'forward' ? '120%' : '-120%' }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
            className="absolute w-full h-full bg-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.8)] mix-blend-screen opacity-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
