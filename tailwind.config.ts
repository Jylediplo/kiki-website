import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E4A1D',
          olive: '#556B2F',
          sand: '#C2B280',
        },
        neutral: {
          dark: '#333333',
          light: '#F5F5F5',
        },
        accent: {
          red: '#8B0000', // Dark Red
          orange: '#FF8C00', // Orange
        },
        text: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
