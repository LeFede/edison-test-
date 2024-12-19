/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        market: "repeat(auto-fill, minmax(min(270px, 450px), 1fr))",
      },
      colors: {
        grey_300: "#D0D5DD",
      },
      fontFamily: {
        inter: "Inter Variable",
        manrope: "Manrope Variable",
      },
    },
  },
  plugins: [],
};
