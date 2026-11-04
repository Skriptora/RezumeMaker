import React, { useState } from 'react'
import {
  X,
  Type,
  Image as ImageIcon,
  Palette,
  Orbit,
  Briefcase,
  Upload,
  Plus,
} from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import type {
  CustomWebComponentType,
  WebEditorPageId,
} from '../../../types/resume'

interface AddComponentModalProps {
  isOpen: boolean
  onClose: () => void
  defaultPage?: WebEditorPageId
}

export const AddComponentModal: React.FC<AddComponentModalProps> = ({
  isOpen,
  onClose,
  defaultPage = 'about',
}) => {
  const { addWebComponent } = useResumeStore()

  const [selectedType, setSelectedType] = useState<CustomWebComponentType>('image')
  const [targetPage, setTargetPage] = useState<WebEditorPageId | 'all'>(defaultPage)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [artStyle, setArtStyle] = useState<'orbital-orb' | 'googie-rings' | 'atomic-spark' | 'wireframe-grid'>('orbital-orb')
  const [splineUrl, setSplineUrl] = useState('')
  const [resumeSection, setResumeSection] = useState<'experience' | 'education' | 'skills' | 'certifications'>('experience')

  if (!isOpen) return null

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addWebComponent({
      page: targetPage,
      type: selectedType,
      title: title.trim() || undefined,
      content: content.trim() || undefined,
      caption: caption.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      artStyle,
      splineUrl: splineUrl.trim() || undefined,
      resumeSection,
    })
    // Reset and close
    setTitle('')
    setContent('')
    setCaption('')
    setImageUrl('')
    setSplineUrl('')
    onClose()
  }

  const componentOptions: { type: CustomWebComponentType; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      type: 'image',
      label: 'Photo / Image',
      icon: <ImageIcon className="w-4 h-4 text-[#FF6F3C]" />,
      desc: 'Upload portrait, photo of yourself, or project asset',
    },
    {
      type: 'text',
      label: 'Text Block',
      icon: <Type className="w-4 h-4 text-[#F2B705]" />,
      desc: 'Editorial headline, bio statement, or quote',
    },
    {
      type: 'art',
      label: 'Abstract Art',
      icon: <Palette className="w-4 h-4 text-[#5D8A8A]" />,
      desc: 'Retro Googie concentric circles, orbital orb, or atomic star',
    },
    {
      type: 'spline',
      label: 'Spline 3D Core',
      icon: <Orbit className="w-4 h-4 text-[#B39ACD]" />,
      desc: 'Interactive rotating 3D wireframe mesh or Spline URL embed',
    },
    {
      type: 'resume-block',
      label: 'Resume Section',
      icon: <Briefcase className="w-4 h-4 text-[#FF6F3C]" />,
      desc: 'Embed live experience, education, or skills timeline',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#EDE6D8] dark:bg-[#181A1F] border border-[#CCC3B0] dark:border-[#282A33] shadow-2xl p-6 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#CCC3B0]/60 dark:border-[#282A33]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF6F3C] text-[#121316] flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold uppercase tracking-tight text-[#121316] dark:text-[#F7F4EB]">
                Add Web Component
              </h3>
              <p className="text-[11px] font-mono text-[#5D8A8A]">
                Constrained layout blocks tailored for editorial portfolios
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-[#F7F4EB] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Target Page Selector */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316] dark:text-[#A8A49A] mb-1.5">
              Target Page
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {(['home', 'about', 'resume', 'projects', 'contact', 'all'] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setTargetPage(p)}
                  className={`py-1 px-2 rounded-lg text-xs font-mono capitalize transition-colors cursor-pointer border ${
                    targetPage === p
                      ? 'bg-[#FF6F3C] text-[#121316] border-[#FF6F3C] font-bold'
                      : 'bg-[#DDD5C4]/60 dark:bg-[#121316] border-[#CCC3B0] dark:border-[#282A33] text-slate-700 dark:text-[#A8A49A]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Component Type Selector */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316] dark:text-[#A8A49A] mb-1.5">
              Component Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {componentOptions.map((opt) => {
                const isSelected = selectedType === opt.type
                return (
                  <button
                    type="button"
                    key={opt.type}
                    onClick={() => setSelectedType(opt.type)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#FF6F3C] bg-[#FF6F3C]/10 dark:bg-[#FF6F3C]/15 text-[#121316] dark:text-[#F7F4EB] shadow-xs'
                        : 'border-[#CCC3B0] dark:border-[#282A33] bg-[#E6DFD1]/60 dark:bg-[#121316] text-slate-700 dark:text-[#A8A49A]'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1">
                      {opt.icon}
                      <span className="text-xs font-display font-bold">{opt.label}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-[#A8A49A] line-clamp-1">
                      {opt.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Configuration based on component type */}
          <div className="space-y-3 pt-2 border-t border-[#CCC3B0]/60 dark:border-[#282A33]">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB] mb-1">
                Component Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Studio Portrait, Core Philosophy, 3D Core"
                className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
              />
            </div>

            {/* Photo / Image */}
            {selectedType === 'image' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB]">
                  Upload Photo / Portrait
                </label>
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] text-xs font-mono font-bold tracking-wide cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-[#A8A49A] truncate max-w-xs">
                    {imageUrl ? 'Photo loaded successfully' : 'No file chosen (or enter URL below)'}
                  </span>
                </div>

                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste image URL (e.g. https://... or /shaheen.jpg)"
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />

                {imageUrl && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#FF6F3C] mt-2">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption (e.g. Senior Full-Stack Engineer based in Aluva)"
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />
              </div>
            )}

            {/* Text block */}
            {selectedType === 'text' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB]">
                  Paragraph / Editorial Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="Write your personal narrative, engineering thesis, or bio..."
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />
              </div>
            )}

            {/* Abstract Art */}
            {selectedType === 'art' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB]">
                  Geometric Art Motif
                </label>
                <select
                  value={artStyle}
                  onChange={(e) => setArtStyle(e.target.value as any)}
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                >
                  <option value="orbital-orb">Googie Planetary Orbital Orb</option>
                  <option value="googie-rings">Mid-Century Concentric Rings</option>
                  <option value="atomic-spark">Space-Age Atomic Spark</option>
                  <option value="wireframe-grid">Drafting Sub-Pixel Grid</option>
                </select>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Artwork caption (e.g. Orbital Coordinate Spec)"
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />
              </div>
            )}

            {/* Spline 3D */}
            {selectedType === 'spline' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB]">
                  Spline 3D Scene Source
                </label>
                <p className="text-[11px] font-mono text-slate-500 dark:text-[#A8A49A]">
                  Leave empty to use the built-in interactive real-time 3D wireframe mesh, or paste a public Spline viewer URL:
                </p>
                <input
                  type="text"
                  value={splineUrl}
                  onChange={(e) => setSplineUrl(e.target.value)}
                  placeholder="Optional: https://my.spline.design/your-scene/..."
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="3D Scene Caption"
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                />
              </div>
            )}

            {/* Resume Section Block */}
            {selectedType === 'resume-block' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB]">
                  Select Resume Section to Embed
                </label>
                <select
                  value={resumeSection}
                  onChange={(e) => setResumeSection(e.target.value as any)}
                  className="w-full text-xs font-mono p-2 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
                >
                  <option value="experience">Work Experience Timeline</option>
                  <option value="education">Education & Degrees</option>
                  <option value="skills">Skills & Technical Stack</option>
                  <option value="certifications">Certifications & Honors</option>
                </select>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2.5 pt-4 border-t border-[#CCC3B0]/60 dark:border-[#282A33]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-[#DDD5C4] dark:bg-[#22252D] text-slate-800 dark:text-[#F7F4EB] hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] shadow-md transition-colors cursor-pointer"
            >
              Add to Page
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
