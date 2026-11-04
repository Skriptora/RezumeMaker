import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useResumeStore } from '../../../store/useResumeStore'
import type { ResumeSection, SectionColumn } from '../../../types/resume'
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
  const { resumeData, sections, theme, layoutStructure, setLayoutStructure } = useResumeStore()
  const { profile, experience, projects, skills, education, certifications } = resumeData
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const industry = profile.industry || 'software'

  const printableRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printableRef,
    documentTitle: `${profile.fullName.replace(/\s+/g, '_')}_Resume`,
    pageStyle: `
      @page {
        size: A4;
        margin: 8mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background: white !important;
        }
        #resume-a4-page {
          box-shadow: none !important;
          border: none !important;
          transform: none !important;
          width: 100% !important;
          min-height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      }
    `,
  })

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
          <div key="sec-experience" className="space-y-2.5">
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
                <div key={exp.id} className="text-left">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-[11px]">
                    <div>
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-600 font-medium"> • {exp.company}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-[10px] text-slate-700 mt-0.5 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[10px] text-slate-700 leading-relaxed">
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
          <div key="sec-projects" className="space-y-2.5">
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
                <div key={proj.id} className="text-left">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{proj.name}</span>
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

                  <p className="text-[10px] text-slate-700 mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 mt-1.5">
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
          <div key="sec-skills" className="space-y-2">
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
                <div key={cat.id} className={isSidebar ? 'space-y-1' : 'flex flex-col sm:flex-row sm:items-baseline'}>
                  <span className={`${isSidebar ? 'block' : 'w-36 flex-shrink-0'} font-semibold text-slate-800`}>
                    {cat.categoryName}:
                  </span>
                  <div className="flex flex-wrap gap-1">
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
          <div key="sec-education" className="space-y-2">
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
                <div key={edu.id} className="text-left text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{edu.institution}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-medium">
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
          <div key="sec-certifications" className="space-y-2">
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
                <div key={cert.id} className="flex justify-between items-baseline text-left">
                  <div>
                    <span className="font-semibold text-slate-900 text-[10px]">
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
          <div key={`sec-${sectionId}`} className="space-y-2 text-left">
            {/* Custom Section Header */}
            <div
              className="flex items-center space-x-1.5 pb-1 border-b"
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
              <div className="text-[10px] text-slate-700 leading-relaxed whitespace-pre-line">
                {customData?.content || sec.description || 'No content provided.'}
              </div>
            )}

            {/* Format 2: List */}
            {formatType === 'list' && (
              <div className="space-y-2">
                {customData?.items && customData.items.length > 0 ? (
                  customData.items.map((item) => (
                    <div key={item.id} className="text-left text-[11px]">
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
                        className="p-2.5 rounded border border-slate-200/80 bg-slate-50/70 text-left"
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Real-Time A4 Document
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] text-[10px] font-mono border border-[#FF6F3C]/30 font-bold">
            {layoutStructure === 'retro-split'
              ? '✦ Space-Age Split'
              : layoutStructure === 'two-column'
              ? 'Modern 2-Column'
              : layoutStructure === 'grid'
              ? 'Grid Layout'
              : 'Single Column'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Layout Buttons */}
          <div className="flex items-center space-x-0.5 bg-slate-100 dark:bg-[#14243B] rounded-lg p-0.5 border border-[#223854]">
            <button
              onClick={() => setLayoutStructure('retro-split')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'retro-split'
                  ? 'bg-[#FF6F3C] text-[#F2EBD7] font-bold shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#FF6F3C]'
              }`}
              title="Space-Age Retro Split"
            >
              <Orbit className="w-3.5 h-3.5 text-[#F2B705]" />
            </button>
            <button
              onClick={() => setLayoutStructure('two-column')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'two-column'
                  ? 'bg-white dark:bg-[#1B3150] text-[#FF6F3C] shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#FF6F3C]'
              }`}
              title="Modern 2-Column Layout"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutStructure('grid')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'grid'
                  ? 'bg-white dark:bg-[#1B3150] text-[#FF6F3C] shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#FF6F3C]'
              }`}
              title="Modular Grid Layout"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutStructure('single')}
              className={`p-1 rounded transition-colors ${
                layoutStructure === 'single'
                  ? 'bg-white dark:bg-[#1B3150] text-[#FF6F3C] shadow-xs'
                  : 'text-slate-600 dark:text-[#A3B4C8] hover:text-[#FF6F3C]'
              }`}
              title="Classic Single Column"
            >
              <Rows3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono w-9 text-center text-slate-700 dark:text-slate-300">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => handlePrint()}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="Download clean high-resolution A4 PDF via react-to-print"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="flex-1 overflow-auto bg-slate-200/80 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl flex justify-center items-start border border-slate-300/70 dark:border-slate-800 shadow-inner">
        <div
          ref={printableRef}
          id="resume-a4-page"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm',
            minHeight: '297mm',
          }}
          className={`shadow-2xl shadow-slate-900/15 border border-slate-200 rounded-sm relative ${fontClass} ${
            layoutStructure === 'retro-split'
              ? 'p-0 flex bg-[#F2EBD7] text-[#0D1B2A]'
              : layoutStructure === 'two-column'
              ? 'p-0 flex bg-white text-slate-900'
              : 'p-8 sm:p-10 bg-white text-slate-900'
          }`}
        >
          {/* ============================================================== */}
          {/* LAYOUT STRUCTURE 0: RETRO-FUTURISTIC SPACE-AGE SPLIT          */}
          {/* ============================================================== */}
          {layoutStructure === 'retro-split' && (
            <div className="w-full flex flex-col min-h-[297mm] bg-[#F2EBD7] text-[#0D1B2A] p-0 font-sans">
              {/* Space-Age Top Hero Banner */}
              <div className="bg-[#0D1B2A] text-[#F2EBD7] p-6 border-b-4 border-[#FF6F3C] relative overflow-hidden">
                <div className="absolute right-4 top-2 text-[#5D8A8A] text-4xl opacity-15 font-display font-black pointer-events-none select-none">
                  RETRO-2080
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center space-x-4">
                    {/* Retro Profile Avatar with Burnt Orange Ring */}
                    {profile.avatarUrl ? (
                      <div className="relative flex-shrink-0">
                        <img
                          src={profile.avatarUrl}
                          alt={profile.fullName}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6F3C] shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 text-xs text-[#F2B705]">✦</span>
                      </div>
                    ) : null}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono tracking-widest text-[#F2B705] uppercase">
                          ✦ SPACE-AGE CURRICULUM VITAE ✦
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[#F2EBD7] uppercase leading-tight">
                        {profile.fullName}
                      </h1>
                      <p className="text-xs font-mono font-medium text-[#5D8A8A] mt-0.5">
                        {profile.headline}
                      </p>
                    </div>
                  </div>

                  {/* Contact Badges */}
                  <div className="space-y-1 text-[10px] font-mono text-[#F2EBD7]/90 text-left sm:text-right">
                    {profile.email && <div>{profile.email}</div>}
                    {profile.phone && <div>{profile.phone}</div>}
                    {profile.location && <div className="text-[#F2B705]">{profile.location}</div>}
                    {profile.website && <div className="text-[#FF6F3C]">{profile.website.replace('https://', '')}</div>}
                  </div>
                </div>

                {profile.summary && (
                  <p className="text-[10px] text-[#A3B4C8] leading-relaxed mt-3 pt-3 border-t border-[#223854] text-left">
                    {profile.summary}
                  </p>
                )}
              </div>

              {/* Asymmetric Split Body: 35% Left Sidebar : 65% Main Body */}
              <div className="flex-1 flex min-h-[200mm]">
                {/* Left Sidebar */}
                <div className="w-[36%] bg-[#FAF6EC] border-r-2 border-[#0D1B2A]/20 p-5 space-y-4 text-left">
                  {sidebarSections.map((sec) => (
                    <div key={`retro-side-${sec.id}`} className="space-y-2">
                      <div className="flex items-center space-x-1.5 pb-1 border-b-2 border-[#FF6F3C]">
                        <span className="text-xs text-[#FF6F3C]">✦</span>
                        <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#0D1B2A]">
                          {sec.name}
                        </h3>
                      </div>
                      {renderSectionContent(sec.id, true)}
                    </div>
                  ))}
                </div>

                {/* Right Main Body */}
                <div className="w-[64%] p-6 space-y-5 text-left bg-[#F2EBD7]">
                  {mainSections.map((sec) => (
                    <div key={`retro-main-${sec.id}`} className="space-y-2">
                      <div className="flex items-center space-x-1.5 pb-1 border-b-2 border-[#5D8A8A]">
                        <span className="text-xs text-[#5D8A8A]">✦</span>
                        <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#0D1B2A]">
                          {sec.name}
                        </h3>
                      </div>
                      {renderSectionContent(sec.id, false)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Space-Age Bottom Running Footer */}
              <div className="px-6 py-2 bg-[#0D1B2A] text-[#F2EBD7] border-t border-[#FF6F3C] flex items-center justify-between text-[8px] font-mono tracking-widest uppercase">
                <span>LOOK BACK. MOVE FORWARD.</span>
                <span className="text-[#FF6F3C]">✦ INSPIRED THEN • DESIGNED NOW ✦</span>
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
                className="w-[35%] bg-slate-50/90 border-r border-slate-200 p-6 space-y-4 text-left flex flex-col justify-between"
                style={{ borderRightColor: theme.accentColor + '30' }}
              >
                <div className="space-y-4">
                  {/* Sidebar Header: Photo & Contact */}
                  {isProfileEnabled && (
                    <div className="space-y-3 pb-3 border-b border-slate-200">
                      {/* Uploaded Profile Photo */}
                      {profile.avatarUrl ? (
                        <div className="flex justify-center mb-2">
                          <img
                            src={profile.avatarUrl}
                            alt={profile.fullName}
                            className="w-24 h-24 rounded-full object-cover border-2 shadow-sm"
                            style={{ borderColor: theme.accentColor }}
                          />
                        </div>
                      ) : null}

                      <div>
                        <h2 className="text-lg font-black text-slate-950 tracking-tight leading-tight">
                          {profile.fullName}
                        </h2>
                        <p
                          className="text-[11px] font-semibold tracking-wide mt-0.5"
                          style={{ color: theme.accentColor }}
                        >
                          {profile.headline}
                        </p>
                      </div>

                      {/* Contact Details List */}
                      <div className="space-y-1.5 text-[10px] text-slate-600">
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
              <div className="w-[65%] p-6 space-y-4 text-left">
                {/* Main Body Summary / Headline Bar */}
                {isProfileEnabled && profile.summary && (
                  <div className="pb-3 border-b border-slate-200 space-y-1.5">
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
                <div className="p-4 rounded-md border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4 text-left">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-xl font-black text-slate-950 tracking-tight">
                        {profile.fullName}
                      </h1>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono"
                        style={{ color: theme.accentColor, backgroundColor: theme.accentColor + '15' }}
                      >
                        {profile.headline}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600">
                      {profile.email && <span>{profile.email}</span>}
                      {profile.phone && <span>• {profile.phone}</span>}
                      {profile.location && <span>• {profile.location}</span>}
                      {profile.website && <span>• {profile.website.replace('https://', '')}</span>}
                    </div>

                    {profile.summary && (
                      <p className="text-[10px] text-slate-700 leading-relaxed pt-1">
                        {profile.summary}
                      </p>
                    )}
                  </div>

                  {profile.avatarUrl && (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      className="w-16 h-16 rounded-lg object-cover border-2 shadow-xs flex-shrink-0"
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
                  className="pb-3.5 mb-4 border-b text-left space-y-2"
                  style={{ borderColor: theme.accentColor + '40' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      {profile.avatarUrl && (
                        <img
                          src={profile.avatarUrl}
                          alt={profile.fullName}
                          className="w-16 h-16 rounded-full object-cover border-2 shadow-xs flex-shrink-0"
                          style={{ borderColor: theme.accentColor }}
                        />
                      )}
                      <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-950 m-0">
                          {profile.fullName}
                        </h1>
                        <p
                          className="text-xs font-semibold mt-0.5 tracking-wide"
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
                  <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[10px] text-slate-600">
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
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-700">
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
