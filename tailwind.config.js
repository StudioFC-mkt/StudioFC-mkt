/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5A623',
        background: '#3D4A5C',
        surface: '#FFFFFF',
        surfaceAlt: '#EAEAEA',
        dark: '#2F3B48',
        soft: '#697789',
      },
      boxShadow: {
        glow: '0 0 30px rgba(245, 166, 35, 0.18)',
      },
    },
  },
  plugins: [],
};
