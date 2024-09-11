/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary color : red & blue
        primaryRed: "#FF4F4F",
        primaryBlue: "#61A9FB",
      },
    },
  },
  plugins: [],
};
