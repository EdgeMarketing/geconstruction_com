/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brandGold: '#8E7B43',
        brandSilver1: '#58595B',
        brandSilver2: '#727477',
        brandBlue1: '#242E37',
        brandBlue2: '#5E6B79',
        brandBlk: '#181D23',
      },
      fontFamily: {
        sans: ['loew-variable', 'sans-serif'],
        sansAccent1: ['poster-gothic-cond-atf', 'serif'],
        sansAccent2: ['lorimer-no-2-condensed', 'serif'],
      },
    },
  },
  plugins: [],
}