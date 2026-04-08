import { MotionValue, useTransform } from "framer-motion";

type Direction = "left" | "right" | "bottom" | "scale";

const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

/**
 * Scroll-driven motion style with enter and exit animations.
 * `enter` = progress where element starts appearing
 * `full`  = progress where element is fully visible
 * `exitStart` = progress where element starts exiting
 * `exitEnd`   = progress where element is fully gone
 */
export function useScrollElement(
  progress: MotionValue<number>,
  direction: Direction,
  enter: number,
  full: number,
  exitStart: number = 0.7,
  exitEnd: number = 0.92
) {
  const distance = direction === "bottom" ? 60 : 120;

  // Mobile: short but visible fade + slide, no blur
  // Enter: 0.01 → 0.08 (fade in + slide up), Exit: exitStart → exitStart+0.06 (fade out + slide up)
  const mEnter = 0.01;
  const mFull = 0.08;
  const mExitEnd = exitStart + 0.06;

  const opacity = useTransform(
    progress,
    isMobile ? [mEnter, mFull, exitStart, mExitEnd] : [enter, full, exitStart, exitEnd],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    isMobile ? [0, 0, 0, 0] : [10, 0, 0, 10]
  );

  const enterX =
    direction === "left" ? -distance : direction === "right" ? distance : 0;
  const exitX =
    direction === "left" ? -distance * 0.6 : direction === "right" ? distance * 0.6 : 0;

  const x = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    isMobile ? [0, 0, 0, 0] : [enterX, 0, 0, exitX]
  );

  const mobileEnterY = 20;
  const mobileExitY = -20;
  const enterY =
    direction === "bottom" ? distance : direction === "scale" ? 20 : 0;
  const exitY = direction === "bottom" ? -40 : direction === "scale" ? -20 : -15;

  const y = useTransform(
    progress,
    isMobile ? [mEnter, mFull, exitStart, mExitEnd] : [enter, full, exitStart, exitEnd],
    isMobile ? [mobileEnterY, 0, 0, mobileExitY] : [enterY, 0, 0, exitY]
  );

  const scale = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [direction === "scale" ? 0.85 : 1, 1, 1, direction === "scale" ? 0.9 : 0.97]
  );

  const filter = useTransform(blur, (v) => v === 0 ? "none" : `blur(${v}px)`);

  return { opacity, x, y, scale, filter };
}
