import React from 'react'
import { motion, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import { Sparkles, Orbit, Compass, Globe, Sun, ArrowUpRight } from 'lucide-react'

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
    <div className="w-full min-h-screen bg-[#F2EBD7] text-[#0D1B2A] font-sans antialiased selection:bg-[#FF6F3C] selection:text-[#F2EBD7] p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative Retro Grid Lines Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#0D1B2A 1px, transparent 1px), linear-gradient(to right, #0D1B2A 1px, transparent 1px)`,
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
          className="border-b-2 border-[#0D1B2A] pb-8 pt-4"
        >
          {/* Top Bar / Category Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-[#FF6F3C]">
              <span>✦</span>
              <span>RETRO FUTURISTIC ARCHIVE</span>
              <span>✦</span>
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#5D8A8A] uppercase">
              NOSTALGIC BY DESIGN • FUTURISTIC BY VISION
            </div>
          </div>

          {/* Main Title Layout with Atomic Graphic Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#0D1B2A] uppercase leading-[0.95]">
                RETRO <br />
                <span className="text-[#FF6F3C] italic font-serif">FUTURISTIC</span> <br />
                STUDIO
              </h1>
              <p className="text-sm sm:text-base font-body text-[#3D5A73] max-w-xl leading-relaxed">
                {profile.headline} — Crafted by{' '}
                <strong className="text-[#0D1B2A]">{profile.fullName}</strong> in {profile.location}.
                Blending 1960s space-age optimism with high-performance modern web engineering.
              </p>
            </div>

            {/* Atomic Sunburst Motif Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#FF6F3C] flex items-center justify-center p-4 shadow-xl border-4 border-[#0D1B2A]">
                {/* Concentric Orbital Ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#F2EBD7]/60 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="text-center text-[#F2EBD7] space-y-1">
                  <span className="text-xs font-mono tracking-widest block text-[#F2B705]">✦ 2080 SPEC ✦</span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((project, index) => {
            const theme = cardColorThemes[index % cardColorThemes.length]

            return (
              <motion.article
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className={`group rounded-xl border-2 border-[#0D1B2A] ${theme.bg} ${theme.text} overflow-hidden flex flex-col justify-between shadow-[4px_4px_0px_0px_#0D1B2A] transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_#0D1B2A]`}
              >
                {/* Card Header Bar with Geometric Pattern Tag */}
                <div className="p-4 border-b border-[#0D1B2A]/25 flex items-center justify-between">
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
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#0D1B2A]/20 bg-[#0D1B2A]/10">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0D1B2A]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
                )}

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold tracking-tight uppercase leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs font-body opacity-90 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div className="pt-3 border-t border-[#0D1B2A]/20 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0D1B2A]/15 border border-[#0D1B2A]/20 font-medium"
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
        <footer className="border-t-2 border-[#0D1B2A] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono tracking-widest uppercase text-[#3D5A73] gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-[#FF6F3C]">✦</span>
            <span>LOOK BACK. MOVE FORWARD.</span>
          </div>
          <div className="text-[11px] text-[#0D1B2A] font-bold">
            INSPIRED THEN • DESIGNED NOW
          </div>
          <div>
            REZUME STUDIO © 2080 SPEC
          </div>
        </footer>
      </div>
    </div>
  )
}
