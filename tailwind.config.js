/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./main.js"
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#0B0C10',
          dark: '#12141A'
        },
        aqua: {
          neon: '#66FCF1',
          muted: '#45A29E',
          glow: 'rgba(102, 252, 241, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'cascade-1': 'cascadeLoad 1.8s cubic-bezier(0.85, 0, 0.15, 1) infinite',
        'cascade-2': 'cascadeLoad 1.8s cubic-bezier(0.85, 0, 0.15, 1) 0.15s infinite',
        'cascade-3': 'cascadeLoad 1.8s cubic-bezier(0.85, 0, 0.15, 1) 0.3s infinite',
        'cascade-4': 'cascadeLoad 1.8s cubic-bezier(0.85, 0, 0.15, 1) 0.45s infinite',
        'cascade-5': 'cascadeLoad 1.8s cubic-bezier(0.85, 0, 0.15, 1) 0.6s infinite',
      },
      keyframes: {
        cascadeLoad: {
          '0%, 100%': { transform: 'scaleY(0.2)', opacity: '0.2' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
