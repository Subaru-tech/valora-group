"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, ChevronRight } from "lucide-react";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal Panel */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,214,255,0.1)] overflow-hidden"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent-glow/40 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent-glow/40 rounded-br-2xl pointer-events-none" />

            {/* Close */}
            <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-accent-glow w-6 h-6" />
              <span className="text-accent-glow font-mono text-xs tracking-[0.3em] uppercase">Clearance Request</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Request Access</h2>
            <p className="text-white/40 text-sm mb-8">All transmissions are encrypted. Valora Group will respond within 24 hours.</p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-white/50 text-xs uppercase tracking-widest font-mono">Full Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-accent-glow/60 transition-colors placeholder:text-white/20" placeholder="Agent Identifier" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white/50 text-xs uppercase tracking-widest font-mono">Organization</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-accent-glow/60 transition-colors placeholder:text-white/20" placeholder="Organization Name" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white/50 text-xs uppercase tracking-widest font-mono">Threat Brief</label>
                    <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-accent-glow/60 transition-colors placeholder:text-white/20 resize-none" placeholder="Describe your security requirements..." />
                  </div>
                  <button type="submit" className="mt-2 group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent-glow text-black font-black uppercase tracking-widest text-sm hover:shadow-[0_0_40px_rgba(0,214,255,0.5)] transition-all duration-300">
                    Transmit Request <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-black text-white mb-2">Transmission Complete</h3>
                  <p className="text-accent-glow font-mono text-sm">Clearance review initiated. Stand by.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
