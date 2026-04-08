"use client";

import { MotionStyle, MotionValue, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
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
      className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 p-5 sm:p-6 transition-[border-color] duration-300 hover:border-white/25"
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
      <p className="text-[14px] text-white/50 leading-relaxed mb-4 line-clamp-1 relative z-10">{project.description}</p>
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

function MobileCardSwiper({ items, cardStyle }: { items: typeof projects; cardStyle: MotionStyle }) {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startX.current);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset < 0 && current < items.length - 1) setCurrent((c) => c + 1);
      else if (dragOffset > 0 && current > 0) setCurrent((c) => c - 1);
    }
    setDragOffset(0);
  }, [current, items.length, dragOffset]);

  const containerWidth = containerRef.current?.offsetWidth ?? 1;
  const translatePx = -(current * containerWidth) + dragOffset;

  return (
    <motion.div style={cardStyle}>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translatePx}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {items.map((project) => (
            <div
              key={project.title}
              className="flex-shrink-0 px-1"
              style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 p-6 h-[180px] flex flex-col justify-between">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div>
                  <h3 className="text-[26px] font-normal tracking-[-0.03em] text-white mb-2 relative z-10">{project.title}</h3>
                  <p className="text-[14px] text-white/50 leading-relaxed relative z-10 line-clamp-2 min-h-[2lh]">{project.description}</p>
                </div>
                <div className="flex gap-2 relative z-10 overflow-hidden">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/50 bg-white/5 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6" : "bg-white/30"
            }`}
          />
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
  const mobileCardStyle = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header — right */}
      <motion.div className="absolute left-[6vw] sm:right-[6vw] sm:left-auto top-[13%] text-left sm:text-right" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">Design</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          Creative<br />solutions
        </h2>
      </motion.div>

      {/* Desktop Cards — left, stacked vertically */}
      <div className="absolute left-[6vw] bottom-[5%] top-[28%] hidden sm:flex flex-col gap-5 w-[min(420px,45vw)]">
        {projects.map((project, i) => (
          <GlassCard key={project.title} project={project} style={cards[i]} />
        ))}
      </div>

      {/* Mobile Swiper */}
      <div className="absolute bottom-[4%] left-0 w-full px-[6vw] sm:hidden">
        <MobileCardSwiper items={projects} cardStyle={mobileCardStyle} />
      </div>
    </div>
  );
}
