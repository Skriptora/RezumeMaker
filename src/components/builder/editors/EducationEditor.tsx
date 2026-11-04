import React from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { Plus, Trash2, GraduationCap } from 'lucide-react'
import type { EducationItem } from '../../../types/resume'

export const EducationEditor: React.FC = () => {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResumeStore()
  const { education } = resumeData

  const handleAddNew = () => {
    const newEdu: Omit<EducationItem, 'id'> = {
      institution: 'Stanford University',
      degree: 'Master of Science',
      fieldOfStudy: 'Artificial Intelligence & Systems',
      startDate: '2020',
      endDate: '2022',
      gpa: '3.95',
    }
    addEducation(newEdu)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-mono text-[#9ca3af]">
          {education.length} degrees recorded
        </span>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-body font-medium bg-[#3b82f6]/15 hover:bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Degree</span>
        </button>
      </div>

      {/* Flat rows (No nested cards) */}
      <div className="divide-y divide-[#374151]/50 border-t border-b border-[#374151]/50">
        {education.map((item) => (
          <div key={item.id} className="py-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
                  {item.institution || 'University'}
                </span>
              </div>
              <button
                onClick={() => deleteEducation(item.id)}
                className="text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] p-1 cursor-pointer transition-colors"
                title="Delete education"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => updateEducation(item.id, { institution: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Degree / Diploma
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={item.fieldOfStudy}
                  onChange={(e) => updateEducation(item.id, { fieldOfStudy: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                    Start
                  </label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                    End
                  </label>
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={(e) => updateEducation(item.id, { endDate: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                    GPA
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => updateEducation(item.id, { gpa: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
