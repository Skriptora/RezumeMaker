import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Cpu,
  Trash2,
  Upload,
  Globe,
  X,
  ChevronRight,
  Home,
  User,
  FileText,
  FolderGit2,
} from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import { InlineEditableText } from './InlineEditableText'
import { WebEditorArtView } from './WebEditorArtView'
import { WebEditorSplineView } from './WebEditorSplineView'
import type { CustomWebComponent, WebEditorPageId } from '../../../types/resume'
import { getElementInlineStyle } from '../../../utils/selectable'

export const WebEditorSiteRenderer: React.FC = () => {
  const {
    webEditorViewport,
    webEditorMode,
    setWebEditorMode,
    webEditorCurrentPage,
    setWebEditorCurrentPage,
    webEditorFont,
    webComponents,
    deleteWebComponent,
    isWebEditorEditMode,
    resumeData,
    updateProfile,
    portfolioCards,
    selectedElementId,
    setSelectedElementId,
    elementStyles,
  } = useResumeStore()

  const getElementStyle = (id: string, baseStyle?: React.CSSProperties): React.CSSProperties => {
    return getElementInlineStyle(id, elementStyles, baseStyle)
  }

  const { profile, experience, education, skills, certifications } = resumeData
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Selectable element helper
  const getSelectableClass = (id: string, baseClass = '') => {
    const isSelected = selectedElementId === id
    return `${baseClass} cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.45)] rounded relative z-20'
        : 'hover:ring-1 hover:ring-[#FF6F3C]/40 hover:ring-offset-1 rounded'
    }`
  }

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ avatarUrl: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  // Filter components for current page or all
  const pageComponents = (pageId: WebEditorPageId) =>
    webComponents.filter((c) => c.page === pageId || c.page === 'all')

  const navigationPages: { id: WebEditorPageId; num: string; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'home', num: '01', label: 'Home', desc: 'Hero Overview & Headline', icon: <Home className="w-4 h-4 text-[#FF6F3C]" /> },
    { id: 'about', num: '02', label: 'About', desc: 'Biography, Philosophy & Portrait', icon: <User className="w-4 h-4 text-[#5D8A8A]" /> },
    { id: 'resume', num: '03', label: 'Resume', desc: 'Full Multi-Page Career Record', icon: <FileText className="w-4 h-4 text-[#F2B705]" /> },
    { id: 'projects', num: '04', label: 'Projects', desc: 'Featured Technical Systems', icon: <FolderGit2 className="w-4 h-4 text-[#B39ACD]" /> },
    { id: 'contact', num: '05', label: 'Contact', desc: 'Inquiries & Direct Channels', icon: <Mail className="w-4 h-4 text-[#10b981]" /> },
  ]

  const handleNavClick = (pageId: WebEditorPageId) => {
    setWebEditorCurrentPage(pageId)
    setIsMobileMenuOpen(false)
  }

  const renderComponentBlock = (comp: CustomWebComponent) => {
    return (
      <div
        key={comp.id}
        id={`portfolio-comp-${comp.id}`}
        onClick={handleSelect(`portfolio-comp-${comp.id}`)}
        style={getElementStyle(`portfolio-comp-${comp.id}`)}
        className={getSelectableClass(
          `portfolio-comp-${comp.id}`,
          `relative group/comp my-6 p-5 rounded-2xl border transition-all ${
            isWebEditorEditMode
              ? 'border-dashed border-[#FF6F3C]/60 bg-[#181A1F]/40'
              : 'border-transparent'
          }`
        )}
      >
        {isWebEditorEditMode && (
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 opacity-0 group-hover/comp:opacity-100 transition-opacity z-20">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6F3C] text-[#121316] font-bold uppercase">
              {comp.type}
            </span>
            <button
              onClick={() => deleteWebComponent(comp.id)}
              className="p-1.5 rounded bg-[#282A33] hover:bg-red-500 text-[#F7F4EB] cursor-pointer"
              title="Delete component"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {comp.type === 'image' && comp.imageUrl && (
          <div
            id={`portfolio-comp-${comp.id}-media`}
            onClick={handleSelect(`portfolio-comp-${comp.id}-media`)}
            className={getSelectableClass(`portfolio-comp-${comp.id}-media`, 'flex flex-col items-center p-2 rounded-xl')}
          >
            <div className="max-w-xl w-full rounded-2xl overflow-hidden border border-[#282A33] shadow-xl">
              <img src={comp.imageUrl} alt={comp.title || 'Component asset'} className="w-full h-auto object-cover" />
            </div>
            {comp.caption && (
              <p className="mt-2.5 text-sm font-mono text-[#5D8A8A] text-center font-medium">
                {comp.caption}
              </p>
            )}
          </div>
        )}

        {comp.type === 'text' && (
          <div className="space-y-2.5">
            {comp.title && (
              <h3
                id={`portfolio-comp-${comp.id}-title`}
                onClick={handleSelect(`portfolio-comp-${comp.id}-title`)}
                className={getSelectableClass(`portfolio-comp-${comp.id}-title`, 'text-2xl sm:text-3xl font-bold text-[#F7F4EB] inline-block')}
              >
                {comp.title}
              </h3>
            )}
            <p
              id={`portfolio-comp-${comp.id}-content`}
              onClick={handleSelect(`portfolio-comp-${comp.id}-content`)}
              className={getSelectableClass(`portfolio-comp-${comp.id}-content`, 'text-base sm:text-lg text-[#A8A49A] leading-relaxed whitespace-pre-line p-1 rounded')}
            >
              {comp.content}
            </p>
          </div>
        )}

        {comp.type === 'art' && (
          <div
            id={`portfolio-comp-${comp.id}-media`}
            onClick={handleSelect(`portfolio-comp-${comp.id}-media`)}
            className={getSelectableClass(`portfolio-comp-${comp.id}-media`, 'p-2 rounded-xl')}
          >
            <WebEditorArtView style={comp.artStyle} caption={comp.caption} />
          </div>
        )}

        {comp.type === 'spline' && (
          <div
            id={`portfolio-comp-${comp.id}-media`}
            onClick={handleSelect(`portfolio-comp-${comp.id}-media`)}
            className={getSelectableClass(`portfolio-comp-${comp.id}-media`, 'p-2 rounded-xl')}
          >
            <WebEditorSplineView
              splineUrl={comp.splineUrl}
              title={comp.title}
              caption={comp.caption}
            />
          </div>
        )}

        {comp.type === 'resume-block' && (
          <div
            id={`portfolio-comp-${comp.id}-media`}
            onClick={handleSelect(`portfolio-comp-${comp.id}-media`)}
            className={getSelectableClass(`portfolio-comp-${comp.id}-media`, 'p-5 rounded-2xl border border-[#282A33] bg-[#181A1F]')}
          >
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FF6F3C] mb-4 font-bold">
              Embedded Resume Section: {comp.resumeSection}
            </h4>
            {comp.resumeSection === 'experience' && (
              <div className="space-y-4">
                {experience.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="text-left border-b border-[#282A33]/60 pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base gap-1">
                      <span className="font-bold text-[#F7F4EB]">{exp.role}</span>
                      <span className="text-[#5D8A8A] font-mono">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A8A49A] mt-0.5">{exp.company} • {exp.location}</p>
                  </div>
                ))}
              </div>
            )}
            {comp.resumeSection === 'skills' && (
              <div className="flex flex-wrap gap-2">
                {skills.flatMap((s) => s.skills).slice(0, 12).map((sk) => (
                  <span key={sk} className="text-xs sm:text-sm font-mono px-3 py-1 rounded bg-[#121316] text-[#5D8A8A] border border-[#282A33]">
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // --- SECTIONS ---

  // 1. Hero Section
  const renderHeroSection = () => (
    <section
      id="portfolio-section-hero"
      onClick={handleSelect('portfolio-section-hero')}
      className={getSelectableClass('portfolio-section-hero', 'py-8 sm:py-16 text-center space-y-6 sm:space-y-8 border-b border-[#282A33] rounded-2xl p-3 sm:p-4 w-full max-w-full overflow-hidden')}
    >
      <div
        id="portfolio-hero-badge"
        onClick={handleSelect('portfolio-hero-badge')}
        className={getSelectableClass('portfolio-hero-badge', 'inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FF6F3C]/15 border border-[#FF6F3C]/40 text-[10px] sm:text-xs font-mono text-[#FF6F3C] font-semibold max-w-full truncate')}
      >
        <span className="w-2 h-2 rounded-full bg-[#FF6F3C] animate-pulse flex-shrink-0" />
        <span className="truncate">AVAILABLE FOR SENIOR ARCHITECTURE ROLES</span>
      </div>

      <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full overflow-hidden">
        <InlineEditableText
          elementId="portfolio-hero-name"
          value={profile.fullName}
          onSave={(val) => updateProfile({ fullName: val })}
          isEditable={isWebEditorEditMode}
          as="h1"
          className="text-3xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#F7F4EB] leading-tight break-words max-w-full"
        />

        <InlineEditableText
          elementId="portfolio-hero-headline"
          value={profile.headline}
          onSave={(val) => updateProfile({ headline: val })}
          isEditable={isWebEditorEditMode}
          as="p"
          className="text-base sm:text-xl md:text-2xl font-mono text-[#5D8A8A] font-medium break-words max-w-full"
        />

        <InlineEditableText
          elementId="portfolio-hero-summary"
          value={profile.summary}
          onSave={(val) => updateProfile({ summary: val })}
          isEditable={isWebEditorEditMode}
          as="p"
          multiline={true}
          className="text-xs sm:text-base lg:text-lg text-[#A8A49A] leading-relaxed max-w-3xl mx-auto pt-2 break-words"
        />
      </div>

      <div
        id="portfolio-hero-actions"
        onClick={handleSelect('portfolio-hero-actions')}
        className={getSelectableClass('portfolio-hero-actions', 'flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 p-2 rounded-xl w-full')}
      >
        <button
          onClick={() => setWebEditorCurrentPage('projects')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-lg shadow-[#FF6F3C]/20 cursor-pointer"
        >
          Explore Work Showcase
        </button>
        <button
          onClick={() => setWebEditorCurrentPage('resume')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#181A1F] hover:bg-[#22252D] text-[#F7F4EB] border border-[#282A33] font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
        >
          View Full Resume
        </button>
      </div>

      {/* Hero Dropped Components */}
      <div className="pt-4 w-full overflow-hidden">
        {pageComponents('home').map(renderComponentBlock)}
      </div>
    </section>
  )

  // 2. About Page / Section
  const renderAboutSection = () => (
    <section
      id="portfolio-section-about"
      onClick={handleSelect('portfolio-section-about')}
      className={getSelectableClass('portfolio-section-about', 'py-8 sm:py-16 space-y-8 border-b border-[#282A33] rounded-2xl p-3 sm:p-4 w-full max-w-full overflow-hidden')}
    >
      <div
        id="portfolio-about-heading"
        onClick={handleSelect('portfolio-about-heading')}
        className={getSelectableClass('portfolio-about-heading', 'flex flex-wrap items-center gap-2 text-xs font-mono text-[#F2B705] tracking-wider uppercase font-bold p-1 rounded-lg max-w-full')}
      >
        <span>[02 / ABOUT THE ARCHITECT]</span>
        <span className="text-[#5D8A8A]">BIOGRAPHY & ORIGIN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-full overflow-hidden">
        {/* Photo & Upload Area */}
        <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4 max-w-full">
          <div
            id="portfolio-about-avatar"
            onClick={handleSelect('portfolio-about-avatar')}
            className={getSelectableClass('portfolio-about-avatar', 'relative group w-40 h-40 sm:w-56 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#FF6F3C] shadow-2xl bg-[#181A1F] max-w-full')}
          >
            <img
              src={profile.avatarUrl || `${import.meta.env.BASE_URL}shaheen.jpg`}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
            {isWebEditorEditMode && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[#F7F4EB] transition-opacity cursor-pointer p-4 text-center"
              >
                <Upload className="w-8 h-8 mb-2 text-[#FF6F3C]" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase">Change Photo</span>
                <span className="text-[10px] font-mono text-[#A8A49A]">Upload new portrait</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />

          <div
            id="portfolio-about-meta"
            onClick={handleSelect('portfolio-about-meta')}
            className={getSelectableClass('portfolio-about-meta', 'space-y-1.5 p-1 rounded-xl max-w-full')}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#F7F4EB] truncate">{profile.fullName}</h3>
            <p className="text-xs sm:text-sm font-mono text-[#5D8A8A] flex items-center justify-center space-x-1.5 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-[#FF6F3C] flex-shrink-0" />
              <span className="truncate">{profile.location}</span>
            </p>
          </div>

          <div
            id="portfolio-about-stats"
            onClick={handleSelect('portfolio-about-stats')}
            className={getSelectableClass('portfolio-about-stats', 'p-3.5 rounded-xl bg-[#181A1F] border border-[#282A33] text-left w-full space-y-2 text-xs font-mono max-w-full')}
          >
            <div className="flex justify-between">
              <span className="text-[#A8A49A]">Status:</span>
              <span className="text-[#10b981] font-bold">Active & Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8A49A]">Experience:</span>
              <span className="text-[#F2B705] font-bold">6+ Years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8A49A]">Core Domain:</span>
              <span className="text-[#F7F4EB] truncate ml-1">Cloud Systems</span>
            </div>
          </div>
        </div>

        {/* Narrative & Custom Blocks */}
        <div className="lg:col-span-7 space-y-6 text-left w-full max-w-full overflow-hidden break-words">
          <div className="space-y-3 max-w-full">
            <h2
              id="portfolio-about-title"
              onClick={handleSelect('portfolio-about-title')}
              className={getSelectableClass('portfolio-about-title', 'text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F7F4EB] block break-words max-w-full leading-tight')}
            >
              ENGINEERING RESILIENT DISTRIBUTED SYSTEMS
            </h2>
            <InlineEditableText
              elementId="portfolio-about-bio"
              value={profile.summary}
              onSave={(val) => updateProfile({ summary: val })}
              isEditable={isWebEditorEditMode}
              as="p"
              multiline={true}
              className="text-sm sm:text-base font-body text-[#A8A49A] leading-relaxed pt-1 break-words"
            />
          </div>

          <div
            id="portfolio-about-standards"
            onClick={handleSelect('portfolio-about-standards')}
            className={getSelectableClass('portfolio-about-standards', 'p-4 rounded-xl bg-[#181A1F]/80 border border-[#282A33] space-y-2 max-w-full break-words')}
          >
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#FF6F3C] font-bold">
              Architectural Standards
            </h4>
            <p className="text-xs sm:text-sm text-[#A8A49A] leading-relaxed break-words">
              Based in Aluva, Kerala with comprehensive hands-on leadership directing high-scale cloud platforms, Kubernetes deployments, and low-latency API networks.
            </p>
          </div>

          {/* About Page Dropped Components */}
          <div className="space-y-4 max-w-full overflow-hidden">
            {pageComponents('about').map(renderComponentBlock)}
          </div>
        </div>
      </div>
    </section>
  )

  // 3. Multi-Page Resume Section (Work Experience, Education, Skills, Certifications)
  const renderResumeSection = () => (
    <section
      id="portfolio-section-resume"
      onClick={handleSelect('portfolio-section-resume')}
      className={getSelectableClass('portfolio-section-resume', 'py-8 sm:py-16 space-y-10 border-b border-[#282A33] text-left rounded-2xl p-3 sm:p-4 w-full max-w-full overflow-hidden')}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#282A33] pb-5">
        <div>
          <div
            id="portfolio-resume-heading"
            onClick={handleSelect('portfolio-resume-heading')}
            className={getSelectableClass('portfolio-resume-heading', 'flex flex-wrap items-center gap-2 text-xs font-mono text-[#F2B705] tracking-wider uppercase font-bold p-1 rounded-lg')}
          >
            <span>[03 / MULTI-PAGE RESUME SYSTEM]</span>
            <span className="text-[#5D8A8A]">CURRICULUM VITAE</span>
          </div>
          <h2
            id="portfolio-resume-title"
            onClick={handleSelect('portfolio-resume-title')}
            className={getSelectableClass('portfolio-resume-title', 'text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F7F4EB] mt-2 block break-words max-w-full leading-tight')}
          >
            CAREER TIMELINE & CREDENTIALS
          </h2>
        </div>
        <span className="text-xs sm:text-sm font-mono text-[#5D8A8A] font-medium">
          Verified Technical Record
        </span>
      </div>

      {/* Work Experience */}
      <div
        id="portfolio-resume-experience"
        onClick={handleSelect('portfolio-resume-experience')}
        className={getSelectableClass('portfolio-resume-experience', 'space-y-8 p-2 rounded-2xl')}
      >
        <div className="flex items-center space-x-2.5 text-base sm:text-lg font-mono font-bold text-[#FF6F3C] uppercase tracking-wider">
          <Briefcase className="w-5 h-5" />
          <span>Work Experience</span>
        </div>

        <div className="space-y-6">
          {experience.map((exp) => (
            <div
              key={exp.id}
              id={`portfolio-resume-exp-${exp.id}`}
              onClick={handleSelect(`portfolio-resume-exp-${exp.id}`)}
              className={getSelectableClass(`portfolio-resume-exp-${exp.id}`, 'p-6 rounded-2xl bg-[#181A1F] border border-[#282A33] space-y-3.5')}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3
                    id={`portfolio-resume-exp-${exp.id}-role`}
                    onClick={handleSelect(`portfolio-resume-exp-${exp.id}-role`)}
                    className={getSelectableClass(`portfolio-resume-exp-${exp.id}-role`, 'text-xl sm:text-2xl font-bold text-[#F7F4EB] inline-block')}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-sm sm:text-base font-mono text-[#5D8A8A] mt-0.5">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-[#121316] border border-[#282A33] text-[#F2B705] self-start sm:self-auto font-bold">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p
                id={`portfolio-resume-exp-${exp.id}-desc`}
                onClick={handleSelect(`portfolio-resume-exp-${exp.id}-desc`)}
                className={getSelectableClass(`portfolio-resume-exp-${exp.id}-desc`, 'text-sm sm:text-base text-[#A8A49A] leading-relaxed p-1 rounded')}
              >
                {exp.description}
              </p>
              <ul className="space-y-1.5 text-sm sm:text-base text-[#A8A49A] list-disc list-inside">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div
        id="portfolio-resume-skills"
        onClick={handleSelect('portfolio-resume-skills')}
        className={getSelectableClass('portfolio-resume-skills', 'space-y-5 p-2 rounded-2xl')}
      >
        <div className="flex items-center space-x-2.5 text-base sm:text-lg font-mono font-bold text-[#F2B705] uppercase tracking-wider">
          <Cpu className="w-5 h-5" />
          <span>Technical Proficiencies</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((cat) => (
            <div
              key={cat.id}
              id={`portfolio-resume-skill-${cat.id}`}
              onClick={handleSelect(`portfolio-resume-skill-${cat.id}`)}
              className={getSelectableClass(`portfolio-resume-skill-${cat.id}`, 'p-5 rounded-2xl bg-[#181A1F] border border-[#282A33] space-y-3')}
            >
              <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#5D8A8A] font-bold">
                {cat.categoryName}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((sk) => (
                  <span key={sk} className="text-xs sm:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#121316] text-[#F7F4EB] border border-[#282A33]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          id="portfolio-resume-education"
          onClick={handleSelect('portfolio-resume-education')}
          className={getSelectableClass('portfolio-resume-education', 'space-y-4 p-2 rounded-2xl')}
        >
          <div className="flex items-center space-x-2.5 text-base sm:text-lg font-mono font-bold text-[#5D8A8A] uppercase tracking-wider">
            <GraduationCap className="w-5 h-5" />
            <span>Academic Background</span>
          </div>
          {education.map((edu) => (
            <div
              key={edu.id}
              id={`portfolio-resume-edu-${edu.id}`}
              onClick={handleSelect(`portfolio-resume-edu-${edu.id}`)}
              className={getSelectableClass(`portfolio-resume-edu-${edu.id}`, 'p-5 rounded-2xl bg-[#181A1F] border border-[#282A33]')}
            >
              <h4 className="text-lg sm:text-xl font-bold text-[#F7F4EB]">{edu.degree}</h4>
              <p className="text-sm text-[#5D8A8A] mt-0.5">{edu.institution} • {edu.fieldOfStudy}</p>
              <span className="text-xs font-mono text-[#A8A49A] mt-1 block">{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </div>

        <div
          id="portfolio-resume-certifications"
          onClick={handleSelect('portfolio-resume-certifications')}
          className={getSelectableClass('portfolio-resume-certifications', 'space-y-4 p-2 rounded-2xl')}
        >
          <div className="flex items-center space-x-2.5 text-base sm:text-lg font-mono font-bold text-[#B39ACD] uppercase tracking-wider">
            <Award className="w-5 h-5" />
            <span>Honors & Certifications</span>
          </div>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              id={`portfolio-resume-cert-${cert.id}`}
              onClick={handleSelect(`portfolio-resume-cert-${cert.id}`)}
              className={getSelectableClass(`portfolio-resume-cert-${cert.id}`, 'p-5 rounded-2xl bg-[#181A1F] border border-[#282A33]')}
            >
              <h4 className="text-lg sm:text-xl font-bold text-[#F7F4EB]">{cert.title}</h4>
              <p className="text-sm text-[#5D8A8A] mt-0.5">{cert.issuer}</p>
              <span className="text-xs font-mono text-[#A8A49A] mt-1 block">{cert.issueDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Page Dropped Components */}
      <div>
        {pageComponents('resume').map(renderComponentBlock)}
      </div>
    </section>
  )

  // 4. Projects Page / Section
  const renderProjectsSection = () => (
    <section
      id="portfolio-section-projects"
      onClick={handleSelect('portfolio-section-projects')}
      className={getSelectableClass('portfolio-section-projects', 'py-8 sm:py-16 space-y-10 border-b border-[#282A33] text-left rounded-2xl p-3 sm:p-4 w-full max-w-full overflow-hidden')}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#282A33] pb-5">
        <div>
          <div
            id="portfolio-projects-heading"
            onClick={handleSelect('portfolio-projects-heading')}
            className={getSelectableClass('portfolio-projects-heading', 'flex flex-wrap items-center gap-2 text-xs font-mono text-[#F2B705] tracking-wider uppercase font-bold p-1 rounded-lg')}
          >
            <span>[04 / WORK ARTIFACTS]</span>
            <span className="text-[#5D8A8A]">ENGINEERING PORTFOLIO</span>
          </div>
          <h2
            id="portfolio-projects-title"
            onClick={handleSelect('portfolio-projects-title')}
            className={getSelectableClass('portfolio-projects-title', 'text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F7F4EB] mt-2 block break-words max-w-full leading-tight')}
          >
            FEATURED ARCHITECTURES
          </h2>
        </div>
        <span className="text-xs sm:text-sm font-mono text-[#FF6F3C] font-semibold">
          {portfolioCards.length} Projects Deployed
        </span>
      </div>

      <div
        id="portfolio-projects-grid"
        onClick={handleSelect('portfolio-projects-grid')}
        className={getSelectableClass('portfolio-projects-grid', 'grid grid-cols-1 md:grid-cols-2 gap-7 p-2 rounded-2xl')}
      >
        {portfolioCards.map((card) => (
          <div
            key={card.id}
            id={`portfolio-project-${card.id}`}
            onClick={handleSelect(`portfolio-project-${card.id}`)}
            className={getSelectableClass(`portfolio-project-${card.id}`, 'rounded-2xl border border-[#282A33] bg-[#181A1F] overflow-hidden group flex flex-col justify-between shadow-xl')}
          >
            {card.imageUrl && (
              <div className="aspect-[16/9] overflow-hidden bg-[#121316] relative">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {card.badge && (
                  <span className="absolute top-3 right-3 text-xs font-mono px-2.5 py-1 rounded bg-[#121316]/90 border border-[#FF6F3C] text-[#FF6F3C] font-bold">
                    {card.badge}
                  </span>
                )}
              </div>
            )}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  id={`portfolio-project-${card.id}-title`}
                  onClick={handleSelect(`portfolio-project-${card.id}-title`)}
                  className={getSelectableClass(`portfolio-project-${card.id}-title`, 'text-xl sm:text-2xl font-bold text-[#F7F4EB] group-hover:text-[#FF6F3C] transition-colors inline-block')}
                >
                  {card.title}
                </h3>
                <p
                  id={`portfolio-project-${card.id}-desc`}
                  onClick={handleSelect(`portfolio-project-${card.id}-desc`)}
                  className={getSelectableClass(`portfolio-project-${card.id}-desc`, 'text-sm sm:text-base text-[#A8A49A] mt-2 leading-relaxed p-1 rounded')}
                >
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#282A33] flex items-center justify-between gap-3">
                <div
                  id={`portfolio-project-${card.id}-tags`}
                  onClick={handleSelect(`portfolio-project-${card.id}-tags`)}
                  className={getSelectableClass(`portfolio-project-${card.id}-tags`, 'flex flex-wrap gap-1.5 p-0.5 rounded')}
                >
                  {card.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded bg-[#121316] text-[#5D8A8A] border border-[#282A33]">
                      {tag}
                    </span>
                  ))}
                </div>
                {card.linkUrl && (
                  <a
                    href={card.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#FF6F3C] text-[#121316] hover:bg-[#FF6F3C]/90 flex-shrink-0"
                    title="Launch Project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Page Dropped Components */}
      <div>
        {pageComponents('projects').map(renderComponentBlock)}
      </div>
    </section>
  )

  // 5. Contact Page / Section
  const renderContactSection = () => (
    <section
      id="portfolio-section-contact"
      onClick={handleSelect('portfolio-section-contact')}
      className={getSelectableClass('portfolio-section-contact', 'py-8 sm:py-16 space-y-10 text-left rounded-2xl p-3 sm:p-4 w-full max-w-full overflow-hidden')}
    >
      <div
        id="portfolio-contact-heading"
        onClick={handleSelect('portfolio-contact-heading')}
        className={getSelectableClass('portfolio-contact-heading', 'flex flex-wrap items-center gap-2 text-xs font-mono text-[#F2B705] tracking-wider uppercase font-bold p-1 rounded-lg')}
      >
        <span>[05 / CONTACT & DISCOVERY]</span>
        <span className="text-[#5D8A8A]">GET IN TOUCH</span>
      </div>

      <div
        id="portfolio-contact-card"
        onClick={handleSelect('portfolio-contact-card')}
        className={getSelectableClass('portfolio-contact-card', 'max-w-2xl mx-auto p-5 sm:p-12 rounded-2xl sm:rounded-3xl bg-[#181A1F] border border-[#282A33] shadow-2xl space-y-6 sm:space-y-8 text-center w-full max-w-full overflow-hidden')}
      >
        <h2
          id="portfolio-contact-title"
          onClick={handleSelect('portfolio-contact-title')}
          className={getSelectableClass('portfolio-contact-title', 'text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F7F4EB] block break-words max-w-full leading-tight')}
        >
          INITIATE A CONVERSATION
        </h2>
        <p
          id="portfolio-contact-desc"
          onClick={handleSelect('portfolio-contact-desc')}
          className={getSelectableClass('portfolio-contact-desc', 'text-base sm:text-lg text-[#A8A49A] leading-relaxed p-1 rounded')}
        >
          Open to full-time technical leadership, principal architecture, and consulting advisory roles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <a
            id="portfolio-contact-email"
            onClick={handleSelect('portfolio-contact-email')}
            href={`mailto:${profile.email}`}
            className={getSelectableClass('portfolio-contact-email', 'p-4 rounded-2xl bg-[#121316] border border-[#282A33] hover:border-[#FF6F3C] flex items-center space-x-3 transition-colors')}
          >
            <Mail className="w-5 h-5 text-[#FF6F3C]" />
            <div className="min-w-0">
              <span className="text-xs font-mono text-[#A8A49A] block">Email</span>
              <span className="text-sm font-semibold text-[#F7F4EB] truncate block">{profile.email}</span>
            </div>
          </a>

          <div
            id="portfolio-contact-location"
            onClick={handleSelect('portfolio-contact-location')}
            className={getSelectableClass('portfolio-contact-location', 'p-4 rounded-2xl bg-[#121316] border border-[#282A33] flex items-center space-x-3')}
          >
            <MapPin className="w-5 h-5 text-[#5D8A8A]" />
            <div className="min-w-0">
              <span className="text-xs font-mono text-[#A8A49A] block">Location</span>
              <span className="text-sm font-semibold text-[#F7F4EB] truncate block">{profile.location}</span>
            </div>
          </div>
        </div>

        <div
          id="portfolio-contact-socials"
          onClick={handleSelect('portfolio-contact-socials')}
          className={getSelectableClass('portfolio-contact-socials', 'flex items-center justify-center space-x-4 pt-2 p-1 rounded-xl')}
        >
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-[#121316] border border-[#282A33] hover:border-[#FF6F3C] text-[#F7F4EB]"
              title="GitHub Profile"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-[#121316] border border-[#282A33] hover:border-[#FF6F3C] text-[#F7F4EB]"
              title="Personal Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Contact Page Dropped Components */}
      <div>
        {pageComponents('contact').map(renderComponentBlock)}
      </div>
    </section>
  )

  // Layout container sizing according to viewport
  const getViewportContainerStyles = () => {
    switch (webEditorViewport) {
      case 'mobile':
        return 'w-full max-w-[390px] mx-auto rounded-[2.5rem] border-4 sm:border-8 border-[#282A33] shadow-2xl p-4 sm:p-5 overflow-hidden box-border'
      case 'tablet':
        return 'w-full max-w-[768px] mx-auto rounded-3xl border-4 border-[#282A33] shadow-2xl p-6 sm:p-8 overflow-hidden box-border'
      case 'desktop':
      default:
        return 'w-full max-w-5xl mx-auto rounded-2xl border border-[#282A33] shadow-2xl p-6 sm:p-12 overflow-hidden box-border'
    }
  }

  // Force burger menu when viewport is mobile/tablet, or on actual smaller screens
  const isCompactViewport = webEditorViewport === 'mobile' || webEditorViewport === 'tablet'

  return (
    <div
      onClick={() => setSelectedElementId(null)}
      className="w-full flex justify-center py-4"
    >
      <div
        className={`bg-[#121316] text-[#F7F4EB] transition-all duration-300 relative ${getViewportContainerStyles()}`}
        style={{ fontFamily: webEditorFont ? `"${webEditorFont}", monospace` : "'Courier Prime', monospace" }}
      >
        {/* Dynamic styling for all portfolio web elements */}
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
              return `[id="${id}"], [data-element-id="${id}"] { ${rules.join(' ')} }`
            })
            .join('\n')}
        `}</style>
        {/* Mobile Device Speaker Notch */}
        {webEditorViewport === 'mobile' && (
          <div className="w-32 h-4.5 bg-[#282A33] rounded-full mx-auto mb-6 flex items-center justify-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#121316]" />
            <span className="w-8 h-1 rounded-full bg-[#181A1F]" />
          </div>
        )}

        {/* Website Header & Embedded Navigation */}
        <header
          id="portfolio-header"
          onClick={handleSelect('portfolio-header')}
          className={getSelectableClass('portfolio-header', 'border-b border-[#282A33] pb-5 flex items-center justify-between gap-4 relative z-30 p-2 rounded-xl')}
        >
          <div
            id="portfolio-brand"
            onClick={handleSelect('portfolio-brand')}
            className={getSelectableClass('portfolio-brand', 'flex items-center space-x-3 text-left p-1 rounded-lg')}
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6F3C] text-[#121316] flex items-center justify-center font-bold text-base shadow-md font-mono">
              {profile.fullName ? profile.fullName.charAt(0) : 'R'}
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[#F7F4EB] block">
                {profile.fullName}
              </span>
              <span className="text-xs font-mono text-[#5D8A8A] block font-semibold">
                STUDIO PORTFOLIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Expanded on desktop only) */}
          {!isCompactViewport ? (
            <nav
              id="portfolio-nav"
              onClick={handleSelect('portfolio-nav')}
              className={getSelectableClass('portfolio-nav', 'hidden md:flex items-center space-x-1.5 text-sm font-mono p-1 rounded-lg')}
            >
              {navigationPages.map((p) => {
                const isActive = webEditorCurrentPage === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => handleNavClick(p.id)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                      isActive && webEditorMode === 'multi-page'
                        ? 'bg-[#FF6F3C] text-[#121316] font-bold shadow-xs'
                        : 'text-[#A8A49A] hover:text-[#FF6F3C] hover:bg-white/5'
                    }`}
                  >
                    {p.label}
                  </button>
                )
              })}
            </nav>
          ) : null}

          {/* Burger Menu Button (Visible on Mobile & Tablet, or compact screens) */}
          <div className={`${!isCompactViewport ? 'md:hidden' : ''} flex items-center space-x-2`}>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#181A1F] text-[#FF6F3C] border border-[#282A33] uppercase font-bold">
              {webEditorCurrentPage}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-[#181A1F] border border-[#282A33] hover:border-[#FF6F3C] text-[#F7F4EB] flex items-center justify-center cursor-pointer transition-colors shadow-md"
              title="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FF6F3C]" />
              ) : (
                <div className="flex flex-col space-y-1.5 items-center justify-center w-5">
                  <span className="w-5 h-0.5 bg-[#FF6F3C] rounded-full" />
                  <span className="w-4 h-0.5 bg-[#F7F4EB] rounded-full" />
                  <span className="w-5 h-0.5 bg-[#5D8A8A] rounded-full" />
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Mobile & Tablet Full-Screen Navigation Overlay Modal */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 top-24 z-50 rounded-3xl bg-[#181A1F]/95 backdrop-blur-2xl border-2 border-[#FF6F3C] p-6 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#282A33]">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#F2B705] uppercase">
                    [NAVIGATION MATRIX]
                  </span>
                  <span className="text-xs font-mono text-[#5D8A8A] uppercase">
                    SELECT ROUTE
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-[#A8A49A] hover:text-[#F7F4EB]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-2.5">
                {navigationPages.map((p) => {
                  const isActive = webEditorCurrentPage === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleNavClick(p.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'border-[#FF6F3C] bg-[#FF6F3C]/15 text-[#F7F4EB] shadow-md'
                          : 'border-[#282A33] bg-[#121316] text-[#A8A49A] hover:border-[#FF6F3C]/50 hover:text-[#F7F4EB]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-base">{p.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-[#5D8A8A] font-bold">
                              {p.num} //
                            </span>
                            <span className="text-base font-display font-extrabold uppercase">
                              {p.label}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-[#A8A49A] mt-0.5">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? 'text-[#FF6F3C]' : 'text-[#282A33]'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>

              {/* Mode switch inside burger menu */}
              <div className="pt-3 border-t border-[#282A33] flex items-center justify-between">
                <span className="text-xs font-mono text-[#A8A49A]">Layout Structure:</span>
                <button
                  onClick={() => setWebEditorMode(webEditorMode === 'multi-page' ? 'single-page' : 'multi-page')}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#121316] border border-[#282A33] text-[#5D8A8A] hover:text-[#FF6F3C]"
                >
                  Switch to {webEditorMode === 'multi-page' ? 'Single-Page Scroll' : 'Multi-Page'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Website Content: Multi-Page vs Single-Page */}
        {webEditorMode === 'multi-page' ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={webEditorCurrentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {webEditorCurrentPage === 'home' && renderHeroSection()}
              {webEditorCurrentPage === 'about' && renderAboutSection()}
              {webEditorCurrentPage === 'resume' && renderResumeSection()}
              {webEditorCurrentPage === 'projects' && renderProjectsSection()}
              {webEditorCurrentPage === 'contact' && renderContactSection()}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Single-Page Landing Flow */
          <div className="space-y-6">
            {renderHeroSection()}
            {renderAboutSection()}
            {renderResumeSection()}
            {renderProjectsSection()}
            {renderContactSection()}
          </div>
        )}

        {/* Website Footer */}
        <footer
          id="portfolio-footer"
          onClick={handleSelect('portfolio-footer')}
          className={getSelectableClass('portfolio-footer', 'pt-10 mt-10 border-t border-[#282A33] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-mono text-[#A8A49A] gap-3 p-3 rounded-xl')}
        >
          <div
            id="portfolio-footer-copy"
            onClick={handleSelect('portfolio-footer-copy')}
            className={getSelectableClass('portfolio-footer-copy', 'p-1 rounded')}
          >
            © 2026 {profile.fullName} • Aluva, Kerala
          </div>
          <div
            id="portfolio-footer-badge"
            onClick={handleSelect('portfolio-footer-badge')}
            className={getSelectableClass('portfolio-footer-badge', 'text-[#FF6F3C] flex items-center space-x-1.5 font-semibold p-1 rounded')}
          >
            <span>BUILT WITH REZUMEMAKER WORKERS' STUDIO</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
