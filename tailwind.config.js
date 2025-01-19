const { heroui } = require('@heroui/theme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(button|select|ripple|spinner|form|listbox|divider|popover|scroll-shadow).js',
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}
