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
          DEFAULT: '#080B18',
          secondary: '#101629',
          elevated: '#171F35',
        },
        gold: {
          primary: '#E7BE70',
          secondary: '#B98B43',
          glow: '#FFE194',
        },
        amber: {
          warm: '#FFB347',
        },
        ivory: '#FFF3DA',
        muted: '#A9B0C3',
        festive: {
          border: 'rgba(231, 190, 112, 0.18)',
          borderHover: 'rgba(231, 190, 112, 0.45)',
          orange: '#FF7A33',
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        sanskrit: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'diya-glow': '0 0 60px 15px rgba(255, 179, 71, 0.25), 0 0 100px 30px rgba(231, 190, 112, 0.15)',
        'diya-inner': 'inset 0 0 20px 4px rgba(255, 122, 51, 0.4)',
        'gold-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 16px 1px rgba(231, 190, 112, 0.1)',
        'gold-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.5), 0 0 24px 3px rgba(231, 190, 112, 0.25)',
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(circle at 50% 45%, rgba(35, 27, 45, 0.6) 0%, rgba(16, 22, 41, 0.8) 50%, #080B18 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 179, 71, 0.18) 0%, rgba(231, 190, 112, 0.05) 45%, transparent 70%)',
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

