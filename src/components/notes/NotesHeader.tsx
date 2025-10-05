import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Plus, Download, Filter, Table, Grid3X3 } from 'lucide-react'
import { 
  headerVariants, 
  staggerContainer, 
  staggerItem, 
  buttonVariants,
  iconVariants,
  counterVariants,
  searchVariants,
  statsCardVariants
} from './animations'

interface Stats {
  totalNotes: number
  notesLinkedToJobs: number
  notesLinkedToClients: number
  notesCreatedThisWeek: number
}

interface NotesHeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  onCreateNote: () => void
  onExportJSON: () => void
  stats: Stats
  showFilters: boolean
  onToggleFilters: () => void
  currentView: 'table' | 'cards'
  onViewChange: (view: 'table' | 'cards') => void
}

export const NotesHeader: React.FC<NotesHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onCreateNote,
  onExportJSON,
  stats,
  showFilters,
  onToggleFilters,
  currentView,
  onViewChange
}) => {
  return (
    <motion.div 
      className="space-y-4"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header Toolbar */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1"
          variants={staggerItem}
        >
          {/* Search Bar */}
          <motion.div 
            className="relative flex-1 max-w-md"
            variants={searchVariants}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notes, titles, tags, owners..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </motion.div>

          {/* Filter Toggle */}
          <motion.div variants={staggerItem}>
            <Button
              variant="outline"
              onClick={onToggleFilters}
              className={showFilters ? 'bg-accent' : ''}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </motion.div>

          {/* View Switcher */}
          <motion.div 
            className="flex border rounded-md"
            variants={staggerItem}
          >
            <Button
              variant={currentView === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('cards')}
              className="rounded-r-none"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Grid3X3 className="h-4 w-4 mr-1" />
              Cards
            </Button>
            <Button
              variant={currentView === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('table')}
              className="rounded-l-none"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Table className="h-4 w-4 mr-1" />
              Table
            </Button>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-2"
          variants={staggerItem}
        >
          <Button 
            onClick={onCreateNote}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
          <Button 
            variant="outline" 
            onClick={onExportJSON}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Widgets */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={statsCardVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Notes</p>
                  <motion.p 
                    className="text-2xl font-bold"
                    variants={counterVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {stats.totalNotes}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statsCardVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Linked to Jobs</p>
                  <motion.p 
                    className="text-2xl font-bold"
                    variants={counterVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {stats.notesLinkedToJobs}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statsCardVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Linked to Clients</p>
                  <motion.p 
                    className="text-2xl font-bold"
                    variants={counterVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {stats.notesLinkedToClients}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={statsCardVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <motion.p 
                    className="text-2xl font-bold"
                    variants={counterVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {stats.notesCreatedThisWeek}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
