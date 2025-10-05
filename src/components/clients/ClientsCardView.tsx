import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  UsersIcon,
  MapPinIcon,
  Building2Icon,
  ExternalLinkIcon,
  MailIcon,
  PhoneIcon,
  LinkedinIcon,
  BriefcaseIcon
} from 'lucide-react'
import { Client } from './ClientsPage'

interface ClientsCardViewProps {
  clients: Client[]
  onPreview: (client: Client) => void
  onEdit: (clientId: string) => void
  onArchive: (clientId: string) => void
}

export const ClientsCardView: React.FC<ClientsCardViewProps> = ({
  clients,
  onPreview,
  onEdit,
  onArchive
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          const openJobs = client.jobs.filter(job => job.status === 'open')
          const totalJobs = client.jobs.length
          
          return (
            <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.logo} alt={client.name} />
                      <AvatarFallback>
                        <Building2Icon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg font-semibold truncate">
                        {client.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {client.industry}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle more actions
                    }}
                  >
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="truncate">
                      {client.location.city}, {client.location.country}
                    </span>
                  </div>
                  
                  {/* Company Size */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>{client.size} employees</span>
                  </div>
                  
                  {/* Jobs Status */}
                  <div className="flex items-center gap-2 text-sm">
                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">
                        {openJobs.length} open
                      </span>
                      <span className="text-muted-foreground">
                        {totalJobs} total
                      </span>
                    </div>
                  </div>
                  
                  {/* Contact Person */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      {client.contact.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {client.contact.title}
                    </div>
                    
                    {/* Contact Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        <span className="truncate">{client.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3" />
                        <span>{client.contact.phone}</span>
                      </div>
                      {client.contact.linkedin && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LinkedinIcon className="h-3 w-3" />
                          <span>LinkedIn</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Owner */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {client.owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {client.owner.name}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  {client.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {client.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {client.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{client.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Website */}
                  <div className="flex items-center gap-2">
                    <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {client.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview(client)
                    }}
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(client.id)
                    }}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {clients.length === 0 && (
        <div className="text-center py-12">
          <Building2Icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No clients found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
