/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pixel-grass': '#2e7d32',
        'pixel-grass-dark': '#1b5e20',
        'pixel-grass-light': '#66bb6a',
        'pixel-sky': '#7ec8e3',
        'pixel-sky-dark': '#3d5a80',
        'pixel-night': '#1a1a2e',
        'pixel-cream': '#f5e9c8',
        'pixel-accent': '#ffcb47',
        'pixel-red': '#e63946',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.9)',
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.9)',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,0.9)',
      },
keyframes: {
  floatBall: {
    '0%,100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-8px)' },
  },
  slideUp: {
    from: { opacity: '0', transform: 'translateY(16px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  blink: {
    '0%,50%': { opacity: '1' },
    '51%,100%': { opacity: '0' },
  },
  progressFill: {
    from: { width: '0%' },
    to: { width: '100%' },
  },
  pulseSlow: {
    '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
    '50%': { opacity: '0.4', transform: 'scale(1.1)' },
  },
  glow: {
    '0%, 100%': {
      boxShadow: '6px 6px 0 0 rgba(0,0,0,0.9), 0 0 12px rgba(255,203,71,0.4)',
    },
    '50%': {
      boxShadow: '6px 6px 0 0 rgba(0,0,0,0.9), 0 0 24px rgba(255,203,71,0.8)',
    },
  },
  ballBounce: {
    '0%': { transform: 'translateX(-30px) translateY(0)' },
    '25%': { transform: 'translateX(25vw) translateY(-12px)' },
    '50%': { transform: 'translateX(50vw) translateY(0)' },
    '75%': { transform: 'translateX(75vw) translateY(-12px)' },
    '100%': { transform: 'translateX(105vw) translateY(0)' },
  },
  ballBounceReverse: {
    '0%': { transform: 'translateX(105vw) translateY(0)' },
    '50%': { transform: 'translateX(50vw) translateY(-10px)' },
    '100%': { transform: 'translateX(-30px) translateY(0)' },
  },
  walkAcross: {
    '0%': { transform: 'translateX(-60px)' },
    '100%': { transform: 'translateX(calc(100vw + 60px))' },
  },
  ballKick: {
    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
    '50%': { transform: 'translateY(-6px) rotate(180deg)' },
  },
},
animation: {
  floatBall: 'floatBall 1.4s ease-in-out infinite',
  slideUp: 'slideUp 0.4s steps(6) both',
  blink: 'blink 1s steps(1) infinite',
  'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
  glow: 'glow 2.5s ease-in-out infinite',
  ballBounce: 'ballBounce 6s linear infinite',
  ballBounceReverse: 'ballBounceReverse 7s linear infinite',
  walkAcross: 'walkAcross 18s linear infinite',
  ballKick: 'ballKick 0.4s ease-in-out infinite',
},
    },
  },
  plugins: [],
};