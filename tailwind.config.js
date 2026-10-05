/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master UDAAN Award-Level Design System Tokens
        cream: '#FBF4EA',
        ivory: '#FFFAF2',
        espresso: '#2B1B17',
        maroon: {
          DEFAULT: '#4A1620',
          dark: '#380F17',
          light: '#5E1E2A',
        },
        terracotta: '#B85C38',
        gold: {
          DEFAULT: '#D9A441',
          deep: '#B8801F',
          light: '#F3D28E',
          shimmer: '#FFE8B3',
        },
        peacock: '#1F6F78',

        // Semantic mapping ensuring zero aubergine / plum
        surface: {
          cream: '#FBF4EA',
          ivory: '#FFFAF2',
          espresso: '#2B1B17',
          maroon: '#4A1620',
        },
        ink: {
          DEFAULT: '#2B1B17',
          muted: '#66534E',
          subtle: '#8C7771',
          maroon: '#4A1620',
        },
        dove: {
          white: '#FFFFFF',
          wing: '#FFFAF2',
          ivory: '#FBF4EA',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        ui: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
      },
      letterSpacing: {
        'tight-title': '-0.02em',
        'wide-label': '0.18em',
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(217, 164, 65, 0.35)',
        'maroon-glow': '0 20px 45px -12px rgba(74, 22, 32, 0.45)',
        'soft-elevation': '0 12px 32px -4px rgba(43, 27, 23, 0.07)',
        'card-hover': '0 24px 50px -10px rgba(43, 27, 23, 0.12)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'dolly': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
