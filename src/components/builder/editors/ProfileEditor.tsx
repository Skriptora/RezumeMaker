import React, { useRef } from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wrench,
  BrainCircuit,
  Palette,
  BriefcaseBusiness,
  Award,
  Upload,
  Camera,
  Trash2,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../common/Icons'

export const ProfileEditor: React.FC = () => {
  const { resumeData, updateProfile } = useResumeStore()
  const { profile } = resumeData
  const industry = profile.industry || 'software'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof typeof profile, value: string) => {
    updateProfile({ [field]: value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo must be less than 5MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        updateProfile({ avatarUrl: result })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    updateProfile({ avatarUrl: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Profile Photo Upload Option */}
      <div className="p-3 rounded-lg border border-[#374151]/70 bg-[#0a0e1a]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="relative group">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#3b82f6]/60 shadow-md ring-2 ring-[#0a0e1a]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#1e293b] border-2 border-dashed border-[#374151] flex items-center justify-center text-[#9ca3af]">
                <Camera className="w-5 h-5 text-[#9ca3af]/70" />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
              title="Change photo"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-display font-semibold text-[#e5e7eb]">
                Profile Photo
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/30">
                A4 PDF Ready
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#9ca3af] mt-0.5">
              PNG, JPG, or WEBP. Displayed in Modern 2-Column & Grid layouts.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-body font-medium bg-[#2d3a50] hover:bg-[#2d3a50]/80 text-[#e5e7eb] border border-[#374151] transition-colors cursor-pointer active:scale-[0.98]"
          >
            <Upload className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>{profile.avatarUrl ? 'Change' : 'Upload Photo'}</span>
          </button>

          {profile.avatarUrl && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="p-1.5 rounded text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors cursor-pointer"
              title="Remove photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Contact Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Full Name
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
              placeholder="e.g. Mohammed Shaheen"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Professional Title / Headline
          </label>
          <input
            type="text"
            value={profile.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
            placeholder="e.g. Senior Full Stack Engineer & Cloud Architect"
          />
        </div>

        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
              placeholder="alex@domain.io"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
              placeholder="San Francisco, CA (Hybrid)"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
            Portfolio / Personal Website
          </label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
            <input
              type="url"
              value={profile.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
              placeholder="https://alexvance.dev"
            />
          </div>
        </div>
      </div>

      {/* Flat Industry-Tailored Parameters (No nested card hierarchy) */}
      <div className="border-t border-b border-[#374151]/50 py-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#60a5fa] flex items-center space-x-1.5">
            {industry === 'engineering_cad' && <Wrench className="w-3.5 h-3.5" />}
            {industry === 'data_ai' && <BrainCircuit className="w-3.5 h-3.5" />}
            {industry === 'design_product' && <Palette className="w-3.5 h-3.5" />}
            {industry === 'executive' && <BriefcaseBusiness className="w-3.5 h-3.5" />}
            {industry === 'software' && <GithubIcon className="w-3.5 h-3.5" />}
            <span>Parameters • {industry.replace('_', ' ').toUpperCase()}</span>
          </span>
          <span className="text-[9px] text-[#9ca3af] font-mono">auto-synced</span>
        </div>

        {/* Software / Tech fields */}
        {industry === 'software' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                GitHub Profile URL
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[#9ca3af]">
                  <GithubIcon className="w-3.5 h-3.5" />
                </span>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-[#9ca3af]">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </span>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        )}

        {/* Engineering / CAD fields */}
        {industry === 'engineering_cad' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Primary CAD / CAM & FEA Suite
              </label>
              <div className="relative">
                <Wrench className="w-3.5 h-3.5 text-[#fbbf24] absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={profile.cadTools || ''}
                  onChange={(e) => handleChange('cadTools', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="SolidWorks, AutoCAD Electrical, ANSYS FEA"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Engineering Licensure / Credentials
              </label>
              <div className="relative">
                <Award className="w-3.5 h-3.5 text-[#fbbf24] absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={profile.engineeringLicense || ''}
                  onChange={(e) => handleChange('engineeringLicense', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="Professional Engineer (PE #88412)"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data Science / AI fields */}
        {industry === 'data_ai' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                HuggingFace / Model Weights URL
              </label>
              <div className="relative">
                <BrainCircuit className="w-3.5 h-3.5 text-[#10b981] absolute left-2.5 top-2" />
                <input
                  type="url"
                  value={profile.kaggleOrHuggingFace || ''}
                  onChange={(e) => handleChange('kaggleOrHuggingFace', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="https://huggingface.co/username"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Kaggle / Research Benchmarks
              </label>
              <input
                type="text"
                value={profile.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                placeholder="https://kaggle.com/username (Grandmaster)"
              />
            </div>
          </div>
        )}

        {/* Product & Design fields */}
        {industry === 'design_product' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Figma Community / Prototypes URL
              </label>
              <div className="relative">
                <Palette className="w-3.5 h-3.5 text-[#7c3aed] absolute left-2.5 top-2" />
                <input
                  type="url"
                  value={profile.figmaOrDribbble || ''}
                  onChange={(e) => handleChange('figmaOrDribbble', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                  placeholder="https://figma.com/@username"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Dribbble / Portfolio Showcase
              </label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                placeholder="https://dribbble.com/username"
              />
            </div>
          </div>
        )}

        {/* Executive / Ops fields */}
        {industry === 'executive' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Scale: Team Size & Budget Managed
              </label>
              <div className="relative">
                <BriefcaseBusiness className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={profile.teamSizeOrBudget || ''}
                  onChange={(e) => handleChange('teamSizeOrBudget', e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                  placeholder="e.g. 25+ Engineers | $14M ARR P&L Scope"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                Executive Profile / Board Bio
              </label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                placeholder="https://linkedin.com/in/exec"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
          Professional Bio / Executive Summary
        </label>
        <textarea
          rows={3}
          value={profile.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="w-full text-xs p-2.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body leading-relaxed"
          placeholder="Concise overview of your technical background, architecture achievements, and core specializations..."
        />
      </div>
    </div>
  )
}
