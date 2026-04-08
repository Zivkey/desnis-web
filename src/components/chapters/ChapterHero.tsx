"use client";

import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

export default function ChapterHero({ progress, active }: Props) {
  const titleOpacity = useTransform(progress, [0, 0.5, 0.85], [1, 1, 0]);
  const titleScale = useTransform(progress, [0, 0.5, 0.85], [1, 1, 0.9]);
  const titleY = useTransform(progress, [0, 0.5, 0.85], [0, 0, -30]);
  const titleBlur = useTransform(progress, [0, 0.5, 0.85], [0, 0, 10]);
  const titleFilter = useTransform(titleBlur, (v) => `blur(${v}px)`);

  const subOpacity = useTransform(progress, [0, 0.4, 0.75], [1, 1, 0]);
  const subY = useTransform(progress, [0, 0.4, 0.75], [0, 0, -20]);
  const subBlur = useTransform(progress, [0, 0.4, 0.75], [0, 0, 10]);
  const subFilter = useTransform(subBlur, (v) => `blur(${v}px)`);

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between pl-[6vw] pt-[12vh] md:pt-[22vh] pb-[14vh] ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Top: est + title */}
      <div className="text-left max-w-2xl">
        <motion.p
          style={{ opacity: subOpacity, y: subY, filter: subFilter }}
          className="mb-3 text-[13px] font-normal text-white/40 tracking-[0.08em]"
        >
          est 2026
        </motion.p>
        <motion.h1
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY, filter: titleFilter }}
          className="text-[clamp(2.8rem,5.5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white"
        >
          Get ready for a first&#8209;class<br />web experience
        </motion.h1>
      </div>

      {/* Bottom: paragraph + buttons */}
      <div className="text-left max-w-2xl">
        <motion.p
          style={{ opacity: subOpacity, y: subY, filter: subFilter }}
          className="text-[18px] font-normal text-white/50 tracking-[-0.01em] max-w-[400px]"
        >
          You can never make a first impression twice, let&apos;s create a website that will set you apart.
        </motion.p>
        <motion.div
          style={{ opacity: subOpacity, y: subY, filter: subFilter }}
          className="mt-6 flex items-center justify-start gap-4"
        >
          <button className="inline-flex items-center gap-[6px] text-[16px] font-normal tracking-[-0.03em] bg-white text-black px-10 py-4 rounded-full hover:bg-white/90 transition-colors duration-300">
            Contact us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button className="text-[16px] font-normal tracking-[-0.03em] text-white border border-white/30 px-10 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            Our work
          </button>
        </motion.div>
      </div>
    </div>
  );
}
