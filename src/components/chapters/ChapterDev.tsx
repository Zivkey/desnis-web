"use client";

import { MotionStyle, MotionValue, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollElement } from "../useScrollElement";

interface Props { progress: MotionValue<number>; active: boolean; }

const stack = [
  { title: "Frontend", description: "Responsive and fast interfaces built with modern frameworks.", tags: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", description: "Scalable server architecture and seamless API integrations.", tags: ["Node.js", "REST API", "Database"] },
  { title: "Deployment", description: "From code to production — fast and reliable.", tags: ["Vercel", "CI/CD", "Performance"] },
];

function GlassCard({ item, style }: { item: typeof stack[0]; style: MotionStyle }) {
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

      <h3 className="text-[26px] font-normal tracking-[-0.03em] text-white mb-2 relative z-10">{item.title}</h3>
      <p className="text-[14px] text-white/50 leading-relaxed mb-6 line-clamp-1 relative z-10">{item.description}</p>
      <div className="flex flex-wrap gap-2 relative z-10">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-white/10 text-white/50 bg-white/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ChapterDev({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", -0.12, -0.01, 0.63, 0.87);
  const card0 = useScrollElement(progress, "bottom", -0.08, -0.006, 0.63, 0.87);
  const card1 = useScrollElement(progress, "bottom", -0.06, -0.004, 0.66, 0.89);
  const card2 = useScrollElement(progress, "bottom", -0.04, -0.002, 0.68, 0.91);
  const cards = [card0, card1, card2];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header */}
      <motion.div className="absolute left-[6vw] top-[13%]" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">Development</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          Code<br />that works
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-[6vw]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {stack.map((item, i) => (
            <GlassCard key={item.title} item={item} style={cards[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}
