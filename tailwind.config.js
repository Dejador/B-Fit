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
      'secondary-light': '#76B29F',
      'secondary-light-b': '#8FC6B7',
      'secondary-alt': '#2BB5BF',
      'secondary-alt-b': '#33CCCC',
      'alert': '#FF5F5F',
      'alert-b': '#FF3333',
      'grey': '#a7a7a7',
      white: '#FFF',
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
