/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 0.6px 5.5px -1px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        skyBlue: "#007AFF",
        primaryBlue: "#2263DF",
        primaryBlueLight: "#D9E8FF",
        primaryTeal: "#00ddc3",
        primaryTealLight: "#DCF7F4",
        logoText: "#0B2C60",
      },
      animation: {
        enter: "fadeInRight 300ms ease-out",
        leave: "fadeOutLeft 300ms ease-in",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
    require("tw-elements/dist/plugin"),
  ],
};
