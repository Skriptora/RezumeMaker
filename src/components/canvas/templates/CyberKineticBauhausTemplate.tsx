import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import { ExternalLink, ChevronRight } from 'lucide-react'

interface CyberKineticBauhausTemplateProps {
  cards: PortfolioProjectCard[]
  profile: ProfileData
  selectedAnimation?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const CyberKineticBauhausTemplate: React.FC<CyberKineticBauhausTemplateProps> = ({
  cards,
  profile,
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0)
  const activeProject = cards[activeProjectIndex] || cards[0]

  return (
    <div className="w-full min-h-screen bg-[#0D1B2A] text-[#F2EBD7] font-sans antialiased p-4 sm:p-8 lg:p-12 selection:bg-[#FF6F3C] selection:text-[#F2EBD7] relative overflow-hidden">
      {/* Precision Diagonal Construction Background Line */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-[100vh] pointer-events-none opacity-[0.04]"
        style={{
          background: 'linear-gradient(135deg, #FF6F3C 25%, transparent 25%) -50px 0',
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Kinetic Header */}
        <header className="border-b border-[#223854] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F2B705]">
              <span>[01 / CONSTRUCTIVIST]</span>
              <span>✦</span>
              <span className="text-[#5D8A8A]">CYBER-KINETIC MESH</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-retro font-extrabold uppercase tracking-tight text-[#F2EBD7] leading-none">
              CYBER <span className="text-[#FF6F3C]">KINETIC</span>
            </h1>
            <p className="text-xs sm:text-sm font-body text-[#A3B4C8] max-w-lg">
              {profile.fullName} • {profile.headline} • Based in {profile.location}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-right">
            <div className="p-3 rounded-lg bg-[#14243B] border border-[#223854] text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5D8A8A] block">
                Total Works
              </span>
              <span className="text-2xl font-mono font-bold text-[#FF6F3C]">
                {String(cards.length).padStart(2, '0')}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#14243B] border border-[#223854] text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B39ACD] block">
                Grid Spec
              </span>
              <span className="text-2xl font-mono font-bold text-[#F2B705]">
                BAUHAUS
              </span>
            </div>
          </div>
        </header>

        {/* 2-Column Split: Active Showcase + Kinetic List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Showcase Display (7 cols) */}
          <div className="lg:col-span-7 sticky top-24">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border-2 border-[#223854] bg-[#14243B] overflow-hidden shadow-2xl relative"
                >
                  {/* Decorative Banner Ribbon */}
                  <div className="px-5 py-3 bg-[#1B3150] border-b border-[#223854] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6F3C] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#F2B705] tracking-widest uppercase">
                        ACTIVE SPEC // {String(activeProjectIndex + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {activeProject.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/40 font-bold uppercase">
                        {activeProject.badge}
                      </span>
                    )}
                  </div>

                  {/* Hero Showcase Image */}
                  {activeProject.imageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#0D1B2A]">
                      <img
                        src={activeProject.imageUrl}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14243B] via-transparent to-transparent opacity-80" />
                    </div>
                  )}

                  {/* Showcase Details */}
                  <div className="p-6 space-y-4 text-left">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2EBD7] tracking-tight">
                      {activeProject.title}
                    </h2>
                    <p className="text-sm font-body text-[#A3B4C8] leading-relaxed">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-[#0D1B2A] border border-[#223854] text-[#5D8A8A] font-semibold"
                        >
                          ✦ {tag}
                        </span>
                      ))}
                    </div>

                    {activeProject.linkUrl && (
                      <div className="pt-4 border-t border-[#223854] flex justify-end">
                        <a
                          href={activeProject.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#F2EBD7] text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer"
                        >
                          <span>Launch Project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Kinetic Project Navigator (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5D8A8A] px-1 pb-1">
              Select Architecture Spec
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {cards.map((project, index) => {
                const isActive = activeProjectIndex === index
                return (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    onClick={() => setActiveProjectIndex(index)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? 'border-[#FF6F3C] bg-[#1B3150] shadow-lg shadow-[#FF6F3C]/10 translate-x-1'
                        : 'border-[#223854] bg-[#14243B]/60 hover:bg-[#14243B] hover:border-[#5D8A8A]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 min-w-0">
                        <span
                          className={`font-mono text-sm font-bold ${
                            isActive ? 'text-[#FF6F3C]' : 'text-[#5D8A8A]'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={`text-sm font-display font-bold truncate ${
                              isActive ? 'text-[#F2EBD7]' : 'text-[#F2EBD7]/80'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="text-[11px] font-body text-[#A3B4C8] truncate">
                            {project.tags.slice(0, 3).join(' • ')}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 transition-transform ${
                          isActive
                            ? 'text-[#FF6F3C] translate-x-1'
                            : 'text-[#A3B4C8]/40'
                        }`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#223854] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#A3B4C8] tracking-widest uppercase">
          <div>REZUME CYBER-KINETIC • BAUHAUS MATRIX</div>
          <div className="text-[#FF6F3C]">DESIGNED WITH SUB-PIXEL PRECISION</div>
        </footer>
      </div>
    </div>
  )
}
