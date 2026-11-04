import React, { useState } from 'react'
import { X, Type, Check } from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'

interface AddCustomFontModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddCustomFontModal: React.FC<AddCustomFontModalProps> = ({ isOpen, onClose }) => {
  const { addCustomFont, customFonts, webEditorFont, setWebEditorFont } = useResumeStore()
  const [fontName, setFontName] = useState('')

  if (!isOpen) return null

  const popularSuggestions = [
    'Playfair Display',
    'Outfit',
    'Bebas Neue',
    'Fira Code',
    'Space Grotesk',
    'DM Serif Display',
    'Syne',
    'Cinzel',
    'Plus Jakarta Sans',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fontName.trim()) return
    addCustomFont(fontName.trim())
    setFontName('')
    onClose()
  }

  const handleSelectSuggestion = (name: string) => {
    addCustomFont(name)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#EDE6D8] dark:bg-[#181A1F] border border-[#CCC3B0] dark:border-[#282A33] shadow-2xl p-6 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-[#CCC3B0]/60 dark:border-[#282A33]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#F2B705] text-[#121316] flex items-center justify-center font-bold">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold uppercase tracking-tight text-[#121316] dark:text-[#F7F4EB]">
                Add Custom Web Font
              </h3>
              <p className="text-[11px] font-mono text-[#5D8A8A]">
                Dynamic Google WebFont injection engine
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
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-[#F7F4EB] mb-1.5">
              Google Font Name
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={fontName}
                onChange={(e) => setFontName(e.target.value)}
                placeholder="e.g. Outfit, Playfair Display, Fira Code..."
                className="flex-1 text-xs font-mono p-2.5 rounded-lg bg-[#E6DFD1] dark:bg-[#121316] border border-[#CCC3B0] dark:border-[#282A33] text-[#121316] dark:text-[#F7F4EB] focus:outline-none focus:border-[#FF6F3C]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] cursor-pointer"
              >
                Inject
              </button>
            </div>
            <p className="text-[10px] font-mono text-slate-500 dark:text-[#A8A49A] mt-1">
              Any valid font from fonts.google.com will be fetched and applied in real time.
            </p>
          </div>

          {/* Popular Suggestions */}
          <div>
            <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316] dark:text-[#A8A49A] mb-2">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularSuggestions.map((name) => {
                const isActive = webEditorFont === name
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSelectSuggestion(name)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center space-x-1 ${
                      isActive
                        ? 'border-[#FF6F3C] bg-[#FF6F3C]/15 text-[#FF6F3C] font-bold'
                        : 'border-[#CCC3B0] dark:border-[#282A33] bg-[#E6DFD1]/60 dark:bg-[#121316] text-slate-700 dark:text-[#A8A49A] hover:border-[#FF6F3C]/50'
                    }`}
                  >
                    <span>{name}</span>
                    {isActive && <Check className="w-3 h-3 text-[#FF6F3C]" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Fonts in State */}
          <div className="pt-2 border-t border-[#CCC3B0]/60 dark:border-[#282A33]">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-[#5D8A8A] mb-1.5">
              Currently Loaded in Studio ({customFonts.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {customFonts.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => {
                    setWebEditorFont(f)
                    onClose()
                  }}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded cursor-pointer ${
                    webEditorFont === f
                      ? 'bg-[#F2B705] text-[#121316] font-bold'
                      : 'bg-[#DDD5C4] dark:bg-[#22252D] text-slate-700 dark:text-[#A8A49A]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
