import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  MapPinIcon,
  UsersIcon,
  DollarSignIcon,
  ClockIcon,
  EyeIcon,
  EditIcon,
  MoreHorizontalIcon,
  BriefcaseIcon
} from 'lucide-react'
import { InteractiveMap } from './InteractiveMap'
import { JobDetailsModal } from './JobDetailsModal'
import { ViewJobModal } from './ViewJobModal'
import jobsData from './JobsData.json'
import { 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  iconVariants, 
  statusBadgeVariants 
} from './animations'

interface Job {
  id: string
  title: string
  client: string
  companyLogo?: string
  owner: {
    name: string
    avatar: string
    initials: string
  }
  openings: {
    filled: number
    total: number
  }
  applicants: {
    total: number
    unread: number
  }
  status: 'open' | 'draft' | 'on-hold' | 'closed'
  location: {
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  workModel: 'onsite' | 'remote' | 'hybrid'
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  salaryRange: string
  seniority: string
  lastActivity: string
  age: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags: string[]
  published: boolean
}

const mockJobLocations: Job[] = jobsData as Job[]

export const JobsMapView: React.FC = () => {
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedViewJob, setSelectedViewJob] = useState<Job | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleJobClick = (job: Job) => {
    navigate(`/jobs/${job.id}`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  const handleViewJob = (job: Job) => {
    setSelectedViewJob(job)
    setIsViewModalOpen(true)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedViewJob(null)
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'on-hold': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      case 'closed': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'urgent': return 'border-l-destructive'
      case 'high': return 'border-l-orange-500'
      case 'medium': return 'border-l-primary'
      case 'low': return 'border-l-muted-foreground'
      default: return 'border-l-muted-foreground'
    }
  }

  return (
    <motion.div 
      className="h-[calc(100vh-20rem)] flex min-h-0"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Interactive Map Area */}
      <motion.div className="flex-1 min-h-0" variants={staggerItem}>
        {/* Interactive Map */}
        <InteractiveMap 
          jobs={mockJobLocations} 
          onJobClick={handleJobClick}
        />
      </motion.div>

      {/* Job List Sidebar */}
      <motion.div 
        className="w-80 border-l bg-background flex flex-col min-h-0 overflow-hidden"
        variants={staggerItem}
      >
        <motion.div className="p-4 border-b flex-shrink-0" variants={staggerItem}>
          <h3 className="font-semibold">Jobs by Location</h3>
          <p className="text-sm text-muted-foreground">
            {mockJobLocations.length} locations
          </p>
        </motion.div>
        
        <motion.div 
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 min-h-0"
          variants={staggerContainer}
        >
          {mockJobLocations.map((job, index) => (
            <motion.div
              key={job.id}
              variants={staggerItem}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card 
                className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(job.priority)}`}
                onClick={() => handleJobClick(job)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-medium mb-1">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-muted rounded flex items-center justify-center overflow-hidden">
                          {job.companyLogo ? (
                            <img 
                              src={job.companyLogo} 
                              alt={`${job.client} logo`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling.style.display = 'flex'
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full flex items-center justify-center" style={{ display: job.companyLogo ? 'none' : 'flex' }}>
                            <BriefcaseIcon className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {job.client}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={job.owner.avatar} />
                          <AvatarFallback className="text-xs">
                            {job.owner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{job.owner.name}</span>
                      </div>
                    </div>
                    <motion.div variants={buttonVariants}>
                      <Button variant="ghost" size="sm">
                        <motion.div variants={iconVariants}>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs">
                      <motion.div variants={iconVariants}>
                        <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                      </motion.div>
                      <span>{job.location.city}, {job.location.state}</span>
                    </div>
                    
                    {/* Applicants */}
                    <div className="flex items-center gap-2 text-xs">
                      <motion.div variants={iconVariants}>
                        <UsersIcon className="h-3 w-3 text-muted-foreground" />
                      </motion.div>
                      <span>{job.applicants.total} applicants</span>
                    </div>
                    
                    {/* Salary */}
                    <div className="flex items-center gap-2 text-xs">
                      <motion.div variants={iconVariants}>
                        <DollarSignIcon className="h-3 w-3 text-muted-foreground" />
                      </motion.div>
                      <span>{job.salaryRange}</span>
                    </div>
                    
                    {/* Last Activity */}
                    <div className="flex items-center gap-2 text-xs">
                      <motion.div variants={iconVariants}>
                        <ClockIcon className="h-3 w-3 text-muted-foreground" />
                      </motion.div>
                      <span>{job.lastActivity}</span>
                    </div>
                    
                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <motion.div variants={statusBadgeVariants}>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </motion.div>
                      <div className="flex gap-1">
                        <motion.div variants={buttonVariants}>
                          <Button variant="ghost" size="sm" onClick={() => handleViewJob(job)}>
                            <motion.div variants={iconVariants}>
                              <EyeIcon className="h-3 w-3" />
                            </motion.div>
                          </Button>
                        </motion.div>
                        <motion.div variants={buttonVariants}>
                          <Button variant="ghost" size="sm">
                            <motion.div variants={iconVariants}>
                              <EditIcon className="h-3 w-3" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      {/* View Job Modal */}
      <ViewJobModal
        job={selectedViewJob}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </motion.div>
  )
}
