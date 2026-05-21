/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#dc2626',
          'red-dark': '#991b1b',
          navy: '#1a3c8f',
          'navy-dark': '#0f2557',
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 4px currentColor' },
          '50%': { opacity: '0.6', boxShadow: '0 0 8px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
