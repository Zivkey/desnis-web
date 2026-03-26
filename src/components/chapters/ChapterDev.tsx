"use client";
import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";
interface Props { progress: MotionValue<number>; active: boolean; }
const stack = [
  { title: "Frontend", description: "Responsivni i brzi interfejsi sa modernim frameworkovima.", tags: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", description: "Skalabilna serverska arhitektura i API integracije.", tags: ["Node.js", "REST API", "Database"] },
  { title: "Deployment", description: "Od koda do produkcije - brzo i pouzdano.", tags: ["Vercel", "CI/CD", "Performance"] },
];
export default function ChapterDev({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", -0.12, -0.01, 0.63, 0.87);
  const descStyle = useScrollElement(progress, "right", -0.10, -0.008, 0.65, 0.88);
  const card0 = useScrollElement(progress, "bottom", -0.08, -0.006, 0.63, 0.87);
  const card1 = useScrollElement(progress, "bottom", -0.06, -0.004, 0.66, 0.89);
  const card2 = useScrollElement(progress, "bottom", -0.04, -0.002, 0.68, 0.91);
  const cards = [card0, card1, card2];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>
      <motion.div className="absolute left-6 sm:left-12 lg:left-24 top-[10%] sm:top-[13%]" style={headerStyle}>
        <div className="flex items-center gap-3 mb-4"><div className="w-10 h-[2px] bg-gradient-to-r from-neon/50 to-neon-purple/50" /><span className="text-xs text-neon-purple/70 uppercase tracking-[0.3em]">Development</span></div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]"><span className="text-neon-purple/40">Kod</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-neon-purple">koji Radi</span></h2>
      </motion.div>
      <motion.div className="absolute right-6 sm:right-12 lg:right-24 top-[12%] sm:top-[15%] text-right hidden sm:block" style={descStyle}>
        <p className="text-sm text-neon-purple/50 max-w-[240px] leading-relaxed">Performanse i skalabilnost.<br /><span className="text-neon/60">Cist kod, bez kompromisa.</span></p>
        <div className="w-14 h-[2px] bg-gradient-to-r from-neon-purple/40 to-neon/20 mt-5 rounded-full ml-auto" />
      </motion.div>
      <div className="absolute bottom-[3%] sm:bottom-[5%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stack.map((item, i) => (
            <motion.div key={item.title} style={cards[i]} className="card-hover card-hover-neon group relative border border-neon/15 rounded-lg sm:rounded-2xl bg-[#0d0515]/90 backdrop-blur-md overflow-hidden">
              <div className="hidden sm:flex absolute top-0 left-0 right-0 h-8 bg-neon/[0.04] border-b border-neon/10 items-center px-4 gap-2"><div className="w-2.5 h-2.5 rounded-full bg-neon/30" /><div className="w-2.5 h-2.5 rounded-full bg-neon-purple/20" /><div className="w-2.5 h-2.5 rounded-full bg-neon-purple/10" /><span className="font-mono text-[10px] text-neon-purple/30 ml-3">{item.title.toLowerCase()}.tsx</span></div>
              <div className="flex items-center gap-4 p-4 sm:hidden"><div className="flex-shrink-0 w-10 h-10 rounded-md border border-neon/20 bg-neon/[0.06] flex items-center justify-center"><span className="font-mono text-sm text-neon/70">{"</>"}</span></div><div className="flex-1 min-w-0"><h3 className="text-sm font-bold text-neon">{item.title}</h3><p className="text-[11px] text-neon-purple/45 line-clamp-1 mt-0.5">{item.description}</p></div></div>
              <div className="flex flex-wrap gap-1.5 px-4 pb-4 sm:hidden">{item.tags.map((tag) => (<span key={tag} className="text-[9px] px-1.5 py-0.5 rounded border border-neon/15 text-neon/60 bg-neon/[0.05]">{tag}</span>))}</div>
              <div className="hidden sm:block p-8 pt-14">
                <div className="flex items-center justify-between mb-4"><span className="font-mono text-2xl text-neon/50">{"</>"}</span><span className="font-mono text-xs text-neon-purple/30">v{i + 1}.0</span></div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-neon-purple mb-2">{item.title}</h3>
                <p className="text-sm text-neon-purple/50 mb-6 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">{item.tags.map((tag) => (<span key={tag} className="text-xs px-3 py-1.5 rounded border border-neon/20 text-neon/70 bg-neon/[0.06]">{tag}</span>))}</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
