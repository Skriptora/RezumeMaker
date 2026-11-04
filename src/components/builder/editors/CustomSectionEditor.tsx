import React from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import type { ResumeSection } from '../../../types/resume'
import { Plus, Trash2, List, LayoutGrid, FileText } from 'lucide-react'

interface CustomSectionEditorProps {
  section: ResumeSection
}

export const CustomSectionEditor: React.FC<CustomSectionEditorProps> = ({ section }) => {
  const {
    resumeData,
    updateCustomSectionContent,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
  } = useResumeStore()

  const customData = resumeData.customSections?.[section.id]
  const formatType = section.formatType || customData?.formatType || 'list'

  const handleAddNewItem = () => {
    if (formatType === 'grid') {
      addCustomSectionItem(section.id, {
        title: 'New Specialty / Initiative',
        badge: 'Featured',
        description: 'Highlight key metrics and measurable technical deliverables.',
      })
    } else {
      addCustomSectionItem(section.id, {
        title: 'New Publication / Entry',
        subtitle: 'Host Organization / Journal',
        date: '2024',
        description: 'Comprehensive overview of work delivered and peer recognition.',
      })
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Format Header Indicator */}
      <div className="flex items-center justify-between pb-1 border-b border-[#374151]/50 text-xs">
        <div className="flex items-center space-x-1.5">
          {formatType === 'list' && <List className="w-3.5 h-3.5 text-[#3b82f6]" />}
          {formatType === 'grid' && <LayoutGrid className="w-3.5 h-3.5 text-[#10b981]" />}
          {formatType === 'text' && <FileText className="w-3.5 h-3.5 text-[#7c3aed]" />}
          <span className="font-mono text-[10px] uppercase text-[#60a5fa]">
            {formatType.toUpperCase()} FORMAT
          </span>
        </div>

        {formatType !== 'text' && (
          <button
            type="button"
            onClick={handleAddNewItem}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-body font-medium bg-[#3b82f6]/15 hover:bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-3 h-3" />
            <span>{formatType === 'grid' ? 'Add Tile' : 'Add Item'}</span>
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* FORMAT 1: TEXT BLOCK                                          */}
      {/* ============================================================== */}
      {formatType === 'text' && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] block">
            Section Narrative Content
          </label>
          <textarea
            rows={4}
            value={customData?.content || ''}
            onChange={(e) => updateCustomSectionContent(section.id, e.target.value)}
            placeholder="Type comprehensive overview, philosophy, or narrative summary..."
            className="w-full text-xs p-2.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body leading-relaxed"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* FORMAT 2: STRUCTURED LIST                                     */}
      {/* ============================================================== */}
      {formatType === 'list' && (
        <div className="divide-y divide-[#374151]/50">
          {(customData?.items || []).map((item) => (
            <div key={item.id} className="py-2.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-semibold text-[#e5e7eb]">
                  {item.title || 'Untitled Entry'}
                </span>
                <button
                  type="button"
                  onClick={() => deleteCustomSectionItem(section.id, item.id)}
                  className="p-1 rounded text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] transition-colors cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                    Title / Publication
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, { title: e.target.value })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={item.date || ''}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, { date: e.target.value })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                  Organization / Subtitle
                </label>
                <input
                  type="text"
                  value={item.subtitle || ''}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, { subtitle: e.target.value })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-body"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                  Description / Contributions
                </label>
                <textarea
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, { description: e.target.value })
                  }
                  className="w-full text-xs p-2 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-body"
                />
              </div>
            </div>
          ))}

          {(customData?.items || []).length === 0 && (
            <div className="py-4 text-center text-xs text-[#9ca3af] font-mono">
              No entries added yet. Click "+ Add Item" above.
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* FORMAT 3: MODULAR GRID                                        */}
      {/* ============================================================== */}
      {formatType === 'grid' && (
        <div className="space-y-3">
          {(customData?.items || []).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-md border border-[#374151]/80 bg-[#0a0e1a]/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-display font-semibold text-[#e5e7eb]">
                    {item.title || 'Untitled Tile'}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => deleteCustomSectionItem(section.id, item.id)}
                  className="p-1 rounded text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] transition-colors cursor-pointer"
                  title="Delete tile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                    Tile Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, { title: e.target.value })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded bg-[#1e293b] border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={item.badge || ''}
                    placeholder="e.g. Active, Keynote, Grant"
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, { badge: e.target.value })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded bg-[#1e293b] border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-0.5 block">
                  Tile Description / Metrics
                </label>
                <textarea
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, { description: e.target.value })
                  }
                  className="w-full text-xs p-2 rounded bg-[#1e293b] border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors font-body"
                />
              </div>
            </div>
          ))}

          {(customData?.items || []).length === 0 && (
            <div className="py-4 text-center text-xs text-[#9ca3af] font-mono">
              No grid tiles added yet. Click "+ Add Tile" above.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
