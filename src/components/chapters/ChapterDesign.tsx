"use client";

import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props { progress: MotionValue<number>; active: boolean; }

const projects = [
  { title: "Brand Identity", description: "Kompletan vizuelni identitet koji komunicira vrednosti vaseg brenda.", tags: ["Logo", "Tipografija", "Boje"] },
  { title: "Web Design", description: "Dizajn koji spaja estetiku sa funkcionalnoscu za maksimalan efekat.", tags: ["Figma", "Responsive", "Motion"] },
  { title: "UI/UX", description: "Intuitivni interfejsi fokusirani na korisnicko iskustvo.", tags: ["Research", "Wireframes", "Testing"] },
];

export default function ChapterDesign({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "right", -0.12, -0.01, 0.55, 0.82);
  const descStyle = useScrollElement(progress, "left", -0.10, -0.008, 0.58, 0.85);
  const card0 = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);
  const card1 = useScrollElement(progress, "right", -0.06, -0.004, 0.55, 0.82);
  const card2 = useScrollElement(progress, "left", -0.04, -0.002, 0.6, 0.85);
  const cards = [card0, card1, card2];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>
      <motion.div className="absolute left-4 right-4 sm:right-12 sm:left-auto lg:right-24 top-[10%] sm:top-[13%] text-center sm:text-right" style={headerStyle}>
        <div className="flex items-center justify-center sm:justify-end gap-3 mb-4">
          <span className="text-xs text-sand/70 uppercase tracking-[0.3em]">Dizajn</span>
          <div className="w-10 h-[2px] bg-gradient-to-r from-sand/50 to-cream/30" />
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[0.95]">
          Kreativna<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cream to-sand">Resenja</span>
        </h2>
      </motion.div>
      <motion.div className="absolute left-6 sm:left-12 lg:left-24 top-[12%] sm:top-[15%] hidden sm:block" style={descStyle}>
        <p className="text-sm text-sand/60 max-w-[240px] leading-relaxed italic">Svaki projekat je<br />jedinstvena prica.<br /><span className="text-cream/70 not-italic">Ispricana kroz dizajn.</span></p>
        <div className="w-14 h-[2px] bg-gradient-to-r from-sand/40 to-cream/20 mt-5 rounded-full" />
      </motion.div>
      <div className="absolute left-4 right-7 sm:left-12 sm:right-auto lg:left-24 bottom-[3%] sm:top-[28%] sm:bottom-auto sm:w-[420px] flex flex-col gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <motion.div key={project.title} style={cards[i]} className="card-hover group relative border border-sand/15 rounded-lg sm:rounded-2xl overflow-hidden bg-[#1a1714]/90 backdrop-blur-md">
            <div className="flex items-center gap-4 p-4 sm:hidden">
              <div className="flex-shrink-0 w-10 h-10 rounded-md border border-sand/20 bg-sand/[0.08] flex items-center justify-center"><span className="text-sm font-bold text-sand/70 italic">{i + 1}</span></div>
              <div className="flex-1 min-w-0"><h3 className="text-sm font-bold text-cream">{project.title}</h3><p className="text-[11px] text-sand/50 line-clamp-1 mt-0.5">{project.description}</p></div>
            </div>
            <div className="flex flex-wrap gap-1.5 px-4 pb-4 sm:hidden">{project.tags.map((tag) => (<span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full border border-sand/15 text-sand/60 bg-sand/[0.05]">{tag}</span>))}</div>
            <div className="hidden sm:block p-6 lg:p-8">
              <div className="flex items-center justify-between mb-3"><h3 className="text-lg font-bold text-cream">{project.title}</h3><span className="text-xs text-sand/40 italic">no.{i + 1}</span></div>
              <p className="text-xs text-sand/60 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">{project.tags.map((tag) => (<span key={tag} className="text-[11px] px-3 py-1 rounded-full border border-sand/20 text-sand/80 bg-sand/[0.08]">{tag}</span>))}</div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-sand/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        ))}
      </div>
      <div className="absolute right-6 sm:right-12 lg:right-24 top-[36%] bottom-[32%] w-[1px] bg-gradient-to-b from-transparent via-sand/10 to-transparent hidden lg:block" />
    </div>
  );
}
