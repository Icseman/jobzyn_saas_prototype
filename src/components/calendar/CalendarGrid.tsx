import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Clock, 
  Video, 
  MapPin, 
  Users, 
  Building2, 
  Briefcase, 
  User,
  MoreHorizontal
} from 'lucide-react'
import { CalendarEvent, Client, Job, Candidate, User as UserType } from './CalendarPage'

interface CalendarGridProps {
  events: CalendarEvent[]
  currentView: 'day' | 'week' | 'month' | 'agenda' | 'timeline'
  currentDate: Date
  timezone: string
  onPreviewEvent: (event: CalendarEvent) => void
  onEditEvent: (event: CalendarEvent) => void
  onDeleteEvent: (eventId: string) => void
  users: UserType[]
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  events,
  currentView,
  currentDate,
  timezone,
  onPreviewEvent,
  onEditEvent,
  onDeleteEvent,
  users,
  clients,
  jobs,
  candidates
}) => {
  const getClientName = (clientId: string | null) => {
    if (!clientId) return null
    return clients.find(client => client.id === clientId)?.name
  }

  const getJobTitle = (jobId: string | null) => {
    if (!jobId) return null
    return jobs.find(job => job.id === jobId)?.title
  }

  const getCandidateName = (candidateId: string | null) => {
    if (!candidateId) return null
    return candidates.find(candidate => candidate.id === candidateId)?.name
  }

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User'
  }

  const getUserAvatar = (userId: string) => {
    return users.find(user => user.id === userId)?.avatar
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'client_meeting':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
      case 'intake':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
      case 'internal':
        return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800'
      case 'other':
        return 'bg-muted text-muted-foreground border-border'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
      case 'tentative':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
      case 'canceled':
        return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const renderWeekView = () => {
    const weekStart = new Date(currentDate)
    weekStart.setDate(currentDate.getDate() - currentDate.getDay())
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      days.push(day)
    }

    const hours = []
    for (let i = 8; i <= 18; i++) {
      hours.push(i)
    }

    return (
      <div className="h-full overflow-auto">
        <div className="grid grid-cols-8 min-w-[800px]">
          {/* Time column */}
          <div className="border-r bg-muted/30 p-3">
            <div className="h-12"></div>
            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-border/50 text-xs text-muted-foreground p-2">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => {
            const dayEvents = events.filter(event => {
              const eventDate = new Date(event.start)
              return eventDate.toDateString() === day.toDateString()
            })

            return (
              <div key={dayIndex} className="border-r border-border/50">
                {/* Day header */}
                <div className="h-12 border-b border-border/50 bg-muted/30 p-3 text-center">
                  <div className="text-sm font-medium text-foreground">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {day.getDate()}
                  </div>
                </div>

                {/* Hour slots */}
                {hours.map(hour => (
                  <div key={hour} className="h-16 border-b border-border/30 relative hover:bg-muted/20 transition-colors">
                    {dayEvents
                      .filter(event => {
                        const eventHour = new Date(event.start).getHours()
                        return eventHour === hour
                      })
                      .map(event => (
                        <div
                          key={event.id}
                          className={`absolute inset-1 cursor-pointer hover:shadow-sm transition-all duration-200 rounded-md border ${getEventTypeColor(event.type)}`}
                          onClick={() => onPreviewEvent(event)}
                        >
                          <div className="p-2 h-full flex flex-col justify-between">
                            <div className="text-xs font-medium truncate">
                              {event.title}
                            </div>
                            <div className="text-xs opacity-75 flex items-center gap-1">
                              {formatTime(event.start)}
                              {event.location.kind === 'video' && (
                                <Video className="h-3 w-3" />
                              )}
                              {event.location.kind === 'onsite' && (
                                <MapPin className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDate = new Date(monthStart)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }

    return (
      <div className="h-full overflow-auto">
        <div className="grid grid-cols-7 min-w-[700px]">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="border-b border-border/50 bg-muted/30 p-3 text-center text-sm font-medium text-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            const dayEvents = events.filter(event => {
              const eventDate = new Date(event.start)
              return eventDate.toDateString() === day.toDateString()
            })

            const isCurrentMonth = day.getMonth() === currentDate.getMonth()
            const isToday = day.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`min-h-24 border-b border-r border-border/30 p-2 ${
                  isCurrentMonth ? 'bg-background' : 'bg-muted/20'
                } ${isToday ? 'bg-primary/5 ring-1 ring-primary/20' : ''} hover:bg-muted/30 transition-colors`}
              >
                <div className={`text-sm ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'} ${isToday ? 'font-semibold text-primary' : ''}`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1 mt-2">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1.5 rounded-md cursor-pointer truncate border ${getEventTypeColor(event.type)} hover:shadow-sm transition-shadow`}
                      onClick={() => onPreviewEvent(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderAgendaView = () => {
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.start).getTime() - new Date(b.start).getTime()
    )

    const groupedEvents = sortedEvents.reduce((groups, event) => {
      const date = new Date(event.start).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
      return groups
    }, {} as Record<string, CalendarEvent[]>)

    return (
      <div className="h-full overflow-auto p-6">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <div className="space-y-3">
              {dayEvents.map(event => (
                <div key={event.id} className="cursor-pointer hover:shadow-sm transition-all duration-200 rounded-lg border border-border bg-card hover:bg-muted/30">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                            {event.type.replace('_', ' ')}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </div>
                          {event.location.kind === 'video' && (
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              {event.location.provider}
                            </div>
                          )}
                          {event.location.kind === 'onsite' && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {event.location.room || event.location.address}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {event.attendees.length} attendees
                          </div>
                          {event.related.clientId && (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              {getClientName(event.related.clientId)}
                            </div>
                          )}
                          {event.related.jobId && (
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {getJobTitle(event.related.jobId)}
                            </div>
                          )}
                          {event.related.candidateId && (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {getCandidateName(event.related.candidateId)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getUserAvatar(event.organizer.id)} />
                          <AvatarFallback className="text-xs">
                            {getUserName(event.organizer.id).split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <button
                          className="p-2 hover:bg-muted rounded-md transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            onPreviewEvent(event)
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderDayView = () => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === currentDate.toDateString()
    })

    const hours = []
    for (let i = 8; i <= 18; i++) {
      hours.push(i)
    }

    return (
      <div className="h-full overflow-auto">
        <div className="grid grid-cols-2 min-w-[600px]">
          {/* Time column */}
          <div className="border-r border-border/50 bg-muted/30 p-3">
            <div className="h-12"></div>
            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-border/50 text-xs text-muted-foreground p-2">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Events column */}
          <div>
            <div className="h-12 border-b border-border/50 bg-muted/30 p-3 text-center">
              <div className="text-sm font-medium text-foreground">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentDate.getDate()} {currentDate.toLocaleDateString('en-US', { month: 'long' })}
              </div>
            </div>

            {hours.map(hour => (
              <div key={hour} className="h-16 border-b border-border/30 relative hover:bg-muted/20 transition-colors">
                {dayEvents
                  .filter(event => {
                    const eventHour = new Date(event.start).getHours()
                    return eventHour === hour
                  })
                  .map(event => (
                    <div
                      key={event.id}
                      className={`absolute inset-1 cursor-pointer hover:shadow-sm transition-all duration-200 rounded-md border ${getEventTypeColor(event.type)}`}
                      onClick={() => onPreviewEvent(event)}
                    >
                      <div className="p-2 h-full flex flex-col justify-between">
                        <div className="text-sm font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xs opacity-75 flex items-center gap-2">
                          <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                          <div className="flex items-center gap-1">
                            {event.location.kind === 'video' && (
                              <Video className="h-3 w-3" />
                            )}
                            {event.location.kind === 'onsite' && (
                              <MapPin className="h-3 w-3" />
                            )}
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderTimelineView = () => {
    return (
      <div className="h-full overflow-auto p-4">
        <div className="text-center text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Timeline View</h3>
          <p>Timeline view for multi-interviewer coordination</p>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">No events found</h3>
          <p className="text-sm">Try adjusting your filters or create a new meeting</p>
        </div>
      </div>
    )
  }

  switch (currentView) {
    case 'day':
      return renderDayView()
    case 'week':
      return renderWeekView()
    case 'month':
      return renderMonthView()
    case 'agenda':
      return renderAgendaView()
    case 'timeline':
      return renderTimelineView()
    default:
      return renderWeekView()
  }
}
