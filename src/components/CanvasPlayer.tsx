"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface CanvasPlayerProps {
  progress: any; // MotionValue<number>
}

export default function CanvasPlayer({ progress }: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    let animationFrameId: number;

    const render = () => {
      const p = progress.get(); // 0 to 1
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // We will draw a futuristic "Security Core" that disassembles
      // A central core surrounded by orbital rings and data nodes

      // Base rotation derived from progress
      const rotation = p * Math.PI * 4;

      // Calculate phases
      // 0-0.15 Assembled
      // 0.15-0.40 Disassembly (Radius expand)
      // 0.40-0.65 Exploded view
      // 0.65-0.85 Highlight internals
      // 0.85-1.00 Reassembly

      let spread = 0;
      let internalHighlight = 0;
      
      if (p > 0.15 && p <= 0.4) {
        spread = (p - 0.15) / 0.25; // 0 to 1
      } else if (p > 0.4 && p <= 0.65) {
        spread = 1;
      } else if (p > 0.65 && p <= 0.85) {
        spread = 1;
        internalHighlight = (p - 0.65) / 0.2; // 0 to 1
      } else if (p > 0.85) {
        spread = 1 - (p - 0.85) / 0.15; // 1 to 0
      }

      ctx.save();
      ctx.translate(cx, cy);
      
      // Draw Central Core
      ctx.save();
      ctx.rotate(rotation * 0.5);
      const coreSize = 100 + (internalHighlight * 40);
      
      // Core glow
      ctx.shadowBlur = 40 + (internalHighlight * 60);
      ctx.shadowColor = `rgba(0, 214, 255, ${0.4 + internalHighlight * 0.6})`;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * coreSize;
        const y = Math.sin(angle) * coreSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 214, 255, ${0.8 + internalHighlight * 0.2})`;
      ctx.lineWidth = 2 + internalHighlight * 2;
      ctx.stroke();
      
      // Core inner data
      if (internalHighlight > 0) {
        ctx.fillStyle = `rgba(0, 214, 255, ${internalHighlight * 0.3})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, coreSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
      ctx.restore();

      // Draw Exploding Orbital Parts
      const numParts = 24;
      const baseRadius = 150;
      const maxSpread = 300; // How far they fly out
      
      ctx.save();
      ctx.rotate(-rotation);
      for (let i = 0; i < numParts; i++) {
        const angle = (i / numParts) * Math.PI * 2;
        // Even/odd spread differently for depth
        const partSpread = spread * maxSpread * (i % 2 === 0 ? 1 : 0.6);
        const radius = baseRadius + partSpread;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // As it explodes, outer parts become dimmer in highlight phase
        let alpha = 0.6;
        if (internalHighlight > 0) {
           alpha = 0.6 - (internalHighlight * 0.4);
        }

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 80, 255, ${alpha})`;
        ctx.fill();
        
        // Connecting line to core conceptually
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * coreSize, Math.sin(angle) * coreSize);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(0, 80, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw structural segments
        if (i % 3 === 0) {
           ctx.beginPath();
           const nextAngle = ((i + 3) / numParts) * Math.PI * 2;
           const nextX = Math.cos(nextAngle) * radius;
           const nextY = Math.sin(nextAngle) * radius;
           ctx.moveTo(x, y);
           ctx.lineTo(nextX, nextY);
           ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
           ctx.stroke();
        }
      }
      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render(); // Start loop

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none scroll-canvas mix-blend-screen"
    />
  );
}
