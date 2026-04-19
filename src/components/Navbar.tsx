"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { playHoverSound, playClickSound } = useAudio();

  const links = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "#technology" },
    { name: "Solutions", href: "#solutions" },
    { name: "Intelligence", href: "#intelligence" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#050505]/60 backdrop-blur-xl border-white/10 py-5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          onClick={() => playClickSound()}
          onMouseEnter={() => playHoverSound()}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center relative"
          >
            <Shield className="w-8 h-8 text-white relative z-10" />
            <div className="absolute inset-0 bg-accent-glow blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </motion.div>
          <span className="text-white font-black text-xl tracking-[0.2em] hidden sm:block uppercase">
            Valora
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 relative">
          {links.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => playClickSound()}
              onMouseEnter={() => {
                setHoveredIndex(index);
                playHoverSound();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-semibold transition-colors duration-300"
            >
              <span className={`relative z-10 transition-colors duration-300 ${hoveredIndex === index ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                {item.name}
              </span>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-white rounded-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          {/* Threat Ticker */}
          <div className="ml-6 flex items-center justify-center gap-2 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase font-bold">Threat Level: Elevated</span>
          </div>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <MagneticButton 
            className="hidden md:flex overflow-hidden rounded-md group"
            onClick={() => playClickSound()}
          >
            <div 
              className="relative px-6 py-2.5 bg-accent-base text-white text-sm font-bold uppercase tracking-wider transition-colors hover:bg-transparent"
              onMouseEnter={() => playHoverSound()}
            >
              <span className="relative z-10 group-hover:text-accent-glow transition-colors duration-300">Get Access</span>
              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
            </div>
          </MagneticButton>
          
          <button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playClickSound();
            }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-4">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playClickSound();
                  }}
                  className="text-white/70 hover:text-white text-2xl font-bold uppercase tracking-wider transition-colors py-2 border-b border-white/5"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded bg-red-500/10 border border-red-500/20 w-fit">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase font-bold">Threat Level: Elevated</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
