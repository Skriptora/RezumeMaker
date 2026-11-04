import React, { useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { RetroBackgroundArt } from './components/layout/RetroBackgroundArt'
import { ResumeBuilderView } from './components/builder/ResumeBuilderView'
import { VisualPortfolioCanvas } from './components/canvas/VisualPortfolioCanvas'
import { TemplatesView } from './components/templates/TemplatesView'
import { PropertyEditor } from './components/editor/PropertyEditor'
import { useResumeStore } from './store/useResumeStore'

export const App: React.FC = () => {
  const { activeTab, isDarkMode } = useResumeStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'builder':
        return <ResumeBuilderView />
      case 'canvas':
        return <VisualPortfolioCanvas />
      case 'templates':
        return <TemplatesView />
      default:
        return <ResumeBuilderView />
    }
  }

  return (
    <div className="min-h-screen flex bg-[#D8CEBA] dark:bg-[#121316] text-[#0A0B0E] dark:text-[#F7F4EB] font-body transition-colors duration-300 relative selection:bg-[#FF6F3C] selection:text-[#0A0B0E]">
      {/* Retro Abstract Architectural Line Art (Clean Mid-Century Geometric Background, No Gradients) */}
      <RetroBackgroundArt />

      {/* Sleek Glassmorphic Asymmetric Sidebar */}
      <Sidebar />

      {/* Main Content Workspace Container: flex-1 with min-w-0 and overflow-hidden to prevent crushing the sidebar */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden relative z-10">
        <Header />

        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:py-6 lg:pl-8 lg:pr-12 w-full">
          {renderActiveTab()}
        </main>
      </div>

      {/* Property Editor Panel (Slides in when an element is selected) */}
      <PropertyEditor />
    </div>
  )
}

export default App
