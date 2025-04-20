/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff3e6c",
          dark: "#e6375f",
          light: "#ff6b8e",
        },
        secondary: {
          DEFAULT: "#535766",
          dark: "#282c3f",
          light: "#7e818c",
        },
      },
      fontFamily: {
        sans: ["Whitney", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}
