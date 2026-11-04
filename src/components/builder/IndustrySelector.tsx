import React from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import type { IndustryType } from '../../types/resume'
import {
  Code2,
  Wrench,
  BrainCircuit,
  Palette,
  BriefcaseBusiness,
  Sparkles,
} from 'lucide-react'

interface IndustryOption {
  id: IndustryType
  label: string
  subtitle: string
  icon: React.ReactNode
  accent: string
}

export const IndustrySelector: React.FC = () => {
  const { resumeData, setIndustry } = useResumeStore()
  const currentIndustry = resumeData.profile.industry || 'software'

  const industries: IndustryOption[] = [
    {
      id: 'software',
      label: 'Software & Cloud',
      subtitle: 'GitHub, APIs, Dev Stack',
      icon: <Code2 className="w-3.5 h-3.5" />,
      accent: 'from-[#3b82f6] to-[#7c3aed]',
    },
    {
      id: 'engineering_cad',
      label: 'CAD & Hardware Eng',
      subtitle: 'SolidWorks, FEA, PE Lic.',
      icon: <Wrench className="w-3.5 h-3.5" />,
      accent: 'from-[#fbbf24] to-orange-600',
    },
    {
      id: 'data_ai',
      label: 'Data Science & AI',
      subtitle: 'HuggingFace, Kaggle, ML',
      icon: <BrainCircuit className="w-3.5 h-3.5" />,
      accent: 'from-[#10b981] to-teal-600',
    },
    {
      id: 'design_product',
      label: 'Product & Design',
      subtitle: 'Figma, Design Systems',
      icon: <Palette className="w-3.5 h-3.5" />,
      accent: 'from-[#7c3aed] to-pink-600',
    },
    {
      id: 'executive',
      label: 'Executive & Ops',
      subtitle: 'P&L, Headcount, ARR',
      icon: <BriefcaseBusiness className="w-3.5 h-3.5" />,
      accent: 'from-slate-700 to-slate-900',
    },
  ]

  return (
    <div className="p-3.5 rounded-lg bg-white/80 dark:bg-[#1e293b]/70 border border-slate-200/80 dark:border-[#374151]/80 shadow-inner space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
          <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 dark:text-[#e5e7eb]">
            Professional Industry Preset
          </span>
        </div>
        <span className="text-[11px] font-body text-slate-500 dark:text-[#9ca3af]">
          Adapts dynamic input fields across all sections
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {industries.map((ind) => {
          const isSelected = currentIndustry === ind.id

          return (
            <button
              key={ind.id}
              onClick={() => setIndustry(ind.id)}
              className={`p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#3b82f6] bg-[#2d3a50] text-[#e5e7eb] shadow-inner'
                  : 'border-slate-200/80 dark:border-[#374151]/50 bg-slate-50/50 dark:bg-[#0a0e1a]/40 text-slate-700 dark:text-[#9ca3af] hover:border-[#374151] hover:text-[#e5e7eb]'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-0.5">
                <span
                  className={`${
                    isSelected
                      ? 'text-[#3b82f6] dark:text-[#60a5fa]'
                      : 'text-slate-400 dark:text-[#9ca3af]'
                  }`}
                >
                  {ind.icon}
                </span>
                <span className="text-xs font-display font-semibold truncate">{ind.label}</span>
              </div>
              <p className="text-[10px] font-body text-slate-500 dark:text-[#9ca3af]/80 truncate">
                {ind.subtitle}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
