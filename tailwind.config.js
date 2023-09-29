/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headFamily: "'IBM Plex Serif', serif",
        bodyFamily: "'Poppins', sans-serif",
      },
      fontSize: {
        f40: "40px",
        f35: "35px",
        f30: "30px",
        f25: "25px",
        f20: "20px",
        f16: "16px",
        f14: "14px",
        f12: "12px",
        f10: "10px",
      },
      fontWeight: {
        wb: 900,
        wr: 700,
        wm: 500,
      },
      colors: {
        pink: "#FF046E",
        blue: "#081325",
        red: "#ee4646",
        grey: "#6c6c6c",
      },
    },
  },
  plugins: [],
};
