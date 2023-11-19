/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Inter', 'Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#4461d7', 
        secondary: '#0b0f1f',
        neutral: '#e1e6ee',
        gray: '#9ca3af'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss')
  ],
}

