"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Habilidades", href: "#skills" },
  { label: "Educación", href: "#education" },
  { label: "Referencias", href: "#references" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06060e]/80 backdrop-blur-xl border-b border-zinc-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm text-violet-400 hover:text-violet-300 transition-colors">
          ~/bborceguis_
          <span className="ml-0.5 inline-block w-2 h-4 bg-violet-400 animate-pulse" />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link text-sm text-zinc-400 hover:text-white transition-colors">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/cv"
              className="px-5 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all"
            >
              Currículum
            </Link>
          </li>
          <li>
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium border border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-400/30 transition-all"
            >
              Contacto
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-zinc-400 hover:text-white transition-colors" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#06060e]/95 backdrop-blur-xl border-t border-zinc-800/50 px-6 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/cv" onClick={() => setMenuOpen(false)} className="inline-block px-5 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
                Currículum
              </Link>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-block px-5 py-2 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium border border-violet-500/20">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
