import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { 
  SearchIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  tagVariants 
} from '../jobs/animations'

interface Candidate {
  id: string
  name: string
  title: string
  avatar?: string
  initials: string
  tags: string[]
  source: string
  appliedDate: string
  status: 'qualified' | 'disqualified'
  stage: string
  email?: string
  phone?: string
  location?: string
  experience?: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education?: Array<{
    institution: string
    degree: string
    year: string
  }>
  skills?: string[]
}

interface FloatingCandidateListProps {
  candidates: Candidate[]
  selectedCandidate: Candidate | null
  onCandidateSelect: (candidate: Candidate) => void
  activeStage: string
  isVisible: boolean
  onToggleVisibility: () => void
  position: 'left' | 'right'
  onPositionChange: (position: 'left' | 'right') => void
}

export const FloatingCandidateList: React.FC<FloatingCandidateListProps> = ({
  candidates,
  selectedCandidate,
  onCandidateSelect,
  activeStage,
  isVisible,
  onToggleVisibility,
  position,
  onPositionChange
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [showQualified, setShowQualified] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = showQualified ? candidate.status === 'qualified' : candidate.status === 'disqualified'
    
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCandidates(filteredCandidates.map(c => c.id))
    } else {
      setSelectedCandidates([])
    }
  }

  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    if (checked) {
      setSelectedCandidates(prev => [...prev, candidateId])
    } else {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId))
    }
  }

  const qualifiedCount = candidates.filter(c => c.status === 'qualified').length
  const disqualifiedCount = candidates.filter(c => c.status === 'disqualified').length

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`fixed bottom-4 z-50 bg-card border border-border rounded-lg shadow-lg w-80 ${
            position === 'left' ? 'left-4' : 'right-4'
          }`}
          initial={{ 
            opacity: 0, 
            y: 100, 
            scale: 0.8,
            rotateX: -15
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0
          }}
          exit={{ 
            opacity: 0, 
            y: 100, 
            scale: 0.8,
            rotateX: 15,
            transition: { duration: 0.2, ease: "easeIn" }
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            className="transition-all duration-300"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            {/* Header */}
            <motion.div
              className="p-4 border-b border-border bg-card/95 backdrop-blur-sm"
              variants={staggerItem}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold text-foreground">Candidates</h2>
                  <Badge variant="secondary" className="text-xs">
                    {filteredCandidates.length}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    {isCollapsed ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8"
                    onClick={() => onPositionChange(position === 'left' ? 'right' : 'left')}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    title={`Move to ${position === 'left' ? 'right' : 'left'} side`}
                  >
                    {position === 'left' ? <ArrowRightIcon className="h-4 w-4" /> : <ArrowLeftIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Status Tabs */}
                    <motion.div 
                      className="flex space-x-1 mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                    <Button
                      variant={showQualified ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setShowQualified(true)}
                      className={`px-3 py-1 h-8 text-sm ${
                        showQualified ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                      }`}
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonVariants}
                    >
                      Qualified {qualifiedCount}
                    </Button>
                    <Button
                      variant={!showQualified ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setShowQualified(false)}
                      className={`px-3 py-1 h-8 text-sm ${
                        !showQualified ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                      }`}
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonVariants}
                    >
                      Disqualified {disqualifiedCount}
                    </Button>
                    </motion.div>

                    {/* Search */}
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search candidates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-9"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Candidate List */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="max-h-96 overflow-y-auto"
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                <div className="p-2">
                  {/* Select All */}
                  <div className="flex items-center space-x-2 p-2 mb-2">
                    <Checkbox
                      checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm text-muted-foreground">
                      Select all ({filteredCandidates.length})
                    </span>
                  </div>

                  {/* Candidates */}
                  <div className="space-y-2">
                    {filteredCandidates.slice(0, 8).map((candidate, index) => (
                      <motion.div
                        key={candidate.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedCandidate?.id === candidate.id
                            ? 'bg-primary/10 border-primary'
                            : 'bg-card border-border hover:bg-muted/50'
                        }`}
                        onClick={() => onCandidateSelect(candidate)}
                        variants={staggerItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={(checked) => handleSelectCandidate(candidate.id, checked as boolean)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {candidate.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                {candidate.name}
                              </h3>
                              {candidate.status === 'qualified' && (
                                <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                              )}
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-2">
                              {candidate.title}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              {candidate.tags.slice(0, 2).map((tag, tagIndex) => (
                                <motion.div
                                  key={tag}
                                  variants={tagVariants}
                                  transition={{ delay: tagIndex * 0.05 }}
                                >
                                  <Badge variant="secondary" className="text-xs px-1 py-0">
                                    {tag}
                                  </Badge>
                                </motion.div>
                              ))}
                              {candidate.tags.length > 2 && (
                                <motion.div variants={tagVariants}>
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    +{candidate.tags.length - 2}
                                  </Badge>
                                </motion.div>
                              )}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              <p>{candidate.source}</p>
                              <p>{candidate.appliedDate}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredCandidates.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No candidates found</p>
                    </div>
                  )}

                  {filteredCandidates.length > 8 && (
                    <div className="text-center py-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        View all {filteredCandidates.length} candidates
                      </Button>
                    </div>
                  )}
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}