import React, { useEffect, useRef } from 'react'
import {
  X,
  RotateCcw,
  Type,
  MoveHorizontal,
  Maximize2,
  Box,
  ChevronDown,
  Image as ImageIcon,
  Upload,
  Trash2,
  Palette,
  Circle,
  Square,
  Sliders,
} from 'lucide-react'
import { useResumeStore } from '../../store/useResumeStore'
import type { ElementCustomStyle } from '../../types/resume'

const IMPECCABLE_FONTS = [
  { name: 'Courier Prime', label: 'Courier Prime (Typewriter)', category: 'Mechanical' },
  { name: 'Special Elite', label: 'Special Elite (Vintage Ribbon)', category: 'Ink-Ribbon' },
  { name: 'IBM Plex Mono', label: 'IBM Plex Mono (Telemetry)', category: 'Monospace' },
  { name: 'Cinzel', label: 'Cinzel (Classical Roman Serif)', category: 'Architectural' },
]

const PALETTE_SWATCHES = [
  { name: 'Burnt Orange', hex: '#FF6F3C' },
  { name: 'Retro Teal', hex: '#5D8A8A' },
  { name: 'Sunburst Yellow', hex: '#F2B705' },
  { name: 'Vintage Lavender', hex: '#B39ACD' },
  { name: 'Space Cream', hex: '#EDE6D8' },
  { name: 'Dark Parchment', hex: '#D8CEBA' },
  { name: 'Soft Light Cream', hex: '#F7F4EB' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Foggy Charcoal', hex: '#181A1F' },
  { name: 'Gritty Black', hex: '#121316' },
  { name: 'Jet Black', hex: '#0A0B0E' },
]

export const PropertyEditor: React.FC = () => {
  const {
    selectedElementId,
    setSelectedElementId,
    elementStyles,
    updateElementStyle,
    resetElementStyle,
    customFonts,
    resumeData,
    updateProfile,
    theme,
    updateTheme,
  } = useResumeStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedElementId) {
        setSelectedElementId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElementId, setSelectedElementId])

  // Build list of all available fonts
  const allFonts = [
    ...IMPECCABLE_FONTS,
    ...customFonts
      .filter((f) => !IMPECCABLE_FONTS.some((bf) => bf.name.toLowerCase() === f.toLowerCase()))
      .map((f) => ({ name: f, label: `${f} (Custom)`, category: 'Custom' })),
  ]

  const currentStyle: ElementCustomStyle = selectedElementId
    ? elementStyles[selectedElementId] || {}
    : {}

  const handleStyleChange = (field: keyof ElementCustomStyle, value: any) => {
    if (!selectedElementId) return
    updateElementStyle(selectedElementId, { [field]: value })
  }

  const handleNumberChange = (field: keyof ElementCustomStyle, rawVal: string) => {
    if (rawVal === '') {
      handleStyleChange(field, undefined)
      return
    }
    const num = parseFloat(rawVal)
    if (!isNaN(num)) {
      handleStyleChange(field, num)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ avatarUrl: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  // Pre-calculate human-readable element title
  const cleanElementLabel = selectedElementId
    ? selectedElementId
        .replace(/^resume-/, '')
        .replace(/^portfolio-/, '')
        .replace(/^web-/, '')
        .replace(/^template-/, '')
        .replace(/-/g, ' ')
        .toUpperCase()
    : ''

  const isVisible = Boolean(selectedElementId)

  // Context-aware type detection
  const isPhotoElement =
    selectedElementId !== null &&
    (selectedElementId.includes('avatar') ||
      selectedElementId.includes('photo') ||
      selectedElementId.includes('image') ||
      selectedElementId.includes('media'))

  const isBackgroundElement =
    selectedElementId !== null &&
    (selectedElementId === 'resume-a4-page' ||
      selectedElementId.includes('background') ||
      selectedElementId.includes('canvas-bg'))

  return (
    <>
      {/* Dynamic CSS rules injected globally so custom styles persist even when deselecting */}
      <style>{`
        ${Object.entries(elementStyles)
          .map(([id, s]) => {
            const rules: string[] = []
            if (s.fontFamily) rules.push(`font-family: "${s.fontFamily}", monospace !important;`)
            if (typeof s.fontSize === 'number' && s.fontSize > 0)
              rules.push(`font-size: ${s.fontSize}px !important;`)
            if (typeof s.lineHeight === 'number' && s.lineHeight > 0)
              rules.push(`line-height: ${s.lineHeight} !important;`)
            if (typeof s.padding === 'number') rules.push(`padding: ${s.padding}px !important;`)
            if (typeof s.margin === 'number') rules.push(`margin: ${s.margin}px !important;`)
            if (typeof s.letterSpacing === 'number')
              rules.push(`letter-spacing: ${s.letterSpacing}px !important;`)
            if (typeof s.width === 'number' && s.width > 0) {
              rules.push(`width: ${s.width}px !important;`)
              rules.push(`max-width: ${s.width}px !important;`)
            }
            if (typeof s.height === 'number' && s.height > 0) {
              rules.push(`height: ${s.height}px !important;`)
            }
            if (typeof s.borderWidth === 'number') {
              rules.push(`border-width: ${s.borderWidth}px !important;`)
              rules.push(`border-style: ${s.borderWidth > 0 ? 'solid' : 'none'} !important;`)
            }
            if (s.borderColor) {
              rules.push(`border-color: ${s.borderColor} !important;`)
            }
            if (typeof s.borderRadius === 'number') {
              rules.push(`border-radius: ${s.borderRadius}px !important;`)
            }
            if (s.backgroundColor) {
              rules.push(`background-color: ${s.backgroundColor} !important;`)
            }
            if (s.color) {
              rules.push(`color: ${s.color} !important;`)
            }
            if (rules.length === 0) return ''
            return `[id="${id}"], [id="${id}"] img, [data-element-id="${id}"] { ${rules.join(' ')} }`
          })
          .join('\n')}
      `}</style>

      {/* Slide-in Property Editor Panel */}
      {isVisible && selectedElementId && (
        <aside
          aria-label="Property Inspector Panel"
          className="fixed top-0 right-0 h-screen w-80 sm:w-96 z-50 bg-[#181A1F]/95 backdrop-blur-2xl border-l border-[#282A33] shadow-[-14px_0_45px_rgba(0,0,0,0.65)] flex flex-col font-body text-[#F7F4EB] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#282A33] bg-[#121316]/90 flex-shrink-0">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="min-w-0">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F7F4EB] flex items-center gap-1.5">
                  Property Inspector
                </h3>
                <p
                  className="text-[10px] font-mono text-[#FF6F3C] truncate tracking-tight"
                  title={`#${selectedElementId}`}
                >
                  #{selectedElementId}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => resetElementStyle(selectedElementId)}
                className="p-1.5 rounded-lg text-[#A8A49A] hover:text-[#FF6F3C] hover:bg-[#22252D] transition-colors border border-transparent hover:border-[#282A33]"
                title="Reset all custom styles for this element"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedElementId(null)}
                className="p-1.5 rounded-lg text-[#A8A49A] hover:text-[#F7F4EB] hover:bg-[#22252D] transition-colors border border-transparent hover:border-[#282A33]"
                title="Close inspector (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Target Banner */}
          <div className="px-5 py-2.5 bg-[#22252D]/70 border-b border-[#282A33] flex items-center justify-between text-[11px] font-mono text-[#A8A49A]">
            <span className="truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3C] inline-block" />
              <strong className="text-[#F7F4EB] truncate">{cleanElementLabel}</strong>
            </span>
            <span className="text-[9px] text-[#5D8A8A] bg-[#121316] px-2 py-0.5 rounded border border-[#282A33] font-mono uppercase tracking-wider">
              {isPhotoElement
                ? 'Photo Target'
                : isBackgroundElement
                ? 'Canvas Background'
                : 'Selected'}
            </span>
          </div>

          {/* Controls Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            {/* ------------------------------------------------------------------ */}
            {/* VARIANT A: PHOTO / IMAGE INSPECTOR (NO TYPOGRAPHY)                */}
            {/* ------------------------------------------------------------------ */}
            {isPhotoElement && (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#282A33]">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-3.5 h-3.5 text-[#FF6F3C]" />
                    <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#F7F4EB] uppercase">
                      Photo Settings
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-[#5D8A8A] tracking-wider uppercase">
                    Image Framing
                  </span>
                </div>

                {/* Upload Section */}
                <div className="p-4 rounded-xl bg-[#121316] border border-[#282A33] space-y-3.5">
                  <div className="flex items-center space-x-3.5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-[#FF6F3C] bg-[#181A1F] flex-shrink-0 flex items-center justify-center">
                      {resumeData.profile.avatarUrl ? (
                        <img
                          src={resumeData.profile.avatarUrl}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-[#A8A49A]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-lg bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      {resumeData.profile.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => updateProfile({ avatarUrl: '' })}
                          className="w-full py-1 text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove Photo</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Direct URL input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#A8A49A] block">
                      Direct Photo URL
                    </label>
                    <input
                      type="text"
                      value={resumeData.profile.avatarUrl || ''}
                      onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full bg-[#181A1F] border border-[#282A33] focus:border-[#FF6F3C] rounded px-2.5 py-1.5 text-xs font-mono text-[#F7F4EB] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Resizing Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#A8A49A] flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-[#FF6F3C]" />
                      Photo Size
                    </span>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        min="48"
                        max="240"
                        value={currentStyle.width || 80}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          handleStyleChange('width', val)
                          handleStyleChange('height', val)
                        }}
                        className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#FF6F3C] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#FF6F3C] font-bold focus:outline-none"
                      />
                      <span className="text-[10px] text-[#A8A49A]">px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="48"
                    max="200"
                    step="2"
                    value={currentStyle.width || 80}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      handleStyleChange('width', val)
                      handleStyleChange('height', val)
                    }}
                    className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#FF6F3C]"
                  />
                  {/* Preset Pills */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {[
                      { label: '64px', val: 64 },
                      { label: '80px', val: 80 },
                      { label: '96px', val: 96 },
                      { label: '128px', val: 128 },
                      { label: '160px', val: 160 },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          handleStyleChange('width', p.val)
                          handleStyleChange('height', p.val)
                        }}
                        className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                          (currentStyle.width || 80) === p.val
                            ? 'bg-[#FF6F3C] text-[#121316] border-[#FF6F3C] font-bold'
                            : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Border & Corner Radius */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#A8A49A]">Border Width</span>
                    <span className="text-[#5D8A8A] font-bold">
                      {currentStyle.borderWidth ?? 2}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={currentStyle.borderWidth ?? 2}
                    onChange={(e) => handleStyleChange('borderWidth', Number(e.target.value))}
                    className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#5D8A8A]"
                  />

                  {/* Border Shape Toggle */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono text-[#A8A49A] block">
                      Corner Shape
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStyleChange('borderRadius', 9999)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                          (currentStyle.borderRadius ?? 9999) >= 100
                            ? 'bg-[#5D8A8A] text-[#121316] border-[#5D8A8A] font-bold'
                            : 'bg-[#121316] text-[#A8A49A] border-[#282A33]'
                        }`}
                      >
                        <Circle className="w-3.5 h-3.5" />
                        <span>Round</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStyleChange('borderRadius', 16)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                          currentStyle.borderRadius === 16
                            ? 'bg-[#5D8A8A] text-[#121316] border-[#5D8A8A] font-bold'
                            : 'bg-[#121316] text-[#A8A49A] border-[#282A33]'
                        }`}
                      >
                        <Box className="w-3.5 h-3.5" />
                        <span>Soft Box</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStyleChange('borderRadius', 0)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                          currentStyle.borderRadius === 0
                            ? 'bg-[#5D8A8A] text-[#121316] border-[#5D8A8A] font-bold'
                            : 'bg-[#121316] text-[#A8A49A] border-[#282A33]'
                        }`}
                      >
                        <Square className="w-3.5 h-3.5" />
                        <span>Square</span>
                      </button>
                    </div>
                  </div>

                  {/* Border Color Swatches */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono text-[#A8A49A] block">
                      Border Color
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {PALETTE_SWATCHES.slice(0, 6).map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => handleStyleChange('borderColor', c.hex)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            (currentStyle.borderColor || '#FF6F3C') === c.hex
                              ? 'scale-125 border-white shadow-md'
                              : 'border-transparent hover:scale-110'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                      <input
                        type="color"
                        value={currentStyle.borderColor || '#FF6F3C'}
                        onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                        className="w-6 h-6 rounded border border-[#282A33] bg-transparent cursor-pointer"
                        title="Custom Color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VARIANT B: DOCUMENT BACKGROUND & PALETTE (NO TYPOGRAPHY)          */}
            {/* ------------------------------------------------------------------ */}
            {isBackgroundElement && (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#282A33]">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-3.5 h-3.5 text-[#FF6F3C]" />
                    <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#F7F4EB] uppercase">
                      Document Palette & Canvas
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-[#5D8A8A] tracking-wider uppercase">
                    A4 Canvas Spec
                  </span>
                </div>

                {/* Document Background Color Section */}
                <div className="p-4 rounded-xl bg-[#121316] border border-[#282A33] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F7F4EB]">
                      A4 Page Background
                    </span>
                    <span className="text-[10px] font-mono text-[#FF6F3C]">
                      {theme.backgroundColor || '#D8CEBA'}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {PALETTE_SWATCHES.map((swatch) => {
                      const isSelected =
                        (theme.backgroundColor || '#D8CEBA').toLowerCase() ===
                        swatch.hex.toLowerCase()
                      return (
                        <button
                          key={swatch.name}
                          type="button"
                          onClick={() => {
                            updateTheme({ backgroundColor: swatch.hex })
                            updateElementStyle('resume-a4-page', { backgroundColor: swatch.hex })
                          }}
                          className={`h-8 rounded-lg border-2 transition-transform cursor-pointer relative flex items-center justify-center ${
                            isSelected
                              ? 'scale-110 border-[#FF6F3C] ring-2 ring-[#FF6F3C]/40 shadow-md'
                              : 'border-[#282A33] hover:scale-105'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={`${swatch.name} (${swatch.hex})`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="color"
                      value={theme.backgroundColor || '#D8CEBA'}
                      onChange={(e) => {
                        updateTheme({ backgroundColor: e.target.value })
                        updateElementStyle('resume-a4-page', { backgroundColor: e.target.value })
                      }}
                      className="w-8 h-8 rounded border border-[#282A33] bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.backgroundColor || '#D8CEBA'}
                      onChange={(e) => {
                        updateTheme({ backgroundColor: e.target.value })
                        updateElementStyle('resume-a4-page', { backgroundColor: e.target.value })
                      }}
                      className="flex-1 bg-[#181A1F] border border-[#282A33] focus:border-[#FF6F3C] rounded px-2.5 py-1 text-xs font-mono text-[#F7F4EB] focus:outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Four Document Text Colors */}
                <div className="space-y-4">
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F7F4EB] flex items-center gap-1.5">
                    <span>4 Document Font Colors</span>
                  </h5>

                  {/* 1. Primary Text Color */}
                  <div className="p-3 rounded-lg bg-[#121316] border border-[#282A33] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#F7F4EB] font-bold">1. Primary Text (Titles & Headings)</span>
                      <span className="text-[#A8A49A]">{theme.primaryTextColor || '#0A0B0E'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={theme.primaryTextColor || '#0A0B0E'}
                        onChange={(e) => {
                          updateTheme({ primaryTextColor: e.target.value })
                          updateElementStyle('resume-a4-page', { color: e.target.value })
                        }}
                        className="w-7 h-7 rounded border border-[#282A33] bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.primaryTextColor || '#0A0B0E'}
                        onChange={(e) => {
                          updateTheme({ primaryTextColor: e.target.value })
                          updateElementStyle('resume-a4-page', { color: e.target.value })
                        }}
                        className="flex-1 bg-[#181A1F] border border-[#282A33] rounded px-2 py-1 text-xs font-mono text-[#F7F4EB] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* 2. Secondary Text Color */}
                  <div className="p-3 rounded-lg bg-[#121316] border border-[#282A33] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A] font-bold">2. Secondary Text (Body & Summaries)</span>
                      <span className="text-[#A8A49A]">{theme.secondaryTextColor || '#2C2D33'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={theme.secondaryTextColor || '#2C2D33'}
                        onChange={(e) => updateTheme({ secondaryTextColor: e.target.value })}
                        className="w-7 h-7 rounded border border-[#282A33] bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.secondaryTextColor || '#2C2D33'}
                        onChange={(e) => updateTheme({ secondaryTextColor: e.target.value })}
                        className="flex-1 bg-[#181A1F] border border-[#282A33] rounded px-2 py-1 text-xs font-mono text-[#F7F4EB] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* 3. Tertiary Accent Color */}
                  <div className="p-3 rounded-lg bg-[#121316] border border-[#282A33] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#FF6F3C] font-bold">3. Tertiary Color (Accents & Badges)</span>
                      <span className="text-[#A8A49A]">{theme.tertiaryColor || theme.accentColor || '#FF6F3C'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={theme.tertiaryColor || theme.accentColor || '#FF6F3C'}
                        onChange={(e) =>
                          updateTheme({ tertiaryColor: e.target.value, accentColor: e.target.value })
                        }
                        className="w-7 h-7 rounded border border-[#282A33] bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.tertiaryColor || theme.accentColor || '#FF6F3C'}
                        onChange={(e) =>
                          updateTheme({ tertiaryColor: e.target.value, accentColor: e.target.value })
                        }
                        className="flex-1 bg-[#181A1F] border border-[#282A33] rounded px-2 py-1 text-xs font-mono text-[#F7F4EB] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* 4. Quaternary Highlight Color */}
                  <div className="p-3 rounded-lg bg-[#121316] border border-[#282A33] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#5D8A8A] font-bold">4. Quaternary Color (Dates & Tags)</span>
                      <span className="text-[#A8A49A]">{theme.quaternaryColor || '#5D8A8A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={theme.quaternaryColor || '#5D8A8A'}
                        onChange={(e) => updateTheme({ quaternaryColor: e.target.value })}
                        className="w-7 h-7 rounded border border-[#282A33] bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.quaternaryColor || '#5D8A8A'}
                        onChange={(e) => updateTheme({ quaternaryColor: e.target.value })}
                        className="flex-1 bg-[#181A1F] border border-[#282A33] rounded px-2 py-1 text-xs font-mono text-[#F7F4EB] focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* VARIANT C: STANDARD TYPOGRAPHY & SPACING INSPECTOR                 */}
            {/* ------------------------------------------------------------------ */}
            {!isPhotoElement && !isBackgroundElement && (
              <>
                {/* SECTION 1: TYPOGRAPHY */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#282A33]">
                    <div className="flex items-center space-x-2">
                      <Type className="w-3.5 h-3.5 text-[#FF6F3C]" />
                      <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#F7F4EB] uppercase">
                        Typography
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono text-[#5D8A8A] tracking-wider uppercase">
                      Impeccable Type
                    </span>
                  </div>

                  {/* Font Family Dropdown */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="prop-font-family"
                      className="text-[11px] font-mono text-[#A8A49A] flex items-center justify-between"
                    >
                      <span>Font Family</span>
                      {currentStyle.fontFamily && (
                        <span className="text-[9px] text-[#FF6F3C] font-mono">Custom</span>
                      )}
                    </label>
                    <div className="relative">
                      <select
                        id="prop-font-family"
                        value={currentStyle.fontFamily || ''}
                        onChange={(e) => handleStyleChange('fontFamily', e.target.value || undefined)}
                        className="w-full bg-[#121316] border border-[#282A33] focus:border-[#FF6F3C] rounded-lg px-3 py-2 text-xs font-mono text-[#F7F4EB] focus:outline-none focus:ring-1 focus:ring-[#FF6F3C] transition-colors cursor-pointer appearance-none"
                      >
                        <option value="">Inherit (Template Default)</option>
                        {allFonts.map((f) => (
                          <option key={f.name} value={f.name}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#A8A49A]">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text Size Slider & Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A]">Text Size</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="8"
                          max="72"
                          value={currentStyle.fontSize ?? 14}
                          onChange={(e) => handleNumberChange('fontSize', e.target.value)}
                          className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#FF6F3C] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#FF6F3C] font-bold focus:outline-none"
                        />
                        <span className="text-[10px] text-[#A8A49A]">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="9"
                      max="64"
                      step="1"
                      value={currentStyle.fontSize ?? 14}
                      onChange={(e) => handleStyleChange('fontSize', Number(e.target.value))}
                      className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#FF6F3C]"
                    />
                    {/* Size Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { label: 'XS 10', val: 10 },
                        { label: 'SM 12', val: 12 },
                        { label: 'MD 14', val: 14 },
                        { label: 'LG 18', val: 18 },
                        { label: 'XL 24', val: 24 },
                        { label: '2XL 32', val: 32 },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleStyleChange('fontSize', p.val)}
                          className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                            currentStyle.fontSize === p.val
                              ? 'bg-[#FF6F3C] text-[#121316] border-[#FF6F3C] font-bold'
                              : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB] hover:border-[#FF6F3C]/50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line Height Slider & Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A]">Line Height</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="0.8"
                          max="2.6"
                          step="0.05"
                          value={currentStyle.lineHeight ?? 1.5}
                          onChange={(e) => handleNumberChange('lineHeight', e.target.value)}
                          className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#5D8A8A] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#5D8A8A] font-bold focus:outline-none"
                        />
                        <span className="text-[10px] text-[#A8A49A]">x</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0.9"
                      max="2.5"
                      step="0.05"
                      value={currentStyle.lineHeight ?? 1.5}
                      onChange={(e) => handleStyleChange('lineHeight', Number(e.target.value))}
                      className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#5D8A8A]"
                    />
                    {/* Line Height Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { label: 'Tight 1.1x', val: 1.15 },
                        { label: 'Body 1.4x', val: 1.4 },
                        { label: 'Editorial 1.6x', val: 1.6 },
                        { label: 'Airy 2.0x', val: 2.0 },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleStyleChange('lineHeight', p.val)}
                          className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                            currentStyle.lineHeight === p.val
                              ? 'bg-[#5D8A8A] text-[#121316] border-[#5D8A8A] font-bold'
                              : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB] hover:border-[#5D8A8A]/50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* SECTION 2: SPACING */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#282A33]">
                    <div className="flex items-center space-x-2">
                      <Maximize2 className="w-3.5 h-3.5 text-[#F2B705]" />
                      <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#F7F4EB] uppercase">
                        Spacing
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono text-[#F2B705] tracking-wider uppercase">
                      Grid Mesh
                    </span>
                  </div>

                  {/* Padding Input & Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A] flex items-center gap-1">
                        <Box className="w-3 h-3 text-[#A8A49A]" />
                        Padding
                      </span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="0"
                          max="64"
                          value={currentStyle.padding ?? 0}
                          onChange={(e) => handleNumberChange('padding', e.target.value)}
                          className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#F2B705] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#F2B705] font-bold focus:outline-none"
                        />
                        <span className="text-[10px] text-[#A8A49A]">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="48"
                      step="1"
                      value={currentStyle.padding ?? 0}
                      onChange={(e) => handleStyleChange('padding', Number(e.target.value))}
                      className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#F2B705]"
                    />
                    {/* Padding Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { label: '0px', val: 0 },
                        { label: '4px', val: 4 },
                        { label: '8px', val: 8 },
                        { label: '16px', val: 16 },
                        { label: '24px', val: 24 },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleStyleChange('padding', p.val)}
                          className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                            currentStyle.padding === p.val
                              ? 'bg-[#F2B705] text-[#121316] border-[#F2B705] font-bold'
                              : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB] hover:border-[#F2B705]/50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Margin Input & Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A] flex items-center gap-1">
                        <MoveHorizontal className="w-3 h-3 text-[#A8A49A]" />
                        Margin
                      </span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="0"
                          max="64"
                          value={currentStyle.margin ?? 0}
                          onChange={(e) => handleNumberChange('margin', e.target.value)}
                          className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#B39ACD] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#B39ACD] font-bold focus:outline-none"
                        />
                        <span className="text-[10px] text-[#A8A49A]">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="48"
                      step="1"
                      value={currentStyle.margin ?? 0}
                      onChange={(e) => handleStyleChange('margin', Number(e.target.value))}
                      className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#B39ACD]"
                    />
                    {/* Margin Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { label: '0px', val: 0 },
                        { label: '4px', val: 4 },
                        { label: '8px', val: 8 },
                        { label: '16px', val: 16 },
                        { label: '24px', val: 24 },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleStyleChange('margin', p.val)}
                          className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                            currentStyle.margin === p.val
                              ? 'bg-[#B39ACD] text-[#121316] border-[#B39ACD] font-bold'
                              : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB] hover:border-[#B39ACD]/50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Letter Spacing Input & Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8A49A]">Letter Spacing</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="-3"
                          max="12"
                          step="0.5"
                          value={currentStyle.letterSpacing ?? 0}
                          onChange={(e) => handleNumberChange('letterSpacing', e.target.value)}
                          className="w-14 bg-[#121316] border border-[#282A33] focus:border-[#FF6F3C] rounded px-1.5 py-0.5 text-right font-mono text-xs text-[#FF6F3C] font-bold focus:outline-none"
                        />
                        <span className="text-[10px] text-[#A8A49A]">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="10"
                      step="0.5"
                      value={currentStyle.letterSpacing ?? 0}
                      onChange={(e) => handleStyleChange('letterSpacing', Number(e.target.value))}
                      className="w-full h-1.5 bg-[#22252D] rounded-lg appearance-none cursor-pointer accent-[#FF6F3C]"
                    />
                    {/* Letter Spacing Preset Pills */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { label: '-1px', val: -1 },
                        { label: '0px', val: 0 },
                        { label: '+1px', val: 1 },
                        { label: '+2px', val: 2 },
                        { label: '+4px', val: 4 },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleStyleChange('letterSpacing', p.val)}
                          className={`flex-1 py-1 text-[9px] font-mono rounded border transition-colors ${
                            currentStyle.letterSpacing === p.val
                              ? 'bg-[#FF6F3C] text-[#121316] border-[#FF6F3C] font-bold'
                              : 'bg-[#121316] text-[#A8A49A] border-[#282A33] hover:text-[#F7F4EB] hover:border-[#FF6F3C]/50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Real-time Typography Preview Box */}
                <div className="p-3.5 rounded-xl bg-[#121316] border border-[#282A33] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#A8A49A]">
                    <span>Live Preview</span>
                    <span className="text-[9px] text-[#5D8A8A] font-mono">
                      {currentStyle.fontFamily || 'Courier Prime'}
                    </span>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-[#181A1F] border border-[#282A33] text-[#F7F4EB] overflow-hidden select-none"
                    style={{
                      fontFamily: currentStyle.fontFamily || 'Courier Prime',
                      fontSize: `${Math.min(Math.max(currentStyle.fontSize || 13, 10), 22)}px`,
                      lineHeight: currentStyle.lineHeight || 1.4,
                      letterSpacing: `${currentStyle.letterSpacing || 0}px`,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog. 1960 Space Age Spec.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#282A33] bg-[#121316]/95 flex items-center justify-between gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => resetElementStyle(selectedElementId)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-mono font-medium text-[#A8A49A] hover:text-[#FF6F3C] bg-[#22252D] hover:bg-[#282A33] border border-[#282A33] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setSelectedElementId(null)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold text-[#121316] bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Done
            </button>
          </div>
        </aside>
      )}
    </>
  )
}

export default PropertyEditor
