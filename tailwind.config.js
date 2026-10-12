/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#2E0A0D',
          900: '#4A0F14',
          800: '#5E1419',
          700: '#7A1C22',
          600: '#8F2A2E',
          100: '#F6E4E2',
        },
        saffron: {
          600: '#C9661A',
          500: '#E07B24',
          400: '#EE9A45',
          300: '#F5B872',
          100: '#FCEBD5',
        },
        ivory: {
          50: '#FFFCF6',
          100: '#FBF6EC',
          200: '#F4ECDC',
          300: '#EADFC8',
        },
        gold: {
          300: '#E2C88E',
          400: '#C9A45C',
          500: '#B08D45',
          600: '#8E6F33',
        },
        ink: {
          900: '#2B1D16',
          700: '#4A3A30',
          500: '#76665A',
          300: '#A89A8E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(43,29,22,0.04), 0 8px 24px -12px rgba(43,29,22,0.12)',
        lift: '0 2px 4px rgba(43,29,22,0.05), 0 18px 40px -16px rgba(74,15,20,0.25)',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)', opacity: 1 },
          '50%': { transform: 'scaleY(1.06) translateY(-1px)', opacity: 0.92 },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.25s ease-out both',
        flicker: 'flicker 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
