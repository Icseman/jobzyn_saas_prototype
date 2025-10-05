import React, { useState, useEffect } from 'react'
import { SiteHeader } from "@/components/site-header"
import { CalendarHeader } from './CalendarHeader'
import { CalendarSidebar } from './CalendarSidebar'
import { CalendarGrid } from './CalendarGrid'
import { EventCreationModal } from './EventCreationModal'
import { EventPreviewModal } from './EventPreviewModal'
import calendarData from '../../app/calendar/data.json'

export interface CalendarEvent {
  id: string
  title: string
  type: 'interview' | 'client_meeting' | 'intake' | 'internal' | 'other'
  status: 'scheduled' | 'tentative' | 'canceled'
  start: string
  end: string
  timezone: string
  recurrence: {
    rrule: string
    exdates: string[]
  } | null
  organizer: {
    id: string
    name: string
    email: string
  }
  attendees: Array<{
    id: string
    name: string
    email: string
    role: string
    rsvp: 'accepted' | 'declined' | 'tentative' | 'no_response'
    external?: boolean
  }>
  location: {
    kind: 'video' | 'onsite'
    provider?: string
    url?: string
    room?: string
    address?: string
  }
  buffers: {
    beforeMin: number
    afterMin: number
  }
  roundRobin: {
    enabled: boolean
    poolId: string | null
    assignedFromPool: string | null
  }
  related: {
    clientId: string | null
    jobId: string | null
    candidateId: string | null
  }
  agenda: string
  attachments: Array<{
    id: string
    name: string
    url: string
  }>
  reminders: Array<{
    method: 'email' | 'in_app' | 'sms' | 'whatsapp'
    minutesBefore: number
  }>
  createdAt: string
  updatedAt: string
  audit: Array<{
    at: string
    by: string
    action: string
  }>
}

export interface Client {
  id: string
  name: string
  logo: string
}

export interface Job {
  id: string
  title: string
  status: string
}

