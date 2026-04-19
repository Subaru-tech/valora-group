"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import TextReveal from "./TextReveal";

const features = [
  {
    icon: "⚡",
    title: "Threat Detection",
    desc: "Real-time zero-day identification across all threat vectors using adaptive neural algorithms.",
  },
  {
    icon: "🛡",
    title: "Real-time Monitoring",
    desc: "24/7 continuous monitoring across 2.4 billion global nodes with millisecond response latency.",
  },
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "Autonomous threat neutralization without any human intervention, patching vulnerabilities in transit.",
  },
];

function SpotlightCard({ feature }: { feature: typeof features[0] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0,80,255,0.12) 0%, rgba(255,255,255,0.03) 60%)`
          : "rgba(255,255,255,0.03)",
      }}
    >
      <div className="text-4xl mb-6">{feature.icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-white/60 leading-relaxed">{feature.desc}</p>
      <div
        className="absolute inset-0 rounded-2xl border border-accent-glow/0 transition-all duration-500"
        style={{ borderColor: isHovered ? "rgba(0,214,255,0.3)" : "transparent" }}
      />
    </motion.div>
  );
}

export default function FeatureGrid() {
  return (
    <section id="solutions" className="w-full bg-transparent py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight"
          >
            <TextReveal text="Core Capabilities" />
          </motion.h2>
          <p className="text-white/50 text-xl">Built for intelligence agencies operating at the edge of possibility.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <SpotlightCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
