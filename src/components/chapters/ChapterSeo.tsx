"use client";

import { MotionStyle, MotionValue, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

const features = [
  {
    title: "Technical SEO",
    description: "Speed, structure & indexing — optimized for crawlers.",
    tags: ["Core Web Vitals", "Schema", "Sitemap"],
  },
  {
    title: "Content Strategy",
    description: "Data-driven content that ranks and converts.",
    tags: ["Keywords", "Content Plan", "Copywriting"],
  },
  {
    title: "Analytics",
    description: "Track, measure, iterate — continuous growth.",
    tags: ["GA4", "Search Console", "Reporting"],
  },
];

function GlassCard({ feature, style }: { feature: typeof features[0]; style: MotionStyle }) {
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
      className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 p-6 sm:p-8 transition-[border-color] duration-300 hover:border-white/25 group"
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(160px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />
      {/* Static glass highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <h3 className="text-[26px] font-normal tracking-[-0.03em] text-white mb-2 relative z-10">{feature.title}</h3>
      <p className="text-[14px] text-white/50 leading-relaxed mb-6 line-clamp-1 relative z-10">{feature.description}</p>
      <div className="flex flex-wrap gap-2 relative z-10">
        {feature.tags.map((tag) => (
          <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-white/10 text-white/50 bg-white/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MobileCardSwiper({ features: items, cardStyle }: { features: typeof features; cardStyle: MotionStyle }) {
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
    const dx = e.touches[0].clientX - startX.current;
    setDragOffset(dx);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset < 0 && current < items.length - 1) {
        setCurrent((c) => c + 1);
      } else if (dragOffset > 0 && current > 0) {
        setCurrent((c) => c - 1);
      }
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
          {items.map((feature) => (
            <div
              key={feature.title}
              className="flex-shrink-0 px-1"
              style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 p-6 h-[180px] flex flex-col justify-between">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div>
                  <h3 className="text-[26px] font-normal tracking-[-0.03em] text-white mb-2 relative z-10">{feature.title}</h3>
                  <p className="text-[14px] text-white/50 leading-relaxed relative z-10 line-clamp-2 min-h-[2lh]">{feature.description}</p>
                </div>
                <div className="flex gap-2 relative z-10 overflow-hidden">
                  {feature.tags.map((tag) => (
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

export default function ChapterSeo({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", -0.12, -0.01, 0.55, 0.82);
  const statsStyle = useScrollElement(progress, "right", -0.10, -0.008, 0.58, 0.85);
  const card0 = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);
  const card1 = useScrollElement(progress, "scale", -0.06, -0.004, 0.55, 0.82);
  const card2 = useScrollElement(progress, "right", -0.04, -0.002, 0.6, 0.85);
  const cards = [card0, card1, card2];
  const mobileCardStyle = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header */}
      <motion.div className="absolute left-[6vw] top-[13%]" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">SEO</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          Search engine<br />optimization
        </h2>
      </motion.div>

      {/* Stats */}
      <motion.div className="absolute right-[6vw] top-[16%] text-right hidden sm:block" style={statsStyle}>
        <div className="flex flex-col items-end gap-4">
          {[{ num: "100+", label: "Sites optimized" }, { num: "Top 3", label: "Avg. position" }, { num: "2x", label: "Organic growth" }].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="text-[13px] text-white/30">{stat.label}</span>
              <span className="text-2xl font-normal tracking-[-0.03em] text-white">{stat.num}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Desktop Cards */}
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-[6vw] hidden sm:block">
        <div className="grid grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <GlassCard key={feature.title} feature={feature} style={cards[i]} />
          ))}
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="absolute bottom-[4%] left-0 w-full px-[6vw] sm:hidden">
        <MobileCardSwiper features={features} cardStyle={mobileCardStyle} />
      </div>
    </div>
  );
}
