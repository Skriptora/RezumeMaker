import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'

interface CreativeStudioTemplateProps {
  cards: PortfolioProjectCard[]
  profile: ProfileData
  animationTriggerKey: number
}

export const CreativeStudioTemplate: React.FC<CreativeStudioTemplateProps> = ({
  cards,
  profile,
  animationTriggerKey,
}) => {
  const { selectedElementId, setSelectedElementId } = useResumeStore()
  const [selectedTag, setSelectedTag] = useState<string>('All')

  const getSelectableClass = (id: string, baseClass = '') => {
    const isSelected = selectedElementId === id
    return `${baseClass} cursor-pointer transition-all duration-150 ${
      isSelected
        ? 'ring-4 ring-[#FF6F3C] ring-offset-2 ring-offset-white dark:ring-offset-[#121316] shadow-[0_0_15px_rgba(255,111,60,0.5)] rounded-xl relative z-20'
        : 'hover:ring-2 hover:ring-[#FF6F3C]/50 hover:ring-offset-1 rounded-xl'
    }`
  }

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  const allTags = ['All', ...Array.from(new Set(cards.flatMap((c) => c.tags)))]

  const filteredCards =
    selectedTag === 'All'
      ? cards
      : cards.filter((c) => c.tags.includes(selectedTag))

  // Stagger fade entrance animation for Masonry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="space-y-8">
      {/* Creative Studio Header */}
      <div
        id="template-studio-header"
        onClick={handleSelect('template-studio-header')}
        className={getSelectableClass('template-studio-header', 'space-y-4 text-center max-w-3xl mx-auto p-4 rounded-xl')}
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/30 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
          <span>CREATIVE STUDIO • VISUAL EXHIBITION</span>
        </div>

        <h1
          id="template-studio-title"
          onClick={handleSelect('template-studio-title')}
          className={getSelectableClass('template-studio-title', 'text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 dark:text-[#e5e7eb] inline-block p-1 rounded-lg')}
        >
          Curated Works & Prototypes
        </h1>

        <p
          id="template-studio-desc"
          onClick={handleSelect('template-studio-desc')}
          className={getSelectableClass('template-studio-desc', 'text-xs sm:text-sm font-body text-slate-600 dark:text-[#9ca3af] max-w-xl mx-auto leading-relaxed p-1 rounded-lg')}
        >
          Interactive systems, high-fidelity visual interfaces, and architecture explorations created by {profile.fullName}.
        </p>

        {/* Masonry Category Filter Pills */}
        <div
          id="template-studio-filters"
          onClick={handleSelect('template-studio-filters')}
          className={getSelectableClass('template-studio-filters', 'flex flex-wrap items-center justify-center gap-1.5 pt-2 p-1 rounded-xl')}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedTag(tag)
              }}
              className={`text-xs px-3 py-1 rounded-full font-body font-medium transition-all duration-200 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#3b82f6] text-white shadow-md shadow-[#3b82f6]/25 ring-1 ring-[#3b82f6]'
                  : 'bg-white dark:bg-[#1e293b] text-slate-700 dark:text-[#9ca3af] border border-slate-200 dark:border-[#374151] hover:border-[#3b82f6]/60 hover:text-[#e5e7eb]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* CSS Masonry Grid Layout with dynamic staggered card heights */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${animationTriggerKey}-${selectedTag}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="template-studio-grid"
          onClick={handleSelect('template-studio-grid')}
          className={getSelectableClass('template-studio-grid', 'columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 p-2 rounded-2xl')}
        >
          {filteredCards.map((card, idx) => {
            // Alternate aspect heights for an organic masonry feel
            const isTall = idx % 3 === 0
            const isMedium = idx % 2 === 0 && !isTall

            return (
              <motion.div
                key={card.id}
                id={`template-studio-card-${card.id}`}
                onClick={handleSelect(`template-studio-card-${card.id}`)}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={getSelectableClass(
                  `template-studio-card-${card.id}`,
                  'break-inside-avoid rounded-xl border border-slate-200 dark:border-[#374151]/80 bg-white/95 dark:bg-[#1e293b]/80 backdrop-blur-md overflow-hidden shadow-sm hover:border-[#3b82f6]/60 hover:shadow-lg transition-all group flex flex-col justify-between'
                )}
              >
                {/* Image Container with zoom */}
                <div
                  className={`relative w-full overflow-hidden bg-slate-100 dark:bg-[#0a0e1a] ${
                    isTall ? 'h-64' : isMedium ? 'h-52' : 'h-44'
                  }`}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/85 via-[#0a0e1a]/20 to-transparent" />

                  {card.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#0a0e1a]/85 text-[#60a5fa] border border-[#374151] shadow-xs">
                      {card.badge}
                    </span>
                  )}

                  {card.linkUrl && (
                    <a
                      href={card.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0a0e1a]/70 hover:bg-[#3b82f6] text-white transition-colors duration-200"
                      title="Open project link"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h3
                      id={`template-studio-card-${card.id}-title`}
                      onClick={handleSelect(`template-studio-card-${card.id}-title`)}
                      className={getSelectableClass(`template-studio-card-${card.id}-title`, 'text-sm font-display font-bold text-white tracking-tight drop-shadow-sm inline-block')}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-3">
                  <p
                    id={`template-studio-card-${card.id}-desc`}
                    onClick={handleSelect(`template-studio-card-${card.id}-desc`)}
                    className={getSelectableClass(`template-studio-card-${card.id}-desc`, 'text-xs font-body text-slate-600 dark:text-[#9ca3af] leading-relaxed p-0.5 rounded')}
                  >
                    {card.description}
                  </p>

                  <div
                    id={`template-studio-card-${card.id}-tags`}
                    onClick={handleSelect(`template-studio-card-${card.id}-tags`)}
                    className={getSelectableClass(`template-studio-card-${card.id}-tags`, 'flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-[#374151]/50 p-0.5 rounded')}
                  >
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#0a0e1a]/80 text-slate-700 dark:text-[#e5e7eb] border border-slate-200/60 dark:border-[#374151]/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {filteredCards.length === 0 && (
        <div className="py-16 text-center text-[#9ca3af] font-mono text-xs">
          No works match the selected tag filter.
        </div>
      )}
    </div>
  )
}
