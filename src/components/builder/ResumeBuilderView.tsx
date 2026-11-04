import React, { useState } from 'react'
import { LayoutSwitcher } from './LayoutSwitcher'
import { IndustrySelector } from './IndustrySelector'
import { DraggableSectionList } from './dnd/DraggableSectionList'
import { A4ResumePreview } from './preview/A4ResumePreview'
import { Layers, Plus } from 'lucide-react'
import { CreateCustomSectionModal } from './modals/CreateCustomSectionModal'

export const ResumeBuilderView: React.FC = () => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Layout Structure Switcher: Modern 2-Column, Grid, Single */}
      <LayoutSwitcher />

      {/* Industry Preset Selector */}
      <IndustrySelector />

      {/* Asymmetric Two-Column Drag & Drop Layout (5 cols : 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Draggable Sections Multi-Area List via @dnd-kit/core */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1 gap-2">
            <div>
              <h2 className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 dark:text-[#F2EBD7] flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#FF6F3C]" />
                <span>Draggable Resume Sections</span>
              </h2>
              <p className="text-[11px] font-body text-slate-500 dark:text-[#A3B4C8]">
                Drag cards by handle between columns and grid areas to customize your layout.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[#FF6F3C] bg-[#FF6F3C]/15 hover:bg-[#FF6F3C]/25 border border-[#FF6F3C]/40 hover:border-[#FF6F3C]/60 transition-all duration-200 cursor-pointer shadow-xs whitespace-nowrap flex-shrink-0 group"
              title="Add Custom Section"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#FF6F3C]" />
              <span>+ Custom Component</span>
            </button>
          </div>

          <DraggableSectionList />
        </div>

        {/* Right Column: Live, Real-Time A4 Document Preview with offset diagonal balance */}
        <div className="lg:col-span-7 sticky top-20">
          <A4ResumePreview />
        </div>
      </div>

      {/* Create Custom Section Modal */}
      <CreateCustomSectionModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </div>
  )
}
