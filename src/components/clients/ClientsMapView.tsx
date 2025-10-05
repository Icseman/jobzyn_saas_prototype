import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPinIcon,
  UsersIcon,
  Building2Icon,
  EyeIcon,
  EditIcon,
  MoreHorizontalIcon,
  ExternalLinkIcon,
  MailIcon,
  PhoneIcon,
  BriefcaseIcon
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Client } from './ClientsPage'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface ClientsMapViewProps {
  clients: Client[]
  onPreview: (client: Client) => void
  onEdit: (clientId: string) => void
  onArchive: (clientId: string) => void
}

// Mock coordinates for Moroccan cities (in a real app, you'd get these from a geocoding service)
const getCityCoordinates = (city: string) => {
  const coordinates: Record<string, [number, number]> = {
    'Casablanca': [33.5731, -7.5898],
    'Rabat': [34.0209, -6.8416],
    'Marrakech': [31.6295, -7.9811],
    'Fez': [34.0331, -5.0000],
    'Tangier': [35.7595, -5.8340],
    'Agadir': [30.4278, -9.5981],
    'Meknes': [33.8935, -5.5473],
    'Oujda': [34.6814, -1.9086],
    'Kenitra': [34.2611, -6.5802],
    'Tetouan': [35.5889, -5.3626]
  }
  return coordinates[city] || [31.6295, -7.9811] // Default to Marrakech
}

// Interactive map component using Leaflet
const InteractiveMap: React.FC<{ 
  clients: Client[], 
  onPreview: (client: Client) => void,
  onEdit: (clientId: string) => void 
}> = ({ clients, onPreview, onEdit }) => {
  // Calculate center point based on client locations
  const coordinates = clients.map(client => getCityCoordinates(client.location.city))
  const centerLat = coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length
  const centerLng = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {clients.map((client) => {
          const [lat, lng] = getCityCoordinates(client.location.city)
          const openJobs = client.jobs.filter(job => job.status === 'open')
          const totalJobs = client.jobs.length
          
          return (
            <Marker key={client.id} position={[lat, lng]}>
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client.logo} alt={client.name} />
                      <AvatarFallback>
                        <Building2Icon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm">{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.industry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{client.location.city}, {client.location.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-green-600 font-medium">{openJobs.length} open</span>
                      <span className="text-muted-foreground">{totalJobs} total</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{client.size} employees</span>
                    </div>
                    
                    <div className="text-xs">
                      <div className="font-medium">{client.contact.name}</div>
                      <div className="text-muted-foreground">{client.contact.title}</div>
                    </div>
                    
                    {client.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {client.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {client.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{client.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-1 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-6"
                        onClick={() => onPreview(client)}
                      >
                        <EyeIcon className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-6"
                        onClick={() => onEdit(client.id)}
                      >
                        <EditIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export const ClientsMapView: React.FC<ClientsMapViewProps> = ({
  clients,
  onPreview,
  onEdit,
  onArchive
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Group clients by location for better organization
  const clientsByLocation = clients.reduce((acc, client) => {
    const key = `${client.location.city}, ${client.location.country}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(client)
    return acc
  }, {} as Record<string, Client[]>)

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Map Area */}
      <div className="flex-1 p-6">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Client Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] p-0">
            <InteractiveMap 
              clients={clients} 
              onPreview={onPreview}
              onEdit={onEdit}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Sidebar with client list */}
      <div className="w-96 border-l bg-background flex flex-col">
        <div className="p-6 pb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-4">
            Clients by Location ({clients.length})
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6">
            {Object.entries(clientsByLocation).map(([location, locationClients]) => (
              <div key={location}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium text-sm">{location}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {locationClients.length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {locationClients.map((client) => {
                    const openJobs = client.jobs.filter(job => job.status === 'open')
                    const totalJobs = client.jobs.length
                    
                    return (
                      <Card 
                        key={client.id} 
                        className={`cursor-pointer transition-colors ${
                          selectedClient?.id === client.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Client Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={client.logo} alt={client.name} />
                                  <AvatarFallback>
                                    <Building2Icon className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-medium text-sm truncate">
                                    {client.name}
                                  </h5>
                                  <p className="text-xs text-muted-foreground">
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
                            
                            {/* Jobs Status */}
                            <div className="flex items-center gap-2 text-xs">
                              <BriefcaseIcon className="h-3 w-3 text-muted-foreground" />
                              <span className="text-green-600 font-medium">
                                {openJobs.length} open
                              </span>
                              <span className="text-muted-foreground">
                                {totalJobs} total
                              </span>
                            </div>
                            
                            {/* Contact */}
                            <div className="text-xs">
                              <div className="font-medium">{client.contact.name}</div>
                              <div className="text-muted-foreground">{client.contact.title}</div>
                            </div>
                            
                            {/* Owner */}
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs">
                                  {client.owner.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {client.owner.name}
                              </span>
                            </div>
                            
                            {/* Tags */}
                            {client.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {client.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {client.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{client.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex gap-1 pt-2 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onPreview(client)
                                }}
                              >
                                <EyeIcon className="h-3 w-3 mr-1" />
                                Preview
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onEdit(client.id)
                                }}
                              >
                                <EditIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
            
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
        </div>
      </div>
    </div>
  )
}
