import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { Plus, X, Trash2, Cpu, Sparkles } from 'lucide-react'

export const SkillsEditor: React.FC = () => {
  const {
    resumeData,
    addSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    deleteSkillCategory,
  } = useResumeStore()
  const { skills, profile } = resumeData
  const industry = profile.industry || 'software'

  const [newCatName, setNewCatName] = useState('')
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({})

  const industrySkillSuggestions: Record<string, string[]> = {
    software: [
      'TypeScript',
      'React',
      'Go',
      'Python',
      'Docker',
      'Kubernetes',
      'GraphQL',
      'Redis',
      'AWS',
      'CI/CD',
    ],
    engineering_cad: [
      'SolidWorks 3D',
      'AutoCAD',
      'ANSYS Mechanical',
      'GD&T (ASME Y14.5)',
      'MATLAB/Simulink',
      'FEA Analysis',
      'CATIA V5',
      'CNC Machining',
      'DFM / DFA',
      'Fluid Mechanics',
    ],
    data_ai: [
      'PyTorch',
      'HuggingFace Transformers',
      'CUDA',
      'TensorFlow',
      'LLM Fine-Tuning',
      'LangChain',
      'Vector Databases',
      'Pandas/NumPy',
      'MLOps',
      'Scikit-Learn',
    ],
    design_product: [
      'Figma',
      'Design Systems',
      'UI Prototyping',
      'Wireframing',
      'User Research',
      'Information Architecture',
      'Accessibility (WCAG)',
      'Framer',
      'A/B Testing',
    ],
    executive: [
      'P&L Management',
      'Strategic Planning',
      'Cross-Functional Leadership',
      'Budget Optimization',
      'Enterprise SaaS Sales',
      'M&A Integration',
      'OKRs & KPI Metrics',
    ],
  }

  const suggestions = industrySkillSuggestions[industry] || industrySkillSuggestions.software

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    addSkillCategory(newCatName.trim())
    setNewCatName('')
  }

  const handleAddSkill = (catId: string) => {
    const text = skillInputs[catId] || ''
    if (!text.trim()) return
    addSkillToCategory(catId, text.trim())
    setSkillInputs({ ...skillInputs, [catId]: '' })
  }

  const handleQuickAdd = (skillName: string) => {
    if (skills.length === 0) {
      addSkillCategory('Core Competencies')
      setTimeout(() => {
        const latest = useResumeStore.getState().resumeData.skills[0]
        if (latest) addSkillToCategory(latest.id, skillName)
      }, 50)
    } else {
      addSkillToCategory(skills[0].id, skillName)
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Flat Industry Suggestions Bar (No pure colored container with gray text) */}
      <div className="border-b border-[#374151]/50 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#60a5fa] flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Preset Suggestions ({industry.toUpperCase()})</span>
          </span>
          <span className="text-[9px] font-mono text-[#9ca3af]">click to append</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleQuickAdd(s)}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0e1a]/80 border border-[#374151] text-[#e5e7eb] hover:border-[#3b82f6] hover:text-[#60a5fa] transition-colors cursor-pointer"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Category form */}
      <form onSubmit={handleAddCategory} className="flex gap-2">
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="New Skill Group (e.g. Distributed Systems, Cloud Architecture)"
          className="flex-1 text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
        />
        <button
          type="submit"
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-body font-medium bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white transition-colors cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Group</span>
        </button>
      </form>

      {/* Flat Skill Categories List (No nested cards) */}
      <div className="divide-y divide-[#374151]/50 border-t border-b border-[#374151]/50">
        {skills.map((category) => (
          <div key={category.id} className="py-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-[#3b82f6]" />
                <h4 className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
                  {category.categoryName}
                </h4>
                <span className="text-[10px] font-mono text-[#9ca3af]">
                  ({category.skills.length})
                </span>
              </div>
              <button
                onClick={() => deleteSkillCategory(category.id)}
                className="text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] p-1 cursor-pointer transition-colors"
                title="Delete group"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Badges / Minimal Monospace Pill Tags */}
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono bg-[#0a0e1a]/80 border border-[#374151] text-[#e5e7eb]"
                >
                  <span>{s}</span>
                  <button
                    onClick={() => removeSkillFromCategory(category.id, s)}
                    className="hover:text-[#ef4444] text-[#9ca3af] ml-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill to this Category */}
            <div className="flex gap-2 pt-0.5">
              <input
                type="text"
                placeholder="Type skill & press Enter..."
                value={skillInputs[category.id] || ''}
                onChange={(e) =>
                  setSkillInputs({ ...skillInputs, [category.id]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddSkill(category.id)
                  }
                }}
                className="flex-1 text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#2d3a50] hover:bg-[#2d3a50]/80 text-[#e5e7eb] border border-[#374151] cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
