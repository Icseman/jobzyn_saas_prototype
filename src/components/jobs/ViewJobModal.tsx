import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  MapPinIcon,
  UsersIcon,
  DollarSignIcon,
  ClockIcon,
  EyeIcon,
  EditIcon,
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
  ExternalLinkIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  TargetIcon,
  AwardIcon,
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  StarIcon,
  HeartIcon,
  DownloadIcon,
  SendIcon,
  CopyIcon,
  ArchiveIcon,
  TrashIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  BarChart3Icon,
  PieChartIcon,
  ActivityIcon,
  ZapIcon,
  ShieldIcon,
  LockIcon,
  UnlockIcon,
  SettingsIcon,
  MoreHorizontalIcon
} from 'lucide-react'

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

interface ViewJobModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export const ViewJobModal: React.FC<ViewJobModalProps> = ({ job, isOpen, onClose }) => {
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
      case 'urgent': return <Badge variant="destructive" className="flex items-center gap-1"><ZapIcon className="h-3 w-3" />Urgent</Badge>
      case 'high': return <Badge className="bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-1"><TrendingUpIcon className="h-3 w-3" />High</Badge>
      case 'medium': return <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"><TargetIcon className="h-3 w-3" />Medium</Badge>
      case 'low': return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircleIcon className="h-3 w-3" />Low</Badge>
      default: return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircleIcon className="h-3 w-3" />Low</Badge>
    }
  }

  const getWorkModelIcon = (model: Job['workModel']) => {
    switch (model) {
      case 'remote': return <GlobeIcon className="h-4 w-4" />
      case 'hybrid': return <BuildingIcon className="h-4 w-4" />
      case 'onsite': return <MapPinIcon className="h-4 w-4" />
      default: return <BuildingIcon className="h-4 w-4" />
    }
  }

  const getEmploymentTypeIcon = (type: Job['employmentType']) => {
    switch (type) {
      case 'full-time': return <BriefcaseIcon className="h-4 w-4" />
      case 'part-time': return <ClockIcon className="h-4 w-4" />
      case 'contract': return <FileTextIcon className="h-4 w-4" />
      case 'internship': return <AwardIcon className="h-4 w-4" />
      default: return <BriefcaseIcon className="h-4 w-4" />
    }
  }

  const fillPercentage = (job.openings.filled / job.openings.total) * 100

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[1200px] p-0 flex flex-col h-screen">
        <SheetHeader className="p-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={job.owner.avatar} />
              <AvatarFallback className="text-lg font-semibold">{job.owner.initials}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl font-bold">{job.title}</SheetTitle>
              <SheetDescription className="text-base text-muted-foreground flex items-center gap-2">
                <BuildingIcon className="h-4 w-4" />
                {job.client}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-5 rounded-none border-b bg-background p-0 flex-shrink-0">
            <TabsTrigger value="overview" className="rounded-none border-r">Overview</TabsTrigger>
            <TabsTrigger value="description" className="rounded-none border-r">Description</TabsTrigger>
            <TabsTrigger value="candidates" className="rounded-none border-r">Candidates</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-none border-r">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-none">Settings</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6 h-full">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                {/* Status & Priority */}
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  {getPriorityBadge(job.priority)}
                  {job.published ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <ExternalLinkIcon className="h-3 w-3" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <LockIcon className="h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <UsersIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{job.applicants.total}</div>
                          <div className="text-xs text-muted-foreground">Total Applicants</div>
                          {job.applicants.unread > 0 && (
                            <div className="text-xs text-primary font-medium">{job.applicants.unread} unread</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <TargetIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{job.openings.filled}/{job.openings.total}</div>
                          <div className="text-xs text-muted-foreground">Positions Filled</div>
                          <Progress value={fillPercentage} className="h-1 mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/30 rounded-lg">
                          <DollarSignIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{job.salaryRange}</div>
                          <div className="text-xs text-muted-foreground">Salary Range</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <ClockIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{job.age} days</div>
                          <div className="text-xs text-muted-foreground">Job Age</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BriefcaseIcon className="h-5 w-5" />
                        Job Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{job.location.city}, {job.location.state}, {job.location.country}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {getWorkModelIcon(job.workModel)}
                        <div>
                          <p className="font-medium">Work Model</p>
                          <p className="text-sm text-muted-foreground capitalize">{job.workModel}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {getEmploymentTypeIcon(job.employmentType)}
                        <div>
                          <p className="font-medium">Employment Type</p>
                          <p className="text-sm text-muted-foreground capitalize">{job.employmentType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <AwardIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Seniority Level</p>
                          <p className="text-sm text-muted-foreground">{job.seniority}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5" />
                        Team & Ownership
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.owner.avatar} />
                          <AvatarFallback>{job.owner.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Job Owner</p>
                          <p className="text-sm text-muted-foreground">{job.owner.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Client Company</p>
                          <p className="text-sm text-muted-foreground">{job.client}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Last Activity</p>
                          <p className="text-sm text-muted-foreground">{job.lastActivity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills & Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5" />
                      Required Skills & Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ShareIcon className="h-4 w-4 mr-2" />
                      Share Job
                    </Button>
                    <Button variant="outline" size="sm">
                      <CopyIcon className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button>
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit Job
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="description" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                    <h3 className="text-lg font-semibold mb-4">About the Role</h3>
                    <p className="mb-4">
                      We are seeking a talented <strong>{job.title}</strong> to join our dynamic team at <strong>{job.client}</strong>. 
                      This is an exciting opportunity to work on cutting-edge projects and make a real impact in the Moroccan tech industry.
                    </p>

                    <h4 className="font-semibold mt-6 mb-3">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>Lead and contribute to the development of innovative solutions</li>
                      <li>Collaborate with cross-functional teams to deliver high-quality products</li>
                      <li>Mentor junior team members and share knowledge</li>
                      <li>Participate in code reviews and maintain high coding standards</li>
                      <li>Stay updated with the latest industry trends and technologies</li>
                    </ul>

                    <h4 className="font-semibold mt-6 mb-3">Required Qualifications:</h4>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>3+ years of experience in relevant field</li>
                      <li>Strong problem-solving and analytical skills</li>
                      <li>Excellent communication and collaboration abilities</li>
                      <li>Proven track record of delivering successful projects</li>
                      <li>Fluency in English and Arabic/French</li>
                    </ul>

                    <h4 className="font-semibold mt-6 mb-3">Preferred Skills:</h4>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>

                    <h4 className="font-semibold mt-6 mb-3">What We Offer:</h4>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>Competitive salary: <strong>{job.salaryRange}</strong></li>
                      <li>Comprehensive health insurance coverage</li>
                      <li>Flexible working hours and remote work options</li>
                      <li>Professional development and training opportunities</li>
                      <li>Modern office environment in {job.location.city}</li>
                      <li>Team building activities and company events</li>
                    </ul>

                    <h4 className="font-semibold mt-6 mb-3">Location & Work Arrangements:</h4>
                    <p className="mb-4">
                      This position is based in <strong>{job.location.city}, {job.location.state}, Morocco</strong>. 
                      We offer flexible work arrangements including {job.workModel} options to accommodate different working styles and preferences.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="mt-0">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Candidates ({job.applicants.total})</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <SearchIcon className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button size="sm">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Candidate
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Ahmed Benali', role: 'Frontend Developer', applied: '2 hours ago', status: 'New', score: 95, avatar: 'AB' },
                    { name: 'Fatima Zahra', role: 'UI/UX Designer', applied: '1 day ago', status: 'Screening', score: 88, avatar: 'FZ' },
                    { name: 'Youssef Alaoui', role: 'Full Stack Developer', applied: '3 days ago', status: 'Interview', score: 92, avatar: 'YA' },
                    { name: 'Khadija Tazi', role: 'Product Manager', applied: '1 week ago', status: 'Shortlisted', score: 89, avatar: 'KT' },
                    { name: 'Omar Idrissi', role: 'DevOps Engineer', applied: '2 weeks ago', status: 'Rejected', score: 76, avatar: 'OI' },
                    { name: 'Sara Benkirane', role: 'QA Engineer', applied: '3 weeks ago', status: 'Hired', score: 96, avatar: 'SB' },
                  ].map((candidate, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{candidate.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-muted-foreground">{candidate.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{candidate.score}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={
                                candidate.status === 'Hired' ? 'default' :
                                candidate.status === 'Shortlisted' ? 'secondary' :
                                candidate.status === 'Interview' ? 'outline' :
                                candidate.status === 'Screening' ? 'outline' :
                                candidate.status === 'New' ? 'outline' : 'destructive'
                              }
                            >
                              {candidate.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{candidate.applied}</span>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="flex-1">
                              <EyeIcon className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1">
                              <MessageSquareIcon className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontalIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BarChart3Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">47</div>
                          <div className="text-xs text-muted-foreground">Total Views</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <TrendingUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">12.5%</div>
                          <div className="text-xs text-muted-foreground">Conversion Rate</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/30 rounded-lg">
                          <ActivityIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">89%</div>
                          <div className="text-xs text-muted-foreground">Match Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5" />
                      Application Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { source: 'Job Boards', count: 18, percentage: 38 },
                        { source: 'Company Website', count: 12, percentage: 26 },
                        { source: 'Social Media', count: 8, percentage: 17 },
                        { source: 'Referrals', count: 6, percentage: 13 },
                        { source: 'Recruiters', count: 3, percentage: 6 },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-sm">{item.source}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.count}</span>
                            <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SettingsIcon className="h-5 w-5" />
                      Job Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-publish</p>
                        <p className="text-sm text-muted-foreground">Automatically publish when requirements are met</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {job.published ? <UnlockIcon className="h-4 w-4" /> : <LockIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications for new applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MailIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application Deadline</p>
                        <p className="text-sm text-muted-foreground">Set a deadline for applications</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Visibility</p>
                        <p className="text-sm text-muted-foreground">Make this job visible to all users</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <GlobeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require Application Form</p>
                        <p className="text-sm text-muted-foreground">Force candidates to fill application form</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline">
                    <ArchiveIcon className="h-4 w-4 mr-2" />
                    Archive Job
                  </Button>
                  <Button variant="destructive">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete Job
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
