import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: "var(--font-handwriting)",
      },
      colors: {
        background: "var(--background)",
      },
      borderColor: {
        DEFAULT: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
