import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  FileText, 
  Bell,
  Link,
  Eye,
  EyeOff
} from 'lucide-react'
import { CalendarEvent, Client, Job, Candidate, User } from './CalendarPage'

interface EventCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateEvent: (event: Partial<CalendarEvent>) => void
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  users: User[]
  timezone: string
}

export const EventCreationModal: React.FC<EventCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateEvent,
  clients,
  jobs,
  candidates,
  users,
  timezone
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'other' as CalendarEvent['type'],
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    duration: 60,
    recurrence: 'none',
    organizer: 'user-123',
    attendees: [] as string[],
    locationKind: 'video' as 'video' | 'onsite',
    videoProvider: 'google_meet',
    room: '',
    address: '',
    clientId: 'none',
    jobId: 'none',
    candidateId: 'none',
    agenda: '',
    attachments: [] as string[],
    reminders: [
      { method: 'email' as const, minutesBefore: 60 }
    ],
    generateLink: false,
    visibility: 'team' as 'private' | 'team' | 'public'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)
    
    const eventData: Partial<CalendarEvent> = {
      title: formData.title,
      type: formData.type,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      timezone: timezone,
      organizer: users.find(u => u.id === formData.organizer)!,
      attendees: formData.attendees.map(id => ({
        id,
        name: users.find(u => u.id === id)?.name || 'Unknown',
        email: users.find(u => u.id === id)?.email || '',
        role: 'attendee',
        rsvp: 'no_response' as const
      })),
      location: {
        kind: formData.locationKind,
        provider: formData.locationKind === 'video' ? formData.videoProvider : undefined,
        url: formData.locationKind === 'video' ? 'https://meet.google.com/abc-defg-hij' : undefined,
        room: formData.locationKind === 'onsite' ? formData.room : undefined,
        address: formData.locationKind === 'onsite' ? formData.address : undefined
      },
      related: {
        clientId: formData.clientId === 'none' ? null : formData.clientId,
        jobId: formData.jobId === 'none' ? null : formData.jobId,
        candidateId: formData.candidateId === 'none' ? null : formData.candidateId
      },
      agenda: formData.agenda,
      attachments: formData.attachments.map(id => ({
        id,
        name: `attachment-${id}.pdf`,
        url: `/files/attachment-${id}.pdf`
      })),
      reminders: formData.reminders
    }
    
    onCreateEvent(eventData)
    onClose()
  }

  const handleAttendeeToggle = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(userId)
        ? prev.attendees.filter(id => id !== userId)
        : [...prev.attendees, userId]
    }))
  }

  const addReminder = () => {
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, { method: 'email', minutesBefore: 60 }]
    }))
  }

  const removeReminder = (index: number) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }))
  }

  const updateReminder = (index: number, field: 'method' | 'minutesBefore', value: any) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map((reminder, i) => 
        i === index ? { ...reminder, [field]: value } : reminder
      )
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Create New Meeting
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Meeting Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Meeting title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Meeting Type</Label>
                    <Select value={formData.type} onValueChange={(value: CalendarEvent['type']) => 
                      setFormData(prev => ({ ...prev, type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="client_meeting">Client Meeting</SelectItem>
                        <SelectItem value="intake">Intake</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="recurrence">Repeat</Label>
                    <Select value={formData.recurrence} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, recurrence: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No repeat</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={timezone}
                      disabled
                    />
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
                    Attendees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="organizer">Organizer</Label>
                    <Select value={formData.organizer} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, organizer: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Internal Attendees</Label>
                    <div className="space-y-2 mt-2">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`attendee-${user.id}`}
                            checked={formData.attendees.includes(user.id)}
                            onCheckedChange={() => handleAttendeeToggle(user.id)}
                          />
                          <Label htmlFor={`attendee-${user.id}`} className="text-sm">
                            {user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>External Attendees</Label>
                    <Textarea
                      placeholder="Enter email addresses separated by commas"
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Location Type</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="video"
                          checked={formData.locationKind === 'video'}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, locationKind: 'video' }))}
                        />
                        <Label htmlFor="video">Video Conference</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="onsite"
                          checked={formData.locationKind === 'onsite'}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, locationKind: 'onsite' }))}
                        />
                        <Label htmlFor="onsite">Physical Location</Label>
                      </div>
                    </div>
                  </div>

                  {formData.locationKind === 'video' && (
                    <div>
                      <Label htmlFor="videoProvider">Video Provider</Label>
                      <Select value={formData.videoProvider} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, videoProvider: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google_meet">Google Meet</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="teams">Microsoft Teams</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.locationKind === 'onsite' && (
                    <>
                      <div>
                        <Label htmlFor="room">Room</Label>
                        <Input
                          id="room"
                          value={formData.room}
                          onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                          placeholder="Room name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Full address"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Availability & Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center text-muted-foreground py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4" />
                    <p>Availability checking and suggestions</p>
                    <p className="text-sm">This feature will show real-time availability</p>
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
                    Content & Relations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="agenda">Agenda</Label>
                    <Textarea
                      id="agenda"
                      value={formData.agenda}
                      onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                      placeholder="Meeting agenda"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="client">Related Client</Label>
                      <Select value={formData.clientId} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, clientId: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No client</SelectItem>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="job">Related Job</Label>
                      <Select value={formData.jobId} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, jobId: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No job</SelectItem>
                          {jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="candidate">Related Candidate</Label>
                      <Select value={formData.candidateId} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, candidateId: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No candidate</SelectItem>
                          {candidates.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.id}>
                              {candidate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="internalOnly"
                      checked={formData.visibility === 'private'}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, visibility: checked ? 'private' : 'team' }))
                      }
                    />
                    <Label htmlFor="internalOnly">Notes visible to internal only</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Reminders</Label>
                    <div className="space-y-2 mt-2">
                      {formData.reminders.map((reminder, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            value={reminder.method}
                            onValueChange={(value: 'email' | 'in_app' | 'sms' | 'whatsapp') => 
                              updateReminder(index, 'method', value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="in_app">In-app</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            value={reminder.minutesBefore.toString()}
                            onValueChange={(value) => 
                              updateReminder(index, 'minutesBefore', parseInt(value))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 min</SelectItem>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="1440">1 day</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeReminder(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addReminder}
                      >
                        Add Reminder
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="generateLink"
                        checked={formData.generateLink}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, generateLink: checked as boolean }))
                        }
                      />
                      <Label htmlFor="generateLink">Generate booking link</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showAsBusy"
                        checked={formData.visibility === 'private'}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, visibility: checked ? 'private' : 'team' }))
                        }
                      />
                      <Label htmlFor="showAsBusy">Show as busy only</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit">
              Send Invites
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
