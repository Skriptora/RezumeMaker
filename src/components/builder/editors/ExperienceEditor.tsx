import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import type { ExperienceItem } from '../../../types/resume'

export const ExperienceEditor: React.FC = () => {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResumeStore()
  const { experience } = resumeData
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null)

  const handleAddNew = () => {
    const newExp: Omit<ExperienceItem, 'id'> = {
      company: 'New Enterprise Corp',
      role: 'Senior Software Engineer',
      location: 'Remote',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Led development of customer-facing web services and microservices.',
      highlights: ['Improved throughput by 25%', 'Implemented clean modern architecture'],
    }
    addExperience(newExp)
  }

  const handleAddHighlight = (expId: string, currentHighlights: string[]) => {
    updateExperience(expId, {
      highlights: [...currentHighlights, 'Architected and shipped scalable microservices'],
    })
  }

  const handleUpdateHighlight = (
    expId: string,
    currentHighlights: string[],
    index: number,
    value: string
  ) => {
    const updated = [...currentHighlights]
    updated[index] = value
    updateExperience(expId, { highlights: updated })
  }

  const handleDeleteHighlight = (
    expId: string,
    currentHighlights: string[],
    index: number
  ) => {
    const updated = currentHighlights.filter((_, i) => i !== index)
    updateExperience(expId, { highlights: updated })
  }

  return (
    <div className="space-y-3">
      {/* Control row */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-mono text-[#9ca3af]">
          {experience.length} positions recorded
        </span>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-body font-medium bg-[#3b82f6]/15 hover:bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Flat expandable rows (No nested cards) */}
      <div className="divide-y divide-[#374151]/50 border-t border-b border-[#374151]/50">
        {experience.map((item) => {
          const isExpanded = expandedId === item.id

          return (
            <div key={item.id} className="py-2.5 space-y-2.5">
              {/* Row Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="flex items-center justify-between cursor-pointer py-1 select-none group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Briefcase className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb] truncate group-hover:text-[#3b82f6] transition-colors">
                      {item.role || 'Untitled Role'}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-[#9ca3af] truncate">
                      {item.company} • {item.startDate} – {item.current ? 'Present' : item.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteExperience(item.id)
                    }}
                    className="p-1 rounded text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] transition-colors cursor-pointer"
                    title="Delete position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-slate-400 dark:text-[#9ca3af]"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Form Fields */}
              {isExpanded && (
                <div className="pt-2 pb-1 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                        Job Title / Role
                      </label>
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) => updateExperience(item.id, { role: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                        Location
                      </label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateExperience(item.id, { location: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={item.startDate}
                          onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                          End Date
                        </label>
                        <input
                          type="text"
                          disabled={item.current}
                          value={item.current ? 'Present' : item.endDate}
                          onChange={(e) => updateExperience(item.id, { endDate: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono disabled:opacity-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                      Role Overview
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body leading-relaxed"
                    />
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af]">
                        Key Highlights & Metrics
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddHighlight(item.id, item.highlights)}
                        className="text-[10px] font-mono text-[#60a5fa] hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>add bullet</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {item.highlights.map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-center space-x-2">
                          <span className="text-[#3b82f6] text-xs font-mono">›</span>
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) =>
                              handleUpdateHighlight(item.id, item.highlights, hlIdx, e.target.value)
                            }
                            className="flex-1 text-xs px-2.5 py-1 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteHighlight(item.id, item.highlights, hlIdx)
                            }
                            className="text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
