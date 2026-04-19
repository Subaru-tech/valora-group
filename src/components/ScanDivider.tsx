"use client";

import { motion } from "framer-motion";

export default function ScanDivider() {
  return (
    <div className="relative w-full h-[2px] overflow-visible z-10 my-2">
      {/* Static line */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Scanning glow */}
      <motion.div
        animate={{ x: ["-10%", "110%"] }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        className="absolute top-1/2 -translate-y-1/2 w-[15%] h-[4px] bg-gradient-to-r from-transparent via-accent-glow to-transparent blur-[2px] shadow-[0_0_12px_rgba(0,214,255,0.8)]"
      />
    </div>
  );
}
