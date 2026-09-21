/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5DD08B',
          hover: '#72D99A',
          glow: 'rgba(93, 208, 139, 0.12)',
          'glow-strong': 'rgba(93, 208, 139, 0.25)',
        },
        surface: {
          primary: '#080B0A',
          secondary: '#0D1210',
          card: '#101613',
          elevated: '#151C18',
          terminal: '#090D0B',
        },
        text: {
          primary: '#F5F7F6',
          secondary: '#A3AEA8',
          muted: '#6F7C74',
        },
        border: {
          DEFAULT: '#26312C',
          subtle: '#1B2420',
          active: '#5DD08B',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-sub': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'card': '16px',
        'badge': '8px',
        'button': '12px',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(93, 208, 139, 0.12)',
        'glow-lg': '0 0 80px rgba(93, 208, 139, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
