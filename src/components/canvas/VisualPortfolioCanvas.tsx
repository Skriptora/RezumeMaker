import React, { useState } from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import { ProjectCardManager } from './ProjectCardManager'
import { LivePortfolioPreview } from './LivePortfolioPreview'
import { ANIMATION_OPTIONS } from './PortfolioAnimationVariants'
import { exportPortfolioZip } from '../../utils/portfolioExport'
import type { PortfolioAnimationType, PortfolioTemplateId } from '../../types/resume'
import {
  Sparkles,
  LayoutGrid,
  MonitorPlay,
  Columns,
  Play,
  Download,
  Loader2,
  Terminal,
  Orbit,
  Layers,
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
    portfolioAnimation,
    setPortfolioAnimation,
    portfolioTemplate,
    setPortfolioTemplate,
    portfolioCards,
    resumeData,
  } = useResumeStore()
  const [animationTriggerKey, setAnimationTriggerKey] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'split' | 'preview_only' | 'editor_only'>('split')
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const templateOptions: TemplateSelectorOption[] = [
    {
      id: 'retro-space-age',
      title: 'Retro Space-Age',
      subtitle: '1960s Googie color blocking with burnt orange, space cream & DM Serif typography',
      icon: <Orbit className="w-4 h-4 text-[#FF6F3C]" />,
      recommendedAnim: 'stagger',
    },
    {
      id: 'cyber-kinetic-bauhaus',
      title: 'Cyber-Kinetic Bauhaus',
      subtitle: 'Constructivist cosmic navy mesh with split showcase and precision kinetic navigation',
      icon: <Layers className="w-4 h-4 text-[#F2B705]" />,
      recommendedAnim: 'slide-up',
    },
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      subtitle: 'Dynamic masonry grid with staggered cascading fade entrance',
      icon: <LayoutGrid className="w-4 h-4 text-[#B39ACD]" />,
      recommendedAnim: 'stagger',
    },
    {
      id: 'executive-minimalist',
      title: 'Executive Minimalist',
      subtitle: 'Full-page vertical snapping scroll with editorial slide-up',
      icon: <Columns className="w-4 h-4 text-[#5D8A8A]" />,
      recommendedAnim: 'slide-up',
    },
    {
      id: 'developer-terminal',
      title: 'Developer Terminal',
      subtitle: 'Dark monospace code-editor aesthetic with CLI module cards',
      icon: <Terminal className="w-4 h-4 text-[#10b981]" />,
      recommendedAnim: 'scale-up',
    },
  ]

  const handleSelectTemplate = (tpl: TemplateSelectorOption) => {
    setPortfolioTemplate(tpl.id)
    setPortfolioAnimation(tpl.recommendedAnim)
    setAnimationTriggerKey((prev) => prev + 1)
  }

  const handleReplay = () => {
    setAnimationTriggerKey((prev) => prev + 1)
  }

  const handleSelectAnimation = (anim: PortfolioAnimationType) => {
    setPortfolioAnimation(anim)
    setAnimationTriggerKey((prev) => prev + 1)
  }

  const handleExportZip = async () => {
    try {
      setIsExporting(true)
      await exportPortfolioZip(
        resumeData.profile,
        portfolioCards,
        portfolioAnimation,
        portfolioTemplate
      )
    } catch (err) {
      console.error('Failed to export portfolio zip:', err)
      alert('Export failed. Please check the console for details.')
    } finally {
      setTimeout(() => setIsExporting(false), 1200)
    }
  }

  const currentAnimConfig =
    ANIMATION_OPTIONS.find((a) => a.id === portfolioAnimation) || ANIMATION_OPTIONS[0]

  return (
    <div className="space-y-4">
      {/* Portfolio Template Switcher */}
      <div className="p-3.5 rounded-lg bg-white/80 dark:bg-[#1e293b]/70 border border-slate-200/80 dark:border-[#374151]/80 shadow-inner space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 dark:text-[#e5e7eb]">
              Portfolio Website Template
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/30">
            Active: {portfolioTemplate.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {templateOptions.map((opt) => {
            const isSelected = portfolioTemplate === opt.id

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectTemplate(opt)}
                className={`p-3 rounded-md border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#3b82f6] bg-[#2d3a50] text-[#e5e7eb] shadow-inner ring-1 ring-[#3b82f6]/40'
                    : 'border-slate-200/80 dark:border-[#374151]/50 bg-slate-50/50 dark:bg-[#0a0e1a]/40 text-slate-700 dark:text-[#9ca3af] hover:border-[#374151] hover:text-[#e5e7eb]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span>{opt.icon}</span>
                    <span className="text-xs font-display font-semibold truncate">
                      {opt.title}
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-slate-500 dark:text-[#9ca3af]/80 line-clamp-2 leading-relaxed">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Top Animation & Layout Control Center */}
      <div className="p-3.5 rounded-lg bg-white/80 dark:bg-[#1e293b]/70 border border-slate-200/80 dark:border-[#374151]/80 shadow-inner flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Animation dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
              Entrance Animation:
            </span>
            <select
              value={portfolioAnimation}
              onChange={(e) => handleSelectAnimation(e.target.value as PortfolioAnimationType)}
              className="text-xs font-mono px-2.5 py-1.5 rounded bg-slate-50 dark:bg-[#0a0e1a]/80 border border-slate-300 dark:border-[#374151] text-slate-800 dark:text-[#e5e7eb] focus:outline-none focus:border-[#3b82f6] cursor-pointer"
            >
              {ANIMATION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] font-body text-slate-500 dark:text-[#9ca3af] hidden xl:block">
            {currentAnimConfig.description}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Re-trigger Animation Button */}
          <button
            onClick={handleReplay}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-body font-semibold bg-slate-100 dark:bg-[#2d3a50] hover:bg-slate-200 dark:hover:bg-[#2d3a50]/80 text-slate-800 dark:text-[#e5e7eb] border border-slate-300 dark:border-[#374151] transition-colors cursor-pointer active:scale-[0.98]"
            title="Trigger entrance animation preview"
          >
            <Play className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Replay</span>
          </button>

          {/* Export Standalone Portfolio ZIP */}
          <button
            onClick={handleExportZip}
            disabled={isExporting}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-body font-semibold bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            title="Compile into standalone index.html & package local assets into a .zip file"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Compiling ZIP...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Website (.ZIP)</span>
              </>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="inline-flex p-0.5 rounded bg-slate-100 dark:bg-[#0a0e1a] border border-slate-200 dark:border-[#374151] text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-[#2d3a50] text-[#3b82f6] shadow-xs'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb]'
              }`}
              title="Split View (Editor & Live Preview)"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('preview_only')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'preview_only'
                  ? 'bg-white dark:bg-[#2d3a50] text-[#3b82f6] shadow-xs'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb]'
              }`}
              title="Full Live Website Simulation"
            >
              <MonitorPlay className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('editor_only')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'editor_only'
                  ? 'bg-white dark:bg-[#2d3a50] text-[#3b82f6] shadow-xs'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb]'
              }`}
              title="Project Card Manager View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout based on viewMode */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Project Card Manager & Uploader */}
          <div className="lg:col-span-5 bg-white/70 dark:bg-[#1e293b]/70 backdrop-blur-md rounded-lg border border-slate-200/80 dark:border-[#374151]/80 p-4 shadow-inner">
            <ProjectCardManager />
          </div>

          {/* Right Column: Live Framer Motion Animated Preview Container */}
          <div className="lg:col-span-7 sticky top-20">
            <LivePortfolioPreview
              animationTriggerKey={animationTriggerKey}
              onReplay={handleReplay}
            />
          </div>
        </div>
      )}

      {viewMode === 'preview_only' && (
        <div className="w-full">
          <LivePortfolioPreview
            animationTriggerKey={animationTriggerKey}
            onReplay={handleReplay}
          />
        </div>
      )}

      {viewMode === 'editor_only' && (
        <div className="bg-white/70 dark:bg-[#1e293b]/70 backdrop-blur-md rounded-lg border border-slate-200/80 dark:border-[#374151]/80 p-5 shadow-inner">
          <ProjectCardManager />
        </div>
      )}
    </div>
  )
}
