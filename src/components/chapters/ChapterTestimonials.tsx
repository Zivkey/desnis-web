"use client";
import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";
interface Props { progress: MotionValue<number>; active: boolean; }

const testimonials = [
  { name: "Marko S.", role: "CEO, TechStart", text: "Desnis tim je napravio sajt koji je premasio sva ocekivanja. Profesionalni, brzi i kreativni." },
  { name: "Ana P.", role: "Marketing, GreenLeaf", text: "SEO optimizacija je donela 3x vise organskog saobracaja za samo 3 meseca. Preporuka!" },
  { name: "Stefan M.", role: "Founder, UrbanStudio", text: "Dizajn je bio tacan na prvu. Razumeju viziju i pretvaraju je u realnost bez kompromisa." },
];

export default function ChapterTestimonials({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "scale", -0.02, -0.001, 0.90, 0.99);
  const card0 = useScrollElement(progress, "left", -0.015, -0.001, 0.90, 0.99);
  const card1 = useScrollElement(progress, "bottom", -0.01, -0.001, 0.92, 0.99);
  const card2 = useScrollElement(progress, "right", -0.005, -0.001, 0.93, 0.99);
  const cards = [card0, card1, card2];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>
      <motion.div className="text-center absolute top-[10%] sm:top-[12%] left-0 right-0" style={headerStyle}>
        <p className="text-xs text-cream/30 uppercase tracking-[0.4em] mb-3">Utisci</p>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-cream/90">Sta kazu klijenti</h2>
      </motion.div>

      <div className="absolute bottom-[5%] sm:bottom-[8%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} style={cards[i]} className="card-hover group relative border border-white/10 rounded-lg sm:rounded-2xl bg-onyx/90 backdrop-blur-md overflow-hidden p-6 sm:p-8">
              <div className="text-cream/20 text-4xl font-serif mb-4">&ldquo;</div>
              <p className="text-sm sm:text-base text-cream/70 leading-relaxed mb-6 italic">{t.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-cream/40">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">{t.name}</p>
                  <p className="text-xs text-cream/40">{t.role}</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cream/3 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
