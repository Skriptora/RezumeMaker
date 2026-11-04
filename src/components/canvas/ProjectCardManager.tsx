import React, { useState, useRef } from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import type { PortfolioProjectCard } from '../../types/resume'
import {
  Plus,
  Upload,
  Image as ImageIcon,
  Trash2,
  Edit2,
  ExternalLink,
  X,
} from 'lucide-react'

export const ProjectCardManager: React.FC = () => {
  const {
    portfolioCards,
    addPortfolioCard,
    updatePortfolioCard,
    deletePortfolioCard,
  } = useResumeStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [badge, setBadge] = useState('')
  const [isDraggingFile, setIsDraggingFile] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const stockImages = [
    {
      label: 'CAD & 3D Engineering',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'AI & Data Visuals',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Robotics & Hardware',
      url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'UI Design & System',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Cloud & Code Architecture',
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const handleOpenAdd = () => {
    setEditingCardId(null)
    setTitle('')
    setDescription('')
    setImageUrl(stockImages[0].url)
    setTagsInput('React, TypeScript, Tailwind')
    setLinkUrl('https://github.com')
    setBadge('Featured')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (card: PortfolioProjectCard) => {
    setEditingCardId(card.id)
    setTitle(card.title)
    setDescription(card.description)
    setImageUrl(card.imageUrl)
    setTagsInput(card.tags.join(', '))
    setLinkUrl(card.linkUrl || '')
    setBadge(card.badge || '')
    setIsModalOpen(true)
  }

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP)')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        setImageUrl(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingCardId) {
      updatePortfolioCard(editingCardId, {
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl || stockImages[0].url,
        tags: parsedTags,
        linkUrl: linkUrl.trim() || undefined,
        badge: badge.trim() || undefined,
      })
    } else {
      addPortfolioCard({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl || stockImages[0].url,
        tags: parsedTags,
        linkUrl: linkUrl.trim() || undefined,
        badge: badge.trim() || undefined,
      })
    }

    setIsModalOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Portfolio Project Cards ({portfolioCards.length})
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Add and manage cards with local image uploads and custom labels
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project Card</span>
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {portfolioCards.map((card) => (
          <div
            key={card.id}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            {/* Card Thumbnail */}
            <div className="relative h-36 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {card.badge && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-sm shadow-sm">
                  {card.badge}
                </span>
              )}

              {/* Action buttons on thumbnail hover */}
              <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(card)}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  title="Edit card"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deletePortfolioCard(card.id)}
                  className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-700 text-white backdrop-blur-sm transition-colors"
                  title="Delete card"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="absolute bottom-2 left-3 right-3 text-white">
                <h4 className="text-xs font-bold truncate drop-shadow-sm">
                  {card.title}
                </h4>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {card.description}
              </p>

              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap gap-1">
                  {card.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {card.tags.length > 4 && (
                    <span className="text-[9px] text-slate-400">
                      +{card.tags.length - 4}
                    </span>
                  )}
                </div>

                {card.linkUrl && (
                  <a
                    href={card.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {editingCardId ? 'Edit Portfolio Project Card' : 'Add New Portfolio Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Local Image Upload Zone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Image (Upload Local File or Pick Preset)
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDraggingFile(true)
                }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                  isDraggingFile
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0])
                    }
                  }}
                />

                {imageUrl ? (
                  <div className="space-y-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                      Click or drag to replace image
                    </p>
                  </div>
                ) : (
                  <div className="py-4 space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Upload from local computer
                    </p>
                    <p className="text-[10px] text-slate-400">
                      PNG, JPG, WebP, SVG (drag & drop supported)
                    </p>
                  </div>
                )}
              </div>

              {/* Quick stock presets */}
              <div className="mt-2 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium">
                  Or pick a curated stock visual:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stockImages.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setImageUrl(s.url)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Autonomous Edge Drone Guidance"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Hardware & AI, Production, Open Source"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-level architecture, problem solved, impact, or technologies leveraged..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Tags & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Technologies / Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, SolidWorks, Python, AWS"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Live Project / Source URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
              >
                {editingCardId ? 'Save Changes' : 'Create Card'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
