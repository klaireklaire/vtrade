/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'mulish': '"Mulish"',
      'lato': '"Lato'
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['24px', '32px'],
      xl: ['32px', '40px']
    },
    extend: {
    },
  },
  plugins: [],
};
