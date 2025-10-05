import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  Building2, 
  Briefcase, 
  User,
  FileText,
  Bell,
  Activity,
  Edit,
  Copy,
  Archive,
  ExternalLink,
  CheckCircle,
  XCircle,
  HelpCircle,
  Minus
} from 'lucide-react'
import { CalendarEvent, Client, Job, Candidate, User as UserType } from './CalendarPage'

interface EventPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEvent | null
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  users: UserType[]
  onEdit: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export const EventPreviewModal: React.FC<EventPreviewModalProps> = ({
  isOpen,
  onClose,
  event,
  clients,
  jobs,
  candidates,
  users,
  onEdit,
  onDelete
}) => {
  if (!event) return null

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
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
        return 'bg-blue-100 text-blue-800'
      case 'client_meeting':
        return 'bg-green-100 text-green-800'
      case 'intake':
        return 'bg-purple-100 text-purple-800'
      case 'internal':
        return 'bg-gray-100 text-gray-800'
      case 'other':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800'
      case 'tentative':
        return 'bg-yellow-100 text-yellow-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRSVPIcon = (rsvp: string) => {
    switch (rsvp) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'tentative':
        return <HelpCircle className="h-4 w-4 text-yellow-600" />
      case 'no_response':
        return <Minus className="h-4 w-4 text-gray-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getRSVPText = (rsvp: string) => {
    switch (rsvp) {
      case 'accepted':
        return 'Accepted'
      case 'declined':
        return 'Declined'
      case 'tentative':
        return 'Tentative'
      case 'no_response':
        return 'No response'
      default:
        return 'No response'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold mb-2">
                {event.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getEventTypeColor(event.type)}>
                  {event.type.replace('_', ' ')}
                </Badge>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(event.id)}>
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* When and Where */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    When & Where
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {formatDateTime(event.start)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </div>
                    </div>
                  </div>

                  {event.location.kind === 'video' && (
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{event.location.provider}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.location.url}
                        </div>
                        <Button variant="outline" size="sm" className="mt-1">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  )}

                  {event.location.kind === 'onsite' && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{event.location.room}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.location.address}
                        </div>
                        <Button variant="outline" size="sm" className="mt-1">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open Map
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    Timezone: {event.timezone}
                  </div>
                </CardContent>
              </Card>

              {/* Related Entities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Related
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {event.related.clientId && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {getClientName(event.related.clientId)}
                        </div>
                        <div className="text-sm text-muted-foreground">Client</div>
                      </div>
                    </div>
                  )}

                  {event.related.jobId && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {getJobTitle(event.related.jobId)}
                        </div>
                        <div className="text-sm text-muted-foreground">Job</div>
                      </div>
                    </div>
                  )}

                  {event.related.candidateId && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {getCandidateName(event.related.candidateId)}
                        </div>
                        <div className="text-sm text-muted-foreground">Candidate</div>
                      </div>
                    </div>
                  )}

                  {!event.related.clientId && !event.related.jobId && !event.related.candidateId && (
                    <div className="text-sm text-muted-foreground">
                      No related entities
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getUserAvatar(event.organizer.id)} />
                    <AvatarFallback>
                      {getUserName(event.organizer.id).split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{getUserName(event.organizer.id)}</div>
                    <div className="text-sm text-muted-foreground">{event.organizer.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendees Tab */}
          <TabsContent value="attendees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Attendees ({event.attendees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.attendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getUserAvatar(attendee.id)} />
                          <AvatarFallback>
                            {attendee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{attendee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {attendee.email}
                            {attendee.external && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                External
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRSVPIcon(attendee.rsvp)}
                        <span className="text-sm">{getRSVPText(attendee.rsvp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Agenda & Attachments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.agenda ? (
                  <div>
                    <h4 className="font-medium mb-2">Agenda</h4>
                    <div className="text-sm whitespace-pre-wrap bg-muted p-3 rounded">
                      {event.agenda}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No agenda provided
                  </div>
                )}

                {event.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {event.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{attachment.name}</span>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {event.reminders.map((reminder, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {reminder.method} reminder {reminder.minutesBefore} minutes before
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.audit.map((entry, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm">
                          {entry.action.replace('_', ' ')} by {getUserName(entry.by)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(event.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{new Date(event.updatedAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event ID:</span>
                  <span className="font-mono text-xs">{event.id}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
