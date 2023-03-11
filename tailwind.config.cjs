const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.stone,
      'pri': {
        '50': '#fff8ed',
        '100': '#ffefd5',
        '200': '#ffd69e',
        '300': '#ffc072',
        '400': '#fd9a3a',
        '500': '#fc7d13',
        '600': '#ed6009',
        '700': '#c4480a',
        '800': '#9c3910',
        '900': '#7d3011',
        DEFAULT: '#ffd69e'
      },
      'sec': {
        '50': '#f9f6f8',
        '100': '#f2ecf0',
        '200': '#e3d4de',
        '300': '#cbaec1',
        '400': '#ad839f',
        '500': '#946383',
        '600': '#7a4f6b',
        '700': '#644056',
        '800': '#543849',
        '900': '#21171d',
        DEFAULT: '#21171d'
      },
    },

    fontFamily: {
      display: ['Jomhuria', 'sans-serif'],
      sans: ['Nunito', 'sans-serif'],
    },
    fontWeight: {
      regular: 400,
      bold: 700,
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
