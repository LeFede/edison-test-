/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      dropShadow: {
        light: "0 0 6px #f5f5f5",
      },
      screens: {
        xs: "375px",
      },
      maxWidth: {
        container: "1100px",
      },
      gridTemplateColumns: {
        market: "repeat(auto-fill, minmax(min(270px, 450px), 1fr))",
      },
      colors: {
        gray_300: "#D0D5DD",
        gray_400: "#A8AFB8",
        gray_100: "#F2F4F7",
        gray_25: "#FCFCFD",
        gray_500: "#667085",
        gray_900: "#101828",
        anuncios_500: "#1240B7",
        naranja_500: "#FF5500",
        error_600: "#D92D20",

        cardHover: "#66708555",

        hero: "#120635",
        light: "#f5f5f5",

        // legcy

        dark: "#101828",
        darkviolet: "#3c2072",
        gray: "#344054",
        hero: "#120635",
        lightopacity: "#f5f5f566",
        orange: "#f50",
        orangecontrast: "#DB3C00",
        lightviolet: "#9b5fff",
        violet: "#6941c6",
        white: "#fff",
        cream: "#F4EBFF",
        lightgray: "#667085",
        green: "#12B76A",
        accessGray: "#696969",
      },
      fontFamily: {
        inter: "Inter Variable",
        manrope: "Manrope Variable",
      },
      backgroundImage: {
        review: "linear-gradient(to bottom right, #42307d, #6941c6)",

        "hero-effect": "radial-gradient(circle, #6319d8 0%, #120635 100%)",
      },
    },
  },
  plugins: [],
};
