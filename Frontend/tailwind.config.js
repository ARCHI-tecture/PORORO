module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
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
        subColor4: '#817F82',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        mobile: { max: '480px' },
      },
    },
  },
  plugins: [],
};
