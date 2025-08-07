/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#007AFF",
          600: "#0056b3",
          700: "#003d82",
        },
        secondary: {
          50: "#f0f0ff",
          500: "#5856D6",
          600: "#4745c7",
          700: "#3634b8",
        },
        surface: {
          light: "#F2F2F7",
          dark: "#1C1C1E",
        },
        text: {
          primary: "#000000",
          secondary: "#8E8E93",
          "primary-dark": "#FFFFFF",
          "secondary-dark": "#8E8E93",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
