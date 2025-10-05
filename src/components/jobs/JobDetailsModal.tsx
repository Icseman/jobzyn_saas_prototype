import React from 'react'
import { 
  MapPinIcon, 
  UsersIcon, 
  DollarSignIcon, 
  ClockIcon, 
  EyeIcon, 
  EditIcon, 
  XIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserIcon,
  BuildingIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  FileTextIcon,
  MessageSquareIcon,
  PaperclipIcon,
  ExternalLinkIcon
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
}

interface JobDetailsModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose }) => {
  if (!job) return null

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'on-hold': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      case 'closed': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityBadge = (priority: Job['priority']) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive">Urgent Priority</Badge>
      case 'high': return <Badge className="bg-orange-500 text-white hover:bg-orange-600">High Priority</Badge>
      case 'medium': return <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Medium Priority</Badge>
      case 'low': return <Badge variant="secondary">Low Priority</Badge>
      default: return <Badge variant="secondary">Low Priority</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 flex flex-col max-h-[90vh] [&>button]:hidden">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={job.owner.avatar} />
                <AvatarFallback>{job.owner.initials}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {job.client}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-background p-0 flex-shrink-0">
            <TabsTrigger value="overview" className="rounded-none border-r">Overview</TabsTrigger>
            <TabsTrigger value="candidates" className="rounded-none border-r">Candidates</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-none border-r">Activity</TabsTrigger>
            <TabsTrigger value="details" className="rounded-none">Details</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                {/* Status & Priority */}
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  {getPriorityBadge(job.priority)}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                    <UsersIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-bold">{job.applicants.total}</span>
                    <span className="text-xs text-muted-foreground">Applicants</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                    <DollarSignIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-bold">{job.salaryRange}</span>
                    <span className="text-xs text-muted-foreground">Salary Range</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-bold">{job.location.city}</span>
                    <span className="text-xs text-muted-foreground">Location</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-bold">{job.lastActivity}</span>
                    <span className="text-xs text-muted-foreground">Last Activity</span>
                  </div>
                </div>

                {/* Job Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Job Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">{job.location.city}, {job.location.state}, {job.location.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Owner</p>
                        <p className="text-muted-foreground">{job.owner.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Client</p>
                        <p className="text-muted-foreground">{job.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Activity</p>
                        <p className="text-muted-foreground">{job.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline">
                    <EyeIcon className="h-4 w-4 mr-2" /> View Full Details
                  </Button>
                  <Button>
                    <EditIcon className="h-4 w-4 mr-2" /> Edit Job
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Candidates</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Ahmed Benali', role: 'Frontend Developer', applied: '2 hours ago', status: 'New' },
                    { name: 'Fatima Zahra', role: 'UI/UX Designer', applied: '1 day ago', status: 'Screening' },
                    { name: 'Youssef Alaoui', role: 'Full Stack Developer', applied: '3 days ago', status: 'Interview' },
                  ].map((candidate, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-muted-foreground">{candidate.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{candidate.status}</Badge>
                            <span className="text-xs text-muted-foreground">{candidate.applied}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Job posted', time: '2 hours ago', user: job.owner.name, icon: FileTextIcon },
                    { action: '5 new applicants', time: '1 day ago', user: 'System', icon: UsersIcon },
                    { action: 'Job updated', time: '3 days ago', user: job.owner.name, icon: EditIcon },
                    { action: 'Interview scheduled', time: '1 week ago', user: job.owner.name, icon: CalendarIcon },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time} • {activity.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Job Description</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>
                    We are looking for a talented {job.title} to join our team at {job.client}. 
                    This is an exciting opportunity to work on cutting-edge projects and make a real impact in the Moroccan tech industry.
                  </p>
                  
                  <h4 className="font-semibold mt-4">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>3+ years of experience in relevant field</li>
                    <li>Strong problem-solving skills</li>
                    <li>Excellent communication abilities</li>
                    <li>Team player with collaborative mindset</li>
                    <li>Fluency in English and Arabic/French</li>
                  </ul>
                  
                  <h4 className="font-semibold mt-4">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Competitive salary: {job.salaryRange}</li>
                    <li>Health insurance coverage</li>
                    <li>Flexible working hours</li>
                    <li>Professional development opportunities</li>
                    <li>Modern office environment</li>
                  </ul>

                  <h4 className="font-semibold mt-4">Location Details:</h4>
                  <p className="text-sm text-muted-foreground">
                    This position is based in {job.location.city}, {job.location.state}, Morocco. 
                    We offer flexible work arrangements including remote and hybrid options.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
