/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We are adding a custom animation here called 'shake'
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px) rotate(-5deg)' },
          '75%': { transform: 'translateX(5px) rotate(5deg)' },
        }
      },
      animation: {
        shake: 'shake 0.3s ease-in-out infinite', 
      }
    },
  },
  plugins: [],
}