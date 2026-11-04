import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  TabType,
  ResumeSection,
  ResumeData,
  ResumeTheme,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  SkillCategory,
  ProfileData,
  PortfolioProjectCard,
  PortfolioAnimationType,
  PortfolioTemplateId,
  LayoutStructure,
  SectionColumn,
  CustomSectionFormat,
  CustomSectionItem,
  CustomSectionData,
  WebEditorViewport,
  WebEditorMode,
  WebEditorPageId,
  CustomWebComponent,
  ElementCustomStyle,
} from '../types/resume'
import {
  DEFAULT_SECTIONS,
  INITIAL_RESUME_DATA,
  AXIOM_7_MOCK_DATA,
  INITIAL_PORTFOLIO_CARDS,
  INITIAL_WEB_COMPONENTS,
} from '../data/mockData'

export { DEFAULT_SECTIONS, INITIAL_RESUME_DATA, AXIOM_7_MOCK_DATA, INITIAL_PORTFOLIO_CARDS, INITIAL_WEB_COMPONENTS }

interface ResumeStoreState {
  // Navigation
  activeTab: TabType
  setActiveTab: (tab: TabType) => void

  // Dark mode
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (enabled: boolean) => void

  // Dynamic Sections
  sections: ResumeSection[]
  layoutStructure: LayoutStructure
  setLayoutStructure: (layout: LayoutStructure) => void
  toggleSection: (id: string) => void
  setSectionEnabled: (id: string, isEnabled: boolean) => void
  setSectionColumn: (id: string, column: SectionColumn) => void
  reorderSectionInColumn: (activeId: string, overId: string, targetColumn: SectionColumn) => void
  reorderSections: (newSections: ResumeSection[]) => void
  reorderSectionById: (activeId: string, overId: string) => void
  moveSection: (index: number, direction: 'up' | 'down') => void
  addCustomSection: (
    name: string,
    description: string,
    formatType?: CustomSectionFormat,
    column?: SectionColumn,
    iconName?: string
  ) => string
  updateCustomSectionContent: (sectionId: string, content: string) => void
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void
  removeSection: (id: string) => void
  resetSectionsToDefault: () => void

  // Resume Data
  resumeData: ResumeData
  updateProfile: (profile: Partial<ProfileData>) => void
  setIndustry: (industry: import('../types/resume').IndustryType) => void
  
  // Experience CRUD
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void
  deleteExperience: (id: string) => void
  
  // Projects CRUD
  addProject: (proj: Omit<ProjectItem, 'id'>) => void
  updateProject: (id: string, proj: Partial<ProjectItem>) => void
  deleteProject: (id: string) => void

  // Education CRUD
  addEducation: (edu: Omit<EducationItem, 'id'>) => void
  updateEducation: (id: string, edu: Partial<EducationItem>) => void
  deleteEducation: (id: string) => void

  // Certifications CRUD
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void
  deleteCertification: (id: string) => void

  // Skills CRUD
  updateSkills: (skills: SkillCategory[]) => void
  addSkillCategory: (categoryName: string) => void
  addSkillToCategory: (categoryId: string, skill: string) => void
  removeSkillFromCategory: (categoryId: string, skill: string) => void
  deleteSkillCategory: (categoryId: string) => void

  // Theme & Styling
  theme: ResumeTheme
  updateTheme: (partialTheme: Partial<ResumeTheme>) => void

  // Selection & Element Styling
  selectedElementId: string | null
  setSelectedElementId: (id: string | null) => void
  elementStyles: Record<string, ElementCustomStyle>
  updateElementStyle: (elementId: string, style: Partial<ElementCustomStyle>) => void
  resetElementStyle: (elementId: string) => void

  // Visual Portfolio Cards & Animation
  portfolioCards: PortfolioProjectCard[]
  portfolioAnimation: PortfolioAnimationType
  setPortfolioAnimation: (anim: PortfolioAnimationType) => void
  portfolioTemplate: PortfolioTemplateId
  setPortfolioTemplate: (tpl: PortfolioTemplateId) => void
  addPortfolioCard: (card: Omit<PortfolioProjectCard, 'id'>) => void
  updatePortfolioCard: (id: string, card: Partial<PortfolioProjectCard>) => void
  deletePortfolioCard: (id: string) => void
  reorderPortfolioCards: (newCards: PortfolioProjectCard[]) => void

