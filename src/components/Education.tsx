"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Education() {
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
    <section id="education" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="text-sm font-mono text-pink-400 mb-2">{"// Educación"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Formación Profesional</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, idx) => (
            <div key={edu.institution} className="glass rounded-2xl p-6 sm:p-8 group reveal" style={{ transitionDelay: `${idx * 0.15}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {edu.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
              <p className="text-violet-400 text-sm font-medium mb-3">{edu.institution}</p>
              <p className="text-sm text-zinc-500">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
