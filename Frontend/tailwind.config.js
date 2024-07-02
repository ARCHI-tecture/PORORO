/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '100': '25rem', // 400px
        '112': '28rem', // 448px
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        '160': '40rem', // 640px
        '192': '48rem', // 768px
        '256': '64rem', // 1024px
      },
      colors: {
        mainYellow: '#FFD812',
        mainBlue: '#2C4493',
        mainOrange: '#EE7005',
      },
    },
  },
  plugins: [],
};
