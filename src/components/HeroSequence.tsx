"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import CanvasPlayer from "./CanvasPlayer";
import CopyOverlay from "./CopyOverlay";

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of this container representing 400vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      {/* Sticky container that stays in view throughout the 400vh scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <CanvasPlayer progress={scrollYProgress} />
        <CopyOverlay progress={scrollYProgress} />
      </div>
    </section>
  );
}
