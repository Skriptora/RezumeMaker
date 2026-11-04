import React from 'react'

interface WebEditorArtViewProps {
  style?: 'orbital-orb' | 'googie-rings' | 'atomic-spark' | 'wireframe-grid'
  className?: string
  caption?: string
}

export const WebEditorArtView: React.FC<WebEditorArtViewProps> = ({
  style = 'orbital-orb',
  className = '',
  caption,
}) => {
  const renderGraphic = () => {
    switch (style) {
      case 'orbital-orb':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-48 sm:h-56 mx-auto drop-shadow-xl" fill="none">
            <defs>
              <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6F3C" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#F2B705" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#121316" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#orbGlow)" />
            <circle cx="100" cy="100" r="60" stroke="#FF6F3C" strokeWidth="2.5" strokeDasharray="6 3" />
            <ellipse cx="100" cy="100" rx="75" ry="30" stroke="#F2B705" strokeWidth="2" transform="rotate(-25 100 100)" />
            <ellipse cx="100" cy="100" rx="75" ry="30" stroke="#5D8A8A" strokeWidth="2" transform="rotate(35 100 100)" />
            <circle cx="100" cy="100" r="10" fill="#FF6F3C" />
            <circle cx="145" cy="80" r="4" fill="#F2B705" />
            <circle cx="60" cy="125" r="3.5" fill="#5D8A8A" />
            <line x1="15" y1="100" x2="185" y2="100" stroke="#282A33" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="100" y1="15" x2="100" y2="185" stroke="#282A33" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        )

      case 'googie-rings':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-48 sm:h-56 mx-auto drop-shadow-xl" fill="none">
            <ellipse cx="100" cy="100" rx="80" ry="25" stroke="#FF6F3C" strokeWidth="3" transform="rotate(-15 100 100)" />
            <ellipse cx="100" cy="100" rx="60" ry="20" stroke="#F2B705" strokeWidth="2.5" transform="rotate(-15 100 100)" />
            <ellipse cx="100" cy="100" rx="40" ry="15" stroke="#5D8A8A" strokeWidth="2" transform="rotate(-15 100 100)" />
            <circle cx="100" cy="100" r="18" fill="#FF6F3C" />
            <circle cx="100" cy="100" r="7" fill="#F7F4EB" />
            <path d="M40 40 L50 50 M160 160 L150 150" stroke="#F2B705" strokeWidth="2" />
          </svg>
        )

      case 'atomic-spark':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-48 sm:h-56 mx-auto drop-shadow-xl" fill="none">
            <path
              d="M100 30 C100 70, 75 85, 30 100 C75 115, 100 130, 100 170 C100 130, 125 115, 170 100 C125 85, 100 70, 100 30 Z"
              fill="#FF6F3C"
              opacity="0.9"
            />
            <circle cx="100" cy="100" r="14" fill="#F2B705" />
            <circle cx="100" cy="100" r="5" fill="#121316" />
            <circle cx="50" cy="50" r="3" fill="#5D8A8A" />
            <circle cx="150" cy="150" r="3" fill="#5D8A8A" />
          </svg>
        )

      case 'wireframe-grid':
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-48 sm:h-56 mx-auto drop-shadow-xl" fill="none">
            <rect x="25" y="25" width="150" height="150" rx="12" stroke="#282A33" strokeWidth="2" />
            <path d="M25 65 H175 M25 105 H175 M25 145 H175" stroke="#282A33" strokeWidth="1" strokeDasharray="4 2" />
            <path d="M65 25 V175 M105 25 V175 M145 25 V175" stroke="#282A33" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="105" cy="105" r="28" stroke="#FF6F3C" strokeWidth="2" />
            <line x1="25" y1="25" x2="175" y2="175" stroke="#F2B705" strokeWidth="1.5" />
            <line x1="25" y1="175" x2="175" y2="25" stroke="#5D8A8A" strokeWidth="1.5" />
          </svg>
        )
    }
  }

  return (
    <div className={`p-4 rounded-xl border border-[#CCC3B0]/60 dark:border-[#282A33]/80 bg-[#EDE6D8]/50 dark:bg-[#181A1F]/60 flex flex-col items-center justify-center text-center ${className}`}>
      {renderGraphic()}
      {caption && (
        <p className="mt-2 text-[11px] font-mono tracking-wider text-[#5D8A8A] uppercase">
          {caption}
        </p>
      )}
    </div>
  )
}
