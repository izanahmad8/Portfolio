/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', "sans-serif"],
      },
      fontWeight: {
        medium: 500,
        light: 300,
        bold: 700,
      },
      colors: {
        // Use "colors" instead of "color"
        white: "#ffffff", // You can also use named color "white"
      },
    },
  },
  plugins: [],
};
