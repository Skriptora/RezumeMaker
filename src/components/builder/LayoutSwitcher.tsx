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
      badge: '✦ Retro Spec',
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
    <div className="p-3 rounded-lg bg-white/80 dark:bg-[#14243B]/80 border border-slate-200/80 dark:border-[#223854] shadow-inner space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 dark:text-[#F2EBD7]">
            Document Layout Structure
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/30 font-bold">
            ✦ {layoutStructure.toUpperCase()}
          </span>
        </div>
        <span className="text-[11px] font-body text-slate-500 dark:text-[#A3B4C8] hidden sm:inline">
          Adapts multi-area drag & drop and A4 PDF layout
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {options.map((opt) => {
          const isSelected = layoutStructure === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => setLayoutStructure(opt.id)}
              className={`p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#3b82f6] bg-[#2d3a50] text-[#e5e7eb] shadow-inner ring-1 ring-[#3b82f6]/40'
                  : 'border-slate-200/80 dark:border-[#374151]/50 bg-slate-50/50 dark:bg-[#0a0e1a]/40 text-slate-700 dark:text-[#9ca3af] hover:border-[#374151] hover:text-[#e5e7eb]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`${
                        isSelected
                          ? 'text-[#3b82f6] dark:text-[#60a5fa]'
                          : 'text-slate-400 dark:text-[#9ca3af]'
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <span className="text-xs font-display font-semibold truncate">
                      {opt.title}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                      isSelected
                        ? 'bg-[#3b82f6]/25 text-[#93c5fd]'
                        : 'bg-slate-200/50 dark:bg-[#1e293b] text-slate-500 dark:text-[#9ca3af]'
                    }`}
                  >
                    {opt.badge}
                  </span>
                </div>
                <p className="text-[10px] font-body text-slate-500 dark:text-[#9ca3af]/80 line-clamp-2 leading-snug">
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
