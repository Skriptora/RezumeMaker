import React from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import type { LayoutStructure } from '../../types/resume'
import { Columns2, LayoutGrid, Rows3, Orbit } from 'lucide-react'

interface LayoutOption {
  id: LayoutStructure
  title: string
  subtitle: string
  badge: string
  icon: React.ReactNode
}

export const LayoutSwitcher: React.FC = () => {
  const { layoutStructure, setLayoutStructure } = useResumeStore()

  const options: LayoutOption[] = [
    {
      id: 'retro-split',
      title: 'Space-Age Split',
      subtitle: 'Retro-futuristic asymmetric layout with atomic star dividers and Space Cream ground',
      badge: 'Retro Spec',
      icon: <Orbit className="w-4 h-4 text-[#FF6F3C]" />,
    },
    {
      id: 'two-column',
      title: 'Modern 2-Column',
      subtitle: 'Left sidebar for skills & contact, right main body for experience',
      badge: 'Balanced',
      icon: <Columns2 className="w-4 h-4" />,
    },
    {
      id: 'grid',
      title: 'Grid Layout',
      subtitle: 'Modular CSS Grid boxes across multi-area drop zones',
      badge: 'Modular',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: 'single',
      title: 'Single Column',
      subtitle: 'Classic vertical linear stack for standard corporate submissions',
      badge: 'Classic',
      icon: <Rows3 className="w-4 h-4" />,
    },
  ]

  return (
    <div className="p-3.5 rounded-2xl bg-[#E4DAC7]/90 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#B2A487]/80 dark:border-[#282A33]/80 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#0A0B0E] dark:text-[#F7F4EB]">
            Document Layout Structure
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/30 font-bold">
            {layoutStructure.toUpperCase()}
          </span>
        </div>
        <span className="text-[11px] font-body text-[#2C2D33] dark:text-[#A8A49A] hidden sm:inline font-medium">
          Adapts multi-area drag & drop and A4 PDF layout
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {options.map((opt) => {
          const isSelected = layoutStructure === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => setLayoutStructure(opt.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#FF6F3C] bg-[#C8BD9F] dark:bg-[#22252D] text-[#0A0B0E] dark:text-[#F7F4EB] shadow-sm ring-1 ring-[#FF6F3C]/50 font-bold'
                  : 'border-[#B2A487]/70 dark:border-[#282A33]/70 bg-[#D8CEBA]/70 dark:bg-[#121316]/60 text-[#2C2D33] dark:text-[#A8A49A] hover:border-[#FF6F3C]/40 hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`${
                        isSelected
                          ? 'text-[#FF6F3C]'
                          : 'text-slate-500 dark:text-[#A8A49A]'
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <span className="text-xs font-display font-bold truncate">
                      {opt.title}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/40'
                        : 'bg-slate-200/60 dark:bg-[#181A1F] text-slate-600 dark:text-[#A8A49A] border border-[#282A33]/40'
                    }`}
                  >
                    {opt.badge}
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
  )
}
