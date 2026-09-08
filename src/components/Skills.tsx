"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

const categories = [
  {
    key: "development" as const,
    title: "Desarrollo Web",
    color: "from-violet-500 to-purple-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    key: "databaseAndTools" as const,
    title: "Bases de Datos & Herramientas",
    color: "from-cyan-500 to-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
  },
  {
    key: "supportAndAdmin" as const,
    title: "Soporte Técnico & Administración",
    color: "from-pink-500 to-rose-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
      </svg>
    ),
  },
];

export default function Skills() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="text-sm font-mono text-cyan-400 mb-2">{"// Habilidades"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills & Herramientas</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, catIdx) => (
            <div key={cat.key} className="glass rounded-2xl p-6 reveal" style={{ transitionDelay: `${catIdx * 0.1}s` }}>
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-10 mb-4`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills[cat.key].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
