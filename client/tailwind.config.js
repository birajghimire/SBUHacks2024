/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico'], 
        'protest-riot': ['Protest Riot'],
        'amatic-sc': ['Amatic SC']
      },
      backgroundImage: {
        'journalbg': "url('homepage\public\journalbg.png')",
      }
    },
  },
  plugins: [],
}