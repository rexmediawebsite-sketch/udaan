/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Canvases
        canvas: {
          espresso: '#1C110F',
          shadow: '#251917',
          abyssal: '#160B0A',
        },
        // Divine Highlights
        divine: {
          amber: '#E5A93C',
          ochre: '#C7852B',
          peach: '#F3D2A2',
        },
        // Cool Contrast
        celestial: {
          azure: '#2B6C9E',
          slate: '#3F586B',
        },
        // Editorial Inks
        ink: {
          parchment: '#FAF6F0',
          dust: '#C2B8B5',
        },
        // Oxblood & Burgundy legacy mappings
        oxblood: {
          950: '#160B0A',
          900: '#1C110F',
          850: '#230809',
          800: '#251917',
          700: '#3d1214',
        },
        parchment: {
          100: '#FAF6F0',
          200: '#FAF6F0',
          300: '#C2B8B5',
        },
        udaan: {
          gold: '#E5A93C',
          'gold-light': '#F3D2A2',
          'gold-dark': '#C7852B',
          amber: '#E5A93C',
          azure: '#2B6C9E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        garamond: ['"EB Garamond"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Montserrat"', 'system-ui', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif']
      },
      letterSpacing: {
        'tight-title': '0.08em',
        'wide-label': '0.18em',
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      transitionTimingFunction: {
        'celestial': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'eased-dolly': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
