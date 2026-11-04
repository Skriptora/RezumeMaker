import React from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import { CreativeStudioTemplate } from './templates/CreativeStudioTemplate'
import { ExecutiveMinimalistTemplate } from './templates/ExecutiveMinimalistTemplate'
import { DeveloperTerminalTemplate } from './templates/DeveloperTerminalTemplate'
import { RetroSpaceAgeTemplate } from './templates/RetroSpaceAgeTemplate'
import { CyberKineticBauhausTemplate } from './templates/CyberKineticBauhausTemplate'
import {
  RotateCcw,
  Globe,
  LayoutGrid,
  Columns,
  Terminal,
  Orbit,
  Layers,
} from 'lucide-react'

interface LivePortfolioPreviewProps {
  animationTriggerKey: number
  onReplay: () => void
}

export const LivePortfolioPreview: React.FC<LivePortfolioPreviewProps> = ({
  animationTriggerKey,
  onReplay,
}) => {
  const {
    portfolioCards,
    portfolioTemplate,
    setPortfolioTemplate,
    resumeData,
    selectedElementId,
    setSelectedElementId,
    elementStyles,
  } = useResumeStore()
  const { profile } = resumeData

  const renderActiveTemplate = () => {
    switch (portfolioTemplate) {
      case 'retro-space-age':
        return (
          <RetroSpaceAgeTemplate
            cards={portfolioCards}
            profile={profile}
            selectedAnimation="stagger"
          />
        )
      case 'cyber-kinetic-bauhaus':
        return (
          <CyberKineticBauhausTemplate
            cards={portfolioCards}
            profile={profile}
            selectedAnimation="slide-up"
          />
        )
      case 'creative-studio':
        return (
          <CreativeStudioTemplate
            cards={portfolioCards}
            profile={profile}
            animationTriggerKey={animationTriggerKey}
          />
        )
      case 'executive-minimalist':
        return (
          <ExecutiveMinimalistTemplate
            cards={portfolioCards}
            profile={profile}
            animationTriggerKey={animationTriggerKey}
          />
        )
      case 'developer-terminal':
        return (
          <DeveloperTerminalTemplate
            cards={portfolioCards}
            profile={profile}
            animationTriggerKey={animationTriggerKey}
          />
        )
      default:
        return (
          <RetroSpaceAgeTemplate
            cards={portfolioCards}
            profile={profile}
            selectedAnimation="stagger"
          />
        )
    }
  }

  return (
    <div className="rounded-2xl border border-[#CCC3B0] dark:border-[#282A33] bg-[#EDE6D8] dark:bg-[#121316] shadow-2xl overflow-hidden flex flex-col">
      {/* Mock Browser Window Chrome Header */}
      <div className="px-4 py-3 bg-[#E6DFD1] dark:bg-[#181A1F] border-b border-[#CCC3B0] dark:border-[#282A33] flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Window controls */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <span className="w-3 h-3 rounded-full bg-[#10b981]" />
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto flex items-center justify-center px-3 py-1 rounded-lg bg-[#EDE6D8] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[11px] text-[#4D4E54] dark:text-[#A8A49A] font-mono truncate">
          <Globe className="w-3 h-3 text-[#5D8A8A] mr-1.5 flex-shrink-0" />
          <span className="truncate">
            https://{profile.fullName.toLowerCase().replace(/\s+/g, '')}.dev/{portfolioTemplate}
          </span>
        </div>

        {/* Selected Element Pill in Window Chrome */}
        {selectedElementId && (
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6F3C]/20 border border-[#FF6F3C]/40 text-[#FF6F3C] text-[10px] font-mono font-semibold animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3C] animate-ping" />
            <span>Selected: <code className="font-bold underline">{selectedElementId}</code></span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedElementId(null)
              }}
              className="ml-1 text-[#4D4E54] dark:text-[#A8A49A] hover:text-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold cursor-pointer"
              title="Deselect element"
            >
              ✕
            </button>
          </div>
        )}

        {/* Template Quick Toggles & Replay */}
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center space-x-0.5 bg-[#DDD5C4] dark:bg-[#121316] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setPortfolioTemplate('retro-space-age')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'retro-space-age'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-[#4D4E54] dark:text-[#A8A49A] hover:text-[#FF6F3C]'
              }`}
              title="Retro-Futuristic Space-Age Studio"
            >
              <Orbit className="w-3 h-3 text-[#F2B705]" />
              <span>Retro Space</span>
            </button>
            <button
              onClick={() => setPortfolioTemplate('cyber-kinetic-bauhaus')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'cyber-kinetic-bauhaus'
                  ? 'bg-[#F2B705] text-[#121316] font-bold shadow-xs'
                  : 'text-[#4D4E54] dark:text-[#A8A49A] hover:text-[#F2B705]'
              }`}
              title="Cyber-Kinetic Bauhaus Grid"
            >
              <Layers className="w-3 h-3" />
              <span>Bauhaus</span>
            </button>
            <button
              onClick={() => setPortfolioTemplate('creative-studio')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'creative-studio'
                  ? 'bg-[#EDE6D8] dark:bg-[#22252D] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-[#4D4E54] dark:text-[#A8A49A] hover:text-[#121316] dark:hover:text-[#F7F4EB]'
              }`}
              title="Creative Studio (Masonry)"
            >
              <LayoutGrid className="w-3 h-3" />
              <span className="hidden sm:inline">Masonry</span>
            </button>
            <button
              onClick={() => setPortfolioTemplate('executive-minimalist')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'executive-minimalist'
                  ? 'bg-[#EDE6D8] dark:bg-[#22252D] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-[#4D4E54] dark:text-[#A8A49A] hover:text-[#121316] dark:hover:text-[#F7F4EB]'
              }`}
              title="Executive Minimalist (Snap Scroll)"
            >
              <Columns className="w-3 h-3" />
              <span className="hidden sm:inline">Minimalist</span>
            </button>
            <button
              onClick={() => setPortfolioTemplate('developer-terminal')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'developer-terminal'
                  ? 'bg-[#EDE6D8] dark:bg-[#22252D] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-[#4D4E54] dark:text-[#A8A49A] hover:text-[#121316] dark:hover:text-[#F7F4EB]'
              }`}
              title="Developer Terminal (Monospace Code)"
            >
              <Terminal className="w-3 h-3" />
              <span className="hidden sm:inline">Terminal</span>
            </button>
          </div>

          <button
            onClick={onReplay}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#EDE6D8] dark:bg-[#181A1F] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] hover:text-[#FF6F3C] shadow-xs transition-colors cursor-pointer"
            title="Re-run Framer Motion Entrance Animation"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>
      </div>

      {/* Simulated Website Body Container */}
      <div
        onClick={() => setSelectedElementId(null)}
        className="p-4 sm:p-8 bg-[#E6DFD1]/60 dark:bg-[#121316]/60 min-h-[500px] overflow-y-auto cursor-default"
      >
        {/* Dynamic element custom styles applied to active portfolio template */}
        <style>{`
          ${Object.entries(elementStyles)
            .map(([id, s]) => {
              const rules: string[] = []
              if (s.fontFamily) rules.push(`font-family: "${s.fontFamily}", monospace !important;`)
              if (typeof s.fontSize === 'number' && s.fontSize > 0)
                rules.push(`font-size: ${s.fontSize}px !important;`)
              if (typeof s.lineHeight === 'number' && s.lineHeight > 0)
                rules.push(`line-height: ${s.lineHeight} !important;`)
              if (typeof s.padding === 'number') rules.push(`padding: ${s.padding}px !important;`)
              if (typeof s.margin === 'number') rules.push(`margin: ${s.margin}px !important;`)
              if (typeof s.letterSpacing === 'number')
                rules.push(`letter-spacing: ${s.letterSpacing}px !important;`)
              if (rules.length === 0) return ''
              return `[id="${id}"], [data-element-id="${id}"] { ${rules.join(' ')} }`
            })
            .join('\n')}
        `}</style>
        {renderActiveTemplate()}
      </div>
    </div>
  )
}
