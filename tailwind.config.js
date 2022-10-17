/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 0.6px 5.5px -1px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        skyBlue: '#007AFF',
        primaryBlue: '#2263DF',
        primaryBlueLight: "#D9E8FF",
        primaryTeal: '#00ddc3',
        primaryTealLight: '#DCF7F4',
        logoText: '#0B2C60'
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}
