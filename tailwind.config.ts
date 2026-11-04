import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', '"Space Grotesk"', 'serif'],
        retro: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Outfit"', '"Manrope"', 'sans-serif'],
        body: ['"Outfit"', '"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        // Retro-Futuristic Palette (Thegrafx Palette Spec)
        retro: {
          orange: '#FF6F3C', // Burnt Orange
          cream: '#F2EBD7',  // Space Cream
          teal: '#5D8A8A',   // Retro Teal
          navy: '#0D1B2A',   // Cosmic Navy
          lavender: '#B39ACD', // Vintage Lavender
          yellow: '#F2B705', // Sunburst Yellow
          navyLight: '#14243B',
          navyElevated: '#1B3150',
          creamDark: '#E5DDC7',
        },
        bg: {
          base: '#0D1B2A',
          cream: '#F2EBD7',
        },
        surface: {
          DEFAULT: '#14243B',
          card: '#14243B',
          elevated: '#1B3150',
          cream: '#FAF6EC',
        },
        primary: {
          DEFAULT: '#FF6F3C',
          accent: '#FF6F3C',
        },
        secondary: {
          DEFAULT: '#5D8A8A',
          accent: '#5D8A8A',
        },
        accent: {
          lavender: '#B39ACD',
          yellow: '#F2B705',
          teal: '#5D8A8A',
          orange: '#FF6F3C',
        },
        info: '#5D8A8A',
        success: '#10b981',
        warning: '#F2B705',
        error: '#ef4444',
        text: {
          primary: '#F2EBD7',
          secondary: '#A3B4C8',
        },
        border: {
          DEFAULT: '#223854',
          subtle: '#223854',
          cream: '#D8CEBA',
        },
      },
      gridTemplateColumns: {
        'asymmetric': '1fr 1.2fr',
        'asymmetric-reverse': '1.2fr 1fr',
        'stagger-6-5': '6fr 5fr',
      },
    },
  },
  plugins: [],
}

export default config
