import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useResumeStore } from '../../../store/useResumeStore'
import { DraggableSectionCard } from './DraggableSectionCard'
import type { ResumeSection, SectionColumn } from '../../../types/resume'
import {
  ChevronsUpDown,
  Plus,
  Eye,
  SlidersHorizontal,
  Info,
  Columns2,
  LayoutGrid,
  Rows3,
} from 'lucide-react'

interface DroppableZoneProps {
  id: string
  title: string
  subtitle: string
  badge: string
  icon: React.ReactNode
  sections: ResumeSection[]
  expandAll: boolean
  targetColumn: SectionColumn
  allowedTargets: { col: SectionColumn; label: string }[]
  onMoveToColumn: (sectionId: string, toColumn: SectionColumn) => void
}

const DroppableZone: React.FC<DroppableZoneProps> = ({
  id,
  title,
  subtitle,
  badge,
  icon,
  sections,
  expandAll,
  targetColumn,
  allowedTargets,
  onMoveToColumn,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border p-3 transition-colors duration-200 ${
        isOver
          ? 'border-[#3b82f6] bg-[#3b82f6]/10 ring-1 ring-[#3b82f6]/40'
          : 'border-slate-200 dark:border-[#374151]/70 bg-slate-50/50 dark:bg-[#0c111d]/50'
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-[#374151]/50">
        <div className="flex items-center space-x-2">
          <span className="text-[#3b82f6]">{icon}</span>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
                {title}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-[#1e293b] text-slate-600 dark:text-[#9ca3af] border border-slate-300/60 dark:border-[#374151]">
                {sections.length}
              </span>
            </div>
            <p className="text-[10px] font-body text-slate-500 dark:text-[#9ca3af]/80">
              {subtitle}
            </p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-[#60a5fa] uppercase tracking-wider">
          {badge}
        </span>
      </div>

      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5 min-h-[50px]">
          {sections.map((section, idx) => (
            <DraggableSectionCard
              key={`${section.id}-${expandAll}`}
              section={section}
              isInitiallyExpanded={expandAll || idx === 0}
              currentColumn={targetColumn}
              allowedTargets={allowedTargets}
              onMoveToColumn={(toCol) => onMoveToColumn(section.id, toCol)}
            />
          ))}

          {sections.length === 0 && (
            <div className="py-7 text-center rounded border border-dashed border-slate-300 dark:border-[#374151]/50 text-slate-400 dark:text-[#9ca3af]/60 text-[11px] font-mono">
              Drop sections here to assign to {title}
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export const DraggableSectionList: React.FC = () => {
  const {
    sections,
    layoutStructure,
    reorderSectionById,
    reorderSectionInColumn,
    setSectionColumn,
    toggleSection,
  } = useResumeStore()
  const [expandAll, setExpandAll] = useState<boolean>(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const enabledSections = sections.filter((s) => s.isEnabled)
  const disabledSections = sections.filter((s) => !s.isEnabled)

  // Resolve column for each section with safe fallback
  const getSectionColumn = (s: ResumeSection): SectionColumn => {
    if (s.column) return s.column
    // Safe default: skills, education, certifications go to sidebar; others to main
    return ['skills', 'education', 'certifications', 'profile'].includes(s.id)
      ? 'sidebar'
      : 'main'
  }

  const sidebarSections = enabledSections.filter((s) => getSectionColumn(s) === 'sidebar')
  const mainSections = enabledSections.filter((s) => getSectionColumn(s) === 'main')
  const fullSections = enabledSections.filter((s) => getSectionColumn(s) === 'full')

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    if (layoutStructure === 'single') {
      if (activeId !== overId) {
        reorderSectionById(activeId, overId)
      }
      return
    }

    // Determine target column container
    let targetColumn: SectionColumn = 'main'

    if (overId === 'container-sidebar') {
      targetColumn = 'sidebar'
    } else if (overId === 'container-main') {
      targetColumn = 'main'
    } else if (overId === 'container-full') {
      targetColumn = 'full'
    } else {
      // overId is another section's id: determine that section's column
      const overSection = sections.find((s) => s.id === overId)
      if (overSection) {
        targetColumn = getSectionColumn(overSection)
      }
    }

    reorderSectionInColumn(activeId, overId, targetColumn)
  }

  const handleMoveToColumn = (sectionId: string, toColumn: SectionColumn) => {
    setSectionColumn(sectionId, toColumn)
  }

  return (
    <div className="space-y-3.5">
      {/* Top list control bar: Minimal, technical header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#3b82f6]" />
          <span className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
            Multi-Area Section Placement
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-[#1e293b] text-slate-700 dark:text-[#9ca3af] border border-slate-300/60 dark:border-[#374151]">
            {enabledSections.length} active
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="inline-flex items-center space-x-1.5 text-xs font-body font-medium text-slate-500 dark:text-[#9ca3af] hover:text-[#3b82f6] dark:hover:text-[#3b82f6] transition-colors cursor-pointer"
        >
          <ChevronsUpDown className="w-3.5 h-3.5" />
          <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
        </button>
      </div>

      {/* DND-Kit Multi-Container Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* Modern 2-Column Droppable Structure */}
        {layoutStructure === 'two-column' && (
          <div className="space-y-3">
            <DroppableZone
              id="container-sidebar"
              title="Left Sidebar Column"
              subtitle="Skills, Education, Certifications & Contact"
              badge="Sidebar Area"
              icon={<Columns2 className="w-3.5 h-3.5" />}
              sections={sidebarSections}
              expandAll={expandAll}
              targetColumn="sidebar"
              allowedTargets={[{ col: 'main', label: '⇄ Main Body' }]}
              onMoveToColumn={handleMoveToColumn}
            />

            <DroppableZone
              id="container-main"
              title="Right Main Body Column"
              subtitle="Work Experience, Featured Projects & Focus Areas"
              badge="Main Area"
              icon={<Rows3 className="w-3.5 h-3.5" />}
              sections={mainSections}
              expandAll={expandAll}
              targetColumn="main"
              allowedTargets={[{ col: 'sidebar', label: '⇄ Sidebar' }]}
              onMoveToColumn={handleMoveToColumn}
            />
          </div>
        )}

        {/* Modular Grid Droppable Structure */}
        {layoutStructure === 'grid' && (
          <div className="space-y-3">
            <DroppableZone
              id="container-main"
              title="Primary Grid Area (Span 7)"
              subtitle="Main work history & key deliverables"
              badge="Grid Col 1"
              icon={<LayoutGrid className="w-3.5 h-3.5" />}
              sections={mainSections}
              expandAll={expandAll}
              targetColumn="main"
              allowedTargets={[
                { col: 'sidebar', label: '⇄ Side' },
                { col: 'full', label: '⇄ Full' },
              ]}
              onMoveToColumn={handleMoveToColumn}
            />

            <DroppableZone
              id="container-sidebar"
              title="Secondary Grid Area (Span 5)"
              subtitle="Skills, credentials & education panels"
              badge="Grid Col 2"
              icon={<Columns2 className="w-3.5 h-3.5" />}
              sections={sidebarSections}
              expandAll={expandAll}
              targetColumn="sidebar"
              allowedTargets={[
                { col: 'main', label: '⇄ Main' },
                { col: 'full', label: '⇄ Full' },
              ]}
              onMoveToColumn={handleMoveToColumn}
            />

            <DroppableZone
              id="container-full"
              title="Full-Width Modular Area (Span 12)"
              subtitle="Spanning bottom banner or full-width highlights"
              badge="Span 12"
              icon={<Rows3 className="w-3.5 h-3.5" />}
              sections={fullSections}
              expandAll={expandAll}
              targetColumn="full"
              allowedTargets={[
                { col: 'main', label: '⇄ Main' },
                { col: 'sidebar', label: '⇄ Side' },
              ]}
              onMoveToColumn={handleMoveToColumn}
            />
          </div>
        )}

        {/* Classic Single Column Droppable Structure */}
        {layoutStructure === 'single' && (
          <SortableContext
            items={enabledSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2.5">
              {enabledSections.map((section, idx) => (
                <DraggableSectionCard
                  key={`${section.id}-${expandAll}`}
                  section={section}
                  isInitiallyExpanded={expandAll || idx === 0}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </DndContext>

      {/* When no sections are enabled */}
      {enabledSections.length === 0 && (
        <div className="p-6 text-center rounded-lg border border-dashed border-slate-300 dark:border-[#374151] bg-slate-50/50 dark:bg-[#1e293b]/40 space-y-1.5">
          <Info className="w-5 h-5 text-[#9ca3af] mx-auto" />
          <p className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
            All sections hidden
          </p>
          <p className="text-[11px] font-body text-slate-500 dark:text-[#9ca3af]">
            Click any section below to restore it to your layout.
          </p>
        </div>
      )}

      {/* Quick Re-enable Disabled Sections Bar */}
      {disabledSections.length > 0 && (
        <div className="p-3 rounded-lg border border-dashed border-slate-200 dark:border-[#374151]/70 bg-slate-50/40 dark:bg-[#0a0e1a]/40 space-y-2">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#9ca3af]">
            <Eye className="w-3 h-3 text-[#3b82f6]" />
            <span>Hidden Sections (click to restore)</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {disabledSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => toggleSection(sec.id)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-[#374151] text-slate-700 dark:text-[#e5e7eb] hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[#9ca3af]" />
                <span>{sec.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
