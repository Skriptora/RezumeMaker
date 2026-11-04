import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'

interface ExecutiveMinimalistTemplateProps {
  cards: PortfolioProjectCard[]
  profile: ProfileData
  animationTriggerKey: number
}

export const ExecutiveMinimalistTemplate: React.FC<ExecutiveMinimalistTemplateProps> = ({
  cards,
  profile,
  animationTriggerKey,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return
    const slideHeight = containerRef.current.clientHeight
    containerRef.current.scrollTo({
      top: idx * slideHeight,
      behavior: 'smooth',
    })
    setActiveIndex(idx)
  }

  const handleScroll = () => {
    if (!containerRef.current) return
    const slideHeight = containerRef.current.clientHeight
    const current = Math.round(containerRef.current.scrollTop / slideHeight)
    if (current !== activeIndex && current >= 0 && current < cards.length) {
      setActiveIndex(current)
    }
  }

  // Slide-up editorial entrance animation
  const slideVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-[#374151]/80 bg-[#0a0e1a] text-[#e5e7eb] overflow-hidden shadow-2xl">
      {/* Editorial HUD Top Bar */}
      <div className="p-4 border-b border-[#374151]/60 flex items-center justify-between text-xs font-mono select-none bg-[#0c111d]/90 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
          <span className="font-display font-bold uppercase tracking-wider text-[#e5e7eb]">
            EXECUTIVE MINIMALIST • SNAP SCROLL
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-[#9ca3af]">
          <span>
            CASE <span className="text-[#3b82f6] font-bold">0{activeIndex + 1}</span> / 0{cards.length}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-1 rounded bg-[#1e293b] hover:bg-[#2d3a50] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Case"
            >
              <ChevronUp className="w-3.5 h-3.5 text-[#e5e7eb]" />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(cards.length - 1, activeIndex + 1))}
              disabled={activeIndex === cards.length - 1}
              className="p-1 rounded bg-[#1e293b] hover:bg-[#2d3a50] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Case"
            >
              <ChevronDown className="w-3.5 h-3.5 text-[#e5e7eb]" />
            </button>
          </div>
        </div>
      </div>

      {/* Snapping Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[520px] overflow-y-auto snap-y snap-mandatory scroll-smooth relative"
      >
        <AnimatePresence mode="wait">
          {cards.map((card, idx) => (
            <motion.div
              key={`${card.id}-${animationTriggerKey}`}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="h-[520px] w-full snap-start snap-always p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-[#374151]/30 last:border-b-0"
            >
              {/* Left Column: Editorial Details */}
              <div className="w-full lg:w-[48%] space-y-4 text-left">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xl font-display font-black text-[#3b82f6]">
                    0{idx + 1}
                  </span>
                  <span className="w-8 h-[1px] bg-[#374151]" />
                  {card.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/30">
                      {card.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
                    {card.title}
                  </h2>
                  <p className="text-xs font-mono text-[#9ca3af] mt-1">
                    System Architecture & Design Lead: {profile.fullName}
                  </p>
                </div>

                <p className="text-xs font-body text-[#9ca3af] leading-relaxed">
                  {card.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]/70">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1e293b] text-[#e5e7eb] border border-[#374151]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {card.linkUrl && (
                  <div className="pt-2">
                    <a
                      href={card.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-body font-semibold bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white transition-colors cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Full-Bleed Card Image with Tinted Frame */}
              <div className="w-full lg:w-[50%] h-64 sm:h-80 rounded-xl overflow-hidden border border-[#374151] relative group bg-[#1e293b]">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#9ca3af] bg-[#0a0e1a]/85 px-2 py-1 rounded border border-[#374151]">
                  Slide {idx + 1} of {cards.length}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Scroll Indicator Dot Bar */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col space-y-2 z-10">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? 'bg-[#3b82f6] h-6'
                : 'bg-[#374151] hover:bg-[#9ca3af]'
            }`}
            title={`Jump to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
