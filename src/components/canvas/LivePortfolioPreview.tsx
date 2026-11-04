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
  const { portfolioCards, portfolioTemplate, setPortfolioTemplate, resumeData } =
    useResumeStore()
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
    <div className="rounded-2xl border border-slate-300/80 dark:border-[#374151]/80 bg-white dark:bg-[#0a0e1a] shadow-2xl overflow-hidden flex flex-col">
      {/* Mock Browser Window Chrome Header */}
      <div className="px-4 py-3 bg-slate-100 dark:bg-[#0c111d] border-b border-slate-200 dark:border-[#374151] flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Window controls */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <span className="w-3 h-3 rounded-full bg-[#10b981]" />
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto flex items-center justify-center px-3 py-1 rounded-lg bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-[#374151]/60 text-[11px] text-slate-500 dark:text-[#9ca3af] font-mono truncate">
          <Globe className="w-3 h-3 text-[#3b82f6] mr-1.5 flex-shrink-0" />
          <span className="truncate">
            https://{profile.fullName.toLowerCase().replace(/\s+/g, '')}.dev/{portfolioTemplate}
          </span>
        </div>

        {/* Template Quick Toggles & Replay */}
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center space-x-0.5 bg-slate-200/60 dark:bg-[#14243B] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setPortfolioTemplate('retro-space-age')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                portfolioTemplate === 'retro-space-age'
                  ? 'bg-[#FF6F3C] text-[#F2EBD7] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#FF6F3C]'
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
                  ? 'bg-[#F2B705] text-[#0D1B2A] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#F2B705]'
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
                  ? 'bg-white dark:bg-[#1B3150] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#F2EBD7]'
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
                  ? 'bg-white dark:bg-[#1B3150] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#F2EBD7]'
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
                  ? 'bg-white dark:bg-[#1B3150] text-[#5D8A8A] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#F2EBD7]'
              }`}
              title="Developer Terminal (Monospace Code)"
            >
              <Terminal className="w-3 h-3" />
              <span className="hidden sm:inline">Terminal</span>
            </button>
          </div>

          <button
            onClick={onReplay}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-[#374151] text-slate-700 dark:text-[#e5e7eb] hover:text-[#3b82f6] shadow-xs transition-colors cursor-pointer"
            title="Re-run Framer Motion Entrance Animation"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>
      </div>

      {/* Simulated Website Body Container */}
      <div className="p-4 sm:p-8 bg-[#0a0e1a]/40 min-h-[500px] overflow-y-auto">
        {renderActiveTemplate()}
      </div>
    </div>
  )
}
