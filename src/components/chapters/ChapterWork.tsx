"use client";
import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props { progress: MotionValue<number>; active: boolean; }

const row1Cards = [
  { name: "TechStart", bg: "from-violet-900/60 to-violet-950/60" },
  { name: "GreenLeaf", bg: "from-emerald-900/60 to-emerald-950/60" },
  { name: "UrbanStudio", bg: "from-amber-900/60 to-amber-950/60" },
  { name: "DataFlow", bg: "from-blue-900/60 to-blue-950/60" },
  { name: "CloudNine", bg: "from-sky-900/60 to-sky-950/60" },
  { name: "BrandX", bg: "from-pink-900/60 to-pink-950/60" },
  { name: "NovaBrand", bg: "from-rose-900/60 to-rose-950/60" },
  { name: "SwiftApp", bg: "from-cyan-900/60 to-cyan-950/60" },
];

const row2Cards = [
  { name: "Logistika Pro", bg: "from-orange-900/60 to-orange-950/60" },
  { name: "FinServe", bg: "from-teal-900/60 to-teal-950/60" },
  { name: "MediaHub", bg: "from-red-900/60 to-red-950/60" },
  { name: "EduPlatform", bg: "from-indigo-900/60 to-indigo-950/60" },
  { name: "HealthTech", bg: "from-green-900/60 to-green-950/60" },
  { name: "Projekat Alpha", bg: "from-purple-900/60 to-purple-950/60" },
  { name: "RetailX", bg: "from-lime-900/60 to-lime-950/60" },
  { name: "AutoDesk", bg: "from-yellow-900/60 to-yellow-950/60" },
];

function FlipCard({ card }: { card: typeof row1Cards[0] }) {
  const initials = card.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flip-card flex-shrink-0 w-[286px] h-[416px]">
      <div className="flip-inner">
        {/* Front */}
        <div className={`flip-front rounded-2xl bg-gradient-to-br ${card.bg} flex items-end p-5`}>
          <span className="text-[13px] text-white/70 font-normal tracking-[-0.01em]">{card.name}</span>
        </div>

        {/* Back */}
        <div className="flip-back rounded-2xl bg-white/[0.07] backdrop-blur-xl flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-[18px] font-normal text-white tracking-[-0.02em]">{initials}</span>
          </div>
          <p className="text-[13px] text-white/80 font-normal">{card.name}</p>
          <div className="flex items-center gap-1.5 text-white/50 text-[12px] hover:text-white transition-colors cursor-pointer">
            <span>View project</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ cards, direction }: { cards: typeof row1Cards; direction: "left" | "right" }) {
  const tripled = [...cards, ...cards, ...cards];
  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--onyx), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--onyx), transparent)" }} />

      <div className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"} style={{ display: "flex", gap: "16px", width: "max-content" }}>
        {tripled.map((card, i) => (
          <FlipCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

const allCards = [...row1Cards, ...row2Cards];

export default function ChapterWork({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "scale", 0.25, 0.4, 0.75, 0.93);
  const rowStyle = useScrollElement(progress, "bottom", 0.3, 0.45, 0.75, 0.93);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header */}
      <motion.div className="absolute left-0 right-0 top-[18%] flex flex-col items-center text-center" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">Portfolio</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white mb-6">
          Our clients
        </h2>
        <button className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-[14px] px-7 py-3 rounded-full hover:border-white/40 hover:text-white transition-colors">
          View all projects
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </motion.div>

      {/* Single marquee row */}
      <div className="absolute top-[50%] bottom-[2%] left-0 right-0 flex items-center">
        <motion.div style={rowStyle} className="w-full">
          <MarqueeRow cards={allCards} direction="left" />
        </motion.div>
      </div>
    </div>
  );
}
