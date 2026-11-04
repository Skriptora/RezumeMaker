import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { Plus, Trash2, FolderGit2, ChevronDown, ChevronUp, Wrench } from 'lucide-react'
import type { ProjectItem } from '../../../types/resume'

export const ProjectsEditor: React.FC = () => {
  const { resumeData, addProject, updateProject, deleteProject } = useResumeStore()
  const { projects, profile } = resumeData
  const industry = profile.industry || 'software'
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null)

  const handleAddNew = () => {
    const isCAD = industry === 'engineering_cad'
    const newProj: Omit<ProjectItem, 'id'> = {
      name: isCAD ? 'Aerospace Turbine Stress Analysis & CAD Model' : 'New Distributed System',
      description: isCAD
        ? 'Parametric 3D CAD modeling and dynamic FEA stress analysis achieving 28% weight reduction.'
        : 'Distributed microservice application deployed on AWS and Kubernetes.',
      technologies: isCAD
        ? ['SolidWorks', 'ANSYS Mechanical', 'MATLAB', 'GD&T', 'CNC Milling']
        : ['TypeScript', 'React', 'Node.js', 'Docker', 'PostgreSQL'],
      liveUrl: 'https://demo.app',
      githubUrl: isCAD ? undefined : 'https://github.com/alexvance',
      metricsImpact: isCAD
        ? 'Thermal tolerance tested up to 1200°C; factor of safety > 2.4'
        : '99.99% uptime, p99 latency < 45ms',
    }
    addProject(newProj)
  }

  const handleTechChange = (projId: string, valString: string) => {
    const arr = valString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    updateProject(projId, { technologies: arr })
  }

  return (
    <div className="space-y-3">
      {/* Control row */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-mono text-[#9ca3af]">
          {projects.length} featured project items
        </span>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-body font-medium bg-[#3b82f6]/15 hover:bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Flat expandable rows (No nested cards) */}
      <div className="divide-y divide-[#374151]/50 border-t border-b border-[#374151]/50">
        {projects.map((proj) => {
          const isExpanded = expandedId === proj.id

          return (
            <div key={proj.id} className="py-2.5 space-y-2.5">
              {/* Row Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                className="flex items-center justify-between cursor-pointer py-1 select-none group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb] truncate group-hover:text-[#3b82f6] transition-colors">
                      {proj.name || 'Untitled Project'}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-[#9ca3af] truncate">
                      {proj.technologies.slice(0, 4).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteProject(proj.id)
                    }}
                    className="p-1 rounded text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] transition-colors cursor-pointer"
                    title="Delete project"
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
                  <div>
                    <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                      Project Name / Deliverable Title
                    </label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                      className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                      Overview & Engineering Highlights
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body leading-relaxed"
                    />
                  </div>

                  {/* Industry Tools & Impact (Flat surface) */}
                  <div className="border-t border-b border-[#374151]/40 py-2.5 space-y-2">
                    <span className="text-[10px] font-mono text-[#60a5fa] uppercase tracking-wider flex items-center space-x-1.5">
                      <Wrench className="w-3 h-3" />
                      <span>
                        Stack & Metrics ({industry === 'engineering_cad' ? 'CAD / FEA' : 'Tech Stack'})
                      </span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                          {industry === 'engineering_cad'
                            ? 'CAD Tools / Fabrication Spec'
                            : 'Technologies (comma-separated)'}
                        </label>
                        <input
                          type="text"
                          value={proj.technologies.join(', ')}
                          onChange={(e) => handleTechChange(proj.id, e.target.value)}
                          placeholder={
                            industry === 'engineering_cad'
                              ? 'SolidWorks, AutoCAD, ANSYS FEA, CNC'
                              : 'React, TypeScript, Docker'
                          }
                          className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                          Key Metrics / Performance Impact
                        </label>
                        <input
                          type="text"
                          value={proj.metricsImpact || ''}
                          onChange={(e) =>
                            updateProject(proj.id, { metricsImpact: e.target.value })
                          }
                          placeholder={
                            industry === 'engineering_cad'
                              ? 'Weight reduced 28%, Factor of Safety 2.4'
                              : 'p99 latency < 45ms, 45M queries/day'
                          }
                          className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                        Live Demo / 3D Viewer URL
                      </label>
                      <input
                        type="url"
                        value={proj.liveUrl || ''}
                        onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                        {industry === 'engineering_cad'
                          ? 'Repository / CAD Assembly Link'
                          : 'Source Code / GitHub Repository'}
                      </label>
                      <input
                        type="url"
                        value={proj.githubUrl || ''}
                        onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                      />
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
