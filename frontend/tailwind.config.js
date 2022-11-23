/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    //custom
    extend: {
      colors: {
        "light-gray" : "#F5F5F5",
        "dark-gray": "#E8E8E8",
      },
    },
  },
  plugins: [],
}
