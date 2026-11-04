import React, { useState } from 'react'
import { Download, Printer, Palette, FolderArchive, Loader2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import { exportPortfolioZip } from '../../utils/portfolioExport'

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sections,
    theme,
    resumeData,
    portfolioCards,
    portfolioAnimation,
    portfolioTemplate,
  } = useResumeStore()
  const [isExportingZip, setIsExportingZip] = useState(false)

  const tabLabels: Record<string, { title: string; subtitle: string }> = {
    builder: {
      title: 'Resume Builder Studio',
      subtitle: 'Draggable layout cards with real-time A4 PDF export powered by react-to-print',
    },
    canvas: {
      title: 'Visual Portfolio Studio',
      subtitle: 'Local asset manager, Framer Motion entrance animations, and standalone ZIP compiler',
    },
    templates: {
      title: 'Template & Theme Gallery',
      subtitle: 'Explore curated professional themes and custom typographic palettes',
    },
  }

  const currentInfo = tabLabels[activeTab] || tabLabels.builder
  const activeCount = sections.filter((s) => s.isEnabled).length

  const handlePrint = () => {
    window.print()
  }

  const handleExportZip = async () => {
    try {
      setIsExportingZip(true)
      await exportPortfolioZip(resumeData.profile, portfolioCards, portfolioAnimation, portfolioTemplate)
    } catch (err) {
      console.error('Failed to export portfolio zip:', err)
      alert('Export failed. Please check the console.')
    } finally {
      setTimeout(() => setIsExportingZip(false), 1000)
    }
  }

  const handleExportJSON = () => {
    const state = useResumeStore.getState()
    const exportData = {
      resumeData: state.resumeData,
      sections: state.sections,
      theme: state.theme,
      portfolioCards: state.portfolioCards,
      portfolioAnimation: state.portfolioAnimation,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-${state.resumeData.profile.fullName.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="sticky top-0 z-20 bg-[#FAF6EC]/90 dark:bg-[#0D1B2A]/90 backdrop-blur-md border-b border-slate-300 dark:border-[#223854] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-300 relative">
      {/* Asymmetric retro gradient underline extending from left edge to center */}
      <div
        className="absolute bottom-0 left-0 w-7/12 h-[2.5px] bg-gradient-to-r from-[#FF6F3C] via-[#F2B705] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="text-left">
        <div className="flex items-center space-x-2.5">
          <h1 className="text-lg font-display font-bold tracking-tight text-slate-900 dark:text-[#F2EBD7]">
            {currentInfo.title}
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/30 flex items-center space-x-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3C] animate-pulse" />
            <span>✦ {activeCount} Active</span>
          </span>
        </div>
        <p className="text-xs font-body text-slate-600 dark:text-[#A3B4C8] mt-0.5">
          {currentInfo.subtitle}
        </p>
      </div>

      <div className="flex items-center space-x-2.5">
        <button
          onClick={() => setActiveTab('templates')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-200/50 dark:bg-[#14243B] hover:bg-slate-200 dark:hover:bg-[#1B3150] border border-slate-300 dark:border-[#223854] text-slate-800 dark:text-[#F2EBD7] transition-colors duration-200 active:scale-[0.98] cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-[#FF6F3C]" />
          <span className="capitalize">{theme.templateId} Theme</span>
        </button>

        <button
          onClick={handleExportJSON}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-200/50 dark:bg-[#14243B] hover:bg-slate-200 dark:hover:bg-[#1B3150] border border-slate-300 dark:border-[#223854] text-slate-800 dark:text-[#F2EBD7] transition-colors duration-200 active:scale-[0.98] cursor-pointer"
          title="Export resume state as JSON"
        >
          <Download className="w-3.5 h-3.5 text-[#5D8A8A]" />
          <span>JSON</span>
        </button>

        {activeTab === 'canvas' ? (
          <button
            onClick={handleExportZip}
            disabled={isExportingZip}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#F2EBD7] shadow-lg shadow-[#FF6F3C]/20 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isExportingZip ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FolderArchive className="w-3.5 h-3.5" />
            )}
            <span>Export ZIP</span>
          </button>
        ) : (
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#F2EBD7] shadow-lg shadow-[#FF6F3C]/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        )}
      </div>
    </header>
  )
}
