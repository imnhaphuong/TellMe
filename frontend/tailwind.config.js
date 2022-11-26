/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    //custom
    extend: {
      colors: {
        "light-gray" : "#F5F5F5",
        "dark-gray": "#E8E8E8",
        "white": "#FFFFFF",
        "danger": "#FF4E2B",
        "orange": "#FF7C30"
      },
    },
  },
  plugins: [],
}
