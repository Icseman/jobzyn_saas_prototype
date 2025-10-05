import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronDownIcon,
  EditIcon,
  MapPinIcon,
  UsersIcon,
  BuildingIcon
} from 'lucide-react'
import { headerVariants, staggerContainer, staggerItem, buttonVariants } from '../jobs/animations'

interface Job {
  id: string
  title: string
  client: string
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
  pipelineStages: Array<{
    stage: string
    count: number
    color: string
  }>
}

interface JobHeaderProps {
  job: Job
  activeStage: string
  onStageChange: (stage: string) => void
}

export const JobHeader: React.FC<JobHeaderProps> = ({ job, activeStage, onStageChange }) => {
  const getWorkModelIcon = () => {
    switch (job.workModel) {
      case 'onsite':
        return <BuildingIcon className="h-4 w-4" />
      case 'remote':
        return <UsersIcon className="h-4 w-4" />
      case 'hybrid':
        return <MapPinIcon className="h-4 w-4" />
      default:
        return <BuildingIcon className="h-4 w-4" />
    }
  }

  const getWorkModelText = () => {
    switch (job.workModel) {
      case 'onsite':
        return 'On-site'
      case 'remote':
        return 'Remote'
      case 'hybrid':
        return 'Hybrid'
      default:
        return 'On-site'
    }
  }

  return (
    <motion.div
      className="bg-card border-b border-border p-6"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Job Title and Actions */}
        <motion.div
          className="flex items-center justify-between"
          variants={staggerItem}
        >
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
            <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Job Details */}
        <motion.div
          className="flex items-center space-x-4 text-sm text-muted-foreground"
          variants={staggerItem}
        >
          <div className="flex items-center space-x-1">
            {getWorkModelIcon()}
            <span>{getWorkModelText()}</span>
          </div>
          <span>•</span>
          <span>{job.location.city}, {job.location.country}</span>
        </motion.div>

              {/* Enhanced Pipeline Stages */}
              <motion.div
                className="relative"
                variants={staggerItem}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Recruitment Pipeline</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Total: {job.applicants.total}</span>
                    <span>•</span>
                    <span>Active: {job.applicants.total - job.applicants.unread}</span>
                  </div>
                </div>
                
                <div className="relative bg-muted/30 rounded-xl p-2 overflow-hidden">
                  {/* Progress Bar Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-emerald-500/10 rounded-xl"></div>
                  
                  {/* Pipeline Stages */}
                  <div className="relative flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-hide">
                    {job.pipelineStages.map((stage, index) => {
                      const isActive = activeStage === stage.stage
                      const isCompleted = ['Hired'].includes(stage.stage)
                      const isCurrent = ['Applied', 'Phone Screen', 'Assessment', 'Interview'].includes(stage.stage)
                      
                      return (
                        <motion.div
                          key={stage.stage}
                          variants={staggerItem}
                          transition={{ delay: index * 0.05 }}
                          className="flex-shrink-0"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onStageChange(stage.stage)}
                            className={`relative px-3 py-2 h-9 text-xs font-medium transition-all duration-300 rounded-lg border ${
                              isActive
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                                : isCompleted
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                                : isCurrent
                                ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 hover:bg-blue-500/20'
                                : 'bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="flex items-center space-x-1">
                              {/* Stage Icon */}
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-primary-foreground' :
                                isCompleted ? 'bg-emerald-500' :
                                isCurrent ? 'bg-blue-500' : 'bg-muted-foreground'
                              }`}></div>
                              
                              {/* Stage Text */}
                              <span className="whitespace-nowrap text-xs">{stage.stage}</span>
                              
                              {/* Count Badge */}
                              <div className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                                isActive ? 'bg-primary-foreground/20 text-primary-foreground' :
                                isCompleted ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' :
                                isCurrent ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {stage.count}
                              </div>
                            </div>
                            
                            {/* Active Indicator */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                  
                  {/* Pipeline Flow Indicator */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-green-500/30 to-emerald-500/30 -translate-y-1/2 pointer-events-none"></div>
                </div>
              </motion.div>

      </motion.div>
    </motion.div>
  )
}
