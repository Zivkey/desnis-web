"use client";

import { MotionValue, motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollElement } from "../useScrollElement";

interface Props { progress: MotionValue<number>; active: boolean; }

const slides = [
  {
    id: 0,
    company: "TechStart",
    name: "Marko S.",
    role: "CEO, TechStart",
    quote: "The Desnis team built a site that exceeded every expectation.",
    flag: "rs",
    video: "/videos/testimonial-1.mp4",
  },
  {
    id: 1,
    company: "GreenLeaf",
    name: "Ana P.",
    role: "Marketing, GreenLeaf",
    quote: "Their SEO work brought 3x more organic traffic in just 3 months.",
    flag: "de",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 2,
    company: "UrbanStudio",
    name: "Stefan M.",
    role: "Founder, UrbanStudio",
    quote: "They understand your vision and turn it into reality without compromise.",
    flag: "us",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

export default function ChapterTestimonials({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "scale", 0.08, 0.2, 0.93, 0.998);
  const cardStyle = useScrollElement(progress, "bottom", 0.12, 0.25, 0.93, 0.998);

  const [[current, dir], setPage] = useState([0, 0]);
  const [hovered, setHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fsVideoRef = useRef<HTMLVideoElement>(null);

  const paginate = (newDir: number) => {
    setPage(([prev]) => [(prev + newDir + slides.length) % slides.length, newDir]);
  };

  const openFullscreen = () => {
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    if (fsVideoRef.current) {
      fsVideoRef.current.pause();
      fsVideoRef.current.currentTime = 0;
    }
  };

  // Play fullscreen video when opened + lock Lenis scroll
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (fullscreen) {
      lenis?.stop();
      if (fsVideoRef.current) {
        fsVideoRef.current.currentTime = 0;
        fsVideoRef.current.play();
      }
    } else {
      lenis?.start();
    }
    return () => { (window as any).__lenis?.start(); };
  }, [fullscreen, current]);

  // Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeFullscreen(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slide = slides[current];

  return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ pointerEvents: active ? "auto" : "none" }}>

      {/* Header */}
      <motion.div className="absolute left-[6vw] top-[13%]" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] uppercase mb-3">Testimonials</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          What clients<br />say
        </h2>
      </motion.div>

      {/* Portrait card */}
      <motion.div style={cardStyle} className="absolute left-[6vw] top-[38%] bottom-[10%] w-[min(320px,38vw)]">

        <div
          className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
          onMouseEnter={() => { setHovered(true); if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play(); } }}
          onMouseLeave={() => { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
          onClick={openFullscreen}
        >
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) paginate(1);
                else if (info.offset.x > 60) paginate(-1);
              }}
              className="absolute inset-0 select-none"
            >
              {/* Video — paused on first frame, plays on hover */}
              <video
                ref={videoRef}
                src={slide.video}
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={(e) => { (e.target as HTMLVideoElement).currentTime = 0.001; }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Top left: company */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[15px] font-normal text-white tracking-[-0.01em]">{slide.company}</span>
              </div>

              {/* Top right: play button — always visible */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="black"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <p className="text-[15px] text-white font-normal leading-snug mb-4">&ldquo;{slide.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-white/15 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`https://flagcdn.com/w80/${slide.flag}.png`}
                      alt={slide.flag}
                      className="w-6 h-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] font-normal text-white">{slide.name}</p>
                    <p className="text-[12px] text-white/50">{slide.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav below card */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => paginate(-1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </motion.div>

      {/* Fullscreen overlay — rendered via portal so it covers navbar/scrollbar */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {fullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-2xl bg-black/70"
              onClick={closeFullscreen}
            >
              {/* Main video */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="relative z-10 h-[88vh] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  ref={fsVideoRef}
                  src={slide.video}
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Close button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
