/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    //custom
    fontFamily:{
      'worksans': ['Work Sans'],
    },
    extend: {
      spacing: {
        '25px': '25px',
      },
      boxShadow: {
        'xl': '-1px 10px 16px -10px #1c9dea',
      }
    },
    colors: {
      'success': '#3fcc35',
      'primary':'##1c9dea',
      'error': '#ff4e2b ',
      'gray':'#647589',
      'bg_gray':'#eff1f2',
      'blue_sky':'rgba(28, 157, 234, 0.15)',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
