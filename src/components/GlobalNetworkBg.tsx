"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  colorType: "orange" | "cyan";
  baseVx: number;
  baseVy: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = Math.random() * 2 + 0.3;
    this.baseVx = (Math.random() - 0.5) * 0.8 * this.z;
    this.baseVy = (Math.random() - 0.5) * 0.8 * this.z;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    this.radius = (Math.random() * 1.5 + 0.5) * this.z;
    this.colorType = Math.random() > 0.7 ? "orange" : "cyan";
  }

  update(width: number, height: number, mouse: { x: number; y: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 300) {
      this.vx += dx * 0.0008 * this.z;
      this.vy += dy * 0.0008 * this.z;
    } else {
      this.vx += (this.baseVx - this.vx) * 0.05;
      this.vy += (this.baseVy - this.vy) * 0.05;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -50) this.x = width + 50;
    if (this.x > width + 50) this.x = -50;
    if (this.y < -50) this.y = height + 50;
    if (this.y > height + 50) this.y = -50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const rgb = this.colorType === "orange" ? "255, 140, 0" : "0, 214, 255";
    let alpha = 0.8;
    if (this.z > 1.8) alpha = 0.3;
    else if (this.z < 0.5) alpha = 0.4;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    if (this.z > 0.8 && this.z < 1.8) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
      gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    } else {
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
    }

    ctx.fill();
    ctx.closePath();
  }
}

export default function GlobalNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 5), 250);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(width, height));
    }

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    let animationFrame: number;

    const render = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(width, height, mouse);

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300 && p.z > 0.5 && p.z < 2.0) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const alpha = (1 - dist / 300) * 0.7;
          const rgb = p.colorType === "orange" ? "255, 140, 0" : "0, 214, 255";
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.lineWidth = p.radius * 0.5;
          ctx.stroke();
          ctx.closePath();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (Math.abs(p.z - p2.z) > 1.2) continue;
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (distance < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - distance / 160) * 0.4;
            const rgb = p.colorType === "orange" ? "255, 170, 0" : "0, 150, 255";
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = Math.min(p.radius, p2.radius) * 0.3;
            ctx.stroke();
            ctx.closePath();
          }
        }

        p.draw(ctx);
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
