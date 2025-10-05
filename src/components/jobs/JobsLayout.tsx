import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { JobsHeader } from './JobsHeader'
import { JobsFilters } from './JobsFilters'
import { JobsMainContent } from './JobsMainContent'
import { JobsFooter } from './JobsFooter'
import { 
  pageVariants, 
  staggerContainer 
} from './animations'

interface JobsLayoutProps {
  children?: React.ReactNode
}

export const JobsLayout: React.FC<JobsLayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState('cards')

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto py-6">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="space-y-6"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div 
                  className="flex flex-col min-h-0"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Header Toolbar */}
                    <JobsHeader />
                    
                    {/* Filter Bar */}
                    <JobsFilters />
                    
                    {/* Main Content */}
                    <JobsMainContent onViewChange={setActiveView}>
                      {children}
                    </JobsMainContent>
                    
                    {/* Footer */}
                    <JobsFooter />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
