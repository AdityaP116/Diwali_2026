/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080E1C',
          secondary: '#111D32',
          elevated: '#24334B',
        },
        gold: {
          primary: '#D9B66F',
          secondary: '#B5934E',
          glow: '#F3DBA9',
        },
        amber: {
          warm: '#E5A955',
        },
        ivory: '#FFF1D8',
        muted: '#A6B0C2',
        festive: {
          border: 'rgba(217, 182, 111, 0.16)',
          borderHover: 'rgba(217, 182, 111, 0.38)',
          orange: '#E87D3E',
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        sanskrit: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'diya-glow': '0 0 50px 12px rgba(217, 182, 111, 0.22), 0 0 90px 24px rgba(229, 169, 85, 0.12)',
        'diya-inner': 'inset 0 0 20px 4px rgba(217, 182, 111, 0.25)',
        'gold-card': '0 8px 32px 0 rgba(8, 14, 28, 0.5), 0 0 16px 1px rgba(217, 182, 111, 0.08)',
        'gold-hover': '0 12px 40px 0 rgba(8, 14, 28, 0.7), 0 0 24px 2px rgba(217, 182, 111, 0.2)',
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(circle at 50% 40%, rgba(36, 51, 75, 0.5) 0%, rgba(17, 29, 50, 0.7) 45%, #080E1C 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(217, 182, 111, 0.12) 0%, rgba(229, 169, 85, 0.04) 40%, transparent 70%)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.96' },
          '25%': { transform: 'scale(1.04, 0.98) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.97, 1.03) rotate(-2deg)', opacity: '0.92' },
          '75%': { transform: 'scale(1.02, 1.01) rotate(0.5deg)', opacity: '0.98' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        flicker: 'flicker 2.4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3.5s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

