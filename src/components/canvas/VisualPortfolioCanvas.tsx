import React, { useState } from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import { ProjectCardManager } from './ProjectCardManager'
import { WebEditorToolbar } from './editor/WebEditorToolbar'
import { WebEditorSiteRenderer } from './editor/WebEditorSiteRenderer'
import type { PortfolioAnimationType, PortfolioTemplateId } from '../../types/resume'
import {
  Orbit,
  Layers,
  LayoutGrid,
  Columns,
  Terminal,
  FolderGit2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface TemplateSelectorOption {
  id: PortfolioTemplateId
  title: string
  subtitle: string
  icon: React.ReactNode
  recommendedAnim: PortfolioAnimationType
}

export const VisualPortfolioCanvas: React.FC = () => {
  const {
    portfolioTemplate,
    setPortfolioTemplate,
    setPortfolioAnimation,
    portfolioCards,
  } = useResumeStore()

  const [isProjectsDrawerOpen, setIsProjectsDrawerOpen] = useState(false)

  const templateOptions: TemplateSelectorOption[] = [
    {
      id: 'retro-space-age',
      title: 'Retro Space-Age',
      subtitle: '1960s Googie color blocking with Burnt Orange & Space Cream typography',
      icon: <Orbit className="w-3.5 h-3.5 text-[#FF6F3C]" />,
      recommendedAnim: 'stagger',
    },
    {
      id: 'cyber-kinetic-bauhaus',
      title: 'Cyber Bauhaus',
      subtitle: 'Constructivist cosmic navy mesh with split showcase & kinetic tracks',
      icon: <Layers className="w-3.5 h-3.5 text-[#F2B705]" />,
      recommendedAnim: 'slide-up',
    },
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      subtitle: 'Dynamic masonry grid with staggered cascading fade entrance',
      icon: <LayoutGrid className="w-3.5 h-3.5 text-[#B39ACD]" />,
      recommendedAnim: 'stagger',
    },
    {
      id: 'executive-minimalist',
      title: 'Executive Minimalist',
      subtitle: 'Full-page vertical snapping scroll with monumental editorial layout',
      icon: <Columns className="w-3.5 h-3.5 text-[#5D8A8A]" />,
      recommendedAnim: 'slide-up',
    },
    {
      id: 'developer-terminal',
      title: 'Developer Terminal',
      subtitle: 'Dark monospace code-editor aesthetic with CLI module cards',
      icon: <Terminal className="w-3.5 h-3.5 text-[#10b981]" />,
      recommendedAnim: 'scale-up',
    },
  ]

  const handleSelectTemplate = (tpl: TemplateSelectorOption) => {
    setPortfolioTemplate(tpl.id)
    setPortfolioAnimation(tpl.recommendedAnim)
  }

  return (
    <div className="space-y-4">
      {/* Integrated Template Presets & Project Cards Management Bar */}
      <div className="p-3.5 rounded-2xl bg-[#E4DAC7]/90 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#B2A487]/80 dark:border-[#282A33]/80 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0B0E] dark:text-[#F7F4EB]">
              Editable Template Presets
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/30 font-bold uppercase">
              {portfolioTemplate.replace(/-/g, ' ')}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Toggle Project Cards Drawer */}
            <button
              onClick={() => setIsProjectsDrawerOpen(!isProjectsDrawerOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer flex items-center space-x-1.5 border ${
                isProjectsDrawerOpen
                  ? 'bg-[#FF6F3C] text-[#121316] border-[#FF6F3C] shadow-sm'
                  : 'bg-[#D8CEBA]/80 dark:bg-[#121316] text-[#2C2D33] dark:text-[#A8A49A] border-[#B2A487] dark:border-[#282A33] hover:text-[#FF6F3C]'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Cards ({portfolioCards.length})</span>
              {isProjectsDrawerOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Template Cards Strip (Click to create & switch web page template) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {templateOptions.map((opt) => {
            const isSelected = portfolioTemplate === opt.id

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectTemplate(opt)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FF6F3C] bg-[#DDD5C4] dark:bg-[#22252D] text-[#121316] dark:text-[#F7F4EB] shadow-sm ring-1 ring-[#FF6F3C]/60'
                    : 'border-[#CCC3B0]/70 dark:border-[#282A33]/70 bg-[#E6DFD1]/60 dark:bg-[#121316]/60 text-slate-700 dark:text-[#A8A49A] hover:border-[#FF6F3C]/40 hover:text-slate-900 dark:hover:text-[#F7F4EB]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span>{opt.icon}</span>
                    <span className="text-xs font-mono font-bold truncate">
                      {opt.title}
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-slate-600 dark:text-[#A8A49A] line-clamp-2 leading-relaxed">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Collapsible Project Cards Manager Drawer */}
      {isProjectsDrawerOpen && (
        <div className="p-4 rounded-2xl bg-[#E4DAC7]/90 dark:bg-[#181A1F]/90 backdrop-blur-xl border border-[#B2A487] dark:border-[#282A33] shadow-md animate-in fade-in duration-200">
          <ProjectCardManager />
        </div>
      )}

      {/* Interactive Web Editor Canvas & Controls */}
      <div className="space-y-4">
        <WebEditorToolbar />
        <WebEditorSiteRenderer />
      </div>
    </div>
  )
}

export default VisualPortfolioCanvas
