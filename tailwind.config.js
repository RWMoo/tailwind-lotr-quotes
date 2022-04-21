module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'ringbearer': ['Ringbearer'],
        'cormorant-light': ['Cormorant-LightItalic'],
        'cormorant': ['Cormorant-Italic']
      }
    },
  },
  plugins: [require("tailwind-gradient-mask-image")]

};
