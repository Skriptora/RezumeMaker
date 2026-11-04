import React, { useState } from 'react'
import { Download, Printer, Palette, FolderArchive, Loader2 } from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import { exportPortfolioZip } from '../../utils/portfolioExport'

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
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
    <header className="sticky top-0 z-20 bg-[#E4DAC7]/90 dark:bg-[#121316]/85 backdrop-blur-xl border-b border-[#B2A487]/80 dark:border-[#282A33]/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-300 relative shadow-[0_4px_20px_rgba(0,0,0,0.08)] min-w-0">
      <div className="text-left min-w-0 flex-1">
        <div className="flex items-center space-x-2.5 min-w-0">
          <h1 className="text-lg font-display font-bold tracking-tight text-[#0A0B0E] dark:text-[#F7F4EB] truncate">
            {currentInfo.title}
          </h1>
        </div>
        <p className="text-xs font-body text-[#2C2D33] dark:text-[#A8A49A] mt-0.5 truncate" title={currentInfo.subtitle}>
          {currentInfo.subtitle}
        </p>
      </div>

      <div className="flex items-center space-x-2.5 flex-shrink-0">
        <button
          onClick={() => setActiveTab('templates')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#D8CEBA]/80 dark:bg-[#181A1F] hover:bg-[#C8BD9F] dark:hover:bg-[#22252D] border border-[#B2A487] dark:border-[#282A33] text-[#0A0B0E] dark:text-[#F7F4EB] transition-colors duration-200 active:scale-[0.98] cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-[#FF6F3C]" />
          <span className="capitalize">{theme.templateId} Theme</span>
        </button>

        <button
          onClick={handleExportJSON}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#D8CEBA]/80 dark:bg-[#181A1F] hover:bg-[#C8BD9F] dark:hover:bg-[#22252D] border border-[#B2A487] dark:border-[#282A33] text-[#0A0B0E] dark:text-[#F7F4EB] transition-colors duration-200 active:scale-[0.98] cursor-pointer"
          title="Export resume state as JSON"
        >
          <Download className="w-3.5 h-3.5 text-[#5D8A8A]" />
          <span>JSON</span>
        </button>

        {activeTab === 'canvas' ? (
          <button
            onClick={handleExportZip}
            disabled={isExportingZip}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] shadow-lg shadow-[#FF6F3C]/20 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50"
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
