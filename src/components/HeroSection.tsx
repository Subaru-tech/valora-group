"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import TextReveal from "./TextReveal";

// Floating particles component
const Particles = () => {
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });
  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent-glow rounded-full opacity-30"
          initial={{
            x: Math.random() * windowSize.w,
            y: Math.random() * windowSize.h,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent z-10 pt-20">
      <Particles />

      {/* Glow Effects - kept subtle so global particles show through */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-accent-base/10 blur-[160px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/5 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4 text-accent-glow" />
          <span className="text-accent-glow text-xs font-semibold tracking-widest uppercase">
            System Online 
          </span>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tight leading-[0.95]">
            <TextReveal text="Precision." delay={0.3} stagger={0.04} />
            <br className="hidden md:block" />
            <TextReveal text="Intelligence." delay={0.6} stagger={0.04} />
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-base to-accent-glow">
              <TextReveal text="Control." delay={0.9} stagger={0.05} />
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
          className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Advanced digital security for a world under constant threat. 
          Unmatched architecture designed for the absolute elite.
        </motion.p>
      </div>

      {/* Scroll indicator overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-medium uppercase tracking-widest">
          Initiate Sequence
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-accent-glow w-5 h-5 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
