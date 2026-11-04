export type TabType = 'builder' | 'canvas' | 'templates'

export type IndustryType =
  | 'software'
  | 'engineering_cad'
  | 'data_ai'
  | 'design_product'
  | 'executive'

export type PortfolioAnimationType =
  | 'slide-up'
  | 'fade-in'
  | 'scale-up'
  | 'stagger'
  | 'flip-up'
  | 'bounce'

export type PortfolioTemplateId =
  | 'creative-studio'
  | 'executive-minimalist'
  | 'developer-terminal'
  | 'retro-space-age'
  | 'cyber-kinetic-bauhaus'

export interface PortfolioProjectCard {
  id: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
  linkUrl?: string
  badge?: string
}

export type LayoutStructure = 'two-column' | 'single' | 'grid' | 'retro-split'

export type SectionColumn = 'main' | 'sidebar' | 'full'

export type CustomSectionFormat = 'list' | 'grid' | 'text'

export interface CustomSectionItem {
  id: string
  title: string
  subtitle?: string
  date?: string
  description?: string
  badge?: string
}

export interface CustomSectionData {
  id: string
  formatType: CustomSectionFormat
  content?: string
  items: CustomSectionItem[]
}

export interface ResumeSection {
  id: string
  name: string
  description: string
  iconName: string
  isEnabled: boolean
  isCustom?: boolean
  column?: SectionColumn
  formatType?: CustomSectionFormat
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
  keyMetrics?: string
  toolsUsed?: string[]
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  cadToolsUsed?: string[]
  metricsImpact?: string
  figmaUrl?: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialUrl?: string
}

export interface SkillCategory {
  id: string
  categoryName: string
  skills: string[]
}

export interface ProfileData {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string
  summary: string
  avatarUrl?: string
  // Industry-tailored fields
  industry: IndustryType
  cadTools?: string
  engineeringLicense?: string
  kaggleOrHuggingFace?: string
  figmaOrDribbble?: string
  teamSizeOrBudget?: string
}

export interface ResumeData {
  profile: ProfileData
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  certifications: CertificationItem[]
  skills: SkillCategory[]
  customSections?: Record<string, CustomSectionData>
}

export type TemplateId =
  | 'modern'
  | 'minimalist'
  | 'executive'
  | 'creative'
  | 'technical'
  | 'retro-futuristic'
  | 'space-age'

export interface ResumeTheme {
  templateId: TemplateId
  accentColor: string
  fontFamily: 'sans' | 'serif' | 'mono'
  spacing: 'compact' | 'comfortable' | 'spacious'
  backgroundColor?: string
  primaryTextColor?: string
  secondaryTextColor?: string
  tertiaryColor?: string
  quaternaryColor?: string
}

export type WebEditorViewport = 'desktop' | 'tablet' | 'mobile'
export type WebEditorMode = 'multi-page' | 'single-page'
export type WebEditorPageId = 'home' | 'about' | 'projects' | 'resume' | 'contact'
export type CustomWebComponentType = 'text' | 'image' | 'art' | 'spline' | 'resume-block' | 'project-card'

export interface ElementCustomStyle {
  fontFamily?: string
  fontSize?: number // in px
  lineHeight?: number // multiplier e.g. 1.5
  padding?: number // in px
  margin?: number // in px
  letterSpacing?: number // in px
  width?: number // in px
  height?: number // in px
  borderWidth?: number // in px
  borderColor?: string
  borderRadius?: number // in px
  backgroundColor?: string
  color?: string
}

export interface CustomWebComponent {
  id: string
  page: WebEditorPageId | 'all'
  type: CustomWebComponentType
  title?: string
  content?: string
  imageUrl?: string
  caption?: string
  artStyle?: 'orbital-orb' | 'googie-rings' | 'atomic-spark' | 'wireframe-grid'
  splineUrl?: string
  resumeSection?: 'experience' | 'education' | 'skills' | 'certifications'
  projectCardId?: string
}
