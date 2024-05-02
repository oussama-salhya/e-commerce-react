/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // plugins: [require("@tailwindcss/typography"), require("daisyui")],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "dracula"],
  },
};
