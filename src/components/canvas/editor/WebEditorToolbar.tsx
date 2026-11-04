import React, { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Type,
  Plus,
  Eye,
  Edit3,
  FolderArchive,
  Loader2,
  Home,
  User,
  FileText,
  FolderGit2,
  Mail,
  X,
} from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import { AddComponentModal } from './AddComponentModal'
import { AddCustomFontModal } from './AddCustomFontModal'
import { exportPortfolioZip } from '../../../utils/portfolioExport'
import type { WebEditorPageId } from '../../../types/resume'

export const WebEditorToolbar: React.FC = () => {
  const {
    webEditorViewport,
    setWebEditorViewport,
    webEditorMode,
    setWebEditorMode,
    webEditorCurrentPage,
    setWebEditorCurrentPage,
    webEditorFont,
    setWebEditorFont,
    customFonts,
    isWebEditorEditMode,
    toggleWebEditorEditMode,
    portfolioCards,
    portfolioAnimation,
    portfolioTemplate,
    resumeData,
    selectedElementId,
    setSelectedElementId,
  } = useResumeStore()

  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false)
  const [isAddFontOpen, setIsAddFontOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const pages: { id: WebEditorPageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3 h-3" /> },
    { id: 'about', label: 'About', icon: <User className="w-3 h-3" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-3 h-3" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-3 h-3" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-3 h-3" /> },
  ]

  const handleExport = async () => {
    try {
      setIsExporting(true)
      await exportPortfolioZip(
        resumeData.profile,
        portfolioCards,
        portfolioAnimation,
        portfolioTemplate
      )
    } catch (err) {
      console.error('Failed to export website:', err)
      alert('Export failed. Check console for details.')
    } finally {
      setTimeout(() => setIsExporting(false), 1200)
    }
  }

  return (
    <div className="w-full space-y-2.5">
      {/* Top Main Command Bar */}
      <div className="p-3.5 rounded-2xl bg-[#E4DAC7]/90 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#B2A487]/80 dark:border-[#282A33]/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Left: Viewport Toggles (Desktop, Tablet, Mobile) */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-[#D8CEBA]/80 dark:bg-[#121316] border border-[#B2A487] dark:border-[#282A33]">
            <button
              onClick={() => setWebEditorViewport('desktop')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
                webEditorViewport === 'desktop'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
              title="Desktop Screen Viewport (100% / 1200px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setWebEditorViewport('tablet')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
                webEditorViewport === 'tablet'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
              title="Tablet Screen Viewport (768px - Burger Menu Active)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setWebEditorViewport('mobile')}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
                webEditorViewport === 'mobile'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
              title="Mobile Device Viewport (390px - Burger Menu Active)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Mode Switcher: Multi-Page Website vs Single-Page Landing */}
          <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-[#D8CEBA]/80 dark:bg-[#121316] border border-[#B2A487] dark:border-[#282A33]">
            <button
              onClick={() => setWebEditorMode('multi-page')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                webEditorMode === 'multi-page'
                  ? 'bg-[#5D8A8A] text-[#121316] font-bold shadow-xs'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
              title="Multi-Page Website with dedicated route pages"
            >
              Multi-Page
            </button>
            <button
              onClick={() => setWebEditorMode('single-page')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                webEditorMode === 'single-page'
                  ? 'bg-[#5D8A8A] text-[#121316] font-bold shadow-xs'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
              title="Single-Page Landing scroll layout"
            >
              Single-Page
            </button>
          </div>
        </div>

        {/* Center: Font Inspector & Custom Font Injector */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#D8CEBA]/80 dark:bg-[#121316] border border-[#B2A487] dark:border-[#282A33]">
            <Type className="w-3.5 h-3.5 text-[#F2B705]" />
            <select
              value={webEditorFont}
              onChange={(e) => setWebEditorFont(e.target.value)}
              className="text-xs font-mono bg-transparent text-[#0A0B0E] dark:text-[#F7F4EB] focus:outline-none cursor-pointer font-bold"
            >
              {customFonts.map((f) => (
                <option key={f} value={f} className="bg-[#E4DAC7] dark:bg-[#181A1F] text-[#0A0B0E] dark:text-[#F7F4EB]">
                  {f}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAddFontOpen(true)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#D8CEBA]/80 dark:bg-[#121316] hover:bg-[#FF6F3C] hover:text-[#121316] dark:hover:bg-[#FF6F3C] border border-[#B2A487] dark:border-[#282A33] text-[#0A0B0E] dark:text-[#F7F4EB] transition-colors cursor-pointer flex items-center space-x-1"
            title="Add Custom Google WebFont"
          >
            <Plus className="w-3 h-3" />
            <span>Font</span>
          </button>
        </div>

        {/* Right: Component Insertion, Mode Toggle, Export */}
        <div className="flex items-center space-x-2">
          {/* Add Component Button */}
          <button
            onClick={() => setIsAddComponentOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Component</span>
          </button>

          {/* Active Selected Element Indicator */}
          {selectedElementId && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-[#FF6F3C]/20 border border-[#FF6F3C]/40 text-[#FF6F3C] text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3C] animate-ping" />
              <span>Selected: <code className="font-bold underline">{selectedElementId}</code></span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedElementId(null)
                }}
                className="ml-1 text-[#2C2D33] dark:text-[#F7F4EB] hover:text-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold cursor-pointer"
                title="Deselect element"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Edit Mode Toggle */}
          <button
            onClick={toggleWebEditorEditMode}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border ${
              isWebEditorEditMode
                ? 'bg-[#F2B705] text-[#121316] border-[#F2B705] shadow-xs'
                : 'bg-[#D8CEBA]/80 dark:bg-[#121316] border border-[#B2A487] dark:border-[#282A33] text-[#0A0B0E] dark:text-[#F7F4EB]'
            }`}
            title="Toggle between inline editing and client preview mode"
          >
            {isWebEditorEditMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Mode</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </>
            )}
          </button>

          {/* Export Website */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#5D8A8A] hover:bg-[#5D8A8A]/90 text-[#121316] transition-colors cursor-pointer disabled:opacity-50"
            title="Export full portfolio website as deployable .ZIP"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Compiling...</span>
              </>
            ) : (
              <>
                <FolderArchive className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Site</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Bar: Active Pages Navigation Tabs */}
      {webEditorMode === 'multi-page' && (
        <div className="px-3.5 py-2 rounded-xl bg-[#E4DAC7]/70 dark:bg-[#181A1F]/60 backdrop-blur-md border border-[#B2A487]/70 dark:border-[#282A33]/60 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2C2D33] dark:text-[#5D8A8A] mr-2 font-bold">
              Pages:
            </span>
            {pages.map((p) => {
              const isActive = webEditorCurrentPage === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setWebEditorCurrentPage(p.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                      : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#FF6F3C] hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              )
            })}
          </div>

          <div className="text-[10px] font-mono text-[#2C2D33] dark:text-[#A8A49A] hidden sm:block">
            Route: <span className="text-[#FF6F3C] font-bold">/{webEditorCurrentPage}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddComponentModal
        isOpen={isAddComponentOpen}
        onClose={() => setIsAddComponentOpen(false)}
        defaultPage={webEditorCurrentPage}
      />

      <AddCustomFontModal
        isOpen={isAddFontOpen}
        onClose={() => setIsAddFontOpen(false)}
      />
    </div>
  )
}
