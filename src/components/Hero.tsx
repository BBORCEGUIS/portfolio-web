"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Hero() {
  const { personalInfo } = portfolioData;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 reveal">
          <span className="status-pulse" />
          <span className="text-sm text-zinc-400">Disponible para oportunidades</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 reveal reveal-delay-1">
          <span className="text-zinc-300">Hola, soy </span>
          <span className="text-gradient">Bruberky</span>
        </h1>

        <h2 className="text-xl sm:text-2xl font-medium text-zinc-400 mb-4 reveal reveal-delay-2">
          {personalInfo.title}
        </h2>

        <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10 reveal reveal-delay-3">
          {personalInfo.profileSummary}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-12 reveal reveal-delay-3">
          {[
            { value: "2+", label: "Años de\nexperiencia" },
            { value: "6+", label: "Tecnologías\nprincipales" },
            { value: "10+", label: "Proyectos\ncompletados" },
            { value: "TSU", label: "Técnico Superior\nen Informática" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient-warm">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1 whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            <span className="relative z-10">Contactarme</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#experience"
            className="px-8 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-sm hover:border-violet-500/50 hover:text-white transition-all"
          >
            Ver experiencia
          </a>
        </div>

        {/* Location */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-600 reveal reveal-delay-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {personalInfo.location}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
        <span className="text-xs">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-zinc-600 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
