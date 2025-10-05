import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  XIcon,
  EditIcon,
  ShareIcon,
  MoreHorizontalIcon,
  UsersIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon,
  MessageSquareIcon,
  PaperclipIcon,
  ExternalLinkIcon
} from 'lucide-react'
import jobsData from './JobsData.json'

interface JobDrawerProps {
  isOpen?: boolean
  onClose?: () => void
  jobId?: string
}

interface Job {
  id: string
  title: string
  client: string
  status: 'open' | 'draft' | 'on-hold' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  jobId: string
  owner: {
    name: string
    avatar: string
    initials: string
  }
  hiringTeam: Array<{
    name: string
    avatar: string
    initials: string
    role: string
  }>
  openings: {
    filled: number
    total: number
  }
  applicants: {
    total: number
    unread: number
  }
  lastActivity: string
  slaTimer: string
  pipelineSnapshot: Array<{
    stage: string
    count: number
    conversion: number
  }>
  description: string
  location: string
  workModel: string
  employmentType: string
  salaryRange: string
  seniority: string
  tags: string[]
  published: boolean
}

const mockJob: Job = {
  ...jobsData[0],
  status: jobsData[0].status as 'open' | 'draft' | 'on-hold' | 'closed',
  priority: jobsData[0].priority as 'low' | 'medium' | 'high' | 'urgent',
  jobId: 'ATLAS-FE-001',
  hiringTeam: [
    {
      name: 'Youssef Benali',
      avatar: '/avatars/youssef.jpg',
      initials: 'YB',
      role: 'Hiring Manager'
    },
    {
      name: 'Fatima Zahra',
      avatar: '/avatars/fatima.jpg',
      initials: 'FZ',
      role: 'Technical Lead'
    }
  ],
  slaTimer: '3 days remaining',
  pipelineSnapshot: [
    { stage: 'Applied', count: 47, conversion: 100 },
    { stage: 'Screening', count: 23, conversion: 49 },
    { stage: 'Interview', count: 12, conversion: 26 },
    { stage: 'Offer', count: 3, conversion: 6 },
    { stage: 'Hired', count: 2, conversion: 4 }
  ],
  description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies.',
  location: 'Casablanca, Morocco',
  workModel: 'Hybrid',
  employmentType: 'Full-time',
  seniority: 'Senior',
  tags: ['React', 'TypeScript', 'Remote', 'Frontend'],
  published: true
}

export const JobsDrawer: React.FC<JobDrawerProps> = ({ 
  isOpen = false, 
  onClose
}) => {
  if (!isOpen) return null

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
      case 'urgent': return 'bg-destructive text-destructive-foreground'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-primary text-primary-foreground'
      case 'low': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background border-l shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">{mockJob.title}</h2>
              <Badge className={getPriorityColor(mockJob.priority)}>
                {mockJob.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              {mockJob.client} • {mockJob.jobId}
            </p>
            <Badge className={getStatusColor(mockJob.status)}>
              {mockJob.status}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShareIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-3">
          {/* Owner & Team */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={mockJob.owner.avatar} />
                <AvatarFallback className="text-xs">
                  {mockJob.owner.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{mockJob.owner.name}</span>
              <span className="text-xs text-muted-foreground">Owner</span>
            </div>
            <div className="flex gap-1">
              {mockJob.hiringTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">{mockJob.openings.filled} of {mockJob.openings.total}</div>
              <div className="text-xs text-muted-foreground">Openings</div>
            </div>
            <div>
              <div className="text-sm font-medium">{mockJob.applicants.total}</div>
              <div className="text-xs text-muted-foreground">Applicants</div>
            </div>
            <div>
              <div className="text-sm font-medium">{mockJob.lastActivity}</div>
              <div className="text-xs text-muted-foreground">Last Activity</div>
            </div>
            <div>
              <div className="text-sm font-medium">{mockJob.slaTimer}</div>
              <div className="text-xs text-muted-foreground">SLA Timer</div>
            </div>
          </div>

          {/* Pipeline Snapshot */}
          <div>
            <h4 className="text-sm font-medium mb-2">Pipeline Progress</h4>
            <div className="space-y-1">
              {mockJob.pipelineSnapshot.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between text-xs">
                  <span>{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span>{stage.count}</span>
                    <span className="text-muted-foreground">({stage.conversion}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="overview" className="p-4 space-y-4">
              {/* Job Details */}
              <div className="space-y-3">
                <h4 className="font-medium">Job Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{mockJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{mockJob.workModel} • {mockJob.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{mockJob.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{mockJob.seniority} Level</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {mockJob.description}
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Read more
                </Button>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <h4 className="font-medium">Tags</h4>
                <div className="flex gap-1 flex-wrap">
                  {mockJob.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Published Status */}
              <div className="space-y-2">
                <h4 className="font-medium">Published Status</h4>
                <div className="flex items-center gap-2">
                  {mockJob.published ? (
                    <Badge variant="secondary" className="text-xs">
                      <ExternalLinkIcon className="h-3 w-3 mr-1" />
                      Live on job boards
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Draft - Not published
                    </Badge>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="p-4">
              <div className="text-center py-8">
                <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Candidate list filtered to this job
                </p>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-4">
              <div className="text-center py-8">
                <ClockIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Activity Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Recent activity and changes
                </p>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="p-4">
              <div className="text-center py-8">
                <MessageSquareIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Notes & Mentions</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time notes and team mentions
                </p>
              </div>
            </TabsContent>

            <TabsContent value="files" className="p-4">
              <div className="text-center py-8">
                <PaperclipIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Files & Attachments</h3>
                <p className="text-sm text-muted-foreground">
                  Job-related documents and files
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Actions */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Change Status
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Assign Owner
          </Button>
          <Button size="sm" className="flex-1">
            {mockJob.published ? 'Unpublish' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  )
}
