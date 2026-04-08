"use client";

import { MotionValue, motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

function Dropdown({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0" ref={ref}>
      <label className="text-[11px] text-white/70 uppercase tracking-[0.08em]">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-[13px] text-left transition-all ${
            open ? "border-white/30 bg-white/10" : "border-white/10 bg-white/[0.06]"
          } ${value ? "text-white" : "text-white/50"}`}
        >
          <span className="truncate">{value || "Select..."}</span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className="text-white/40 flex-shrink-0 ml-1"
          >
            <polyline points="6 9 12 15 18 9"/>
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-white/15 bg-[#0d0d0d]/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-left transition-colors ${
                    value === opt
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {opt}
                  {value === opt && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ChapterContact({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "scale", 0.08, 0.2, 2, 3);
  const formStyle = useScrollElement(progress, "bottom", 0.12, 0.25, 2, 3);

  const [service, setService] = useState("");
  const [pages, setPages] = useState("");
  const [cms, setCms] = useState("");
  const [animations, setAnimations] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  // motion.form ref is passed via ref prop on motion.form
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  return (
    <div
      className="absolute inset-0"
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      {/* Header */}
      <motion.div className="absolute left-[6vw] top-[13%]" style={headerStyle}>
        <p className="text-[13px] text-white/40 tracking-[0.08em] mb-3">Contact</p>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
          Get in<br />touch
        </h2>
        <div className="flex items-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[13px] text-white/40">Available · We reply within 24h</span>
        </div>
      </motion.div>

      {/* Form card — motion.form so backdrop-blur is on the same compositing layer as the animation */}
      <motion.form
        ref={formRef}
        style={formStyle}
        onSubmit={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
        className="absolute right-[6vw] top-[13%] w-[min(520px,44vw)] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10 transition-[border-color] duration-300 hover:border-white/25 flex flex-col"
      >
          {/* Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl z-0"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(200px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.05), transparent 70%)`,
            }}
          />
          {/* Top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-0" />

          <div className="relative z-10 px-9 py-8 flex flex-col gap-7">

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-white/50 uppercase tracking-[0.08em]">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/25 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-white/50 uppercase tracking-[0.08em]">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/25 transition-colors"
              />
            </div>

            <div className="flex gap-9">
              <Dropdown
                label="Service"
                options={["Branding", "Web Design", "Development"]}
                value={service}
                onChange={setService}
              />
              <Dropdown
                label="Pages"
                options={["1", "2 - 5", "5 - 10", "10 - 20", "20+"]}
                value={pages}
                onChange={setPages}
              />
            </div>

            <div className="flex gap-9">
              <Dropdown
                label="CMS"
                options={["No CMS", "Simple CMS", "Advanced CMS"]}
                value={cms}
                onChange={setCms}
              />
              <Dropdown
                label="Animations"
                options={["Basic", "Advanced", "Premium"]}
                value={animations}
                onChange={setAnimations}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-white/50 uppercase tracking-[0.08em]">Message</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/25 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="relative z-10 px-9 pb-8 pt-5 border-t border-white/[0.06]">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-[13px] font-normal px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Send message
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
      </motion.form>
    </div>
  );
}