  // Web Editor System (Multi-page, dynamic components, responsive viewports, typography)
  webEditorViewport: WebEditorViewport
  setWebEditorViewport: (viewport: WebEditorViewport) => void
  webEditorMode: WebEditorMode
  setWebEditorMode: (mode: WebEditorMode) => void
  webEditorCurrentPage: WebEditorPageId
  setWebEditorCurrentPage: (page: WebEditorPageId) => void
  webEditorFont: string
  setWebEditorFont: (font: string) => void
  customFonts: string[]
  addCustomFont: (fontName: string) => void
  webComponents: CustomWebComponent[]
  addWebComponent: (comp: Omit<CustomWebComponent, 'id'>) => string
  updateWebComponent: (id: string, updates: Partial<CustomWebComponent>) => void
  deleteWebComponent: (id: string) => void
  reorderWebComponents: (newComponents: CustomWebComponent[]) => void
  isWebEditorEditMode: boolean
  toggleWebEditorEditMode: () => void

  // Bulk reset
  resetAllData: () => void
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set) => ({
      activeTab: 'builder',
      setActiveTab: (tab) => set({ activeTab: tab }),

      isDarkMode: true,
      toggleDarkMode: () =>
        set((state) => {
          const nextVal = !state.isDarkMode
          if (typeof document !== 'undefined') {
            if (nextVal) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
          return { isDarkMode: nextVal }
        }),
      setDarkMode: (enabled) =>
        set(() => {
          if (typeof document !== 'undefined') {
            if (enabled) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
          return { isDarkMode: enabled }
        }),

      sections: DEFAULT_SECTIONS,
      layoutStructure: 'retro-split',
      setLayoutStructure: (layout) => set({ layoutStructure: layout }),
      toggleSection: (id) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, isEnabled: !section.isEnabled } : section
          ),
        })),
      setSectionEnabled: (id, isEnabled) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, isEnabled } : section
          ),
        })),
      setSectionColumn: (id, column) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, column } : section
          ),
        })),
      reorderSectionInColumn: (activeId, overId, targetColumn) =>
        set((state) => {
          const activeIndex = state.sections.findIndex((s) => s.id === activeId)
          if (activeIndex === -1) return state
          
          const updated = [...state.sections]
          const [activeItem] = updated.splice(activeIndex, 1)
          const updatedItem = { ...activeItem, column: targetColumn }

          if (activeId === overId) {
            updated.push(updatedItem)
            return { sections: updated }
          }

          const overIndex = updated.findIndex((s) => s.id === overId)
          if (overIndex === -1) {
            updated.push(updatedItem)
          } else {
            updated.splice(overIndex, 0, updatedItem)
          }
          return { sections: updated }
        }),
      reorderSections: (newSections) => set({ sections: newSections }),
      reorderSectionById: (activeId, overId) =>
        set((state) => {
          if (activeId === overId) return state
          const oldIndex = state.sections.findIndex((s) => s.id === activeId)
          const newIndex = state.sections.findIndex((s) => s.id === overId)
          if (oldIndex === -1 || newIndex === -1) return state
          const newSections = [...state.sections]
          const [moved] = newSections.splice(oldIndex, 1)
          newSections.splice(newIndex, 0, moved)
          return { sections: newSections }
        }),
      moveSection: (index, direction) =>
        set((state) => {
          const targetIndex = direction === 'up' ? index - 1 : index + 1
          if (targetIndex < 0 || targetIndex >= state.sections.length) return state
          const newSections = [...state.sections]
          const [movedItem] = newSections.splice(index, 1)
          newSections.splice(targetIndex, 0, movedItem)
          return { sections: newSections }
        }),
      addCustomSection: (
        name,
        description,
        formatType = 'list',
        column = 'main',
        iconName = 'Sparkles'
      ) => {
        const newId = `custom-${Date.now()}`
        const newSection: ResumeSection = {
          id: newId,
          name,
          description: description || 'Custom tailored section',
          iconName,
          isEnabled: true,
          isCustom: true,
          column,
          formatType,
        }

        let initialData: CustomSectionData
        if (formatType === 'text') {
          initialData = {
            id: newId,
            formatType,
            content:
              'Detailed summary of your research, specialized initiatives, or technical contributions.',
            items: [],
          }
        } else if (formatType === 'grid') {
          initialData = {
            id: newId,
            formatType,
            items: [
              {
                id: `item-${Date.now()}-1`,
                title: 'Primary Milestone / Specialty',
                badge: 'Active',
                description: 'Key deliverables, metrics, and outcomes achieved.',
              },
              {
                id: `item-${Date.now()}-2`,
                title: 'Technical Recognition',
                badge: 'Honors',
                description: 'Recognized for innovation and cross-functional leadership.',
              },
            ],
          }
        } else {
          initialData = {
            id: newId,
            formatType,
            items: [
              {
                id: `item-${Date.now()}-1`,
                title: 'Lead Publication / Project Entry',
                subtitle: 'Host Organization or Journal',
                date: '2024',
                description: 'Comprehensive research and engineering methodologies delivered.',
              },
            ],
          }
        }

        set((state) => ({
          sections: [...state.sections, newSection],
          resumeData: {
            ...state.resumeData,
            customSections: {
              ...(state.resumeData.customSections || {}),
              [newId]: initialData,
            },
          },
        }))
        return newId
      },
      updateCustomSectionContent: (sectionId, content) =>
        set((state) => {
          const existing = state.resumeData.customSections?.[sectionId]
          if (!existing) return state
          return {
            resumeData: {
              ...state.resumeData,
              customSections: {
                ...state.resumeData.customSections,
                [sectionId]: { ...existing, content },
              },
            },
          }
        }),
      addCustomSectionItem: (sectionId, item) =>
        set((state) => {
          const existing = state.resumeData.customSections?.[sectionId]
          if (!existing) return state
          const newItem: CustomSectionItem = {
            ...item,
            id: `item-${Date.now()}`,
          }
          return {
            resumeData: {
              ...state.resumeData,
              customSections: {
                ...state.resumeData.customSections,
                [sectionId]: {
                  ...existing,
                  items: [...(existing.items || []), newItem],
                },
              },
            },
          }
        }),
      updateCustomSectionItem: (sectionId, itemId, itemUpdate) =>
        set((state) => {
          const existing = state.resumeData.customSections?.[sectionId]
          if (!existing) return state
          return {
            resumeData: {
              ...state.resumeData,
              customSections: {
                ...state.resumeData.customSections,
                [sectionId]: {
                  ...existing,
                  items: (existing.items || []).map((it) =>
                    it.id === itemId ? { ...it, ...itemUpdate } : it
                  ),
                },
              },
            },
          }
        }),
      deleteCustomSectionItem: (sectionId, itemId) =>
        set((state) => {
          const existing = state.resumeData.customSections?.[sectionId]
          if (!existing) return state
          return {
            resumeData: {
              ...state.resumeData,
              customSections: {
                ...state.resumeData.customSections,
                [sectionId]: {
                  ...existing,
                  items: (existing.items || []).filter((it) => it.id !== itemId),
                },
              },
            },
          }
        }),
      removeSection: (id) =>
        set((state) => {
          const newCustomSections = { ...(state.resumeData.customSections || {}) }
          delete newCustomSections[id]
          return {
            sections: state.sections.filter((s) => s.id !== id),
            resumeData: {
              ...state.resumeData,
              customSections: newCustomSections,
            },
          }
        }),
      resetSectionsToDefault: () => set({ sections: DEFAULT_SECTIONS }),

      resumeData: INITIAL_RESUME_DATA,
      updateProfile: (profileUpdate) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            profile: { ...state.resumeData.profile, ...profileUpdate },
          },
        })),
      setIndustry: (industry) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            profile: { ...state.resumeData.profile, industry },
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              { ...exp, id: `exp-${Date.now()}` },
              ...state.resumeData.experience,
            ],
          },
        })),
      updateExperience: (id, exp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((item) =>
              item.id === id ? { ...item, ...exp } : item
            ),
          },
        })),
      deleteExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((item) => item.id !== id),
          },
        })),

      addProject: (proj) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              { ...proj, id: `proj-${Date.now()}` },
              ...state.resumeData.projects,
            ],
          },
        })),
      updateProject: (id, proj) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((item) =>
              item.id === id ? { ...item, ...proj } : item
            ),
          },
        })),
      deleteProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((item) => item.id !== id),
          },
        })),

      addEducation: (edu) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              { ...edu, id: `edu-${Date.now()}` },
              ...state.resumeData.education,
            ],
          },
        })),
      updateEducation: (id, edu) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((item) =>
              item.id === id ? { ...item, ...edu } : item
            ),
          },
        })),
      deleteEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((item) => item.id !== id),
          },
        })),

      addCertification: (cert) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [
              { ...cert, id: `cert-${Date.now()}` },
              ...state.resumeData.certifications,
            ],
          },
        })),
      updateCertification: (id, cert) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((item) =>
              item.id === id ? { ...item, ...cert } : item
            ),
          },
        })),
      deleteCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((item) => item.id !== id),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills,
          },
        })),
      addSkillCategory: (categoryName) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              { id: `cat-${Date.now()}`, categoryName, skills: [] },
            ],
          },
        })),
      addSkillToCategory: (categoryId, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    skills: cat.skills.includes(skill.trim())
                      ? cat.skills
                      : [...cat.skills, skill.trim()],
                  }
                : cat
            ),
          },
        })),
      removeSkillFromCategory: (categoryId, skillToRemove) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    skills: cat.skills.filter((s) => s !== skillToRemove),
                  }
                : cat
            ),
          },
        })),
      deleteSkillCategory: (categoryId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((c) => c.id !== categoryId),
          },
        })),

      theme: {
        templateId: 'retro-futuristic',
        accentColor: '#FF6F3C', // Burnt Orange
        fontFamily: 'serif',
        spacing: 'comfortable',
      },
      updateTheme: (partialTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...partialTheme },
        })),

      selectedElementId: null,
      setSelectedElementId: (id) => set({ selectedElementId: id }),
      elementStyles: {},
      updateElementStyle: (elementId, style) =>
        set((state) => {
          const current = state.elementStyles[elementId] || {}
          const updated = { ...current }
          for (const [key, value] of Object.entries(style)) {
            if (value === undefined || value === '') {
              delete (updated as Record<string, unknown>)[key]
            } else {
              (updated as Record<string, unknown>)[key] = value
            }
          }
          return {
            elementStyles: {
              ...state.elementStyles,
              [elementId]: updated,
            },
          }
        }),
      resetElementStyle: (elementId) =>
        set((state) => {
          const next = { ...state.elementStyles }
          delete next[elementId]
          return { elementStyles: next }
        }),

      portfolioCards: INITIAL_PORTFOLIO_CARDS,
      portfolioAnimation: 'stagger',
      setPortfolioAnimation: (anim) => set({ portfolioAnimation: anim }),
      portfolioTemplate: 'retro-space-age',
      setPortfolioTemplate: (tpl) => set({ portfolioTemplate: tpl }),
      addPortfolioCard: (card) =>
        set((state) => ({
          portfolioCards: [
            { ...card, id: `port-${Date.now()}` },
            ...state.portfolioCards,
          ],
        })),
      updatePortfolioCard: (id, card) =>
        set((state) => ({
          portfolioCards: state.portfolioCards.map((c) =>
            c.id === id ? { ...c, ...card } : c
          ),
        })),
      deletePortfolioCard: (id) =>
        set((state) => ({
          portfolioCards: state.portfolioCards.filter((c) => c.id !== id),
        })),
      reorderPortfolioCards: (newCards) => set({ portfolioCards: newCards }),

      // Web Editor System
      webEditorViewport: 'desktop',
      setWebEditorViewport: (viewport) => set({ webEditorViewport: viewport }),
      webEditorMode: 'multi-page',
      setWebEditorMode: (mode) => set({ webEditorMode: mode }),
      webEditorCurrentPage: 'home',
      setWebEditorCurrentPage: (page) => set({ webEditorCurrentPage: page }),
      webEditorFont: 'Courier Prime',
      setWebEditorFont: (font) => set({ webEditorFont: font }),
      customFonts: [
        'Courier Prime',
        'Special Elite',
        'Space Grotesk',
        'IBM Plex Mono',
        'Syne',
        'Cinzel',
      ],
      addCustomFont: (fontName) => {
        const cleanName = fontName.trim()
        if (!cleanName) return
        if (typeof document !== 'undefined') {
          const fontId = `custom-font-${cleanName.replace(/\s+/g, '-').toLowerCase()}`
          if (!document.getElementById(fontId)) {
            const link = document.createElement('link')
            link.id = fontId
            link.rel = 'stylesheet'
            link.href = `https://fonts.googleapis.com/css2?family=${cleanName.replace(/\s+/g, '+')}:ital,wght@0,400;0,600;0,700;1,400&display=swap`
            document.head.appendChild(link)
          }
        }
        set((state) => ({
          customFonts: state.customFonts.includes(cleanName)
            ? state.customFonts
            : [...state.customFonts, cleanName],
          webEditorFont: cleanName,
        }))
      },
      webComponents: INITIAL_WEB_COMPONENTS,
      addWebComponent: (comp) => {
        const id = `web-comp-${Date.now()}`
        set((state) => ({
          webComponents: [...state.webComponents, { ...comp, id }],
        }))
        return id
      },
      updateWebComponent: (id, updates) =>
        set((state) => ({
          webComponents: state.webComponents.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      deleteWebComponent: (id) =>
        set((state) => ({
          webComponents: state.webComponents.filter((c) => c.id !== id),
        })),
      reorderWebComponents: (newComponents) => set({ webComponents: newComponents }),
      isWebEditorEditMode: true,
      toggleWebEditorEditMode: () =>
        set((state) => ({ isWebEditorEditMode: !state.isWebEditorEditMode })),

      resetAllData: () =>
        set({
          selectedElementId: null,
          elementStyles: {},
          sections: DEFAULT_SECTIONS,
          resumeData: INITIAL_RESUME_DATA,
          portfolioCards: INITIAL_PORTFOLIO_CARDS,
          webComponents: INITIAL_WEB_COMPONENTS,
          webEditorViewport: 'desktop',
          webEditorMode: 'multi-page',
          webEditorCurrentPage: 'home',
          webEditorFont: 'Courier Prime',
          isWebEditorEditMode: true,
        }),
    }),
    {
      name: 'rezumemaker-storage',
    }
  )
)

export const useStore = useResumeStore
export default useResumeStore
