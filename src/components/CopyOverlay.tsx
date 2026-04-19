"use client";

import { motion, useTransform } from "framer-motion";

interface CopyOverlayProps {
  progress: any;
}

export default function CopyOverlay({ progress }: CopyOverlayProps) {
  const phase1Opacity = useTransform(progress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const phase1Y = useTransform(progress, [0, 0.05, 0.15, 0.2], [50, 0, 0, -50]);

  const phase2Opacity = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const phase2Y = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [50, 0, 0, -50]);

  const phase3Opacity = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const phase3Y = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [50, 0, 0, -50]);

  const phase4Opacity = useTransform(progress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const phase4Y = useTransform(progress, [0.75, 0.8, 0.9, 0.95], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="relative w-full max-w-5xl px-6 h-full">

        <motion.div
          style={{ opacity: phase1Opacity, y: phase1Y }}
          className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 max-w-md"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Next-Gen Intelligence Systems</h2>
          <p className="text-white/60 text-lg">Security that thinks ahead. A unified architectural core for modern landscapes.</p>
        </motion.div>

        <motion.div
          style={{ opacity: phase2Opacity, y: phase2Y }}
          className="absolute top-1/2 right-6 md:right-0 -translate-y-1/2 max-w-md text-right"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Precision Architecture</h2>
          <p className="text-white/60 text-lg">Built with surgical precision. Every component optimized for absolute control.</p>
        </motion.div>

        <motion.div
          style={{ opacity: phase3Opacity, y: phase3Y }}
          className="absolute top-[30%] left-6 md:left-20 max-w-md"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Adaptive Threat Detection</h2>
          <p className="text-white/60 text-lg">Continuous analysis of noise and anomalies to neutralize threats in real time.</p>
        </motion.div>

        <motion.div
          style={{ opacity: phase4Opacity, y: phase4Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-md w-full px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-base to-accent-glow">
            AI-Driven Monitoring
          </h2>
          <p className="text-white/60 text-lg mb-8">Autonomous response capabilities that outpace the speed of attack.</p>
          <button className="px-8 py-3 rounded bg-white text-black font-semibold pointer-events-auto hover:bg-accent-glow hover:text-white transition-colors duration-300">
            Take Control
          </button>
        </motion.div>

      </div>
    </div>
  );
}
