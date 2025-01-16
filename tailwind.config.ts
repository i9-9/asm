import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        dark: 'var(--color-dark)',
        gray: 'var(--color-gray)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        'suisse': ['Suisse Intl', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
