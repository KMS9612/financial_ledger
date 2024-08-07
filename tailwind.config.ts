import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true },
    extend: {
      backgroundImage: {
        landing: "url(/landing_bg.png)",
      },
      fontFamily: {
        notokr: ["Noto Sans KR"],
      },
      colors: {
        positiveText: "#2ECC71",
        nagativeText: "#E74C3C",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
