"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/data/chapters";
import ChapterHero from "./chapters/ChapterHero";
import ChapterSeo from "./chapters/ChapterSeo";
import ChapterDesign from "./chapters/ChapterDesign";
import ChapterDev from "./chapters/ChapterDev";
import ChapterWork from "./chapters/ChapterWork";
import ChapterTestimonials from "./chapters/ChapterTestimonials";
import ChapterContact from "./chapters/ChapterContact";
import ProgressBar from "@/components/ProgressBar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** On mobile, immediately hide non-active chapters to prevent ghosting overlap.
 *  On desktop, always show (opacity animation handles transitions). */
function MobileHide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={`absolute inset-0 ${!active ? "max-sm:invisible" : ""}`}>{children}</div>;
}

export default function ScrollStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [videosReady, setVideosReady] = useState(false);

  const cp0 = useMotionValue(0.01);
  const cp1 = useMotionValue(-0.5);
  const cp2 = useMotionValue(-0.5);
  const cp3 = useMotionValue(-0.5);
  const cp4 = useMotionValue(-0.5);
  const cp5 = useMotionValue(-0.5);
  const cp6 = useMotionValue(-0.5);
  const cpAll = useRef([cp0, cp1, cp2, cp3, cp4, cp5, cp6]);

  const handleScrollProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (video && video.duration) {
      const time = progress * video.duration;
      video.currentTime = time;
      if (bgVideo && bgVideo.duration) bgVideo.currentTime = time;
    }

    let activeChapter = 0;
    for (const chapter of chapters) {
      if (progress >= chapter.scrollRange[0] && progress < chapter.scrollRange[1]) {
        activeChapter = chapter.id;
        break;
      }
    }
    if (progress >= 1) activeChapter = 6;

    for (const chapter of chapters) {
      const [start, end] = chapter.scrollRange;
      const local = (progress - start) / (end - start);

      if (chapter.id === activeChapter) {
        cpAll.current[chapter.id].set(progress >= 1 ? 1 : local);
      } else if (chapter.id === activeChapter - 1) {
        cpAll.current[chapter.id].set(Math.max(local, 1));
      } else if (chapter.id === activeChapter + 1) {
        cpAll.current[chapter.id].set(Math.min(local, 0));
      } else {
        cpAll.current[chapter.id].set(chapter.id < activeChapter ? 1.5 : -0.5);
      }
    }

    setCurrentChapter(activeChapter);
    window.dispatchEvent(new CustomEvent("chapterChange", { detail: activeChapter }));
    window.dispatchEvent(new CustomEvent("scrollProgress", { detail: progress }));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) { setVideosReady(true); return; }
    const handler = () => setVideosReady(true);
    video.addEventListener("canplaythrough", handler, { once: true });
    return () => video.removeEventListener("canplaythrough", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const forceLoad = (video: HTMLVideoElement) => {
      const p = video.play();
      if (p) p.then(() => { video.pause(); video.currentTime = 0; }).catch(() => video.load());
    };
    const init = () => {
      if (cancelled) return;
      if (videoRef.current) forceLoad(videoRef.current);
      setTimeout(() => { if (!cancelled && bgVideoRef.current) forceLoad(bgVideoRef.current); }, 100);
    };
    const raf = requestAnimationFrame(init);
    const ih = () => { init(); window.removeEventListener("touchstart", ih); window.removeEventListener("scroll", ih); };
    window.addEventListener("touchstart", ih, { once: true });
    window.addEventListener("scroll", ih, { once: true });
    return () => { cancelled = true; cancelAnimationFrame(raf); window.removeEventListener("touchstart", ih); window.removeEventListener("scroll", ih); };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.create({ trigger: containerRef.current, start: "top top", end: "bottom bottom", onUpdate: (self) => handleScrollProgress(self.progress) });
    return () => trigger.kill();
  }, [handleScrollProgress]);

  useEffect(() => {
    const bgClass = chapters[currentChapter]?.background || "chapter-bg-0";
    document.body.className = document.body.className.replace(/chapter-bg-\d/g, "").trim();
    document.body.classList.add("chapter-bg", bgClass);
    return () => document.body.classList.remove("chapter-bg", bgClass);
  }, [currentChapter]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "2100dvh" }}>
      <div id="hero" className="absolute top-0" />
      <div id="seo" className="absolute top-[17%]" />
      <div id="design" className="absolute top-[31%]" />
      <div id="development" className="absolute top-[46%]" />
      <div id="work" className="absolute top-[60%]" />
      <div id="testimonials" className="absolute top-[74%]" />
      <div id="contact" className="absolute top-[98%]" />

      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-onyx" />
        <div className="absolute inset-0 pointer-events-none">
          <video ref={bgVideoRef} className="absolute w-full h-full object-cover scale-150 blur-[100px] opacity-50 saturate-[1.8]" muted playsInline preload="auto" src="/videos/full.mp4" />
          <div className="absolute inset-0 bg-onyx/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-screen h-screen overflow-hidden video-mask">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline preload="auto" src="/videos/full.mp4" />
          </div>
        </div>
        <div className={`absolute inset-0 z-[5] bg-onyx flex items-center justify-center transition-opacity duration-700 ${videosReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative w-10 h-10"><div className="absolute inset-0 rounded-full border-2 border-cream/10" /><div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cream animate-spin" /></div>
            <p className="text-xs text-cream/50 tracking-widest uppercase">Loading</p>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[100svh] z-10">
          {currentChapter <= 1 && <MobileHide active={currentChapter === 0}><ChapterHero progress={cp0} active={currentChapter === 0} /></MobileHide>}
          {currentChapter >= 0 && currentChapter <= 2 && <MobileHide active={currentChapter === 1}><ChapterSeo progress={cp1} active={currentChapter === 1} /></MobileHide>}
          {currentChapter >= 1 && currentChapter <= 3 && <MobileHide active={currentChapter === 2}><ChapterDesign progress={cp2} active={currentChapter === 2} /></MobileHide>}
          {currentChapter >= 2 && currentChapter <= 4 && <MobileHide active={currentChapter === 3}><ChapterDev progress={cp3} active={currentChapter === 3} /></MobileHide>}
          {currentChapter >= 3 && currentChapter <= 5 && <MobileHide active={currentChapter === 4}><ChapterWork progress={cp4} active={currentChapter === 4} /></MobileHide>}
          {currentChapter >= 4 && currentChapter <= 6 && <MobileHide active={currentChapter === 5}><ChapterTestimonials progress={cp5} active={currentChapter === 5} /></MobileHide>}
          {currentChapter >= 5 && <MobileHide active={currentChapter === 6}><ChapterContact progress={cp6} active={currentChapter === 6} /></MobileHide>}
        </div>

        <ProgressBar containerRef={containerRef} currentChapter={currentChapter} />

        <div className={`absolute bottom-0 left-0 right-0 z-30 border-t border-white/5 py-6 px-[6vw] transition-opacity duration-500 ${currentChapter === 6 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-white/60">&copy; 2020 Desnis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
