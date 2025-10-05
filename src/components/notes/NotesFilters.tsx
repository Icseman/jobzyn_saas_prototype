import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { X, Filter, Calendar } from 'lucide-react'
import { Note, Client, Job, Candidate } from './NotesPage'
import { 
  filterVariants, 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  tagVariants 
} from './animations'

interface Filters {
  owner: string
  client: string
  job: string
  candidate: string
  tags: string[]
  dateRange: string
  visibility: string
}

interface NotesFiltersProps {
  isOpen: boolean
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  notes: Note[]
}

export const NotesFilters: React.FC<NotesFiltersProps> = ({
  isOpen,
  filters,
  onFiltersChange,
  clients,
  jobs,
  candidates,
  notes
}) => {
  // Get unique values for filter options
  const owners = Array.from(new Set(notes.map(note => note.owner.name))).map(name => {
    const note = notes.find(n => n.owner.name === name)
    return { id: note?.owner.id || '', name: note?.owner.name || '' }
  })

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  const handleFilterChange = (key: keyof Filters, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    handleFilterChange('tags', newTags)
  }

  const clearFilters = () => {
    onFiltersChange({
      owner: '',
      client: '',
      job: '',
      candidate: '',
      tags: [],
      dateRange: '',
      visibility: ''
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.owner) count++
    if (filters.client) count++
    if (filters.job) count++
    if (filters.candidate) count++
    if (filters.tags.length > 0) count++
    if (filters.dateRange) count++
    if (filters.visibility) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Collapsible open={isOpen} onOpenChange={() => {}}>
      <AnimatePresence>
        {isOpen && (
          <CollapsibleContent>
            <motion.div
              variants={filterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <motion.div variants={tagVariants}>
                          <Badge variant="secondary">{activeFiltersCount}</Badge>
                        </motion.div>
                      )}
                    </CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Owner Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="owner-filter">Owner</Label>
                      <Select
                        value={filters.owner}
                        onValueChange={(value) => handleFilterChange('owner', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All owners" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All owners</SelectItem>
                          {owners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id}>
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Client Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="client-filter">Client</Label>
                      <Select
                        value={filters.client}
                        onValueChange={(value) => handleFilterChange('client', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All clients" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All clients</SelectItem>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Job Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="job-filter">Job</Label>
                      <Select
                        value={filters.job}
                        onValueChange={(value) => handleFilterChange('job', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All jobs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All jobs</SelectItem>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Candidate Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="candidate-filter">Candidate</Label>
                      <Select
                        value={filters.candidate}
                        onValueChange={(value) => handleFilterChange('candidate', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All candidates" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All candidates</SelectItem>
                          {candidates.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.id}>
                              {candidate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Visibility Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="visibility-filter">Visibility</Label>
                      <Select
                        value={filters.visibility}
                        onValueChange={(value) => handleFilterChange('visibility', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All visibility</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Date Range Filter */}
                    <motion.div 
                      className="space-y-2"
                      variants={staggerItem}
                    >
                      <Label htmlFor="date-filter">Date Range</Label>
                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) => handleFilterChange('dateRange', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All dates" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All dates</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This week</SelectItem>
                          <SelectItem value="month">This month</SelectItem>
                          <SelectItem value="quarter">This quarter</SelectItem>
                          <SelectItem value="year">This year</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>

                  {/* Tags Filter */}
                  <motion.div 
                    className="space-y-2"
                    variants={staggerItem}
                  >
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          variants={tagVariants}
                          transition={{ delay: tagIndex * 0.05 }}
                        >
                          <Badge
                            variant={filters.tags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Saved Views */}
                  <motion.div 
                    className="space-y-2"
                    variants={staggerItem}
                  >
                    <Label>Saved Views</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentUser = 'user-123' // This would come from auth context
                          handleFilterChange('owner', currentUser)
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        My Notes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleFilterChange('dateRange', 'week')
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        Recent Notes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Filter for notes linked to active jobs
                          const activeJobs = jobs.filter(job => job.status === 'open').map(job => job.id)
                          // This would need more complex logic to filter by active jobs
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        Notes on Active Jobs
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleFilterChange('tags', ['priority'])
                        }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        Notes on Priority Clients
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  )
}
