import React, { useState } from 'react'

export type LogoMarkStyle = 'orbital-globe' | 'kinetic-infinity' | 'puzzle-synergy' | 'retro-starburst'

interface RezumeMakerLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showMotto?: boolean
  className?: string
  interactive?: boolean
}

export const RezumeMakerLogo: React.FC<RezumeMakerLogoProps> = ({
  size = 'md',
  showMotto = true,
  className = '',
  interactive = true,
}) => {
  const [logoStyle, setLogoStyle] = useState<LogoMarkStyle>('orbital-globe')

  const cycleLogoStyle = (e: React.MouseEvent) => {
    if (!interactive) return
    e.stopPropagation()
    const styles: LogoMarkStyle[] = [
      'orbital-globe',
      'kinetic-infinity',
      'puzzle-synergy',
      'retro-starburst',
    ]
    const nextIndex = (styles.indexOf(logoStyle) + 1) % styles.length
    setLogoStyle(styles[nextIndex])
  }

  const renderMark = () => {
    switch (logoStyle) {
      case 'orbital-globe':
        // Inspired by the glowing wireframe retro globe
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform transition-transform duration-500 hover:rotate-45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="44" stroke="#FF6F3C" strokeWidth="4" />
            <ellipse cx="50" cy="50" rx="44" ry="22" stroke="#F2B705" strokeWidth="3" transform="rotate(-30 50 50)" />
            <ellipse cx="50" cy="50" rx="44" ry="22" stroke="#5D8A8A" strokeWidth="3" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="22" ry="44" stroke="#F7F4EB" strokeWidth="2.5" opacity="0.85" />
            <circle cx="50" cy="50" r="6" fill="#FF6F3C" />
            <circle cx="50" cy="50" r="2.5" fill="#F2B705" />
          </svg>
        )

      case 'kinetic-infinity':
        // Inspired by the dynamic bold interlocking kinetic cross
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform transition-transform duration-500 hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="22" fill="#181A1F" />
            <path
              d="M32 28 C18 42, 18 58, 32 72 C46 86, 68 86, 82 72 C96 58, 96 42, 82 28 C68 14, 46 14, 32 28 Z"
              stroke="#F2B705"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M28 68 C14 54, 14 36, 28 22 C42 8, 64 8, 78 22 C92 36, 92 54, 78 68 C64 82, 42 82, 28 68 Z"
              stroke="#FF6F3C"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="5" fill="#5D8A8A" />
          </svg>
        )

      case 'puzzle-synergy':
        // Inspired by the interlocking puzzle piece synergy
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transition-transform duration-300 hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="20" fill="#22252D" />
            {/* Outline puzzle piece */}
            <path
              d="M26 30 H44 C44 38, 54 38, 54 30 H70 V48 C62 48, 62 58, 70 58 V74 H54 C54 66, 44 66, 44 74 H26 V56 C34 56, 34 46, 26 46 Z"
              stroke="#F7F4EB"
              strokeWidth="4.5"
              fill="none"
              strokeLinejoin="round"
            />
            {/* Solid interlocking piece indicator */}
            <circle cx="62" cy="53" r="6" fill="#FF6F3C" />
            <circle cx="49" cy="30" r="4" fill="#F2B705" />
          </svg>
        )

      case 'retro-starburst':
        // Inspired by the organic retro starburst
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transition-transform duration-500 hover:rotate-90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="46" fill="#5D8A8A" />
            <path
              d="M50 16 C50 34, 38 42, 20 40 C36 46, 42 56, 32 76 C42 64, 52 64, 60 84 C62 66, 72 60, 84 62 C72 54, 70 42, 80 26 C68 36, 58 34, 50 16 Z"
              fill="#F7F4EB"
            />
            <circle cx="50" cy="50" r="7" fill="#FF6F3C" />
          </svg>
        )
    }
  }

  const dims = {
    sm: { box: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10', text: 'text-lg sm:text-xl', sub: 'text-[9.5px]' },
    lg: { box: 'w-12 h-12', text: 'text-2xl', sub: 'text-[11px]' },
  }[size]

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Icon Mark Container */}
      <button
        type="button"
        onClick={cycleLogoStyle}
        title={interactive ? `REZUMEMAKER Mark: ${logoStyle} (Click to cycle variant)` : 'REZUMEMAKER Logo'}
        className={`relative ${dims.box} flex-shrink-0 rounded-xl p-1 bg-[#181A1F] border border-[#FF6F3C]/50 shadow-md flex items-center justify-center overflow-hidden group cursor-pointer transition-transform active:scale-95`}
      >
        {renderMark()}
        {interactive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF6F3C] animate-ping opacity-60" />
        )}
      </button>

      {/* Brand Name & Motto */}
      <div className="flex flex-col text-left min-w-0">
        <div className="flex items-center space-x-1.5">
          <span
            className={`font-display font-extrabold ${dims.text} tracking-tight text-[#121316] dark:text-[#F7F4EB] leading-none uppercase`}
            style={{ fontFamily: "'Courier Prime', monospace" }}
          >
            REZUMEMAKER
          </span>
        </div>

        {showMotto && (
          <p
            className={`${dims.sub} text-[#5D8A8A] font-mono tracking-wider font-semibold uppercase mt-0.5 truncate`}
            style={{ letterSpacing: '0.08em' }}
          >
            FORGED FOR WORKERS
          </p>
        )}
      </div>
    </div>
  )
}
