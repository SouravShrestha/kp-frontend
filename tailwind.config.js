/** @type {import('tailwindcss').Config} */
import colors from './src/assets/styles/colors';

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      ...colors,
    },
    fontFamily: {
      meysha: ['Meysha'],
      barlow: ['Barlow'],
      ttjenevers: ['TT Jenevers'],
    },
    borderWidth: {
      '1.5': '1.45px',
    },
    screens: {
      sm: "480px",
      rg: "660px",
      md: "768px",
      mdl: "840px",
      mdxl: "880px",
      lg: "1024px",
      xl: "1280px",
      "1.5xl": "1440px",
      "2xl": "1536px",
    },
  },
};
export const plugins = [];
