/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'main-dark': '#292933',
      'main-dark-b': '#1E1E26',
      'main-light': '#46465B',
      'secondary-light': '#8FC6B7',
      'white': '#FFF'
    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [],
}
