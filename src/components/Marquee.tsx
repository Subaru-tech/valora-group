"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const text = "VALORA GROUP // ADVANCED THREAT DETECTION // SECURE YOUR DIGITAL PERIMETER // NOISE ELIMINATION // CRITICAL INFRASTRUCTURE DEFENSE // ";
  return (
    <section className="relative w-full py-6 bg-accent-base flex items-center overflow-hidden z-10 border-y border-white/20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        <h2 className="text-2xl md:text-3xl font-black text-black tracking-[0.2em] uppercase">
          {text}{text}{text}{text}
        </h2>
      </motion.div>
    </section>
  );
}
