"use client";

import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";

function generatePDF(personalInfo: typeof portfolioData.personalInfo, experience: typeof portfolioData.experience, education: typeof portfolioData.education, skills: typeof portfolioData.skills, references: typeof portfolioData.references) {
  const { jsPDF } = require("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = w - margin * 2;
  let y = margin;

  const checkPage = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const sectionTitle = (title: string) => {
    checkPage(14);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(title.toUpperCase(), margin, y);
    y += 1;
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.3);
    doc.line(margin, y, w - margin, y);
    y += 5;
  };

  const writeLine = (text: string, options?: { bold?: boolean; size?: number; color?: number[] }) => {
    const bold = options?.bold || false;
    const size = options?.size || 10;
    const color = options?.color || [60, 60, 60];
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentW);
    for (const line of lines) {
      checkPage(5);
      doc.text(line, margin, y);
      y += size * 0.45;
    }
  };

  const writeBullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, contentW - 6);
    checkPage(lines.length * 3.5 + 1);
    doc.text("\u2022", margin + 1, y);
    for (const line of lines) {
      doc.text(line, margin + 5, y);
      y += 3.5;
    }
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text(personalInfo.fullName, w / 2, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(personalInfo.title, w / 2, y, { align: "center" });
  y += 7;

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const contactLine = `${personalInfo.location}  |  ${personalInfo.phones[0]}  |  ${personalInfo.email}  |  ${personalInfo.identityCard}`;
  doc.text(contactLine, w / 2, y, { align: "center" });
  y += 3;

  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.6);
  doc.line(margin, y, w - margin, y);
  y += 7;

  // Perfil Profesional
  sectionTitle("Perfil Profesional");
  writeLine(personalInfo.profileSummary);
  y += 4;

  // Experiencia Profesional
  sectionTitle("Experiencia Profesional");
  for (const job of experience) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(job.role, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(` \u2014 ${job.company}`, margin + doc.getTextWidth(job.role), y);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(job.period, w - margin, y, { align: "right" });
    y += 5;

    for (const r of job.responsibilities) {
      writeBullet(r);
    }
    y += 2;
  }

  // Formación Académica
  sectionTitle("Formación Académica");
  for (const edu of education) {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(edu.degree, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(` \u2014 ${edu.institution}`, margin + doc.getTextWidth(edu.degree), y);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(edu.status, w - margin, y, { align: "right" });
    y += 4;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.details, margin, y);
    y += 6;
  }

  // Habilidades Técnicas
  sectionTitle("Habilidades Técnicas");
  const skillCategories = [
    { label: "Desarrollo Web", items: skills.development },
    { label: "Bases de Datos & Herramientas", items: skills.databaseAndTools },
    { label: "Soporte & Administración", items: skills.supportAndAdmin },
  ];
  for (const cat of skillCategories) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text(cat.label + ":", margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(cat.items.join(", "), margin, y);
    y += 5;
  }

  // Referencias
  sectionTitle("Referencias");
  const refColW = contentW / 3;
  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    const x = margin + i * refColW;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text(ref.name, x, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(ref.role, x, y);
    y += 4;
    doc.setTextColor(100, 100, 100);
    doc.text(ref.phone, x, y);
    y -= 8;
  }

  doc.save("Bruberky_Borceguis_CV.pdf");
}

export default function CVPage() {
  const { personalInfo, experience, education, skills, references } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar — hidden on print */}
      <div className="no-print sticky top-0 z-50 flex items-center justify-between bg-slate-950 border-b border-slate-800 px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver al portafolio
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Imprimir
          </button>
          <button
            onClick={() => generatePDF(personalInfo, experience, education, skills, references)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Descargar PDF
          </button>
        </div>
      </div>

      {/* CV Document */}
      <div className="cv-document max-w-4xl mx-auto my-8 p-8 sm:p-12 bg-white text-black shadow-xl rounded-md print:shadow-none print:my-0 print:rounded-none print:p-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-900 uppercase">
            {personalInfo.fullName}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-1">{personalInfo.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
            <span>{personalInfo.location}</span>
            <span className="hidden sm:inline">|</span>
            <span>{personalInfo.phones[0]}</span>
            <span className="hidden sm:inline">|</span>
            <span>{personalInfo.email}</span>
            <span className="hidden sm:inline">|</span>
            <span>{personalInfo.identityCard}</span>
          </div>
        </header>

        <hr className="border-t-2 border-gray-900 mb-6" />

        {/* PERFIL PROFESIONAL */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-black/80 pb-1 mb-3">
            Perfil Profesional
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.profileSummary}</p>
        </section>

        {/* EXPERIENCIA PROFESIONAL */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-black/80 pb-1 mb-3">
            Experiencia Profesional
          </h2>
          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <div>
                    <span className="font-bold text-sm text-gray-900">{job.role}</span>
                    <span className="text-sm text-gray-600"> — {job.company}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{job.period}</span>
                </div>
                <ul className="mt-1.5 space-y-0.5">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                {"reference" in job && job.reference && (
                  <p className="mt-1 text-xs text-gray-500 italic">Referencia: {job.reference}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FORMACIÓN ACADÉMICA */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-black/80 pb-1 mb-3">
            Formación Académica
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.institution} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <div>
                  <span className="font-bold text-sm text-gray-900">{edu.degree}</span>
                  <span className="text-sm text-gray-600"> — {edu.institution}</span>
                  <p className="text-xs text-gray-500">{edu.details}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{edu.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HABILIDADES TÉCNICAS */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-black/80 pb-1 mb-3">
            Habilidades Técnicas
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Desarrollo Web</p>
              <p className="text-gray-600">{skills.development.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Bases de Datos & Herramientas</p>
              <p className="text-gray-600">{skills.databaseAndTools.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Soporte & Administración</p>
              <p className="text-gray-600">{skills.supportAndAdmin.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* REFERENCIAS */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-black/80 pb-1 mb-3">
            Referencias
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {references.map((ref) => (
              <div key={ref.name}>
                <p className="font-semibold text-gray-900">{ref.name}</p>
                <p className="text-gray-600">{ref.role}</p>
                <p className="text-gray-500">{ref.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
