"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
          }, 800);
          return 100;
        }
        // Random rapid increments
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

          {/* Glitching Text sequence */}
          <div className="w-full max-w-sm px-6">
            <div className="flex justify-between text-accent-glow text-xs uppercase tracking-widest font-mono mb-2">
              <span>System Boot</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 h-full bg-accent-glow"
              />
            </div>

            {/* Random Matrix Code / Logs */}
            <div className="mt-4 text-white/30 text-[10px] font-mono h-24 overflow-hidden flex flex-col justify-end">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1 }}
                key={progress}
              >
                {progress < 20 && "> INITIATING BIOS... OK"}
                {progress >= 20 && progress < 40 && "> CONNECTING TO GLOBAL NODES... SECURE"}
                {progress >= 40 && progress < 60 && "> ESTABLISHING QUANTUM ENCRYPTION..."}
                {progress >= 60 && progress < 90 && "> LOADING NEURAL DEFENSE NETWORK..."}
                {progress >= 90 && "> VALORA GROUP ALL SYSTEMS OPERATIONAL."}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
