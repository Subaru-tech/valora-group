"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function OperationsShowcase() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const projects = [
    { title: "PROJECT AETHER", desc: "Zero-latency deep web threat analysis and mitigation.", color: "from-[#0050FF]" },
    { title: "PROJECT SENTINEL", desc: "Trustless biometric authentication with fluid user experience and quantum-resistant tracking.", color: "from-[#00D6FF]" },
    { title: "PROJECT CORTEX", desc: "Adaptive dashboard logic designed to visualize complex AI outputs across billions of nodes.", color: "from-[#FF0050]" },
    { title: "PROJECT FLUX", desc: "A molecular design system engineered for infinite digital scale and continuous patching.", color: "from-[#00FF85]" },
  ];

  return (
    <section className="w-full bg-transparent py-32 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-4">Operations</h2>
        <p className="text-white/50 text-xl max-w-xl">High-tier deployments neutralizing zero-day vulnerabilities worldwide.</p>
      </div>

      <div className="w-full border-t border-white/10 flex flex-col">
        {projects.map((proj, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative border-b border-white/10 overflow-hidden cursor-pointer"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: hoveredIdx === i ? 1 : 0 }}
              className={`absolute inset-0 bg-gradient-to-r ${proj.color} to-transparent opacity-10 origin-bottom z-0 transition-all duration-500`}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 transition-transform duration-500 group-hover:translate-x-4">
              <h3 className="text-3xl md:text-5xl font-bold text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                {proj.title}
              </h3>
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: hoveredIdx === i ? "auto" : 0, opacity: hoveredIdx === i ? 1 : 0 }}
                className="text-white/70 text-lg mt-4 max-w-xl"
              >
                {proj.desc}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
