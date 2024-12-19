/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
