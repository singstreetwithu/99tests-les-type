/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#e8c9cf',
        mauve: '#b29ab7',
        rosewood: '#6e5566',
        cream: '#fbf6f2',
        ink: '#2d2330',
        haze: '#f3e8ec'
      },
      boxShadow: {
        luxe: '0 24px 80px rgba(110, 85, 102, 0.18)',
        soft: '0 12px 32px rgba(110, 85, 102, 0.12)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeSlideOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-16px)' }
        },
        pulseRing: {
          '0%': { transform: 'scale(0.92)', opacity: '0.52' },
          '100%': { transform: 'scale(1.18)', opacity: '0' }
        }
      },
      animation: {
        floaty: 'floaty 4.6s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        fadeSlideIn: 'fadeSlideIn 0.38s ease forwards',
        fadeSlideOut: 'fadeSlideOut 0.24s ease forwards',
        pulseRing: 'pulseRing 1.8s ease-out infinite'
      }
    }
  },
  plugins: []
};
