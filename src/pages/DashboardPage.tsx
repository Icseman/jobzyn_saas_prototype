import React, { useState } from 'react'
import { SiteHeader } from "@/components/site-header"
import { PageTransition } from "@/components/PageTransition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  CheckCircle, 
  Briefcase, 
  Users, 
  Clock, 
  Plus, 
  MoreHorizontal,
  Eye,
  Star,
  MapPin,
  Building2,
  UserCheck,
  CalendarDays,
  BarChart3,
  Rocket,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Sun
} from 'lucide-react'

// Mock data for the dashboard
const mockUser = {
  name: "Salma Bennani",
  role: "Senior HR Business Partner",
  department: "JOBZYN",
  location: "1st degree connection",
  avatar: "/src/Assets/salma.jpeg",
  initials: "SB",
  manager: {
    name: "Ahmed Alami",
    role: "VP of Talent",
    avatar: "/api/placeholder/40/40",
    initials: "AA"
  },
  teammates: [
    {
      id: "salma",
      name: "Salma Bennani",
      role: "Senior HR Business Partner",
      avatar: "/src/Assets/salma.jpeg",
      initials: "SB",
      department: "JOBZYN",
      location: "Casablanca, Morocco",
      stats: {
        activeJobs: 24,
        candidates: 1247,
        interviews: 12,
        offers: 3,
        hires: 8,
        daysToFill: 28,
        candidateRating: 4.8,
        managerRating: 4.6
      }
    },
    {
      id: "youssef",
      name: "Youssef El Mansouri",
      role: "Senior Recruiter",
      avatar: "/api/placeholder/40/40",
      initials: "YM",
      department: "JOBZYN",
      location: "Rabat, Morocco",
      stats: {
        activeJobs: 18,
        candidates: 892,
        interviews: 8,
        offers: 2,
        hires: 5,
        daysToFill: 32,
        candidateRating: 4.7,
        managerRating: 4.5
      }
    },
    {
      id: "fatima",
      name: "Fatima Zahra",
      role: "Sourcing Specialist",
      avatar: "/api/placeholder/40/40",
      initials: "FZ",
      department: "JOBZYN",
      location: "Marrakech, Morocco",
      stats: {
        activeJobs: 15,
        candidates: 634,
        interviews: 6,
        offers: 1,
        hires: 3,
        daysToFill: 35,
        candidateRating: 4.6,
        managerRating: 4.4
      }
    },
    {
      id: "omar",
      name: "Omar Benjelloun",
      role: "Technical Recruiter",
      avatar: "/api/placeholder/40/40",
      initials: "OB",
      department: "JOBZYN",
      location: "Fez, Morocco",
      stats: {
        activeJobs: 22,
        candidates: 1056,
        interviews: 10,
        offers: 4,
        hires: 6,
        daysToFill: 26,
        candidateRating: 4.9,
        managerRating: 4.7
      }
    }
  ]
}

const mockEvents = [
  {
    id: 1,
    title: "Interview with John Doe",
    time: "10:00 AM",
    type: "interview",
    candidate: "John Doe",
    position: "Senior Developer"
  },
  {
    id: 2,
    title: "Team Standup",
    time: "11:00 AM",
    type: "meeting",
    candidate: null,
    position: null
  },
  {
    id: 3,
    title: "Client Meeting - TechCorp",
    time: "2:00 PM",
    type: "client",
    candidate: null,
    position: null
  }
]

const mockTodos = [
  {
    id: 1,
    title: "Review applications for Senior Developer role",
    description: "SAMPLE - 15 applications pending review",
    priority: "high",
    dueDate: "Today",
    category: "review"
  },
  {
    id: 2,
    title: "Schedule follow-up interviews",
    description: "SAMPLE - 3 candidates ready for next round",
    priority: "medium",
    dueDate: "Tomorrow",
    category: "schedule"
  },
  {
    id: 3,
    title: "Update job posting for UX Designer",
    description: "SAMPLE - Refresh requirements and benefits",
    priority: "low",
    dueDate: "This week",
    category: "update"
  },
  {
    id: 4,
    title: "Prepare offer letter for Maria Garcia",
    description: "SAMPLE - Finalize compensation package",
    priority: "high",
    dueDate: "Today",
    category: "offer"
  }
]

const mockJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "active",
    applications: 24,
    views: 156,
    isSample: false
  },
  {
    id: 2,
    title: "UX/UI Designer",
    location: "Remote",
    type: "Full-time",
    status: "draft",
    applications: 0,
    views: 12,
    isSample: false
  },
  {
    id: 3,
    title: "Product Manager",
    location: "New York, NY",
    type: "Full-time",
    status: "active",
    applications: 8,
    views: 89,
    isSample: true
  },
  {
    id: 4,
    title: "DevOps Engineer",
    location: "Austin, TX",
    type: "Contract",
    status: "active",
    applications: 15,
    views: 67,
    isSample: false
  },
  {
    id: 5,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    type: "Part-time",
    status: "draft",
    applications: 0,
    views: 5,
    isSample: true
  }
]

const mockOnboardings = [
  {
    id: 1,
    name: "David Kim",
    position: "Frontend Developer",
    startDate: "2024-01-15",
    status: "pending",
    progress: 60
  },
  {
    id: 2,
    name: "Lisa Wang",
    position: "Data Scientist",
    startDate: "2024-01-20",
    status: "in_progress",
    progress: 30
  }
]

const mockTimeOffBalances = {
  paidTimeOff: {
    available: 18,
    total: 20,
    used: 2
  },
  sickLeave: {
    available: 32,
    total: 40,
    used: 8
  },
  personalDays: {
    available: 3,
    total: 5,
    used: 2
  }
}

const mockUpcomingTimeOff = [
  {
    id: 1,
    type: "Paid Time Off",
    startDate: "2024-02-15",
    endDate: "2024-02-19",
    days: 5,
    status: "approved"
  },
  {
    id: 2,
    type: "Personal Day",
    startDate: "2024-02-23",
    endDate: "2024-02-23",
    days: 1,
    status: "pending"
  }
]

