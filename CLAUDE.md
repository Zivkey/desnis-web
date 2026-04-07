# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run lint` — ESLint via next lint
- No test framework is configured

## Architecture

Single-page scroll-driven agency site for **Desnis** (web design, SEO & development). English-language UI. Font: Geist Sans.

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 3 + GSAP + Framer Motion + Lenis smooth scroll.

### Scroll system (core concept)

The entire site is one page with a tall scrollable container (`2100vh` in `ScrollStage`). GSAP `ScrollTrigger` maps scroll position to a normalized `0–1` progress value. This progress drives:

1. **Video scrubbing** — Two `<video>` elements (`/videos/full.mp4`) have their `currentTime` set directly from scroll progress. The foreground video uses a radial `video-mask`; the background is blurred for ambient color.
2. **Chapter transitions** — 7 chapters defined in `src/data/chapters.ts`, each with a `scrollRange: [start, end]` slice of the 0–1 range. Per-chapter local progress is computed and fed as a Framer Motion `MotionValue` to each chapter component.
3. **Inter-component communication** — `ScrollStage` dispatches `CustomEvent`s (`chapterChange`, `scrollProgress`) on `window`. `Navbar` and `ProgressBar` listen to these events (no React context or state lifting).

### Component roles

- `SmoothScroll` — Initializes Lenis, connects it to GSAP ticker. Exposes instance as `window.__lenis` for external stop/start control. Renders nothing.
- `ScrollStage` — Orchestrator. Owns video refs, scroll trigger, chapter progress values, and chapter rendering logic. Conditionally mounts chapter components based on `currentChapter ± 1` for performance.
- `Navbar` — Fixed floating nav: SVG logo left, pill nav center (`backdrop-blur-xl bg-white/10 rounded-full`), "Contact us" pill button right. `grid-cols-[1fr_auto_1fr]` layout. Nav items: SEO, Design, Development, Projects.
- `ProgressBar` — Desktop: vertical track on right side with draggable knob. Mobile: thin vertical bars in `Navbar`.
- `useScrollElement` — Reusable hook that converts a chapter's progress `MotionValue` into enter/exit animation styles (opacity, x/y, scale, blur) for individual elements within chapters.
- Chapter components — Each receives `progress` (MotionValue) and `active` (boolean).

### Chapters

| # | Component | Content |
|---|-----------|---------|
| 0 | `ChapterHero` | Full-screen hero, left-aligned title + CTA buttons |
| 1 | `ChapterSeo` | SEO section, header left, 3 glass cards bottom |
| 2 | `ChapterDesign` | Design section, header right, 3 glass cards left (stacked) |
| 3 | `ChapterDev` | Development section, header left, 3 glass cards bottom |
| 4 | `ChapterWork` | Portfolio — centered title + "View all projects", infinite marquee of portrait cards (flip on hover) |
| 5 | `ChapterTestimonials` | Testimonials — header left, portrait video swiper card with hover-to-play + fullscreen via React Portal |
| 6 | `ChapterContact` | Contact — header left, `motion.form` glass card right with dropdowns + inputs |

### Glass card pattern

All section cards use the same style: `rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/10`. Mouse-tracking radial gradient spotlight on hover. **Important:** `backdrop-blur` only works when applied directly to the animated `motion.*` element — wrapping a regular element in a `motion.div` creates a compositing layer barrier that prevents blur from reaching the video behind.

### Marquee animations

Defined in `globals.css`: `.animate-marquee-left` (70s, translateX 0→-50%) and `.animate-marquee-right` (reverse). Cards in `ChapterWork` use `.flip-card` / `.flip-inner` / `.flip-front` / `.flip-back` CSS classes for 3D flip on hover.

### Testimonials video

- `/public/videos/testimonial-1.mp4` — real client video for slide 0
- Hover-to-play: `onLoadedData` seeks to `0.001` to show first frame; `onMouseEnter` resets to 0 and plays; `onMouseLeave` pauses and resets
- Fullscreen: React `createPortal` to `document.body` (z-9999), `window.__lenis.stop()` locks scroll

### Design tokens

Custom Tailwind colors in `tailwind.config.ts`: `onyx` (dark bg), `cream`, `sand`, `stone`, `hacker` (green), `neon` (pink), `neon-purple`. Font: `var(--font-geist-sans)` set on `<html>` element in `layout.tsx`. Chapter-specific radial gradient backgrounds applied to `<body>` via `chapter-bg-0` through `chapter-bg-6` CSS classes.

### Notable patterns

- `window.__lenis` — Lenis instance exposed globally from `SmoothScroll` for `stop()`/`start()` calls
- Body class manipulation: `ScrollStage` sets `chapter-bg-*` on `document.body`
- Video preloading: force-play-then-pause trick for mobile
- Scroll lock in fullscreen: `window.__lenis?.stop()` / `start()` + Escape key listener
