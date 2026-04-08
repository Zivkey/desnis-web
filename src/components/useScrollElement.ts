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

  // On mobile: delay enter (start at 0 instead of negative) and speed up exit
  // This prevents chapters from overlapping during transitions
  const effectiveEnter = isMobile ? Math.max(enter, 0.02) : enter;
  const effectiveFull = isMobile ? Math.max(full, 0.08) : full;
  const mobileExitEnd = exitStart + (exitEnd - exitStart) * 0.25;
  const effectiveExitEnd = isMobile ? mobileExitEnd : exitEnd;

  const opacity = useTransform(
    progress,
    [effectiveEnter, effectiveFull, exitStart, effectiveExitEnd],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    progress,
    [effectiveEnter, effectiveFull, exitStart, effectiveExitEnd],
    isMobile ? [0, 0, 0, 0] : [10, 0, 0, 10]
  );

  const enterX =
    direction === "left" ? -distance : direction === "right" ? distance : 0;
  const exitX =
    direction === "left" ? -distance * 0.6 : direction === "right" ? distance * 0.6 : 0;

  const x = useTransform(
    progress,
    [effectiveEnter, effectiveFull, exitStart, effectiveExitEnd],
    [enterX, 0, 0, exitX]
  );

  const enterY =
    direction === "bottom" ? distance : direction === "scale" ? 20 : 0;
  const exitY = direction === "bottom" ? -40 : direction === "scale" ? -20 : -15;

  const y = useTransform(
    progress,
    [effectiveEnter, effectiveFull, exitStart, effectiveExitEnd],
    [enterY, 0, 0, exitY]
  );

  const scale = useTransform(
    progress,
    [effectiveEnter, effectiveFull, exitStart, effectiveExitEnd],
    [direction === "scale" ? 0.85 : 1, 1, 1, direction === "scale" ? 0.9 : 0.97]
  );

  const filter = useTransform(blur, (v) => v === 0 ? "none" : `blur(${v}px)`);

  return { opacity, x, y, scale, filter };
}
