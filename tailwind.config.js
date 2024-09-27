/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: "var(--poppins)",
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
