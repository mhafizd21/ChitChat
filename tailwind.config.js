module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: {
          DEFAULT: '640px',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
