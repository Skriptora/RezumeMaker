import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { PortfolioProjectCard, ProfileData } from '../../../types/resume'
import {
  Folder,
  FileCode,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Code2,
  CheckCircle2,
} from 'lucide-react'

interface DeveloperTerminalTemplateProps {
  cards: PortfolioProjectCard[]
  profile: ProfileData
  animationTriggerKey: number
}

export const DeveloperTerminalTemplate: React.FC<DeveloperTerminalTemplateProps> = ({
  cards,
  profile,
  animationTriggerKey,
}) => {
  const [activeTab, setActiveTab] = useState<'projects.tsx' | 'architecture.json' | 'metrics.sh'>('projects.tsx')
  const [selectedTag, setSelectedTag] = useState<string>('All')

  const allTags = ['All', ...Array.from(new Set(cards.flatMap((c) => c.tags)))]

  const filteredCards =
    selectedTag === 'All'
      ? cards
      : cards.filter((c) => c.tags.includes(selectedTag))

  // Terminal stagger entrance animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="rounded-xl border border-[#374151] bg-[#0a0e1a] text-[#e5e7eb] font-mono shadow-2xl overflow-hidden text-xs">
      {/* IDE Editor Titlebar */}
      <div className="px-4 py-2.5 bg-[#0c111d] border-b border-[#374151] flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span className="text-[11px] text-[#9ca3af] ml-2">
            workspace/{profile.fullName.toLowerCase().replace(/\s+/g, '-')}-portfolio
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {(['projects.tsx', 'architecture.json', 'metrics.sh'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-[11px] transition-colors cursor-pointer flex items-center space-x-1.5 ${
                activeTab === tab
                  ? 'bg-[#1e293b] text-[#60a5fa] border-b-2 border-[#3b82f6]'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb]'
              }`}
            >
              <FileCode className="w-3 h-3" />
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Workbench Layout (Left Sidebar + Main Editor Area) */}
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left Explorer Sidebar */}
        <div className="w-full md:w-56 bg-[#0c111d]/90 border-r border-[#374151]/80 p-3 space-y-3 flex-shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#9ca3af]/70 flex items-center space-x-1">
            <Folder className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>EXPLORER</span>
          </div>

          <div className="space-y-1 text-[11px] text-[#9ca3af]">
            <div className="flex items-center space-x-1 text-[#e5e7eb]">
              <ChevronRight className="w-3 h-3 transform rotate-90 text-[#3b82f6]" />
              <span>src/repositories</span>
            </div>
            {cards.map((c) => (
              <div
                key={c.id}
                className="pl-5 py-0.5 truncate hover:text-[#60a5fa] cursor-pointer flex items-center space-x-1"
              >
                <Code2 className="w-3 h-3 text-[#10b981]" />
                <span className="truncate">{c.title.toLowerCase().replace(/\s+/g, '_')}.ts</span>
              </div>
            ))}
          </div>

          {/* Terminal Command Flags (Filter tags) */}
          <div className="pt-3 border-t border-[#374151]/60 space-y-1.5">
            <span className="text-[10px] text-[#9ca3af]/70 uppercase tracking-wider block">
              CLI TAG FILTERS
            </span>
            <div className="flex flex-wrap gap-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-[#1e293b] text-[#9ca3af] hover:text-[#e5e7eb]'
                  }`}
                >
                  --{tag.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Code Editor Pane */}
        <div className="flex-1 p-4 sm:p-6 bg-[#0a0e1a] space-y-4 overflow-y-auto">
          {/* Breadcrumb & Git Status Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-[#374151]/50 text-[11px] text-[#9ca3af]">
            <div className="flex items-center space-x-1.5 truncate">
              <span>src</span>
              <span>&gt;</span>
              <span>modules</span>
              <span>&gt;</span>
              <span className="text-[#60a5fa]">{activeTab}</span>
              <span className="text-[#10b981] ml-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>git:(main)</span>
              </span>
            </div>
            <div className="text-[10px] text-[#9ca3af]">
              {filteredCards.length} modules loaded
            </div>
          </div>

          {/* Project Items rendered as syntax-highlighted modules */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${animationTriggerKey}-${selectedTag}-${activeTab}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  className="rounded-lg border border-[#374151]/80 bg-[#1e293b]/50 p-4 space-y-3 hover:border-[#3b82f6]/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#9ca3af]/60 font-mono text-[10px]">
                          0{idx + 1}.
                        </span>
                        <span className="text-[#7c3aed] font-bold">export const</span>
                        <span className="text-[#e5e7eb] font-bold text-sm tracking-wide">
                          {card.title.replace(/\s+/g, '')}
                        </span>
                        <span className="text-[#9ca3af]">=</span>
                        {card.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                            status: '{card.badge}'
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#9ca3af] leading-relaxed pl-6">
                        // {card.description}
                      </p>
                    </div>

                    {card.linkUrl && (
                      <a
                        href={card.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded bg-[#2d3a50] hover:bg-[#3b82f6] text-[#e5e7eb] transition-colors flex-shrink-0"
                      >
                        <span>run live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Code snippet / tags format */}
                  <div className="pl-6 pt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-[#fbbf24]">dependencies:</span>
                    <span className="text-[#9ca3af]">[</span>
                    {card.tags.map((t, i) => (
                      <span key={t} className="text-[#60a5fa]">
                        '{t}'{i < card.tags.length - 1 ? ',' : ''}
                      </span>
                    ))}
                    <span className="text-[#9ca3af]">]</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Editor Status Bar Footer */}
      <div className="px-4 py-1.5 bg-[#0c111d] border-t border-[#374151] flex items-center justify-between text-[10px] text-[#9ca3af] select-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-[#3b82f6]">
            <GitBranch className="w-3 h-3" />
            <span>main*</span>
          </span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>0 errors, 0 warnings</span>
          <span className="text-[#10b981]">● Prettier</span>
        </div>
      </div>
    </div>
  )
}
