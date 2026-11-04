import React from 'react'

export const RetroBackgroundArt: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Retro Abstract Architectural Line Art (Zero Gradients, Pure Geometric Mid-Century Poise) */}
      <svg
        className="w-full h-full opacity-100"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top-Right: Concentric Retro Space Arcs */}
        <g className="text-[#5D8A8A] dark:text-[#5D8A8A] opacity-[0.14] dark:opacity-[0.12]">
          <circle cx="1280" cy="120" r="280" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
          <circle cx="1280" cy="120" r="220" stroke="currentColor" strokeWidth="1" />
          <circle cx="1280" cy="120" r="160" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 6" />
          <circle cx="1280" cy="120" r="100" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="1280" cy="120" r="40" stroke="currentColor" strokeWidth="1" />
          <line x1="1280" y1="-80" x2="1280" y2="320" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1080" y1="120" x2="1480" y2="120" stroke="currentColor" strokeWidth="0.8" />
        </g>

        {/* Mid-Century Bauhaus Solid Solar Disc Silhouette */}
        <circle
          cx="1340"
          cy="260"
          r="85"
          className="fill-[#FF6F3C] opacity-[0.07] dark:opacity-[0.09]"
        />

        {/* Center-Left: Drafting Guidelines & Coordinate Grid */}
        <g className="text-[#B2A487] dark:text-[#282A33] opacity-[0.35] dark:opacity-[0.35]">
          <line x1="100" y1="0" x2="100" y2="900" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
          <line x1="380" y1="0" x2="380" y2="900" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
          <line x1="840" y1="0" x2="840" y2="900" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />

          <line x1="0" y1="240" x2="1440" y2="240" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
          <line x1="0" y1="580" x2="1440" y2="580" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
        </g>

        {/* Precision Mechanical Reticles / Registration Targets */}
        <g className="text-[#FF6F3C] opacity-[0.25] dark:opacity-[0.22]">
          {/* Target 1 */}
          <circle cx="380" cy="240" r="14" stroke="currentColor" strokeWidth="1" />
          <line x1="360" y1="240" x2="400" y2="240" stroke="currentColor" strokeWidth="1" />
          <line x1="380" y1="220" x2="380" y2="260" stroke="currentColor" strokeWidth="1" />

          {/* Target 2 */}
          <circle cx="840" cy="580" r="14" stroke="currentColor" strokeWidth="1" />
          <line x1="820" y1="580" x2="860" y2="580" stroke="currentColor" strokeWidth="1" />
          <line x1="840" y1="560" x2="840" y2="600" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Bottom-Left: Googie Ellipse Orbit with Planetary Angle */}
        <g className="text-[#5D8A8A] opacity-[0.12] dark:opacity-[0.1]">
          <ellipse
            cx="240"
            cy="760"
            rx="320"
            ry="110"
            transform="rotate(-22 240 760)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <ellipse
            cx="240"
            cy="760"
            rx="240"
            ry="80"
            transform="rotate(-22 240 760)"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </g>

        {/* Vintage Lavender Bauhaus Triangle Silhouette */}
        <polygon
          points="620,860 670,780 720,860"
          className="fill-[#B39ACD] opacity-[0.06] dark:opacity-[0.08]"
        />

        {/* Retro Crosshairs & Technical Registration Marks */}
        <g className="text-[#F2B705] opacity-[0.3] dark:opacity-[0.2] font-mono text-[12px]">
          <text x="390" y="235">+</text>
          <text x="850" y="575">+</text>
          <text x="1220" y="440">+</text>
          <text x="160" y="140">+</text>
        </g>

        {/* Technical Coordinate Stamps */}
        <g className="text-[#121316] dark:text-[#F7F4EB] opacity-[0.16] dark:opacity-[0.12] font-mono text-[9px] tracking-widest uppercase">
          <text x="120" y="40">SYS-REF // 48.21.99</text>
          <text x="860" y="235">GRID-SEC [03-B]</text>
          <text x="120" y="880">TYPEWRITER STUDIO ARCHIVE</text>
          <text x="1240" y="880">REVI-4.2 // CALIBRATED</text>
        </g>
      </svg>
    </div>
  )
}
