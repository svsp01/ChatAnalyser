/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#AEC6CF',
        'pastel-green': '#77DD77',
        'pastel-pink': '#FFB7CE',
        'pastel-pink-dark': '#FF9BB4',
        'pastel-purple': '#CFCFC4',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
    },
  },
  plugins: [],
}

