"use client";

import { motion } from "framer-motion";

export default function MetricsSection() {
  const metrics = [
    { value: "$2.4B+", label: "Revenue Protected" },
    { value: "0.2ms", label: "Threat Response Latency" },
    { value: "100%", label: "Uptime Across Global Nodes" },
  ];

  return (
    <section id="intelligence" className="w-full bg-transparent py-24 relative z-10 overflow-hidden">
      <div className="absolute inset-0 flex justify-around pointer-events-none">
        <div className="w-px h-full bg-white/5" />
        <div className="w-px h-full bg-white/5" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col border-l border-accent-glow/30 pl-6"
            >
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-2 tracking-tighter">{m.value}</h3>
              <p className="text-accent-glow text-lg uppercase tracking-widest font-semibold">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
