import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Building2, 
  Filter,
  Search,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserX,
  Video,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { CalendarEvent, Client, Job, Candidate, User as UserType } from './CalendarPage'

interface Filters {
  calendars: string[]
  entities: {
    clients: string[]
    jobs: string[]
    candidates: string[]
  }
  owners: string[]
  meetingTypes: string[]
  status: string[]
}

interface CalendarSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  users: UserType[]
  events: CalendarEvent[]
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  filters,
  onFiltersChange,
  clients,
  jobs,
  candidates,
  users,
  events
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    filters: true,
    team: true,
    clients: true
  })

  const handleEntityToggle = (type: 'clients' | 'jobs' | 'candidates', id: string) => {
    const currentEntities = filters.entities[type]
    const newEntities = currentEntities.includes(id)
      ? currentEntities.filter(entityId => entityId !== id)
      : [...currentEntities, id]
    
    onFiltersChange({
      ...filters,
      entities: {
        ...filters.entities,
        [type]: newEntities
      }
    })
  }

  const handleOwnerToggle = (userId: string) => {
    const newOwners = filters.owners.includes(userId)
      ? filters.owners.filter(id => id !== userId)
      : [...filters.owners, userId]
    
    onFiltersChange({
      ...filters,
      owners: newOwners
    })
  }

  const handleMeetingTypeToggle = (type: string) => {
    const newTypes = filters.meetingTypes.includes(type)
      ? filters.meetingTypes.filter(t => t !== type)
      : [...filters.meetingTypes, type]
    
    onFiltersChange({
      ...filters,
      meetingTypes: newTypes
    })
  }

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    
    onFiltersChange({
      ...filters,
      status: newStatus
    })
  }

  const getEventCountByType = (type: string) => {
    return events.filter(event => event.type === type).length
  }

  const getEventCountByStatus = (status: string) => {
    return events.filter(event => event.status === status).length
  }

  const getEventCountByClient = (clientId: string) => {
    return events.filter(event => event.related.clientId === clientId).length
  }

  const getEventCountByOwner = (userId: string) => {
    return events.filter(event => 
      event.organizer.id === userId || 
      event.attendees.some(attendee => attendee.id === userId)
    ).length
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'interview': return <UserCheck className="h-4 w-4" />
      case 'client_meeting': return <Building2 className="h-4 w-4" />
      case 'intake': return <Calendar className="h-4 w-4" />
      case 'internal': return <Users className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'interview': return 'text-primary bg-primary/10 border-primary/20'
      case 'client_meeting': return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800'
      case 'intake': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800'
      case 'internal': return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800'
      default: return 'text-muted-foreground bg-muted border-border'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      case 'tentative': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'canceled': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full overflow-y-auto bg-background/50">
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Filters */}
        <div className="space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => toggleSection('filters')}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Quick Filters</h3>
            </div>
            {expandedSections.filters ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </div>
          
          {expandedSections.filters && (
            <div className="space-y-4 pl-6">
              {/* Meeting Types */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Meeting Types
                </h4>
                <div className="space-y-2">
                  {['interview', 'client_meeting', 'intake', 'internal', 'other'].map((type) => (
                    <div key={type} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={type}
                          checked={filters.meetingTypes.includes(type)}
                          onCheckedChange={() => handleMeetingTypeToggle(type)}
                          className="h-4 w-4"
                        />
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-md border ${getMeetingTypeColor(type)}`}>
                            {getMeetingTypeIcon(type)}
                          </div>
                          <Label htmlFor={type} className="text-sm font-medium capitalize cursor-pointer">
                            {type.replace('_', ' ')}
                          </Label>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {getEventCountByType(type)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Status
                </h4>
                <div className="space-y-2">
                  {['scheduled', 'tentative', 'canceled'].map((status) => (
                    <div key={status} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={status}
                          checked={filters.status.includes(status)}
                          onCheckedChange={() => handleStatusToggle(status)}
                          className="h-4 w-4"
                        />
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-md border ${getStatusColor(status)}`}>
                            {status === 'scheduled' && <UserCheck className="h-3 w-3" />}
                            {status === 'tentative' && <Clock className="h-3 w-3" />}
                            {status === 'canceled' && <UserX className="h-3 w-3" />}
                          </div>
                          <Label htmlFor={status} className="text-sm font-medium capitalize cursor-pointer">
                            {status}
                          </Label>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {getEventCountByStatus(status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Team Members */}
        <div className="space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => toggleSection('team')}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Team Members</h3>
            </div>
            {expandedSections.team ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </div>
          
          {expandedSections.team && (
            <div className="space-y-2 pl-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={user.id}
                      checked={filters.owners.includes(user.id)}
                      onCheckedChange={() => handleOwnerToggle(user.id)}
                      className="h-4 w-4"
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Label htmlFor={user.id} className="text-sm font-medium cursor-pointer">
                        {user.name}
                      </Label>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {getEventCountByOwner(user.id)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Clients */}
        <div className="space-y-4">
          <div 
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => toggleSection('clients')}
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Clients</h3>
            </div>
            {expandedSections.clients ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </div>
          
          {expandedSections.clients && (
            <div className="space-y-2 pl-6">
              {filteredClients.slice(0, 8).map((client) => (
                <div key={client.id} className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={client.id}
                      checked={filters.entities.clients.includes(client.id)}
                      onCheckedChange={() => handleEntityToggle('clients', client.id)}
                      className="h-4 w-4"
                    />
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="h-6 w-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <Building2 className="h-4 w-4 text-muted-foreground hidden" />
                    </div>
                    <Label htmlFor={client.id} className="text-sm font-medium cursor-pointer">
                      {client.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {getEventCountByClient(client.id)}
                  </Badge>
                </div>
              ))}
              {filteredClients.length > 8 && (
                <div className="text-xs text-muted-foreground pl-6 py-2">
                  +{filteredClients.length - 8} more clients
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border/50">
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
              <Calendar className="h-3 w-3 mr-2" />
              Clear All Filters
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
              <Filter className="h-3 w-3 mr-2" />
              Save Filter Preset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}