import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
  plugins: [],
};
export default config;
