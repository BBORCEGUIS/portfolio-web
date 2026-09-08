"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const project = portfolioData.projects[0];

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="text-sm font-mono text-pink-400 mb-2">{"// Proyectos"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Proyectos</h2>
        </div>

        {/* Project Card */}
        <div className="glass rounded-2xl overflow-hidden reveal">
          {/* Project Header */}
          <div className="p-6 sm:p-8 border-b border-zinc-800/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
                <p className="text-violet-400 font-medium text-sm">{project.shortName}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">
                  {project.period}
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {project.role}
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
          </div>

          {/* Architecture Banner */}
          <div className="px-6 sm:px-8 py-4 bg-violet-500/5 border-b border-zinc-800/50">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span className="text-zinc-400">Arquitectura:</span>
              <span className="text-white font-medium">{project.architecture}</span>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="px-6 sm:px-8 py-6 border-b border-zinc-800/50">
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">Diagrama de Arquitectura</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
              {[
                { label: "Domain", sub: "Entidades, Value Objects", color: "from-violet-500 to-purple-600" },
                { label: "Application", sub: "DTOs, Servicios", color: "from-blue-500 to-cyan-500" },
                { label: "Infrastructure", sub: "Dapper, Export", color: "from-cyan-500 to-teal-500" },
                { label: "WebAPI", sub: "Controllers, Dashboard", color: "from-pink-500 to-rose-500" },
              ].map((layer, i) => (
                <div key={layer.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`px-4 py-2.5 rounded-lg bg-gradient-to-br ${layer.color} text-white text-xs font-bold tracking-wide`}>
                      {layer.label}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1.5 text-center max-w-[100px]">{layer.sub}</p>
                  </div>
                  {i < 3 && (
                    <svg className="w-5 h-5 text-zinc-600 shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                  {i < 3 && (
                    <svg className="w-5 h-5 text-zinc-600 shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="px-6 sm:px-8 py-6 border-b border-zinc-800/50">
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">Stack Tecnológico</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(project.techStack).map(([category, techs]) => (
                <div key={category}>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    {category === "backend" ? "Backend" : category === "frontend" ? "Frontend" : category === "database" ? "Base de datos" : "Herramientas"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[11px] font-medium rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Patterns Grid */}
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/50">
            {/* Features */}
            <div className="px-6 sm:px-8 py-6">
              <h4 className="text-sm font-semibold text-zinc-300 mb-4">Funcionalidades clave</h4>
              <ul className="space-y-2">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Patterns */}
            <div className="px-6 sm:px-8 py-6">
              <h4 className="text-sm font-semibold text-zinc-300 mb-4">Patrones de diseño</h4>
              <ul className="space-y-2">
                {project.patterns.map((pat) => (
                  <li key={pat} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/60 shrink-0" />
                    {pat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="px-6 sm:px-8 py-4 bg-zinc-900/30 border-t border-zinc-800/50">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { value: project.stats.layers, label: "Capas" },
                { value: project.stats.entities, label: "Entidades" },
                { value: project.stats.repositories, label: "Repositorios" },
                { value: project.stats.apiEndpoints, label: "Endpoints API" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-[11px] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
