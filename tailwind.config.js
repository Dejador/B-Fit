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
      'main-light-b': '#8d8da0',
      'secondary-a': '#303049',
      'secondary-light': '#8FC6B7',
      'secondary-light-b': '#B0EDD9',
      white: '#FFF',
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
