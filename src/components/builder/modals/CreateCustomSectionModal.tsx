import React, { useState } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import type { CustomSectionFormat, SectionColumn } from '../../../types/resume'
import {
  X,
  List,
  LayoutGrid,
  FileText,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Award,
  Lightbulb,
  Globe,
  Plus,
} from 'lucide-react'

interface CreateCustomSectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateCustomSectionModal: React.FC<CreateCustomSectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addCustomSection, setActiveTab } = useResumeStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [formatType, setFormatType] = useState<CustomSectionFormat>('list')
  const [column, setColumn] = useState<SectionColumn>('main')
  const [iconName, setIconName] = useState('Sparkles')

  if (!isOpen) return null

  const presets = [
    { title: 'Publications', desc: 'Peer-reviewed research and technical papers', icon: 'BookOpen', format: 'list' as const },
    { title: 'Volunteering', desc: 'Community outreach and open mentoring', icon: 'HeartHandshake', format: 'list' as const },
    { title: 'Patents & IP', desc: 'Granted patents and proprietary systems', icon: 'Lightbulb', format: 'list' as const },
    { title: 'Speaking & Keynotes', desc: 'Conference talks, panels, and workshops', icon: 'Award', format: 'grid' as const },
    { title: 'Executive Philosophy', desc: 'Leadership vision and engineering standards', icon: 'FileText', format: 'text' as const },
  ]

  const handleApplyPreset = (p: typeof presets[0]) => {
    setTitle(p.title)
    setDescription(p.desc)
    setIconName(p.icon)
    setFormatType(p.format)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addCustomSection(title.trim(), description.trim(), formatType, column, iconName)
    setActiveTab('builder')
    onClose()
    setTitle('')
    setDescription('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1B2A]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-[#223854] bg-[#0D1B2A] text-[#F2EBD7] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#223854] flex items-center justify-between select-none bg-[#14243B]/60">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/30">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-[#FF6F3C]">✦</span>
                <h2 className="text-sm font-display font-bold text-[#F2EBD7] tracking-tight">
                  Add Custom Resume Component
                </h2>
              </div>
              <p className="text-[11px] font-body text-[#F2EBD7]/60">
                Define section parameters and choose a retro-futuristic layout format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#F2EBD7]/60 hover:text-[#F2EBD7] hover:bg-[#1A2D47] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Quick Presets Bar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/60 block">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14243B] hover:bg-[#FF6F3C]/20 border border-[#223854] text-[#F2EBD7]/70 hover:text-[#FF6F3C] hover:border-[#FF6F3C]/40 transition-colors cursor-pointer"
                >
                  + {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Section Title Input */}
          <div>
            <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/70 mb-1 block">
              Section Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Publications, Volunteering, Patents"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg bg-[#14243B] border border-[#223854] focus:border-[#FF6F3C] text-[#F2EBD7] placeholder-[#F2EBD7]/30 focus:outline-none transition-colors font-body"
              autoFocus
            />
          </div>

          {/* Section Description Input */}
          <div>
            <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/70 mb-1 block">
              Short Description / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Peer-reviewed papers and technical monographs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg bg-[#14243B] border border-[#223854] focus:border-[#FF6F3C] text-[#F2EBD7] placeholder-[#F2EBD7]/30 focus:outline-none transition-colors font-body"
            />
          </div>

          {/* Format Type Selector (Cards) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/70 block">
              Format Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* List Format */}
              <button
                type="button"
                onClick={() => setFormatType('list')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formatType === 'list'
                    ? 'border-[#FF6F3C] bg-[#FF6F3C]/15 text-[#F2EBD7] shadow-inner ring-1 ring-[#FF6F3C]/50'
                    : 'border-[#223854] bg-[#14243B]/60 text-[#F2EBD7]/70 hover:border-[#223854]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <List className="w-4 h-4 text-[#FF6F3C]" />
                    <span className="text-xs font-display font-semibold text-[#F2EBD7]">
                      Structured List
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-[#F2EBD7]/60 leading-tight">
                    Entries with title, organization, date, and description.
                  </p>
                </div>
              </button>

              {/* Grid Format */}
              <button
                type="button"
                onClick={() => setFormatType('grid')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formatType === 'grid'
                    ? 'border-[#5D8A8A] bg-[#5D8A8A]/15 text-[#F2EBD7] shadow-inner ring-1 ring-[#5D8A8A]/50'
                    : 'border-[#223854] bg-[#14243B]/60 text-[#F2EBD7]/70 hover:border-[#223854]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <LayoutGrid className="w-4 h-4 text-[#5D8A8A]" />
                    <span className="text-xs font-display font-semibold text-[#F2EBD7]">
                      Modular Grid
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-[#F2EBD7]/60 leading-tight">
                    Tile cards with badges, tags, and metrics summary.
                  </p>
                </div>
              </button>

              {/* Text Block Format */}
              <button
                type="button"
                onClick={() => setFormatType('text')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formatType === 'text'
                    ? 'border-[#B39ACD] bg-[#B39ACD]/15 text-[#F2EBD7] shadow-inner ring-1 ring-[#B39ACD]/50'
                    : 'border-[#223854] bg-[#14243B]/60 text-[#F2EBD7]/70 hover:border-[#223854]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <FileText className="w-4 h-4 text-[#B39ACD]" />
                    <span className="text-xs font-display font-semibold text-[#F2EBD7]">
                      Text Block
                    </span>
                  </div>
                  <p className="text-[10px] font-body text-[#F2EBD7]/60 leading-tight">
                    Narrative paragraphs, philosophies, or statements.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Section Icon Picker */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/70 block">
              Section Icon
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Sparkles', icon: Sparkles },
                { name: 'BookOpen', icon: BookOpen },
                { name: 'HeartHandshake', icon: HeartHandshake },
                { name: 'Award', icon: Award },
                { name: 'Lightbulb', icon: Lightbulb },
                { name: 'Globe', icon: Globe },
                { name: 'FileText', icon: FileText },
              ].map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setIconName(name)}
                  className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center space-x-1.5 text-xs ${
                    iconName === name
                      ? 'border-[#FF6F3C] bg-[#FF6F3C]/20 text-[#FF6F3C] ring-1 ring-[#FF6F3C]/50'
                      : 'border-[#223854] bg-[#14243B] text-[#F2EBD7]/60 hover:border-[#FF6F3C]/40 hover:text-[#F2EBD7]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">{name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initial Column Placement */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#F2EBD7]/70 block">
              Initial Layout Placement
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setColumn('main')}
                className={`p-2 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer border ${
                  column === 'main'
                    ? 'border-[#FF6F3C] bg-[#FF6F3C]/20 text-[#F2EBD7] shadow-xs'
                    : 'border-[#223854] bg-[#14243B] text-[#F2EBD7]/60 hover:text-[#F2EBD7]'
                }`}
              >
                Right Main Body Column
              </button>
              <button
                type="button"
                onClick={() => setColumn('sidebar')}
                className={`p-2 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer border ${
                  column === 'sidebar'
                    ? 'border-[#FF6F3C] bg-[#FF6F3C]/20 text-[#F2EBD7] shadow-xs'
                    : 'border-[#223854] bg-[#14243B] text-[#F2EBD7]/60 hover:text-[#F2EBD7]'
                }`}
              >
                Left Sidebar Column
              </button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-[#223854] flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-body font-medium text-[#F2EBD7]/60 hover:bg-[#14243B] hover:text-[#F2EBD7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-body font-semibold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#0D1B2A] shadow-sm transition-all disabled:opacity-50 cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Component</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
