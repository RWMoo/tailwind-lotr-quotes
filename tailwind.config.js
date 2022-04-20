module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
