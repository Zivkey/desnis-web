"use client";

import { MotionStyle, MotionValue, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollElement } from "../useScrollElement";

interface Props { progress: MotionValue<number>; active: boolean; }

const projects = [
  { title: "Brand Identity", description: "A complete visual identity that communicates your brand's values.", tags: ["Logo", "Typography", "Colors"] },
  { title: "Web Design", description: "Design that blends aesthetics with functionality for maximum impact.", tags: ["Figma", "Responsive", "Motion"] },
  { title: "UI/UX", description: "Intuitive interfaces focused on the user experience.", tags: ["Research", "Wireframes", "Testing"] },
];

function GlassCard({ project, style }: { project: typeof projects[0]; style: MotionStyle }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => setSpotlight((s) => ({ ...s, opacity: 0 }));

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 p-6 sm:p-8 transition-[border-color] duration-300 hover:border-white/25"
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(160px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <h3 className="text-[26px] font-normal tracking-[-0.03em] text-white mb-2 relative z-10">{project.title}</h3>
      <p className="text-[14px] text-white/50 leading-relaxed mb-6 line-clamp-1 relative z-10">{project.description}</p>
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-white/10 text-white/50 bg-white/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ChapterDesign({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "right", -0.12, -0.01, 0.55, 0.82);
  const card0 = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);
  const card1 = useScrollElement(progress, "scale", -0.06, -0.004, 0.55, 0.82);
  const card2 = useScrollElement(progress, "right", -0.04, -0.002, 0.6, 0.85);
  const cards = [card0, card1, card2];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header — right */}
      <motion.div className="absolute right-[6vw] top-[13%] text-right" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">Design</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          Creative<br />solutions
        </h2>
      </motion.div>

      {/* Cards — left, stacked vertically */}
      <div className="absolute left-[6vw] bottom-[5%] top-[28%] flex flex-col gap-4 sm:gap-5 w-[min(420px,45vw)]">
        {projects.map((project, i) => (
          <GlassCard key={project.title} project={project} style={cards[i]} />
        ))}
      </div>
    </div>
  );
}
