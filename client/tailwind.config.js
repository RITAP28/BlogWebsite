/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
        Titillium: ["Titillium Web", "sans-serif"],
        RobotoMono: ["Roboto Mono", "monospace"],
        ClimateCrisis: ["Climate Crisis", "sans-serif"],
      },
    },
  },
  plugins: [],
};
