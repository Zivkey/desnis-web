"use client";

import { MotionValue, motion } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

export default function ChapterContact({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", 0.05, 0.18, 2, 3);
  const subtitleStyle = useScrollElement(progress, "right", 0.1, 0.22, 2, 3);
  const formStyle = useScrollElement(progress, "scale", 0.15, 0.28, 2, 3);
  const statusStyle = useScrollElement(progress, "left", 0.05, 0.18, 2, 3);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      {/* Left column - desktop only */}
      <div className="absolute left-6 sm:left-12 lg:left-24 top-0 bottom-0 hidden lg:flex flex-col justify-center gap-8 max-w-[400px]">
        <motion.div style={headerStyle}>
          <h2 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold leading-[0.9] tracking-tight">
            <span className="text-cream">Javite</span>
            <br />
            <span className="text-cream/70">Nam Se</span>
          </h2>
          <div className="w-20 h-[2px] bg-cream/20 mt-6 rounded-full" />
        </motion.div>

        <motion.div style={subtitleStyle}>
          <p className="text-lg sm:text-xl text-cream/70 leading-relaxed">
            Imate ideju? Hajde da je
            <span className="text-cream font-bold"> realizujemo</span>.
          </p>
        </motion.div>

        <motion.div style={statusStyle}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-cream/80 font-bold uppercase tracking-wider">Dostupni</span>
          </div>
          <span className="text-xs text-cream/50">Odgovaramo u roku od 24h</span>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        className="absolute left-4 right-4 top-0 bottom-0 flex items-center justify-center lg:left-[60%] lg:right-[3rem]"
        style={formStyle}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full max-w-md lg:max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/15 sm:border-white/10 bg-onyx/80 sm:bg-white/[0.03] backdrop-blur-xl sm:backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cream/15 to-transparent" />

          {/* Mobile title */}
          <div className="lg:hidden mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-4xl font-bold leading-[0.9] tracking-tight mb-1.5 sm:mb-2">
              <span className="text-cream">Javite </span>
              <span className="text-cream/70">Nam Se</span>
            </h2>
            <p className="text-xs sm:text-sm text-cream/60">
              Imate ideju? Hajde da je <span className="text-cream font-bold">realizujemo</span>.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-5 mb-5 sm:mb-8">
            <div>
              <label className="text-xs text-cream uppercase tracking-wider mb-1.5 sm:mb-2 block">Ime</label>
              <input
                type="text"
                placeholder="Vase ime"
                className="w-full text-base sm:text-lg bg-white/[0.04] border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-cream uppercase tracking-wider mb-1.5 sm:mb-2 block">Email</label>
              <input
                type="email"
                placeholder="email@primer.com"
                className="w-full text-base sm:text-lg bg-white/[0.04] border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-cream uppercase tracking-wider mb-1.5 sm:mb-2 block">Poruka</label>
              <textarea
                placeholder="Opisite svoj projekat..."
                rows={3}
                className="w-full text-base sm:text-lg bg-white/[0.04] border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/30 transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-sm sm:text-lg font-bold py-2.5 sm:py-4 bg-cream rounded-xl sm:rounded-2xl text-onyx hover:brightness-110 transition-all"
            style={{ boxShadow: "0 4px 20px rgba(240,230,210,0.15)" }}
          >
            Posaljite poruku
          </button>
          {/* Mobile status */}
          <div className="lg:hidden flex items-center justify-center gap-3 mt-4">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-cream/50">Dostupni &middot; Odgovaramo u roku od 24h</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
