/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "lines":["Rubik Lines", "system-ui"],
        "maps":["Rubik Maps", "system-ui"],
        "rubik":["Rubik Mono One", "monospace"]
      }
    },
  },
  plugins: [],
}

