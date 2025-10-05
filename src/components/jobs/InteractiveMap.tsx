import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPinIcon, PlusIcon, MinusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Job {
  id: string
  title: string
  client: string
  companyLogo?: string
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

interface InteractiveMapProps {
  jobs: Job[]
  onJobClick: (job: Job) => void
}

// Fix for default markers in Leaflet with React
const createCustomIcon = (priority: Job['priority'], applicants: number) => {
  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'urgent': return '#ef4444' // red-500
      case 'high': return '#f97316' // orange-500
      case 'medium': return '#3b82f6' // blue-500
      case 'low': return '#6b7280' // gray-500
      default: return '#6b7280'
    }
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${getPriorityColor(priority)};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        ${applicants}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  })
}

// Map controls component
const MapControls: React.FC<{ onJobClick: (job: Job) => void }> = ({ onJobClick }) => {
  const map = useMap()

  const zoomIn = () => {
    map.zoomIn()
  }

  const zoomOut = () => {
    map.zoomOut()
  }

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      <Button variant="outline" size="icon" onClick={zoomIn}>
        <PlusIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={zoomOut}>
        <MinusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ jobs, onJobClick }) => {
  // Calculate center point from job locations
  const centerLat = jobs.reduce((sum, job) => sum + job.location.coordinates.lat, 0) / jobs.length
  const centerLng = jobs.reduce((sum, job) => sum + job.location.coordinates.lng, 0) / jobs.length

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={[centerLat || 32.4279, centerLng || -6.2153]} // Default to center of Morocco
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {jobs.map((job) => (
          <Marker
            key={job.id}
            position={[job.location.coordinates.lat, job.location.coordinates.lng]}
            icon={createCustomIcon(job.priority, job.applicants.total)}
            eventHandlers={{
              click: () => onJobClick(job)
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-muted rounded flex items-center justify-center overflow-hidden">
                    {job.companyLogo ? (
                      <img 
                        src={job.companyLogo} 
                        alt={`${job.client} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center" style={{ display: job.companyLogo ? 'none' : 'flex' }}>
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm">{job.title}</h3>
                </div>
                <p className="text-xs text-primary">{job.client}</p>
                <p className="text-xs text-primary">{job.location.city}, {job.location.state}</p>
                <p className="text-xs font-medium text-primary">{job.applicants.total} applicants</p>
                <p className="text-xs text-primary">{job.salaryRange}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapControls onJobClick={onJobClick} />
      </MapContainer>

      {/* Priority Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000]">
        <h4 className="text-sm font-semibold mb-2">Priority Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-destructive"></span> Urgent
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span> High
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span> Medium
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-muted"></span> Low
          </div>
        </div>
      </div>

      {/* Active Jobs Count */}
      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000]">
        <p className="text-sm font-semibold">{jobs.length}</p>
        <p className="text-xs text-muted-foreground">Active Jobs</p>
      </div>
    </div>
  )
}