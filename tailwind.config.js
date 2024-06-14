/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3047',
        secondary: '#419D78',
        accent: '#C04ABC',
        secondary2: '#FFDBB5',
        secondary3: '#E0A458',
      },
    },
  },
  plugins: [],
}