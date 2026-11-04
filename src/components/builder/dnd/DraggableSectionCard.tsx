import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Award,
  Sparkles,
  Trash2,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  FileText,
  List,
  LayoutGrid,
  Globe,
} from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import { ProfileEditor } from '../editors/ProfileEditor'
import { ExperienceEditor } from '../editors/ExperienceEditor'
import { ProjectsEditor } from '../editors/ProjectsEditor'
import { SkillsEditor } from '../editors/SkillsEditor'
import { EducationEditor } from '../editors/EducationEditor'
import { CertificationsEditor } from '../editors/CertificationsEditor'
import { CustomSectionEditor } from '../editors/CustomSectionEditor'
import type { ResumeSection, SectionColumn } from '../../../types/resume'

interface DraggableSectionCardProps {
  section: ResumeSection
  isInitiallyExpanded?: boolean
  currentColumn?: SectionColumn
  allowedTargets?: { col: SectionColumn; label: string }[]
  onMoveToColumn?: (toColumn: SectionColumn) => void
}

export const DraggableSectionCard: React.FC<DraggableSectionCardProps> = ({
  section,
  isInitiallyExpanded = false,
  allowedTargets,
  onMoveToColumn,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded)
  const { toggleSection, removeSection } = useResumeStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  }

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'User':
        return <User className="w-3.5 h-3.5 text-[#FF6F3C]" />
      case 'Briefcase':
        return <Briefcase className="w-3.5 h-3.5 text-[#FF6F3C]" />
      case 'FolderGit2':
        return <FolderGit2 className="w-3.5 h-3.5 text-[#5D8A8A]" />
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-[#F2B705]" />
      case 'GraduationCap':
        return <GraduationCap className="w-3.5 h-3.5 text-[#B39ACD]" />
      case 'Award':
        return <Award className="w-3.5 h-3.5 text-[#FF6F3C]" />
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5 text-[#5D8A8A]" />
      case 'HeartHandshake':
        return <HeartHandshake className="w-3.5 h-3.5 text-[#FF6F3C]" />
      case 'Lightbulb':
        return <Lightbulb className="w-3.5 h-3.5 text-[#F2B705]" />
      case 'FileText':
        return <FileText className="w-3.5 h-3.5 text-[#B39ACD]" />
      case 'List':
        return <List className="w-3.5 h-3.5 text-[#5D8A8A]" />
      case 'LayoutGrid':
        return <LayoutGrid className="w-3.5 h-3.5 text-[#FF6F3C]" />
      case 'Globe':
        return <Globe className="w-3.5 h-3.5 text-[#5D8A8A]" />
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#F2B705]" />
    }
  }

  const renderEditor = () => {
    switch (section.id) {
      case 'profile':
        return <ProfileEditor />
      case 'experience':
        return <ExperienceEditor />
      case 'projects':
        return <ProjectsEditor />
      case 'skills':
        return <SkillsEditor />
      case 'education':
        return <EducationEditor />
      case 'certifications':
        return <CertificationsEditor />
      default:
        return <CustomSectionEditor section={section} />
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border transition-all duration-300 ease-fluid select-none ${
        isDragging
          ? 'border-[#FF6F3C] shadow-2xl bg-[#22252D]/95 backdrop-blur-xl shadow-[#FF6F3C]/20 scale-[1.01]'
          : 'border-[#B2A487]/80 dark:border-[#282A33]/80 bg-[#E4DAC7]/90 dark:bg-[#181A1F]/85 backdrop-blur-xl hover:border-[#FF6F3C]/50 shadow-sm'
      }`}
    >
      {/* Header bar: Retro-futuristic precision styling */}
      <div className="px-3.5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Tactile Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="p-1 -ml-1 rounded text-slate-400 dark:text-[#A8A49A]/60 hover:text-[#FF6F3C] dark:hover:text-[#FF6F3C] cursor-grab active:cursor-grabbing transition-colors duration-150 flex items-center"
            title="Drag vertically or across columns/grid areas"
            aria-label="Drag handle"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Inline icon identifier */}
          <span className="p-1.5 rounded-lg bg-[#D8CEBA] dark:bg-[#121316] border border-[#B2A487] dark:border-[#282A33] flex items-center justify-center flex-shrink-0">
            {getSectionIcon(section.iconName)}
          </span>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-display font-bold tracking-tight text-[#0A0B0E] dark:text-[#F7F4EB] truncate">
                {section.name}
              </h3>
              {section.isCustom ? (
                <div className="flex items-center space-x-1">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/30 font-bold">
                    Custom
                  </span>
                  {section.formatType && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#5D8A8A]/20 text-[#5D8A8A] border border-[#5D8A8A]/30">
                      {section.formatType}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[9px] font-mono text-[#A8A49A]/70">
                  #{section.id}
                </span>
              )}
            </div>
            <p className="text-[11px] font-body text-[#2C2D33] dark:text-[#A8A49A] truncate font-medium">
              {section.description}
            </p>
          </div>
        </div>

        {/* Action controls: Move column, Toggle, Remove, Expand */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Quick transfer button between columns / grid zones */}
          {allowedTargets && allowedTargets.length > 0 && (
            <div className="flex items-center space-x-1">
              {allowedTargets.map((target) => (
                <button
                  key={target.col}
                  type="button"
                  onClick={() => onMoveToColumn?.(target.col)}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E6DFD1] dark:bg-[#121316]/80 hover:bg-[#FF6F3C]/20 text-slate-700 dark:text-[#A8A49A] hover:text-[#FF6F3C] border border-[#CCC3B0] dark:border-[#282A33] transition-colors cursor-pointer"
                  title={`Move section to ${target.label}`}
                >
                  {target.label}
                </button>
              ))}
            </div>
          )}

          {/* Quick isEnabled Switch */}
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className={`relative inline-flex h-4 w-7.5 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-out focus:outline-none ${
              section.isEnabled ? 'bg-[#FF6F3C]' : 'bg-[#CCC3B0] dark:bg-[#282A33]'
            }`}
            title={section.isEnabled ? 'Section enabled (Click to hide)' : 'Section hidden (Click to enable)'}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-out ${
                section.isEnabled ? 'translate-x-3.5' : 'translate-x-0.5'
              }`}
            />
          </button>

          {section.isCustom && (
            <button
              onClick={() => removeSection(section.id)}
              className="p-1 rounded text-slate-400 dark:text-[#A8A49A] hover:text-[#ef4444] transition-colors cursor-pointer"
              title="Delete section"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Expand / Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 dark:text-[#A8A49A] hover:text-slate-800 dark:hover:text-[#F7F4EB] transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse fields' : 'Expand fields'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Body: Flattened direct flow without nested sub-cards */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2.5 border-t border-[#CCC3B0]/70 dark:border-[#282A33]/70 bg-[#E6DFD1]/40 dark:bg-[#121316]/40">
          {renderEditor()}
        </div>
      )}
    </div>
  )
}
