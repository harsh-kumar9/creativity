/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-one': '#DEC0F1',
        'purple-two': '#B79CED',
        'purple-three': '#957FEF',
        'purple-four': '#7161EF',
        'pt-three': '#d55e00',
        'pt-two': '#e69f00',
        'pt-one': '#f0e442',
      },
    },
  },
  plugins: [],
}

