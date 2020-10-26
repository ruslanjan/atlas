module.exports = {
  future: {},
  purge: [],
  theme: {
    extend: {
      colors: {
        brand:{
          300: '#FADD95',
          400: '#FAD578',
          500: '#f7c755',
          600: '#DEB24B',
        },
      }
    },
  },
  variants: {},
  plugins: [
      require('@tailwindcss/typography'),
  ],
}