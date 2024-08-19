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
          khaki: '#BDB76B',
          camo: '#4B5320',
        },
        neutral: {
          dark: '#333333',
          light: '#F5F5F5',
        },
        accent: {
          red: '#C2B280',
          orange: '#FF8C00',
        },
        text: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        blackOps: ['Black Ops One', 'system-ui'],
      },
      boxShadow: {
        military:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
