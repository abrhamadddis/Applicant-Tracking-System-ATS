/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: 'hsl(9, 100%, 63%)',
        secondary: 'hsl(204, 16%, 26%)',
        gradiantFrom: 'rgba(32, 43, 51, 0.4)',
        gradiantTo: 'rgba(32, 43, 51, 0.1)',
        focusColor: 'rgba(236, 46, 0, 0.5)',
        gradiantbg: 'rgba(32, 43, 51, 0.05)',
        primarytrans: 'rgba(255, 77, 49, 0.3)',

        neutral:{
          lightGrayishCyan: "hsl(180, 52%, 96%)",
          lightGrayishCyan: "hsl(180, 31%, 95%)",
          darkGrayishCyan: "hsl(180, 8%, 52%)",
          veryDarkGrayishCyan: "hsl(180, 14%, 20%)",
        }
      },
      fontFamily: {
        overPass: ['Overpass', 'sans-serif'],
      },
      fontWeight: {
        thin: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
}

