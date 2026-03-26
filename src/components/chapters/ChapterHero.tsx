"use client";

import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

export default function ChapterHero({ progress, active }: Props) {
  // Title: visible immediately, exits on scroll
  const titleOpacity = useTransform(progress, [0, 0.5, 0.85], [1, 1, 0]);
  const titleScale = useTransform(progress, [0, 0.5, 0.85], [1, 1, 0.9]);
  const titleY = useTransform(progress, [0, 0.5, 0.85], [0, 0, -30]);
  const titleBlur = useTransform(progress, [0, 0.5, 0.85], [0, 0, 10]);
  const titleFilter = useTransform(titleBlur, (v) => `blur(${v}px)`);

  // Subtitle: visible immediately, exits slightly earlier
  const subOpacity = useTransform(progress, [0, 0.4, 0.75], [1, 1, 0]);
  const subY = useTransform(progress, [0, 0.4, 0.75], [0, 0, -20]);
  const subBlur = useTransform(progress, [0, 0.4, 0.75], [0, 0, 10]);
  const subFilter = useTransform(subBlur, (v) => `blur(${v}px)`);

  return (
    <div
      className={`absolute inset-0 flex items-start justify-center pt-[20vh] sm:pt-[23vh] ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="text-center">
        <motion.h1
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY, filter: titleFilter }}
          className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-tighter leading-none text-cream"
        >
          Desnis
        </motion.h1>
        <motion.p
          style={{ opacity: subOpacity, y: subY, filter: subFilter }}
          className="mt-4 text-lg sm:text-xl text-cream/50 font-light tracking-wide"
        >
          Design &middot; SEO &middot; Development
        </motion.p>
      </div>
    </div>
  );
}
