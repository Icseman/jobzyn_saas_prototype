import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  ChevronDownIcon,
  XIcon,
  SearchIcon,
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
  UsersIcon,
  BuildingIcon
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  filterVariants,
  buttonVariants,
  iconVariants
} from './animations'

interface FilterChip {
  id: string
  label: string
  value: string
  onRemove: () => void
}

interface JobsFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export const JobsFilters: React.FC<JobsFiltersProps> = ({ onFiltersChange }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([
    { id: '1', label: 'Status: Open', value: 'open', onRemove: () => {} },
    { id: '2', label: 'Location: San Francisco', value: 'sf', onRemove: () => {} },
  ])

  const removeFilter = (id: string) => {
    setActiveFilters(prev => prev.filter(filter => filter.id !== id))
  }

  return (
    <motion.div 
      className="border-b bg-background"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Filter Chips Row */}
      <motion.div className="py-3" variants={staggerItem}>
        <div className="flex items-center gap-2 flex-wrap">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              <motion.div variants={iconVariants} whileHover="hover">
                <FilterIcon className="h-4 w-4 mr-2" />
              </motion.div>
              Filters
              <motion.div variants={iconVariants} whileHover="hover">
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
          
          {activeFilters.map((filter, index) => (
            <motion.div
              key={filter.id}
              variants={staggerItem}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                {filter.label}
                <motion.button
                  onClick={() => removeFilter(filter.id)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <XIcon className="h-3 w-3" />
                </motion.button>
              </Badge>
            </motion.div>
          ))}
          
          {activeFilters.length > 0 && (
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Clear all
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Collapsible Filter Panel */}
      <Collapsible open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
        <CollapsibleContent>
          <motion.div 
            className="py-4 border-t bg-muted/30"
            variants={filterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              
              {/* Keyword Search */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Keyword Search</label>
                <div className="relative">
                  <motion.div 
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <SearchIcon className="h-4 w-4" />
                  </motion.div>
                  <Input placeholder="Search jobs..." className="pl-10" />
                </div>
              </motion.div>

              {/* Status */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Owner */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Owner</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All owners" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="team">My Team</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Client/Account */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Client/Account</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corp</SelectItem>
                    <SelectItem value="techstart">TechStart Inc</SelectItem>
                    <SelectItem value="global">Global Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Seniority */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Seniority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead/Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Work Model */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Model</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All models" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="City, Country..." className="pl-10" />
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary Range</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSignIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Min" className="pl-10" />
                  </div>
                  <div className="relative flex-1">
                    <DollarSignIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Max" className="pl-10" />
                  </div>
                </div>
              </div>

              {/* Experience Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience (Years)</label>
                <div className="flex gap-2">
                  <Input placeholder="Min years" />
                  <Input placeholder="Max years" />
                </div>
              </div>

              {/* Created Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Created Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Select date range" className="pl-10" />
                </div>
              </div>

              {/* Source Channels */}
              <motion.div className="space-y-2" variants={staggerItem}>
                <label className="text-sm font-medium">Source Channels</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="indeed">Indeed</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="careers-site">Careers Site</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>

            {/* Filter Actions */}
            <motion.div className="flex items-center justify-between mt-6" variants={staggerItem}>
              <div className="flex items-center gap-2">
                <motion.div variants={buttonVariants}>
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants}>
                  <Button variant="outline" size="sm">
                    Save as Preset
                  </Button>
                </motion.div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div variants={buttonVariants}>
                  <Button variant="outline" size="sm">
                    Clear All
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants}>
                  <Button size="sm">
                    Apply Filters
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  )
}
