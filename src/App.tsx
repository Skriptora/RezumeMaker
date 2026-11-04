import React, { useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { ResumeBuilderView } from './components/builder/ResumeBuilderView'
import { VisualPortfolioCanvas } from './components/canvas/VisualPortfolioCanvas'
import { TemplatesView } from './components/templates/TemplatesView'
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
    <div className="min-h-screen flex bg-slate-100/60 dark:bg-[#0a0e1a] text-slate-900 dark:text-[#e5e7eb] font-body transition-colors duration-300">
      {/* Sleek Asymmetric Sidebar */}
      <Sidebar />

      {/* Main Content Area: Offset rightward to establish the clean asymmetric visual break */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:py-6 lg:pl-8 lg:pr-12 w-full">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}

export default App
