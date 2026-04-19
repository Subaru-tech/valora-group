"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";
import TextReveal from "./TextReveal";

export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] });
    };
    sequence();
  }, [controls]);

  return (
    <section className="relative w-full py-40 bg-transparent flex items-center justify-center overflow-hidden z-10">
      {/* Dynamic Animated Grid Background */}
      <motion.div 
        animate={{
          backgroundSize: ["40px 40px", "45px 45px", "40px 40px"],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] pointer-events-none" 
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-8"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-accent-glow/10 border border-accent-glow/20 text-accent-glow mb-8 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,214,255,0.2)]">
            Authorization Required
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter"
        >
          <TextReveal text="Secure Your" /> <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-accent-glow to-accent-base">
            <TextReveal text="Future" delay={0.3} />
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Deploy the ultimate intelligence architecture. Command the perimeter with zero compromise.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => setModalOpen(true)}
            className="group relative px-10 py-5 rounded-2xl bg-white text-black font-black text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(0,214,255,0.6)]"
          >
            <motion.div
              animate={controls}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] z-0"
            />
            <div className="absolute inset-0 w-full h-full bg-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Deploy Systems
            </span>
          </button>
        </motion.div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
