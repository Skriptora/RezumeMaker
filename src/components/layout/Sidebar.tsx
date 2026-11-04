import React, { useState } from 'react'
import {
  FileText,
  Sparkles,
  LayoutTemplate,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  RotateCcw,
  Plus,
} from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import type { TabType } from '../../types/resume'
import { CreateCustomSectionModal } from '../builder/modals/CreateCustomSectionModal'

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isDarkMode,
    toggleDarkMode,
    sections,
    toggleSection,
    moveSection,
    resetSectionsToDefault,
    resumeData,
  } = useResumeStore()

  const [sectionsExpanded, setSectionsExpanded] = useState(true)
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)

  const activeSectionsCount = sections.filter((s) => s.isEnabled).length

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'builder',
      label: 'Resume Builder',
      icon: <FileText className="w-4 h-4 text-[#FF6F3C]" />,
    },
    {
      id: 'canvas',
      label: 'Visual Portfolio',
      icon: <Sparkles className="w-4 h-4 text-[#F2B705]" />,
      badge: '✦ 2080 Studio',
    },
    {
      id: 'templates',
      label: 'Templates & Gallery',
      icon: <LayoutTemplate className="w-4 h-4 text-[#5D8A8A]" />,
    },
  ]

  return (
    <aside className="w-72 lg:w-80 flex-shrink-0 border-r border-slate-300 dark:border-[#223854] bg-[#F2EBD7] dark:bg-[#0D1B2A] flex flex-col h-screen sticky top-0 z-30 transition-colors duration-300 pl-3 pr-5 lg:pl-4 lg:pr-6">
      {/* Brand Header - Retro-Futuristic TWA/Atomic Style */}
      <div className="pt-6 pb-5 pl-2 pr-1 border-b border-slate-300/80 dark:border-[#223854] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#FF6F3C] via-[#F2B705] to-[#5D8A8A] flex items-center justify-center text-[#F2EBD7] shadow-inner font-bold">
            <span className="text-base font-retro">✦</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-lg tracking-tight text-slate-900 dark:text-[#F2EBD7] uppercase">
                REZUME
              </span>
              <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/40">
                2080 SPEC
              </span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-[#5D8A8A] font-mono tracking-wider uppercase">
              Retro-Futuristic Studio
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="py-5 space-y-1">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-[#A3B4C8] px-3 mb-2.5 flex items-center justify-between">
          <span>Navigation</span>
          <span className="text-[#FF6F3C]">✦</span>
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-body font-medium transition-all duration-300 ease-out group cursor-pointer ${
                isActive
                  ? 'bg-[#FAF6EC] dark:bg-[#1B3150] text-[#0D1B2A] dark:text-[#F2EBD7] border border-[#FF6F3C]/60 shadow-[0_0_15px_-3px_rgba(255,111,60,0.2)]'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-slate-900 dark:hover:text-[#F2EBD7] hover:bg-slate-200/50 dark:hover:bg-[#14243B] border border-transparent hover:translate-x-1'
              }`}
            >
              <div className="flex items-center">
                {/* Tilted indicator bar */}
                {isActive ? (
                  <span
                    className="w-1.5 h-4 bg-gradient-to-b from-[#FF6F3C] to-[#F2B705] rounded-sm transform rotate-45 mr-2.5 transition-transform duration-300 ease-out shadow-sm"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="w-1.5 h-4 mr-2.5 opacity-0 transition-opacity duration-300 ease-out" />
                )}
                <span className="mr-2.5">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isActive
                      ? 'bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/40'
                      : 'bg-[#F2B705]/15 text-[#F2B705] border border-[#F2B705]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Dynamic Sections Manager */}
      <div className="flex-1 overflow-y-auto px-2 py-3 border-t border-slate-300 dark:border-[#223854]">
        <div className="flex items-center justify-between py-1.5 px-1">
          <button
            onClick={() => setSectionsExpanded(!sectionsExpanded)}
            className="flex items-center space-x-2 text-xs font-display font-semibold uppercase tracking-wider text-slate-700 dark:text-[#A3B4C8] hover:text-slate-900 dark:hover:text-[#F2EBD7] transition-colors duration-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5D8A8A]" />
            <span>Dynamic Sections</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-[#14243B] text-slate-800 dark:text-[#F2EBD7] border border-slate-300/50 dark:border-[#223854]">
              {activeSectionsCount}/{sections.length}
            </span>
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              title="Add Custom Component"
              className="p-1 rounded text-slate-500 dark:text-[#A3B4C8] hover:text-[#FF6F3C] dark:hover:text-[#FF6F3C] hover:bg-slate-200/50 dark:hover:bg-[#14243B] transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSectionsExpanded(!sectionsExpanded)}
              className="p-1 rounded text-slate-500 dark:text-[#A3B4C8] hover:text-slate-700 dark:hover:text-[#F2EBD7] cursor-pointer"
            >
              {sectionsExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {sectionsExpanded && (
          <div className="mt-2 space-y-2">
            {/* Prominent "Add Custom Component" Action Button */}
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[#FF6F3C] bg-[#FF6F3C]/15 hover:bg-[#FF6F3C]/25 border border-[#FF6F3C]/40 hover:border-[#FF6F3C]/60 transition-all duration-200 cursor-pointer shadow-xs group"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#FF6F3C]" />
              <span>+ Custom Component</span>
            </button>

            <div className="space-y-1">
              {sections.map((sec, index) => (
                <div
                  key={sec.id}
                  className={`group flex items-center justify-between p-2 rounded-md text-xs transition-colors duration-200 ease-out ${
                    sec.isEnabled
                      ? 'bg-[#FAF6EC] dark:bg-[#14243B] border border-slate-300 dark:border-[#223854] text-slate-900 dark:text-[#F2EBD7]'
                      : 'bg-transparent border border-dashed border-slate-300/80 dark:border-[#223854]/40 text-slate-400 dark:text-[#A3B4C8]/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex flex-col text-slate-400 dark:text-[#A3B4C8]/60 group-hover:text-slate-600 dark:group-hover:text-[#A3B4C8]">
                      <button
                        disabled={index === 0}
                        onClick={() => moveSection(index, 'up')}
                        className="hover:text-[#FF6F3C] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed leading-none text-[9px]"
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        disabled={index === sections.length - 1}
                        onClick={() => moveSection(index, 'down')}
                        className="hover:text-[#FF6F3C] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed leading-none text-[9px]"
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                    <span className={`font-medium truncate ${!sec.isEnabled ? 'line-through' : ''}`}>
                      {sec.name}
                    </span>
                  </div>

                  <div className="flex items-center flex-shrink-0">
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className={`relative inline-flex h-4.5 w-8 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-out focus:outline-none ${
                        sec.isEnabled ? 'bg-[#FF6F3C]' : 'bg-slate-300 dark:bg-[#223854]'
                      }`}
                      role="switch"
                      aria-checked={sec.isEnabled}
                      title={sec.isEnabled ? 'Enabled' : 'Disabled'}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-out ${
                          sec.isEnabled ? 'translate-x-3.5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetSectionsToDefault}
              className="w-full text-[10px] font-mono py-1.5 text-slate-500 dark:text-[#A3B4C8] hover:text-slate-800 dark:hover:text-[#FF6F3C] flex items-center justify-center space-x-1.5 transition-colors duration-200 mt-2 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Sections Order</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Controls: Retro-Themed Interface Toggle & User Badge */}
      <div className="p-3 border-t border-slate-300 dark:border-[#223854] space-y-2.5">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-200/50 dark:bg-[#14243B] border border-slate-300 dark:border-[#223854]">
          <div className="flex items-center space-x-2 text-xs font-body font-medium text-slate-800 dark:text-[#F2EBD7]">
            {isDarkMode ? (
              <Moon className="w-3.5 h-3.5 text-[#B39ACD]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#FF6F3C]" />
            )}
            <span>{isDarkMode ? 'Cosmic Navy (Dark)' : 'Space Cream (Light)'}</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-4.5 w-8 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-out focus:outline-none ${
              isDarkMode ? 'bg-[#FF6F3C]' : 'bg-[#5D8A8A]'
            }`}
            role="switch"
            aria-checked={isDarkMode}
            title="Toggle theme"
          >
            <span
              className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-out ${
                isDarkMode ? 'translate-x-3.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* User Status Bar - Mohammed Shaheen */}
        <div className="flex items-center space-x-2.5 px-2 py-1 bg-slate-200/30 dark:bg-[#14243B]/60 rounded-lg border border-slate-300/40 dark:border-[#223854]/60">
          <div className="relative">
            <img
              src={resumeData.profile.avatarUrl || `${import.meta.env.BASE_URL}shaheen.jpg`}
              alt={resumeData.profile.fullName || 'Mohammed Shaheen'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF6F3C]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-1 ring-[#0D1B2A]" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-display font-bold text-slate-900 dark:text-[#F2EBD7] truncate">
              {resumeData.profile.fullName}
            </p>
            <p className="text-[10px] font-mono text-[#5D8A8A] truncate">
              ✦ {resumeData.profile.location.split('(')[0].trim()}
            </p>
          </div>
        </div>
      </div>

      <CreateCustomSectionModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </aside>
  )
}
