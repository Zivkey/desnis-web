import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: "#0D0B09",
        cream: "#F0E6D2",
        sand: "#C8B8A2",
        stone: "#8C7A68",
        hacker: "#00FF41",
        "hacker-dim": "#0a2a0a",
        neon: "#FF2D9B",
        "neon-purple": "#B44AFF",
      },
      fontFamily: {
        geist: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
