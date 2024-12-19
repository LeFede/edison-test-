/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        market: "repeat(auto-fill, minmax(min(270px, 450px), 1fr))",
      },
      colors: {
        gray_300: "#D0D5DD",
        gray_100: "#F2F4F7",
        gray_25: "#FCFCFD",
      },
      fontFamily: {
        inter: "Inter Variable",
        manrope: "Manrope Variable",
      },
    },
  },
  plugins: [],
};
