"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const Redact = ({ w }: { w: string }) => (
  <span className={`inline-block bg-white/70 ${w} h-3.5 rounded-[2px] align-middle mx-1`} />
);

const testimonials: {
  quote: string;
  author: React.ReactNode;
  role: string;
  org: React.ReactNode;
  stars: number;
}[] = [
  {
    quote: "Valora Group neutralized a nation-state level intrusion within 0.3ms of detection. Unprecedented.",
    author: <><Redact w="w-20" /><Redact w="w-12" /></>,
    role: "Chief Security Officer",
    org: <><Redact w="w-28" /> [REDACTED]</>,
    stars: 5,
  },
  {
    quote: "The AI-driven monitoring flagged a zero-day before any public disclosure. We were protected before the world knew the threat existed.",
    author: <>Agent <Redact w="w-16" /></>,
    role: "Director of Intelligence",
    org: <><Redact w="w-12" /> Operations Group</>,
    stars: 5,
  },
  {
    quote: "Project Sentinel completely transformed our threat posture. 100% uptime, zero incidents in 18 months.",
    author: <><Redact w="w-10" /><Redact w="w-20" /></>,
    role: "VP Infrastructure",
    org: <><Redact w="w-24" /> Financial [CLASSIFIED]</>,
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-transparent py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-accent-glow/30 bg-accent-glow/5 text-accent-glow font-mono text-xs tracking-widest uppercase mb-6">
            Classified Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            <TextReveal text="Field Reports" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden group hover:border-accent-glow/30 transition-colors duration-500"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-accent-glow text-sm">★</span>
                ))}
              </div>

              <p className="text-white/70 text-base leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-bold font-mono">{t.author}</p>
                <p className="text-white/40 text-sm mt-1">{t.role}</p>
                <p className="text-accent-glow/60 text-xs mt-1 font-mono tracking-wider">{t.org}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
