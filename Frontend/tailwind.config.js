/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
      invert: {
        1: "1",
      },
    },
  },

  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        ".invert-1": {
          filter: "invert(1)",
        },
      });
    },
  ],
  darkMode: "class",
};
