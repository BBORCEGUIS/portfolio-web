"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function References() {
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
    <section id="references" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="text-sm font-mono text-cyan-400 mb-2">{"// Referencias"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Referencias Profesionales</h2>
          <p className="mt-3 text-zinc-500 max-w-lg">Personas que pueden dar fe de mi trabajo y compromiso.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {portfolioData.references.map((ref, idx) => (
            <div key={ref.name} className="glass rounded-2xl p-6 reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {ref.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{ref.name}</h4>
                  <p className="text-xs text-zinc-500">{ref.role}</p>
                </div>
              </div>
              <a
                href={`tel:${ref.phone}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {ref.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div id="contact" className="reveal">
          <p className="text-sm font-mono text-violet-400 mb-2">{"// Contacto"}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Hablemos</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="glass rounded-2xl p-6 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center shrink-0 group-hover:from-violet-500/30 group-hover:to-cyan-500/30 transition-all">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Correo electrónico</p>
                <p className="text-sm font-medium text-white">{portfolioData.personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`tel:${portfolioData.personalInfo.phones[0]}`}
              className="glass rounded-2xl p-6 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Teléfono</p>
                <p className="text-sm font-medium text-white">{portfolioData.personalInfo.phones[0]}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
