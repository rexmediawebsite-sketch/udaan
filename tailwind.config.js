/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Golden Doves Among Sunset Clouds" Master Palette
        sunset: {
          gold: '#F6B51F',         // Sunlit golden yellow
          amber: '#E99A18',        // Golden amber
          orange: '#B96535',       // Burnt orange
          blue: '#397EAC',         // Dusty sky blue
          'blue-light': '#EBF3F8', // Soft dusty blue wash
          'blue-mid': '#5C96BE',   // Medium sky blue
          'blue-dark': '#234C68',  // Deep twilight blue
          plum: '#49313E',         // Deep cloud plum
          'plum-dark': '#2D1D26',  // Twilight shadow plum
          'plum-light': '#F4EDF1', // Very soft plum tint
          brown: '#754633',        // Warm cloud brown
          'brown-dark': '#4D2A1D', // Dark cloud earth
          peach: '#E9AD83',        // Soft peach / apricot
          'peach-light': '#FDF5EE',// Light peach cream
          ivory: '#FFF1D9',        // Warm sunlit ivory
          cream: '#FAF4EB',        // Soft warm cream background
          sand: '#F3ECE2',         // Muted sand / parchment
          ink: '#2A1C24',          // Plum-tinted charcoal text
          'ink-muted': '#6B5860',  // Muted secondary text
          'ink-subtle': '#99848D', // Low priority / inactive text
        },

        // Semantic convenience aliases
        canvas: {
          light: '#FAF4EB',
          ivory: '#FFF1D9',
          cream: '#FAF4EB',
          peach: '#FDF5EE',
          blue: '#EBF3F8',
          plum: '#2D1D26',
          dark: '#1F141B',
        },
        dove: {
          white: '#FFFFFF',
          wing: '#FFFBF5',
          ivory: '#FFF1D9',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        garamond: ['"EB Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif']
      },
      letterSpacing: {
        'tight-title': '0.04em',
        'wide-label': '0.2em',
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      boxShadow: {
        'sunset': '0 12px 36px -8px rgba(233, 154, 24, 0.25)',
        'plum': '0 16px 40px -10px rgba(45, 29, 38, 0.45)',
        'sky': '0 12px 30px -8px rgba(57, 126, 172, 0.2)',
        'soft-warm': '0 8px 30px -4px rgba(117, 70, 51, 0.08)',
      },
      transitionTimingFunction: {
        'celestial': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'eased-dolly': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
