import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  iconVariants, 
  statusBadgeVariants 
} from './animations'

interface Interview {
  id: string
  jobTitle: string
  candidateName: string
  time: string
  duration: string
  type: 'phone' | 'video' | 'onsite'
  location?: string
  interviewer: {
    name: string
    avatar: string
    initials: string
  }
  status: 'scheduled' | 'completed' | 'cancelled'
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    candidateName: 'John Smith',
    time: '10:00 AM',
    duration: '60 min',
    type: 'video',
    interviewer: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      initials: 'SJ'
    },
    status: 'scheduled'
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    candidateName: 'Jane Doe',
    time: '2:00 PM',
    duration: '45 min',
    type: 'onsite',
    location: 'Conference Room A',
    interviewer: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      initials: 'MC'
    },
    status: 'scheduled'
  },
  {
    id: '3',
    jobTitle: 'UX Designer',
    candidateName: 'Bob Wilson',
    time: '3:30 PM',
    duration: '90 min',
    type: 'phone',
    interviewer: {
      name: 'Emma Davis',
      avatar: '/avatars/emma.jpg',
      initials: 'ED'
    },
    status: 'completed'
  }
]

export const JobsCalendarView: React.FC = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  
  const days = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }
  
  const getInterviewsForDay = (day: number) => {
    // Mock logic - in real app, filter by actual date
    if (day % 3 === 0) {
      return mockInterviews.slice(0, Math.min(2, Math.floor(day / 3)))
    }
    return []
  }
  
  const getTypeColor = (type: Interview['type']) => {
    switch (type) {
      case 'phone': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'video': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      case 'onsite': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <motion.div 
      className="h-full flex flex-col"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Calendar Header */}
      <motion.div className="border-b px-6 py-4" variants={staggerItem}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <motion.div variants={buttonVariants}>
                <Button variant="outline" size="sm">
                  <motion.div variants={iconVariants}>
                    <ChevronLeftIcon className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Button variant="outline" size="sm">
                  <motion.div variants={iconVariants}>
                    <ChevronRightIcon className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.div variants={buttonVariants}>
              <Button variant="outline" size="sm">
                Today
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button variant="outline" size="sm">
                Month
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button variant="outline" size="sm">
                Week
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div className="flex-1 overflow-auto p-6" variants={staggerItem}>
        <motion.div className="grid grid-cols-7 gap-1 mb-4" variants={staggerContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <motion.div 
              key={day} 
              className="p-2 text-center font-medium text-muted-foreground"
              variants={staggerItem}
              transition={{ delay: index * 0.05 }}
            >
              {day}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className="grid grid-cols-7 gap-1" variants={staggerContainer}>
          {days.map((day, index) => (
            <motion.div 
              key={index} 
              className={`min-h-24 border rounded-lg p-2 ${
                day === currentDate.getDate() 
                  ? 'bg-primary/10 border-primary' 
                  : 'bg-background border-border'
              }`}
              variants={staggerItem}
              transition={{ delay: index * 0.01 }}
              whileHover={{ scale: 1.02 }}
            >
              {day && (
                <>
                  <div className="font-medium text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {getInterviewsForDay(day).map((interview, interviewIndex) => (
                      <motion.div
                        key={interview.id}
                        variants={staggerItem}
                        transition={{ delay: interviewIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Card className="p-2 cursor-pointer hover:shadow-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <motion.div variants={iconVariants}>
                                <ClockIcon className="h-3 w-3 text-muted-foreground" />
                              </motion.div>
                              <span className="text-xs font-medium">{interview.time}</span>
                            </div>
                            <div className="text-xs font-medium truncate">
                              {interview.candidateName}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {interview.jobTitle}
                            </div>
                            <div className="flex items-center gap-1">
                              <motion.div variants={statusBadgeVariants}>
                                <Badge className={`text-xs ${getTypeColor(interview.type)}`}>
                                  {interview.type}
                                </Badge>
                              </motion.div>
                              {interview.location && (
                                <div className="flex items-center gap-1">
                                  <motion.div variants={iconVariants}>
                                    <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                                  </motion.div>
                                  <span className="text-xs text-muted-foreground truncate">
                                    {interview.location}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={interview.interviewer.avatar} />
                                <AvatarFallback className="text-xs">
                                  {interview.interviewer.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {interview.interviewer.name}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
