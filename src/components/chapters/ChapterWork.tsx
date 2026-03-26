"use client";
import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";
interface Props { progress: MotionValue<number>; active: boolean; }

const logos = [
  { name: "Projekat Alpha", color: "#FF6B6B" },
  { name: "TechStart", color: "#4ECDC4" },
  { name: "GreenLeaf", color: "#95E66A" },
  { name: "UrbanStudio", color: "#FFD93D" },
  { name: "DataFlow", color: "#6C5CE7" },
  { name: "CloudNine", color: "#74B9FF" },
  { name: "BrandX", color: "#FF2D9B" },
  { name: "Logistika Pro", color: "#FF8C42" },
  { name: "FinServe", color: "#00CEC9" },
  { name: "MediaHub", color: "#E17055" },
  { name: "EduPlatform", color: "#A29BFE" },
  { name: "HealthTech", color: "#55EFC4" },
];

export default function ChapterWork({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "scale", 0.25, 0.4, 0.75, 0.93);
  const row0 = useScrollElement(progress, "left", 0.3, 0.45, 0.75, 0.93);
  const row1 = useScrollElement(progress, "right", 0.35, 0.48, 0.78, 0.95);
  const row2 = useScrollElement(progress, "left", 0.38, 0.52, 0.80, 0.96);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>
      <motion.div className="text-center mb-12 absolute top-[10%] sm:top-[12%] left-0 right-0" style={headerStyle}>
        <p className="text-xs text-cream/30 uppercase tracking-[0.4em] mb-3">Portfolio</p>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-cream/90">Nasi klijenti</h2>
      </motion.div>

      <div className="absolute top-[30%] bottom-[10%] left-0 right-0 flex flex-col justify-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-24">
        {[0, 1, 2].map((row) => (
          <motion.div key={row} style={row === 0 ? row0 : row === 1 ? row1 : row2} className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {logos.slice(row * 4, row * 4 + 4).map((logo) => (
              <div key={logo.name} className="w-[140px] sm:w-[200px] h-[60px] sm:h-[80px] rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center group hover:bg-white/[0.06] transition-all duration-300"
                style={{ borderColor: `${logo.color}15` }}
              >
                <span
                  className="text-sm sm:text-base font-bold transition-all duration-300 tracking-wide opacity-60 group-hover:opacity-100"
                  style={{ color: logo.color }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
