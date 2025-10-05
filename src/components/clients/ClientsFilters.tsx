import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { 
  FilterIcon, 
  XIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  filterVariants,
  buttonVariants,
  iconVariants
} from './animations'

interface ClientsFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  industryFilter: string
  setIndustryFilter: (industry: string) => void
  ownerFilter: string
  setOwnerFilter: (owner: string) => void
  activeJobsOnly: boolean
  setActiveJobsOnly: (active: boolean) => void
  tagFilter: string
  setTagFilter: (tag: string) => void
  onApplyFilters: () => void
  totalClients: number
  industriesCount: number
  ownersCount: number
  tagsCount: number
}

export const ClientsFilters: React.FC<ClientsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  industryFilter,
  setIndustryFilter,
  ownerFilter,
  setOwnerFilter,
  activeJobsOnly,
  setActiveJobsOnly,
  tagFilter,
  setTagFilter,
  onApplyFilters,
  totalClients,
  industriesCount,
  ownersCount,
  tagsCount
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasActiveFilters, setHasActiveFilters] = useState(false)

  // Check if any filters are active
  const checkActiveFilters = () => {
    const active = searchTerm !== '' || 
                   industryFilter !== 'all' || 
                   ownerFilter !== 'all' || 
                   activeJobsOnly || 
                   tagFilter !== 'all'
    setHasActiveFilters(active)
    return active
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('')
    setIndustryFilter('all')
    setOwnerFilter('all')
    setActiveJobsOnly(false)
    setTagFilter('all')
    setHasActiveFilters(false)
  }

  // Apply filters and check if any are active
  const handleApplyFilters = () => {
    onApplyFilters()
    checkActiveFilters()
  }

  // Update active filters state when filters change
  React.useEffect(() => {
    checkActiveFilters()
  }, [searchTerm, industryFilter, ownerFilter, activeJobsOnly, tagFilter])

  return (
    <motion.div 
      className="w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Filter Toggle Bar */}
      <motion.div 
        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4"
        variants={staggerItem}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div variants={iconVariants} whileHover="hover">
              <FilterIcon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
            <span className="text-sm font-medium">Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
            <span>{totalClients} clients</span>
            <span>{industriesCount} industries</span>
            <span>{ownersCount} owners</span>
            <span>{tagsCount} tags</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-7"
              >
                <XIcon className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </motion.div>
          )}
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outline" size="sm" className="h-7">
                  {isOpen ? (
                    <ChevronUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {isOpen ? 'Hide' : 'Show'} Filters
                </Button>
              </motion.div>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </motion.div>

      {/* Collapsible Filter Content */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <motion.div 
            className="p-4 bg-background border rounded-lg mb-4"
            variants={filterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Search */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <motion.div 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                  <Input
                    placeholder="Company, contact, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-8"
                  />
                </div>
              </motion.div>

              {/* Industry Filter */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Industry</label>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Owner Filter */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Owner</label>
                <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All owners" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    <SelectItem value="Anwar Bahou">Anwar Bahou</SelectItem>
                    <SelectItem value="Fatima Alami">Fatima Alami</SelectItem>
                    <SelectItem value="Youssef Tazi">Youssef Tazi</SelectItem>
                    <SelectItem value="Karim El Fassi">Karim El Fassi</SelectItem>
                    <SelectItem value="Nadia Berrada">Nadia Berrada</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Tags Filter */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Tags</label>
                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="long-term">Long-term</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="renewable">Renewable</SelectItem>
                    <SelectItem value="sustainability">Sustainability</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="tech-training">Tech Training</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>

            {/* Active Jobs Toggle */}
            <motion.div 
              className="flex items-center justify-between mt-4 pt-4 border-t"
              variants={staggerItem}
            >
              <div className="flex items-center space-x-2">
                <Switch
                  id="active-jobs"
                  checked={activeJobsOnly}
                  onCheckedChange={setActiveJobsOnly}
                />
                <label htmlFor="active-jobs" className="text-sm font-medium">
                  Active Jobs Only
                </label>
              </div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button onClick={handleApplyFilters} size="sm" className="h-8">
                  Apply Filters
                </Button>
              </motion.div>
            </motion.div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <motion.div 
                className="mt-4 pt-4 border-t"
                variants={staggerItem}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {industryFilter !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Industry: {industryFilter}
                      <button
                        onClick={() => setIndustryFilter('all')}
                        className="ml-1 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {ownerFilter !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Owner: {ownerFilter}
                      <button
                        onClick={() => setOwnerFilter('all')}
                        className="ml-1 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {activeJobsOnly && (
                    <Badge variant="secondary" className="text-xs">
                      Active Jobs Only
                      <button
                        onClick={() => setActiveJobsOnly(false)}
                        className="ml-1 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {tagFilter !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Tag: {tagFilter}
                      <button
                        onClick={() => setTagFilter('all')}
                        className="ml-1 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  )
}