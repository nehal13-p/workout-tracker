/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Ensures Tailwind scans all HTML and TypeScript files for class usage
  ],
  theme: {
    extend: {}, // You can customize the theme here if needed
  },
  plugins: [],
};
