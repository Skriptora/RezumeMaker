import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { getElementInlineStyle } from '../../../utils/selectable'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Award,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../common/Icons'

export const ResumePreview: React.FC = () => {
  const { resumeData, sections, theme, selectedElementId, setSelectedElementId, elementStyles } =
    useResumeStore()
  const { profile, experience, projects, skills, education, certifications } = resumeData
  const [zoomLevel, setZoomLevel] = useState<number>(100)

  const getElementStyle = (id: string, baseStyle?: React.CSSProperties): React.CSSProperties => {
    return getElementInlineStyle(id, elementStyles, baseStyle)
  }

  // Map enabled sections in current user-defined order
  const enabledSections = sections.filter((s) => s.isEnabled)

  const getSelectableClass = (id: string, baseClass = '') => {
    const isSelected = selectedElementId === id
    return `${baseClass} cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-white dark:ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.4)] rounded relative z-10'
        : 'hover:ring-1 hover:ring-[#FF6F3C]/40 hover:ring-offset-1 rounded'
    }`
  }

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  const fontClass =
    theme.fontFamily === 'serif'
      ? 'font-serif'
      : theme.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans'

  const spacingClass =
    theme.spacing === 'compact'
      ? 'space-y-4'
      : theme.spacing === 'spacious'
      ? 'space-y-7'
      : 'space-y-5'

  // Dynamic section renderer
  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'profile':
        return null // Profile is rendered in header of resume

      case 'experience':
        return (
          <div
            key="sec-experience"
            id="resume-sec-experience"
            onClick={handleSelect('resume-sec-experience')}
            className={getSelectableClass('resume-sec-experience', 'space-y-3 p-1 rounded')}
          >
            <h3
              id="resume-head-experience"
              onClick={handleSelect('resume-head-experience')}
              className={getSelectableClass('resume-head-experience', 'text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </h3>
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
                    className={getSelectableClass(`resume-exp-${exp.id}-header`, 'flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs')}
                  >
                    <div>
                      <span
                        id={`resume-exp-${exp.id}-role`}
                        onClick={handleSelect(`resume-exp-${exp.id}-role`)}
                        className={getSelectableClass(`resume-exp-${exp.id}-role`, 'font-bold text-slate-900 inline-block')}
                      >
                        {exp.role}
                      </span>
                      <span className="text-slate-600"> • {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  {exp.description && (
                    <p
                      id={`resume-exp-${exp.id}-desc`}
                      onClick={handleSelect(`resume-exp-${exp.id}-desc`)}
                      className={getSelectableClass(`resume-exp-${exp.id}-desc`, 'text-[11px] text-slate-700 mt-1 leading-relaxed p-0.5 rounded')}
                    >
                      {exp.description}
                    </p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      id={`resume-exp-${exp.id}-highlights`}
                      onClick={handleSelect(`resume-exp-${exp.id}-highlights`)}
                      className={getSelectableClass(`resume-exp-${exp.id}-highlights`, 'list-disc list-outside ml-4 mt-1 space-y-0.5 text-[11px] text-slate-700 leading-relaxed p-0.5 rounded')}
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
            className={getSelectableClass('resume-sec-projects', 'space-y-3 p-1 rounded')}
          >
            <h3
              id="resume-head-projects"
              onClick={handleSelect('resume-head-projects')}
              className={getSelectableClass('resume-head-projects', 'text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Projects</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  id={`resume-proj-${proj.id}`}
                  onClick={handleSelect(`resume-proj-${proj.id}`)}
                  className={getSelectableClass(`resume-proj-${proj.id}`, 'text-left p-1 rounded')}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      id={`resume-proj-${proj.id}-name`}
                      onClick={handleSelect(`resume-proj-${proj.id}-name`)}
                      className={getSelectableClass(`resume-proj-${proj.id}-name`, 'font-bold text-slate-900 inline-block')}
                    >
                      {proj.name}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-blue-600">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center space-x-0.5"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center space-x-0.5"
                        >
                          <span>Code</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p
                    id={`resume-proj-${proj.id}-desc`}
                    onClick={handleSelect(`resume-proj-${proj.id}-desc`)}
                    className={getSelectableClass(`resume-proj-${proj.id}-desc`, 'text-[11px] text-slate-700 mt-0.5 leading-relaxed p-0.5 rounded')}
                  >
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div
                      id={`resume-proj-${proj.id}-tech`}
                      onClick={handleSelect(`resume-proj-${proj.id}-tech`)}
                      className={getSelectableClass(`resume-proj-${proj.id}-tech`, 'flex flex-wrap gap-1 mt-1 p-0.5 rounded')}
                    >
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
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
            className={getSelectableClass('resume-sec-skills', 'space-y-2.5 p-1 rounded')}
          >
            <h3
              id="resume-head-skills"
              onClick={handleSelect('resume-head-skills')}
              className={getSelectableClass('resume-head-skills', 'text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </h3>
            <div className="space-y-1.5 text-xs">
              {skills.map((cat) => (
                <div
                  key={cat.id}
                  id={`resume-skill-${cat.id}`}
                  onClick={handleSelect(`resume-skill-${cat.id}`)}
                  className={getSelectableClass(`resume-skill-${cat.id}`, 'flex flex-col sm:flex-row sm:items-baseline text-left p-1 rounded')}
                >
                  <span
                    id={`resume-skill-${cat.id}-title`}
                    onClick={handleSelect(`resume-skill-${cat.id}-title`)}
                    className={getSelectableClass(`resume-skill-${cat.id}-title`, 'w-40 font-semibold text-slate-800 text-[11px] flex-shrink-0')}
                  >
                    {cat.categoryName}:
                  </span>
                  <span className="text-[11px] text-slate-700">
                    {cat.skills.join(' • ')}
                  </span>
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
            className={getSelectableClass('resume-sec-education', 'space-y-2.5 p-1 rounded')}
          >
            <h3
              id="resume-head-education"
              onClick={handleSelect('resume-head-education')}
              className={getSelectableClass('resume-head-education', 'text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  id={`resume-edu-${edu.id}`}
                  onClick={handleSelect(`resume-edu-${edu.id}`)}
                  className={getSelectableClass(`resume-edu-${edu.id}`, 'flex justify-between items-baseline text-left p-1 rounded')}
                >
                  <div>
                    <span
                      id={`resume-edu-${edu.id}-inst`}
                      onClick={handleSelect(`resume-edu-${edu.id}-inst`)}
                      className={getSelectableClass(`resume-edu-${edu.id}-inst`, 'text-xs font-bold text-slate-900 inline-block')}
                    >
                      {edu.institution}
                    </span>
                    <p className="text-[11px] text-slate-700">
                      {edu.degree} in {edu.fieldOfStudy}
                      {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {edu.startDate} – {edu.endDate}
                  </span>
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
            className={getSelectableClass('resume-sec-certifications', 'space-y-2.5 p-1 rounded')}
          >
            <h3
              id="resume-head-certifications"
              onClick={handleSelect('resume-head-certifications')}
              className={getSelectableClass('resume-head-certifications', 'text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certifications & Honors</span>
            </h3>
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
                      className={getSelectableClass(`resume-cert-${cert.id}-title`, 'text-xs font-semibold text-slate-900 inline-block')}
                    >
                      {cert.title}
                    </span>
                    <span className="text-[11px] text-slate-600"> — {cert.issuer}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        // Handle custom sections
        return (
          <div
            key={sectionId}
            id={`resume-sec-${sectionId}`}
            onClick={handleSelect(`resume-sec-${sectionId}`)}
            className={getSelectableClass(`resume-sec-${sectionId}`, 'space-y-2 p-1 rounded')}
          >
            <h3
              id={`resume-head-${sectionId}`}
              onClick={handleSelect(`resume-head-${sectionId}`)}
              className={getSelectableClass(`resume-head-${sectionId}`, 'text-xs font-bold uppercase tracking-wider pb-1 border-b')}
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              {sections.find((s) => s.id === sectionId)?.name || 'Custom Section'}
            </h3>
            <p className="text-xs text-slate-600">
              {resumeData.customSections?.[sectionId]?.content ||
                sections.find((s) => s.id === sectionId)?.description}
            </p>
          </div>
        )
    }
  }

  const isProfileEnabled = sections.find((s) => s.id === 'profile')?.isEnabled ?? true

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Zoom and status toolbar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Live Preview</span>
          {selectedElementId && (
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#FF6F3C]/15 border border-[#FF6F3C]/40 text-[#FF6F3C] text-[10px] font-mono">
              <span>Selected: <code className="font-bold underline">{selectedElementId}</code></span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedElementId(null)
                }}
                className="ml-1 text-slate-500 hover:text-red-500 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-slate-500 w-12 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sheet Container */}
      <div
        onClick={() => setSelectedElementId(null)}
        className="flex-1 overflow-auto bg-slate-100/70 dark:bg-[#0A0B0E] p-6 rounded-2xl flex justify-center items-start border border-slate-200 dark:border-slate-800/80 shadow-inner"
      >
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className={`w-full max-w-[800px] bg-white text-slate-900 p-8 sm:p-10 rounded-lg shadow-2xl shadow-slate-900/10 border border-slate-200/90 ${fontClass}`}
        >
          {/* Dynamic element custom styles */}
          <style>{`
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
                if (rules.length === 0) return ''
                return `[id="${id}"] { ${rules.join(' ')} }`
              })
              .join('\n')}
          `}</style>
          {/* Resume Header / Profile */}
          {isProfileEnabled && (
            <div
              id="resume-profile-header"
              onClick={handleSelect('resume-profile-header')}
              style={getElementStyle('resume-profile-header', { borderColor: theme.accentColor + '30' })}
              className={getSelectableClass('resume-profile-header', 'pb-4 mb-5 border-b text-left p-1 rounded')}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h1
                    id="resume-profile-name"
                    onClick={handleSelect('resume-profile-name')}
                    style={getElementStyle('resume-profile-name')}
                    className={getSelectableClass('resume-profile-name', 'text-2xl font-black tracking-tight text-slate-950 m-0 inline-block')}
                  >
                    {profile.fullName}
                  </h1>
                  <p
                    id="resume-profile-headline"
                    onClick={handleSelect('resume-profile-headline')}
                    style={getElementStyle('resume-profile-headline', { color: theme.accentColor })}
                    className={getSelectableClass('resume-profile-headline', 'text-xs font-semibold mt-0.5 tracking-wide inline-block')}
                  >
                    {profile.headline}
                  </p>
                </div>
              </div>

              {/* Contact bar */}
              <div
                id="resume-profile-contact"
                onClick={handleSelect('resume-profile-contact')}
                style={getElementStyle('resume-profile-contact')}
                className={getSelectableClass('resume-profile-contact', 'flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] text-slate-600 p-0.5 rounded')}
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
                  className={getSelectableClass('resume-profile-summary', 'mt-3 text-[11px] leading-relaxed text-slate-700 p-0.5 rounded')}
                >
                  {profile.summary}
                </p>
              )}
            </div>
          )}

          {/* Dynamic Section Ordering */}
          <div className={spacingClass}>
            {enabledSections.map((sec) => renderSectionContent(sec.id))}
          </div>

          {enabledSections.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-xs">All resume sections are currently toggled off.</p>
              <p className="text-[11px] mt-1">Enable sections in the sidebar or manager above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
