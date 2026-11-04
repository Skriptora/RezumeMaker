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
  bgGradient: string
}

export const TemplatesView: React.FC = () => {
  const { theme, updateTheme, setActiveTab } = useResumeStore()

  const templates: TemplateOption[] = [
    {
      id: 'retro-futuristic',
      name: 'Retro-Futuristic Studio',
      description: 'Mid-century space-age color blocking: Burnt Orange, Space Cream, and Retro Teal with DM Serif Display.',
      badge: '✦ 2080 Featured',
      bestFor: 'Full-Stack Architects, Creative Engineers & Designers',
      defaultColor: '#FF6F3C', // Burnt Orange
      defaultFont: 'serif',
      bgGradient: 'from-[#FF6F3C]/25 via-[#F2B705]/20 to-[#5D8A8A]/25',
    },
    {
      id: 'space-age',
      name: 'Space-Age Googie',
      description: 'Atomic age curves, orbital star badges, and Sunburst Yellow on Cosmic Navy.',
      badge: '✦ Atomic Spec',
      bestFor: 'Founders, Tech Leads & Visionaries',
      defaultColor: '#F2B705', // Sunburst Yellow
      defaultFont: 'sans',
      bgGradient: 'from-[#F2B705]/20 via-[#FF6F3C]/15 to-[#B39ACD]/20',
    },
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Clean typography, balanced whitespace, and ultra-high ATS parsing compatibility.',
      badge: 'ATS Recommended',
      bestFor: 'Software Engineers, Architects & Devs',
      defaultColor: '#5D8A8A', // Retro Teal
      defaultFont: 'sans',
      bgGradient: 'from-[#5D8A8A]/15 to-[#B39ACD]/15',
    },
    {
      id: 'executive',
      name: 'Executive Slate',
      description: 'Authoritative, refined layout engineered for senior leadership and staff roles.',
      badge: 'High Impact',
      bestFor: 'Directors, VPs, Lead Architects',
      defaultColor: '#0D1B2A', // Cosmic Navy
      defaultFont: 'sans',
      bgGradient: 'from-slate-500/10 to-zinc-500/10',
    },
    {
      id: 'creative',
      name: 'Creative Tech',
      description: 'Vibrant accents, modern pill tags, and sleek dual-tone emphasis.',
      badge: 'Portfolio Favorite',
      bestFor: 'Product Designers, Frontend Leads',
      defaultColor: '#B39ACD', // Vintage Lavender
      defaultFont: 'sans',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      id: 'technical',
      name: 'Cyberpunk & Terminal',
      description: 'Monospaced precision styling optimized for open-source contributors and DevOps.',
      badge: 'Dev Spec',
      bestFor: 'DevOps, SREs, Systems Hackers',
      defaultColor: '#10b981', // Emerald
      defaultFont: 'mono',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
    },
  ]

  const accentColors = [
    { label: 'Burnt Orange', hex: '#FF6F3C' },
    { label: 'Retro Teal', hex: '#5D8A8A' },
    { label: 'Sunburst Yellow', hex: '#F2B705' },
    { label: 'Vintage Lavender', hex: '#B39ACD' },
    { label: 'Cosmic Navy', hex: '#0D1B2A' },
    { label: 'Space Cream', hex: '#F2EBD7' },
    { label: 'Deep Indigo', hex: '#4f46e5' },
    { label: 'Emerald Mint', hex: '#10b981' },
  ]

  const fonts: { id: 'sans' | 'serif' | 'mono'; label: string; sample: string }[] = [
    { id: 'serif', label: 'DM Serif Display / Space-Age Serif', sample: 'Nostalgic by Design. Futuristic by Vision.' },
    { id: 'sans', label: 'Outfit & Space Grotesk / Geometric', sample: 'Modern, crisp, geometric space-age poise' },
    { id: 'mono', label: 'IBM Plex Mono / Telemetry Specs', sample: 'Technical sub-routine data precision' },
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
      <div className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Curated Theme & Layout Presets
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              Active: {theme.templateId.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose a foundation style or calibrate custom accent hues, typography scales, and vertical rhythm.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('builder')}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          <span>Return to Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {templates.map((tpl) => {
          const isCurrent = theme.templateId === tpl.id

          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`group cursor-pointer rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                isCurrent
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-900 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
              }`}
            >
              {/* Visual Card Mockup */}
              <div
                className={`w-full h-32 rounded-xl bg-gradient-to-br ${tpl.bgGradient} p-3 mb-4 border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between relative`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tpl.defaultColor }}
                  />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300">
                    {tpl.badge}
                  </span>
                </div>

                {/* Miniature stylized resume preview lines */}
                <div className="space-y-1.5 opacity-70">
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
                  <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center space-x-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Target:</span>{' '}
                {tpl.bestFor}
              </div>
            </div>
          )
        })}
      </div>

      {/* Fine-Tuning Styling Controls */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Fine-Tune Customization
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize colors, typographic hierarchy, and document density
            </p>
          </div>
        </div>

        {/* 1. Accent Color Palette */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Accent Palette
          </label>
          <div className="flex flex-wrap gap-2.5">
            {accentColors.map((color) => {
              const isSelected = theme.accentColor === color.hex

              return (
                <button
                  key={color.hex}
                  onClick={() => updateTheme({ accentColor: color.hex })}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-slate-900 dark:border-white ring-2 ring-blue-500/30 bg-slate-50 dark:bg-slate-800'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-slate-800 dark:text-slate-200">{color.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Typography Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
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
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {f.label}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {f.sample}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. Document Density */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Layout & Spacing Density
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {spacingOptions.map((s) => {
              const isSelected = theme.spacing === s.id

              return (
                <button
                  key={s.id}
                  onClick={() => updateTheme({ spacing: s.id })}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium text-left transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
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
