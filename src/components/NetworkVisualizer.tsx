"use client";

export default function NetworkVisualizer() {
  return (
    <section id="technology" className="relative w-full h-[400px] bg-transparent border-y border-white/5 overflow-hidden flex items-center justify-center">
      <div className="absolute z-10 pointer-events-none text-center">
        <h3 className="text-white text-3xl md:text-5xl font-black uppercase tracking-widest mb-2 shadow-black drop-shadow-2xl">
          Global Threat Network
        </h3>
        <p className="text-accent-glow font-mono text-sm tracking-widest bg-black/40 px-4 py-1 rounded inline-block backdrop-blur-sm mt-4">
          Monitoring 2.4 Billion Nodes
        </p>
      </div>
    </section>
  );
}
