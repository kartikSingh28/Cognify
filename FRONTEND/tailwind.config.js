/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: "#F8FAF9", // soft white background
        textPrimary: "#334155", // calm dark gray for text
        cognify: {
          teal: "#5CC6BA",
          mint: "#A1D8B1",
          yellow: "#FFC971",
          dark: "#3B8C82",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
