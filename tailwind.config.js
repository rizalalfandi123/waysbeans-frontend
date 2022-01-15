const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Poppins: [`"Poppins"`, "ui-sans-serif"],
    },
    colors: {
      ...colors,
      "primary-color": "#995524",
      "background-color": "#FBFBFB",
      "font-color": "#2B1601",
    },
    screens: {
      "2xs": "375px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};
