"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/chapters";

const navItems = [
  { label: "SEO", chapter: 1 },
  { label: "Design", chapter: 2 },
  { label: "Development", chapter: 3 },
  { label: "Projects", chapter: 4 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => setChapter((e as CustomEvent).detail);
    const progressHandler = (e: Event) => setScrollPercent((e as CustomEvent).detail);
    window.addEventListener("chapterChange", handler);
    window.addEventListener("scrollProgress", progressHandler);
    return () => {
      window.removeEventListener("chapterChange", handler);
      window.removeEventListener("scrollProgress", progressHandler);
    };
  }, []);

  const scrollTo = (chapterId: number) => {
    const ch = chapters.find((c) => c.id === chapterId);
    if (!ch) return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const target = ch.scrollRange[0] * scrollHeight;
    setIsOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo(0, target);
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-[6vw] pt-[3vh] pb-4"
      >
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center">

          {/* Left: logo + name */}
          <button onClick={() => scrollTo(0)} aria-label="Home" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H0.582032H15.7907H16L15.9987 0.0012858C24.8639 0.110961 32.0002 7.223 32.0002 16C32.0002 24.8455 24.752 32 15.7907 32H12.1007L8.00025 24H15.7907C20.1396 24 24.0002 20.2927 24.0002 16C24.0002 11.7073 20.1396 8 15.7907 8H7.71429L0 16V0ZM0 16V32L7.85455 23.8545L16 16H0Z" fill="white"/>
            </svg>
          </button>

          {/* Center: pill nav (desktop) */}
          <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center rounded-full overflow-hidden backdrop-blur-xl bg-white/10">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.chapter)}
                className={`relative text-[16px] px-9 py-4 transition-colors duration-300 ${
                  chapter === item.chapter
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          </div>

          {/* Right: contact button + mobile hamburger */}
          <div className="flex items-center justify-end gap-3">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollTo(6)}
              className="hidden md:inline-flex items-center gap-[6px] text-[16px] font-normal tracking-[-0.02em] bg-white text-black px-10 py-4 rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              Contact us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-white" />
              <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-6 pb-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.chapter)}
                    className={`text-sm ${
                      chapter === item.chapter ? "text-white" : "text-white/50"
                    } hover:text-white transition-colors text-left`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo(6)}
                  className="text-sm bg-white text-black px-5 py-2 rounded-full w-fit hover:bg-white/90 transition-colors duration-300"
                >
                  Contact us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile progress bar */}
      <div className="sm:hidden fixed right-0 top-[60px] bottom-0 z-50 flex flex-col gap-1 w-2 py-3">
        {chapters_mobile.map((id) => {
          const sectionStart = id * (1 / 7);
          const sectionEnd = (id + 1) * (1 / 7);
          const sectionFill =
            scrollPercent <= sectionStart
              ? 0
              : scrollPercent >= sectionEnd
              ? 100
              : ((scrollPercent - sectionStart) / (1 / 7)) * 100;

          return (
            <div key={id} className="relative flex-1 bg-white/[0.05] rounded-full">
              <div
                className="absolute top-0 left-0 w-full rounded-full transition-colors duration-500 opacity-50"
                style={{
                  height: `${sectionFill}%`,
                  background: sectionFill > 0 ? "rgba(255,255,255,0.5)" : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

const chapters_mobile = [0, 1, 2, 3, 4, 5, 6];
