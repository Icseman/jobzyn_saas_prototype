import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobsCardsView } from './JobsCardsView'
import { JobsCalendarView } from './JobsCalendarView'
import { JobsMapView } from './JobsMapView'
import { 
  LayoutGridIcon, 
  CalendarIcon, 
  MapIcon 
} from 'lucide-react'
import { 
  viewTransitionVariants, 
  tabVariants,
  iconVariants
} from './animations'

interface JobsMainContentProps {
  onViewChange?: (view: string) => void
}

export const JobsMainContent: React.FC<JobsMainContentProps> = ({ onViewChange }) => {
  const [activeView, setActiveView] = useState('cards')

  const handleViewChange = (view: string) => {
    setActiveView(view)
    onViewChange?.(view)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Tabs value={activeView} onValueChange={handleViewChange} className="flex-1 flex flex-col min-h-0">
        {/* View Toggle */}
        <motion.div 
          className="border-b py-3 flex-shrink-0"
          variants={tabVariants}
          initial="initial"
          animate="animate"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <LayoutGridIcon className="h-4 w-4" />
              </motion.div>
              Cards
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <CalendarIcon className="h-4 w-4" />
              </motion.div>
              Calendar
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <MapIcon className="h-4 w-4" />
              </motion.div>
              Map
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* View Content */}
        <div className="flex-1 overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            <TabsContent value="cards" className="m-0 h-full">
              <motion.div
                key="cards"
                variants={viewTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
              >
                <JobsCardsView />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="calendar" className="m-0 h-full">
              <motion.div
                key="calendar"
                variants={viewTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
              >
                <JobsCalendarView />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="map" className="m-0 h-full">
              <motion.div
                key="map"
                variants={viewTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
              >
                <JobsMapView />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  )
}
