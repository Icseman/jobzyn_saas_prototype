import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { 
  SearchIcon,
  FilterIcon,
  ArrowUpDownIcon,
  CheckCircleIcon
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

interface CandidateListProps {
  candidates: Candidate[]
  selectedCandidate: Candidate | null
  onCandidateSelect: (candidate: Candidate) => void
  activeStage: string
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  selectedCandidate,
  onCandidateSelect,
  activeStage
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [showQualified, setShowQualified] = useState(true)

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
    <motion.div
      className="h-full flex flex-col"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div
        className="p-4 border-b border-border"
        variants={staggerItem}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Candidates</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <FilterIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <ArrowUpDownIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex space-x-1 mb-4">
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
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </motion.div>

      {/* Candidate List */}
      <motion.div
        className="flex-1 overflow-y-auto"
        variants={staggerItem}
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
            {filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedCandidate?.id === candidate.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:bg-muted/50'
                }`}
                onClick={() => onCandidateSelect(candidate)}
                variants={staggerItem}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                      {candidate.tags.slice(0, 3).map((tag, tagIndex) => (
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
                      {candidate.tags.length > 3 && (
                        <motion.div variants={tagVariants}>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            +{candidate.tags.length - 3}
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
        </div>
      </motion.div>
    </motion.div>
  )
}
