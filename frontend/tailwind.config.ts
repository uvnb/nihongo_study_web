import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tea: "#7a9e7e",
        torii: "#b33a2f",
        ink: "#1d1a17",
        paper: "#f7f1e7",
        gold: "#c9a54c"
      },
      fontFamily: {
        sans: ["var(--font-body)", "\"Hiragino Kaku Gothic Pro\"", "\"Yu Gothic\"", "sans-serif"],
        serif: ["var(--font-display)", "\"Hiragino Mincho Pro\"", "\"MS Mincho\"", "serif"]
      },
      boxShadow: {
        card: "0 22px 60px rgba(67, 39, 20, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
