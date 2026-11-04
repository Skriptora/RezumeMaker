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
        display: ['"Courier Prime"', '"Special Elite"', 'Courier', 'monospace'],
        retro: ['"Courier Prime"', '"Special Elite"', 'Courier', 'monospace'],
        typewriter: ['"Courier Prime"', 'Courier', 'monospace'],
        cinzel: ['"Cinzel"', '"Courier Prime"', 'serif'],
        sans: ['"Courier Prime"', 'Courier', 'monospace'],
        body: ['"Courier Prime"', 'Courier', 'monospace'],
        mono: ['"Courier Prime"', '"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        // Gritty Foggy Black & Richer Darker Cream Palette
        retro: {
          orange: '#FF6F3C', // Burnt Orange
          cream: '#D8CEBA',  // Richer Darker Cream (light mode bg)
          creamLight: '#F7F4EB', // Very Light Cream (dark mode text)
          teal: '#5D8A8A',   // Retro Teal
          navy: '#121316',   // Gritty Foggy Black
          lavender: '#B39ACD', // Vintage Lavender
          yellow: '#F2B705', // Sunburst Yellow
          navyLight: '#181A1F', // Elevated Foggy Card
          navyElevated: '#22252D', // Higher Elevation
          creamDark: '#C8BD9F',
        },
        bg: {
          base: '#121316',
          cream: '#D8CEBA',
          creamLight: '#F7F4EB',
        },
        surface: {
          DEFAULT: '#181A1F',
          card: '#181A1F',
          elevated: '#22252D',
          cream: '#E4DAC7',
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
