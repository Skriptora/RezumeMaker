import React from 'react'
import { useResumeStore } from '../../../store/useResumeStore'
import { Plus, Trash2, Award } from 'lucide-react'
import type { CertificationItem } from '../../../types/resume'

export const CertificationsEditor: React.FC = () => {
  const { resumeData, addCertification, updateCertification, deleteCertification } =
    useResumeStore()
  const { certifications } = resumeData

  const handleAddNew = () => {
    const newCert: Omit<CertificationItem, 'id'> = {
      title: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud Platform',
      issueDate: '2024',
      credentialUrl: 'https://cloud.google.com/certification',
    }
    addCertification(newCert)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] font-mono text-[#9ca3af]">
          {certifications.length} credentials recorded
        </span>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-body font-medium bg-[#3b82f6]/15 hover:bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Credential</span>
        </button>
      </div>

      {/* Flat rows (No nested cards) */}
      <div className="divide-y divide-[#374151]/50 border-t border-b border-[#374151]/50">
        {certifications.map((item) => (
          <div key={item.id} className="py-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="text-xs font-display font-semibold text-slate-800 dark:text-[#e5e7eb]">
                  {item.title || 'Certification Title'}
                </span>
              </div>
              <button
                onClick={() => deleteCertification(item.id)}
                className="text-slate-400 dark:text-[#9ca3af] hover:text-[#ef4444] p-1 cursor-pointer transition-colors"
                title="Delete credential"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Certification Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateCertification(item.id, { title: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={item.issuer}
                  onChange={(e) => updateCertification(item.id, { issuer: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-body"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Issue Date / Year
                </label>
                <input
                  type="text"
                  value={item.issueDate}
                  onChange={(e) => updateCertification(item.id, { issueDate: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-display font-semibold uppercase tracking-wider text-[#9ca3af] mb-1 block">
                  Credential Verification URL
                </label>
                <input
                  type="url"
                  value={item.credentialUrl || ''}
                  onChange={(e) => updateCertification(item.id, { credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0a0e1a]/60 border border-[#374151] focus:border-[#3b82f6] text-[#e5e7eb] placeholder-[#9ca3af]/40 focus:outline-none transition-colors duration-200 font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
