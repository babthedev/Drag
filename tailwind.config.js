/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenAccent: "#75EAC0",
        lightGray: "#F8FDFB",
        slightDark: "#E1E8E6"
      },
      fontWeight:{
        thin: "200",
        regular: "400",
        bold: "600",
      },
      zIndex:{
        notification: "100"
      }
    },
  },
  plugins: [],
}