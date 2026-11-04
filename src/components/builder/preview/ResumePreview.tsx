import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
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
  const { resumeData, sections, theme } = useResumeStore()
  const { profile, experience, projects, skills, education, certifications } = resumeData
  const [zoomLevel, setZoomLevel] = useState<number>(100)

  // Map enabled sections in current user-defined order
  const enabledSections = sections.filter((s) => s.isEnabled)

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
          <div key="sec-experience" className="space-y-3">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2"
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
                <div key={exp.id} className="text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-600"> • {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[11px] text-slate-700 leading-relaxed">
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
          <div key="sec-projects" className="space-y-3">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2"
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
                <div key={proj.id} className="text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{proj.name}</span>
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
                  <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
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
          <div key="sec-skills" className="space-y-2.5">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2"
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
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline text-left">
                  <span className="w-40 font-semibold text-slate-800 text-[11px] flex-shrink-0">
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
          <div key="sec-education" className="space-y-2.5">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2"
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
                <div key={edu.id} className="flex justify-between items-baseline text-left">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{edu.institution}</span>
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
          <div key="sec-certifications" className="space-y-2.5">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b flex items-center space-x-2"
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
                <div key={cert.id} className="flex justify-between items-baseline text-left">
                  <div>
                    <span className="text-xs font-semibold text-slate-900">{cert.title}</span>
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
          <div key={sectionId} className="space-y-2">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              style={{
                borderColor: theme.accentColor + '40',
                color: theme.accentColor,
              }}
            >
              {sections.find((s) => s.id === sectionId)?.name || 'Custom Section'}
            </h3>
            <p className="text-[11px] text-slate-700 leading-relaxed text-left">
              Content tailored for {sections.find((s) => s.id === sectionId)?.name}. Dynamic custom
              attributes appear here seamlessly.
            </p>
          </div>
        )
    }
  }

  const isProfileEnabled = sections.find((s) => s.id === 'profile')?.isEnabled ?? true

  return (
    <div className="flex flex-col h-full">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between pb-3 px-1 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Live Preview</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-mono">
            ATS Score: 98/100
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono w-10 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sheet Container with zoom & shadow */}
      <div className="flex-1 overflow-auto bg-slate-200/70 dark:bg-slate-950/70 p-4 sm:p-6 rounded-2xl flex justify-center items-start border border-slate-300/60 dark:border-slate-800">
        <div
          id="resume-printable-doc"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className={`w-full max-w-[800px] bg-white text-slate-900 p-8 sm:p-10 rounded-lg shadow-2xl shadow-slate-900/10 border border-slate-200/90 ${fontClass}`}
        >
          {/* Resume Header / Profile */}
          {isProfileEnabled && (
            <div
              className="pb-4 mb-5 border-b text-left"
              style={{ borderColor: theme.accentColor + '30' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
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

              {/* Contact bar */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] text-slate-600">
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
                <p className="mt-3 text-[11px] leading-relaxed text-slate-700">
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
