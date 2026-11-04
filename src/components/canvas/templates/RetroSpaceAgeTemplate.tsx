import React from 'react'
import { motion, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import { Sparkles, Orbit, Compass, Globe, Sun, ArrowUpRight } from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import { getElementInlineStyle } from '../../../utils/selectable'

interface RetroSpaceAgeTemplateProps {
  cards: PortfolioProjectCard[]
  profile: ProfileData
  selectedAnimation?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const RetroSpaceAgeTemplate: React.FC<RetroSpaceAgeTemplateProps> = ({
  cards,
  profile,
}) => {
  const { selectedElementId, setSelectedElementId, elementStyles } = useResumeStore()

  const getElementStyle = (id: string, baseStyle?: React.CSSProperties): React.CSSProperties => {
    return getElementInlineStyle(id, elementStyles, baseStyle)
  }

  const getSelectableClass = (id: string, baseClass = '') => {
    const isSelected = selectedElementId === id
    return `${baseClass} cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'ring-4 ring-[#FF6F3C] ring-offset-2 ring-offset-[#E6DFD1] shadow-[0_0_15px_rgba(255,111,60,0.5)] rounded-xl relative z-20'
        : 'hover:ring-2 hover:ring-[#FF6F3C]/50 hover:ring-offset-1 rounded-xl'
    }`
  }

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  // Retro color assignments matching the Thegrafx palette
  const cardColorThemes = [
    {
      bg: 'bg-[#FF6F3C]', // Burnt Orange
      text: 'text-[#F2EBD7]',
      accent: 'text-[#F2EBD7]',
      badgeBg: 'bg-[#0D1B2A]/25 text-[#F2EBD7] border-[#F2EBD7]/40',
      icon: <Orbit className="w-5 h-5 text-[#F2EBD7]" />,
      patternName: 'ORBITAL PLANE',
    },
    {
      bg: 'bg-[#F2EBD7]', // Space Cream
      text: 'text-[#0D1B2A]',
      accent: 'text-[#FF6F3C]',
      badgeBg: 'bg-[#0D1B2A]/10 text-[#0D1B2A] border-[#0D1B2A]/20',
      icon: <Sparkles className="w-5 h-5 text-[#FF6F3C]" />,
      patternName: 'STELLAR BEACON',
    },
    {
      bg: 'bg-[#5D8A8A]', // Retro Teal
      text: 'text-[#F2EBD7]',
      accent: 'text-[#F2EBD7]',
      badgeBg: 'bg-[#0D1B2A]/25 text-[#F2EBD7] border-[#F2EBD7]/30',
      icon: <Compass className="w-5 h-5 text-[#F2EBD7]" />,
      patternName: 'PATINA ARCHWAY',
    },
    {
      bg: 'bg-[#0D1B2A]', // Cosmic Navy
      text: 'text-[#F2EBD7]',
      accent: 'text-[#B39ACD]',
      badgeBg: 'bg-[#B39ACD]/15 text-[#B39ACD] border-[#B39ACD]/30',
      icon: <Globe className="w-5 h-5 text-[#5D8A8A]" />,
      patternName: 'DEEP HORIZON',
    },
    {
      bg: 'bg-[#B39ACD]', // Vintage Lavender
      text: 'text-[#0D1B2A]',
      accent: 'text-[#0D1B2A]',
      badgeBg: 'bg-[#0D1B2A]/15 text-[#0D1B2A] border-[#0D1B2A]/25',
      icon: <Orbit className="w-5 h-5 text-[#0D1B2A]" />,
      patternName: 'SYNTH SPHERE',
    },
    {
      bg: 'bg-[#F2B705]', // Sunburst Yellow
      text: 'text-[#0D1B2A]',
      accent: 'text-[#0D1B2A]',
      badgeBg: 'bg-[#0D1B2A]/15 text-[#0D1B2A] border-[#0D1B2A]/25',
      icon: <Sun className="w-5 h-5 text-[#0D1B2A]" />,
      patternName: 'ATOMIC SUNBURST',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-[#E6DFD1] text-[#121316] font-sans antialiased selection:bg-[#FF6F3C] selection:text-[#121316] p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative Retro Grid Lines Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#121316 1px, transparent 1px), linear-gradient(to right, #121316 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* ========================================================= */}
        {/* RETRO-FUTURISTIC HERO POSTER HEADER                       */}
        {/* ========================================================= */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          id="template-retro-header"
          onClick={handleSelect('template-retro-header')}
          style={getElementStyle('template-retro-header')}
          className={getSelectableClass('template-retro-header', 'border-b-2 border-[#121316] pb-8 pt-4 p-4 rounded-xl')}
        >
          {/* Top Bar / Category Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-[#FF6F3C]">
              <span>RETRO FUTURISTIC ARCHIVE</span>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#5D8A8A] uppercase">
              NOSTALGIC BY DESIGN • FUTURISTIC BY VISION
            </div>
          </div>

          {/* Main Title Layout with Atomic Graphic Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h1
                id="template-retro-title"
                onClick={handleSelect('template-retro-title')}
                style={getElementStyle('template-retro-title')}
                className={getSelectableClass('template-retro-title', 'text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#121316] uppercase leading-[0.95] inline-block p-1 rounded-lg')}
              >
                RETRO <br />
                <span className="text-[#FF6F3C] italic font-serif">FUTURISTIC</span> <br />
                STUDIO
              </h1>
              <p
                id="template-retro-headline"
                onClick={handleSelect('template-retro-headline')}
                style={getElementStyle('template-retro-headline')}
                className={getSelectableClass('template-retro-headline', 'text-sm sm:text-base font-body text-[#4D4E54] max-w-xl leading-relaxed p-1 rounded-lg')}
              >
                {profile.headline} — Crafted by{' '}
                <strong className="text-[#121316]">{profile.fullName}</strong> in {profile.location}.
                Blending 1960s space-age optimism with high-performance modern web engineering.
              </p>
            </div>

            {/* Atomic Sunburst Motif Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div
                id="template-retro-badge"
                onClick={handleSelect('template-retro-badge')}
                className={getSelectableClass('template-retro-badge', 'relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#FF6F3C] flex items-center justify-center p-4 shadow-xl border-4 border-[#121316]')}
              >
                {/* Concentric Orbital Ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#F7F4EB]/60 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="text-center text-[#F7F4EB] space-y-1">
                  <span className="text-xs font-mono tracking-widest block text-[#F2B705]">TYPEWRITER SPEC</span>
                  <div className="font-display font-bold text-lg tracking-tight uppercase leading-none">
                    ATOMIC
                    <br />
                    CANVAS
                  </div>
                  <span className="text-[9px] font-mono tracking-wider opacity-80 block">
                    {cards.length} WORKS CATALOGED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* ========================================================= */}
        {/* ASYMMETRIC COLOR-BLOCK PROJECT GRID                       */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="template-retro-grid"
          onClick={handleSelect('template-retro-grid')}
          className={getSelectableClass('template-retro-grid', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 rounded-2xl')}
        >
          {cards.map((project, index) => {
            const theme = cardColorThemes[index % cardColorThemes.length]

            return (
              <motion.article
                key={project.id}
                id={`template-retro-card-${project.id}`}
                onClick={handleSelect(`template-retro-card-${project.id}`)}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className={getSelectableClass(
                  `template-retro-card-${project.id}`,
                  `group rounded-xl border-2 border-[#121316] ${theme.bg} ${theme.text} overflow-hidden flex flex-col justify-between shadow-[4px_4px_0px_0px_#121316] transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_#121316]`
                )}
              >
                {/* Card Header Bar with Geometric Pattern Tag */}
                <div className="p-4 border-b border-[#121316]/25 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {theme.icon}
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-90">
                      {theme.patternName}
                    </span>
                  </div>
                  {project.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.badgeBg}`}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Project Image Box with Retro Halftone Aspect */}
                {project.imageUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#121316]/20 bg-[#121316]/10">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#121316]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
                )}

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      id={`template-retro-card-${project.id}-title`}
                      onClick={handleSelect(`template-retro-card-${project.id}-title`)}
                      className={getSelectableClass(`template-retro-card-${project.id}-title`, 'text-xl font-display font-bold tracking-tight uppercase leading-snug inline-block')}
                    >
                      {project.title}
                    </h3>
                    <p
                      id={`template-retro-card-${project.id}-desc`}
                      onClick={handleSelect(`template-retro-card-${project.id}-desc`)}
                      className={getSelectableClass(`template-retro-card-${project.id}-desc`, 'text-xs font-body opacity-90 leading-relaxed line-clamp-3 p-0.5 rounded')}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div className="pt-3 border-t border-[#121316]/20 space-y-3">
                    <div
                      id={`template-retro-card-${project.id}-tags`}
                      onClick={handleSelect(`template-retro-card-${project.id}-tags`)}
                      className={getSelectableClass(`template-retro-card-${project.id}-tags`, 'flex flex-wrap gap-1.5 p-0.5 rounded')}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#121316]/15 border border-[#121316]/20 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {project.linkUrl && (
                      <div className="flex justify-end pt-1">
                        <a
                          href={project.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-xs font-mono font-bold tracking-wider uppercase underline underline-offset-4 hover:opacity-75 transition-opacity"
                        >
                          <span>Explore Spec</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* RETRO POSTER FOOTER                                       */}
        {/* ========================================================= */}
        <footer
          id="template-retro-footer"
          onClick={handleSelect('template-retro-footer')}
          className={getSelectableClass('template-retro-footer', 'border-t-2 border-[#121316] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono tracking-widest uppercase text-[#4D4E54] gap-2 p-2 rounded-xl')}
        >
          <div className="flex items-center space-x-2">
            <span>LOOK BACK. MOVE FORWARD.</span>
          </div>
          <div className="text-[11px] text-[#121316] font-bold">
            INSPIRED THEN • DESIGNED NOW
          </div>
          <div>
            REZUME STUDIO © ARCHIVE SPEC
          </div>
        </footer>
      </div>
    </div>
  )
}
