"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/chapters";

const navItems = [
  { label: "SEO", chapter: 1 },
  { label: "Dizajn", chapter: 2 },
  { label: "Development", chapter: 3 },
  { label: "Projekti", chapter: 4 },
  { label: "Kontakt", chapter: 6 },
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
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-onyx/40 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo(0)}
            className="text-2xl font-bold tracking-tight text-cream"
          >
            Desnis
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => scrollTo(item.chapter)}
                className={`text-sm ${
                  chapter === item.chapter ? "text-cream" : "text-cream/50"
                } hover:text-cream transition-colors duration-300`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={() => scrollTo(6)}
              className="btn-glow text-sm px-5 py-2 border border-cream/30 rounded-xl text-cream hover:bg-cream/5 transition-colors duration-500"
            >
              Kontaktirajte nas
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-cream"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-cream"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-cream"
            />
          </button>
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
                      chapter === item.chapter ? "text-cream" : "text-cream/50"
                    } hover:text-cream transition-colors text-left`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo(6)}
                  className="text-sm px-4 py-2 border border-cream/30 rounded-xl text-cream hover:bg-cream/5 w-fit transition-colors duration-500"
                >
                  Kontaktirajte nas
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
                  background: sectionFill > 0 ? "rgba(240,230,210,0.5)" : "transparent",
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