const mockAnalytics = {
  totalCandidates: 1247,
  activeJobs: 24,
  interviewsThisWeek: 12,
  offersExtended: 3,
  hiresThisMonth: 8,
  timeToFill: 28,
  candidateSatisfaction: 4.8,
  hiringManagerSatisfaction: 4.6
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('events')
  const [selectedTeammate, setSelectedTeammate] = useState(mockUser.teammates[0]) // Default to Salma

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200'
      case 'draft': return 'text-gray-600 bg-gray-50 border-gray-200'
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'approved': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-4rem)] flex">
            {/* Left Sidebar - User Profile */}
            <div className="w-72 border-r border-border flex-shrink-0 relative overflow-hidden">
              {/* Orange Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"></div>
              
              {/* User Image Background - Cut in Half */}
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${mockUser.avatar})`,
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)'
                  }}
                ></div>
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10 p-4 h-full flex flex-col">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Avatar className="h-16 w-16 ring-4 ring-white/20 shadow-lg">
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback className="text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
                          {mockUser.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <h2 className="text-lg font-bold text-white drop-shadow-lg">{mockUser.name}</h2>
                        <p className="text-xs text-white/90 drop-shadow-md">{mockUser.role}</p>
                        <p className="text-xs text-white/80 drop-shadow-md">{mockUser.department}</p>
                      </div>
                      
                      <div className="text-xs text-white/80 text-center drop-shadow-md">
                        <p>{mockUser.location}</p>
                      </div>
                    
                      {/* Manager Section */}
                      <div className="w-full pt-3 border-t border-white/20">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6 ring-2 ring-white/20">
                            <AvatarImage src={mockUser.manager.avatar} alt={mockUser.manager.name} />
                            <AvatarFallback className="text-xs bg-white/20 text-white backdrop-blur-sm">
                              {mockUser.manager.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="text-xs font-medium text-white drop-shadow-md">{mockUser.manager.name}</p>
                            <p className="text-xs text-white/80 drop-shadow-md">{mockUser.manager.role}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Teammates Section */}
                      <div className="w-full">
                        <p className="text-xs font-medium text-white/90 mb-2 drop-shadow-md">TEAMMATES</p>
                        <div className="space-y-1">
                          {mockUser.teammates.map((teammate, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6 ring-2 ring-white/20">
                                <AvatarImage src={teammate.avatar} alt={teammate.name} />
                                <AvatarFallback className="text-xs bg-white/20 text-white backdrop-blur-sm">
                                  {teammate.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                <p className="text-xs font-medium text-white drop-shadow-md">{teammate.name}</p>
                                <p className="text-xs text-white/80 drop-shadow-md">{teammate.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weather Widget */}
                      <div className="w-full mt-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-white/20 rounded-lg">
                                <Sun className="h-3 w-3 text-yellow-300" />
                              </div>
                              <p className="text-xs font-medium text-white drop-shadow-md">Weather</p>
                            </div>
                            <p className="text-xs text-white/80 drop-shadow-md">Casablanca</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-bold text-white drop-shadow-lg">24°</div>
                              <div className="text-xs text-white/80 drop-shadow-md">
                                <p>Sunny</p>
                                <p>Feels 26°</p>
                              </div>
                            </div>
                            <div className="text-right text-xs text-white/80 drop-shadow-md">
                              <p>H: 28° L: 18°</p>
                              <p>65% humidity</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time & Date Widget */}
                      <div className="w-full mt-2">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-white/20 rounded-lg">
                                <Clock className="h-3 w-3 text-blue-300" />
                              </div>
                              <p className="text-xs font-medium text-white drop-shadow-md">Time</p>
                            </div>
                            <p className="text-xs text-white/80 drop-shadow-md">GMT+1</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white drop-shadow-lg mb-1">
                              {new Date().toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: true 
                              })}
                            </div>
                            <div className="text-xs text-white/90 drop-shadow-md">
                              {new Date().toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats Widget */}
                      <div className="w-full mt-2">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-white/20 rounded-lg">
                              <BarChart3 className="h-3 w-3 text-green-300" />
                            </div>
                            <p className="text-xs font-medium text-white drop-shadow-md">Today</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-sm font-bold text-white drop-shadow-lg">12</div>
                              <div className="text-xs text-white/80 drop-shadow-md">Interviews</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-white drop-shadow-lg">8</div>
                              <div className="text-xs text-white/80 drop-shadow-md">Calls</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-white drop-shadow-lg">24</div>
                              <div className="text-xs text-white/80 drop-shadow-md">Applications</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-white drop-shadow-lg">3</div>
                              <div className="text-xs text-white/80 drop-shadow-md">Offers</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Hello {selectedTeammate.name.split(' ')[0]}!</h1>
                  <p className="text-muted-foreground">Here's what's happening with your recruitment activities today.</p>
                </div>

                {/* Teammate Selection Component */}
                <div className="mb-8">
                  <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 dark:from-orange-950 dark:to-amber-950 dark:border-orange-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">Team Overview</h3>
                            <p className="text-sm text-muted-foreground">Select a team member to view their dashboard</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                          {mockUser.teammates.length} Members
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockUser.teammates.map((teammate) => (
                          <div
                            key={teammate.id}
                            onClick={() => setSelectedTeammate(teammate)}
                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedTeammate.id === teammate.id
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950 shadow-lg scale-105'
                                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-orange-300'
                            }`}
                          >
                            {selectedTeammate.id === teammate.id && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                            
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                                <AvatarImage src={teammate.avatar} alt={teammate.name} />
                                <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                                  {teammate.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground truncate">{teammate.name}</h4>
                                <p className="text-sm text-muted-foreground truncate">{teammate.role}</p>
                                <p className="text-xs text-muted-foreground truncate">{teammate.location}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                                <div className="font-semibold text-foreground">{teammate.stats.activeJobs}</div>
                                <div className="text-muted-foreground">Jobs</div>
                              </div>
                              <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                                <div className="font-semibold text-foreground">{teammate.stats.candidates}</div>
                                <div className="text-muted-foreground">Candidates</div>
                              </div>
                              <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                                <div className="font-semibold text-foreground">{teammate.stats.interviews}</div>
                                <div className="text-muted-foreground">Interviews</div>
                              </div>
                              <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                                <div className="font-semibold text-foreground">{teammate.stats.hires}</div>
                                <div className="text-muted-foreground">Hires</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                  {/* Events Card */}
                  <Card className="lg:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          {formatDate(selectedDate)}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant={activeTab === 'events' ? 'default' : 'ghost'} 
                          size="sm" 
                          className="h-8 px-3 text-xs"
                          onClick={() => setActiveTab('events')}
                        >
                          Events {mockEvents.length}
                        </Button>
                        <Button 
                          variant={activeTab === 'celebrations' ? 'default' : 'ghost'} 
                          size="sm" 
                          className="h-8 px-3 text-xs"
                          onClick={() => setActiveTab('celebrations')}
                        >
                          Celebrations 0
                        </Button>
                        <Button 
                          variant={activeTab === 'holidays' ? 'default' : 'ghost'} 
                          size="sm" 
                          className="h-8 px-3 text-xs"
                          onClick={() => setActiveTab('holidays')}
                        >
                          Holidays 0
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {activeTab === 'events' && mockEvents.length > 0 ? (
                        <div className="space-y-2 flex-1 overflow-y-auto">
                          {mockEvents.map((event) => (
                            <div key={event.id} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/30">
                              <div className="flex-shrink-0">
                                <div className="h-2 w-2 bg-primary rounded-full"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">{event.title}</p>
                                <p className="text-xs text-muted-foreground">{event.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 flex-1 flex flex-col justify-center">
                          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                          <p className="text-xs text-muted-foreground">No events scheduled</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* To-dos Card */}
                  <Card className="lg:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        To-dos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        {mockTodos.map((todo) => (
                          <div key={todo.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`h-2 w-2 rounded-full ${
                                todo.priority === 'high' ? 'bg-red-500' : 
                                todo.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{todo.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{todo.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {todo.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{todo.dueDate}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Jobs Card */}
                  <Card className="lg:col-span-2 xl:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Jobs
                        </CardTitle>
                        <Button size="sm" className="h-8 px-3 text-xs bg-primary hover:bg-primary/90">
                          <Plus className="h-4 w-4 mr-1" />
                          Create job
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-3 max-h-80 overflow-y-auto flex-1">
                        {mockJobs.map((job) => (
                          <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium text-foreground truncate">{job.title}</p>
                                {job.isSample && (
                                  <Badge variant="secondary" className="text-xs">SAMPLE</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </span>
                                <span>{job.type}</span>
                                <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                                  {job.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {job.applications} applications
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {job.views} views
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Onboard New Hires Card */}
                  <Card className="lg:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-primary" />
                        Onboard new hires
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {mockOnboardings.length > 0 ? (
                        <div className="space-y-3">
                          {mockOnboardings.map((onboarding) => (
                            <div key={onboarding.id} className="p-3 rounded-lg bg-muted/30">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-foreground">{onboarding.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {onboarding.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{onboarding.position}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{onboarding.progress}%</span>
                                </div>
                                <Progress value={onboarding.progress} className="h-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 flex-1 flex flex-col justify-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                          <p className="text-muted-foreground">No pending onboardings</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Time-off Balances Card */}
                  <Card className="lg:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        Your time-off balances
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">Paid time off</span>
                            <span className="text-muted-foreground">{mockTimeOffBalances.paidTimeOff.available} days available</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(mockTimeOffBalances.paidTimeOff.available / mockTimeOffBalances.paidTimeOff.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">Sick leave</span>
                            <span className="text-muted-foreground">{mockTimeOffBalances.sickLeave.available} hours available</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(mockTimeOffBalances.sickLeave.available / mockTimeOffBalances.sickLeave.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full h-8 text-xs bg-primary hover:bg-primary/90 mt-auto">
                          Request time off
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Time-off Card */}
                  <Card className="lg:col-span-1 flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Your upcoming time-off
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {mockUpcomingTimeOff.length > 0 ? (
                        <div className="space-y-3">
                          {mockUpcomingTimeOff.map((timeOff) => (
                            <div key={timeOff.id} className="p-3 rounded-lg bg-muted/30">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-foreground">{timeOff.type}</p>
                                <Badge variant="outline" className={`text-xs ${getStatusColor(timeOff.status)}`}>
                                  {timeOff.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {timeOff.startDate} - {timeOff.endDate}
                              </p>
                              <p className="text-xs text-muted-foreground">{timeOff.days} day(s)</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 flex-1 flex flex-col justify-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                            <Clock className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                          <p className="text-muted-foreground">No upcoming time off</p>
                          <p className="text-xs text-muted-foreground mt-1">There are no upcoming time-off requests.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics Overview */}
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        Recruitment Analytics Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.candidates}</p>
                          <p className="text-xs text-muted-foreground">Total Candidates</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.activeJobs}</p>
                          <p className="text-xs text-muted-foreground">Active Jobs</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.interviews}</p>
                          <p className="text-xs text-muted-foreground">Interviews This Week</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.offers}</p>
                          <p className="text-xs text-muted-foreground">Offers Extended</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <UserCheck className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.hires}</p>
                          <p className="text-xs text-muted-foreground">Hires This Month</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.daysToFill}</p>
                          <p className="text-xs text-muted-foreground">Days to Fill</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.candidateRating}</p>
                          <p className="text-xs text-muted-foreground">Candidate Rating</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold text-foreground">{selectedTeammate.stats.managerRating}</p>
                          <p className="text-xs text-muted-foreground">Manager Rating</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}