export interface Candidate {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(calendarData as CalendarEvent[])
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>(calendarData as CalendarEvent[])
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'agenda' | 'timeline'>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [timezone, setTimezone] = useState('Africa/Casablanca')
  const [filters, setFilters] = useState({
    calendars: ['personal', 'team'],
    entities: {
      clients: [] as string[],
      jobs: [] as string[],
      candidates: [] as string[]
    },
    owners: [] as string[],
    meetingTypes: [] as string[],
    status: [] as string[]
  })
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Mock data for related entities
  const clients: Client[] = [
    { id: 'client-001', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { id: 'client-002', name: 'Johnson & Johnson', logo: 'https://logo.clearbit.com/jnj.com' },
    { id: 'client-003', name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { id: 'client-004', name: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com' },
    { id: 'client-005', name: 'Coursera', logo: 'https://logo.clearbit.com/coursera.org' }
  ]

  const jobs: Job[] = [
    { id: 'job-101', title: 'Frontend Developer', status: 'open' },
    { id: 'job-102', title: 'Product Designer', status: 'closed' },
    { id: 'job-201', title: 'Senior Nurse', status: 'open' },
    { id: 'job-202', title: 'Medical Technician', status: 'open' },
    { id: 'job-301', title: 'Solar Engineer', status: 'open' },
    { id: 'job-302', title: 'Project Manager', status: 'closed' },
    { id: 'job-401', title: 'Financial Analyst', status: 'open' },
    { id: 'job-402', title: 'Risk Manager', status: 'open' },
    { id: 'job-501', title: 'Software Instructor', status: 'open' },
    { id: 'job-502', title: 'Curriculum Developer', status: 'draft' }
  ]

  const candidates: Candidate[] = [
    { id: 'cand-101', name: 'Sara Ahmed' },
    { id: 'cand-201', name: 'Mohamed El Fassi' },
    { id: 'cand-301', name: 'Aicha Mansouri' }
  ]

  const users: User[] = [
    { id: 'user-123', name: 'Anwar Bahou', email: 'anwar@jobzyn.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
    { id: 'user-124', name: 'Fatima Alami', email: 'fatima@jobzyn.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
    { id: 'user-125', name: 'Youssef Tazi', email: 'youssef@jobzyn.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
    { id: 'user-126', name: 'Karim El Fassi', email: 'karim@jobzyn.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
    { id: 'user-127', name: 'Nadia Berrada', email: 'nadia@jobzyn.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
  ]

  // Calculate stats
  const stats = {
    totalEvents: events.length,
    todayEvents: events.filter(event => {
      const eventDate = new Date(event.start)
      const today = new Date()
      return eventDate.toDateString() === today.toDateString()
    }).length,
    thisWeekEvents: events.filter(event => {
      const eventDate = new Date(event.start)
      const today = new Date()
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
      return eventDate >= weekStart && eventDate <= weekEnd
    }).length,
    interviews: events.filter(event => event.type === 'interview').length
  }

  // Filter events based on current filters
  useEffect(() => {
    let filtered = events

    // Calendar filters
    // Note: In a real app, this would filter by calendar subscriptions
    // For now, we'll show all events

    // Entity filters
    if (filters.entities.clients.length > 0) {
      filtered = filtered.filter(event => 
        event.related.clientId && filters.entities.clients.includes(event.related.clientId)
      )
    }

    if (filters.entities.jobs.length > 0) {
      filtered = filtered.filter(event => 
        event.related.jobId && filters.entities.jobs.includes(event.related.jobId)
      )
    }

    if (filters.entities.candidates.length > 0) {
      filtered = filtered.filter(event => 
        event.related.candidateId && filters.entities.candidates.includes(event.related.candidateId)
      )
    }

    // Owner filters
    if (filters.owners.length > 0) {
      filtered = filtered.filter(event => 
        filters.owners.includes(event.organizer.id) ||
        event.attendees.some(attendee => filters.owners.includes(attendee.id))
      )
    }

    // Meeting type filters
    if (filters.meetingTypes.length > 0) {
      filtered = filtered.filter(event => 
        filters.meetingTypes.includes(event.type)
      )
    }

    // Status filters
    if (filters.status.length > 0) {
      filtered = filtered.filter(event => 
        filters.status.includes(event.status)
      )
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  const handleCreateEvent = (newEvent: Partial<CalendarEvent>) => {
    const event: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: newEvent.title || '',
      type: newEvent.type || 'other',
      status: 'scheduled',
      start: newEvent.start || new Date().toISOString(),
      end: newEvent.end || new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      timezone: timezone,
      recurrence: null,
      organizer: newEvent.organizer || { id: 'user-123', name: 'Anwar Bahou', email: 'anwar@jobzyn.com' },
      attendees: newEvent.attendees || [],
      location: newEvent.location || { kind: 'video', provider: 'google_meet' },
      buffers: { beforeMin: 0, afterMin: 0 },
      roundRobin: { enabled: false, poolId: null, assignedFromPool: null },
      related: newEvent.related || { clientId: null, jobId: null, candidateId: null },
      agenda: newEvent.agenda || '',
      attachments: newEvent.attachments || [],
      reminders: [{ method: 'email', minutesBefore: 60 }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      audit: [{ at: new Date().toISOString(), by: 'user-123', action: 'created' }]
    }
    
    setEvents(prev => [event, ...prev])
    setIsCreationModalOpen(false)
  }

  const handlePreviewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsPreviewModalOpen(true)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    // TODO: Implement edit functionality
    console.log('Edit event:', event)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const handleJumpToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex h-[calc(100vh-8rem)]">
                {/* Left Sidebar - Minimal */}
                <div className="w-72 border-r border-border/50 bg-background/50 mr-6">
                  <CalendarSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    clients={clients}
                    jobs={jobs}
                    candidates={candidates}
                    users={users}
                    events={events}
                  />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  <CalendarHeader
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    timezone={timezone}
                    onTimezoneChange={setTimezone}
                    onCreateEvent={() => setIsCreationModalOpen(true)}
                    onJumpToToday={handleJumpToToday}
                    stats={stats}
                  />

                  <div className="flex-1 overflow-hidden bg-background/30">
                    <CalendarGrid
                      events={filteredEvents}
                      currentView={currentView}
                      currentDate={currentDate}
                      timezone={timezone}
                      onPreviewEvent={handlePreviewEvent}
                      onEditEvent={handleEditEvent}
                      onDeleteEvent={handleDeleteEvent}
                      users={users}
                      clients={clients}
                      jobs={jobs}
                      candidates={candidates}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EventCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCreateEvent={handleCreateEvent}
        clients={clients}
        jobs={jobs}
        candidates={candidates}
        users={users}
        timezone={timezone}
      />

      <EventPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        event={selectedEvent}
        clients={clients}
        jobs={jobs}
        candidates={candidates}
        users={users}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}
