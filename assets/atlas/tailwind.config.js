module.exports = {
  future: {},
  purge: [],
  theme: {
    extend: {
      colors: {
        brand:{
          400: '#FADD95',
          500: '#f7c755',
          600: '#ffbe00',
        },
      }
    },
  },
  variants: {},
  plugins: [
      require('@tailwindcss/typography'),
  ],
}