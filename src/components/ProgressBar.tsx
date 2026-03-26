"use client";

import { useEffect, useRef, RefObject } from "react";
import { chapters } from "@/data/chapters";

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
  currentChapter: number;
}

export default function ProgressBar({ containerRef, currentChapter }: Props) {
  const fillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const progress = (e as CustomEvent).detail as number;
      const pct = `${progress * 100}%`;
      if (fillRef.current) {
        fillRef.current.style.height = pct;
      }
      if (knobRef.current) {
        knobRef.current.style.top = pct;
      }
    };
    window.addEventListener("scrollProgress", handler);
    return () => window.removeEventListener("scrollProgress", handler);
  }, []);

  return (
    <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center h-[75vh]">
      <div className="relative w-[3px] h-full rounded-full bg-white/[0.07]">
        {/* Fill */}
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: "0%",
            background:
              "linear-gradient(to bottom, rgba(240,230,210,0.6), rgba(240,230,210,0.2))",
          }}
        />
        {/* Knob */}
        <div
          ref={knobRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cream"
          style={{
            top: "0%",
            boxShadow: "0 0 8px rgba(240,230,210,0.4)",
          }}
        />
      </div>
      {/* Chapter labels */}
      <div className="absolute -left-12 top-0 bottom-0 w-8">
        {chapters.map((ch) => {
          const isActive = currentChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => {
                const scrollTarget =
                  ch.scrollRange[0] *
                  (containerRef.current?.scrollHeight || 0);
                window.scrollTo({ top: scrollTarget, behavior: "smooth" });
              }}
              className={`absolute right-0 -translate-y-1/2 text-[10px] uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "text-cream opacity-100"
                  : "text-cream/20 hover:text-cream/40"
              }`}
              style={{ top: `${(ch.id / (chapters.length - 1)) * 100}%` }}
            >
              {ch.id + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
