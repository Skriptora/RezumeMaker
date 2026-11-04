import React from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import type { TemplateId } from '../../types/resume'
import {
  Check,
  Sliders,
  ArrowRight,
} from 'lucide-react'

interface TemplateOption {
  id: TemplateId
  name: string
  description: string
  badge: string
  bestFor: string
  defaultColor: string
  defaultFont: 'sans' | 'serif' | 'mono'
  cardBg: string
}

export const TemplatesView: React.FC = () => {
  const { theme, updateTheme, setActiveTab } = useResumeStore()

  const templates: TemplateOption[] = [
    {
      id: 'retro-futuristic',
      name: 'Retro Typewriter Studio',
      description: 'Mid-century typewriter layout: Burnt Orange, Deeper Cream, and Gritty Foggy Black with Courier Prime.',
      badge: 'Typewriter Edition',
      bestFor: 'Full-Stack Architects, Creative Engineers & Authors',
      defaultColor: '#FF6F3C', // Burnt Orange
      defaultFont: 'serif',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
    {
      id: 'space-age',
      name: 'Space-Age Googie',
      description: 'Atomic age curves, orbital star badges, and Sunburst Yellow on Gritty Foggy Black.',
      badge: 'Atomic Spec',
      bestFor: 'Founders, Tech Leads & Visionaries',
      defaultColor: '#F2B705', // Sunburst Yellow
      defaultFont: 'sans',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Clean typography, balanced whitespace, and ultra-high ATS parsing compatibility.',
      badge: 'ATS Recommended',
      bestFor: 'Software Engineers, Architects & Devs',
      defaultColor: '#5D8A8A', // Retro Teal
      defaultFont: 'sans',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
    {
      id: 'executive',
      name: 'Executive Slate',
      description: 'Authoritative, refined layout engineered for senior leadership and staff roles.',
      badge: 'High Impact',
      bestFor: 'Directors, VPs, Lead Architects',
      defaultColor: '#121316', // Gritty Black
      defaultFont: 'sans',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
    {
      id: 'creative',
      name: 'Creative Tech',
      description: 'Vibrant accents, modern pill tags, and sleek dual-tone emphasis.',
      badge: 'Portfolio Favorite',
      bestFor: 'Product Designers, Frontend Leads',
      defaultColor: '#B39ACD', // Vintage Lavender
      defaultFont: 'sans',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
    {
      id: 'technical',
      name: 'Terminal & Hacker',
      description: 'Monospaced precision styling optimized for open-source contributors and DevOps.',
      badge: 'Terminal Spec',
      bestFor: 'DevOps, SREs, Systems Hackers',
      defaultColor: '#10b981', // Emerald
      defaultFont: 'mono',
      cardBg: 'bg-[#EDE6D8] dark:bg-[#181A1F]',
    },
  ]

  const accentColors = [
    { label: 'Burnt Orange', hex: '#FF6F3C' },
    { label: 'Retro Teal', hex: '#5D8A8A' },
    { label: 'Sunburst Yellow', hex: '#F2B705' },
    { label: 'Vintage Lavender', hex: '#B39ACD' },
    { label: 'Gritty Black', hex: '#121316' },
    { label: 'Deeper Cream', hex: '#E6DFD1' },
    { label: 'Light Cream', hex: '#F7F4EB' },
    { label: 'Deep Indigo', hex: '#4f46e5' },
    { label: 'Emerald Mint', hex: '#10b981' },
  ]

  const fonts: { id: 'sans' | 'serif' | 'mono'; label: string; sample: string }[] = [
    { id: 'serif', label: 'Courier Prime / Retro Typewriter', sample: 'Crisp mechanical typewriter with optimal legibility' },
    { id: 'sans', label: 'Special Elite / Vintage Ribbon', sample: 'Tactile ink-ribbon keystroke letterforms' },
    { id: 'mono', label: 'IBM Plex Mono / Telemetry Monospace', sample: 'System console data precision & code structure' },
  ]

  const spacingOptions: { id: 'compact' | 'comfortable' | 'spacious'; label: string }[] = [
    { id: 'compact', label: 'Compact (1-Page Fit)' },
    { id: 'comfortable', label: 'Comfortable (Standard)' },
    { id: 'spacious', label: 'Spacious (Relaxed)' },
  ]

  const handleSelectTemplate = (tpl: TemplateOption) => {
    updateTheme({
      templateId: tpl.id,
      accentColor: tpl.defaultColor,
      fontFamily: tpl.defaultFont,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header Intro */}
      <div className="p-6 rounded-2xl bg-[#EDE6D8]/85 dark:bg-[#181A1F]/85 backdrop-blur-xl border border-[#CCC3B0]/80 dark:border-[#282A33]/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-[#F7F4EB]">
              Curated Theme & Layout Presets
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FF6F3C]/15 text-[#FF6F3C] border border-[#FF6F3C]/40 font-mono">
              Active: {theme.templateId.toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-body text-slate-600 dark:text-[#A8A49A] mt-1">
            Choose a foundation style or calibrate custom accent hues, typography scales, and vertical rhythm.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('builder')}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#FF6F3C] hover:bg-[#FF6F3C]/90 text-[#121316] shadow-sm transition-all cursor-pointer"
        >
          <span>Return to Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((tpl) => {
          const isCurrent = theme.templateId === tpl.id

          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`group cursor-pointer rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden backdrop-blur-xl ${
                isCurrent
                  ? 'border-[#FF6F3C] ring-2 ring-[#FF6F3C]/30 bg-[#DDD5C4]/95 dark:bg-[#22252D]/95 shadow-lg'
                  : 'border-[#CCC3B0]/80 dark:border-[#282A33]/80 bg-[#EDE6D8]/70 dark:bg-[#181A1F]/70 hover:border-[#FF6F3C]/50 hover:shadow-md'
              }`}
            >
              {/* Visual Card Mockup with Clean Retro Solid Blocks (No Gradients) */}
              <div
                className={`w-full h-32 rounded-xl ${tpl.cardBg} p-3 mb-4 border border-[#CCC3B0]/60 dark:border-[#282A33]/60 flex flex-col justify-between relative`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tpl.defaultColor }}
                  />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/80 dark:bg-[#121316]/80 text-slate-800 dark:text-[#F7F4EB] border border-[#282A33]/40">
                    {tpl.badge}
                  </span>
                </div>

                {/* Miniature stylized resume preview lines */}
                <div className="space-y-1.5 opacity-75">
                  <div
                    className="h-2 rounded w-2/3"
                    style={{ backgroundColor: tpl.defaultColor }}
                  />
                  <div className="h-1.5 rounded w-full bg-slate-300 dark:bg-slate-600" />
                  <div className="h-1.5 rounded w-4/5 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex gap-1 pt-1">
                    <div className="h-1.5 w-6 rounded bg-slate-300 dark:bg-slate-600" />
                    <div className="h-1.5 w-8 rounded bg-slate-300 dark:bg-slate-600" />
                    <div className="h-1.5 w-7 rounded bg-slate-300 dark:bg-slate-600" />
                  </div>
                </div>

                {isCurrent && (
                  <div className="absolute inset-0 bg-[#FF6F3C]/10 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                    <span className="px-2.5 py-1 rounded-full bg-[#FF6F3C] text-[#121316] text-[11px] font-mono font-bold flex items-center space-x-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-display font-bold text-slate-900 dark:text-[#F7F4EB] group-hover:text-[#FF6F3C] transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs font-body text-slate-600 dark:text-[#A8A49A] mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#CCC3B0]/60 dark:border-[#282A33]/60 text-[11px] text-slate-500 dark:text-[#A8A49A]">
                <span className="font-semibold text-slate-700 dark:text-[#F7F4EB]">Target:</span>{' '}
                {tpl.bestFor}
              </div>
            </div>
          )
        })}
      </div>

      {/* Fine-Tuning Styling Controls */}
      <div className="bg-[#EDE6D8]/85 dark:bg-[#181A1F]/85 backdrop-blur-xl rounded-2xl border border-[#CCC3B0]/80 dark:border-[#282A33]/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#FF6F3C]/15 text-[#FF6F3C]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-slate-900 dark:text-[#F7F4EB]">
              Fine-Tune Customization
            </h3>
            <p className="text-xs font-body text-slate-600 dark:text-[#A8A49A]">
              Personalize colors, typographic hierarchy, and document density
            </p>
          </div>
        </div>

        {/* 1. Accent Color Palette */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-[#F7F4EB] mb-2.5">
            Accent Palette
          </label>
          <div className="flex flex-wrap gap-2.5">
            {accentColors.map((color) => {
              const isSelected = theme.accentColor === color.hex

              return (
                <button
                  key={color.hex}
                  onClick={() => updateTheme({ accentColor: color.hex })}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FF6F3C] ring-2 ring-[#FF6F3C]/30 bg-[#DDD5C4] dark:bg-[#22252D]'
                      : 'border-[#CCC3B0]/80 dark:border-[#282A33]/80 bg-[#EDE6D8]/60 dark:bg-[#181A1F]/60 hover:border-[#FF6F3C]/50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-slate-800 dark:text-[#F7F4EB]">{color.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Typography Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-[#F7F4EB] mb-2.5">
            Document Typography
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {fonts.map((f) => {
              const isSelected = theme.fontFamily === f.id

              return (
                <div
                  key={f.id}
                  onClick={() => updateTheme({ fontFamily: f.id })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#FF6F3C] ring-2 ring-[#FF6F3C]/30 bg-[#DDD5C4] dark:bg-[#22252D]'
                      : 'border-[#CCC3B0]/80 dark:border-[#282A33]/80 bg-[#EDE6D8]/60 dark:bg-[#181A1F]/60 hover:border-[#FF6F3C]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-[#F7F4EB]">
                      {f.label}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6F3C]" />}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-[#A8A49A] mt-1">
                    {f.sample}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. Document Density */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-[#F7F4EB] mb-2.5">
            Layout & Spacing Density
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {spacingOptions.map((s) => {
              const isSelected = theme.spacing === s.id

              return (
                <button
                  key={s.id}
                  onClick={() => updateTheme({ spacing: s.id })}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FF6F3C] bg-[#DDD5C4] dark:bg-[#22252D] text-[#FF6F3C] ring-2 ring-[#FF6F3C]/30'
                      : 'border-[#CCC3B0]/80 dark:border-[#282A33]/80 bg-[#EDE6D8]/60 dark:bg-[#181A1F]/60 text-slate-800 dark:text-[#F7F4EB]'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
