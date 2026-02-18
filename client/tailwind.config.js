/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#3730a3' // indigo-800
        },
        accent: '#06b6d4' // cyan-500
      }
    },
  },
  plugins: [],
}

