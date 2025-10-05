import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  UsersIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon,
  CalendarIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  StarIcon
} from 'lucide-react'
import jobsData from './JobsData.json'
import { ViewJobModal } from './ViewJobModal'
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

const mockJobs: Job[] = jobsData as Job[]

export const JobsCardsView: React.FC = () => {
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleViewJob = (job: Job) => {
    navigate(`/jobs/${job.id}`)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedJob(null)
  }

  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-primary'
      case 'low': return 'bg-muted'
      default: return 'bg-muted'
    }
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      case 'on-hold': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800'
      case 'closed': return 'bg-muted text-muted-foreground border-border'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getWorkModelColor = (workModel: Job['workModel']) => {
    switch (workModel) {
      case 'remote': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'hybrid': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      case 'onsite': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    }
  }

  return (
    <motion.div 
      className="h-full overflow-auto p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="space-y-4">
        {mockJobs.map((job, index) => (
          <motion.div
            key={job.id}
            variants={staggerItem}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative"
              whileHover={{ 
                boxShadow: "0px 10px 25px rgba(var(--primary), 0.15)",
                y: -2
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Left border indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-colors rounded-l-md" />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <motion.div variants={statusBadgeVariants}>
                        <Badge className={`${getStatusColor(job.status)} font-medium`}>
                          {job.status}
                        </Badge>
                      </motion.div>
                      <motion.div variants={statusBadgeVariants}>
                        <Badge className={`${getWorkModelColor(job.workModel)} font-medium`}>
                          {job.workModel}
                        </Badge>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
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
                            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{job.client}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={job.owner.avatar} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {job.owner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{job.owner.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.div variants={buttonVariants}>
                      <Button variant="ghost" size="sm" onClick={() => handleViewJob(job)}>
                        <motion.div variants={iconVariants}>
                          <EyeIcon className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                    <motion.div variants={buttonVariants}>
                      <Button variant="ghost" size="sm">
                        <motion.div variants={iconVariants}>
                          <EditIcon className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                    <motion.div variants={buttonVariants}>
                      <Button variant="ghost" size="sm">
                        <motion.div variants={iconVariants}>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {/* Applicants */}
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <motion.div variants={iconVariants}>
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {job.applicants.total} applicants
                      </div>
                      {job.applicants.unread > 0 && (
                        <div className="text-xs text-primary">
                          {job.applicants.unread} unread
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <motion.div variants={iconVariants}>
                      <MapPinIcon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {job.location.city}
                      </div>
                      <div className="text-xs text-primary">
                        {job.location.country}
                      </div>
                    </div>
                  </div>
                  
                  {/* Salary */}
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <motion.div variants={iconVariants}>
                      <DollarSignIcon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {job.salaryRange}
                      </div>
                      <div className="text-xs text-primary">
                        {job.employmentType}
                      </div>
                    </div>
                  </div>
                  
                  {/* Last Activity */}
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <motion.div variants={iconVariants}>
                      <ClockIcon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {job.lastActivity}
                      </div>
                      <div className="text-xs text-primary">
                        {job.age} days old
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {job.tags.slice(0, 4).map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        variants={statusBadgeVariants}
                        transition={{ delay: tagIndex * 0.05 }}
                      >
                        <Badge variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20 text-primary">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                    {job.tags.length > 4 && (
                      <motion.div variants={statusBadgeVariants}>
                        <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                          +{job.tags.length - 4} more
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(job.priority)}`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {job.priority} priority
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* View Job Modal */}
      <ViewJobModal
        job={selectedJob}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </motion.div>
  )
}
