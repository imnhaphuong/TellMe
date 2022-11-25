/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    //custom
    extend: {
      fontFamily: {
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
        'primary': '##1c9dea',
        'error': '#ff4e2b ',
        "light-gray" : "#F5F5F5",
        "dark-gray": "#E8E8E8",
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  }
}