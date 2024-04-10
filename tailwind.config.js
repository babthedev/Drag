/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors:{
        darkModeElements: "hsl(209, 23%, 22%)",
        darkModeBackground: "hsl(207, 26%, 17%)",
        lightModeText: "hsl(200, 15%, 8%)",
        lightModeInput: "hsl(0, 0%, 52%)",
        lightModeBackground: "hsl(0, 0%, 98%)",
        lightModeElements: "hsl(0, 0%, 100%)"
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"]
      },
      fontWeight:{
        mild: "300", 
        normal: "600", 
        extra: "800"
      },
      fontSize:{
        hero: "6rem"
      },
      lineHeight:{
        hero: "6rem"
      }
    },
  },
  plugins: [],
}

