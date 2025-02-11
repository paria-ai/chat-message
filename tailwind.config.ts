import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       orange:"#DC7726",
      gold:"#DDC077",
      limegreen:"#57896A",
      charcoal:"#4A545D"
      },
    },
  },
  plugins: [],
} satisfies Config;
