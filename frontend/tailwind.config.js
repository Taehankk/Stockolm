/** @type {import('tailwindcss').Config} */

const widthSize = {
  small: "6rem",
  medium: "11rem",
  large: "15rem",
};

const fontSize = {
  small: "0.8rem",
  medium: "1rem",
  large: "1.2rem",
};

const textColor = {
  black: "black",
  white: "white",
};

const colors = {
  PrimaryRed: "#FF4F4F",
  PrimaryBlue: "#61A9FB",
  PrimaryYellow: "#FFF5D2",
  LightBlue: "#CFE5FE",
  LightGreen: "#51E8B3",
  ButtonRed: "#FF6B5A",
  TextRed: "#EA1825",
  PrimaryPink: "#FFABAB",
  LightPink: "#FFD2D2",
};

const border = {
  black: "black",
  none: "none",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: widthSize,
      fontSize: fontSize,
      textColor: textColor,
      colors: colors,
      border: border,
    },
  },
  safelist: [
    {
      // w-클래스에 대해서 safelist 추가
      pattern: new RegExp(`^w-(${Object.keys(widthSize).join("|")})$`),
    },
    {
      // text-클래스에 대해서 safelist 추가
      pattern: new RegExp(
        `^text-(${Object.keys(fontSize, textColor).join("|")})$`
      ),
    },
    {
      // bg-클래스에 대해서 safelist 추가
      pattern: new RegExp(`^bg-(${Object.keys(colors).join("|")})$`),
    },
    {
      // border-클래스에 대해서 safelist 추가
      pattern: new RegExp(`^border-(${Object.keys(border).join("|")})$`),
    },
  ],
  plugins: [],
};
