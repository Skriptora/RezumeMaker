import React, { useState } from 'react'
import {
  FileText,
  LayoutTemplate,
  Globe,
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
import { RezumeMakerLogo } from '../brand/RezumeMakerLogo'

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
      icon: <Globe className="w-4 h-4 text-[#5D8A8A]" />,
    },
    {
      id: 'templates',
      label: 'Templates & Gallery',
      icon: <LayoutTemplate className="w-4 h-4 text-[#5D8A8A]" />,
    },
  ]

  return (
    <aside className="w-80 shrink-0 border-r border-[#B2A487]/80 dark:border-[#282A33]/80 bg-[#E4DAC7]/90 dark:bg-[#121316]/85 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-30 transition-colors duration-300 pl-4 pr-6 shadow-[4px_0_24px_rgba(0,0,0,0.12)]">
      {/* Brand Header - REZUMEMAKER Logo & Workers' Studio Motto */}
      <div className="pt-5 pb-4 pl-1 pr-1 border-b border-[#B2A487]/80 dark:border-[#282A33]/80 flex items-center justify-between">
        <RezumeMakerLogo size="md" showMotto={true} />
      </div>

      {/* Main Navigation Tabs */}
      <div className="py-5 space-y-1">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2C2D33] dark:text-[#A8A49A] px-3 mb-2.5">
          <span>Navigation</span>
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-body font-medium transition-all duration-300 ease-out group cursor-pointer ${
                isActive
                  ? 'bg-[#C8BD9F] dark:bg-[#22252D] text-[#0A0B0E] dark:text-[#F7F4EB] border border-[#FF6F3C]/60 shadow-[0_0_15px_-3px_rgba(255,111,60,0.2)]'
                  : 'text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB] hover:bg-[#D8CEBA]/70 dark:hover:bg-[#181A1F] border border-transparent hover:translate-x-1'
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
      <div className="flex-1 overflow-y-auto px-2 py-3 border-t border-[#B2A487]/80 dark:border-[#282A33]/80">
        <div className="flex items-center justify-between py-1.5 px-1">
          <button
            onClick={() => setSectionsExpanded(!sectionsExpanded)}
            className="flex items-center space-x-2 text-xs font-display font-semibold uppercase tracking-wider text-[#2C2D33] dark:text-[#A8A49A] hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB] transition-colors duration-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5D8A8A]" />
            <span>Dynamic Sections</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D8CEBA] dark:bg-[#181A1F] text-[#0A0B0E] dark:text-[#F7F4EB] border border-[#B2A487]/50 dark:border-[#282A33]">
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
                      ? 'bg-[#E6DFD1] dark:bg-[#181A1F] border border-[#CCC3B0] dark:border-[#282A33] text-slate-900 dark:text-[#F7F4EB]'
                      : 'bg-transparent border border-dashed border-[#CCC3B0]/60 dark:border-[#282A33]/60 text-slate-400 dark:text-[#A8A49A]/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex flex-col text-slate-400 dark:text-[#A8A49A]/60 group-hover:text-slate-600 dark:group-hover:text-[#A8A49A]">
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

      {/* Footer Controls: Retro-Themed Interface Toggle */}
      <div className="p-3 border-t border-[#B2A487]/80 dark:border-[#282A33]/80">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#D8CEBA]/80 dark:bg-[#181A1F] border border-[#B2A487] dark:border-[#282A33]">
          <div className="flex items-center space-x-2 text-xs font-body font-medium text-[#0A0B0E] dark:text-[#F7F4EB]">
            {isDarkMode ? (
              <Moon className="w-3.5 h-3.5 text-[#B39ACD]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#FF6F3C]" />
            )}
            <span>{isDarkMode ? 'Foggy Black (Dark)' : 'Retro Cream (Light)'}</span>
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
      </div>

      <CreateCustomSectionModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </aside>
  )
}
