import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useResumeStore } from '../../../store/useResumeStore'
import type { ResumeSection, SectionColumn } from '../../../types/resume'
import { getElementInlineStyle } from '../../../utils/selectable'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  FileDown,
  Award,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Columns2,
  LayoutGrid,
  Rows3,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  FileText,
  List,
  Orbit,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../common/Icons'

const getCustomIcon = (iconName?: string) => {
  switch (iconName) {
    case 'BookOpen':
      return BookOpen
    case 'HeartHandshake':
      return HeartHandshake
    case 'Award':
      return Award
    case 'Lightbulb':
      return Lightbulb
    case 'Globe':
      return Globe
    case 'FileText':
      return FileText
    case 'List':
      return List
    case 'LayoutGrid':
      return LayoutGrid
    case 'Briefcase':
      return Briefcase
    case 'GraduationCap':
      return GraduationCap
    case 'FolderGit2':
      return FolderGit2
    case 'Cpu':
      return Cpu
    case 'Sparkles':
    default:
      return Sparkles
  }
}

export const A4ResumePreview: React.FC = () => {
  const {
    resumeData,
    sections,
    theme,
    layoutStructure,
    setLayoutStructure,
    selectedElementId,
    setSelectedElementId,
    elementStyles,
  } = useResumeStore()

  const getElementStyle = (id: string, baseStyle?: React.CSSProperties): React.CSSProperties => {
    return getElementInlineStyle(id, elementStyles, baseStyle)
  }

  const { profile, experience, projects, skills, education, certifications } = resumeData
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const industry = profile.industry || 'software'

  const printableRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printableRef,
    documentTitle: `${profile.fullName.replace(/\s+/g, '_')}_Resume`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0mm !important;
      }
      @media print {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        #resume-a4-page {
          box-shadow: none !important;
          border: none !important;
          transform: none !important;
          width: 210mm !important;
          min-height: 297mm !important;
          margin: 0 auto !important;
          padding: 0 !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
        }
      }
    `,
  })

  // Selectable element helper
  const getSelectableClass = (id: string, baseClass = '') => {
    const isSelected = selectedElementId === id
    return `${baseClass} cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-white dark:ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.4)] rounded relative z-10 print:ring-0 print:shadow-none'
        : 'hover:ring-1 hover:ring-[#FF6F3C]/40 hover:ring-offset-1 rounded'
    }`
  }

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  const getSectionColumn = (s: ResumeSection): SectionColumn => {
    if (s.column) return s.column
    return ['skills', 'education', 'certifications', 'profile'].includes(s.id)
      ? 'sidebar'
      : 'main'
  }

  const enabledSections = sections.filter((s) => s.isEnabled)
  const sidebarSections = enabledSections.filter((s) => s.id !== 'profile' && getSectionColumn(s) === 'sidebar')
  const mainSections = enabledSections.filter((s) => s.id !== 'profile' && getSectionColumn(s) === 'main')
  const fullSections = enabledSections.filter((s) => s.id !== 'profile' && getSectionColumn(s) === 'full')

  const fontClass =
    theme.fontFamily === 'serif'
      ? 'font-serif'
      : theme.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans'

  const spacingClass =
    theme.spacing === 'compact'
      ? 'space-y-3'
      : theme.spacing === 'spacious'
      ? 'space-y-5'
      : 'space-y-4'

  // Dynamic Section Content Generator
  const renderSectionContent = (sectionId: string, isSidebar: boolean = false) => {
    switch (sectionId) {
      case 'profile':
        return null // Handled in dedicated layout headers

      case 'experience':
        return (
          <div
            key="sec-experience"
            id="resume-sec-experience"
            onClick={handleSelect('resume-sec-experience')}
            className={getSelectableClass('resume-sec-experience', 'space-y-2.5 p-1 rounded')}
          >
            <div
              id="resume-head-experience"
              onClick={handleSelect('resume-head-experience')}
              className={getSelectableClass('resume-head-experience', 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <Briefcase
                className="w-3.5 h-3.5"
                style={{ color: theme.accentColor }}
              />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                Work Experience
              </h3>
            </div>

            <div className="space-y-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  id={`resume-exp-${exp.id}`}
                  onClick={handleSelect(`resume-exp-${exp.id}`)}
                  className={getSelectableClass(`resume-exp-${exp.id}`, 'text-left p-1 rounded')}
                >
                  <div
                    id={`resume-exp-${exp.id}-header`}
                    onClick={handleSelect(`resume-exp-${exp.id}-header`)}
                    className={getSelectableClass(`resume-exp-${exp.id}-header`, 'flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-[11px]')}
                  >
                    <div>
                      <span
                        id={`resume-exp-${exp.id}-role`}
                        onClick={handleSelect(`resume-exp-${exp.id}-role`)}
                        className={getSelectableClass(`resume-exp-${exp.id}-role`, 'font-bold text-slate-900 inline-block')}
                      >
                        {exp.role}
                      </span>
                      <span className="text-slate-600 font-medium"> • {exp.company}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>

                  {exp.description && (
                    <p
                      id={`resume-exp-${exp.id}-desc`}
                      onClick={handleSelect(`resume-exp-${exp.id}-desc`)}
                      className={getSelectableClass(`resume-exp-${exp.id}-desc`, 'text-[10px] text-slate-700 mt-0.5 leading-relaxed p-0.5 rounded')}
                    >
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      id={`resume-exp-${exp.id}-highlights`}
                      onClick={handleSelect(`resume-exp-${exp.id}-highlights`)}
                      className={getSelectableClass(`resume-exp-${exp.id}-highlights`, 'list-disc list-outside ml-4 mt-1 space-y-0.5 text-[10px] text-slate-700 leading-relaxed p-0.5 rounded')}
                    >
                      {exp.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div
            key="sec-projects"
            id="resume-sec-projects"
            onClick={handleSelect('resume-sec-projects')}
            className={getSelectableClass('resume-sec-projects', 'space-y-2.5 p-1 rounded')}
          >
            <div
              id="resume-head-projects"
              onClick={handleSelect('resume-head-projects')}
              className={getSelectableClass('resume-head-projects', 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <FolderGit2
                className="w-3.5 h-3.5"
                style={{ color: theme.accentColor }}
              />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                Featured Projects
              </h3>
            </div>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  id={`resume-proj-${proj.id}`}
                  onClick={handleSelect(`resume-proj-${proj.id}`)}
                  className={getSelectableClass(`resume-proj-${proj.id}`, 'text-left p-1 rounded')}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        id={`resume-proj-${proj.id}-name`}
                        onClick={handleSelect(`resume-proj-${proj.id}-name`)}
                        className={getSelectableClass(`resume-proj-${proj.id}-name`, 'font-bold text-slate-900 inline-block')}
                      >
                        {proj.name}
                      </span>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-[10px] hover:underline"
                          style={{ color: theme.accentColor }}
                        >
                          <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                        </a>
                      )}
                    </div>
                    {proj.githubUrl && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {proj.githubUrl.replace('https://github.com/', '')}
                      </span>
                    )}
                  </div>

                  <p
                    id={`resume-proj-${proj.id}-desc`}
                    onClick={handleSelect(`resume-proj-${proj.id}-desc`)}
                    className={getSelectableClass(`resume-proj-${proj.id}-desc`, 'text-[10px] text-slate-700 mt-0.5 leading-relaxed p-0.5 rounded')}
                  >
                    {proj.description}
                  </p>

                  <div
                    id={`resume-proj-${proj.id}-tech`}
                    onClick={handleSelect(`resume-proj-${proj.id}-tech`)}
                    className={getSelectableClass(`resume-proj-${proj.id}-tech`, 'flex flex-wrap items-center gap-1 mt-1.5 p-0.5 rounded')}
                  >
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-700 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.metricsImpact && (
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {proj.metricsImpact}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'skills':
        return (
          <div
            key="sec-skills"
            id="resume-sec-skills"
            onClick={handleSelect('resume-sec-skills')}
            className={getSelectableClass('resume-sec-skills', 'space-y-2 p-1 rounded')}
          >
            <div
              id="resume-head-skills"
              onClick={handleSelect('resume-head-skills')}
              className={getSelectableClass('resume-head-skills', 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <Cpu className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                Skills & Technologies
              </h3>
            </div>

            <div className="space-y-2 text-[10px]">
              {skills.map((cat) => (
                <div
                  key={cat.id}
                  id={`resume-skill-${cat.id}`}
                  onClick={handleSelect(`resume-skill-${cat.id}`)}
                  className={getSelectableClass(
                    `resume-skill-${cat.id}`,
                    isSidebar ? 'space-y-1 p-1 rounded' : 'flex flex-col sm:flex-row sm:items-baseline p-1 rounded'
                  )}
                >
                  <span
                    id={`resume-skill-${cat.id}-title`}
                    onClick={handleSelect(`resume-skill-${cat.id}-title`)}
                    className={getSelectableClass(
                      `resume-skill-${cat.id}-title`,
                      `${isSidebar ? 'block' : 'w-36 flex-shrink-0'} font-semibold text-slate-800`
                    )}
                  >
                    {cat.categoryName}:
                  </span>
                  <div
                    id={`resume-skill-${cat.id}-tags`}
                    onClick={handleSelect(`resume-skill-${cat.id}-tags`)}
                    className={getSelectableClass(`resume-skill-${cat.id}-tags`, 'flex flex-wrap gap-1 p-0.5 rounded')}
                  >
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-700 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'education':
        return (
          <div
            key="sec-education"
            id="resume-sec-education"
            onClick={handleSelect('resume-sec-education')}
            className={getSelectableClass('resume-sec-education', 'space-y-2 p-1 rounded')}
          >
            <div
              id="resume-head-education"
              onClick={handleSelect('resume-head-education')}
              className={getSelectableClass('resume-head-education', 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <GraduationCap
                className="w-3.5 h-3.5"
                style={{ color: theme.accentColor }}
              />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                Education
              </h3>
            </div>

            <div className="space-y-2">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  id={`resume-edu-${edu.id}`}
                  onClick={handleSelect(`resume-edu-${edu.id}`)}
                  className={getSelectableClass(`resume-edu-${edu.id}`, 'text-left text-[11px] p-1 rounded')}
                >
                  <div className="flex justify-between items-baseline">
                    <span
                      id={`resume-edu-${edu.id}-inst`}
                      onClick={handleSelect(`resume-edu-${edu.id}-inst`)}
                      className={getSelectableClass(`resume-edu-${edu.id}-inst`, 'font-bold text-slate-900 inline-block')}
                    >
                      {edu.institution}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div
                    id={`resume-edu-${edu.id}-degree`}
                    onClick={handleSelect(`resume-edu-${edu.id}-degree`)}
                    className={getSelectableClass(`resume-edu-${edu.id}-degree`, 'text-[10px] text-slate-600 font-medium')}
                  >
                    {edu.degree} in {edu.fieldOfStudy}
                    {edu.gpa && <span className="ml-2 font-mono text-slate-500">• GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'certifications':
        return (
          <div
            key="sec-certifications"
            id="resume-sec-certifications"
            onClick={handleSelect('resume-sec-certifications')}
            className={getSelectableClass('resume-sec-certifications', 'space-y-2 p-1 rounded')}
          >
            <div
              id="resume-head-certifications"
              onClick={handleSelect('resume-head-certifications')}
              className={getSelectableClass('resume-head-certifications', 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <Award className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                Certifications
              </h3>
            </div>

            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  id={`resume-cert-${cert.id}`}
                  onClick={handleSelect(`resume-cert-${cert.id}`)}
                  className={getSelectableClass(`resume-cert-${cert.id}`, 'flex justify-between items-baseline text-left p-1 rounded')}
                >
                  <div>
                    <span
                      id={`resume-cert-${cert.id}-title`}
                      onClick={handleSelect(`resume-cert-${cert.id}-title`)}
                      className={getSelectableClass(`resume-cert-${cert.id}-title`, 'font-semibold text-slate-900 text-[10px] inline-block')}
                    >
                      {cert.title}
                    </span>
                    <span className="text-[10px] text-slate-600"> • {cert.issuer}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        )

      default: {
        const sec = sections.find((s) => s.id === sectionId)
        if (!sec) return null

        const customData = resumeData.customSections?.[sectionId]
        const formatType = sec.formatType || customData?.formatType || 'text'
        const sectionTitle = sec.name || 'Custom Section'
        const SectionIcon = getCustomIcon(sec.iconName)

        return (
          <div
            key={`sec-${sectionId}`}
            id={`resume-sec-${sectionId}`}
            onClick={handleSelect(`resume-sec-${sectionId}`)}
            className={getSelectableClass(`resume-sec-${sectionId}`, 'space-y-2 text-left p-1 rounded')}
          >
            {/* Custom Section Header */}
            <div
              id={`resume-head-${sectionId}`}
              onClick={handleSelect(`resume-head-${sectionId}`)}
              className={getSelectableClass(`resume-head-${sectionId}`, 'flex items-center space-x-1.5 pb-1 border-b')}
              style={{ borderColor: theme.accentColor + '40' }}
            >
              <SectionIcon
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: theme.accentColor }}
              />
              <h3
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme.accentColor }}
              >
                {sectionTitle}
              </h3>
            </div>

            {/* Format 1: Text Block */}
            {formatType === 'text' && (
              <div
                id={`resume-custom-${sectionId}-content`}
                onClick={handleSelect(`resume-custom-${sectionId}-content`)}
                className={getSelectableClass(`resume-custom-${sectionId}-content`, 'text-[10px] text-slate-700 leading-relaxed whitespace-pre-line p-1 rounded')}
              >
                {customData?.content || sec.description || 'No content provided.'}
              </div>
            )}

            {/* Format 2: List */}
            {formatType === 'list' && (
              <div className="space-y-2">
                {customData?.items && customData.items.length > 0 ? (
                  customData.items.map((item) => (
                    <div
                      key={item.id}
                      id={`resume-custom-item-${item.id}`}
                      onClick={handleSelect(`resume-custom-item-${item.id}`)}
                      className={getSelectableClass(`resume-custom-item-${item.id}`, 'text-left text-[11px] p-1 rounded')}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <span className="font-bold text-slate-900">{item.title}</span>
                          {item.subtitle && (
                            <span className="text-slate-600 font-medium"> • {item.subtitle}</span>
                          )}
                          {item.badge && (
                            <span
                              className="text-[8.5px] font-mono px-1.5 py-0.2 rounded font-medium"
                              style={{
                                backgroundColor: theme.accentColor + '15',
                                color: theme.accentColor,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.date && (
                          <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-slate-700 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 italic">
                    {sec.description || 'No items added yet.'}
                  </p>
                )}
              </div>
            )}

            {/* Format 3: Grid */}
            {formatType === 'grid' && (
              <div>
                {customData?.items && customData.items.length > 0 ? (
                  <div className={isSidebar ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                    {customData.items.map((item) => (
                      <div
                        key={item.id}
                        id={`resume-custom-grid-${item.id}`}
                        onClick={handleSelect(`resume-custom-grid-${item.id}`)}
                        className={getSelectableClass(`resume-custom-grid-${item.id}`, 'p-2.5 rounded border border-slate-200/80 bg-slate-50/70 text-left')}
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <span className="font-bold text-slate-900 text-[10.5px] truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className="text-[8.5px] font-mono px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                              style={{
                                backgroundColor: theme.accentColor + '18',
                                color: theme.accentColor,
                                border: `1px solid ${theme.accentColor}30`,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {(item.subtitle || item.date) && (
                          <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mb-1">
                            {item.subtitle && <span className="truncate">{item.subtitle}</span>}
                            {item.date && <span>{item.date}</span>}
                          </div>
                        )}

                        {item.description && (
                          <p className="text-[9.5px] text-slate-600 leading-snug">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">
                    {sec.description || 'No items added yet.'}
                  </p>
                )}
              </div>
            )}
          </div>
        )
      }
    }
  }

  const isProfileEnabled = sections.find((s) => s.id === 'profile')?.isEnabled ?? true

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-2xl bg-[#EDE6D8]/85 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#CCC3B0]/80 dark:border-[#282A33]/80 text-xs gap-2 shadow-sm">
        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          <span className="font-display font-bold text-slate-800 dark:text-[#F7F4EB]">
            Real-Time A4 Document
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] text-[10px] font-mono border border-[#FF6F3C]/30 font-bold">
            {layoutStructure === 'retro-split'
              ? 'Space-Age Split'
              : layoutStructure === 'two-column'
              ? 'Modern 2-Column'
              : layoutStructure === 'grid'
              ? 'Grid Layout'
              : 'Single Column'}
          </span>

          {/* Active Selected Element Indicator */}
          {selectedElementId && (
            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6F3C]/20 border border-[#FF6F3C]/40 text-[#FF6F3C] text-[10px] font-mono font-semibold animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3C] animate-ping" />
              <span>Selected: <code className="font-bold underline">{selectedElementId}</code></span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedElementId(null)
                }}
                className="ml-1 text-slate-700 dark:text-slate-300 hover:text-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold cursor-pointer"
                title="Deselect element"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Layout Buttons */}
          <div className="flex items-center space-x-0.5 bg-[#E6DFD1] dark:bg-[#121316] rounded-lg p-0.5 border border-[#CCC3B0] dark:border-[#282A33]">
            <button
              onClick={() => setLayoutStructure('retro-split')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'retro-split'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A8A49A] hover:text-[#FF6F3C]'
              }`}
              title="Space-Age Retro Split"
            >
              <Orbit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutStructure('two-column')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'two-column'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A8A49A] hover:text-[#FF6F3C]'
              }`}
              title="Modern 2-Column Layout"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutStructure('grid')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'grid'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A8A49A] hover:text-[#FF6F3C]'
              }`}
              title="Modular Grid Layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutStructure('single')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'single'
                  ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A8A49A] hover:text-[#FF6F3C]'
              }`}
              title="Classic Single Column"
            >
              <Rows3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-[#D8CEBA] dark:bg-[#121316] rounded-lg p-0.5 border border-[#B2A487] dark:border-[#282A33]">
            <button
              onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
              className="p-1 rounded hover:bg-[#E4DAC7] dark:hover:bg-[#181A1F] text-[#2C2D33] dark:text-[#A8A49A]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono w-9 text-center text-[#0A0B0E] dark:text-[#F7F4EB] font-bold">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 rounded hover:bg-[#E4DAC7] dark:hover:bg-[#181A1F] text-[#2C2D33] dark:text-[#A8A49A]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => handlePrint()}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="Download clean high-resolution A4 PDF via react-to-print"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div
        onClick={() => setSelectedElementId(null)}
        className="flex-1 overflow-auto bg-[#C8BD9F]/60 dark:bg-[#0E0F12]/85 backdrop-blur-md p-4 sm:p-6 rounded-2xl flex justify-center items-start border border-[#B2A487]/80 dark:border-[#282A33]/80 shadow-inner"
      >
        <div
          ref={printableRef}
          id="resume-a4-page"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedElementId('resume-a4-page')
          }}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: elementStyles['resume-a4-page']?.backgroundColor || theme.backgroundColor || '#D8CEBA',
            color: elementStyles['resume-a4-page']?.color || theme.primaryTextColor || '#0A0B0E',
            ...getElementStyle('resume-a4-page'),
          }}
          className={`shadow-2xl shadow-slate-900/15 border border-[#B2A487] rounded-sm relative cursor-pointer transition-all ${
            selectedElementId === 'resume-a4-page'
              ? 'ring-4 ring-[#FF6F3C] ring-offset-4 ring-offset-[#121316]'
              : 'hover:ring-1 hover:ring-[#FF6F3C]/40'
          } ${fontClass} ${
            layoutStructure === 'retro-split'
              ? 'p-0 flex'
              : layoutStructure === 'two-column'
              ? 'p-0 flex'
              : 'p-8 sm:p-10'
          }`}
        >
          {/* Dynamic element custom styles applied to print & preview DOM nodes */}
          <style>{`
            #resume-a4-page {
              --primary-text: ${theme.primaryTextColor || '#0A0B0E'};
              --secondary-text: ${theme.secondaryTextColor || '#3A3935'};
              --tertiary-color: ${theme.tertiaryColor || theme.accentColor || '#FF6F3C'};
              --quaternary-color: ${theme.quaternaryColor || '#5D8A8A'};
              --bg-color: ${elementStyles['resume-a4-page']?.backgroundColor || theme.backgroundColor || '#D8CEBA'};
            }
            #resume-a4-page .text-slate-950,
            #resume-a4-page .text-slate-900,
            #resume-a4-page .text-slate-800 {
              color: var(--primary-text) !important;
            }
            #resume-a4-page .text-slate-700,
            #resume-a4-page .text-slate-600,
            #resume-a4-page .text-slate-500 {
              color: var(--secondary-text) !important;
            }
            ${Object.entries(elementStyles)
              .map(([id, s]) => {
                const rules: string[] = []
                if (s.fontFamily) rules.push(`font-family: "${s.fontFamily}", monospace !important;`)
                if (typeof s.fontSize === 'number' && s.fontSize > 0)
                  rules.push(`font-size: ${s.fontSize}px !important;`)
                if (typeof s.lineHeight === 'number' && s.lineHeight > 0)
                  rules.push(`line-height: ${s.lineHeight} !important;`)
                if (typeof s.padding === 'number') rules.push(`padding: ${s.padding}px !important;`)
                if (typeof s.margin === 'number') rules.push(`margin: ${s.margin}px !important;`)
                if (typeof s.letterSpacing === 'number')
                  rules.push(`letter-spacing: ${s.letterSpacing}px !important;`)
                if (s.backgroundColor) rules.push(`background-color: ${s.backgroundColor} !important;`)
                if (s.color) rules.push(`color: ${s.color} !important;`)
                if (typeof s.width === 'number' && s.width > 0) rules.push(`width: ${s.width}px !important;`)
                if (typeof s.height === 'number' && s.height > 0) rules.push(`height: ${s.height}px !important;`)
                if (typeof s.borderRadius === 'number') rules.push(`border-radius: ${s.borderRadius}px !important;`)
                if (typeof s.borderWidth === 'number') rules.push(`border-width: ${s.borderWidth}px !important; border-style: solid !important;`)
                if (s.borderColor) rules.push(`border-color: ${s.borderColor} !important;`)
                if (rules.length === 0) return ''
                return `#resume-a4-page [id="${id}"], [id="${id}"] { ${rules.join(' ')} }\n#resume-a4-page [id="${id}"] img, [id="${id}"] img { max-width: 100%; border-radius: inherit; }`
              })
              .join('\n')}
          `}</style>
          {/* ============================================================== */}
          {/* LAYOUT STRUCTURE 0: RETRO-FUTURISTIC SPACE-AGE SPLIT          */}
          {/* ============================================================== */}
          {layoutStructure === 'retro-split' && (
            <div
              className="w-full flex flex-col min-h-[297mm] p-0 font-sans"
              style={{
                backgroundColor: elementStyles['resume-a4-page']?.backgroundColor || theme.backgroundColor || '#D8CEBA',
                color: theme.primaryTextColor || '#0A0B0E',
              }}
            >
              {/* Space-Age Top Hero Banner */}
              <div
                id="resume-retro-hero"
                onClick={handleSelect('resume-retro-hero')}
                className={getSelectableClass('resume-retro-hero', 'bg-[#121316] text-[#F7F4EB] p-6 border-b-4 border-[#FF6F3C] relative overflow-hidden')}
              >
                <div className="absolute right-4 top-2 text-[#5D8A8A] text-4xl opacity-15 font-display font-black pointer-events-none select-none">
                  REZUME
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center space-x-4">
                    {/* Retro Profile Avatar with Burnt Orange Ring */}
                    {profile.avatarUrl ? (
                      <div
                        id="resume-profile-avatar"
                        onClick={handleSelect('resume-profile-avatar')}
                        className={getSelectableClass('resume-profile-avatar', 'relative flex-shrink-0')}
                      >
                        <img
                          src={profile.avatarUrl}
                          alt={profile.fullName}
                          style={getElementStyle('resume-profile-avatar')}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6F3C] shadow-lg transition-all"
                        />
                      </div>
                    ) : null}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono tracking-widest text-[#F2B705] uppercase">
                          SPACE-AGE CURRICULUM VITAE
                        </span>
                      </div>
                      <h1
                        id="resume-profile-name"
                        onClick={handleSelect('resume-profile-name')}
                        style={getElementStyle('resume-profile-name')}
                        className={getSelectableClass('resume-profile-name', 'text-2xl sm:text-3xl font-display font-black tracking-tight text-[#F7F4EB] uppercase leading-tight inline-block')}
                      >
                        {profile.fullName}
                      </h1>
                      <p
                        id="resume-profile-headline"
                        onClick={handleSelect('resume-profile-headline')}
                        style={getElementStyle('resume-profile-headline')}
                        className={getSelectableClass('resume-profile-headline', 'text-xs font-mono font-medium text-[#5D8A8A] mt-0.5 inline-block')}
                      >
                        {profile.headline}
                      </p>
                    </div>
                  </div>

                  {/* Contact Badges */}
                  <div
                    id="resume-profile-contact"
                    onClick={handleSelect('resume-profile-contact')}
                    style={getElementStyle('resume-profile-contact')}
                    className={getSelectableClass('resume-profile-contact', 'space-y-1 text-[10px] font-mono text-[#F7F4EB]/90 text-left sm:text-right p-1 rounded')}
                  >
                    {profile.email && <div>{profile.email}</div>}
                    {profile.phone && <div>{profile.phone}</div>}
                    {profile.location && <div className="text-[#F2B705]">{profile.location}</div>}
                    {profile.website && <div className="text-[#FF6F3C]">{profile.website.replace('https://', '')}</div>}
                  </div>
                </div>

                {profile.summary && (
                  <p
                    id="resume-profile-summary"
                    onClick={handleSelect('resume-profile-summary')}
                    style={getElementStyle('resume-profile-summary')}
                    className={getSelectableClass('resume-profile-summary', 'text-[10px] text-[#A8A49A] leading-relaxed mt-3 pt-3 border-t border-[#282A33] text-left p-1 rounded')}
                  >
                    {profile.summary}
                  </p>
                )}
              </div>

              {/* Asymmetric Split Body: 35% Left Sidebar : 65% Main Body */}
              <div className="flex-1 flex min-h-[200mm]">
                {/* Left Sidebar */}
                <div
                  id="resume-retro-sidebar"
                  onClick={handleSelect('resume-retro-sidebar')}
                  style={getElementStyle('resume-retro-sidebar')}
                  className={getSelectableClass('resume-retro-sidebar', 'w-[36%] bg-[#EDE6D8] border-r-2 border-[#121316]/20 p-5 space-y-4 text-left')}
                >
                  {sidebarSections.map((sec) => (
                    <div key={`retro-side-${sec.id}`} className="space-y-2">
                      <div className="flex items-center space-x-1.5 pb-1 border-b-2 border-[#FF6F3C]">
                        <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121316]">
                          {sec.name}
                        </h3>
                      </div>
                      {renderSectionContent(sec.id, true)}
                    </div>
                  ))}
                </div>

                {/* Right Main Body */}
                <div
                  id="resume-retro-main"
                  onClick={handleSelect('resume-retro-main')}
                  style={getElementStyle('resume-retro-main')}
                  className={getSelectableClass('resume-retro-main', 'w-[64%] p-6 space-y-5 text-left bg-[#E6DFD1]')}
                >
                  {mainSections.map((sec) => (
                    <div key={`retro-main-${sec.id}`} className="space-y-2">
                      <div className="flex items-center space-x-1.5 pb-1 border-b-2 border-[#5D8A8A]">
                        <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121316]">
                          {sec.name}
                        </h3>
                      </div>
                      {renderSectionContent(sec.id, false)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Space-Age Bottom Running Footer */}
              <div
                id="resume-retro-footer"
                onClick={handleSelect('resume-retro-footer')}
                style={getElementStyle('resume-retro-footer')}
                className={getSelectableClass('resume-retro-footer', 'px-6 py-2 bg-[#121316] text-[#F7F4EB] border-t border-[#FF6F3C] flex items-center justify-between text-[8px] font-mono tracking-widest uppercase')}
              >
                <span>LOOK BACK. MOVE FORWARD.</span>
                <span className="text-[#FF6F3C]">INSPIRED THEN • DESIGNED NOW</span>
                <span>A4 • ARCHIVE SPEC</span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LAYOUT STRUCTURE 1: MODERN 2-COLUMN                            */}
          {/* ============================================================== */}
          {layoutStructure === 'two-column' && (
            <div className="w-full flex min-h-[297mm]">
              {/* Left Sidebar Column (35% width) */}
              <div
                id="resume-two-sidebar"
                onClick={handleSelect('resume-two-sidebar')}
                style={getElementStyle('resume-two-sidebar', { borderRightColor: theme.accentColor + '30' })}
                className={getSelectableClass('resume-two-sidebar', 'w-[35%] bg-slate-50/90 border-r border-slate-200 p-6 space-y-4 text-left flex flex-col justify-between')}
              >
                <div className="space-y-4">
                  {/* Sidebar Header: Photo & Contact */}
                  {isProfileEnabled && (
                    <div className="space-y-3 pb-3 border-b border-slate-200">
                      {/* Uploaded Profile Photo */}
                      {profile.avatarUrl ? (
                        <div
                          id="resume-profile-avatar"
                          onClick={handleSelect('resume-profile-avatar')}
                          className={getSelectableClass('resume-profile-avatar', 'flex justify-center mb-2')}
                        >
                          <img
                            src={profile.avatarUrl}
                            alt={profile.fullName}
                            className="w-24 h-24 rounded-full object-cover border-2 shadow-sm transition-all"
                            style={{ borderColor: theme.accentColor, ...getElementStyle('resume-profile-avatar') }}
                          />
                        </div>
                      ) : null}

                      <div>
                        <h2
                          id="resume-profile-name"
                          onClick={handleSelect('resume-profile-name')}
                          style={getElementStyle('resume-profile-name')}
                          className={getSelectableClass('resume-profile-name', 'text-lg font-black text-slate-950 tracking-tight leading-tight inline-block')}
                        >
                          {profile.fullName}
                        </h2>
                        <p
                          id="resume-profile-headline"
                          onClick={handleSelect('resume-profile-headline')}
                          style={getElementStyle('resume-profile-headline', { color: theme.accentColor })}
                          className={getSelectableClass('resume-profile-headline', 'text-[11px] font-semibold tracking-wide mt-0.5 inline-block')}
                        >
                          {profile.headline}
                        </p>
                      </div>

                      {/* Contact Details List */}
                      <div
                        id="resume-profile-contact"
                        onClick={handleSelect('resume-profile-contact')}
                        style={getElementStyle('resume-profile-contact')}
                        className={getSelectableClass('resume-profile-contact', 'space-y-1.5 text-[10px] text-slate-600 p-1 rounded')}
                      >
                        {profile.email && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{profile.email}</span>
                          </div>
                        )}
                        {profile.phone && (
                          <div className="flex items-center space-x-1.5">
                            <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span>{profile.phone}</span>
                          </div>
                        )}
                        {profile.location && (
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                        {profile.website && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{profile.website.replace('https://', '')}</span>
                          </div>
                        )}
                        {profile.github && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <GithubIcon className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{profile.github.replace('https://github.com/', '')}</span>
                          </div>
                        )}
                        {profile.linkedin && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <LinkedinIcon className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{profile.linkedin.replace('https://linkedin.com/in/', '')}</span>
                          </div>
                        )}
                      </div>

                      {/* CAD Tools & Licenses */}
                      {industry === 'engineering_cad' && profile.cadTools && (
                        <div className="pt-2 border-t border-slate-200 text-[9px]">
                          <span className="font-bold text-slate-800 block mb-0.5">CAD Suite:</span>
                          <span className="text-slate-600 font-mono">{profile.cadTools}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sidebar Assigned Sections (Skills, Education, Certifications, etc.) */}
                  <div className="space-y-4">
                    {sidebarSections.map((sec) => renderSectionContent(sec.id, true))}
                  </div>
                </div>

                <div className="text-[9px] font-mono text-slate-400 pt-4">
                  A4 • Modern 2-Column
                </div>
              </div>

              {/* Right Main Body Column (65% width) */}
              <div
                id="resume-two-main"
                onClick={handleSelect('resume-two-main')}
                className={getSelectableClass('resume-two-main', 'w-[65%] p-6 space-y-4 text-left')}
              >
                {/* Main Body Summary / Headline Bar */}
                {isProfileEnabled && profile.summary && (
                  <div
                    id="resume-profile-summary"
                    onClick={handleSelect('resume-profile-summary')}
                    className={getSelectableClass('resume-profile-summary', 'pb-3 border-b border-slate-200 space-y-1.5 p-1 rounded')}
                  >
                    <h3
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: theme.accentColor }}
                    >
                      Executive Summary
                    </h3>
                    <p className="text-[10px] leading-relaxed text-slate-700">
                      {profile.summary}
                    </p>
                  </div>
                )}

                {/* Main Assigned Sections (Experience, Projects, etc.) */}
                <div className={spacingClass}>
                  {mainSections.map((sec) => renderSectionContent(sec.id, false))}
                  {fullSections.map((sec) => renderSectionContent(sec.id, false))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LAYOUT STRUCTURE 2: MODULAR GRID LAYOUT                        */}
          {/* ============================================================== */}
          {layoutStructure === 'grid' && (
            <div className="w-full space-y-3.5">
              {/* Modular Header Box */}
              {isProfileEnabled && (
                <div
                  id="resume-grid-header"
                  onClick={handleSelect('resume-grid-header')}
                  className={getSelectableClass('resume-grid-header', 'p-4 rounded-md border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4 text-left')}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <h1
                        id="resume-profile-name"
                        onClick={handleSelect('resume-profile-name')}
                        className={getSelectableClass('resume-profile-name', 'text-xl font-black text-slate-950 tracking-tight inline-block')}
                      >
                        {profile.fullName}
                      </h1>
                      <span
                        id="resume-profile-headline"
                        onClick={handleSelect('resume-profile-headline')}
                        className={getSelectableClass('resume-profile-headline', 'text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono inline-block')}
                        style={{ color: theme.accentColor, backgroundColor: theme.accentColor + '15' }}
                      >
                        {profile.headline}
                      </span>
                    </div>

                    <div
                      id="resume-profile-contact"
                      onClick={handleSelect('resume-profile-contact')}
                      className={getSelectableClass('resume-profile-contact', 'flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600 p-0.5 rounded')}
                    >
                      {profile.email && <span>{profile.email}</span>}
                      {profile.phone && <span>• {profile.phone}</span>}
                      {profile.location && <span>• {profile.location}</span>}
                      {profile.website && <span>• {profile.website.replace('https://', '')}</span>}
                    </div>

                    {profile.summary && (
                      <p
                        id="resume-profile-summary"
                        onClick={handleSelect('resume-profile-summary')}
                        className={getSelectableClass('resume-profile-summary', 'text-[10px] text-slate-700 leading-relaxed pt-1 p-0.5 rounded')}
                      >
                        {profile.summary}
                      </p>
                    )}
                  </div>

                  {profile.avatarUrl && (
                    <img
                      id="resume-profile-avatar"
                      onClick={handleSelect('resume-profile-avatar')}
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      className={getSelectableClass('resume-profile-avatar', 'w-16 h-16 rounded-lg object-cover border-2 shadow-xs flex-shrink-0')}
                      style={{ borderColor: theme.accentColor }}
                    />
                  )}
                </div>
              )}

              {/* CSS Grid Multi-Area Layout */}
              <div className="grid grid-cols-12 gap-3.5 items-start">
                {/* Primary Column (Span 7) */}
                <div className="col-span-7 space-y-3.5">
                  {mainSections.map((sec) => (
                    <div
                      key={sec.id}
                      className="p-3.5 rounded-md border border-slate-200 bg-white shadow-xs"
                    >
                      {renderSectionContent(sec.id, false)}
                    </div>
                  ))}
                </div>

                {/* Secondary Column (Span 5) */}
                <div className="col-span-5 space-y-3.5">
                  {sidebarSections.map((sec) => (
                    <div
                      key={sec.id}
                      className="p-3.5 rounded-md border border-slate-200 bg-slate-50/60 shadow-xs"
                    >
                      {renderSectionContent(sec.id, true)}
                    </div>
                  ))}
                </div>

                {/* Full-Width Area (Span 12) */}
                {fullSections.length > 0 && (
                  <div className="col-span-12 space-y-3.5">
                    {fullSections.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-3.5 rounded-md border border-slate-200 bg-white shadow-xs"
                      >
                        {renderSectionContent(sec.id, false)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LAYOUT STRUCTURE 3: CLASSIC SINGLE COLUMN                      */}
          {/* ============================================================== */}
          {layoutStructure === 'single' && (
            <div className="w-full">
              {/* Header & Contact Information */}
              {isProfileEnabled && (
                <div
                  id="resume-single-header"
                  onClick={handleSelect('resume-single-header')}
                  className={getSelectableClass('resume-single-header', 'pb-3.5 mb-4 border-b text-left space-y-2 p-1 rounded')}
                  style={{ borderColor: theme.accentColor + '40' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      {profile.avatarUrl && (
                        <img
                          id="resume-profile-avatar"
                          onClick={handleSelect('resume-profile-avatar')}
                          src={profile.avatarUrl}
                          alt={profile.fullName}
                          className={getSelectableClass('resume-profile-avatar', 'w-16 h-16 rounded-full object-cover border-2 shadow-xs flex-shrink-0 transition-all')}
                          style={{ borderColor: theme.accentColor, ...getElementStyle('resume-profile-avatar') }}
                        />
                      )}
                      <div>
                        <h1
                          id="resume-profile-name"
                          onClick={handleSelect('resume-profile-name')}
                          className={getSelectableClass('resume-profile-name', 'text-2xl font-black tracking-tight text-slate-950 m-0 inline-block')}
                        >
                          {profile.fullName}
                        </h1>
                        <p
                          id="resume-profile-headline"
                          onClick={handleSelect('resume-profile-headline')}
                          className={getSelectableClass('resume-profile-headline', 'text-xs font-semibold mt-0.5 tracking-wide inline-block')}
                          style={{ color: theme.accentColor }}
                        >
                          {profile.headline}
                        </p>
                      </div>
                    </div>

                    {/* Industry Licensure / Badge */}
                    {industry === 'engineering_cad' && profile.engineeringLicense && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300">
                        {profile.engineeringLicense}
                      </span>
                    )}
                    {industry === 'executive' && profile.teamSizeOrBudget && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                        {profile.teamSizeOrBudget}
                      </span>
                    )}
                  </div>

                  {/* Contact Bar */}
                  <div
                    id="resume-profile-contact"
                    onClick={handleSelect('resume-profile-contact')}
                    className={getSelectableClass('resume-profile-contact', 'flex flex-wrap gap-x-3.5 gap-y-1 text-[10px] text-slate-600 p-0.5 rounded')}
                  >
                    {profile.email && (
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{profile.email}</span>
                      </span>
                    )}
                    {profile.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{profile.phone}</span>
                      </span>
                    )}
                    {profile.location && (
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{profile.location}</span>
                      </span>
                    )}
                    {profile.website && (
                      <span className="flex items-center space-x-1">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>{profile.website.replace('https://', '')}</span>
                      </span>
                    )}
                    {profile.github && (
                      <span className="flex items-center space-x-1">
                        <GithubIcon className="w-3 h-3 text-slate-400" />
                        <span>{profile.github.replace('https://github.com/', '')}</span>
                      </span>
                    )}
                    {profile.linkedin && (
                      <span className="flex items-center space-x-1">
                        <LinkedinIcon className="w-3 h-3 text-slate-400" />
                        <span>{profile.linkedin.replace('https://linkedin.com/in/', '')}</span>
                      </span>
                    )}
                  </div>

                  {/* Executive Summary */}
                  {profile.summary && (
                    <p
                      id="resume-profile-summary"
                      onClick={handleSelect('resume-profile-summary')}
                      className={getSelectableClass('resume-profile-summary', 'mt-2 text-[10px] leading-relaxed text-slate-700 p-0.5 rounded')}
                    >
                      {profile.summary}
                    </p>
                  )}
                </div>
              )}

              {/* Draggable Dynamic Sections rendered in exact layout order */}
              <div className={spacingClass}>
                {enabledSections.map((sec) => renderSectionContent(sec.id, false))}
              </div>
            </div>
          )}

          {enabledSections.length === 0 && (
            <div className="py-20 text-center text-slate-400 space-y-1 w-full">
              <p className="text-xs font-semibold">Empty Resume Layout</p>
              <p className="text-[10px]">Enable sections on the left column to populate your A4 document.</p>
            </div>
          )}

          {/* Subtle A4 Page Height Boundary Watermark */}
          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-300 select-none pointer-events-none">
            Page 1 of 1 • A4 Standard
          </div>
        </div>
      </div>
    </div>
  )
}
