module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
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
    extend: {
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [],
};
