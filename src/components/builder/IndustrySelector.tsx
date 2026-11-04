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
      accent: '#FF6F3C',
    },
    {
      id: 'engineering_cad',
      label: 'CAD & Hardware Eng',
      subtitle: 'SolidWorks, FEA, PE Lic.',
      icon: <Wrench className="w-3.5 h-3.5" />,
      accent: '#F2B705',
    },
    {
      id: 'data_ai',
      label: 'Data Science & AI',
      subtitle: 'HuggingFace, Kaggle, ML',
      icon: <BrainCircuit className="w-3.5 h-3.5" />,
      accent: '#5D8A8A',
    },
    {
      id: 'design_product',
      label: 'Product & Design',
      subtitle: 'Figma, Design Systems',
      icon: <Palette className="w-3.5 h-3.5" />,
      accent: '#B39ACD',
    },
    {
      id: 'executive',
      label: 'Executive & Ops',
      subtitle: 'P&L, Headcount, ARR',
      icon: <BriefcaseBusiness className="w-3.5 h-3.5" />,
      accent: '#121316',
    },
  ]

  return (
    <div className="p-3.5 rounded-2xl bg-[#E4DAC7]/90 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#B2A487]/80 dark:border-[#282A33]/80 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6F3C]" />
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#0A0B0E] dark:text-[#F7F4EB]">
            Professional Industry Preset
          </span>
        </div>
        <span className="text-[11px] font-body text-[#2C2D33] dark:text-[#A8A49A] font-medium">
          Adapts dynamic input fields across all sections
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {industries.map((ind) => {
          const isSelected = currentIndustry === ind.id

          return (
            <button
              key={ind.id}
              onClick={() => setIndustry(ind.id)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#FF6F3C] bg-[#C8BD9F] dark:bg-[#22252D] text-[#0A0B0E] dark:text-[#F7F4EB] shadow-sm ring-1 ring-[#FF6F3C]/50 font-bold'
                  : 'border-[#B2A487]/70 dark:border-[#282A33]/70 bg-[#D8CEBA]/70 dark:bg-[#121316]/60 text-[#2C2D33] dark:text-[#A8A49A] hover:border-[#FF6F3C]/40 hover:text-[#0A0B0E] dark:hover:text-[#F7F4EB]'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-0.5">
                <span
                  className={`${
                    isSelected
                      ? 'text-[#FF6F3C]'
                      : 'text-slate-400 dark:text-[#A8A49A]'
                  }`}
                >
                  {ind.icon}
                </span>
                <span className="text-xs font-display font-semibold truncate">{ind.label}</span>
              </div>
              <p className="text-[10px] font-body text-slate-600 dark:text-[#A8A49A] truncate">
                {ind.subtitle}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
