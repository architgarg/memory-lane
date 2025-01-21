const { heroui } = require('@heroui/theme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
      },
      colors: {
        kabul: {
          50: '#f4f4f2',
          100: '#e4e3dd',
          200: '#cbc8bd',
          300: '#aea696',
          400: '#968b79',
          500: '#887b6a',
          600: '#74685a',
          700: '#5a4f47',
          800: '#514742',
          900: '#483f3b',
          950: '#282220',

          light: '#F7F6F3',
          DEFAULT: '#282220',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}
