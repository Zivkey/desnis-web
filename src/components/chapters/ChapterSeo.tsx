"use client";

import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

const features = [
  {
    title: "Technical SEO",
    description: "Site speed, structure, indexing — optimized for crawlers.",
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

export default function ChapterSeo({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", -0.12, -0.01, 0.55, 0.82);
  const statsStyle = useScrollElement(progress, "right", -0.10, -0.008, 0.58, 0.85);
  const card0 = useScrollElement(progress, "left", -0.08, -0.006, 0.5, 0.78);
  const card1 = useScrollElement(progress, "scale", -0.06, -0.004, 0.55, 0.82);
  const card2 = useScrollElement(progress, "right", -0.04, -0.002, 0.6, 0.85);
  const cards = [card0, card1, card2];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>
      <motion.div className="absolute left-6 sm:left-12 lg:left-24 top-[10%] sm:top-[13%]" style={headerStyle}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[2px] bg-hacker/50" />
          <span className="font-mono text-xs text-hacker/70 uppercase tracking-[0.3em]">{"$ ./seo-audit"}</span>
          <span className="w-2 h-4 bg-hacker/80 animate-pulse" />
        </div>
        <h2 className="font-mono text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
          <span className="text-hacker/40">root@</span><br />
          <span className="text-hacker">SEO</span>
        </h2>
      </motion.div>

      <motion.div className="absolute right-6 sm:right-12 lg:right-24 top-[10%] sm:top-[16%] text-right hidden sm:block" style={statsStyle}>
        <div className="flex flex-col items-end gap-3 font-mono">
          {[{ num: "100+", label: "sites.optimized" }, { num: "Top 3", label: "avg.position" }, { num: "2x", label: "organic.growth" }].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-xs text-hacker/40">{stat.label}:</span>
              <span className="text-xl font-bold text-hacker">{stat.num}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-[3%] sm:bottom-[5%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} style={cards[i]} className="card-hover card-hover-hacker group relative border border-hacker/20 rounded-lg sm:rounded-2xl bg-[#020d02]/95 backdrop-blur-md overflow-hidden">
              <div className="hidden sm:flex absolute top-0 left-0 right-0 h-8 bg-hacker/[0.06] border-b border-hacker/10 items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/10" />
                <span className="font-mono text-[10px] text-hacker/30 ml-3">~/{feature.title.toLowerCase().replace(" ", "-")}.sh</span>
              </div>
              <div className="flex items-center gap-4 p-4 sm:hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-md border border-hacker/20 bg-hacker/[0.06] flex items-center justify-center">
                  <span className="font-mono text-sm text-hacker/70">{">_"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-sm font-bold text-hacker">{feature.title}</h3>
                  <p className="font-mono text-[11px] text-hacker/45 line-clamp-1 mt-0.5">{feature.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 px-4 pb-4 sm:hidden">
                {feature.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-hacker/15 text-hacker/60 bg-hacker/[0.05]">{tag}</span>
                ))}
              </div>
              <div className="hidden sm:block p-8 pt-14">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl text-hacker/60">{">_"}</span>
                  <span className="font-mono text-xs text-hacker/30 uppercase tracking-[0.2em]">PID:{String(i + 1).padStart(4, "0")}</span>
                </div>
                <h3 className="font-mono text-2xl font-bold text-hacker mb-2">./{feature.title}</h3>
                <p className="font-mono text-sm text-hacker/50 mb-6 leading-relaxed"><span className="text-hacker/30">$ </span>{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded border border-hacker/20 text-hacker/70 bg-hacker/[0.06]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-hacker/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
