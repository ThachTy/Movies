/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        sm: "1em",
        lg: "1.5em",
        xl: "2em",
        "2xl": "3em",
      },
    },
  },
  plugins: [],
};
