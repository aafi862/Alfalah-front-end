/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./app/**/**/*.{js,jsx}",
    "./app/**/**/*/*.{js,jsx}",
    "./app/**/**/*/*/*.{js,jsx}"


  ],
  theme: {
    extend: {
      colors: {
        primary: "#1677ff",
        secondary: "#0f172a",
        surface: "#0b1220"
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.1)"
      },
      spacing: {
        18: "4.5rem"
      }
    }
  },
  plugins: []
};
