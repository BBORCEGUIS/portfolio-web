"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="text-sm font-mono text-violet-400 mb-2">{"// Experiencia"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Mi Trayectoria</h2>
          <p className="mt-3 text-zinc-500 max-w-lg">Un recorrido por las empresas donde he aplicado y perfeccionado mis habilidades.</p>
        </div>

        <div className="relative">
          <div className="timeline-line" />

          <div className="space-y-12">
            {portfolioData.experience.map((job, idx) => (
              <div key={job.company} className="relative pl-14 reveal" style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className={`timeline-dot ${idx === 0 ? "timeline-dot-active top-6" : "top-6"}`} />

                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                      <p className="text-violet-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full whitespace-nowrap self-start">
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span key={s} className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
