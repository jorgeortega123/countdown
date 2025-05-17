import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/Forms/*.{js,ts,jsx,tsx,mdx}",
    "./components/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./infraestructure/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#fff2f1",
          "100": "#ffe4e1",
          "200": "#ffcdc8",
          "300": "#ffaaa1",
          "400": "#fe7466",
          "500": "#f74d3c",
          "600": "#e4301e",
          "700": "#c02515",
          "800": "#9f2215",
          "900": "#832319",
          "950": "#480d07",
        },
        "royal-blue": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a6b4fb",
          "400": "#828cf7",
          "500": "#5d5fef",
          "600": "#5147e4",
          "700": "#4539c9",
          "800": "#3931a2",
          "900": "#332f80",
          "950": "#1e1b4b",
        },
        bittersweet: {
          "50": "#fff2f1",
          "100": "#ffe4e1",
          "200": "#ffcdc8",
          "300": "#ffaaa1",
          "400": "#fe7466",
          "500": "#f74d3c",
          "600": "#e4301e",
          "700": "#c02515",
          "800": "#9f2215",
          "900": "#832319",
          "950": "#480d07",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
