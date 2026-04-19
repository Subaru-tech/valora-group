"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-white/10 py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-white group-hover:text-accent-glow transition-colors duration-300" />
          <span className="text-white font-bold text-lg tracking-widest uppercase">
            Valora Group
          </span>
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Valora Group Intelligence. All rights reserved.
          </p>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/10">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-green-500/80 font-mono text-[10px] uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-white/40 hover:text-white text-sm transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
