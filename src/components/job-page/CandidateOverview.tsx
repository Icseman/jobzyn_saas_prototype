import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { 
  XIcon,
  CalendarIcon,
  MessageSquareIcon,
  FileTextIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  StarIcon,
  UserIcon,
  BuildingIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  cardVariants 
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

interface CandidateOverviewProps {
  candidate: Candidate
  open: boolean
  onClose: () => void
}

export const CandidateOverview: React.FC<CandidateOverviewProps> = ({ candidate, open, onClose }) => {
  const mockActivities = [
    {
      id: 'activity-1',
      type: 'interview',
      title: 'Phone Screen Scheduled',
      description: 'Interview scheduled for tomorrow at 2:00 PM',
      date: 'Today',
      icon: CalendarIcon,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'activity-2',
      type: 'message',
      title: 'New Message',
      description: 'Candidate responded to initial contact',
      date: '2 hours ago',
      icon: MessageSquareIcon,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'activity-3',
      type: 'document',
      title: 'Resume Updated',
      description: 'Candidate uploaded updated resume',
      date: '1 day ago',
      icon: FileTextIcon,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ]

  const upcomingEvents = [
    {
      id: 'event-1',
      title: 'Phone Screen Interview',
      date: 'Tomorrow, 2:00 PM',
      type: 'interview'
    },
    {
      id: 'event-2',
      title: 'Technical Assessment',
      date: 'Friday, 10:00 AM',
      type: 'assessment'
    }
  ]

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border flex-shrink-0">
          <SheetTitle className="text-lg font-semibold text-foreground">Candidate overview</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
        {/* Enhanced Candidate Header */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative"
        >
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={candidate.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-lg font-bold">
                    {candidate.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
                  {candidate.status === 'qualified' ? (
                    <CheckCircleIcon className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <AlertCircleIcon className="h-3 w-3 text-destructive" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground mb-1">{candidate.name}</h3>
                <p className="text-primary font-medium mb-2">{candidate.title}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge 
                    variant={candidate.status === 'qualified' ? 'default' : 'destructive'}
                    className="text-xs font-medium"
                  >
                    {candidate.status === 'qualified' ? 'Qualified' : 'Disqualified'}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-medium">
                    {candidate.stage}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MailIcon className="h-4 w-4" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span className="truncate">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="truncate">{candidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <BuildingIcon className="h-4 w-4" />
                    <span className="truncate">{candidate.source}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Upcoming Events */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="group flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                  variants={staggerItem}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {event.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">{event.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  >
                    {event.type}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Recent Activities */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center space-x-2 text-emerald-700 dark:text-emerald-300">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <ClockIcon className="h-4 w-4" />
                </div>
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="group flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                  variants={staggerItem}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="h-1 w-1 rounded-full bg-emerald-500 mr-2"></div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Skills & Tags */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center space-x-2 text-purple-700 dark:text-purple-300">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <StarIcon className="h-4 w-4" />
                </div>
                <span>Skills & Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    variants={staggerItem}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
                {candidate.skills?.slice(0, 5).map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    transition={{ delay: (candidate.tags.length + index) * 0.05 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium border-purple-200 text-purple-600 dark:border-purple-800 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center space-x-2 text-orange-700 dark:text-orange-300">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <MessageSquareIcon className="h-4 w-4" />
                </div>
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-11 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <div className="p-1 rounded bg-orange-100 dark:bg-orange-900/40 mr-3">
                  <MessageSquareIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-medium">Send Message</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-11 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <div className="p-1 rounded bg-orange-100 dark:bg-orange-900/40 mr-3">
                  <CalendarIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-medium">Schedule Interview</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start h-11 bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <div className="p-1 rounded bg-orange-100 dark:bg-orange-900/40 mr-3">
                  <FileTextIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-medium">Add Note</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
