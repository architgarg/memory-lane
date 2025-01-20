const { heroui } = require('@heroui/theme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(button|card|image|select|ripple|spinner|form|listbox|divider|popover|scroll-shadow).js',
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}
